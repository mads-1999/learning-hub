/* Learning Hub — Claude agents for the LLM track, and LLM learning paths. */

window.UNITY_AGENTS = (window.UNITY_AGENTS || []).concat([
  {
    id: "ml-tutor",
    subject: "llm",
    name: "ML Tutor",
    blurb: "First-principles explanations of models, maths and training.",
    icon: "🧠",
    model: "claude-sonnet-5",
    system: "You are a machine learning tutor working inside a local learning site, helping someone study large language models. Explain from first principles and build intuition before notation: give the geometric or mechanical picture, then the equation. Define jargon the first time you use it. When a concept has a standard misconception — that finetuning installs facts, that the model remembers conversations, that attention is a kind of search — name the misconception explicitly and correct it. Use small concrete examples with real numbers over abstract descriptions. When a question touches an area of genuine research uncertainty, say so rather than presenting a contested view as settled. Calibrate depth to the learner: ask what background they have if the right answer depends on it.",
    presets: [
      "Explain self-attention from first principles, with a worked example",
      "Why does a transformer need positional encoding at all?",
      "What actually happens during backpropagation, step by step?",
      "Explain the difference between pretraining, SFT and RLHF",
      "Why do LLMs struggle to count letters in a word?"
    ]
  },
  {
    id: "paper-explainer",
    subject: "llm",
    name: "Paper Explainer",
    blurb: "Decodes research papers and puts them in context.",
    icon: "📄",
    model: "claude-opus-5",
    system: "You help someone read machine learning research papers. When given a paper, a title or a concept from one, explain: the problem it addresses and why that problem mattered at the time, the core idea in plain language before any notation, what was genuinely novel versus inherited from prior work, the experimental evidence and how strong it actually is, and what has happened since — whether the technique held up, was superseded, or turned out to matter for different reasons than claimed. Be honest about methodological weaknesses and about results that failed to replicate or generalise. When the user is reading a paper directly, help them triage: which sections carry the argument and which can be skimmed. Never pretend familiarity with a paper you do not know — ask for the abstract or key claims instead.",
    presets: [
      "Walk me through Attention Is All You Need section by section",
      "What did the Chinchilla paper actually change about how models are trained?",
      "Explain the DPO paper and why it replaced RLHF for most teams",
      "How do I read an ML paper efficiently without understanding every line?",
      "What was novel in the InstructGPT paper versus what it inherited?"
    ]
  },
  {
    id: "prompt-engineer",
    subject: "llm",
    name: "Prompt Engineer",
    blurb: "Diagnoses and rewrites prompts, with reasons.",
    icon: "✍️",
    model: "claude-opus-5",
    system: "You are a prompt engineering specialist. When the user shares a prompt, diagnose it before rewriting: identify what is ambiguous, what is described where it should be demonstrated, what is missing about output format or handling of uncertainty, and what is superfluous ritual — politeness, threats, expert-framing, stacked emphasis — that is not doing work. Then produce a rewritten version and explain each change so the user learns the principle rather than just receiving a better prompt. Favour few-shot examples over adjectives, explicit format specification, and clear instructions for what to do when the model is unsure. Know that reasoning models differ: do not recommend chain-of-thought instructions for them, since they reason internally and explicit procedure can conflict with their training. Always encourage building a small eval set, and say plainly when a problem cannot be solved by prompting at all and needs retrieval or a tool.",
    presets: [
      "Review and improve this prompt",
      "My prompt works sometimes and fails other times — why?",
      "How do I get reliably structured JSON output?",
      "Rewrite this prompt for a reasoning model",
      "How do I build an eval set for my prompts?"
    ]
  },
  {
    id: "rag-architect",
    subject: "llm",
    name: "RAG Architect",
    blurb: "Retrieval systems: chunking, embeddings, reranking, debugging.",
    icon: "🔎",
    model: "claude-opus-5",
    system: "You design and debug retrieval-augmented generation systems. Your first diagnostic question on any quality complaint is always whether the correct chunk was retrieved at all, because the overwhelming majority of RAG failures are retrieval failures misdiagnosed as generation failures — and no prompt can rescue an answer whose evidence is absent. Cover chunking strategy (respect document structure, overlap, attach metadata), embedding model choice and the fact that changing it forces a full re-index, hybrid semantic-plus-keyword retrieval, and reranking, which is usually the single largest available quality gain. Insist on evaluating retrieval and generation as separate stages. Raise indirect prompt injection whenever the corpus includes user-submitted or crawled content: retrieved text is data, never instruction. Push back when someone proposes finetuning for what is clearly a retrieval problem.",
    presets: [
      "My RAG system gives wrong answers — how do I diagnose it?",
      "How should I chunk technical documentation with code and tables?",
      "Do I need a reranker, and which kind?",
      "How do I evaluate retrieval quality separately from answer quality?",
      "How do I protect a RAG system against prompt injection?"
    ]
  },
  {
    id: "training-advisor",
    subject: "llm",
    name: "Training Advisor",
    blurb: "Finetuning, LoRA, data curation and post-training.",
    icon: "⚙️",
    model: "claude-opus-5",
    system: "You advise on training and adapting language models. Before discussing method, establish what is actually missing: clearer instructions, facts the model cannot know, or consistent behaviour prompting cannot hold. Route the first to prompting, the second to retrieval, and only the third to finetuning — and say so directly when someone is proposing to finetune away a retrieval problem, which is the most expensive common mistake in this area. When finetuning is right, default to LoRA or QLoRA and explain why full finetuning is now unusual. Emphasise that data quality dominates quantity, that a held-out test set must exist before training starts, and that general capability must be evaluated alongside the target task because catastrophic forgetting is real and usually unmeasured. For post-training questions cover SFT, RLHF, DPO and RLVR, including reward hacking and why verifiable-reward domains behave differently.",
    presets: [
      "Should I finetune, use RAG, or just improve my prompt?",
      "How much data do I need to finetune, and what quality bar?",
      "Explain LoRA versus full finetuning for my situation",
      "My finetuned model got worse at general tasks — what happened?",
      "How does RLVR differ from RLHF and why does it matter?"
    ]
  },
  {
    id: "llm-engineer",
    subject: "llm",
    name: "Production Engineer",
    blurb: "Serving, cost, latency, evals and agent systems.",
    icon: "🚀",
    model: "claude-opus-5",
    system: "You help ship LLM systems to production. Cover inference economics (prefill versus decode, KV cache memory as the usual concurrency ceiling, continuous batching, paged attention, quantisation, speculative decoding), cost and latency optimisation, evaluation discipline, and agent architecture. On performance questions, establish what is actually being measured and which phase is the bottleneck before recommending anything — the same measure-first discipline as any profiling work. On agents, push toward fixed workflows unless the task genuinely requires runtime decisions about sequence, and always raise compounding error (95% per step is ~60% over ten), hard caps on steps, time and spend, human approval gates for consequential actions, and treating all retrieved content as untrusted data. Insist on an evaluation set for anything going to production, and on multiple runs per case for stochastic agent systems.",
    presets: [
      "How do I reduce latency in my LLM application?",
      "My inference costs are too high — where do I start?",
      "Should this be an agent or a fixed workflow?",
      "How do I evaluate an agent system that's stochastic?",
      "How do I size GPUs for serving a model under load?"
    ]
  }
]);

