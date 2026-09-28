#!/usr/bin/env python3
"""
Learning Hub — local server.

Serves the static site, proxies chat requests to the Claude API so your API key
never reaches the browser, and ingests new resources from a URL or a file.

    python3 server.py              # http://localhost:8000
    python3 server.py --port 9000

The assistant needs a key:

    export ANTHROPIC_API_KEY=sk-ant-...        (macOS / Linux)
    setx ANTHROPIC_API_KEY "sk-ant-..."        (Windows, then reopen the terminal)

Everything else — the library, summaries, diagrams and learning paths — works
without one. Standard library only; no pip install required.
"""

import argparse
import base64
import html
import json
import os
import re
import secrets
import sys
import time
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CUSTOM_FILE = ROOT / "data" / "custom-resources.json"
API_URL = "https://api.anthropic.com/v1/messages"
API_VERSION = "2023-06-01"
MAX_TOKENS = 2000
INGEST_MAX_TOKENS = 4000
ALLOWED_MODELS = {
    "claude-opus-5",
    "claude-sonnet-5",
    "claude-haiku-4-5-20251001",
}
DEFAULT_MODEL = "claude-sonnet-5"
INGEST_MODEL = "claude-opus-5"

# how much extracted source text to send to the model
INGEST_CHAR_LIMIT = 120_000
UPLOAD_MAX_BYTES = 12 * 1024 * 1024

FALLBACK_SYSTEM = (
    "You are a Unity game engine expert helping someone learn Unity 6. "
    "Be concrete, name the Unity version or render pipeline when it matters, "
    "and never invent API names you are not sure exist."
)


def api_key():
    return os.environ.get("ANTHROPIC_API_KEY", "").strip()


# --- custom resource storage -------------------------------------------------

def load_custom():
    if not CUSTOM_FILE.exists():
        return []
    try:
        data = json.loads(CUSTOM_FILE.read_text(encoding="utf-8"))
        return data if isinstance(data, list) else []
    except Exception:
        return []


def save_custom(items):
    CUSTOM_FILE.parent.mkdir(parents=True, exist_ok=True)
    CUSTOM_FILE.write_text(json.dumps(items, indent=2, ensure_ascii=False), encoding="utf-8")


def slugify(text, fallback="resource"):
    s = re.sub(r"[^a-z0-9]+", "-", (text or "").lower()).strip("-")
    return (s[:48] or fallback)


# --- source text extraction --------------------------------------------------

def strip_html(raw):
    """Crude but dependency-free HTML → text."""
    title = ""
    m = re.search(r"(?is)<title[^>]*>(.*?)</title>", raw)
    if m:
        title = html.unescape(re.sub(r"\s+", " ", m.group(1))).strip()
    raw = re.sub(r"(?is)<(script|style|noscript|svg|head)[^>]*>.*?</\1>", " ", raw)
    raw = re.sub(r"(?is)<!--.*?-->", " ", raw)
    raw = re.sub(r"(?i)<(br|/p|/div|/li|/h[1-6]|/tr)[^>]*>", "\n", raw)
    text = re.sub(r"(?s)<[^>]+>", " ", raw)
    text = html.unescape(text)
    text = re.sub(r"[ \t\xa0]+", " ", text)
    text = re.sub(r"\n\s*\n\s*\n+", "\n\n", text)
    return title, text.strip()


def fetch_url(url):
    if not re.match(r"^https?://", url, re.I):
        return None, None, "Only http and https URLs are supported."
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (compatible; LearningHub/1.0)",
        "Accept": "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5",
    })
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            ctype = (resp.headers.get("Content-Type") or "").lower()
            raw = resp.read(8 * 1024 * 1024)
    except urllib.error.HTTPError as e:
        return None, None, "The page returned HTTP %s." % e.code
    except urllib.error.URLError as e:
        return None, None, "Could not reach that URL: %s" % e.reason
    except Exception as e:
        return None, None, "Could not fetch that URL: %s" % e

    if "pdf" in ctype or url.lower().endswith(".pdf"):
        title, text, err = extract_pdf(raw)
        return title, text, err

    charset = "utf-8"
    m = re.search(r"charset=([\w\-]+)", ctype)
    if m:
        charset = m.group(1)
    try:
        body = raw.decode(charset, errors="replace")
    except LookupError:
        body = raw.decode("utf-8", errors="replace")

    if "html" in ctype or re.search(r"(?i)<html", body[:2000]):
        title, text = strip_html(body)
    else:
        title, text = "", body
    if len(text.strip()) < 200:
        return title, text, ("That page returned almost no readable text. It may "
                             "require JavaScript or a login — try saving it as a "
                             "file and uploading that instead.")
    return title, text, None


