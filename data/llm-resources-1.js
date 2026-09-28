/* Learning Hub — LLM track, part 1: Beginner
   Build the correct mental model before touching any framework. */
window.UNITY_RESOURCES = (window.UNITY_RESOURCES || []).concat([

{
  id: "karpathy-deep-dive",
  subject: "llm",
  title: "Deep Dive into LLMs like ChatGPT",
  author: "Andrej Karpathy",
  type: "video",
  level: "beginner",
  duration: "3h 31m",
  cost: "Free",
  url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
  tags: ["fundamentals", "training", "video", "rlhf", "hallucination"],
  updated: "Published 2025; still the best single overview",
  tldr: "The one video to watch if you watch only one. A general-audience walk through the entire training stack — pretraining, finetuning, RLHF — by someone who built these systems.",
  diagrams: ["next-token", "training-pipeline", "llm-limits"],
  prerequisites: [],
  summary: [
    {
      heading: "Why this is the right starting point",
      body: "Most introductions to LLMs are either marketing abstractions ('it predicts the next word!') or immediately technical (here is a transformer diagram). This sits in the gap: it explains what actually happens at each stage of building a ChatGPT-like system, in enough depth that the explanations are load-bearing, without requiring you to read code. Karpathy built GPT-scale systems and taught the subject at Stanford, and the combination shows — he knows which simplifications are safe and which ones would leave you with a broken model of how these things work."
    },
    {
      heading: "The three-stage pipeline, which reframes everything",
      body: "The central structure is the distinction between pretraining, supervised finetuning and reinforcement learning from human feedback. Pretraining is where the model reads a substantial fraction of the public internet and learns to continue text; this is where essentially all of its knowledge comes from, and it costs millions of dollars. Supervised finetuning is where it is shown curated examples of good conversational answers and learns to behave like an assistant rather than a document completer. Preference training is where it is tuned toward responses humans rated more highly. Once you internalise that knowledge arrives in stage one and behaviour arrives in stages two and three, a great many confusions dissolve — including why finetuning is the wrong tool for teaching a model your company's documents."
    },
    {
      heading: "Hallucination explained mechanically rather than mystically",
      body: "The treatment of hallucination is the most valuable part for a practitioner. It is not a bug that slipped in, and it is not the model lying. The system samples a plausible continuation of the text so far, and 'plausible' is the only criterion available to it — there is no separate lookup step, no internal fact store being consulted, and no place in the architecture where truth and fluency are distinguished. A correct answer and a confident fabrication are produced by identical machinery. Karpathy walks through what mitigations actually exist: letting the model use tools and search, training it to recognise the boundary of its own knowledge, and grounding answers in retrieved text. Understanding this is what stops you from trying to prompt your way out of a problem that prompting cannot solve."
    },
    {
      heading: "The 'psychology' section, and why it is not anthropomorphism",
      body: "A later section discusses observed behavioural quirks — the jagged capability frontier where a model does something remarkable and then fails an easier task, tokenizer artefacts like the notorious difficulty counting letters, and the fact that models have no persistent memory between conversations. This is framed not as personality but as predictable consequences of the architecture and training process. It gives you a working intuition for what to expect, which is genuinely useful: knowing that character-level tasks are structurally hard means you reach for a tool instead of a cleverer prompt."
    },
    {
      heading: "How to watch it",
      body: "Three and a half hours is long, and it is chaptered. Do not treat it as background noise. Watch in three or four sittings, and after each one write down in your own words what stage of the pipeline you just learned about and what it is responsible for. If you can explain to someone else why finetuning does not install facts, the video has done its job. Return to it after a few weeks of hands-on work; a surprising amount that washed over you the first time becomes obviously important once you have hit the problems yourself."
    }
  ],
  keyConcepts: [
    { term: "Pretraining", detail: "Next-token prediction over an enormous corpus. Where all factual knowledge is acquired." },
    { term: "Supervised finetuning (SFT)", detail: "Curated conversation examples turn a completer into an assistant." },
    { term: "RLHF", detail: "Tuning toward human-preferred responses. Shapes behaviour, not knowledge." },
    { term: "Hallucination", detail: "Plausible continuation with no truth check anywhere in the mechanism." },
    { term: "Jagged frontier", detail: "Superhuman at some tasks, oddly incompetent at neighbouring ones." },
    { term: "Tokenizer artefacts", detail: "Letter counting and arithmetic failures caused by sub-word tokens." }
  ],
  takeaways: [
    "Knowledge comes from pretraining; behaviour comes from finetuning and preference training.",
    "Hallucination is the mechanism working as designed, not a defect to be prompted away.",
    "Tools and retrieval — not better prompts — are the fix for facts and for character-level tasks.",
    "Watch in sittings and write a summary after each; passive viewing wastes the three hours."
  ],
  pitfalls: [
    "Treating it as background viewing and retaining the vocabulary but not the model.",
    "Concluding that because you understand the pipeline you could build one — that is CS336's job."
  ]
},

{
  id: "3b1b-neural-nets",
  subject: "llm",
  title: "Neural Networks — the visual series",
  author: "3Blue1Brown (Grant Sanderson)",
  type: "video",
  level: "beginner",
  duration: "~3 hours total",
  cost: "Free",
  url: "https://www.3blue1brown.com/topics/neural-networks",
  tags: ["fundamentals", "math", "video", "transformers", "attention", "visual"],
  updated: "Extended with GPT and attention chapters",
  tldr: "The best visual explanation of neural networks and, in the later chapters, of transformers and attention specifically. Animation doing genuine explanatory work rather than decoration.",
  diagrams: ["transformer-block", "self-attention", "embeddings"],
  prerequisites: [],
  summary: [
    {
      heading: "What the animation actually achieves",
      body: "Neural networks are geometric objects and most explanations describe them algebraically, which is why so many people can recite 'weights and biases and backpropagation' without any picture of what is happening. This series animates the geometry: what a layer does to a space, what gradient descent looks like as motion on a surface, why a composition of simple transformations can carve up a complicated decision boundary. The early chapters use handwritten digit recognition, which is concrete enough to hold onto and simple enough to fully visualise. By the end of chapter four you have a genuine mental image of what training is doing, which is the thing most people never acquire."
    },
    {
      heading: "The transformer and attention chapters",
      body: "The later chapters are the reason this belongs in an LLM curriculum rather than a general ML one. They cover what a GPT actually is and then go inside attention specifically, animating how query, key and value vectors interact and what the attention pattern means geometrically. The treatment of embeddings as directions in a high-dimensional space — where semantic relationships correspond to consistent directions — is the clearest version of that idea available anywhere. The subsequent chapter on the MLP layers addresses where facts might actually be stored, which connects directly to interpretability research."
    },
    {
      heading: "Its limits, stated plainly",
      body: "This is understanding, not capability. You will finish with an excellent intuition and no ability to train anything, because there is no code. That is a deliberate and correct choice — the series is doing one job well. Pair it with Karpathy's hands-on material, which is the exact inverse: all code, less geometry. Watching 3Blue1Brown first and then building micrograd is a very effective order, because you have a picture to attach the code to. Doing it the other way round also works but the geometric payoff arrives late."
    },
    {
      heading: "On the mathematics",
      body: "The series is honest that calculus underlies backpropagation and it does show derivatives, but it builds the intuition before the notation rather than after. If your maths is rusty you will still follow it; if your maths is strong you will find it unusually rigorous for something this accessible. Either way, do not skip the backpropagation chapters because they look intimidating — they are the ones that convert 'the model learns' from a phrase into a mechanism."
    }
  ],
  keyConcepts: [
    { term: "Weights and biases", detail: "The learned parameters. Visually: how each layer stretches and shifts space." },
    { term: "Gradient descent", detail: "Rolling downhill on a loss surface. The animation makes this literal." },
    { term: "Backpropagation", detail: "Efficiently computing which parameter to nudge, and by how much." },
    { term: "Embedding directions", detail: "Semantic relationships as consistent directions in high-dimensional space." },
    { term: "Query, key, value", detail: "Animated as an interaction, which is far clearer than the equations alone." },
    { term: "MLP layers", detail: "Where much of the factual knowledge appears to live." }
  ],
  takeaways: [
    "Watch this before writing any neural network code — the picture makes the code legible.",
    "The attention chapters are the clearest free explanation of transformers that exists.",
    "This builds understanding only; pair it with Karpathy for the ability to build.",
    "Don't skip backpropagation because it looks mathematical; it is the core mechanism."
  ],
  pitfalls: [
    "Mistaking the pleasant experience of watching for the harder work of implementing.",
    "Stopping after the digit-recognition chapters and missing the transformer material."
  ]
},

{
  id: "illustrated-transformer",
  subject: "llm",
  title: "The Illustrated Transformer",
  author: "Jay Alammar",
  type: "article",
  level: "beginner",
  duration: "45–60 min",
  cost: "Free",
  url: "https://jalammar.github.io/illustrated-transformer/",
  tags: ["transformers", "attention", "written", "architecture"],
  updated: "Evergreen; the reference explainer since 2018",
  tldr: "The article that taught a generation of engineers what a transformer is. Walks the architecture one component at a time with a diagram for every step.",
  diagrams: ["transformer-block", "self-attention"],
  prerequisites: [],
  summary: [
    {
      heading: "Why a 2018 blog post is still the recommendation",
      body: "The transformer architecture has been extended and tweaked constantly, but the core described here — self-attention, multiple heads, residual connections, layer normalisation, a feed-forward block — is still what every current model is built from. The post's durability comes from its method: it introduces one component, shows where it sits, draws it, then adds the next. Nothing is assumed and nothing is hand-waved. Reading the original paper cold is a rough experience because it assumes familiarity with the machine translation literature; this gives you the structure first so the paper becomes readable afterwards."
    },
    {
      heading: "The specific thing it does better than anything else",
      body: "It makes the matrix shapes concrete. A common failure mode when learning attention is following the concept — every token looks at every other token — while having no idea what is actually being multiplied by what. Alammar walks through the tensor dimensions explicitly: here is the input matrix, here are the three projection matrices producing queries, keys and values, here is what happens when you multiply Q by K transposed, here is why you divide by the square root of the dimension, here is where softmax applies. If you intend to implement attention yourself later, this is the article that makes the code obvious rather than mysterious."
    },
    {
      heading: "Encoder-decoder versus decoder-only",
      body: "One thing to hold in mind while reading: the original transformer was an encoder-decoder model built for translation, and the article follows that structure. Modern LLMs like GPT and Claude are decoder-only — they have the decoder stack and the self-attention, but no separate encoder and no cross-attention to one. This is not a flaw in the article, it is simply the history, but it does mean roughly a third of what you read describes machinery that current chat models do not have. Note which parts are the encoder as you go, and the mapping to modern models stays clear."
    },
    {
      heading: "The companion pieces",
      body: "Alammar wrote a series, and two others are worth reading immediately after. The Illustrated GPT-2 covers the decoder-only variant specifically and addresses exactly the gap described above. The piece on visualising attention makes the learned patterns tangible — you can see heads that track syntactic relationships and heads that resolve pronouns. Together the three form a complete introduction to the architecture, at a cost of perhaps two hours."
    }
  ],
  keyConcepts: [
    { term: "Self-attention", detail: "Every position computes a weighted read over every other position." },
    { term: "Q, K, V projections", detail: "Three learned linear maps of the same input. The whole mechanism rests on these." },
    { term: "Scaled dot-product", detail: "Divide by √d before softmax or the gradients vanish at scale." },
    { term: "Multi-head attention", detail: "Parallel attention operations, each free to learn a different relation." },
    { term: "Positional encoding", detail: "Attention is order-blind; position has to be added explicitly." },
    { term: "Encoder vs decoder-only", detail: "Modern chat LLMs use the decoder stack alone." }
  ],
  takeaways: [
    "Read this before the original paper — the paper becomes tractable afterwards.",
    "Pay attention to the matrix shapes; they are what make later implementation straightforward.",
    "Note which sections describe the encoder, which modern chat models do not have.",
    "Follow with The Illustrated GPT-2 to see the decoder-only variant."
  ],
  pitfalls: [
    "Assuming current LLMs have the encoder half described here.",
    "Skimming the dimension walkthrough, which is precisely the valuable part."
  ]
},

{
  id: "hf-llm-course",
  subject: "llm",
  title: "Hugging Face LLM Course",
  author: "Hugging Face",
  type: "course",
  level: "beginner",
  duration: "15–25 hours",
  cost: "Free",
  url: "https://huggingface.co/learn/llm-course/chapter1/1",
  tags: ["course", "practical", "transformers-library", "finetuning", "python"],
  updated: "Actively maintained",
  tldr: "The standard practical on-ramp. Runnable notebooks from first inference call through finetuning, using the library the whole ecosystem is built on.",
  diagrams: ["tokenization", "finetune-methods", "training-pipeline"],
  prerequisites: [],
  summary: [
    {
      heading: "Where it fits",
      body: "Karpathy and 3Blue1Brown give you the mental model; this gives you working hands. It is built around the Transformers library, which is the de facto standard for loading and running open models, so the skills transfer directly to real work rather than being course-specific. Everything runs in Colab notebooks, meaning you need no local GPU and no environment setup to get started — a genuine benefit, because environment problems are where a large fraction of beginners quit before writing any interesting code."
    },
    {
      heading: "The pipeline abstraction, and knowing when to drop it",
      body: "The course opens with high-level pipelines: three lines of Python to run sentiment analysis, summarisation or generation. This is good pedagogy because you get a result immediately, but the important part is what follows — it deliberately takes the abstraction apart and shows you the tokenizer, the model, and the post-processing underneath. Understanding that layer is what lets you debug. When output is truncated strangely or a special token appears in your text, the problem is almost always in the tokenizer configuration, and you can only see that if you know the pipeline is hiding it."
    },
    {
      heading: "Tokenizers get proper treatment",
      body: "Unusually for an introductory course, tokenization is covered seriously rather than mentioned in passing: the difference between word, character and sub-word approaches, how BPE and WordPiece actually build a vocabulary, and how to train a tokenizer for a new domain. This pays off repeatedly. Tokenizer mismatches are a leading cause of the specific frustration where a model that works fine in a demo produces garbage on your data, and this is the material that lets you diagnose that in minutes rather than days."
    },
    {
      heading: "Finetuning, datasets and the parts people skip",
      body: "Later chapters cover the Datasets library for handling data too large for memory, the Trainer API, and parameter-efficient finetuning with LoRA. The practical framing is good — it is honest that finetuning is often unnecessary, and that most people reaching for it should first check whether prompting or retrieval solves their problem. It also covers the Hub itself: how to push a model, write a model card, and use Spaces to demo it. That last part matters more than it sounds, because being able to share a working demo is often what turns a learning project into something that gets you hired."
    },
    {
      heading: "Honest limitations",
      body: "The library moves fast and occasionally a notebook lags behind an API change; if something errors, check the library version before assuming you misread. The course also teaches you to use models more than to understand them — you will finish able to finetune a model without necessarily knowing what the optimiser is doing. That is a reasonable trade for a practical course, and it is precisely the gap that CS336 or Karpathy's from-scratch material fills afterwards."
    }
  ],
  keyConcepts: [
    { term: "pipeline()", detail: "Three-line inference. Convenient, and worth dismantling once it works." },
    { term: "AutoTokenizer / AutoModel", detail: "Load the right classes by model name. The everyday interface." },
    { term: "BPE / WordPiece", detail: "How sub-word vocabularies are constructed from a corpus." },
    { term: "Datasets library", detail: "Memory-mapped data handling for corpora too large to load." },
    { term: "Trainer API", detail: "Training loop with logging, checkpoints and evaluation built in." },
    { term: "PEFT / LoRA", detail: "Train a small adapter instead of every parameter." }
  ],
  takeaways: [
    "Run every notebook rather than reading it — the whole value is in execution.",
    "Learn what the pipeline hides; that knowledge is what makes you able to debug.",
    "Take the tokenizer chapters seriously, they prevent a whole category of mystery bugs.",
    "Publishing a Space at the end gives you something demonstrable, which is worth real effort."
  ],
  pitfalls: [
    "Version drift between the notebooks and the current library — check versions on errors.",
    "Finishing able to call the API without understanding what happens underneath."
  ]
},

{
  id: "prompting-foundations",
  subject: "llm",
  title: "Prompting: what actually works",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "beginner",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
  tags: ["prompting", "practical", "fundamentals"],
  updated: "Evergreen",
  tldr: "Separating the techniques with real evidence behind them from the folklore that spreads because it sounds clever.",
  diagrams: ["prompt-anatomy", "context-window"],
  prerequisites: [],
  summary: [
    {
      heading: "The single highest-leverage habit",
      body: "Show, do not describe. Two or three examples of the exact output you want will outperform any amount of adjectival instruction about tone, format or style. This is not a trick, it is a consequence of how the model works: it is completing a pattern, and examples define the pattern directly whereas descriptions require it to infer one. If you find yourself writing a third paragraph explaining what 'concise and professional' means, stop and paste an example of a concise professional answer instead. Almost every prompt that is failing for stylistic reasons is fixed by this move."
    },
    {
      heading: "Structure, and why order matters",
      body: "A reliable prompt has a recognisable shape: who the model is and what it is producing, then the context and evidence clearly delimited, then examples, then constraints, then the actual request last. The ordering is not arbitrary. Instructions placed at the very start and the question placed at the end are attended to most reliably, while material buried in the middle of a long context receives measurably less reliable attention. Delimiting inputs matters too — wrapping a document in clear markers prevents the model from confusing your data with your instructions, which is both a quality issue and a security one."
    },
    {
      heading: "What has evidence, and what is folklore",
      body: "Genuinely effective: few-shot examples; explicit output format specification; telling the model what to do when it is uncertain rather than leaving it to guess; breaking a complex task into separate calls; and giving it permission to say it does not know. Largely folklore: offering tips, threatening consequences, declaring the model to be a world-leading expert, and stacking emphasis words. These persist because prompts containing them sometimes work — but they work because of the other changes made at the same time, and the ritual gets the credit. A useful discipline is to remove the superstitious parts and check whether quality actually drops."
    },
    {
      heading: "Chain of thought, and how reasoning models changed it",
      body: "For several years, asking a model to reason step by step before answering measurably improved accuracy on multi-step problems, because the intermediate tokens gave it somewhere to do the work. Reasoning models change this picture: they are trained to do extended internal reasoning already, and instructing them to think step by step is redundant and can degrade output by conflicting with their trained process. The current guidance is to tell a reasoning model what you want and what constraints apply, and let it choose its approach — describing a procedure is now more likely to constrain it than to help."
    },
    {
      heading: "Test prompts like code",
      body: "The behaviour that separates people who get reliable results from people who get occasional good ones is having a small evaluation set. Collect ten to twenty real inputs with known good outputs, and when you change a prompt, run all of them. Without this you are tuning on the last example you happened to look at, and prompt changes that fix one case while breaking three others are completely invisible. This is the same measure-change-measure discipline as performance work, and it is skipped for the same reason — it feels slower right up until it saves you."
    }
  ],
  keyConcepts: [
    { term: "Few-shot examples", detail: "Two or three demonstrations. The highest-leverage technique available." },
    { term: "Delimiters", detail: "Clear markers separating data from instructions. Quality and safety both." },
    { term: "Position effects", detail: "Start and end are attended to most reliably; the middle least." },
    { term: "Chain of thought", detail: "Helpful on older models; redundant or harmful on reasoning models." },
    { term: "Uncertainty instructions", detail: "Say explicitly what to do when unsure, or it will guess fluently." },
    { term: "Prompt eval set", detail: "Ten to twenty real cases you re-run on every change." }
  ],
  takeaways: [
    "Examples beat descriptions, consistently and by a wide margin.",
    "Instructions first, evidence in the middle, question last.",
    "Drop the folklore — politeness, threats and expert-framing are not doing the work.",
    "Don't tell a reasoning model how to think; give it the goal and the constraints.",
    "Keep a small eval set or you are tuning blind."
  ],
  pitfalls: [
    "Iterating on one example and shipping a prompt that regressed on everything else.",
    "Carrying chain-of-thought habits onto reasoning models where they hurt.",
    "Writing ever-longer prompts instead of adding one good example."
  ]
},

{
  id: "llm-mental-model",
  subject: "llm",
  title: "What an LLM is and is not",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "beginner",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.claude.com/en/docs/intro",
  tags: ["fundamentals", "mental-model", "limitations"],
  updated: "Evergreen",
  tldr: "The corrections that prevent months of wasted effort: no memory, no database, no reasoning engine underneath — and what that implies for what you build.",
  diagrams: ["next-token", "context-window", "llm-limits"],
  prerequisites: [],
  summary: [
    {
      heading: "It is a function, not a service with state",
      body: "The most consequential misconception is that the model remembers you. It does not. A model is a fixed set of weights that maps an input sequence to a probability distribution over next tokens; it has no storage that persists between calls and no ability to learn from your conversation. When a chat product appears to remember what you said earlier, the application is resending the entire conversation each time. This has immediate practical consequences: longer conversations cost more per message than short ones, there is a hard limit past which early turns must be dropped or summarised, and anything you want the model to 'know' must be placed into the context on every single request."
    },
    {
      heading: "It has no database, and this explains the failures you will hit",
      body: "Facts are not stored in retrievable records. They are distributed across billions of weights as statistical associations, which is why a model can be simultaneously excellent on well-represented material and confidently wrong on anything rare, recent or specific to you. There is no lookup that can fail loudly — so instead of an error, you get a plausible answer. Two consequences follow directly. Never treat model output as authoritative for facts you cannot verify. And when you need grounded answers, put the source text in the context via retrieval rather than hoping the weights contain it."
    },
    {
      heading: "Capability is jagged, not graded",
      body: "Human competence is roughly ordered — someone who can do calculus can almost certainly do arithmetic. Model competence is not. A model may write a working distributed system and then miscount the letters in a word, or produce a subtle legal analysis and fail a simple logic puzzle a child would get. This is because capability tracks the training distribution rather than any underlying difficulty scale. Practically, this means you cannot extrapolate from one success to a neighbouring task. You have to test the specific thing you intend to rely on, every time."
    },
    {
      heading: "What it is genuinely excellent at",
      body: "Against all that, the strengths are real and worth being precise about. Transforming text between forms — summarising, translating, reformatting, extracting structure from prose — is where models are most reliable, because the information is present in the input and the task is conversion rather than recall. Drafting and ideation, where you will review and revise the output, is a strong fit. Explaining a concept at a chosen level, writing code with immediate feedback from a compiler or tests, and classifying or routing text all work well. The pattern is that tasks where the necessary information is in the prompt, or where you can verify the output cheaply, are the ones that work."
    },
    {
      heading: "The design rule this produces",
      body: "Build systems where the model's output is either verifiable or non-critical. Code is a good fit because tests and compilers check it. Retrieval with citations is a good fit because a human can follow the link. Summarising a document the reader also has is a good fit. Unverifiable factual claims in a high-stakes setting are the bad fit, and no amount of prompting changes that — it is a property of the mechanism, not of the effort you put in."
    }
  ],
  keyConcepts: [
    { term: "Stateless", detail: "No memory between calls. Apparent memory is the app resending history." },
    { term: "Context window", detail: "Everything it can 'see' this call. Re-sent and re-billed every time." },
    { term: "Parametric knowledge", detail: "Facts as weight patterns, not records. Cannot fail loudly." },
    { term: "Jagged frontier", detail: "Capability follows training data, not task difficulty." },
    { term: "Transformation vs recall", detail: "Reliable when the information is in the prompt; less so from memory." },
    { term: "Verifiability", detail: "Design so output is checkable. The core architectural principle." }
  ],
  takeaways: [
    "There is no memory — anything it must know goes in the context on every call.",
    "There is no database — grounding means retrieval, not hoping the weights contain it.",
    "Test the exact task you will rely on; neighbouring success proves nothing.",
    "Prefer designs where output is cheaply verifiable."
  ],
  pitfalls: [
    "Building a product on unverifiable factual recall.",
    "Assuming a long conversation is free; every turn resends everything.",
    "Generalising from an impressive demo to a task you have not actually tested."
  ]
}

]);
