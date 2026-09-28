/* Unity Learning Hub — resource dataset, part 3: Graphics, UI, Performance, Shipping */
window.UNITY_RESOURCES = (window.UNITY_RESOURCES || []).concat([

{
  id: "render-pipelines",
  title: "Render pipelines: Built-in, URP and HDRP",
  author: "Unity Technologies",
  type: "doc",
  level: "intermediate",
  duration: "2–3 hours",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/render-pipelines.html",
  tags: ["graphics", "urp", "hdrp", "shaders", "official", "performance"],
  updated: "Current",
  tldr: "The first irreversible decision in a new project. Pick wrong and every shader and post-effect you write has to be redone.",
  diagrams: ["render-pipeline", "srp-comparison"],
  prerequisites: [],
  summary: [
    {
      heading: "Why this choice comes first",
      body: "A render pipeline determines how Unity turns your scene into pixels, and the choice propagates into everything visual: which shaders work, how lighting is configured, what post-processing is available, how much performance headroom you have. It is technically possible to convert a project between pipelines and it is reliably unpleasant — materials go magenta, custom shaders need rewriting, lighting needs rebalancing. Make the decision deliberately at project creation, based on your target platform and visual ambition, and then do not revisit it."
    },
    {
      heading: "The three options, concretely",
      body: "The Built-in Render Pipeline is the legacy default. It is not being developed further, but it is what the majority of older tutorials and Asset Store packages assume, which is its only remaining argument. The Universal Render Pipeline (URP) is the modern default for most projects: it scales from mobile to console, supports Shader Graph, has good performance characteristics, and is where Unity's engineering attention goes. The High Definition Render Pipeline (HDRP) targets high-end PC and current-gen consoles with physically-based lighting units, volumetrics, ray tracing and a substantially heavier baseline cost. HDRP will not run acceptably on mobile and should not be chosen for visual ambition alone — it demands both hardware and art-pipeline discipline to look better than a well-executed URP project."
    },
    {
      heading: "How to actually decide",
      body: "Target platform is the dominant factor. Mobile, WebGL, Switch, or 'as many machines as possible' means URP, without much further thought. High-end PC or current-gen console exclusive with a photorealistic art direction and a team that includes someone who understands lighting means HDRP is worth considering. Everything else means URP. The 'I might want it to look amazing later' instinct is the trap — URP scales up far better than most people assume, and stylised art direction is more visually distinctive than physically-based realism executed at an amateur level. Choose Built-in only if you have a specific dependency on an asset or codebase that requires it."
    },
    {
      heading: "What follows from the choice",
      body: "On URP and HDRP, Shader Graph is the primary shader authoring tool — a node-based editor that generates pipeline-appropriate shader code. Hand-written shaders use HLSL with pipeline-specific include files, so a built-in-pipeline surface shader will not compile under URP. Post-processing is built into the pipeline via Volumes rather than a separate stack, and Volumes are one of the nicer parts of the modern pipelines: you place a volume with a priority and a blend distance, and effects blend in as the camera enters. Camera setup also differs — URP's Camera Stacking handles overlay cameras for UI and weapon rendering in a specific way that built-in tutorials will not describe."
    },
    {
      heading: "The magenta material, explained once",
      body: "A magenta object means Unity could not find a working shader for that material under the current pipeline. It is not a lighting problem or a missing texture. It almost always means the material uses a built-in-pipeline shader in a URP/HDRP project, or an imported asset targeted a different pipeline. The Render Pipeline Converter (Window > Rendering) handles the common cases automatically; anything custom needs manual rewriting. Recognising magenta as 'wrong pipeline' rather than 'broken texture' saves hours the first time it happens."
    }
  ],
  keyConcepts: [
    { term: "SRP", detail: "Scriptable Render Pipeline — the framework URP and HDRP are built on. You can write your own." },
    { term: "URP", detail: "Scales mobile to console. The default correct answer for most projects." },
    { term: "HDRP", detail: "High-end only. Physical light units, volumetrics, ray tracing, heavy baseline." },
    { term: "Shader Graph", detail: "Node-based shader authoring. URP/HDRP only." },
    { term: "Volume", detail: "Post-processing container with priority and blend distance. Replaces the old post stack." },
    { term: "Magenta material", detail: "Shader not valid for the active pipeline. Almost never anything else." }
  ],
  takeaways: [
    "Choose the pipeline at project creation; conversion later is genuinely painful.",
    "URP unless you have a specific reason — mobile and multi-platform make it non-negotiable.",
    "Magenta means wrong pipeline, not missing texture.",
    "Check which pipeline a tutorial or Asset Store package targets before following or buying."
  ],
  pitfalls: [
    "Choosing HDRP for a project that will ship on mobile or Switch.",
    "Following a built-in-pipeline lighting tutorial inside a URP project and getting different results.",
    "Buying an Asset Store package without checking pipeline compatibility."
  ]
},

{
  id: "catlike-rendering",
  title: "Catlike Coding — Rendering & Custom SRP",
  author: "Jasper Flick",
  type: "doc",
  level: "advanced",
  duration: "Multi-week",
  cost: "Free",
  url: "https://catlikecoding.com/unity/tutorials/rendering/",
  tags: ["shaders", "graphics", "hlsl", "lighting", "advanced", "written"],
  updated: "Rendering series is built-in pipeline; Custom SRP is modern",
  tldr: "The deepest free shader education available. Builds lighting, shadows, reflections and eventually an entire render pipeline from first principles.",
  diagrams: ["render-pipeline", "shader-stages"],
  prerequisites: ["catlike-basics", "render-pipelines"],
  summary: [
    {
      heading: "What 'from first principles' means here",
      body: "Most shader tutorials show you how to achieve an effect. This series explains the mathematics and the hardware pipeline that make the effect possible, then derives the code. You start with a shader that outputs a solid colour, then object-space position, then UVs, then a texture, then a single light using the Lambert model, then specular, then multiple lights and the cost of doing so, then normal mapping, shadows, reflections and transparency. Each step is small and the previous step's code is visibly extended. By the end you can read any shader and understand not just what it does but why it is structured that way."
    },
    {
      heading: "The vertex/fragment model, which is the actual foundation",
      body: "The central idea worth extracting: a shader is two programs. The vertex program runs once per vertex and transforms positions from object space through world and view space to clip space, passing per-vertex data down. The rasteriser then interpolates that data across the triangle's pixels. The fragment program runs once per resulting pixel and outputs a colour. Almost every shader concept is a consequence of this structure — why normals must be renormalised in the fragment stage (interpolation shortens them), why per-vertex lighting looks faceted and per-fragment lighting looks smooth, why adding a light can multiply your cost. Understanding this makes Shader Graph legible too: the graph compiles to exactly these two stages."
    },
    {
      heading: "The Custom SRP series is the modern one",
      body: "The original Rendering series uses the Built-in Render Pipeline, which matters for the code but not the concepts. The Custom SRP series is the modern counterpart: it builds a scriptable render pipeline from an empty one, adding culling, draw calls, batching, lighting, shadows and post-processing. This is genuinely advanced material and it is the best explanation available of what URP is actually doing internally. If you have ever wondered why the frame debugger shows the draw calls it shows, this series answers it. It is also the right preparation for writing custom render features in URP, which is how most real projects extend rendering."
    },
    {
      heading: "Who should and should not do this",
      body: "This is not intermediate material dressed up. It expects comfort with vector mathematics, willingness to read HLSL, and the patience to work through a long series where nothing looks impressive for the first several tutorials. If your goal is shipping a stylised 2D game, Shader Graph plus a handful of effect tutorials is a better use of your time. If you want to do technical art professionally, or you keep hitting the ceiling of what Shader Graph will let you express, this is the material that removes the ceiling."
    }
  ],
  keyConcepts: [
    { term: "Vertex/fragment stages", detail: "Per-vertex transform, then interpolation, then per-pixel colour." },
    { term: "Space transforms", detail: "Object → world → view → clip. Most shader bugs are a wrong-space bug." },
    { term: "Forward vs deferred", detail: "Cost per light per object vs cost per light per screen pixel. Different scaling." },
    { term: "Normal mapping", detail: "Per-pixel normals from a texture in tangent space. Requires the tangent basis." },
    { term: "Custom SRP", detail: "Write the pipeline itself: culling, batching, shadow passes, post." },
    { term: "GPU instancing", detail: "One draw call for many identical meshes with per-instance data." }
  ],
  takeaways: [
    "The vertex/fragment split explains almost every shader behaviour you will meet.",
    "Do the Custom SRP series rather than the old Rendering series if you are on URP/HDRP.",
    "Expect several tutorials before anything looks impressive; the payoff is a removed ceiling.",
    "Shader Graph and handwritten HLSL compile to the same stages — understanding one helps the other."
  ],
  pitfalls: [
    "Starting this before you are comfortable with vectors and matrices.",
    "Copying built-in pipeline shader code into URP and debugging the resulting errors instead of using the Custom SRP series."
  ]
},

{
  id: "sebastian-lague",
  title: "Sebastian Lague — Coding Adventures",
  author: "Sebastian Lague",
  type: "video",
  level: "intermediate-advanced",
  duration: "20–60 min each",
  cost: "Free",
  url: "https://www.youtube.com/@SebastianLague",
  tags: ["algorithms", "procedural", "graphics", "video", "math", "inspiration"],
  updated: "Actively publishing",
  tldr: "Algorithmic exploration rendered beautifully: marching cubes, procedural planets, pathfinding, ray tracing, fluid simulation. Watch for the thinking, not the copy-paste.",
  diagrams: ["procedural-pipeline"],
  prerequisites: ["cs-fundamentals"],
  summary: [
    {
      heading: "A different kind of resource",
      body: "These are not tutorials and treating them as such leads to frustration. They are documented explorations — Lague picks a problem (generate a planet, simulate fluid, write a chess engine, ray-trace a scene), works through it on camera, hits real dead ends, and explains the mathematics with exceptionally clear visualisations. You cannot follow along line by line. What you get instead is a model of how to approach a problem you do not know how to solve, which is a rarer and more valuable thing than another walkthrough. Project files are published on GitHub, so the code is available to study at your own pace."
    },
    {
      heading: "The series worth watching in order",
      body: "The procedural terrain generation series is the most directly applicable: Perlin noise, octaves and persistence, falloff maps, mesh generation from a heightmap, chunking and level of detail. Those concepts are load-bearing in any open world. Marching cubes covers isosurface extraction, which is how voxel terrain with smooth surfaces works. The procedural planets series applies the same machinery to a sphere and confronts the problems that only appear at that scale. The pathfinding series builds A* from scratch with visualisations that make the algorithm obvious in a way pseudocode does not. The ray tracing and fluid simulation adventures are further from typical gameplay but are the best available demonstrations of compute shader thinking."
    },
    {
      heading: "What to extract",
      body: "Three things. First, the decomposition: watch how a vague goal becomes a sequence of small, testable steps. Second, the visualisation habit — Lague draws the intermediate state constantly, using gizmos and debug meshes to make the invisible visible. That habit alone will make you dramatically better at debugging. Third, the willingness to build the simple wrong version first and improve it, rather than designing the correct version on paper. These are transferable working practices, and they are the actual content."
    },
    {
      heading: "The motivation caveat",
      body: "There is a failure mode where watching beautiful technical content substitutes for making things. Lague's videos are polished results of long work, and comparing your messy in-progress project against them is demoralising and meaningless. Use them as a source of technique and enthusiasm, then close the tab and go build something ugly that works."
    }
  ],
  keyConcepts: [
    { term: "Perlin/simplex noise", detail: "Coherent noise for terrain, clouds, variation. Octaves add detail at multiple scales." },
    { term: "Marching cubes", detail: "Extract a smooth mesh from a 3D scalar field. Voxel terrain without the blocks." },
    { term: "A* pathfinding", detail: "Heuristic-guided graph search. The visualisations make it click." },
    { term: "Level of detail", detail: "Reduce mesh complexity with distance. Mandatory for large terrains." },
    { term: "Debug visualisation", detail: "Draw intermediate state constantly. The most transferable habit here." }
  ],
  takeaways: [
    "Watch for problem decomposition and debugging technique, not for copyable code.",
    "The terrain generation series is the most directly reusable in real projects.",
    "Adopt the habit of drawing intermediate state — it changes how fast you debug.",
    "Don't let polished content become a substitute for shipping something rough."
  ],
  pitfalls: [
    "Trying to follow along line by line and getting lost.",
    "Comparing your work-in-progress to a finished, edited exploration."
  ]
},

{
  id: "ui-toolkit",
  title: "UI Toolkit vs uGUI",
  author: "Unity Technologies",
  type: "doc",
  level: "intermediate",
  duration: "3–4 hours",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/UIToolkits.html",
  tags: ["ui", "ui-toolkit", "ugui", "official"],
  updated: "Current",
  tldr: "Unity has three UI systems. UI Toolkit is the future and uses web-like UXML/USS; uGUI is the mature GameObject-based one. Choose by feature needs, not novelty.",
  diagrams: ["ui-systems", "canvas-hierarchy"],
  prerequisites: ["unity-essentials"],
  summary: [
    {
      heading: "Three systems, and what each is for",
      body: "IMGUI is the immediate-mode system drawn in OnGUI. It is effectively editor-only now; do not build runtime UI with it. uGUI (the Unity UI package) is the GameObject-based system most tutorials teach: a Canvas with RectTransform children, familiar and mature, with the entire ecosystem of Asset Store extensions built for it. UI Toolkit is the newer retained-mode system modelled on web technology: structure in UXML, styling in USS (which is CSS with a different file extension and some omissions), and layout via Flexbox. It is the direction Unity is investing in, it is used for editor extensions, and it performs better at scale — but it has taken years to reach parity on runtime features like world-space UI."
    },
    {
      heading: "Choosing between them in 2026",
      body: "Practically: if you need UI positioned in 3D world space (a health bar floating above an enemy, a diegetic screen on a wall), or you depend on Asset Store UI packages, uGUI is still the pragmatic answer. If you are building dense, data-driven screens — inventories, skill trees, editor tooling, complex menus — UI Toolkit's Flexbox layout and style sheets handle scale far better and the performance difference is real. Many projects sensibly use both: UI Toolkit for menus and HUD, uGUI for the few world-space elements. That is not a compromise, it is a reasonable division by capability."
    },
    {
      heading: "What transfers if you know web development",
      body: "UI Toolkit is unusually approachable for anyone with HTML/CSS experience. UXML is markup with elements and hierarchies; USS is a stylesheet language with selectors, classes and inheritance; layout is Flexbox with the same flex-direction, justify-content and align-items semantics. The differences are real but small — no cascade in exactly the CSS sense, a restricted property set, and units limited mostly to pixels and percentages. Someone comfortable with CSS Flexbox will be productive in UI Toolkit within a day, whereas uGUI's anchor-and-pivot RectTransform model takes most people considerably longer to develop intuition for."
    },
    {
      heading: "The uGUI concepts you still need",
      body: "Even if you choose UI Toolkit, uGUI knowledge remains necessary because of the existing ecosystem. Canvas Render Mode determines whether UI is drawn in screen space (overlay or camera) or world space. Anchors define which part of the parent a RectTransform is positioned relative to, and the anchor/pivot distinction is the single most confusing part of uGUI — anchors control how the element responds to parent resizing, pivot controls the origin for position and rotation. The Canvas rebuild cost is the main performance concern: any change to any element marks the whole canvas dirty, so splitting frequently-updating elements (a timer, a health bar) onto their own canvas is the standard fix."
    }
  ],
  keyConcepts: [
    { term: "UXML / USS", detail: "Markup and stylesheets for UI Toolkit. HTML/CSS-shaped, not identical." },
    { term: "Flexbox layout", detail: "UI Toolkit's layout model. Same mental model as CSS Flexbox." },
    { term: "Canvas Render Mode", detail: "Screen Space Overlay/Camera or World Space. Determines everything downstream." },
    { term: "Anchor vs pivot", detail: "Anchor = relationship to parent on resize. Pivot = origin for position/rotation." },
    { term: "Canvas rebuild", detail: "One change dirties the whole canvas. Split volatile elements onto their own." },
    { term: "TextMeshPro", detail: "The text solution for uGUI. Signed distance field rendering; sharp at any size." }
  ],
  takeaways: [
    "UI Toolkit for dense data-driven screens; uGUI where you need world-space UI or ecosystem packages.",
    "Using both in one project is a legitimate architecture, not a failure.",
    "Split frequently-updating uGUI elements onto their own canvas to avoid full rebuilds.",
    "Web/CSS experience transfers almost directly to UI Toolkit."
  ],
  pitfalls: [
    "Following a uGUI tutorial while building in UI Toolkit — the vocabulary overlaps and the APIs do not.",
    "One giant canvas containing a per-frame-updating timer, rebuilding everything every frame.",
    "Fighting anchors without understanding that they govern resize behaviour, not position."
  ]
},

{
  id: "performance-profiling",
  title: "Profiling and performance: the measurement loop",
  author: "Unity Learning Hub (synthesis)",
  type: "article",
  level: "intermediate-advanced",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/Profiler.html",
  tags: ["performance", "profiler", "optimization", "memory", "gc"],
  updated: "Evergreen",
  tldr: "Optimisation without measurement is superstition. The Profiler, Frame Debugger and Memory Profiler tell you where time actually goes.",
  diagrams: ["profiler-loop", "frame-budget"],
  prerequisites: ["kitchen-chaos"],
  summary: [
    {
      heading: "The frame budget, which reframes everything",
      body: "At 60 frames per second you have 16.7 milliseconds per frame for everything — input, gameplay logic, physics, animation, culling, draw call submission, GPU rendering, UI, audio. At 30fps, 33ms. Thinking in a budget rather than in 'fast' and 'slow' changes the conversation: a system taking 3ms is not slow in the abstract, it is consuming 18% of your 60fps budget, and whether that is acceptable depends on what else needs those milliseconds. Every optimisation decision becomes a question of allocation. This framing also tells you when to stop — once you are comfortably inside budget on your minimum-spec target device, further optimisation is wasted effort."
    },
    {
      heading: "Profile on the target device, always",
      body: "The single most common profiling mistake is measuring in the editor on a development PC. The editor adds substantial overhead that does not exist in a build, and your development machine is not the phone or console you are shipping to. Editor numbers tell you relative cost between your own systems, which is useful for finding the worst offender, but the absolute numbers are fiction. Build a development build with the profiler attached and run it on the weakest device you intend to support. The conclusions frequently reverse: things that dominate in the editor disappear in a build, and GPU-bound problems invisible on a desktop GPU become the entire story on mobile."
    },
    {
      heading: "CPU-bound versus GPU-bound, and why it matters",
      body: "Before optimising anything, determine which processor is the bottleneck. If the CPU is waiting for the GPU, making your C# faster achieves literally nothing. The Profiler's timeline view shows this: look for the main thread blocking on the render thread, or use the simple diagnostic of dropping the resolution dramatically — if the framerate improves substantially you are GPU-bound (fill rate or shader cost), if it does not you are CPU-bound (script logic, draw call submission, physics). CPU-bound problems are fixed with algorithmic changes, batching and jobs; GPU-bound problems are fixed with fewer/cheaper pixels, simpler shaders, and less overdraw. The fixes do not transfer between the two."
    },
    {
      heading: "Garbage collection, the Unity-specific performance story",
      body: "Unity's default garbage collector runs incrementally now, but allocation still causes eventual collection and collection still costs frame time. The goal in gameplay code is zero allocation per frame. Common accidental allocations: string concatenation (including interpolation in a Debug.Log that ships), boxing a struct into an object, LINQ queries in Update, GetComponent returning a new array, foreach over certain collection types in older Unity versions, and Camera.main (which was a FindGameObjectWithTag call historically and should be cached regardless). The Profiler's GC Alloc column per frame is the authoritative answer — sort by it, fix the top entries, re-measure."
    },
    {
      heading: "Draw calls, batching and the Frame Debugger",
      body: "Every unique combination of mesh and material submitted to the GPU is a draw call, and each has CPU-side setup cost. The Frame Debugger steps through a single frame's draw calls in order, showing exactly what was drawn, with what material, and — critically — why a batch was broken. Unity offers several batching mechanisms: static batching for non-moving geometry, GPU instancing for many copies of the same mesh, the SRP Batcher for objects sharing a shader variant (which works differently from traditional batching — it batches by shader, not by material), and dynamic batching for small meshes. The single highest-leverage practice is reducing material variety: fifty objects sharing one material batch, fifty objects with fifty materials do not."
    },
    {
      heading: "The loop itself",
      body: "Measure to find the biggest cost. Form a hypothesis about why it is expensive. Change one thing. Measure again. Keep the change if it helped, revert it if it did not. This sounds obvious and is routinely violated — developers apply a list of remembered optimisations simultaneously, cannot attribute the improvement, and carry forward changes that made things worse. Changing one thing at a time is slower per iteration and far faster overall."
    }
  ],
  keyConcepts: [
    { term: "Frame budget", detail: "16.7ms at 60fps. Allocate it consciously across systems." },
    { term: "Development build + profiler", detail: "Profile on the target device. Editor numbers are relative, not absolute." },
    { term: "CPU vs GPU bound", detail: "Determine first. The fixes are completely different." },
    { term: "GC Alloc", detail: "Per-frame allocation. Target zero in gameplay code." },
    { term: "SRP Batcher", detail: "Batches by shader variant, not material. Different rules from legacy batching." },
    { term: "Frame Debugger", detail: "Steps through one frame's draw calls and explains broken batches." },
    { term: "Overdraw", detail: "Same pixel shaded repeatedly. Transparency's main cost; kills mobile fill rate." }
  ],
  takeaways: [
    "Never optimise without measuring; you will reliably guess wrong about the bottleneck.",
    "Profile a development build on the weakest target device, not the editor on your PC.",
    "Determine CPU-bound versus GPU-bound before choosing a fix.",
    "Target zero per-frame allocation in gameplay code; sort the profiler by GC Alloc.",
    "Change one thing at a time and re-measure, however slow that feels."
  ],
  pitfalls: [
    "Applying a list of 'optimisation tips' without measuring which one mattered.",
    "Debug.Log with string interpolation left in shipping code, allocating every frame.",
    "Optimising C# while the GPU is the actual bottleneck."
  ]
},

{
  id: "multiplayer-netcode",
  title: "Netcode for GameObjects and multiplayer fundamentals",
  author: "Unity Technologies",
  type: "doc",
  level: "advanced",
  duration: "10+ hours",
  cost: "Free",
  url: "https://docs-multiplayer.unity3d.com/",
  tags: ["multiplayer", "networking", "netcode", "official", "advanced"],
  updated: "Current",
  tldr: "Multiplayer is not a feature you add; it is an architecture you choose. Server authority, state sync and lag compensation reshape your entire codebase.",
  diagrams: ["netcode-authority", "client-prediction"],
  prerequisites: ["kitchen-chaos", "performance-profiling"],
  summary: [
    {
      heading: "The decision that shapes everything: who is authoritative",
      body: "In a client-authoritative design, each client decides its own state and tells everyone else. It is simple, responsive, and completely indefensible against cheating — a modified client can claim any position or any damage. In a server-authoritative design, clients send inputs, the server simulates and decides truth, and clients display what the server reports. This is what every competitive game does, and it introduces latency: your input travels to the server and the result travels back before you see it. Every technique in multiplayer networking exists to hide that latency while keeping the server the authority. Choosing this model early is essential because retrofitting server authority onto a client-authoritative codebase is effectively a rewrite."
    },
    {
      heading: "NetworkVariables and RPCs",
      body: "Netcode for GameObjects offers two synchronisation primitives. A NetworkVariable is a value whose changes propagate automatically from its authority to observers — health, position, score. Use it for state that has a current value someone needs to know. An RPC is an explicit call executed on another machine — ServerRpc goes client-to-server, ClientRpc goes server-to-clients. Use it for events that happen at a moment: fire a weapon, play an effect, request an action. The distinction matters because using RPCs for state produces desynchronisation when a message is lost or a client joins late, while using NetworkVariables for events produces missed events when two changes happen within one network tick."
    },
    {
      heading: "Prediction, reconciliation and interpolation",
      body: "Three techniques make an authoritative server feel responsive. Client-side prediction: the client applies its own input immediately rather than waiting, so movement feels instant. Server reconciliation: when the server's authoritative state arrives and disagrees with the prediction, the client rewinds to the server state and replays the inputs it has sent since, correcting smoothly. Entity interpolation: other players' positions are rendered slightly in the past, interpolating between received snapshots rather than extrapolating, which trades a small amount of latency for smooth motion instead of teleporting. Together these produce the standard experience of a competitive shooter — your own actions feel immediate, others move smoothly, and the server remains the arbiter. Implementing them correctly is genuinely hard and is the main reason multiplayer costs so much more than it appears to."
    },
    {
      heading: "Topologies and their trade-offs",
      body: "Listen server means one player's machine also runs the server: cheap, no infrastructure, but that player has a latency advantage and can potentially cheat, and the session dies if they leave. Dedicated server means an authoritative machine you host: fair, secure, and it costs money continuously and needs operations work. Relay services forward traffic between peers without hosting simulation, solving NAT traversal without a full server — Unity's Relay and Lobby services target exactly this. Distributed authority, a newer model Unity supports, splits authority per-object across clients, reducing server cost while keeping some guarantees. For a small team shipping a co-op game, listen server plus relay is usually the pragmatic answer; for anything competitive, dedicated servers are the only defensible option."
    },
    {
      heading: "How to learn this without drowning",
      body: "Do not start with a networking tutorial on an empty project. Take a small single-player game you already understand completely and add multiplayer to it — the Kitchen Chaos multiplayer course is built around exactly this progression and is the best on-ramp available. Then build the simplest possible thing that syncs: two capsules moving in a room, server-authoritative, with interpolation. Get that genuinely correct, including a client joining late and a client disconnecting, before adding anything else. Most multiplayer projects fail because they added gameplay before the networking foundation was solid."
    }
  ],
  keyConcepts: [
    { term: "Server authority", detail: "Server decides truth; clients send input. Mandatory for anything competitive." },
    { term: "NetworkVariable", detail: "Auto-synced state with a current value. Survives late joins." },
    { term: "ServerRpc / ClientRpc", detail: "Explicit remote calls for momentary events." },
    { term: "Client-side prediction", detail: "Apply local input immediately; correct when the server disagrees." },
    { term: "Reconciliation", detail: "Rewind to server state and replay pending inputs." },
    { term: "Entity interpolation", detail: "Render others slightly in the past for smooth motion." },
    { term: "Relay", detail: "Forwards peer traffic without hosting simulation. Solves NAT without a server." }
  ],
  takeaways: [
    "Decide the authority model before writing gameplay code; it is not retrofittable.",
    "NetworkVariables for state, RPCs for events — mixing them up causes desync and missed actions.",
    "Add multiplayer to a game you already understand rather than starting from a networking tutorial.",
    "Get late-join and disconnect correct before adding features; they expose every architectural flaw."
  ],
  pitfalls: [
    "Client-authoritative movement in a competitive game, discovered only after launch.",
    "Testing only on localhost, where zero latency hides every prediction bug.",
    "Syncing every value every tick and saturating bandwidth."
  ]
},

{
  id: "build-ship",
  title: "Build pipeline, platforms and shipping",
  author: "Unity Technologies",
  type: "doc",
  level: "intermediate",
  duration: "4–6 hours",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/PublishingBuilds.html",
  tags: ["build", "shipping", "platforms", "addressables", "official"],
  updated: "Current",
  tldr: "The phase almost no tutorial covers. IL2CPP stripping, platform settings, addressables and store requirements all bite at the worst possible time.",
  diagrams: ["build-pipeline", "addressables-flow"],
  prerequisites: ["performance-profiling"],
  summary: [
    {
      heading: "Why this is the least-taught and most-needed phase",
      body: "Tutorials end when the game works in the editor. Shipping is a separate discipline with its own failure modes, and encountering them for the first time under deadline pressure is how projects die two weeks from release. The specific danger is that build-only failures are invisible during development: code stripping removes methods only used via reflection, platform-specific APIs behave differently, shader variants missing from the build appear magenta, and file paths that work on Windows fail on a case-sensitive filesystem. Every one of these works perfectly in the editor. The mitigation is simple and widely ignored: build and run on your target platform from week one, not week fifty."
    },
    {
      heading: "Mono versus IL2CPP, and what stripping breaks",
      body: "Unity can compile your C# to run on Mono (just-in-time, faster iteration, fewer platforms) or convert it to C++ and compile natively via IL2CPP (ahead-of-time, better performance, required for iOS, consoles and WebGL). IL2CPP also performs managed code stripping, removing code it can prove is unused — and its proof cannot see through reflection. Code invoked by reflection, types deserialized by name from JSON, and generic instantiations created at runtime can all be stripped, producing runtime exceptions that never occur in the editor. The fixes are a link.xml file preserving specific types, the [Preserve] attribute, or reducing the stripping level. Knowing this failure mode exists is most of the battle, because the error messages point at a missing type rather than at stripping."
    },
    {
      heading: "Addressables and why Resources is a trap",
      body: "The Resources folder loads assets by string path and is the first thing beginners find. Its fatal property is that everything in it is included in the build and loaded into memory at startup regardless of use, which is fine for a prototype and catastrophic for a shipping game. Addressables replace it: assets are given addresses, packed into bundles, loaded and unloaded asynchronously, and can be hosted remotely for content updates without a store resubmission. The migration cost is real — asynchronous loading changes your code's shape — which is why choosing Addressables early rather than migrating later is the right call for anything that will ship. For a game jam, Resources is fine."
    },
    {
      heading: "Platform realities",
      body: "Each platform has its own gotchas that no general tutorial covers. Mobile means aggressive memory limits, thermal throttling that makes the tenth minute slower than the first, texture compression formats that differ between iOS and Android, and store requirements including privacy declarations and age ratings. WebGL means no threads in the usual sense, a hard download-size ceiling that dominates player drop-off, and no access to the filesystem. Consoles require certification, an approved devkit, and an NDA'd SDK. Desktop is the most forgiving and still requires thinking about GPU variety, aspect ratios, and whether your game handles alt-tab. Build early on the hardest target you intend to ship, because its constraints should shape your art pipeline rather than being discovered after the art is made."
    },
    {
      heading: "The pre-release checklist nobody writes down",
      body: "Things that reliably surprise first-time shippers: quit handling and save-on-background (mobile apps are killed, not closed); different aspect ratios and safe areas around notches; controller support and the fact that a controller may be connected mid-game; localisation, which is much cheaper to plan for than to retrofit because it changes UI layout; accessibility options including remappable controls, subtitles, and not conveying information by colour alone; a crash reporting pipeline so you learn about failures from telemetry rather than reviews; and a build that is reproducible from a clean checkout on a machine that is not yours. That last one catches the missing asset that only exists in your local project folder."
    }
  ],
  keyConcepts: [
    { term: "IL2CPP", detail: "C# → C++ → native. Required on iOS/consoles/WebGL. Performs code stripping." },
    { term: "Managed stripping + link.xml", detail: "Unused code removed; reflection-invoked code needs explicit preservation." },
    { term: "Addressables", detail: "Addressed, async-loaded, bundle-packed assets. Replaces Resources for shipping." },
    { term: "Resources folder", detail: "Always built, always loaded. Fine for jams, wrong for shipping." },
    { term: "Shader variants", detail: "Combinatorial; missing variants in a build show as magenta. Use a variant collection." },
    { term: "Development build", detail: "Enables profiling and the console in a real build. Never ship one." }
  ],
  takeaways: [
    "Build on your target platform from week one; build-only failures are invisible in the editor.",
    "Expect IL2CPP stripping to break reflection-based code; know link.xml exists before you need it.",
    "Choose Addressables over Resources for anything intended to ship.",
    "Test on the weakest device you will support, for long enough to hit thermal throttling.",
    "Verify a clean-checkout build on another machine before you believe your build works."
  ],
  pitfalls: [
    "First build attempted a week before launch.",
    "JSON deserialization into types stripped by IL2CPP, failing only in the release build.",
    "Shipping a development build by accident."
  ]
},

{
  id: "gamedevtv-3d",
  title: "Complete C# Unity 3D Game Development (Unity 6)",
  author: "GameDev.tv — Rick Davidson, Stephen Hubbard",
  type: "course",
  level: "beginner",
  duration: "30–57 hours",
  cost: "Paid (frequently discounted)",
  url: "https://gamedev.tv/courses/unity6-complete-3d",
  tags: ["course", "3d", "csharp", "beginner", "paid", "structured"],
  updated: "Updated for Unity 6 (2026)",
  tldr: "Five complete 3D games with genuine C# teaching from zero. The most structured paid path, with the accountability that paying creates.",
  diagrams: ["monobehaviour-lifecycle", "prefab-workflow"],
  prerequisites: [],
  summary: [
    {
      heading: "What paid structure buys you",
      body: "The content in a paid course is not fundamentally better than the best free content — Code Monkey's free course is architecturally stronger than most paid material. What you are buying is sequencing, completeness and accountability. Someone has decided what order concepts should arrive in, ensured nothing load-bearing is skipped, and provided a forum where a stuck beginner gets unstuck rather than abandoning. For learners who struggle with self-direction, that is worth the money, and these courses discount to roughly the price of a lunch regularly enough that you should never pay full price."
      },
    {
      heading: "The five-projects structure",
      body: "Rather than one large game, the course builds five smaller complete ones — an obstacle course, a rocket-landing game, a rail shooter, an endless runner, and a first-person shooter. This is pedagogically sound. Each project is finishable, each introduces a distinct genre's problems, and finishing five things teaches completion as a habit. It also covers a wider API surface than a single project would: terrain and ProBuilder for level construction, Timeline for sequences, raycasting for shooting, object pooling for the runner, and enemy AI with NavMesh."
    },
    {
      heading: "The C# teaching is real",
      body: "The distinguishing feature versus a tutorial series is that this actually teaches programming rather than teaching you to copy code that works. Variables, loops, conditionals, methods, classes and inheritance are introduced deliberately with explanation of why, and the course resists the common shortcut of handing over a finished script. For someone whose actual gap is programming rather than Unity, this is the more appropriate starting point than an architecture-focused course that assumes C# fluency."
    },
    {
      heading: "Where it stops",
      body: "Like almost all courses, it ends near the point of a working game rather than a shipped one. Deep architecture, performance profiling, platform-specific shipping problems and multiplayer are out of scope. The natural sequence is this course for foundations, Kitchen Chaos for architecture, then Catlike or specialised material for depth, with the shipping material on this site filling the final gap."
    }
  ],
  keyConcepts: [
    { term: "NavMesh", detail: "Baked navigation surface; NavMeshAgent pathfinds over it for enemy movement." },
    { term: "ProBuilder", detail: "In-editor geometry modelling for greyboxing levels without external tools." },
    { term: "Raycasting", detail: "Cast a ray, get what it hit. Hitscan weapons, line of sight, ground checks." },
    { term: "Object pooling", detail: "Reuse instead of instantiate/destroy. Taught here in the endless-runner context." }
  ],
  takeaways: [
    "Buy on discount; these courses are near-permanently on sale.",
    "Five finishable projects beats one enormous unfinished one for habit formation.",
    "The right choice if your gap is C# itself rather than Unity specifically.",
    "Follow with an architecture-focused course; this one stops before that."
  ],
  pitfalls: [
    "Paying full price.",
    "Treating course completion as readiness to ship — the last mile is not covered."
  ]
},

{
  id: "brackeys-archive",
  title: "Brackeys archive (Unity, 2013–2020)",
  author: "Brackeys",
  type: "video",
  level: "beginner-intermediate",
  duration: "460+ videos",
  cost: "Free",
  url: "https://www.youtube.com/@Brackeys",
  tags: ["video", "archive", "beginner", "legacy"],
  updated: "Unity content frozen in 2020; channel now covers Godot",
  tldr: "The most-watched Unity tutorial library ever made, and now a historical archive. Fundamentals hold up; APIs and UI frequently do not.",
  diagrams: ["monobehaviour-lifecycle"],
  prerequisites: [],
  summary: [
    {
      heading: "Why it is still worth knowing about",
      body: "Brackeys produced over 460 Unity tutorials with more than 127 million views, and for most of the 2010s was the default answer to 'how do I do X in Unity'. The channel stopped producing Unity content in 2020 and returned in 2024 covering Godot instead. The archive remains public and remains the top search result for an enormous number of Unity questions, which means you will land on it whether or not you seek it out. Knowing what it is — and how old it is — is therefore practically necessary."
    },
    {
      heading: "What holds up and what does not",
      body: "Conceptual explanations age well. The videos on how colliders and rigidbodies relate, what a coroutine is, how a state machine works, how to think about a character controller, why object pooling matters — these are as clear as anything made since and the concepts have not changed. What has changed: the legacy Input Manager code (Input.GetAxis) is now the old path, the UI shown is pre-UI-Toolkit, the render pipeline is built-in so shader and lighting content will not transfer to URP, and specific API signatures have moved on. The Unity editor UI itself looks noticeably different, which disorients beginners following along step by step."
    },
    {
      heading: "How to use an archive safely",
      body: "Watch for the explanation, then implement using current documentation. If a video explains why you need a Rigidbody for trigger callbacks, that is permanently true. If it shows exact code for reading input, check the Input System docs for the modern equivalent before copying. A good habit is to open the relevant Manual page alongside the video. For anything touching input, UI, rendering or shaders, assume the specifics have changed. For anything touching core physics, C# concepts or architecture, assume they have not."
    },
    {
      heading: "The context, briefly",
      body: "The channel's founder stepped away in 2020 after roughly eight years of tutorial-making, and the 2024 return to Godot followed Unity's runtime fee announcement — a pricing policy that was subsequently cancelled, with Unity 6 explicitly carrying no runtime fee. The practical relevance today is only that the Unity archive is frozen; the current channel will not help with Unity questions."
    }
  ],
  keyConcepts: [
    { term: "Legacy Input Manager", detail: "Input.GetAxis / GetKey. Still functional, no longer the default path." },
    { term: "Built-in pipeline content", detail: "Shader and lighting videos will not transfer to URP/HDRP." },
    { term: "Conceptual durability", detail: "Physics, coroutines and architecture explanations remain accurate." }
  ],
  takeaways: [
    "Use it for concepts, verify every API against current docs.",
    "Assume anything about input, UI, shaders or rendering has changed.",
    "You will land here from search regardless — know the date on what you are watching."
  ],
  pitfalls: [
    "Copying legacy input code into a Unity 6 project configured for the new Input System.",
    "Following built-in-pipeline lighting settings inside a URP project."
  ]
},

{
  id: "unity-ai",
  title: "Unity AI: Assistant, Generators and Inference Engine",
  author: "Unity Technologies",
  type: "doc",
  level: "intermediate",
  duration: "1–2 hours",
  cost: "Freemium (credit-based)",
  url: "https://unity.com/products/ai",
  tags: ["ai", "tooling", "official", "workflow"],
  updated: "Replaced Muse; in beta through 2026",
  tldr: "Unity's in-editor AI suite. Assistant answers project-aware questions and writes C#, Generators make assets, Inference Engine runs models at runtime.",
  diagrams: ["unity-ai-modes"],
  prerequisites: ["cs-fundamentals"],
  summary: [
    {
      heading: "What replaced what",
      body: "Unity AI supersedes the earlier Muse and Sentis products. Assistant replaces Muse Chat as the in-editor conversational helper; Generators replace Muse Sprite, Texture and Animate for asset creation; the Inference Engine is the rebranded Sentis for running neural networks locally, in the editor or at runtime on the player's machine. The strategic change alongside the rename is that Unity moved from its own first-party models to third-party frontier models routed through Unity's infrastructure. It requires Unity 6.0 or newer and has remained in beta through 2026, with a credit-based pricing model that gives Personal Edition users a limited trial."
    },
    {
      heading: "Assistant's modes and where it genuinely helps",
      body: "Assistant operates in modes with escalating autonomy: asking questions without modifying anything, generating or reviewing C#, and agentic operation that executes editor actions on your behalf — creating scripts, modifying components, batch-renaming assets, placing objects. Its differentiator against a general chat assistant is project context: it can inspect your scene hierarchy, your components, your installed packages and your target platform. The honest assessment is that it is most valuable for editor automation and documentation lookup — the tedious mechanical work — and least valuable for architecture decisions, where context about your project's future matters more than context about its present."
    },
    {
      heading: "The Inference Engine is the genuinely distinctive piece",
      body: "Running a neural network locally inside a built game is a different capability from AI-assisted development. The Inference Engine imports models in standard formats and executes them on the player's device with no network round-trip and no data leaving the machine. Plausible uses include gesture and pose recognition, procedural animation, adaptive difficulty, enemy behaviour that learns within a session, and content classification. It is less mature than the authoring tools and requires real machine learning knowledge to use well, but it is the piece with no equivalent elsewhere in the engine."
    },
    {
      heading: "Caveats worth stating plainly",
      body: "Generated assets carry licensing and provenance questions that Unity has pushed onto the user in its terms, which matters if you are shipping commercially or working under a publisher agreement. Generated code has the usual property of looking plausible and sometimes being wrong in ways a beginner cannot detect — which makes AI assistance most dangerous precisely for the audience most attracted to it. The productive stance is to use it for things you could verify yourself but would rather not type, and not for things you could not evaluate. Being in beta, specifics of pricing, models and features should be checked against current documentation rather than trusted from any article including this one."
    }
  ],
  keyConcepts: [
    { term: "Assistant", detail: "Project-aware in-editor chat with ask, plan and agent modes." },
    { term: "Generators", detail: "Sprite, texture, animation and audio generation publishing into Unity asset types." },
    { term: "Inference Engine", detail: "Local model execution in editor or runtime. Formerly Sentis." },
    { term: "MCP server", detail: "Lets external agents drive the editor. Unity 6.0+ only." },
    { term: "Credit model", detail: "Usage-based billing; Personal Edition gets a limited trial allocation." }
  ],
  takeaways: [
    "Best used for editor automation and documentation lookup, not architecture decisions.",
    "Check licensing implications of generated assets before shipping commercially.",
    "The Inference Engine (runtime local models) is the capability with no alternative elsewhere.",
    "Still in beta — verify pricing and feature specifics against current docs."
  ],
  pitfalls: [
    "Accepting generated code you cannot evaluate, in a codebase you will maintain.",
    "Assuming generated assets are unencumbered for commercial release."
  ]
}

]);
