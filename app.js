/* Unity Learning Hub — application logic */
(function () {
  "use strict";

  var RES = window.UNITY_RESOURCES || [];
  var DIAG = window.UNITY_DIAGRAMS || {};
  var AGENTS = window.UNITY_AGENTS || [];
  var PATHS = window.UNITY_PATHS || [];
  var CTX_PRESETS = window.UNITY_CONTEXT_PRESETS || [];

  var TYPE_ICON = { video: "▶", doc: "📄", course: "🎓", article: "✎", interactive: "◈" };
  var TYPES = ["video", "doc", "course", "article", "interactive"];
  var LEVELS = ["beginner", "intermediate", "advanced"];

  var SUBJECTS = {
    unity: { label: "Unity", ver: "Unity 6 · 6.3 LTS" },
    llm: { label: "LLMs", ver: "Transformers · 2026" }
  };

  var state = {
    subject: "unity",
    view: "library",
    open: null,          // open resource id
    q: "",
    type: null,
    level: null,
    agent: null,
    model: "claude-opus-5",
    history: [],
    busy: false,
    online: null
  };

  function subjectOf(x) { return x.subject || "unity"; }
  function agentsForSubject() {
    var list = AGENTS.filter(function (a) { return subjectOf(a) === state.subject; });
    return list.length ? list : AGENTS;
  }

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function byId(id) {
    for (var i = 0; i < RES.length; i++) if (RES[i].id === id) return RES[i];
    return null;
  }
  function levelClass(lvl) {
    if (!lvl) return "";
    if (lvl.indexOf("advanced") >= 0) return "lvl-advanced";
    if (lvl.indexOf("intermediate") >= 0) return "lvl-intermediate";
    if (lvl.indexOf("beginner") >= 0 || lvl === "all") return "lvl-beginner";
    return "";
  }

  /* ---------------- theme ---------------- */
  var saved = null;
  try { saved = localStorage.getItem("ulh-theme"); } catch (e) {}
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  function isDarkNow() {
    var cur = document.documentElement.getAttribute("data-theme");
    return cur === "dark" || (!cur && matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function paintThemeBtn() {
    $("theme").textContent = isDarkNow() ? "☀" : "☾";
  }
  $("theme").addEventListener("click", function () {
    var next = isDarkNow() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("ulh-theme", next); } catch (e) {}
    paintThemeBtn();
  });
  paintThemeBtn();
  try {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintThemeBtn);
  } catch (e) {}

  /* ---------------- reading width ---------------- */
  var savedWidth = null;
  try { savedWidth = localStorage.getItem("ulh-width"); } catch (e) {}
  if (savedWidth === "wide") document.documentElement.setAttribute("data-width", "wide");
  function paintWidthBtn() {
    var wide = document.documentElement.getAttribute("data-width") === "wide";
    $("width").setAttribute("aria-pressed", String(wide));
    $("width").title = wide ? "Switch to comfortable reading width" : "Switch to wide layout";
  }
  $("width").addEventListener("click", function () {
    var wide = document.documentElement.getAttribute("data-width") === "wide";
    if (wide) document.documentElement.removeAttribute("data-width");
    else document.documentElement.setAttribute("data-width", "wide");
    try { localStorage.setItem("ulh-width", wide ? "comfortable" : "wide"); } catch (e) {}
    paintWidthBtn();
  });
  paintWidthBtn();

  /* ---------------- filters ---------------- */
  function buildFilters() {
    var wrap = $("filters");
    var html = '<input class="search" id="search" type="search" placeholder="Search resources, topics, concepts…" aria-label="Search" value="' + esc(state.q) + '">';
    TYPES.forEach(function (t) {
      html += '<button class="chip" data-f="type" data-v="' + t + '" aria-pressed="' + (state.type === t) + '">' +
        TYPE_ICON[t] + " " + t + "</button>";
    });
    LEVELS.forEach(function (l) {
      html += '<button class="chip" data-f="level" data-v="' + l + '" aria-pressed="' + (state.level === l) + '">' + l + "</button>";
    });
    wrap.innerHTML = html;

    var s = $("search");
    s.addEventListener("input", function () { state.q = s.value; renderContent(); });
    wrap.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.dataset.f, v = b.dataset.v;
        state[f] = state[f] === v ? null : v;
        if (state.open) state.open = null;
        buildFilters(); renderContent();
      });
    });
  }

  function matches(r) {
    if (subjectOf(r) !== state.subject) return false;
    if (state.type && r.type !== state.type) return false;
    if (state.level && (r.level || "").indexOf(state.level) < 0 && r.level !== "all") return false;
    if (!state.q) return true;
    var q = state.q.toLowerCase();
    var hay = [r.title, r.author, r.tldr, (r.tags || []).join(" "),
      (r.keyConcepts || []).map(function (k) { return k.term + " " + k.detail; }).join(" "),
      (r.summary || []).map(function (s) { return s.heading; }).join(" ")].join(" ").toLowerCase();
    return hay.indexOf(q) >= 0;
  }

  /* ---------------- views ---------------- */
  function renderContent() {
    var el = $("content");
    $("filters").style.display = (state.view === "library" && !state.open) ? "flex" : "none";
    if (state.open) return renderDetail(el, byId(state.open));
    if (state.view === "paths") return renderPaths(el);
    if (state.view === "add") return renderAdd(el);
    return renderLibrary(el);
  }

  /* ---------------- add a resource ---------------- */
  function renderAdd(el) {
    var s = state.subject;
    el.innerHTML =
      '<div class="detail addpane">' +
      '<div class="section-head"><h2>Add a resource</h2><span>paste a link or upload a document — it gets read, summarised and filed</span></div>' +
      '<div class="addbox">' +
        '<div class="addrow"><label for="add-url">Link</label>' +
        '<input id="add-url" class="search" type="url" placeholder="https://… an article, docs page, or paper"></div>' +
        '<div class="ordiv"><span>or</span></div>' +
        '<div class="addrow"><label for="add-file">Document</label>' +
        '<input id="add-file" type="file" accept=".pdf,.docx,.txt,.md,.markdown,.html,.htm,.rst,.json,.csv,.py,.cs,.js,.ts"></div>' +
        '<div class="addgrid">' +
          '<div class="addrow"><label for="add-subject">File under</label>' +
          '<select id="add-subject" class="agent">' +
            '<option value="unity"' + (s === "unity" ? " selected" : "") + '>🎮 Unity</option>' +
            '<option value="llm"' + (s === "llm" ? " selected" : "") + '>🧠 LLMs</option>' +
          '</select></div>' +
          '<div class="addrow"><label for="add-notes">Note for the summariser <span class="opt">(optional)</span></label>' +
          '<input id="add-notes" class="search" type="text" placeholder="e.g. focus on the evaluation section"></div>' +
        '</div>' +
        '<div class="addactions">' +
          '<button class="btn primary" id="add-submit">Read and summarise</button>' +
          '<span class="addstatus" id="add-status"></span>' +
        '</div>' +
      '</div>' +
      '<div id="add-result"></div>' +
      renderCustomList() +
      '</div>';

    $("add-submit").addEventListener("click", submitAdd);
    $("add-url").addEventListener("keydown", function (e) {
      if (e.key === "Enter") submitAdd();
    });
    wireOpens(el);
    wireCustomDeletes(el);
  }

  function renderCustomList() {
    var mine = RES.filter(function (r) { return r.custom && subjectOf(r) === state.subject; });
    if (!mine.length) return "";
    var h = '<div class="section-head" style="margin-top:32px"><h2>Added by you</h2><span>' +
      mine.length + ' in ' + SUBJECTS[state.subject].label + '</span></div><div class="customlist">';
    mine.forEach(function (r) {
      h += '<div class="customrow">' +
        '<button class="st" data-open="' + r.id + '">' + esc(r.title) + "</button>" +
        '<span class="sn">' + esc(r.level) + " · " + esc(r.addedAt || "") + "</span>" +
        '<button class="btn danger" data-del="' + r.id + '">Remove</button></div>';
    });
    return h + "</div>";
  }

  function wireCustomDeletes(el) {
    el.querySelectorAll("[data-del]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (!confirm("Remove this resource from the hub?")) return;
        b.disabled = true;
        fetch("/api/delete-custom", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: b.dataset.del })
        }).then(function (r) { return r.json(); }).then(function (j) {
          if (j.error) { alert(j.error); b.disabled = false; return; }
          for (var i = RES.length - 1; i >= 0; i--) {
            if (RES[i].id === b.dataset.del) RES.splice(i, 1);
          }
          renderContent();
        }).catch(function () { b.disabled = false; });
      });
    });
  }

  function readFileB64(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () {
        var s = String(fr.result);
        resolve(s.slice(s.indexOf(",") + 1));
      };
      fr.onerror = function () { reject(new Error("Could not read the file.")); };
      fr.readAsDataURL(file);
    });
  }

  function submitAdd() {
    if (state.busy) return;
    var url = $("add-url").value.trim();
    var fileInput = $("add-file");
    var file = fileInput.files && fileInput.files[0];
    var status = $("add-status");

    if (!url && !file) {
      status.textContent = "Give it a link or a file first.";
      status.className = "addstatus bad";
      return;
    }
    if (file && file.size > 12 * 1024 * 1024) {
      status.textContent = "That file is over the 12 MB limit.";
      status.className = "addstatus bad";
      return;
    }

    state.busy = true;
    $("add-submit").disabled = true;
    status.className = "addstatus";
    status.innerHTML = (url ? "Fetching the page" : "Reading the file") +
      ' and summarising — this takes 30–90 seconds. <span class="dots"><span></span><span></span><span></span></span>';
    $("add-result").innerHTML = "";

    var payload = {
      subject: $("add-subject").value,
      notes: $("add-notes").value.trim()
    };

    var prep = url
      ? Promise.resolve(Object.assign(payload, { url: url }))
      : readFileB64(file).then(function (b64) {
          return Object.assign(payload, { filename: file.name, contentB64: b64 });
        });

    prep.then(function (body) {
      return fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j.error) {
          status.textContent = j.error;
          status.className = "addstatus bad";
          return;
        }
        RES.push(j.item);
        status.textContent = "Added.";
        status.className = "addstatus good";
        $("add-url").value = "";
        $("add-notes").value = "";
        fileInput.value = "";
        state.open = j.item.id;
        state.view = "library";
        selectViewTab("library");
        renderContent();
        setContextPresets();
      })
      .catch(function (e) {
        status.textContent = "Request failed: " + e.message;
        status.className = "addstatus bad";
      })
      .finally(function () {
        state.busy = false;
        var btn = $("add-submit");
        if (btn) btn.disabled = false;
      });
  }

  function card(r) {
    return '<button class="card" data-open="' + r.id + '">' +
      '<div class="card-head"><span class="type-dot">' + (TYPE_ICON[r.type] || "•") + "</span>" +
      "<div><h3>" + esc(r.title) + '</h3><div class="byline">' + esc(r.author) + "</div></div></div>" +
      "<p>" + esc(r.tldr) + "</p>" +
      '<div class="meta">' +
        '<span class="pill ' + levelClass(r.level) + '">' + esc(r.level) + "</span>" +
        '<span class="pill">' + esc(r.duration) + "</span>" +
        '<span class="pill' + (/free/i.test(r.cost) ? " free" : "") + '">' + esc(r.cost) + "</span>" +
        (r.custom ? '<span class="pill mine">yours</span>' : "") +
      "</div></button>";
  }

  function renderLibrary(el) {
    var list = RES.filter(matches);
    if (!list.length) {
      el.innerHTML = '<div class="empty">Nothing matches that. Try clearing a filter.</div>';
      return;
    }
    var groups = [
      { k: "Beginner", sub: "start here — no prerequisites",
        f: function (r) { return /beginner/.test(r.level); } },
      { k: "Intermediate", sub: "build things, and understand what you build on",
        f: function (r) { return /intermediate/.test(r.level); } },
      { k: "Advanced", sub: "depth, scale and research",
        f: function (r) { return /advanced/.test(r.level); } },
      { k: "Reference", sub: "come back to these repeatedly",
        f: function (r) { return r.level === "all"; } }
    ];
    var used = {}, html = "";
    groups.forEach(function (g) {
      var items = list.filter(function (r) { return !used[r.id] && g.f(r); });
      items.forEach(function (r) { used[r.id] = 1; });
      if (!items.length) return;
      html += '<div class="section-head"><h2>' + g.k + "</h2><span>" + g.sub +
        " · " + items.length + "</span></div>" +
        '<div class="grid">' + items.map(card).join("") + "</div>";
    });
    var rest = list.filter(function (r) { return !used[r.id]; });
    if (rest.length) {
      html += '<div class="section-head"><h2>More</h2><span>' + rest.length + "</span></div>" +
        '<div class="grid">' + rest.map(card).join("") + "</div>";
    }
    el.innerHTML = html;
    wireOpens(el);
  }

  function diagramFigure(id) {
    var d = DIAG[id];
    if (!d) return "";
    return '<figure class="dg"><div class="dg-title">' + esc(d.title) + "</div>" + d.svg +
      "<figcaption>" + esc(d.caption) + "</figcaption></figure>";
  }

  function renderDetail(el, r) {
    if (!r) { state.open = null; return renderContent(); }
    var h = '<div class="detail"><button class="back" id="back">← Back to library</button>';
    h += "<h2>" + esc(r.title) + "</h2>";
    h += '<div class="byline">' + esc(r.author) + " · " + esc(r.type) + " · " + esc(r.duration) +
      " · " + esc(r.cost) + (r.updated ? " · " + esc(r.updated) : "") + "</div>";
    h += '<div class="tldr">' + esc(r.tldr) + "</div>";

    h += '<div class="detail-actions">';
    h += '<a class="btn primary" href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">Open resource ↗</a>';
    h += '<button class="btn" data-ask="' + r.id + '">Ask the assistant about this</button>';
    h += "</div>";

    if (r.prerequisites && r.prerequisites.length) {
      h += '<div class="note"><h4>Do these first</h4><div>' +
        r.prerequisites.map(function (p) {
          var pr = byId(p);
          return pr ? '<button class="btn" data-open="' + pr.id + '" style="margin:2px 4px 2px 0">' + esc(pr.title) + "</button>" : "";
        }).join("") + "</div></div>";
    }

    var diags = (r.diagrams || []).slice();
    (r.summary || []).forEach(function (s, i) {
      h += "<section><h3>" + esc(s.heading) + "</h3><p>" + esc(s.body) + "</p></section>";
      // interleave diagrams after the first and third sections
      if ((i === 0 || i === 2 || i === 4) && diags.length) h += diagramFigure(diags.shift());
    });
    while (diags.length) h += diagramFigure(diags.shift());

    if (r.keyConcepts && r.keyConcepts.length) {
      h += "<h3>Key concepts</h3><dl class=\"kc\">";
      r.keyConcepts.forEach(function (k) {
        h += '<div class="kc-row"><dt>' + esc(k.term) + "</dt><dd>" + esc(k.detail) + "</dd></div>";
      });
      h += "</dl>";
    }
    if (r.takeaways && r.takeaways.length) {
      h += "<h3>What to take away</h3><ul class=\"clean\">" +
        r.takeaways.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
    }
    if (r.pitfalls && r.pitfalls.length) {
      h += '<div class="note bad"><h4>Common pitfalls</h4><ul class="clean warn" style="margin-bottom:0">' +
        r.pitfalls.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";
    }
    if (r.tags && r.tags.length) {
      h += '<div class="meta" style="margin-top:22px">' +
        r.tags.map(function (t) { return '<span class="pill">#' + esc(t) + "</span>"; }).join("") + "</div>";
    }
    h += "</div>";
    el.innerHTML = h;
    el.scrollIntoView({ block: "start" });
    window.scrollTo(0, 0);

    $("back").addEventListener("click", function () { state.open = null; renderContent(); setContextPresets(); });
    wireOpens(el);
    el.querySelectorAll("[data-ask]").forEach(function (b) {
      b.addEventListener("click", function () {
        openChat();
        $("input").focus();
      });
    });
    setContextPresets();
  }

  function renderPaths(el) {
    var h = '<div class="section-head"><h2>Learning paths</h2><span>ordered routes, not a menu</span></div>';
    PATHS.filter(function (p) { return subjectOf(p) === state.subject; }).forEach(function (p) {
      h += '<div class="path"><h3>' + esc(p.name) + '</h3><div class="weeks">' + esc(p.weeks) + "</div>" +
        "<p>" + esc(p.blurb) + '</p><ol class="steps">';
      p.steps.forEach(function (s) {
        var id = s.ref || s.id;
        var r = byId(id);
        if (!r) return;
        h += '<li><div><button class="st" data-open="' + r.id + '">' + esc(r.title) + '</button>' +
          '<div class="sn">' + esc(s.note) + "</div></div></li>";
      });
      h += "</ol></div>";
    });
    el.innerHTML = h;
    wireOpens(el);
  }

  function selectViewTab(view) {
    document.querySelectorAll("[data-view]").forEach(function (t) {
      t.setAttribute("aria-selected", String(t.dataset.view === view));
    });
  }

  function wireOpens(el) {
    el.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () {
        var r = byId(b.dataset.open);
        if (r && subjectOf(r) !== state.subject) setSubject(subjectOf(r), true);
        state.open = b.dataset.open;
        state.view = "library";
        selectViewTab("library");
        renderContent();
      });
    });
  }

  document.querySelectorAll("[data-view]").forEach(function (t) {
    t.addEventListener("click", function () {
      state.view = t.dataset.view;
      state.open = null;
      selectViewTab(state.view);
      renderContent();
      setContextPresets();
    });
  });

  function setSubject(subject, keepOpen) {
    state.subject = subject;
    if (!keepOpen) { state.open = null; state.q = ""; state.type = null; state.level = null; }
    document.querySelectorAll("[data-subject]").forEach(function (t) {
      t.setAttribute("aria-selected", String(t.dataset.subject === subject));
    });
    var ver = $("subject-ver");
    if (ver) ver.textContent = SUBJECTS[subject].ver;
    var inp = $("input");
    if (inp) inp.placeholder = "Ask about " + SUBJECTS[subject].label + "…";
    var empty = $("empty");
    if (empty && state.online !== false) {
      empty.innerHTML = "Pick an agent, then a preset prompt — or ask anything about " +
        esc(SUBJECTS[subject].label) + ".<br><br>Open a resource and the assistant answers in its context.";
    }
    var first = agentsForSubject()[0];
    if (first) {
      state.agent = first.id;
      state.model = first.model;
    }
    buildAgents();
    if (!keepOpen) { buildFilters(); renderContent(); }
    setContextPresets();
  }

  document.querySelectorAll("[data-subject]").forEach(function (t) {
    t.addEventListener("click", function () { setSubject(t.dataset.subject); });
  });

  /* ---------------- chat ---------------- */
  var agentsWired = false;
  function buildAgents() {
    var sel = $("agent");
    var list = agentsForSubject();
    if (!state.agent || !list.some(function (a) { return a.id === state.agent; })) {
      state.agent = list[0].id;
      state.model = list[0].model;
    }
    sel.innerHTML = list.map(function (a) {
      return '<option value="' + a.id + '">' + a.icon + "  " + esc(a.name) + "</option>";
    }).join("");
    sel.value = state.agent;
    if (!agentsWired) {
      agentsWired = true;
      sel.addEventListener("change", function () {
        state.agent = sel.value;
        var a = currentAgent();
        state.model = a.model;
        $("model").value = a.model;
        setContextPresets();
        showBlurb();
      });
      $("model").addEventListener("change", function () { state.model = $("model").value; });
    }
    $("model").value = state.model;
    showBlurb();
  }
  function currentAgent() {
    var list = agentsForSubject();
    for (var i = 0; i < list.length; i++) if (list[i].id === state.agent) return list[i];
    return list[0];
  }
  function showBlurb() {
    var a = currentAgent();
    $("agent-blurb").textContent = a ? a.blurb : "";
  }

  function setContextPresets() {
    var a = currentAgent();
    var list = $("preset-list");
    var h = "";
    var r = state.open ? byId(state.open) : null;
    if (r) {
      CTX_PRESETS.forEach(function (p) {
        var t = p.replace("{title}", r.title);
        h += '<button class="preset ctx" data-p="' + esc(t) + '">' + esc(t) + "</button>";
      });
    }
    (a ? a.presets : []).forEach(function (p) {
      h += '<button class="preset" data-p="' + esc(p) + '">' + esc(p) + "</button>";
    });
    list.innerHTML = h;
    list.querySelectorAll(".preset").forEach(function (b) {
      b.addEventListener("click", function () {
        $("input").value = b.dataset.p;
        autoSize();
        send();
      });
    });
    renderCtxTag();
  }

  function renderCtxTag() {
    var w = $("ctx-wrap");
    var r = state.open ? byId(state.open) : null;
    if (!r) { w.innerHTML = ""; return; }
    w.innerHTML = '<span class="ctx-tag">context: ' + esc(r.title) + ' <button id="clear-ctx" title="Clear context">✕</button></span>';
    var c = $("clear-ctx");
    if (c) c.addEventListener("click", function () { state.open = null; renderContent(); setContextPresets(); });
  }

  function mdToHtml(s) {
    var out = esc(s);
    var blocks = [];
    out = out.replace(/```(\w+)?\n?([\s\S]*?)```/g, function (m, lang, code) {
      blocks.push("<pre><code>" + code.replace(/\n$/, "") + "</code></pre>");
      return "\u0000" + (blocks.length - 1) + "\u0000";
    });
    out = out.replace(/`([^`\n]+)`/g, "<code>$1</code>");
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/(^|[^*\w])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    out = out.replace(/(^|\n)#{1,4}\s*([^\n]+)/g, "$1<strong>$2</strong>");
    var lines = out.split("\n"), html = "", inList = false;
    lines.forEach(function (ln) {
      if (/^\s*[-*]\s+/.test(ln)) {
        if (!inList) { html += "<ul>"; inList = true; }
        html += "<li>" + ln.replace(/^\s*[-*]\s+/, "") + "</li>";
      } else {
        if (inList) { html += "</ul>"; inList = false; }
        if (ln.trim()) html += "<p>" + ln + "</p>";
      }
    });
    if (inList) html += "</ul>";
    html = html.replace(/\u0000(\d+)\u0000/g, function (m, i) { return blocks[+i]; });
    html = html.replace(/<p>(<pre>[\s\S]*?<\/pre>)<\/p>/g, "$1");
    return html;
  }

  function addMsg(role, text, cls) {
    var e = $("empty"); if (e) e.remove();
    var d = document.createElement("div");
    d.className = "msg " + role + (cls ? " " + cls : "");
    d.innerHTML = '<div class="who">' + (role === "user" ? "you" : currentAgent().name) + "</div>" +
      '<div class="bubble">' + (role === "user" ? "<p>" + esc(text) + "</p>" : mdToHtml(text)) + "</div>";
    $("msgs").appendChild(d);
    $("msgs").scrollTop = $("msgs").scrollHeight;
    return d;
  }

  function autoSize() {
    var t = $("input");
    t.style.height = "auto";
    t.style.height = Math.min(t.scrollHeight, 170) + "px";
  }
  $("input").addEventListener("input", autoSize);
  $("input").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });
  $("send").addEventListener("click", send);

  function contextBlock() {
    var r = state.open ? byId(state.open) : null;
    if (!r) return null;
    var parts = [];
    parts.push("The learner is currently reading this resource on the site:");
    parts.push("Title: " + r.title + " — by " + r.author + " (" + r.type + ", " + r.level + ", " + r.duration + ")");
    parts.push("URL: " + r.url);
    parts.push("Summary: " + r.tldr);
    if (r.keyConcepts) parts.push("Key concepts covered: " + r.keyConcepts.map(function (k) { return k.term; }).join(", "));
    if (r.takeaways) parts.push("Stated takeaways: " + r.takeaways.join(" | "));
    if (r.pitfalls) parts.push("Known pitfalls: " + r.pitfalls.join(" | "));
    parts.push("Answer in the context of this resource where relevant.");
    return parts.join("\n");
  }

  function send() {
    if (state.busy) return;
    var t = $("input");
    var text = t.value.trim();
    if (!text) return;
    t.value = ""; autoSize();
    addMsg("user", text);
    state.history.push({ role: "user", content: text });
    state.busy = true;
    $("send").disabled = true;

    var thinking = addMsg("assistant", "");
    thinking.querySelector(".bubble").innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agent: state.agent,
        model: state.model,
        system: currentAgent().system,
        context: contextBlock(),
        messages: state.history.slice(-16)
      })
    })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, j: j }; }); })
      .then(function (r) {
        thinking.remove();
        if (!r.ok || r.j.error) {
          addMsg("assistant", r.j.error || "Request failed.", "error");
          return;
        }
        addMsg("assistant", r.j.text);
        state.history.push({ role: "assistant", content: r.j.text });
      })
      .catch(function (err) {
        thinking.remove();
        addMsg("assistant", "Could not reach the local server. Is it running? (" + err.message + ")", "error");
      })
      .finally(function () {
        state.busy = false;
        $("send").disabled = false;
      });
  }

  /* ---------------- health ---------------- */
  function checkHealth() {
    fetch("/api/health")
      .then(function (r) { return r.json(); })
      .then(function (j) {
        state.online = !!j.apiKey;
        var s = $("status");
        if (j.apiKey) { s.textContent = "live"; s.className = "status live"; }
        else {
          s.textContent = "offline"; s.className = "status off";
          var e = $("empty");
          if (e) {
            e.innerHTML = "No API key set, so the assistant can't answer yet.<br><br>" +
              "Stop the server, run <code>export ANTHROPIC_API_KEY=sk-ant-…</code> and start it again.<br><br>" +
              "Everything else on the site works without a key.";
          }
        }
      })
      .catch(function () {
        var s = $("status");
        s.textContent = "no server"; s.className = "status off";
      });
  }

  /* ---------------- mobile chat ---------------- */
  function openChat() { $("app").classList.add("chat-open"); }
  $("open-chat").addEventListener("click", openChat);
  $("close-chat").addEventListener("click", function () { $("app").classList.remove("chat-open"); });

  /* ---------------- boot ---------------- */
  function loadCustom() {
    return fetch("/api/custom")
      .then(function (r) { return r.json(); })
      .then(function (j) {
        (j.items || []).forEach(function (item) {
          if (item && item.id && !byId(item.id)) RES.push(item);
        });
      })
      .catch(function () { /* server may be older; the rest still works */ });
  }

  buildFilters();
  setSubject("unity");
  checkHealth();
  loadCustom().then(function () { renderContent(); });
})();
