/* Learning Hub — LLM track, part 4: additional beginner and intermediate articles.
   Deeper summaries: 6–7 sections each. */
window.UNITY_RESOURCES = (window.UNITY_RESOURCES || []).concat([

{
  id: "sampling-decoding",
  subject: "llm",
  title: "Temperature, top-p and why output varies",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "beginner",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.claude.com/en/api/messages",
  tags: ["sampling", "temperature", "decoding", "fundamentals", "determinism"],
  updated: "Evergreen",
  tldr: "The knobs that decide how a token is chosen from the distribution — and the reason 'make it less creative' is a sampling problem, not a prompting one.",
  diagrams: ["sampling", "next-token"],
  prerequisites: ["llm-mental-model"],
  summary: [
    {
      heading: "What these parameters do and do not touch",
      body: "The model's forward pass produces a probability distribution over every token in the vocabulary, and that computation is entirely deterministic — identical input, identical distribution, every time. Sampling parameters do not change the model's opinion at all. They change how one token is selected from the distribution it produced. This distinction matters because it tells you which problems these knobs can solve. If the model does not know something, no temperature setting will help. If the model is producing a correct answer but phrasing it inconsistently between runs, sampling is exactly the lever you want. People routinely reach for prompt changes when the real issue is that they are sampling from a flat distribution, and reach for temperature when the real issue is that the model lacks the information."
    },
    {
      heading: "Temperature, mechanically",
      body: "Temperature divides the logits — the raw scores — before the softmax that converts them to probabilities. Dividing by a number below one makes large scores relatively larger, sharpening the distribution toward the leading candidate. Dividing by a number above one flattens it, giving unlikely tokens more of a chance. At temperature zero the implementation stops sampling altogether and takes the highest-scoring token every time, which is why it is often called greedy decoding. The practical effect compounds across a generation: a slightly flatter distribution per token becomes a substantially more varied paragraph, because each sampled token shifts the context for every token after it. That compounding is why a small temperature change can feel disproportionately large."
    },
    {
      heading: "Top-k and top-p, and why top-p won",
      body: "Both truncate the distribution before sampling, so that genuinely absurd tokens in the long tail cannot be selected even by bad luck. Top-k keeps a fixed number of the highest-probability tokens. Its weakness is that the right number depends on context: when the model is nearly certain, k of forty admits thirty-nine implausible options; when the model is genuinely uncertain across many reasonable continuations, the same k cuts off valid ones. Top-p, also called nucleus sampling, instead keeps the smallest set of tokens whose probabilities sum to p. That set is naturally small where the model is confident and large where it is not, adapting to each position. This is why top-p around 0.9 has become the common default, usually combined with a moderate temperature."
    },
    {
      heading: "Choosing settings by task",
      body: "For anything where you want the same input to give the same output — classification, extraction, structured data, routing, tests — use temperature zero. Reproducibility is worth far more than variety there, and it makes debugging tractable because you can rule out sampling noise as a cause of a change. For drafting, brainstorming, creative writing, or anything where you will read several options and pick one, raise temperature toward 0.8 to 1.0 with top-p around 0.9. For code, moderate settings around 0.2 to 0.3 tend to work better than zero, because pure greedy decoding sometimes locks into a repetitive or degenerate path; a little randomness helps it escape. Change one parameter at a time and evaluate, exactly as with any other tuning."
    },
    {
      heading: "The determinism caveat nobody mentions",
      body: "Temperature zero gives you greedy decoding, but greedy decoding does not guarantee bit-identical output across runs in practice. Floating-point arithmetic on GPUs is not associative, and results can vary slightly depending on how work is batched, which kernels are selected, and what hardware the request lands on. When two token scores are very close, a tiny numerical difference flips which one wins, and from that point the generations diverge completely. So temperature zero means far more consistent, not provably identical. If you require exact reproducibility for auditing or testing, you need to cache outputs rather than assume you can regenerate them."
    },
    {
      heading: "Two common misreadings",
      body: "The first is treating temperature zero as an accuracy setting. It is not. It makes the model's most likely answer come out every time, and if the most likely answer is a confident fabrication, you now get that fabrication reliably rather than occasionally. Low temperature reduces variance, not error. The second is stacking aggressive constraints on a reasoning model: low temperature plus a small top-k can truncate the exploratory reasoning those models are trained to perform, and quality drops for reasons that look mysterious if you do not know the cause. Reasoning models generally want their provider's default sampling settings left alone."
    },
    {
      heading: "Related controls worth knowing",
      body: "Stop sequences end generation when a given string appears, which is how you keep a model from continuing past the answer into invented follow-up dialogue. Max tokens caps length and is a direct cost control, since output tokens are the expensive ones. Frequency and presence penalties discourage repetition by reducing the scores of tokens already used — useful for long-form generation that starts looping, and harmful if applied heavily to structured output where repetition is legitimate. Seeds, where a provider supports them, pin the random draw and give you far better reproducibility at non-zero temperature than temperature zero alone does."
    }
  ],
  keyConcepts: [
    { term: "Logits", detail: "Raw pre-softmax scores. Temperature divides these, changing the shape of the distribution." },
    { term: "Greedy decoding", detail: "Temperature 0 — always take the argmax. Consistent, not provably identical." },
    { term: "Top-k", detail: "Keep the k highest tokens. Fixed count, blind to how confident the model is." },
    { term: "Top-p / nucleus", detail: "Keep the smallest set summing to p. Adapts per position; the better default." },
    { term: "Compounding variance", detail: "Each sampled token shifts context, so small changes grow across a generation." },
    { term: "Stop sequences", detail: "End generation on a string. Prevents runaway continuation." },
    { term: "Frequency penalty", detail: "Suppresses repetition. Harmful on structured output where repetition is valid." }
  ],
  takeaways: [
    "Sampling changes selection, never the model's knowledge — diagnose accordingly.",
    "Temperature 0 for anything you need repeatable; 0.8–1.0 with top-p 0.9 for variety.",
    "Prefer top-p to top-k; it adapts to how confident the model is at each position.",
    "Temperature 0 reduces variance, not error — a reliable hallucination is still a hallucination.",
    "Leave reasoning models on their default sampling settings."
  ],
  pitfalls: [
    "Treating temperature as an accuracy dial.",
    "Expecting bit-identical output at temperature 0 and building tests that assume it.",
    "Applying frequency penalties to JSON output and corrupting the structure."
  ]
},

{
  id: "chat-formats",
  subject: "llm",
  title: "System prompts, roles and chat templates",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "beginner",
  duration: "Reference",
  cost: "Free",
  url: "https://huggingface.co/docs/transformers/main/en/chat_templating",
  tags: ["prompting", "chat", "system-prompt", "fundamentals", "api"],
  updated: "Evergreen",
  tldr: "There is no conversation object anywhere — just one formatted string with role markers, rebuilt and re-sent every turn. Knowing that explains a surprising amount.",
  diagrams: ["chat-format", "context-window"],
  prerequisites: ["llm-mental-model"],
  summary: [
    {
      heading: "The illusion of a conversation",
      body: "Chat interfaces present a dialogue with a participant who remembers what was said. Underneath, each request assembles the entire history into a single token sequence, marks each turn with special tokens indicating who spoke, and asks the model to continue from the point where the assistant would begin replying. The model has no memory of previous calls and no concept of a session. It reads a transcript and writes the next line. Once this is clear, several things that seem like bugs become obviously expected: why a long conversation gets slower and more expensive with every message, why the model sometimes appears to forget the start of a long chat, and why editing an earlier message changes everything after it."
    },
    {
      heading: "The three roles and what each is for",
      body: "System carries instructions that should govern the whole conversation: who the assistant is, what format to produce, what to refuse, what domain knowledge applies. User carries input from the person. Assistant carries the model's own prior replies, which are included so it can maintain consistency and refer back. Some APIs add a tool or function role for returning results of tool calls. The important property is that these are conventions the model learned during finetuning, implemented as special tokens in the sequence — not enforced channels. The system role is attended to strongly because training taught the model to weight it, not because the architecture privileges it."
    },
    {
      heading: "Why that matters for security",
      body: "Because the system prompt is ordinary text in the same sequence, it can be argued with. A sufficiently persuasive user message, or a document retrieved into the context, can lead the model to act against the system prompt's instructions. This is the structural reason jailbreaks and prompt injection exist, and it is why no prompt wording will fully close the gap. Treat the system prompt as strong guidance that shapes default behaviour, never as an access control boundary. Anything that must not happen should be prevented outside the model — by not giving it the capability, by validating its output, or by requiring a human to approve the action."
    },
    {
      heading: "Chat templates, and the bug they cause",
      body: "Every model family has its own exact formatting for these markers, learned during its finetuning. One uses a particular header token sequence, another a different one. Feeding a model text formatted for a different family produces output that is subtly worse in ways that are hard to attribute — it still works, it just underperforms, because the model is seeing a pattern slightly unlike anything it was trained on. When using hosted APIs this is handled for you. When running open models yourself, use the tokenizer's built-in chat template function rather than hand-assembling strings; this is one of the most common and least obvious causes of 'this open model is worse than people claim'."
    },
    {
      heading: "Writing a system prompt that earns its tokens",
      body: "It is re-sent on every request, so length has a real recurring cost. The things that reliably pay for themselves: a clear statement of role and task, the output format with an example, explicit instructions for what to do when the model lacks information, and any domain vocabulary or constraints that apply throughout. The things that usually do not: long lists of prohibitions the model would not have violated, elaborate persona descriptions, and repeated emphasis. A useful test is to delete a paragraph and check whether your evaluation set notices. Most system prompts in production contain material nobody has ever verified is doing anything."
    },
    {
      heading: "Managing history as it grows",
      body: "Eventually a conversation exceeds the context window, and you must decide what to drop. The naive approach truncates the oldest turns, which silently discards the system prompt if you are not careful — always preserve it explicitly. Better approaches summarise older turns into a compact recap and keep recent turns verbatim, since recency usually matters more for coherence. For task-oriented applications, extracting structured state — decisions made, values collected — and carrying that forward beats carrying raw transcript, because it is far denser. Whatever you choose, decide it deliberately; the default behaviour of most frameworks is to truncate in a way that will surprise you at the worst moment."
    },
    {
      heading: "Prefilling the assistant turn",
      body: "A technique worth knowing: some APIs let you supply the beginning of the assistant's reply, and the model continues from there. Starting the assistant turn with an opening brace strongly pushes toward JSON output. Starting it with a specific heading enforces a structure. This works because you are literally writing the first tokens of the continuation, which constrains everything after far more firmly than an instruction does. It is one of the most reliable formatting techniques available and it is widely under-used."
    }
  ],
  keyConcepts: [
    { term: "Flat sequence", detail: "No conversation object — one token stream with role markers, rebuilt each turn." },
    { term: "System / user / assistant", detail: "Learned conventions marked by special tokens, not enforced channels." },
    { term: "Not a security boundary", detail: "The system prompt can be argued with. Enforce outside the model." },
    { term: "Chat template", detail: "Model-family-specific formatting. Use the tokenizer's, never hand-rolled." },
    { term: "History management", detail: "Truncate, summarise or extract state — but choose deliberately." },
    { term: "Assistant prefill", detail: "Supply the reply's opening tokens to constrain format hard." }
  ],
  takeaways: [
    "Every turn re-sends the whole history; cost and latency grow with conversation length.",
    "The system prompt is guidance, not enforcement — put real limits outside the model.",
    "With open models, always use the tokenizer's chat template.",
    "Preserve the system prompt explicitly when truncating history.",
    "Prefilling the assistant turn is the most reliable way to force a format."
  ],
  pitfalls: [
    "Hand-formatting role markers for an open model and quietly losing quality.",
    "Relying on a system prompt to prevent something that actually matters.",
    "Truncation that drops the system prompt along with old turns."
  ]
},

{
  id: "multimodal-basics",
  subject: "llm",
  title: "Images, audio and documents",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "beginner",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.claude.com/en/docs/build-with-claude/vision",
  tags: ["multimodal", "vision", "documents", "fundamentals"],
  updated: "Evergreen",
  tldr: "The same transformer fed different tokens. What multimodal models are genuinely reliable at, what they are not, and why a screenshot is an attack surface.",
  diagrams: ["multimodal", "tokenization"],
  prerequisites: ["llm-mental-model"],
  summary: [
    {
      heading: "One architecture, several input types",
      body: "A multimodal model is not several models bolted together. An image is divided into patches, each patch is passed through a vision encoder that produces a vector, and those vectors are projected into the same embedding space that text tokens occupy. From the transformer's point of view the result is one sequence containing both kinds of token, and attention operates across them identically — a text token can attend to an image patch and vice versa. This is why you can ask a question about a picture at all: the question and the picture are in the same sequence, and the mechanism that relates words to each other is the same one relating words to image regions."
    },
    {
      heading: "Images are expensive, in tokens",
      body: "Because patches become tokens, image cost scales with resolution. A single high-resolution photograph can consume as much of your context window as several pages of text, and you are billed for it on the same basis. Most providers tile large images and may resize them, so sending a 4000-pixel-wide image often gains nothing over sending a 1500-pixel one — the model downsamples anyway. The practical discipline is to resize before sending unless fine detail genuinely matters, crop to the region of interest where you can, and avoid sending a gallery of images when one would do. Teams are routinely surprised by their vision bills for exactly this reason."
    },
    {
      heading: "What vision models do reliably",
      body: "Describing a scene, identifying objects and their broad relationships, reading clear printed text, extracting structure from documents like invoices and forms, interpreting charts at a qualitative level, and answering questions about visible content all work well. Document understanding in particular has become strong enough to replace a lot of traditional OCR-plus-rules pipelines, because the model reads the layout and the text together and can answer questions rather than just transcribing. Screenshots of user interfaces are handled well, which is what makes computer-use and UI-testing applications viable."
    },
    {
      heading: "What they are unreliable at, and why",
      body: "Precise spatial reasoning — exactly which object is left of which, by how much — is weak, because patch embeddings carry position coarsely. Counting beyond a handful of objects is unreliable. Reading dense small text, especially handwriting, degrades sharply. Exact measurement from an image, or precise reading of unlabelled chart values, should not be trusted. The common thread is that these all require precision the patch representation does not preserve. The correct response is the same as with tokenizer artefacts: do not prompt harder, use a tool. If you need exact values, extract them programmatically and give the numbers to the model as text."
    },
    {
      heading: "Audio and the two different things it can mean",
      body: "Speech-to-text transcription, then feeding the text to a language model, is a pipeline of two systems and is what most applications actually use. Native audio models process the waveform directly and can pick up tone, emphasis, speaker changes and non-speech sound that transcription discards — at higher cost and with less mature tooling. Choose by whether the paralinguistic information matters. For extracting what was said in a meeting, transcription is cheaper and usually better. For anything where how it was said carries meaning, native audio earns its cost."
    },
    {
      heading: "PDFs are a special case worth understanding",
      body: "A PDF may contain a real text layer, in which case extraction is exact and cheap and you should use it. Or it may be a scan, in which case there is no text and you need either OCR or a vision model. Many PDFs are a mixture, with text for the body and images for figures and tables. Sending a PDF to a vision model page by page works and costs image-level tokens per page, which adds up quickly for long documents. The efficient approach is to extract the text layer where it exists and fall back to vision only for the pages that need it."
    },
    {
      heading: "The security point people miss",
      body: "Text inside an image is read by the model, which means an image is an injection vector. An attacker can place instructions in a screenshot, a document scan, or even faintly in a corner of a photograph, and a system that passes user-supplied images into a model with tool access will read and may act on them. Everything true of retrieved documents in the prompt-injection discussion applies equally to images. Treat image content as untrusted input, and never let what a model reads from a picture determine a consequential action without validation."
    }
  ],
  keyConcepts: [
    { term: "Patch embeddings", detail: "Image regions become vectors in the same space as text tokens." },
    { term: "Resolution cost", detail: "Tokens scale with image size; resize before sending unless detail matters." },
    { term: "Document understanding", detail: "Layout plus text together — often replaces OCR-and-rules pipelines." },
    { term: "Spatial weakness", detail: "Precise position, counting and measurement are unreliable by construction." },
    { term: "Transcription vs native audio", detail: "Text pipeline is cheaper; native audio keeps tone and speaker cues." },
    { term: "Text layer vs scan", detail: "Extract real PDF text when present; use vision only where it isn't." },
    { term: "Images as injection", detail: "Text in a picture is read. Screenshots are untrusted input." }
  ],
  takeaways: [
    "Resize images before sending — resolution is a direct token cost with little gain.",
    "Trust descriptions and document extraction; do not trust counting or measurement.",
    "Extract a PDF's text layer where it exists rather than sending every page as an image.",
    "Choose native audio only when tone and speaker information actually matter.",
    "Treat image content as untrusted — instructions can hide in a screenshot."
  ],
  pitfalls: [
    "Sending full-resolution photos and being surprised by the bill.",
    "Asking a vision model to count or measure and believing the answer.",
    "Passing user-uploaded images into a tool-using agent without validation."
  ]
},

{
  id: "studying-with-llms",
  subject: "llm",
  title: "Learning with an AI assistant without fooling yourself",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "beginner",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.claude.com/en/docs/intro",
  tags: ["learning", "study", "practical", "meta"],
  updated: "Evergreen",
  tldr: "A model is an extraordinary tutor and a dangerous crutch. The difference is entirely in how you use it — and the failure mode is invisible from the inside.",
  diagrams: ["llm-limits", "prompt-anatomy"],
  prerequisites: [],
  summary: [
    {
      heading: "The specific trap",
      body: "Reading a fluent explanation produces a strong feeling of understanding. That feeling is largely unrelated to whether you could reproduce the reasoning, apply it to a new case, or notice when it is wrong. Psychologists call this the fluency illusion, and AI assistants are unusually good at inducing it, because the explanations are clear, immediate, tailored to your question, and never make you struggle. Struggle is not an unfortunate side effect of learning; retrieval difficulty is a substantial part of what causes memory to form. An assistant that removes all difficulty removes much of the learning along with it. This is not an argument against using one — it is an argument for using it in ways that preserve the difficulty."
    },
    {
      heading: "Ask it to test you, not just to tell you",
      body: "The single highest-value shift is from explanation to examination. Instead of 'explain attention', ask it to give you three questions about attention at increasing difficulty, answer them yourself, then ask it to grade your answers and identify what you got wrong. This is retrieval practice, which is among the most robustly supported findings in learning science, and it converts a passive session into an active one. The assistant is unusually well suited to it because it can generate unlimited questions at any difficulty and grade free-text answers, which no flashcard system can do. Most people never ask for this because explanation is what the interface invites."
    },
    {
      heading: "Explain it back and let it find the holes",
      body: "The Feynman technique — explaining a concept in plain language until you notice where your own account goes vague — works because the vagueness is where understanding is missing. An assistant makes this far more effective, because you can write your explanation and ask it to identify what is wrong, what is missing, and what you have stated too confidently. This is a genuinely different exercise from asking it to explain, and it is uncomfortable in a way that indicates it is working. Doing this after each session of any course on this site will roughly double what you retain from it."
    },
    {
      heading: "Use it for the gap, not the whole",
      body: "The productive pattern in a structured course is to study the primary material, hit a specific point of confusion, and bring that specific confusion to the assistant. 'I understand why we divide by the square root of the dimension in attention, but I do not understand why that particular value' is a question that produces a useful answer and leaves the surrounding structure intact. Asking it to summarise the whole lecture instead means you have outsourced the encoding, and the summary will feel informative while leaving almost nothing behind. The assistant is a supplement to primary material, not a replacement, and the moment it becomes the primary material the learning largely stops."
    },
    {
      heading: "Verify, especially where it matters",
      body: "Models produce confident, fluent, plausible wrongness, and a learner is by definition not positioned to detect it in the area they are learning. This is the uncomfortable asymmetry: AI assistance is least safe exactly where you most need it. Mitigations are practical rather than theoretical. Cross-check factual claims against the primary source — a course's own slides, the documentation, the paper. Prefer questions about reasoning over questions about facts, since you can follow reasoning without prior knowledge. Be most suspicious of specific figures, version numbers, API signatures and historical claims, which are where fabrication concentrates. When it explains code, run the code."
    },
    {
      heading: "Prompts that actually work for studying",
      body: "Several patterns reliably outperform plain questions. Ask for an explanation at two levels — a simple one and a rigorous one — and compare; the gap between them is usually where the real content is. Ask what a common misconception about the topic is and whether you hold it. Ask what question you should be asking but are not, which surfaces unknown unknowns better than anything else. Ask it to argue the opposite of what it just told you, which exposes where a claim is contested rather than settled. Ask it to connect the topic to something you already know well, since analogy to existing knowledge is a strong encoding aid."
    },
    {
      heading: "Watch for the sycophancy problem",
      body: "Models are preference-trained on answers people rated highly, and people rate agreement highly. The result is a tendency to fold when pushed back on, including when the original answer was correct. For a learner this is actively dangerous: you assert something wrong, the model agrees, and your misconception is now reinforced by an authority. The defence is to ask before you reveal your own view — 'what is the relationship between X and Y' rather than 'X causes Y, right?' — and when you do disagree, ask it to argue both sides rather than to reconsider. If it reverses immediately and completely, treat that as a signal that it is accommodating you rather than reasoning."
    }
  ],
  keyConcepts: [
    { term: "Fluency illusion", detail: "Clear explanations feel like understanding. The feeling is not evidence." },
    { term: "Retrieval practice", detail: "Being tested builds memory far better than re-reading. Ask to be quizzed." },
    { term: "Feynman technique", detail: "Explain it back; ask the model to find the holes in your account." },
    { term: "Gap-filling use", detail: "Bring specific confusions, not whole topics, to the assistant." },
    { term: "Verification asymmetry", detail: "You are least able to catch errors exactly where you most need help." },
    { term: "Unknown unknowns", detail: "\"What should I be asking?\" surfaces what you did not know to ask." },
    { term: "Sycophancy", detail: "It may fold when you push back. Ask before revealing your own view." }
  ],
  takeaways: [
    "Ask to be quizzed and graded; explanation alone produces the feeling of learning, not the substance.",
    "Explain concepts back and ask for the holes in your account — the discomfort is the signal.",
    "Bring specific gaps, not whole lectures; summarising the material outsources the encoding.",
    "Verify figures, versions and API details against primary sources, always.",
    "Ask neutrally rather than seeking confirmation, or you will get agreement instead of accuracy."
  ],
  pitfalls: [
    "Reading summaries instead of primary material and mistaking coverage for understanding.",
    "Asking leading questions and having a misconception confirmed back to you.",
    "Trusting confident specifics — numbers, APIs, dates — without checking."
  ]
},

{
  id: "structured-output",
  subject: "llm",
  title: "Structured output, JSON and tool calling",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "intermediate",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.claude.com/en/docs/build-with-claude/tool-use",
  tags: ["json", "tools", "function-calling", "integration", "practical"],
  updated: "Evergreen",
  tldr: "How you get data rather than prose out of a model, and why a valid schema guarantees shape but never truth.",
  diagrams: ["tool-calling", "agent-loop"],
  prerequisites: ["prompting-foundations", "llm-mental-model"],
  summary: [
    {
      heading: "Why this is the hinge between demo and system",
      body: "A model that returns prose is useful to a human reader. A model that returns data is useful to a program, and that is what turns a chat toy into a component you can build on. Everything downstream — routing, storage, validation, chaining calls, triggering actions — requires output your code can parse without heuristics. Getting this reliable is therefore one of the highest-leverage things to learn early, and it is also where naive approaches fail in ways that only show up under load. Asking politely for JSON works ninety percent of the time, and the remaining ten percent is what wakes you up."
    },
    {
      heading: "The three levels of reliability",
      body: "The weakest approach is asking for JSON in the prompt and parsing whatever comes back. It mostly works and fails on markdown fences, trailing commentary, apologies before the object, and occasional malformed output. The middle approach is a JSON mode that guarantees syntactically valid JSON but not adherence to your particular schema — better, still permits missing or extra fields. The strongest is constrained decoding against a schema, where at each generation step the sampler masks out any token that would make the output violate the schema. Under that approach the result is valid by construction rather than by luck. Where a provider offers strict schema enforcement, use it; the reliability difference is not marginal."
    },
    {
      heading: "Tool calling is the same mechanism",
      body: "Function or tool calling is structured output with a convention attached. You declare tools with names, descriptions and parameter schemas; the model emits a structured request naming a tool and supplying arguments; your code executes the real function and returns the result as a new message; the model continues. Crucially, the model never executes anything. It produces a request, and your code decides whether to honour it. That boundary is the entire security model, and it is where careless implementations go wrong — passing model-supplied arguments straight into a shell, a query, or an HTTP call without validating them is the LLM-era version of SQL injection."
    },
    {
      heading: "Designing schemas the model can actually fill",
      body: "Schema design shapes output quality more than prompt wording does. Prefer flat structures to deeply nested ones; every level of nesting increases the chance of a structural mistake. Use enums wherever the valid values are known, because a constrained choice is far more reliable than free text you will have to normalise. Give every field a description — the model reads them, and a well-described field is filled more accurately. Include an explicit field for uncertainty or absence, such as a nullable value plus a confidence or a reason, otherwise the model will invent a plausible value rather than leave a gap. That last point is the single most common cause of silently wrong structured output."
    },
    {
      heading: "Valid is not correct",
      body: "A schema constrains shape and says nothing about truth. A model can return impeccably formed JSON with an invented date, a misattributed quote, or a total that does not match its own line items. Validation therefore has two layers: structural, which the schema handles, and semantic, which is your job. Check that numbers add up, that referenced identifiers exist, that dates are plausible, that extracted quotes actually appear in the source text. For extraction tasks specifically, requiring the model to return the exact source span alongside each extracted value makes verification mechanical and catches fabrication immediately."
    },
    {
      heading: "Failure handling in practice",
      body: "Build for the failure paths, because they will occur. Parse defensively and retry once with the error message included, since models are often able to correct a specific stated fault. Strip markdown fences before parsing, as they appear even when you ask for raw JSON. Cap retries, since a model that fails twice usually fails identically a third time and you are only spending money. Log the raw output whenever parsing fails — the failures are informative and often reveal a schema that is harder to satisfy than you realised. And where the schema is complex, consider splitting into two calls rather than asking for one elaborate object; two reliable calls beat one unreliable one."
    },
    {
      heading: "Cost and the tokens nobody counts",
      body: "Tool definitions are sent with every request, and a large set of verbose schemas can quietly become a substantial fixed cost per call, as well as consuming context you would rather spend on content. Keep descriptions tight. If you have many tools, consider a routing step that narrows to a relevant subset before the main call. Where the same tool definitions are sent repeatedly and the provider supports prompt caching, place them in the stable prefix so the repeated portion is discounted."
    }
  ],
  keyConcepts: [
    { term: "JSON mode", detail: "Guarantees valid JSON syntax. Does not guarantee your schema." },
    { term: "Constrained decoding", detail: "Masks invalid tokens per step. Output is valid by construction." },
    { term: "Tool calling", detail: "Structured output plus a convention. The model requests; your code decides." },
    { term: "Enums over free text", detail: "Constrained choices are far more reliable and need no normalisation." },
    { term: "Explicit absence field", detail: "Without one, the model invents a value rather than leaving a gap." },
    { term: "Source spans", detail: "Return the quoted span with each extraction; makes fabrication detectable." },
    { term: "Schema token cost", detail: "Tool definitions ship on every request. Keep them tight or cache them." }
  ],
  takeaways: [
    "Use strict schema enforcement where the provider offers it; the reliability gap is large.",
    "Flat schemas with enums and field descriptions beat elaborate nested ones.",
    "Always include a way for the model to say a value is absent, or it will invent one.",
    "Validate meaning separately from structure — valid JSON can be entirely false.",
    "Never pass model-supplied arguments into a shell, query or request unvalidated."
  ],
  pitfalls: [
    "Parsing without stripping markdown fences.",
    "No nullable or unknown option, so gaps get filled with confident fabrication.",
    "Treating a schema as validation of correctness rather than of shape."
  ]
},

{
  id: "vector-databases",
  subject: "llm",
  title: "Embeddings and vector search in practice",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "intermediate",
  duration: "Reference",
  cost: "Free",
  url: "https://github.com/pgvector/pgvector",
  tags: ["embeddings", "vector-db", "retrieval", "infrastructure", "rag"],
  updated: "Evergreen",
  tldr: "Index types, the operational realities, and why most projects reach for a vector database well before they need one.",
  diagrams: ["vector-db", "embeddings", "rag-pipeline"],
  prerequisites: ["rag-engineering"],
  summary: [
    {
      heading: "What is actually being stored",
      body: "An embedding model maps text to a fixed-length vector, typically a few hundred to a couple of thousand dimensions, positioned so that semantically related text lands nearby. Retrieval is then a nearest-neighbour problem: embed the query, find the stored vectors closest to it, return the associated text. Almost all systems use cosine similarity, which measures angle rather than magnitude — with normalised vectors this is equivalent to the dot product, which is why implementations often use that directly. None of this is conceptually complicated. The engineering difficulty is entirely in doing it fast at scale, and in the operational consequences of the choices you make early."
    },
    {
      heading: "You probably do not need a vector database yet",
      body: "This is the most useful practical point and the most frequently ignored. Below roughly a hundred thousand chunks, an exhaustive comparison against every stored vector is fast enough on ordinary hardware — often single-digit milliseconds — and it is exact, with no recall loss and no tuning. A NumPy array in memory, or pgvector in the Postgres you already run, covers a large fraction of real applications with no new infrastructure, no new failure mode, and no new operational burden. Teams routinely adopt a dedicated vector database at the prototype stage, then spend weeks on deployment and consistency problems that the simple approach never has. Reach for one when measurement says you need it."
    },
    {
      heading: "Index types and their trade-offs",
      body: "When exhaustive search does become too slow, approximate nearest neighbour indexes trade a small amount of recall for orders of magnitude of speed. HNSW builds a navigable multi-layer graph and searches it greedily; it gives high recall with fast queries and is the common default, at the cost of substantial memory and slow index construction. IVF partitions the space into clusters and searches only the nearest few, which is cheaper to build and tunable via how many clusters you probe. Product quantisation compresses vectors into compact codes, dramatically reducing memory at some accuracy cost, and is usually combined with IVF. The knobs on all of these trade recall against latency and memory; measure recall on your own queries rather than trusting defaults."
    },
    {
      heading: "Metadata filtering is often the real requirement",
      body: "Pure similarity search ignores everything except meaning, and most real applications cannot. You need results restricted to a tenant, a date range, a document type, a permission level. How a system handles this matters enormously: pre-filtering restricts the candidate set before searching, which is correct but can interact badly with graph indexes; post-filtering searches first and discards non-matching results, which is simpler and can return too few results when the filter is selective. Access control in particular must be enforced at retrieval, not by filtering the model's output afterwards — otherwise the model has already seen data the user is not entitled to, and can leak it."
    },
    {
      heading: "Changing the embedding model is a migration",
      body: "Vectors from different models are not comparable in any way — not across providers, not across versions of the same provider's model, not across dimension sizes. Switching means re-embedding every chunk and rebuilding every index, which for a large corpus is a real project with a real bill. This makes the initial choice more consequential than it appears. Consider dimensionality, since it drives storage and memory directly; maximum input length, which constrains your chunking; cost per million tokens at your expected volume; and whether you are willing to depend on a hosted API or would rather run an open model locally. Record which model produced which vectors, because a mixed index fails in confusing ways."
    },
    {
      heading: "Hybrid retrieval, and why it usually wins",
      body: "Semantic search finds meaning and misses exact strings. A user searching for an error code, an order number, a person's surname or an API method name wants lexical matching, and embeddings will cheerfully return conceptually similar documents that do not contain the term at all. Running both a vector search and a keyword search such as BM25, then merging the ranked lists — reciprocal rank fusion is the standard approach and is about ten lines of code — reliably beats either alone. Adding a cross-encoder reranker over the merged candidates is typically the single largest remaining quality gain: retrieve thirty cheaply, rescore them properly, keep the best five."
    },
    {
      heading: "Operational realities",
      body: "Updates and deletes are more awkward than in a normal database, because graph indexes are built for read performance rather than mutation; many systems handle deletion by tombstoning and require periodic rebuilds. Index construction on a large corpus can take hours, which matters for your deployment story. Memory is often the binding constraint with HNSW, and it is easy to underestimate — the graph is substantial on top of the vectors themselves. Plan for backup and rebuild from source documents, since an index is derived data and should be reproducible rather than precious."
    }
  ],
  keyConcepts: [
    { term: "Cosine similarity", detail: "Angle between vectors. Equivalent to dot product when normalised." },
    { term: "Exact search", detail: "Compare against everything. Simple and fast enough below ~100k chunks." },
    { term: "HNSW", detail: "Graph index, high recall, fast queries, memory hungry. The usual default." },
    { term: "IVF + PQ", detail: "Cluster then compress. Much smaller footprint, some recall lost." },
    { term: "Pre- vs post-filtering", detail: "Filter before or after search. Affects both correctness and result counts." },
    { term: "Re-indexing cost", detail: "Change embedding model, re-embed everything. Plan for it upfront." },
    { term: "Reciprocal rank fusion", detail: "Merge keyword and vector rankings. Short to implement, reliably better." }
  ],
  takeaways: [
    "Start with exact search in a array or pgvector; adopt a vector database when measurement demands it.",
    "Choose the embedding model carefully — switching later means re-embedding everything.",
    "Enforce access control at retrieval time, never by filtering output afterwards.",
    "Add hybrid retrieval and a reranker before reaching for a bigger index or model.",
    "Measure recall on your own queries; index defaults are not tuned for your data."
  ],
  pitfalls: [
    "Adopting heavyweight infrastructure for 5,000 documents.",
    "Mixing vectors from two embedding models in one index.",
    "Post-filtering by permission, so the model saw the data before it was filtered."
  ]
},

{
  id: "token-economics",
  subject: "llm",
  title: "Cost modelling and controlling spend",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "intermediate",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.claude.com/en/docs/about-claude/pricing",
  tags: ["cost", "economics", "caching", "production", "practical"],
  updated: "Evergreen",
  tldr: "Work out the per-request cost before you build, not after launch. A surprising number of LLM products never had workable economics.",
  diagrams: ["token-cost", "context-window", "kv-cache"],
  prerequisites: ["llm-mental-model"],
  summary: [
    {
      heading: "The arithmetic that should come first",
      body: "Cost is tokens in, plus tokens out, times price, times volume. Doing this calculation before building takes ten minutes and regularly changes what gets built. Estimate the tokens per request — remember the system prompt, tool definitions, retrieved context and conversation history all count as input — multiply by expected requests per user per day, multiply by users, multiply by price. Then compare to what a user is worth. Teams discover at launch, with distressing frequency, that a feature costs more per user than the subscription covers. The fix at that point is architectural and expensive; the fix beforehand is choosing a smaller model or a tighter design."
    },
    {
      heading: "Output tokens dominate",
      body: "Output is typically priced several times higher than input, and the reason is mechanical rather than commercial. Input is processed in one parallel prefill pass that saturates the GPU. Output is generated one token at a time, each step requiring a full pass over the model weights, bound by memory bandwidth rather than compute. Generating a thousand tokens genuinely costs far more than reading a thousand. The practical consequence is that asking for concise answers is a direct and substantial cost control, not a stylistic preference. Capping max tokens, requesting structured rather than discursive output, and avoiding restatement of the question in the answer all move the number meaningfully."
    },
    {
      heading: "Conversations get more expensive every turn",
      body: "Because history is re-sent on each request, a conversation's cost grows roughly quadratically in the number of turns — turn ten pays for everything that came before it. A chat product's cost per message is therefore not a constant, and modelling it as one will understate spend badly for engaged users, who are precisely the users you have most of. Mitigations are summarising older turns rather than carrying them verbatim, extracting structured state and discarding transcript, and setting a sensible conversation length before starting fresh. Measure the distribution of conversation lengths in practice; the tail is usually longer than anyone predicts."
    },
    {
      heading: "Prompt caching is the largest single lever",
      body: "Where a long prefix is identical across requests — a system prompt, tool definitions, a document being asked about repeatedly, few-shot examples — providers can cache the computed state and charge substantially less for the repeated portion. The discounts are large enough to change the economics of a feature outright. Getting it to work requires discipline: the cached portion must be a stable prefix, so anything variable belongs later in the prompt. A common and costly mistake is interpolating a timestamp, a user name or a request id near the top of the system prompt, which invalidates the cache on every single call for no benefit."
    },
    {
      heading: "Route by difficulty",
      body: "Most traffic in most applications does not need the largest model. Classification, routing, extraction, simple rewriting and short factual answers are handled well by small fast models at a fraction of the price. A tiered approach — a cheap model first, escalating to a larger one when confidence is low or the task is flagged as complex — frequently cuts spend by a large factor with little quality loss. The requirement is an evaluation set that can tell you where the cheap model is actually sufficient, which is another reason evaluation infrastructure pays for itself. Building the router before you have the evals means guessing, and the guess is usually wrong in both directions."
    },
    {
      heading: "Caching at the application layer",
      body: "Separately from provider-side prompt caching, many applications repeat identical or near-identical requests. Caching responses keyed on the normalised input is free and often catches a meaningful fraction of traffic, particularly for shared content like summaries of the same document or answers to common questions. Semantic caching — matching questions that are similar rather than identical — goes further and needs care, since two questions can be close in embedding space while requiring different answers. Start with exact-match caching, which is safe and simple, and only add semantic matching if the hit rate justifies the risk."
    },
    {
      heading: "Instrument before you optimise",
      body: "Log tokens in, tokens out, model, latency and cost per request from the first day, tagged by feature and by user. Without this you cannot tell which feature is expensive, whether cost per user is rising, or whether an optimisation helped. Set hard spend limits at the provider and alerts well below them, because a retry loop or a runaway agent can generate an extraordinary bill quickly and quietly. This is the same measure-first discipline as performance work, and it is neglected for the same reasons — right up to the invoice that makes it urgent."
    }
  ],
  keyConcepts: [
    { term: "Input vs output pricing", detail: "Output costs several times more; decode is bandwidth-bound and sequential." },
    { term: "Quadratic conversation cost", detail: "History re-sent each turn, so engaged users cost far more than average." },
    { term: "Prompt caching", detail: "Large discount on a stable prefix. Never interpolate variables into it." },
    { term: "Model routing", detail: "Cheap model first, escalate when needed. Often a large factor saved." },
    { term: "Exact-match caching", detail: "Safe, free, and catches more traffic than people expect." },
    { term: "Semantic caching", detail: "Riskier — similar questions can need different answers." },
    { term: "Per-feature instrumentation", detail: "Tag cost by feature and user or you cannot optimise anything." }
  ],
  takeaways: [
    "Do the cost arithmetic before building; it regularly changes the design.",
    "Shorter outputs are a real cost control, not a style preference.",
    "Keep cached prefixes stable — a timestamp near the top destroys the discount.",
    "Route easy traffic to cheap models, but build the eval set first.",
    "Instrument per-request cost from day one and set hard provider limits."
  ],
  pitfalls: [
    "Modelling chat cost as constant per message when it grows with conversation length.",
    "Invalidating prompt caching by interpolating variables into the system prompt.",
    "No spend cap, discovered via a runaway retry loop."
  ]
},

{
  id: "llm-security",
  subject: "llm",
  title: "Security: injection, exfiltration and defence in depth",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "intermediate",
  duration: "Reference",
  cost: "Free",
  url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
  tags: ["security", "prompt-injection", "production", "architecture"],
  updated: "Evergreen",
  tldr: "The model cannot tell your instructions from text that arrived in its context. Treat that as permanent and design around it.",
  diagrams: ["prompt-injection", "agent-loop", "llm-limits"],
  prerequisites: ["rag-engineering", "structured-output"],
  summary: [
    {
      heading: "The root cause, stated once",
      body: "Instructions and data occupy the same channel. A transformer receives one sequence of tokens and has no architectural mechanism distinguishing 'this came from the developer' from 'this came from a web page the agent fetched'. Role markers are learned conventions that strongly influence behaviour, not enforced boundaries. Every mitigation discussed below is therefore a mitigation and not a fix, and no prompt phrasing changes this. Accepting that up front leads to better architecture than repeatedly searching for the magic instruction that will finally make the model obey — because there isn't one, and systems built on the assumption that there might be are the ones that get breached."
    },
    {
      heading: "Direct and indirect injection",
      body: "Direct injection is a user trying to override your instructions through their own input: asking the model to ignore its system prompt, reveal it, or behave outside its intended role. It is the familiar case and the less dangerous one, because the attacker is typically only attacking their own session. Indirect injection is the serious one: instructions embedded in content the system retrieves or fetches — a document in your corpus, a web page, an email, a code comment, a calendar invite, text inside an image. Here the attacker reaches a system they are not directly using, and the victim is another user. Any application combining retrieval or browsing with tool access needs to take this seriously from the first design sketch."
    },
    {
      heading: "What an attacker actually wants",
      body: "Three things, roughly. Exfiltrating the system prompt, which may contain business logic, API details or embedded credentials — a reason never to put secrets in a prompt. Exfiltrating other data the model can reach, which in a RAG system means other tenants' documents and in an agent means anything its tools can read. And causing an action: sending a message, making a purchase, modifying a record, calling an API. A particularly elegant exfiltration technique worth understanding is having the model construct a URL containing stolen data and rendering it as an image or link, so the data leaves via an ordinary outbound request the moment the response is displayed. Restricting which domains your client will load resources from closes that specific hole."
    },
    {
      heading: "Layered mitigations, none sufficient alone",
      body: "Mark untrusted content clearly with delimiters and tell the model explicitly that text inside them is reference material, never instruction — this helps measurably and is trivially bypassed on its own. Apply least privilege to every tool, so the model can only reach what the current user is entitled to; retrieval must filter by permission at query time, not afterwards. Require human approval for consequential or irreversible actions. Validate all model-supplied arguments before executing anything, treating them exactly as you would untrusted user input in any other system. Constrain outbound requests to an allowlist. Use a separate model call with no tool access to screen retrieved content where the risk justifies the cost. The defence is the stack, not any single layer."
    },
    {
      heading: "The architectural principle",
      body: "The most robust designs assume the model will be compromised and ensure that compromising it is not worth much. Ask what an attacker could accomplish with complete control over the model's output, and then reduce that. If the answer is 'read one document the user could already read, and produce text', the blast radius is acceptable. If the answer is 'query any tenant's data and send email as the user', no amount of prompt hardening makes that safe. This reframing — from 'how do I stop the model being tricked' to 'what happens when it is' — is what separates systems that survive contact with adversarial users from ones that do not."
    },
    {
      heading: "Data leakage in the other direction",
      body: "Beyond attacks, there is inadvertent exposure. What goes into prompts leaves your infrastructure unless you are self-hosting, which matters for regulated data and for anything under a confidentiality obligation. Check retention terms and whether inputs may be used for training, and check them per endpoint rather than assuming consistency. Logging is a common quiet leak: prompt and response logs contain whatever users pasted, including credentials and personal data, and they are usually less protected than the primary datastore. Redact before logging, set retention limits, and treat the log store with the same care as the database."
    },
    {
      heading: "Denial of wallet",
      body: "A category that does not exist in ordinary web security: an attacker who cannot steal anything can still make you spend money. Long inputs, prompts engineered to trigger maximum-length outputs, and agent loops induced to run many steps all cost real money per request. Without per-user rate limits, token caps, step caps and spend alerts, a single motivated attacker can generate a substantial bill overnight. Treat spend as a resource to be protected with the same seriousness as data."
    }
  ],
  keyConcepts: [
    { term: "Shared channel", detail: "Instructions and data are the same tokens. The root cause of everything here." },
    { term: "Indirect injection", detail: "Instructions hidden in retrieved or fetched content. The dangerous variant." },
    { term: "Exfiltration via URL", detail: "Data smuggled out in a rendered link or image request. Allowlist outbound domains." },
    { term: "Least privilege tools", detail: "Scope every tool to the current user's actual entitlements." },
    { term: "Permission-aware retrieval", detail: "Filter at query time; filtering output is already too late." },
    { term: "Blast radius", detail: "Design for compromise: make full control of the model not worth much." },
    { term: "Denial of wallet", detail: "Attacks that cost you money rather than data. Cap tokens, steps and spend." }
  ],
  takeaways: [
    "No prompt makes injection impossible; design so that a compromised model cannot do much.",
    "Enforce permissions at retrieval and in tool scope, never by filtering output.",
    "Require human approval for irreversible actions, always.",
    "Restrict outbound requests — URL-based exfiltration is easy and commonly overlooked.",
    "Redact prompt and response logs; they are a quiet copy of everything users pasted."
  ],
  pitfalls: [
    "Putting secrets or credentials in a system prompt.",
    "A RAG index spanning tenants with filtering applied after retrieval.",
    "No per-user token or step caps, leaving spend open to abuse."
  ]
}

]);