def extract_pdf(data):
    try:
        try:
            from pypdf import PdfReader
        except ImportError:
            from PyPDF2 import PdfReader  # type: ignore
    except ImportError:
        return None, None, ("Reading PDFs needs one small library. Run:  "
                            "pip install pypdf   (then restart the server). "
                            "Text, Markdown and HTML files work without it.")
    import io
    try:
        reader = PdfReader(io.BytesIO(data))
        pages = [(p.extract_text() or "") for p in reader.pages[:200]]
        text = "\n\n".join(pages).strip()
        title = ""
        try:
            title = (reader.metadata or {}).get("/Title", "") or ""
        except Exception:
            pass
        if len(text) < 200:
            return title, text, ("That PDF has almost no extractable text — it is "
                                 "probably a scan. OCR it first.")
        return title, text, None
    except Exception as e:
        return None, None, "Could not read that PDF: %s" % e


def extract_docx(data):
    import io
    import zipfile
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            xml = z.read("word/document.xml").decode("utf-8", errors="replace")
    except Exception as e:
        return None, "Could not read that .docx: %s" % e
    xml = re.sub(r"(?i)</w:p>", "\n", xml)
    text = re.sub(r"(?s)<[^>]+>", "", xml)
    text = html.unescape(re.sub(r"[ \t]+", " ", text)).strip()
    if len(text) < 100:
        return None, "That document appears to be empty."
    return text, None


def extract_upload(filename, data):
    ext = os.path.splitext(filename or "")[1].lower()
    if ext == ".pdf":
        title, text, err = extract_pdf(data)
        return title or "", text, err
    if ext == ".docx":
        text, err = extract_docx(data)
        return "", text, err
    if ext in (".html", ".htm"):
        title, text = strip_html(data.decode("utf-8", errors="replace"))
        return title, text, None
    if ext in ("", ".txt", ".md", ".markdown", ".rst", ".json", ".csv",
               ".py", ".cs", ".js", ".ts", ".ipynb"):
        text = data.decode("utf-8", errors="replace")
        if len(text.strip()) < 50:
            return "", None, "That file has almost no text in it."
        return "", text, None
    return "", None, ("Unsupported file type '%s'. Supported: pdf, docx, txt, md, "
                      "html, and plain source files." % (ext or "none"))


# --- ingest ------------------------------------------------------------------

INGEST_SYSTEM = """You write entries for a personal learning library. Given the text of a resource, produce ONE JSON object describing it.

Return ONLY the JSON object. No markdown fence, no commentary.

Schema:
{
  "title": "the resource's real title, concise",
  "author": "author or publisher; 'Unknown' if genuinely unclear",
  "type": "video|doc|course|article|interactive",
  "level": "beginner|intermediate|advanced",
  "duration": "realistic time to consume, e.g. '25 min' or '6 hours'",
  "cost": "Free or Paid",
  "tldr": "one sentence: what this is and why it is worth the time",
  "tags": ["4-7 lowercase topic tags"],
  "summary": [
    {"heading": "...", "body": "150-260 words of flowing prose"},
    ... 5 to 7 of these ...
  ],
  "keyConcepts": [{"term": "...", "detail": "one clarifying line"}],
  "takeaways": ["4-6 specific, actionable lines"],
  "pitfalls": ["2-4 concrete mistakes this material helps avoid"]
}

How to write the summary — this is the important part:
- 5 to 7 sections, each a heading plus 150-260 words of real prose. Not bullets.
- Explain the SUBJECT MATTER, not just what the document says. A reader should
  learn something substantial from your summary alone.
- Cover: what it actually is and who it is for; the central mental model or
  argument; the specific mechanisms or techniques with concrete detail; what is
  genuinely hard or counter-intuitive; how it relates to adjacent topics; and
  honest limitations or what it does not cover.
- Name specific things: APIs, numbers, algorithms, versions, trade-offs.
- Write plainly and directly. No marketing language, no filler, no hedging.
- If the source is thin or mostly navigation text, say so in the first section
  rather than padding.

keyConcepts: 4-8 entries, each a term the reader must know with a line that
actually disambiguates it.

Be accurate. Do not invent facts, figures or claims the source does not support."""


