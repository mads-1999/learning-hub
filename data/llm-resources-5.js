/* Learning Hub — LLM track, part 5: additional advanced articles. */
window.UNITY_RESOURCES = (window.UNITY_RESOURCES || []).concat([

{
  id: "moe-architectures",
  subject: "llm",
  title: "Mixture of experts and architecture variants",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://arxiv.org/abs/2101.03961",
  tags: ["architecture", "moe", "efficiency", "research", "scaling"],
  updated: "Evergreen; MoE is standard at the frontier",
  tldr: "How models grew enormous without every token paying for every parameter — and the architecture changes that quietly replaced the 2017 design.",
  diagrams: ["moe", "transformer-block", "scaling-laws"],
  prerequisites: ["attention-paper", "cs336"],
  summary: [
    {
      heading: "The idea",
      body: "In a dense transformer, every token passes through every parameter, so doubling capacity doubles the compute for each token. Mixture of experts breaks that coupling. The feed-forward block is replaced by many parallel expert networks plus a small router that, for each token, selects a handful — commonly two — to activate. Total parameters grow with the number of experts while compute per token grows only with how many are active. A model can therefore hold hundreds of billions of parameters while costing, per token, something closer to a much smaller dense model. This is how frontier models became as large as they are without inference costs becoming impossible."
    },
    {
      heading: "Routing, and the balance problem",
      body: "The router is a small learned layer producing a score per expert; the top-k are activated and their outputs combined, weighted by those scores. The difficulty is that nothing inherently encourages the router to spread load. Left alone it collapses toward a few popular experts, which wastes the rest of the model and creates severe hardware imbalance when experts live on different devices. Training therefore adds an auxiliary load-balancing loss that penalises uneven routing, and implementations impose a capacity factor limiting how many tokens any expert accepts per batch — tokens beyond that are dropped or passed through. Tuning these is finicky and is a substantial part of why MoE training is harder than dense training."
    },
    {
      heading: "What it costs you",
      body: "Memory. Every expert must be resident even though most are idle for any given token, so VRAM requirements track total parameters while speed tracks active parameters. A model advertised as having a modest active-parameter count may still need many times more memory than that number suggests, which is why MoE models are often impractical to run locally despite looking affordable on paper. Serving is also more complex: expert parallelism spreads experts across devices, and routing then implies all-to-all communication every layer, which is sensitive to interconnect quality. Fine-tuning MoE models is likewise harder, with more instability than dense equivalents."
    },
    {
      heading: "Reading model specifications correctly",
      body: "When comparing models, active parameters is the number that predicts speed and roughly tracks per-token capability; total parameters predicts memory. A specification quoting one without the other is not telling you enough. This also affects benchmark interpretation: comparing a large-total MoE against a dense model of the same total size is not a like-for-like comparison of compute, and comparing against the same active size understates the MoE's memory demands. Whenever you see a surprisingly cheap large model, check which number is being advertised."
    },
    {
      heading: "Attention variants that shrink the cache",
      body: "Separately from MoE, attention itself has been substantially revised since 2017, mostly to reduce the KV cache that dominates serving memory. Multi-query attention gives all heads a single shared key and value projection, shrinking the cache dramatically at some quality cost. Grouped-query attention is the compromise now used almost everywhere — heads share keys and values in small groups, recovering most of the quality while keeping most of the memory saving. Sliding-window attention restricts each token to a local neighbourhood, making long contexts linear rather than quadratic, usually interleaved with occasional full-attention layers so global information still propagates."
    },
    {
      heading: "The other components that changed",
      body: "Sinusoidal positional encodings gave way to rotary embeddings, which encode position by rotating query and key vectors and generalise better to lengths not seen during training. Layer normalisation moved from after each sub-layer to before it, which stabilises very deep stacks, and RMSNorm replaced it in many models as a cheaper variant with equivalent effect. Activation functions moved from ReLU through GELU to SwiGLU. FlashAttention rewrote the attention computation to be memory-aware rather than compute-optimal, avoiding materialising the full attention matrix — a change with no effect on model outputs and a very large effect on what is trainable. None of these are exotic; they are simply what a current model is made of, and a reader who only knows the 2017 paper will find modern code unfamiliar."
    },
    {
      heading: "State space models, honestly assessed",
      body: "The main structural challenge to attention comes from state space models such as Mamba, which process sequences with a recurrence that scales linearly with length rather than quadratically, and generate with constant memory per step rather than a growing cache. The trade-off is that a fixed-size recurrent state must compress all history, where attention retains every token exactly — so recall of specific distant details is weaker. Hybrid architectures interleaving both are where much of the current interest sits, and Stanford's CS25 covers the tradeoffs directly. It is worth following without assuming attention is about to be replaced; the ecosystem advantage of transformers is enormous."
    }
  ],
  keyConcepts: [
    { term: "Active vs total parameters", detail: "Speed tracks the first, memory tracks the second. Always check both." },
    { term: "Router", detail: "Small learned layer choosing top-k experts per token." },
    { term: "Load balancing loss", detail: "Prevents routing collapse onto a few popular experts." },
    { term: "Capacity factor", detail: "Cap on tokens per expert per batch; excess is dropped." },
    { term: "Grouped-query attention", detail: "Heads share KV in groups. Much smaller cache, little quality lost." },
    { term: "Rotary embeddings", detail: "Position by rotation; extrapolates beyond training lengths better." },
    { term: "FlashAttention", detail: "Memory-aware attention kernel. Same output, far better throughput." },
    { term: "State space models", detail: "Linear-time sequence modelling; weaker exact recall of distant tokens." }
  ],
  takeaways: [
    "MoE decouples capacity from per-token compute — and does not reduce memory at all.",
    "Read active parameters for speed and total parameters for what hardware you need.",
    "Grouped-query attention and rotary embeddings are standard now; the 2017 design is not.",
    "FlashAttention changes what is trainable without changing what the model computes.",
    "Follow state space models for the tradeoffs, not because attention is going away."
  ],
  pitfalls: [
    "Assuming a low active-parameter count means you can run it on your GPU.",
    "Reading only the original transformer paper and being lost in a modern codebase."
  ]
},

{
  id: "reasoning-models",
  subject: "llm",
  title: "Reasoning models and test-time compute",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://arxiv.org/abs/2201.11903",
  tags: ["reasoning", "rlvr", "inference", "research", "frontier"],
  updated: "Active frontier",
  tldr: "A second scaling axis: spend more computation when answering rather than when training. What that buys, where it does not, and how to prompt for it.",
  diagrams: ["test-time-compute", "training-pipeline", "scaling-laws"],
  prerequisites: ["post-training", "llm-evals"],
  summary: [
    {
      heading: "The shift in where compute goes",
      body: "For most of the scaling era, better meant a bigger model trained on more data — all the expense concentrated before deployment, with inference comparatively cheap and fixed. Reasoning models add a second axis: allow the model to generate a long internal chain of thought before its visible answer, and accuracy on hard problems rises with the length of that chain. Capability becomes something you can buy at answer time, per request, by allowing more thinking. This changes the economics in a way worth sitting with. Cost and latency are no longer fixed properties of a model but choices per query, and the right amount of thinking becomes a parameter you tune against task difficulty."
    },
    {
      heading: "How they are trained",
      body: "The key technique is reinforcement learning from verifiable rewards. Rather than learning a reward model from human preference, which is a proxy that can be gamed, training uses domains where an answer can be checked mechanically — mathematics with a known result, code that passes tests, formal problems with decidable solutions. The model generates reasoning and an answer, correctness is checked automatically, and correct trajectories are reinforced. Because the signal is ground truth rather than an approximation of taste, it can be optimised against far harder without the reward hacking that limits RLHF. What emerges is not merely longer output but qualitatively different behaviour: the model learns to backtrack, check its own work, try alternative approaches, and notice its own errors mid-solution."
    },
    {
      heading: "Where the gains are, and are not",
      body: "Improvements concentrate sharply in domains resembling the training signal: competition mathematics, algorithmic coding, formal logic, multi-step quantitative problems. On open-ended writing, summarisation, stylistic judgement, or anything where quality is a matter of taste rather than correctness, extended reasoning buys little — and you still pay for every thinking token in both money and latency. This is not a temporary limitation to be scaled away; it follows from how the capability was trained. The practical implication is to route by task type. Using a reasoning model for everything is a straightforward way to multiply cost and latency for no benefit on most of your traffic."
    },
    {
      heading: "Prompting them is genuinely different",
      body: "Chain-of-thought prompting was the technique that made earlier models reason better, and on reasoning models it is redundant at best. Telling a model that has been trained to reason to 'think step by step' adds nothing and can actively hurt by imposing a procedure that cuts across its trained approach. The guidance that works is to state the goal clearly, give the constraints and the success criteria, supply any necessary context, and then leave the method alone. Few-shot examples showing worked reasoning can also hurt, for the same reason. If you are migrating prompts from an older model, stripping the reasoning scaffolding is usually the first improvement."
    },
    {
      heading: "The visible reasoning is not the real reasoning",
      body: "An important caveat for anyone tempted to treat the chain of thought as an explanation. Research on faithfulness has repeatedly found that stated reasoning does not reliably reflect the computation that produced the answer — models can reach a conclusion for one reason and narrate another, including cases where a hint that determined the answer goes unmentioned. Providers also often summarise or hide the raw chain. So reasoning traces are useful for spotting some errors and for debugging, and they are not an audit trail. Treating them as a faithful account of why the model answered as it did is a mistake that appears in safety arguments more often than it should."
    },
    {
      heading: "Adjacent techniques worth knowing",
      body: "Test-time compute is broader than a single long chain. Self-consistency samples several independent solutions and takes the majority answer, trading cost for accuracy without any special training. Best-of-n generates several candidates and selects with a verifier or reward model. Tree search explores branching solution paths, pruning unpromising ones. Explicit self-critique — produce, critique, revise — helps on some tasks and can degrade others by talking the model out of a correct answer. All of these spend inference compute for accuracy, and all are worth knowing because they can be applied to models that were not specifically trained for reasoning."
    },
    {
      heading: "Evaluating and budgeting them",
      body: "Evaluation needs extra care. Reasoning models are more variable across runs than standard models, so single-run comparisons are noise; run each case several times and look at the distribution. Measure cost and latency alongside accuracy, since a model that is two points better and four times more expensive may be the wrong trade for your application. Watch for overthinking, a real and well-documented failure where a model talks itself out of a correct initial answer on an easy question. Where a provider exposes a reasoning-effort control, treat it as a tunable parameter and find the point where accuracy stops improving — it is usually lower than the maximum."
    }
  ],
  keyConcepts: [
    { term: "Test-time compute", detail: "Buy capability per request by allowing longer reasoning." },
    { term: "RLVR", detail: "Reinforcement learning against mechanically checkable answers." },
    { term: "Backtracking behaviour", detail: "Learned self-correction, not just longer output." },
    { term: "Domain concentration", detail: "Gains track the verifiable training signal; taste tasks benefit little." },
    { term: "Unfaithful reasoning", detail: "Stated reasoning need not reflect the actual computation." },
    { term: "Self-consistency", detail: "Sample several solutions, take the majority. No training required." },
    { term: "Overthinking", detail: "Talking itself out of a correct answer on easy problems." }
  ],
  takeaways: [
    "Route by task: reasoning models for verifiable problems, standard models for everything else.",
    "Remove chain-of-thought instructions when migrating prompts to a reasoning model.",
    "Do not treat visible reasoning as an audit trail; faithfulness is not guaranteed.",
    "Evaluate over multiple runs and measure cost and latency alongside accuracy.",
    "Tune reasoning effort down until accuracy drops — the maximum is rarely optimal."
  ],
  pitfalls: [
    "Using a reasoning model for all traffic and multiplying cost for no gain.",
    "Carrying over few-shot reasoning examples that now conflict with training.",
    "Comparing models on a single run each and mistaking variance for improvement."
  ]
},

{
  id: "distributed-training",
  subject: "llm",
  title: "Training across many GPUs",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://huggingface.co/docs/transformers/perf_train_gpu_many",
  tags: ["training", "distributed", "systems", "gpu", "performance"],
  updated: "Evergreen",
  tldr: "What actually runs out of memory first, the three ways to split work, and the cheaper things to try before adding machines.",
  diagrams: ["parallelism", "job-system-flow", "kv-cache"],
  prerequisites: ["build-llm-scratch", "cs336"],
  summary: [
    {
      heading: "Weights are rarely the problem",
      body: "People assume a model does not fit because the parameters are too large, and that is usually not what happened. Training memory is dominated by three other things. Optimiser state: Adam keeps two moment estimates per parameter, so in mixed precision the optimiser alone can require several times the parameter memory. Gradients: one value per parameter. Activations: every intermediate output retained for the backward pass, scaling with batch size and sequence length, and for long sequences this is frequently the largest single consumer. A rough figure for full fine-tuning with Adam is twelve to sixteen bytes per parameter before activations. Knowing which of the four is dominating tells you which technique will help, and guessing wastes days."
    },
    {
      heading: "Do these before adding machines",
      body: "Mixed precision — computing in bfloat16 while keeping a float32 master copy of weights — roughly halves memory and substantially increases throughput on modern hardware, and is close to free. Gradient checkpointing discards most activations and recomputes them during the backward pass, typically trading around thirty percent extra compute for a large reduction in activation memory; on long sequences this is often the single most effective change. Gradient accumulation runs several small batches before stepping, giving the convergence behaviour of a large batch without the memory. Together these three frequently take a job that would not fit onto hardware you already have, and they are far simpler than distribution."
    },
    {
      heading: "The three ways to split",
      body: "Data parallelism replicates the whole model on each device and gives each a different slice of the batch, averaging gradients each step. It is the simplest, scales well, and requires the model to fit on one device. Tensor parallelism splits individual weight matrices across devices so each holds a shard of every layer, which requires communication within every layer and therefore fast interconnect — it is normally confined inside a single node. Pipeline parallelism places different layers on different devices and passes activations along, which communicates less but introduces idle time as devices wait for work, mitigated by splitting batches into micro-batches. Large runs combine all three: tensor parallel inside a node where bandwidth is high, pipeline and data parallel across nodes."
    },
    {
      heading: "ZeRO and FSDP, which often suffice alone",
      body: "The insight behind ZeRO — implemented in PyTorch as Fully Sharded Data Parallel — is that in plain data parallelism every device redundantly stores identical optimiser state, gradients and parameters. Sharding those across devices removes the duplication, gathering what is needed just in time and releasing it afterwards. The stages shard progressively more: optimiser state, then gradients, then parameters themselves. This delivers much of the memory benefit of model parallelism while keeping the programming model close to data parallel, and for a great many workloads it is all that is required. It is the right thing to try before reaching for tensor or pipeline parallelism, which are considerably more intrusive."
    },
    {
      heading: "Communication is the bottleneck",
      body: "At scale the limiting factor is moving data between devices, not computing on them. Gradient all-reduce in data parallelism moves a volume proportional to model size every step. Tensor parallelism communicates several times per layer. This is why interconnect hardware matters so much — NVLink within a node, InfiniBand between them — and why a strategy that performs well on one cluster topology can perform badly on another. The practical implications are to overlap communication with computation wherever the framework allows, to keep tensor parallelism inside a node, and to profile communication explicitly rather than assuming compute is where the time goes. On multi-node runs it frequently is not."
    },
    {
      heading: "Failure is the normal case at scale",
      body: "A thousand-GPU run lasting weeks will experience hardware failures; this is expected rather than exceptional. Checkpointing therefore is not a nicety but core infrastructure, and it has its own engineering: checkpoints are large, writing them stalls training, and writing them too rarely means losing hours of work. Asynchronous and sharded checkpointing exist for exactly this. Beyond hardware, training itself fails — loss spikes and divergence are routine at scale, and the standard responses are gradient clipping, learning rate warmup, and in the worst case rewinding to an earlier checkpoint and skipping the data batch that triggered it. Frontier training logs are full of these interventions."
    },
    {
      heading: "What to measure",
      body: "Model FLOPs utilisation — the fraction of theoretical peak the run actually achieves — is the headline efficiency number, and well-optimised large runs reach perhaps forty to fifty percent while naive ones sit far lower. Tokens per second per device tells you whether scaling is actually helping, and sub-linear scaling as you add devices indicates a communication bound. Watch memory headroom, because running near the limit causes fragmentation stalls and occasional out-of-memory crashes hours into a run. As with all performance work, measure before changing, change one thing, and measure again."
    }
  ],
  keyConcepts: [
    { term: "Optimiser state", detail: "Adam's two moments per parameter; often larger than the weights." },
    { term: "Activation memory", detail: "Scales with batch and sequence length; usually the long-context culprit." },
    { term: "Gradient checkpointing", detail: "Recompute activations instead of storing them. ~30% compute for a big saving." },
    { term: "ZeRO / FSDP", detail: "Shard optimiser state, gradients and parameters. Often sufficient alone." },
    { term: "Tensor parallel", detail: "Split matrices within a layer. Chatty — keep inside one node." },
    { term: "Pipeline bubble", detail: "Idle time while devices wait; micro-batching reduces it." },
    { term: "MFU", detail: "Model FLOPs utilisation. The headline efficiency figure for a run." }
  ],
  takeaways: [
    "Find out what is actually consuming memory before choosing a technique.",
    "Mixed precision, gradient checkpointing and accumulation first — they are cheap and often enough.",
    "Try FSDP/ZeRO before tensor or pipeline parallelism.",
    "Keep tensor parallelism within a node; profile communication, not just compute.",
    "Treat checkpointing as core infrastructure — failure at scale is routine, not exceptional."
  ],
  pitfalls: [
    "Assuming parameter count determines whether a model will fit.",
    "Spreading tensor parallelism across nodes and losing most of the throughput.",
    "Checkpointing too rarely and losing many GPU-hours to one failure."
  ]
},

{
  id: "distillation-small-models",
  subject: "llm",
  title: "Distillation and the case for small models",
  author: "Learning Hub (synthesis)",
  type: "article",
  level: "advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://arxiv.org/abs/1503.02531",
  tags: ["distillation", "efficiency", "deployment", "small-models", "production"],
  updated: "Evergreen",
  tldr: "For a narrow task, a small model taught by a large one often matches it at a fraction of the cost — and fails badly just outside the boundary.",
  diagrams: ["distillation", "finetune-methods", "token-cost"],
  prerequisites: ["finetuning-practice", "llm-evals"],
  summary: [
    {
      heading: "Why a small model can match a large one",
      body: "A frontier model's size buys generality — competence across an enormous range of tasks, most of which your application never invokes. If you need one well-defined job done well, most of that capacity is idle overhead you are paying for on every request. Distillation exploits this: use the large model to produce high-quality outputs on your actual inputs, then train a small model on those pairs. The student does not need to learn everything the teacher knows, only the narrow function you care about, and small models have ample capacity for narrow functions. Reported results of ten to fifty times cost reduction at comparable task quality are common enough to be the expected outcome rather than a best case."
    },
    {
      heading: "The procedure",
      body: "Collect real inputs from your application — real inputs, not synthetic approximations, because the distribution is what you are teaching. Generate teacher outputs, ideally with whatever prompting, retrieval and tooling makes the teacher perform best, since you are distilling the whole pipeline's behaviour rather than the bare model's. Then filter aggressively: the teacher will produce some poor outputs, and every one you keep teaches the student to reproduce that failure. Filtering is where most of the quality is won or lost. Fine-tune the student, usually with LoRA, and evaluate against the teacher on a held-out set. Where correctness is checkable, verify teacher outputs mechanically before including them — this is the highest-value filter available."
    },
    {
      heading: "Hard labels and soft labels",
      body: "The classical formulation trains on the teacher's full probability distribution rather than just its top choice, on the grounds that the distribution carries information about which alternatives were plausible — the so-called dark knowledge. Where you have logit access this remains effective. Through a commercial API you generally do not, so practical distillation is usually sequence-level: train on the teacher's generated text as ordinary supervised examples. This works well despite discarding the distribution, which is why the technique is so widely used. If you are distilling between open models you control, soft labels are worth the extra work."
    },
    {
      heading: "The real limitation",
      body: "The student learns the distribution you showed it and nothing beyond. Inputs that differ from the training distribution — a new document type, a rephrased request, an adjacent task a user reasonably expects to work — produce confident nonsense rather than graceful degradation. A general model would have handled them acceptably. This is the fundamental trade, and it must be a deliberate decision rather than a discovery. Mitigations: scope the deployment narrowly and route anything outside scope to the general model, monitor the input distribution in production for drift, and build an evaluation set that deliberately includes edge cases rather than only the happy path."
    },
    {
      heading: "Why you might want this beyond cost",
      body: "Latency: a small model running locally can respond in tens of milliseconds where an API round-trip costs hundreds. Privacy and compliance: self-hosted inference means data never leaves your infrastructure, which for regulated domains can be the deciding factor rather than a preference. Availability: no dependency on a provider's uptime, rate limits, or deprecation schedule. Predictability: model behaviour does not change underneath you when a provider updates, which for a system with carefully tuned prompts is a genuine benefit. Any one of these can justify distillation even where cost alone would not."
    },
    {
      heading: "Quantisation and what it costs",
      body: "Orthogonal to distillation and often combined with it. Post-training quantisation converts weights from sixteen-bit to eight or four bits after training, cheaply and with modest quality loss — eight-bit is frequently near-lossless, four-bit usable for many tasks. Quantisation-aware training simulates the lower precision during training and preserves more quality at four bits and below, at the cost of a training run. The important discipline is to measure degradation on your own evaluation set rather than trusting general claims, because loss is uneven: it concentrates on the hardest cases, which are precisely the ones an average benchmark score conceals."
    },
    {
      heading: "The licensing question",
      body: "Before distilling from a commercial model, read its terms. Several providers explicitly restrict using outputs to train competing models, and the boundary between an internal task-specific student and a competing model is not always obvious. This is a legal question with real exposure, not a technicality to be resolved later, and it is worth answering before you invest in generating a dataset. Distilling from an openly licensed model avoids the issue entirely and is often the pragmatic choice for anything you intend to ship commercially."
    }
  ],
  keyConcepts: [
    { term: "Teacher / student", detail: "Large model generates training data; small model learns the narrow function." },
    { term: "Filter aggressively", detail: "Every bad teacher output you keep is a failure you are teaching." },
    { term: "Soft vs hard labels", detail: "Full distribution carries more signal; APIs usually give you only text." },
    { term: "Distribution brittleness", detail: "Outside the training distribution it fails confidently, not gracefully." },
    { term: "Scope and route", detail: "Deploy narrowly; send anything out of scope to the general model." },
    { term: "PTQ vs QAT", detail: "Quantise after training cheaply, or during training for better low-bit quality." },
    { term: "Output licensing", detail: "Some providers restrict training on their outputs. Check before starting." }
  ],
  takeaways: [
    "For one narrow task, a distilled small model often matches its teacher at a fraction of the cost.",
    "Quality lives in filtering the teacher's outputs, not in the training run.",
    "Scope the deployment and route out-of-scope traffic elsewhere — the student fails confidently.",
    "Latency, privacy and independence can justify this even when cost does not.",
    "Check the teacher's terms of use before generating a dataset."
  ],
  pitfalls: [
    "Training on unfiltered teacher output and baking in its mistakes.",
    "Deploying a narrow student on general traffic.",
    "Accepting published quantisation quality claims without testing your hardest cases."
  ]
}

]);
