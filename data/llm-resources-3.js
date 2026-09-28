/* Learning Hub — LLM track, part 3: Advanced
   Build at scale, understand the internals, ship systems that hold up. */
window.UNITY_RESOURCES = (window.UNITY_RESOURCES || []).concat([

{
  id: "cs336",
  subject: "llm",
  title: "Stanford CS336 — Language Modeling from Scratch",
  author: "Stanford · Percy Liang, Tatsunori Hashimoto (Spring 2026)",
  type: "course",
  level: "advanced",
  duration: "19 lectures + 5 substantial assignments",
  cost: "Free (lectures and assignments public)",
  url: "https://stanford-cs336.github.io/spring2025/",
  tags: ["stanford", "course", "from-scratch", "systems", "scaling", "video", "training", "rl"],
  updated: "Spring 2026 lectures on YouTube",
  tldr: "The most serious LLM course available anywhere, free. You build the entire stack — tokenizer, transformer, kernels, distributed training, data pipeline, alignment — with nothing handed to you.",
  diagrams: ["transformer-block", "tokenization", "scaling-laws", "kv-cache", "training-pipeline"],
  prerequisites: ["cs224n", "build-llm-scratch"],
  summary: [
    {
      heading: "The thesis behind the course",
      body: "Percy Liang's framing when the course launched was that researchers have become detached from the technical details of how language models actually work — people study, deploy and write about LLMs while treating the model itself as an opaque artifact behind an API. CS336 is the deliberate correction: students build everything. Not a toy version with the hard parts imported, but the actual stack, including the systems engineering that most courses omit entirely. There is no other free course that attempts this scope, and there are few paid ones either."
    },
    {
      heading: "What you actually build",
      body: "Five assignments, each substantial. Assignment one is the basics: implement a byte-pair encoding tokenizer, the transformer architecture, and the optimiser, from scratch. Assignment two is systems: profile and optimise attention, write custom kernels with Triton, and build distributed training code. Assignment three is scaling: analyse how transformer components behave as you grow them and fit actual scaling laws. Assignment four is data: process Common Crawl, filter and deduplicate at scale — the unglamorous work that determines model quality more than architecture does. Assignment five is alignment and reasoning: supervised finetuning and reinforcement learning for mathematical reasoning."
    },
    {
      heading: "The systems material is the rarest part",
      body: "Most machine learning education stops at the mathematics and treats hardware as someone else's problem. This course goes into GPUs and TPUs, memory hierarchies, kernel fusion, writing Triton kernels, mixed precision, and the various parallelism strategies — data, tensor, pipeline — used to spread training across many devices. This is where the real constraints of frontier model development live. Understanding why attention was reimplemented to be memory-aware rather than compute-optimal, or why a particular parallelism strategy suits a particular cluster topology, is knowledge that essentially cannot be picked up from blog posts. It is also the most directly employable material in the course."
    },
    {
      heading: "Data and alignment, treated seriously",
      body: "The data assignment deserves particular attention because it addresses what practitioners consistently report as the dominant factor in model quality, and what almost no course teaches. Sourcing from Common Crawl, filtering for quality, deduplicating at scale, handling the long tail of formatting garbage — this is where a large fraction of real effort goes at frontier labs. The alignment assignment covers supervised finetuning and reinforcement learning applied to reasoning, which is the current frontier of post-training and connects directly to how reasoning models are produced."
    },
    {
      heading: "The prerequisites are not decorative",
      body: "Stated: Python proficiency and real software engineering skill, PyTorch experience and systems knowledge, calculus, linear algebra, probability and statistics, and prior machine learning and deep learning coursework. Take these seriously. Students consistently report the assignments as demanding even with that background. If you have not implemented a transformer before, do Karpathy's series or Raschka's book first — arriving already knowing what a multi-head attention block is lets you spend your attention on the systems questions, which is where the unique value is. Attempting this as your first deep dive is the most common way people bounce off it."
    },
    {
      heading: "How to approach it independently",
      body: "The lecture videos for Spring 2026 are on YouTube and the course site carries assignments, handouts and starter code. Self-studying is realistic if you are disciplined, and the assignments are the point — watching nineteen lectures without doing them gives you an impressive vocabulary and no capability. Budget several months at part-time pace. A GPU helps considerably; several assignments are painful on CPU alone, and cloud rental for the heavier ones is a reasonable expense. Work with someone else if you can, because the debugging is hard and having a second person to compare against turns multi-day blockages into afternoons."
    }
  ],
  keyConcepts: [
    { term: "BPE from scratch", detail: "Assignment one. Tokenization stops being a mystery permanently." },
    { term: "Triton kernels", detail: "Writing GPU kernels directly. Rare knowledge, highly employable." },
    { term: "Parallelism strategies", detail: "Data, tensor and pipeline parallel — how training spreads across devices." },
    { term: "Scaling law fitting", detail: "Fit the curves yourself rather than reading about them." },
    { term: "Data filtering and dedup", detail: "Common Crawl processing — the unglamorous determinant of quality." },
    { term: "RL for reasoning", detail: "Post-training with reinforcement learning on mathematical tasks." },
    { term: "Mixture of experts", detail: "On the syllabus alongside attention alternatives and architecture variants." }
  ],
  takeaways: [
    "The deepest free LLM course in existence — and the assignments are the entire point.",
    "The systems material (kernels, parallelism, hardware) is what you cannot get elsewhere.",
    "Do not attempt it as a first deep dive; implement a transformer somewhere easier first.",
    "Budget months, arrange GPU access, and find someone to work alongside."
  ],
  pitfalls: [
    "Underestimating the prerequisites and stalling on assignment two.",
    "Watching lectures without doing assignments — vocabulary without capability.",
    "Trying to run the heavier assignments on CPU and concluding the material is impossible."
  ]
},

{
  id: "cs25",
  subject: "llm",
  title: "Stanford CS25 — Transformers United",
  author: "Stanford (V6, current)",
  type: "video",
  level: "advanced",
  duration: "~10 talks per iteration, 1h each",
  cost: "Free",
  url: "https://web.stanford.edu/class/cs25/",
  tags: ["stanford", "video", "seminar", "research", "frontier", "multimodal"],
  updated: "V6; new iteration each year, videos public",
  tldr: "A seminar series where the people doing the research come and present it. The closest thing to sitting in the room where the field is being argued about.",
  diagrams: ["transformer-block", "scaling-laws"],
  prerequisites: ["cs224n"],
  summary: [
    {
      heading: "What this format gives you",
      body: "CS25 is not a taught course with a curriculum — it is a seminar where researchers present their own work, and the talks are published. The value is different in kind from a structured course. You get the current state of specific research directions from the people responsible, including the parts that do not make it into papers: what they tried that failed, which results they find surprising, where they think the field is heading and why they disagree with each other. This is how you develop taste about which directions are promising, which is not something a curriculum can teach you."
    },
    {
      heading: "What V6 covers",
      body: "The current iteration spans an overview of transformers, state space models and the genuine tradeoffs against attention, multimodal intelligence built natively rather than bolted on, representation learning extending toward world modelling, collaborative AI agents applied to science and medicine, and broader arguments about where next-token prediction leads. The state space model talk is worth particular attention because it engages honestly with the strongest current challenge to attention's dominance rather than dismissing it."
    },
    {
      heading: "How to use it",
      body: "Do not watch it linearly like a course; it is not structured that way and earlier iterations cover different ground. Pick talks on topics you already have some grounding in, because the speakers assume familiarity and will not stop to define terms. Watch with the associated paper open — the talk frequently makes a dense paper suddenly legible, and the combination is much stronger than either alone. Earlier iterations remain available and several talks are now historically interesting as snapshots of what the field believed at the time."
    },
    {
      heading: "When you are ready for it",
      body: "This is genuinely advanced material and requires CS224N-level background to get value from. If you find yourself lost within the first ten minutes of a talk, that is a signal to go back and fill the gap rather than push through — seminar talks are not designed to be self-contained, and there is no shame in it. Conversely, once you do have the background, this is among the highest-value-per-hour material available, because it is current in a way no textbook can be."
    }
  ],
  keyConcepts: [
    { term: "State space models", detail: "The main structural alternative to attention; V6 covers the real tradeoffs." },
    { term: "Native multimodality", detail: "Built in from the start rather than bolted on afterwards." },
    { term: "World modelling", detail: "Representation learning extended toward models of environments." },
    { term: "Collaborative agents", detail: "Multi-agent systems applied to scientific and medical work." },
    { term: "Research taste", detail: "The actual deliverable — judgement about which directions matter." }
  ],
  takeaways: [
    "Pick individual talks by topic; this is not a linear course.",
    "Watch with the paper open — together they are far stronger than separately.",
    "Requires CS224N-level grounding; being lost means go back, not push on.",
    "The unique value is current research taste, which no textbook provides."
  ],
  pitfalls: [
    "Starting here without foundations and concluding the field is impenetrable.",
    "Treating a seminar talk as a tutorial; it assumes you already know the area."
  ]
},

{
  id: "cs229",
  subject: "llm",
  title: "Stanford CS229 — Machine Learning",
  author: "Stanford · Andrew Ng and successors",
  type: "course",
  level: "advanced",
  duration: "~20 lectures, semester-length",
  cost: "Free",
  url: "https://cs229.stanford.edu/",
  tags: ["stanford", "course", "math", "foundations", "video", "theory"],
  updated: "Course site current; full lecture recordings public",
  tldr: "The mathematical foundations under everything else. Rigorous, derivation-heavy, and the course that makes research papers readable.",
  diagrams: ["scaling-laws"],
  prerequisites: [],
  summary: [
    {
      heading: "Why a classical ML course belongs in an LLM curriculum",
      body: "You can build useful LLM applications without this. You cannot read the research literature comfortably without it, and you will hit a ceiling in understanding why techniques work rather than merely that they do. CS229 covers the mathematical machinery — maximum likelihood estimation, gradient methods and their convergence properties, regularisation, the bias-variance decomposition, generalisation theory, expectation-maximisation — that modern papers assume without comment. When a paper says a loss is the negative log-likelihood under a particular assumption, this is the course that makes that sentence meaningful rather than decorative."
    },
    {
      heading: "What it actually covers",
      body: "Supervised learning from linear and logistic regression through generalised linear models, generative learning algorithms, kernel methods and support vector machines. Learning theory: bias-variance, the trade-offs in model selection, why more data helps and when it stops helping. Unsupervised learning: clustering, expectation-maximisation, principal component analysis. Reinforcement learning fundamentals, which underpin the post-training stage of every modern chat model. The neural network material is present but is not the emphasis — for deep learning depth, CS224N and CS336 are the follow-ons."
    },
    {
      heading: "The derivations are the content",
      body: "This course derives things. You will work through the maximum likelihood derivation of linear regression, see why the normal equations have the form they do, and derive the update rules rather than being handed them. It is tempting to skip this and treat the results as facts to memorise, and doing so removes most of the value. The transferable skill is the ability to follow a derivation, which is precisely what reading papers requires. The problem sets are mathematically demanding and are where the learning happens."
    },
    {
      heading: "Which version to use",
      body: "Andrew Ng's recordings remain widely used and the teaching is exceptional, though they predate the deep learning era and some of the applied framing is dated. The current course site carries updated notes and problem sets. The mathematical core has not changed and is not going to — maximum likelihood is maximum likelihood. If you want the same foundations in a gentler form, Ng's Coursera specialisation covers similar ground with far less mathematical demand, at the cost of the rigour that makes papers accessible. Choose based on whether reading research is a goal for you."
    }
  ],
  keyConcepts: [
    { term: "Maximum likelihood", detail: "The framing underneath most loss functions, including next-token prediction." },
    { term: "Bias-variance", detail: "Why models underfit or overfit, and what to do about each." },
    { term: "Regularisation", detail: "Constraining capacity to improve generalisation. Everywhere in practice." },
    { term: "Generalisation theory", detail: "Why learning from finite data works at all." },
    { term: "EM algorithm", detail: "Learning with latent variables; the pattern recurs widely." },
    { term: "RL fundamentals", detail: "The basis of RLHF and modern post-training." }
  ],
  takeaways: [
    "Optional for building applications; close to required for reading research.",
    "Do the derivations rather than memorising results — that is the transferable skill.",
    "The RL material connects directly to how chat models are post-trained.",
    "Choose the Coursera version if you want the concepts without the mathematical demand."
  ],
  pitfalls: [
    "Skipping the maths and retaining a vocabulary you cannot apply.",
    "Expecting LLM content; this is foundations, and deliberately so."
  ]
},

{
  id: "post-training",
  subject: "llm",
  title: "Post-training: SFT, RLHF, DPO and RLVR",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://arxiv.org/abs/2203.02155",
  tags: ["rlhf", "dpo", "alignment", "training", "reasoning"],
  updated: "Evergreen; RLVR is the active frontier",
  tldr: "How a text completer becomes an assistant. The stage that produced ChatGPT from GPT-3 and, more recently, reasoning models from ordinary ones.",
  diagrams: ["training-pipeline", "evals"],
  prerequisites: ["karpathy-deep-dive", "cs229"],
  summary: [
    {
      heading: "The problem post-training solves",
      body: "A pretrained model completes text. Ask it a question and a plausible continuation might be another question, because that is what documents containing questions often look like. It has enormous latent capability and no inclination to be useful. Post-training is the set of techniques that converts that capability into an assistant that answers, follows instructions, maintains a consistent register, and declines what it should decline. The gap between GPT-3 and ChatGPT was almost entirely this, which is why it was such a striking demonstration — the underlying capability was largely already there."
    },
    {
      heading: "Supervised finetuning, and its ceiling",
      body: "The first stage is straightforward: collect high-quality conversations and train the model to imitate the responses. This works well and gets you most of the way to something usable. Its limit is that it can only teach the model to reproduce demonstrations, and writing a demonstration of the best possible answer is hard — human demonstrators are inconsistent, and for many prompts nobody can produce an ideal response on demand. What people can do far more reliably than writing the best answer is recognising which of two answers is better. That asymmetry is what the next stage exploits."
    },
    {
      heading: "RLHF, and what the reward model really is",
      body: "Reinforcement learning from human feedback collects comparisons — annotators rank competing responses — and trains a reward model to predict those preferences. The language model is then optimised against that reward model, typically with PPO, with a penalty term keeping it from drifting too far from the supervised starting point. The subtlety worth internalising is that the reward model is a learned approximation of human preference, not human preference itself, and optimising hard against any approximation eventually exploits its errors. This is reward hacking, and it shows up as models that produce responses scoring well while being worse — excessive hedging, padded length, confident agreement. Sycophancy has a substantial part of its origin here: agreeable answers were rated highly."
    },
    {
      heading: "DPO and the simplification",
      body: "Direct preference optimisation observes that if the goal is a policy optimal under a preference model, you can derive a loss that optimises directly on preference pairs without training a separate reward model or running reinforcement learning at all. It is dramatically simpler to implement and to stabilise, needs less compute, and performs comparably on many tasks. It is now the default starting point for most teams doing preference training, with full RLHF reserved for cases where the extra control justifies the complexity. A family of related methods — IPO, KTO and others — trade off differently on the same underlying idea."
    },
    {
      heading: "RLVR and reasoning models",
      body: "The most consequential recent development is reinforcement learning from verifiable rewards. Where RLHF learns a reward model from human taste, RLVR uses domains where correctness can be checked mechanically — mathematics with a checkable answer, code that either passes tests or does not. Because the reward signal is ground truth rather than an approximation, you can optimise against it much harder without reward hacking. This is the technique behind reasoning models that produce extended chains of thought before answering, and it is why their gains concentrate in mathematics, code and logic rather than being uniform. CS336's final assignment covers exactly this territory."
    },
    {
      heading: "Reading order",
      body: "The InstructGPT paper is the clearest statement of the classic three-stage pipeline and remains the best entry point. Anthropic's constitutional AI work introduces using AI feedback in place of human feedback for parts of the process, which addresses the labelling bottleneck. The DPO paper is short and worth reading in full. For RLVR, the literature is moving quickly enough that recent survey material is more useful than any single paper."
    }
  ],
  keyConcepts: [
    { term: "SFT", detail: "Imitate curated demonstrations. Effective, and limited by demonstration quality." },
    { term: "Preference asymmetry", detail: "Ranking two answers is far easier than writing the best one." },
    { term: "Reward model", detail: "A learned proxy for preference — and proxies get exploited under pressure." },
    { term: "Reward hacking", detail: "High reward, worse output. Hedging, padding and sycophancy come from here." },
    { term: "KL penalty", detail: "Keeps the policy near the SFT model, limiting drift and degeneration." },
    { term: "DPO", detail: "Optimise preferences directly; no reward model, no RL loop." },
    { term: "RLVR", detail: "Verifiable rewards from maths and code. The engine behind reasoning models." }
  ],
  takeaways: [
    "Post-training converts latent capability into usefulness; pretraining supplies the capability.",
    "The reward model is a proxy, and hard optimisation against any proxy corrupts it.",
    "DPO is the sensible default now; full RLHF when you need the extra control.",
    "RLVR explains why reasoning gains concentrate in verifiable domains."
  ],
  pitfalls: [
    "Treating RLHF as a safety mechanism rather than a preference-fitting one.",
    "Assuming reasoning-model gains generalise to domains with no verifiable answer."
  ]
},

{
  id: "inference-serving",
  subject: "llm",
  title: "Inference and serving at scale",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.vllm.ai/en/latest/",
  tags: ["inference", "serving", "performance", "quantization", "production"],
  updated: "Evergreen",
  tldr: "Training is a one-off cost; inference is forever. The economics of a deployed LLM product are decided here.",
  diagrams: ["kv-cache", "context-window", "scaling-laws"],
  prerequisites: ["build-llm-scratch"],
  summary: [
    {
      heading: "Two phases with opposite characteristics",
      body: "Generation splits into prefill and decode, and conflating them makes performance work incoherent. Prefill processes the entire prompt in parallel in a single forward pass; it saturates the GPU and is compute-bound, which is why a five-thousand-token prompt does not take five thousand times as long as a one-token prompt. Decode produces output one token at a time, each depending on the previous, and cannot be parallelised within a request; it is memory-bandwidth-bound, with the GPU spending most of its time moving weights rather than computing. Latency lives in decode. This is the mechanical reason output tokens cost more than input tokens on every provider's pricing page."
    },
    {
      heading: "The KV cache and what it costs",
      body: "Without caching, each new token would recompute keys and values for the entire preceding sequence — quadratic work. The KV cache stores them, making per-token cost linear, and is non-negotiable in any real system. The price is memory that grows with sequence length and with every concurrent request, and it competes with model weights for the same GPU memory. KV cache size frequently becomes the binding constraint on how many users you can serve simultaneously, which is why techniques that shrink it — grouped-query attention, multi-query attention, paged allocation — matter so much in practice."
    },
    {
      heading: "Batching, and why naive batching fails",
      body: "Throughput comes from batching, because the expensive weight movement is shared across every request in the batch. Static batching wastes enormous capacity: requests finish at different times and the whole batch waits for the longest. Continuous batching, which underpins modern serving stacks, admits new requests as slots free rather than waiting for the batch to complete, often improving throughput by several times on the same hardware. PagedAttention takes the operating system's virtual memory idea and applies it to the KV cache, allocating in fixed blocks rather than contiguous reservations, which largely eliminates the fragmentation that previously wasted much of available memory."
    },
    {
      heading: "Quantisation and the accuracy trade",
      body: "Models are typically trained in 16-bit precision and can usually be served at 8-bit or 4-bit with modest quality loss. The gains are substantial and compound: less memory means more concurrent requests, smaller weights mean less bandwidth pressure in the decode phase, and a model that would not fit on a GPU at all may fit comfortably. The trade-off is real but often smaller than expected — 8-bit is frequently near-lossless, and 4-bit is acceptable for many applications. Measure on your own evaluation set rather than trusting general claims, because degradation is uneven across tasks and tends to show up first on the hardest cases."
    },
    {
      heading: "The levers, stated plainly",
      body: "For latency: generate fewer tokens, because decode dominates. Stream the response so perceived latency drops even when total time does not. Consider speculative decoding, where a small draft model proposes tokens that the large model verifies in parallel. For throughput and cost: batch aggressively, quantise, cache aggressively at the application layer, and route easy requests to smaller models. For capacity: shrink the KV cache. Choosing the right lever requires knowing which phase and which resource you are actually bound by — the same measure-first discipline that applies to any performance work."
    }
  ],
  keyConcepts: [
    { term: "Prefill vs decode", detail: "Compute-bound and parallel, versus bandwidth-bound and sequential." },
    { term: "KV cache", detail: "Turns quadratic per-token work into linear, at a real memory cost." },
    { term: "Continuous batching", detail: "Admit new requests as slots free. Often a multi-fold throughput gain." },
    { term: "PagedAttention", detail: "Virtual-memory-style KV allocation; removes fragmentation waste." },
    { term: "Quantisation", detail: "8-bit often near-lossless; 4-bit usable. Verify on your own evals." },
    { term: "Speculative decoding", detail: "Small model drafts, large model verifies in parallel. Cuts latency." },
    { term: "Grouped-query attention", detail: "Fewer KV heads, much smaller cache, minimal quality cost." }
  ],
  takeaways: [
    "Decode is where latency lives; the fastest way to reduce it is generating fewer tokens.",
    "KV cache memory usually decides your concurrency ceiling.",
    "Continuous batching and paged KV allocation are the two biggest serving wins.",
    "Quantise, but verify degradation on your own eval set rather than trusting averages."
  ],
  pitfalls: [
    "Optimising prefill when decode is the bottleneck.",
    "Sizing GPUs for model weights alone and running out of memory on KV cache under load.",
    "Accepting quantisation quality claims without measuring on your hardest cases."
  ]
},

{
  id: "agents-tools",
  subject: "llm",
  title: "Agents, tool use and what actually holds up",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://www.anthropic.com/engineering/building-effective-agents",
  tags: ["agents", "tools", "architecture", "production", "mcp"],
  updated: "Evergreen",
  tldr: "An agent is a model in a loop with tools and a stopping condition. The engineering that matters is almost entirely in the loop, not the model.",
  diagrams: ["agent-loop", "llm-limits", "context-window"],
  prerequisites: ["rag-engineering", "llm-evals"],
  summary: [
    {
      heading: "What an agent actually is",
      body: "Strip away the terminology and an agent is a loop: give the model a goal and a set of tools, let it either answer or call a tool, feed the tool's result back into the context, repeat until it finishes or you cut it off. That is the whole architecture. The interesting engineering is in the surrounding structure — which tools exist, how they are described, what happens when one fails, what stops the loop, and what the model is allowed to do without a human agreeing. Frameworks obscure this, and teams that do not understand the underlying loop struggle to debug their own systems."
    },
    {
      heading: "Compounding error is the central constraint",
      body: "The dominant failure mode is arithmetic rather than conceptual. A step that succeeds ninety-five percent of the time succeeds across ten sequential steps only about sixty percent of the time. Twenty steps and you are near thirty-five percent. This is why agent demos are impressive and agent products are hard: the demo is short. The implications are direct — prefer fewer steps, make each as reliable as possible, and design so that a failed step can be detected and retried rather than silently corrupting everything downstream. Where a task can be decomposed into independently verifiable pieces, do that instead of one long chain."
    },
    {
      heading: "Tool design is most of the quality",
      body: "The model selects tools based on their descriptions, so vague or overlapping descriptions produce wrong choices no amount of prompting will fix. Give each tool one clear job, a name that says what it does, and a description that states when to use it and when not to. Prefer a few well-chosen tools over many similar ones — a model choosing between fifteen overlapping options makes worse decisions than one choosing between five distinct ones. Make tools hard to misuse: validate inputs, and return errors that describe what went wrong and what would be valid, because a model can recover from an informative error and cannot recover from a stack trace."
    },
    {
      heading: "Start simpler than agentic",
      body: "Anthropic's guidance on this is worth taking seriously: most tasks people reach for agents to solve are better served by a fixed workflow with a model at specific steps. A predetermined chain where each step is a well-defined model call is more predictable, cheaper, easier to evaluate and far easier to debug than a loop where the model decides what to do next. Reserve genuine agency for cases where the sequence of steps genuinely cannot be known in advance. The instinct to build an agent because agents are interesting is responsible for a great deal of unnecessary complexity and unreliability."
    },
    {
      heading: "Safety properties you need on day one",
      body: "Hard limits, not soft guidance: a maximum step count, a wall-clock timeout, and a spend cap. Without these, a confused agent will loop indefinitely and bill you for it. Any consequential action — sending a message, spending money, writing to production, deleting anything — should require explicit approval rather than model judgement. And treat all content the agent retrieves or fetches as untrusted: a web page or document can contain text attempting to issue instructions, and an agent with real tool access is a considerably more attractive target for that than a chatbot. The rule is that fetched content is data, never instruction."
    },
    {
      heading: "Evaluation is harder and more necessary",
      body: "Agents are stochastic across multiple steps, so a single run tells you very little. Run each eval case several times and look at the distribution rather than one outcome. Measure intermediate steps as well as final answers, because an agent reaching the right answer through a broken path will fail differently tomorrow. Track cost and step count alongside correctness — an agent that succeeds using forty tool calls is not a success in production. This is the eval discipline from earlier applied to a harder target, and skipping it is how teams end up with systems nobody can reason about."
    }
  ],
  keyConcepts: [
    { term: "The loop", detail: "Goal → decide → tool → result → repeat. The entire architecture." },
    { term: "Compounding error", detail: "95% per step is ~60% over ten. The central constraint." },
    { term: "Tool description quality", detail: "Selection is driven by descriptions; vague ones cannot be prompted around." },
    { term: "Workflow vs agent", detail: "Fixed chains are cheaper, more predictable, and usually sufficient." },
    { term: "Hard limits", detail: "Step, time and spend caps. Not optional." },
    { term: "Human approval gates", detail: "Consequential actions need explicit sign-off, not model judgement." },
    { term: "Untrusted content", detail: "Fetched or retrieved text is data. Never instruction." }
  ],
  takeaways: [
    "Try a fixed workflow first; genuine agency is rarely the requirement.",
    "Fewer, better-described tools beat many overlapping ones.",
    "Return actionable errors — models recover from those and not from stack traces.",
    "Caps and approval gates on day one, not after the first runaway bill.",
    "Evaluate multiple runs per case and measure cost and steps, not just correctness."
  ],
  pitfalls: [
    "Building an agent for a task with a known fixed sequence.",
    "No step or spend cap, discovered via the billing page.",
    "Letting retrieved web content influence tool calls — that is prompt injection with consequences."
  ]
},

{
  id: "interpretability",
  subject: "llm",
  title: "Interpretability: looking inside the model",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://transformer-circuits.pub/",
  tags: ["interpretability", "research", "safety", "mechanistic"],
  updated: "Active research area",
  tldr: "The effort to understand what computations a model is actually performing, rather than treating it as an opaque function. Young, genuinely hard, and among the most interesting work in the field.",
  diagrams: ["transformer-block", "self-attention", "embeddings"],
  prerequisites: ["attention-paper", "cs229"],
  summary: [
    {
      heading: "The problem being addressed",
      body: "We can build models that work without being able to say why any particular output was produced. That is uncomfortable for safety, for debugging, and for science. Mechanistic interpretability attempts to reverse-engineer the computations — identifying what individual components do, how information flows between them, and what representations the model has learned. The ambition is closer to reading a program than to correlating inputs with outputs, and the field is early enough that genuinely new findings are still accessible to careful newcomers."
    },
    {
      heading: "Circuits and the residual stream",
      body: "The framing that has proved most productive treats the residual stream as a shared communication channel that every layer reads from and writes to. Attention heads move information between positions; MLP layers do position-wise processing and appear to hold much of the factual knowledge. A circuit is a specific identified computation spread across several components. The best-known example is induction heads, which detect a repeated pattern and continue it, and which appear to be a substantial part of the mechanism behind in-context learning — the ability to pick up a pattern from examples in the prompt without any weight update."
    },
    {
      heading: "Superposition, and why this is so hard",
      body: "Models represent far more features than they have dimensions, by storing them in overlapping directions that are only approximately independent. This is superposition, and it is the central technical obstacle: individual neurons are polysemantic, firing for several unrelated concepts, so you cannot simply read off what each one means. Sparse autoencoders are the leading response — train an autoencoder with a sparsity constraint to decompose activations into a much larger set of features that are individually interpretable. This has produced striking results, including features corresponding to recognisable concepts that can be amplified or suppressed to steer behaviour."
    },
    {
      heading: "Why a practitioner should care",
      body: "The immediate practical applications are limited, and it would be dishonest to claim otherwise. The reasons to follow it anyway are that it produces the clearest available explanations of what is actually happening inside these systems, that it grounds safety work in mechanism rather than behavioural testing alone, and that steering via identified features is a plausible future control surface that is more precise than prompting. It also has a healthy epistemic culture — interpretability work tends to state its own limitations unusually clearly, which makes it good material to learn from."
    },
    {
      heading: "Where to start",
      body: "Transformer Circuits is the main publication venue and its work is written to be read, with interactive visualisations that do real explanatory work. Start with the mathematical framework for transformer circuits, then the induction heads work, then the sparse autoencoder papers. Neel Nanda's tutorials and the TransformerLens library are the standard entry point for hands-on work, and the field is unusual in how accessible it is to independent researchers — the models are public, the tools are open, and the open problems are documented."
    }
  ],
  keyConcepts: [
    { term: "Residual stream", detail: "Shared channel every layer reads from and writes to. The organising abstraction." },
    { term: "Circuit", detail: "An identified computation implemented across specific components." },
    { term: "Induction heads", detail: "Detect and continue repeated patterns; central to in-context learning." },
    { term: "Superposition", detail: "More features than dimensions, stored in overlapping directions." },
    { term: "Polysemanticity", detail: "One neuron, several unrelated concepts. Why naive inspection fails." },
    { term: "Sparse autoencoders", detail: "Decompose activations into interpretable features. The leading approach." },
    { term: "Steering", detail: "Amplify or suppress identified features to change behaviour." }
  ],
  takeaways: [
    "The clearest available account of what is actually happening inside a transformer.",
    "Superposition is the core difficulty; sparse autoencoders are the main current response.",
    "Few immediate practical applications — read it for understanding and for safety grounding.",
    "Unusually open to independent contribution; the tools and models are public."
  ],
  pitfalls: [
    "Expecting techniques you can apply at work next week.",
    "Over-reading individual feature findings as complete explanations of behaviour."
  ]
}

]);