def build_ingest_prompt(source_label, subject, hint, text):
    subject_note = {
        "unity": "This library's Unity track covers Unity 6 game development.",
        "llm": "This library's LLM track covers language models, transformers, "
               "training, RAG, agents and ML foundations.",
    }.get(subject, "")
    parts = ["Source: %s" % source_label]
    if subject_note:
        parts.append(subject_note)
    if hint:
        parts.append("The person adding this said: %s" % hint)
    parts.append("\n--- BEGIN SOURCE TEXT ---\n")
    parts.append(text[:INGEST_CHAR_LIMIT])
    parts.append("\n--- END SOURCE TEXT ---\n")
    parts.append("Write the JSON entry now.")
    return "\n".join(parts)


def parse_ingest_json(raw):
    raw = raw.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    start, end = raw.find("{"), raw.rfind("}")
    if start < 0 or end <= start:
        return None
    try:
        return json.loads(raw[start:end + 1])
    except Exception:
        return None


def normalise_entry(obj, url, subject):
    def s(v, default=""):
        return v.strip() if isinstance(v, str) and v.strip() else default

    level = s(obj.get("level"), "intermediate").lower()
    if level not in ("beginner", "intermediate", "advanced"):
        level = "intermediate"
    rtype = s(obj.get("type"), "article").lower()
    if rtype not in ("video", "doc", "course", "article", "interactive"):
        rtype = "article"

    summary = []
    for sec in (obj.get("summary") or []):
        if isinstance(sec, dict):
            h, b = s(sec.get("heading")), s(sec.get("body"))
            if h and b:
                summary.append({"heading": h, "body": b})
    if not summary:
        return None, "The model did not return a usable summary."

    concepts = []
    for c in (obj.get("keyConcepts") or []):
        if isinstance(c, dict):
            t, d = s(c.get("term")), s(c.get("detail"))
            if t and d:
                concepts.append({"term": t, "detail": d})

    def strlist(key):
        return [x.strip() for x in (obj.get(key) or []) if isinstance(x, str) and x.strip()]

    title = s(obj.get("title"), "Untitled resource")
    entry = {
        "id": "custom-%s-%s" % (slugify(title), secrets.token_hex(4)),
        "subject": subject,
        "custom": True,
        "addedAt": time.strftime("%Y-%m-%d"),
        "title": title,
        "author": s(obj.get("author"), "Unknown"),
        "type": rtype,
        "level": level,
        "duration": s(obj.get("duration"), "—"),
        "cost": s(obj.get("cost"), "Free"),
        "url": url,
        "tags": [t.lower() for t in strlist("tags")][:8],
        "tldr": s(obj.get("tldr"), "Added to the hub."),
        "summary": summary,
        "keyConcepts": concepts,
        "takeaways": strlist("takeaways"),
        "pitfalls": strlist("pitfalls"),
        "diagrams": [],
        "prerequisites": [],
    }
    return entry, None