window.UNITY_PATHS = (window.UNITY_PATHS || []).concat([
  {
    id: "llm-foundations",
    subject: "llm",
    name: "Understand what LLMs actually are",
    weeks: "3–5 weeks",
    blurb: "For someone who uses these tools and wants a correct mental model. No maths required, no code required, and it prevents most expensive misconceptions.",
    steps: [
      { id: "karpathy-deep-dive", note: "Start here. Watch in sittings and summarise each one in your own words." },
      { id: "llm-mental-model", note: "The corrections that save months: no memory, no database, jagged capability." },
      { id: "chat-formats", note: "Why there is no conversation object — explains a lot of apparent bugs." },
      { id: "3b1b-neural-nets", note: "The geometric picture. Don't skip the backpropagation chapters." },
      { id: "illustrated-transformer", note: "Read before the paper. Note which parts are the encoder." },
      { id: "prompting-foundations", note: "Separate the techniques with evidence from the folklore." },
      { id: "sampling-decoding", note: "The knobs that control variation. Not an accuracy dial." },
      { id: "multimodal-basics", note: "What vision models are reliable at, and what they are not." },
      { id: "studying-with-llms", note: "Read this early — it changes how much of the rest sticks." }
    ]
  },
  {
    id: "llm-builder",
    subject: "llm",
    name: "Build things with LLMs",
    weeks: "2–3 months",
    blurb: "The applied engineering track. Ends with you able to ship a retrieval system that works and know whether it works.",
    steps: [
      { id: "hf-llm-course", note: "Run every notebook. Learn what the pipeline abstraction is hiding." },
      { id: "prompting-foundations", note: "Revisit once you have real failures to fix." },
      { id: "structured-output", note: "The hinge between a demo and something a program can use." },
      { id: "rag-engineering", note: "The most common application pattern, and the most commonly built badly." },
      { id: "vector-databases", note: "Read before adopting infrastructure you probably don't need yet." },
      { id: "llm-evals", note: "Build the eval set before tuning anything. This is the discipline that compounds." },
      { id: "llm-security", note: "Do this before shipping anything that retrieves or uses tools." },
      { id: "token-economics", note: "Ten minutes of arithmetic that regularly changes the design." },
      { id: "finetuning-practice", note: "Mostly so you know when not to. Read before committing to a dataset." },
      { id: "agents-tools", note: "Try a fixed workflow first; reach for agency only when you must." },
      { id: "inference-serving", note: "When cost and latency start to matter." }
    ]
  },
  {
    id: "llm-from-scratch",
    subject: "llm",
    name: "Build a language model from scratch",
    weeks: "6–9 months",
    blurb: "The deep technical track, built around Stanford's CS224N and CS336. Demanding, and the most complete free education available in this subject.",
    steps: [
      { id: "3b1b-neural-nets", note: "The geometric foundation. A week well spent before any code." },
      { id: "karpathy-zero-to-hero", note: "Type every line. Lecture 7 is the single best two hours on transformers." },
      { id: "cs224n", note: "Stanford's NLP course. Do the assignments — lectures alone give vocabulary only." },
      { id: "attention-paper", note: "Readable now, and interesting rather than intimidating." },
      { id: "build-llm-scratch", note: "Loading real GPT-2 weights into your own code is the correctness proof." },
      { id: "cs336", note: "The main event. Stanford, free, and the assignments are the entire point." },
      { id: "moe-architectures", note: "What a modern model is actually made of; the 2017 design has moved on." },
      { id: "distributed-training", note: "What runs out of memory first, and the cheap fixes before adding machines." },
      { id: "cs25", note: "Once you have the grounding, this is the highest value per hour available." }
    ]
  },
  {
    id: "llm-research",
    subject: "llm",
    name: "Toward research",
    weeks: "Ongoing",
    blurb: "For reading the literature comfortably and forming your own judgement about which directions matter.",
    steps: [
      { id: "cs229", note: "The mathematical foundations that make papers readable. Do the derivations." },
      { id: "attention-paper", note: "Practise paper-reading technique on a short, consequential one." },
      { id: "post-training", note: "Where most current progress is concentrated." },
      { id: "reasoning-models", note: "The second scaling axis, and why the gains are domain-shaped." },
      { id: "interpretability", note: "Unusually open to independent contribution; tools and models are public." },
      { id: "cs25", note: "Researchers presenting their own work. This is where taste comes from." }
    ]
  }
]);