def call_claude(model, system, messages, max_tokens=MAX_TOKENS, timeout=120):
    """Returns (text, error_message). Exactly one is None."""
    key = api_key()
    if not key:
        return None, ("No ANTHROPIC_API_KEY set on the server. Stop the server, "
                      "export the key, and start it again.")
    if model not in ALLOWED_MODELS:
        model = DEFAULT_MODEL

    payload = json.dumps({
        "model": model,
        "max_tokens": max_tokens,
        "system": system,
        "messages": messages,
    }).encode("utf-8")

    request = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "content-type": "application/json",
            "x-api-key": key,
            "anthropic-version": API_VERSION,
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = ""
        try:
            detail = json.loads(e.read().decode("utf-8")).get("error", {}).get("message", "")
        except Exception:
            pass
        if e.code == 401:
            return None, "The API key was rejected (401). Check ANTHROPIC_API_KEY."
        if e.code == 429:
            return None, "Rate limited (429). Wait a moment and try again."
        if e.code == 404:
            return None, "Model '%s' is not available on this account (404)." % model
        if e.code == 400 and "credit" in detail.lower():
            return None, ("Out of API credits. Top up at console.anthropic.com "
                          "and try again.")
        return None, "Claude API error %s. %s" % (e.code, detail)
    except urllib.error.URLError as e:
        return None, "Could not reach the Claude API: %s" % e.reason
    except Exception as e:
        return None, "Unexpected error: %s" % e

    text = "".join(
        b.get("text", "") for b in data.get("content", []) if b.get("type") == "text"
    ).strip()
    return (text or ""), None


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    # quieter logs: one line per request, no noise for static assets
    def log_message(self, fmt, *args):
        if self.path.startswith("/api/"):
            sys.stderr.write("  %s %s\n" % (self.command, self.path))

    def _json(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        # keep the browser from caching data files while you edit them
        if not self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def _read_body(self, limit):
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > limit:
            raise ValueError("bad request size")
        return json.loads(self.rfile.read(length).decode("utf-8"))

    def do_GET(self):
        path = self.path.split("?")[0]
        if path == "/api/health":
            return self._json(200, {
                "ok": True,
                "apiKey": bool(api_key()),
                "models": sorted(ALLOWED_MODELS),
            })
        if path == "/api/custom":
            return self._json(200, {"items": load_custom()})
        return super().do_GET()

    def do_POST(self):
        path = self.path.split("?")[0]
        if path == "/api/ingest":
            return self.handle_ingest()
        if path == "/api/delete-custom":
            return self.handle_delete_custom()
        if path != "/api/chat":
            return self._json(404, {"error": "Unknown endpoint."})

        key = api_key()
        if not key:
            return self._json(200, {
                "error": "No ANTHROPIC_API_KEY set on the server. "
                         "Stop the server, export the key, and start it again."
            })

        try:
            req = self._read_body(400_000)
        except Exception:
            return self._json(400, {"error": "Could not read the request body."})

        model = req.get("model") or DEFAULT_MODEL
        if model not in ALLOWED_MODELS:
            model = DEFAULT_MODEL

        system = (req.get("system") or FALLBACK_SYSTEM).strip()
        context = (req.get("context") or "").strip()
        if context:
            system = system + "\n\n--- Current page context ---\n" + context

        messages = []
        for m in (req.get("messages") or []):
            role = m.get("role")
            content = (m.get("content") or "").strip()
            if role in ("user", "assistant") and content:
                messages.append({"role": role, "content": content})
        if not messages:
            return self._json(400, {"error": "No message to send."})
        # the API requires the conversation to start with a user turn
        while messages and messages[0]["role"] != "user":
            messages.pop(0)
        if not messages:
            return self._json(400, {"error": "No message to send."})

        payload = json.dumps({
            "model": model,
            "max_tokens": MAX_TOKENS,
            "system": system,
            "messages": messages,
        }).encode("utf-8")

        request = urllib.request.Request(
            API_URL,
            data=payload,
            headers={
                "content-type": "application/json",
                "x-api-key": key,
                "anthropic-version": API_VERSION,
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(request, timeout=120) as resp:
                data = json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            detail = ""
            try:
                body = json.loads(e.read().decode("utf-8"))
                detail = body.get("error", {}).get("message", "")
            except Exception:
                pass
            if e.code == 401:
                msg = "The API key was rejected (401). Check ANTHROPIC_API_KEY."
            elif e.code == 429:
                msg = "Rate limited (429). Wait a moment and try again."
            elif e.code == 404:
                msg = "Model '%s' is not available on this account (404)." % model
            else:
                msg = "Claude API error %s. %s" % (e.code, detail)
            return self._json(200, {"error": msg})
        except urllib.error.URLError as e:
            return self._json(200, {"error": "Could not reach the Claude API: %s" % e.reason})
        except Exception as e:
            return self._json(200, {"error": "Unexpected error: %s" % e})

        text = "".join(
            block.get("text", "")
            for block in data.get("content", [])
            if block.get("type") == "text"
        ).strip()

        return self._json(200, {
            "text": text or "(empty response)",
            "model": data.get("model", model),
            "usage": data.get("usage", {}),
        })

    # --- ingest ---------------------------------------------------------

    def handle_ingest(self):
        if not api_key():
            return self._json(200, {"error": "Adding resources needs ANTHROPIC_API_KEY "
                                             "set on the server."})
        try:
            req = self._read_body(UPLOAD_MAX_BYTES + 2_000_000)
        except Exception:
            return self._json(400, {"error": "Could not read the request. The file may "
                                             "be too large (12 MB limit)."})

        subject = req.get("subject") if req.get("subject") in ("unity", "llm") else "llm"
        hint = (req.get("notes") or "").strip()[:500]
        url = (req.get("url") or "").strip()
        filename = (req.get("filename") or "").strip()

        if url:
            title_guess, text, err = fetch_url(url)
            source_label = url
        elif filename and req.get("contentB64"):
            try:
                data = base64.b64decode(req["contentB64"], validate=False)
            except Exception:
                return self._json(400, {"error": "Could not decode the uploaded file."})
            if len(data) > UPLOAD_MAX_BYTES:
                return self._json(400, {"error": "File is larger than the 12 MB limit."})
            title_guess, text, err = extract_upload(filename, data)
            source_label = filename
            url = "file://" + filename
        else:
            return self._json(400, {"error": "Provide a URL or a file."})

        if err:
            return self._json(200, {"error": err})
        if not text or len(text.strip()) < 100:
            return self._json(200, {"error": "Could not extract enough text from that source."})

        prompt = build_ingest_prompt(source_label, subject, hint, text)
        raw, err = call_claude(INGEST_MODEL, INGEST_SYSTEM,
                               [{"role": "user", "content": prompt}],
                               max_tokens=INGEST_MAX_TOKENS, timeout=300)
        if err:
            return self._json(200, {"error": err})

        obj = parse_ingest_json(raw or "")
        if not obj:
            return self._json(200, {"error": "The model did not return valid JSON. Try again."})

        entry, err = normalise_entry(obj, url, subject)
        if err:
            return self._json(200, {"error": err})
        if title_guess and entry["title"].lower().startswith("untitled"):
            entry["title"] = title_guess

        items = load_custom()
        items.append(entry)
        try:
            save_custom(items)
        except Exception as e:
            return self._json(200, {"error": "Summarised it, but could not save: %s" % e})

        return self._json(200, {"item": entry, "count": len(items)})

    def handle_delete_custom(self):
        try:
            req = self._read_body(10_000)
        except Exception:
            return self._json(400, {"error": "Could not read the request body."})
        rid = (req.get("id") or "").strip()
        items = load_custom()
        remaining = [i for i in items if i.get("id") != rid]
        if len(remaining) == len(items):
            return self._json(200, {"error": "No such resource."})
        try:
            save_custom(remaining)
        except Exception as e:
            return self._json(200, {"error": "Could not save: %s" % e})
        return self._json(200, {"ok": True, "count": len(remaining)})


def main():
    p = argparse.ArgumentParser(description="Learning Hub local server")
    p.add_argument("--port", type=int, default=8000)
    p.add_argument("--host", default="127.0.0.1")
    args = p.parse_args()

    try:
        server = ThreadingHTTPServer((args.host, args.port), Handler)
    except OSError as e:
        print("Could not start on port %d: %s" % (args.port, e))
        print("Try:  python3 server.py --port 8080")
        sys.exit(1)

    key_state = "yes" if api_key() else "NO — assistant and Add disabled; rest of the site works"
    custom_n = len(load_custom())
    print("")
    print("  Learning Hub")
    print("  ──────────────────────────────────────────────")
    print("  URL          http://localhost:%d" % args.port)
    print("  API key      %s" % key_state)
    print("  Serving      %s" % ROOT)
    print("  Your adds    %d saved in data/custom-resources.json" % custom_n)
    print("  Stop         Ctrl+C")
    print("")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.\n")
        server.server_close()


if __name__ == "__main__":
    main()
