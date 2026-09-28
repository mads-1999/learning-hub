/* Unity Learning Hub — resource dataset, part 2: Scripting, Physics, Input, Architecture */
window.UNITY_RESOURCES = (window.UNITY_RESOURCES || []).concat([

{
  id: "kitchen-chaos",
  title: "Kitchen Chaos — complete free course",
  author: "Code Monkey",
  type: "video",
  level: "beginner-intermediate",
  duration: "~10 hours",
  cost: "Free",
  url: "https://www.youtube.com/watch?v=AmGSEH7QcDg",
  tags: ["video", "scripting", "architecture", "3d", "scriptableobjects", "state-machine", "shader-graph"],
  updated: "Unity 6 compatible; assets provided free",
  tldr: "A full Overcooked-style game built from scratch with deliberate attention to clean architecture. The best free bridge from beginner to intermediate.",
  diagrams: ["event-architecture", "state-machine", "scriptableobject-pattern", "monobehaviour-lifecycle"],
  prerequisites: ["unity-essentials", "roll-a-ball"],
  summary: [
    {
      heading: "What makes this different from other long tutorials",
      body: "Most ten-hour 'build a game' courses teach you to build that game. This one teaches you to structure a project, using that game as the vehicle. The distinction matters enormously at the beginner-to-intermediate boundary, which is exactly where most self-taught developers stall. The stall looks like this: you can make anything work in isolation, but by hour thirty of your own project every script references every other script, changing one thing breaks three, and you rewrite from scratch. Kitchen Chaos is structured to prevent that outcome by demonstrating decoupling, data-driven design and state management from the start rather than bolting them on."
    },
    {
      heading: "The event-driven architecture, and why it is the core lesson",
      body: "The course leans hard on C# events and interfaces to decouple systems. A counter does not tell the UI to update; it raises an event and whatever cares subscribes. The player does not know about the sound manager; the sound manager listens for the events it cares about. The practical payoff is that you can delete an entire subsystem and the rest still compiles. The architectural payoff is that each script has one reason to change. Watch specifically for how subscriptions are torn down — subscribing without unsubscribing is the failure mode that makes event-driven code worse than direct references, and the course handles it correctly."
    },
    {
      heading: "ScriptableObjects as data containers",
      body: "Recipes and ingredients are ScriptableObjects rather than hardcoded classes or prefab components. This is one of Unity's genuinely distinctive tools and it is underused by beginners. A ScriptableObject is an asset that lives in your project, holds data, and exists once in memory regardless of how many things reference it. Instead of every tomato prefab carrying its own copy of 'tomato' data, they all point at one TomatoSO asset. Designers can create new ingredients by right-clicking in the Project window with no code changes. The pattern extends far beyond data — ScriptableObject-based events and runtime sets are a well-known architecture — but data containers are the right first use."
    },
    {
      heading: "State machines for gameplay logic",
      body: "The game's flow (waiting to start, countdown, playing, game over) is a state machine rather than a pile of booleans. This is worth internalising early because the boolean approach fails in a very specific and frustrating way: with four booleans you have sixteen possible states, most of which are invalid, and the invalid ones are exactly the bugs you cannot reproduce. A state machine makes invalid states unrepresentable. The same pattern reappears for character behaviour, enemy AI and UI flow, so learning it once pays out repeatedly."
    },
    {
      heading: "Breadth: input, animation, VFX and polish",
      body: "Beyond architecture, the course covers the new Input System including rebinding (a feature most tutorials skip and most shipped games need), Animator Controllers for character animation, Shader Graph for visual effects, and the sound and UI layers. A follow-up multiplayer course extends the same project with Netcode for GameObjects, NetworkVariables and RPCs — which is the correct way to learn multiplayer, by adding it to a game you already understand rather than starting from a networking tutorial."
    },
    {
      heading: "How to work through ten hours without burning out",
      body: "Do not watch it like a film. One session per sitting, code along, then close the video and re-implement the last feature from memory before moving on. When something breaks, debug it yourself for fifteen minutes before scrubbing back. The debugging is where the learning is concentrated — following along perfectly teaches typing, and being stuck teaches Unity. Expect the whole thing to take two to three times the runtime if you are doing it properly."
    }
  ],
  keyConcepts: [
    { term: "C# events for decoupling", detail: "Publishers raise, subscribers listen; systems stop holding references to each other." },
    { term: "ScriptableObject", detail: "Project asset holding shared data. One instance, many references, designer-editable." },
    { term: "State machine", detail: "Explicit states with defined transitions. Makes invalid combinations impossible." },
    { term: "Interfaces for interaction", detail: "IKitchenObjectParent-style contracts let unrelated types be handled uniformly." },
    { term: "Input System rebinding", detail: "Runtime key remapping — commonly needed, rarely taught." },
    { term: "NetworkVariable / RPC", detail: "In the multiplayer follow-up: synced state versus explicit remote calls." }
  ],
  takeaways: [
    "Architecture is the real subject; the cooking game is the excuse.",
    "Use ScriptableObjects for shared data before you reach for singletons.",
    "State machines eliminate the unreproducible bugs that boolean soup creates.",
    "Re-implement each feature from memory before continuing, or you are learning to type, not to build."
  ],
  pitfalls: [
    "Binge-watching without coding along — retention collapses.",
    "Copying the event pattern without the unsubscribe discipline, creating leaks.",
    "Jumping to the multiplayer course before the single-player architecture is solid."
  ]
},

{
  id: "catlike-basics",
  title: "Catlike Coding — Basics series",
  author: "Jasper Flick",
  type: "doc",
  level: "intermediate",
  duration: "Multi-week",
  cost: "Free",
  url: "https://catlikecoding.com/unity/tutorials/basics/",
  tags: ["scripting", "math", "performance", "compute-shaders", "jobs", "written"],
  updated: "Modern entries target current Unity; older pages predate 2019",
  tldr: "Written, rigorous, cumulative tutorials that teach the mathematics and performance reality underneath Unity. Slow, demanding, unusually high ceiling.",
  diagrams: ["job-system-flow", "profiler-loop"],
  prerequisites: ["cs-fundamentals", "kitchen-chaos"],
  summary: [
    {
      heading: "A different genre of tutorial",
      body: "Catlike Coding is written rather than filmed, which changes everything about how you use it. You cannot passively absorb it; you read a paragraph, type the code, look at the result, and read the next paragraph. It is slower than video and retention is far higher. The series is also cumulative in a strict sense — each tutorial builds on the project state left by the previous one, so skipping around produces a broken project and confusion. Treat it as a textbook with exercises rather than a reference to dip into."
    },
    {
      heading: "What the Basics series actually teaches",
      body: "It starts by building a graph of mathematical functions — a grid of cubes whose positions are driven by a function of position and time. This sounds like a toy and it is the single best on-ramp to game mathematics available for free. By the end you understand parametric surfaces, how to think about transforming space, and how to structure code that computes something per-object per-frame. It then pivots to the interesting part: measuring performance, discovering that a few thousand cubes destroy the frame rate, and progressively fixing that with compute shaders (moving the work to the GPU) and the C# Job System with Burst (moving the work off the main thread and compiling it to vectorised native code)."
    },
    {
      heading: "Why the performance arc matters even if you never write a compute shader",
      body: "Most Unity developers learn performance reactively — the game gets slow, they panic, they search for 'unity optimization tips' and cargo-cult a list. Catlike teaches it constructively: here is a workload, here is how to measure it, here is the architectural change that makes it fast, here is the measurement again. The lasting lesson is the loop — measure, change one thing, measure again — rather than any specific technique. The specific techniques are also valuable: understanding that the main thread, worker threads and the GPU are three different places work can happen, and that moving work between them is the primary optimisation lever, reframes how you think about every performance problem afterwards."
    },
    {
      heading: "The age warning, and how to handle it",
      body: "Some Catlike tutorials are genuinely old — the site says as much, and you can identify them by an older page layout. Older series use the Built-in Render Pipeline and occasionally deprecated technology like geometry shaders. The Basics and Custom SRP series are modern; the original Rendering series is educational but teaches the built-in pipeline, which matters if your project is on URP or HDRP. The concepts transfer; the exact shader code sometimes does not. Read older series for understanding, not for copy-paste."
    }
  ],
  keyConcepts: [
    { term: "Cumulative projects", detail: "Each tutorial continues the previous project state. Order is mandatory." },
    { term: "Compute shader", detail: "GPU program for general computation. Massive parallelism for per-element work." },
    { term: "C# Job System", detail: "Safe multithreading for Unity. Jobs are structs of data plus an Execute method." },
    { term: "Burst compiler", detail: "Compiles jobs to heavily optimised SIMD native code. Often 10x+ over plain C#." },
    { term: "Measure-change-measure", detail: "The actual methodology. More valuable than any single optimisation." }
  ],
  takeaways: [
    "Read with the editor open and type every line; this is a textbook, not a video.",
    "Do the series in order — skipping leaves your project in a state the next page does not expect.",
    "The performance methodology transfers even if you never ship a compute shader.",
    "Check page age before copying shader code; built-in pipeline shaders will not drop into URP."
  ],
  pitfalls: [
    "Skimming it like a video tutorial and retaining nothing.",
    "Copying built-in-pipeline shader code into a URP project and getting magenta materials."
  ]
},

{
  id: "input-system",
  title: "The Input System package",
  author: "Unity Technologies",
  type: "doc",
  level: "intermediate",
  duration: "2–4 hours to be productive",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/Input.html",
  tags: ["input", "official", "package", "rebinding", "gamepad"],
  updated: "Default for new Unity 6 projects",
  tldr: "The modern replacement for Input.GetAxis. Action-based, device-agnostic, supports rebinding and multiple players. Coexists confusingly with the legacy system.",
  diagrams: ["input-system-flow"],
  prerequisites: ["cs-fundamentals"],
  summary: [
    {
      heading: "The problem it solves",
      body: "The legacy Input Manager asks your code a question every frame: is the jump button down? Your code therefore knows about buttons, which means it knows about devices, which means supporting a gamepad requires touching gameplay code. The Input System inverts this. You define Actions ('Jump', 'Move', 'Interact') in an asset, bind each action to any number of physical controls across any number of device types, and your gameplay code responds to the action without ever knowing whether a keyboard, a gamepad or a touchscreen produced it. Adding controller support becomes a data change rather than a code change."
    },
    {
      heading: "The layered model",
      body: "Four concepts stack. Devices are physical hardware Unity has discovered — a specific gamepad, the keyboard. Controls are the individual inputs on a device — the south button, the left stick's X axis. Actions are your semantic intentions — Jump, Move — and they have a type (Button, Value, Pass-Through) that determines how they behave. Bindings connect controls to actions, and can be composites (WASD becoming a single 2D vector) or part of a Control Scheme that groups bindings for a device family. Action Maps group actions by context — a 'Gameplay' map and a 'UI' map that you enable and disable as the player opens a menu. That last piece is how you stop the player shooting while navigating the pause screen, and it is much cleaner than the boolean checks the legacy system forced."
    },
    {
      heading: "Three ways to read input, and which to use",
      body: "You can respond to actions via callbacks (subscribe to action.performed), by polling (action.ReadValue<Vector2>() in Update), or through the PlayerInput component which can broadcast Unity messages or invoke UnityEvents. Callbacks are best for discrete events — jump, interact, fire. Polling is best for continuous values — movement, aiming — because you want the current value at the time you use it rather than the value at the moment it changed. PlayerInput's message-based modes are convenient for prototypes and multiplayer local co-op, but the string-based method lookup is fragile and most experienced developers move to explicit callbacks or a generated C# wrapper class. Generating the wrapper (a checkbox on the asset) gives you compile-time-checked, IDE-completable access to your actions, which is the best of the options for a serious project."
    },
    {
      heading: "The coexistence trap",
      body: "The most common confusion is that having the Input System package installed does not mean your project uses it. Active Input Handling in Player Settings decides what runs: Input Manager (legacy only), Input System Package (new only), or Both. If it is set to the legacy option and you write new-system code, you get runtime errors; if you set it to the new system and some old code calls Input.GetKey, that code throws. 'Both' works but doubles the overhead and hides the problem. When following any tutorial, the first question to ask is which input system it uses — the two have near-identical-looking code for reading a movement vector and completely different setup."
    },
    {
      heading: "Rebinding, which is the feature that justifies the migration",
      body: "Runtime rebinding — letting the player press a key to reassign an action — is a genuine accessibility requirement and a near-impossible task under the legacy system. The Input System supports it through an interactive rebinding API that listens for the next control actuation and rewrites the binding, plus serialisation of binding overrides so the player's choices persist. If you need one argument for adopting the new system on a project that already works, this is it."
    }
  ],
  keyConcepts: [
    { term: "Action", detail: "A semantic intention (Jump) decoupled from any device." },
    { term: "Binding", detail: "A mapping from a physical control to an action. Composites build vectors from keys." },
    { term: "Action Map", detail: "A context group (Gameplay, UI) you enable/disable as a unit." },
    { term: "Active Input Handling", detail: "Player Settings switch deciding which system actually runs. Source of most confusion." },
    { term: "Generated C# class", detail: "Compile-time-safe wrapper for your actions asset. Prefer it over string lookups." },
    { term: "Interactive rebinding", detail: "Listen for the next actuation and reassign. The killer feature." }
  ],
  takeaways: [
    "Define actions, not keys — device support then becomes a data problem.",
    "Callbacks for discrete events, polling for continuous values.",
    "Check Active Input Handling before debugging any 'input does nothing' problem.",
    "Generate the C# wrapper class; string-based action lookup breaks silently on rename."
  ],
  pitfalls: [
    "Installing the package and assuming the project now uses it.",
    "Mixing Input.GetKey with the new system and hitting runtime exceptions.",
    "Leaving both the Gameplay and UI action maps enabled, so menu navigation also fires gameplay actions."
  ]
},

{
  id: "physics-deep",
  title: "Unity physics: colliders, rigidbodies and the timestep",
  author: "Unity Learning Hub (synthesis)",
  type: "article",
  level: "intermediate",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/PhysicsSection.html",
  tags: ["physics", "rigidbody", "collision", "fundamentals", "performance"],
  updated: "Evergreen",
  tldr: "Why your character falls through the floor at high speed, why OnTriggerEnter never fires, and why physics code belongs in FixedUpdate.",
  diagrams: ["collision-matrix", "physics-decision", "fixed-timestep"],
  prerequisites: ["roll-a-ball"],
  summary: [
    {
      heading: "Three body types, and choosing between them",
      body: "Every collider in your scene is one of three things. A static collider has no Rigidbody: it never moves, and the physics engine caches its position aggressively, which is why moving one is expensive and why you should not. A dynamic Rigidbody is fully simulated: forces, gravity and collisions move it, and you should never set its transform directly. A kinematic Rigidbody has a Rigidbody with Is Kinematic ticked: it is not moved by forces, you move it with MovePosition or by animation, but it does participate correctly in collision detection and it can wake other bodies. Kinematic is the right choice for platforms, doors, and animation-driven characters. Choosing wrongly is the root cause of a large fraction of physics bugs: a static collider you move every frame will produce inconsistent collisions and quietly destroy performance."
    },
    {
      heading: "The interaction matrix nobody memorises",
      body: "Whether a collision or trigger callback fires depends on the combination of body types and trigger flags on both participants, and the rules are not symmetric. The essential shortcut: at least one of the two objects must have a Rigidbody for any callback to fire. Two static colliders overlapping produce nothing at all, which is why a beginner's trigger zone made of two non-Rigidbody objects appears broken. Static-versus-kinematic also produces no collision callbacks. When a trigger does fire, it fires on both participants if both have the right setup, and the callback runs on the object that has the script — so OnTriggerEnter on the pickup and on the player are both valid designs and you should pick one deliberately."
    },
    {
      heading: "FixedUpdate and the accumulator",
      body: "Physics runs on a fixed timestep, 0.02 seconds by default, independent of rendering. Each frame, Unity accumulates elapsed real time and runs however many physics steps are needed to catch up — which may be zero steps on a fast frame or several on a slow one. This is why FixedUpdate is not called once per frame, and why Time.deltaTime inside FixedUpdate is actually Time.fixedDeltaTime. Two consequences follow. First, all force application and Rigidbody manipulation belongs in FixedUpdate, because doing it in Update applies it an unpredictable number of times per simulation step. Second, reading input in FixedUpdate can miss a button press entirely, because a press-and-release can happen between two physics steps — so read input in Update, store it, and consume it in FixedUpdate."
    },
    {
      heading: "Tunnelling, and why fast things pass through walls",
      body: "Discrete collision detection checks for overlap at each physics step. An object moving faster than its own thickness per step is on one side of a wall at step N and the other side at step N+1, with no overlap ever detected. This is tunnelling, and it is why bullets pass through walls. The fix is Continuous collision detection on the fast-moving Rigidbody, which sweeps the path between positions instead of sampling endpoints. Continuous costs more, so apply it to the few fast objects rather than globally. For genuinely fast projectiles, the better answer is often not physics at all: raycast from last position to current position each frame and handle the hit yourself."
    },
    {
      heading: "Layers and the collision matrix as a performance tool",
      body: "The Layer Collision Matrix in Physics settings decides which layers test against which. By default everything tests against everything, which is O(n²)-ish work you usually do not need. Putting pickups on a layer that only collides with the player, and enemy hitboxes on a layer that only tests against projectiles, cuts the broadphase work substantially and — more importantly — eliminates entire classes of bug where things interact that were never meant to. Setting this matrix up early is one of the highest-value fifteen minutes in a new project."
    }
  ],
  keyConcepts: [
    { term: "Static collider", detail: "No Rigidbody. Never move it; the engine assumes it is fixed." },
    { term: "Kinematic Rigidbody", detail: "Not force-driven, but properly simulated for collisions. Use MovePosition." },
    { term: "Fixed timestep", detail: "0.02s default. FixedUpdate runs 0..n times per frame to catch up." },
    { term: "Tunnelling", detail: "Fast objects skip past thin colliders between steps. Fix with Continuous detection or raycasts." },
    { term: "Layer Collision Matrix", detail: "Which layers test against which. Both a perf lever and a bug preventer." },
    { term: "Interpolation", detail: "Smooths a Rigidbody's visual position between physics steps. Enable on the player." }
  ],
  takeaways: [
    "At least one participant needs a Rigidbody or no collision/trigger callback fires.",
    "Never move a static collider; make it kinematic if it has to move.",
    "Read input in Update, apply forces in FixedUpdate, always.",
    "Turn on Interpolation for the player Rigidbody — it fixes the 'why does movement look jittery' complaint.",
    "Configure the Layer Collision Matrix early; it prevents bugs as much as it saves time."
  ],
  pitfalls: [
    "Setting transform.position on a dynamic Rigidbody, which teleports it and skips collision response.",
    "Reading GetKeyDown inside FixedUpdate and losing inputs.",
    "Leaving every layer colliding with every layer in a large scene."
  ]
},

{
  id: "tarodev-patterns",
  title: "Tarodev — Unity architecture and pattern videos",
  author: "Tarodev",
  type: "video",
  level: "intermediate",
  duration: "10–30 min each",
  cost: "Free",
  url: "https://www.youtube.com/@Tarodev",
  tags: ["architecture", "patterns", "video", "scripting", "editor-tools"],
  updated: "Actively publishing",
  tldr: "Short, dense videos on the patterns that separate a prototype from a maintainable project: singletons done properly, object pooling, editor tooling, state machines.",
  diagrams: ["event-architecture", "object-pool", "state-machine"],
  prerequisites: ["kitchen-chaos"],
  summary: [
    {
      heading: "The niche these fill",
      body: "There is an enormous amount of beginner Unity content and a reasonable amount of advanced graphics content, and comparatively little in the middle — the 'my project works but is becoming unmaintainable' zone. That is the gap here. The videos assume you can already make things work and address how to make them keep working at scale: how to organise scenes, when a singleton is acceptable, how to write a small editor tool that saves you an hour a week, how to structure a state machine so adding a state does not require touching five files."
    },
    {
      heading: "Singletons, honestly discussed",
      body: "Singletons are simultaneously the most-used and most-criticised pattern in Unity. The honest position, which these videos take, is that they are a tool with a real cost: they create global mutable state, hide dependencies, and make testing hard — but they also solve a genuine problem in a solo project where a dependency injection framework is overkill. The useful content is the implementation details: how to handle the duplicate-on-scene-reload problem, when DontDestroyOnLoad is appropriate and when it creates orphan objects, and how to keep the singleton surface small so that replacing it later is possible. A ScriptableObject-based service or a simple static event bus is often a better answer, and knowing when each applies is the actual skill."
    },
    {
      heading: "Object pooling and the garbage collector",
      body: "Instantiate and Destroy allocate and free memory. Do that for bullets at ten per second and the garbage collector eventually runs, and when it runs on the main thread you get a frame spike. Object pooling pre-allocates a set of objects, deactivates them instead of destroying them, and reactivates them instead of instantiating. Unity 6 ships a built-in ObjectPool<T> in UnityEngine.Pool, so you no longer need to hand-roll one. The concept generalises: any time you are creating and discarding something frequently at runtime — projectiles, damage numbers, particle bursts, audio sources — pooling is the answer."
    },
    {
      heading: "Editor tooling as an underrated force multiplier",
      body: "Custom inspectors, property drawers, and small editor windows feel like a distraction from 'real' work and are usually the opposite. A designer-facing button that regenerates a level, a custom inspector that validates a configuration and shows a red warning when it is wrong, an attribute that makes a field read-only — each takes twenty minutes and removes a recurring source of error for the life of the project. Unity 6's UI Toolkit is the modern path for editor UI, though IMGUI-based custom inspectors remain common and perfectly serviceable."
    }
  ],
  keyConcepts: [
    { term: "Singleton trade-off", detail: "Convenient global access at the cost of hidden dependencies. Keep the surface small." },
    { term: "ObjectPool<T>", detail: "Built into UnityEngine.Pool since Unity 2021. Stop hand-rolling pools." },
    { term: "GC spike", detail: "Frequent allocation causes collection pauses on the main thread; pooling avoids it." },
    { term: "Custom inspector", detail: "Editor-only UI for a component. Turns invalid configurations into visible warnings." },
    { term: "Hierarchical state machine", detail: "States containing sub-states. Scales past the point where a flat FSM gets unwieldy." }
  ],
  takeaways: [
    "Use the built-in ObjectPool<T> rather than writing your own.",
    "A singleton is acceptable when its surface is small and its replacement is conceivable.",
    "Twenty minutes of editor tooling can remove a recurring error for the whole project.",
    "Watch these when your own project starts feeling unmaintainable — the lessons land harder with a real problem in hand."
  ],
  pitfalls: [
    "Applying patterns preemptively to a prototype that will be thrown away.",
    "DontDestroyOnLoad on a singleton that then duplicates when the scene reloads."
  ]
},

{
  id: "animation-system",
  title: "Animator, state machines and Timeline",
  author: "Unity Technologies",
  type: "doc",
  level: "intermediate",
  duration: "3–5 hours",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/AnimationSection.html",
  tags: ["animation", "animator", "timeline", "official", "state-machine"],
  updated: "Current",
  tldr: "The Animator is a state machine over animation clips driven by parameters. Timeline is for authored sequences. Knowing which to use for what saves a lot of pain.",
  diagrams: ["animator-graph", "state-machine"],
  prerequisites: ["unity-essentials"],
  summary: [
    {
      heading: "The Animator is a state machine, not a player",
      body: "The most common misunderstanding is treating the Animator as something you tell to play a clip. It is a state machine: you define states (Idle, Run, Jump), each holding a clip, connected by transitions with conditions based on parameters (floats, ints, bools, triggers). Your code does not play animations; it sets parameters, and the state machine decides what should be playing. This indirection is deliberate — it means your gameplay code says 'speed is 4.2' rather than 'play the run clip', and the animation department can restructure the graph without touching gameplay code. Fighting this by calling Play() directly works but abandons the machinery that handles blending and transition timing for you."
    },
    {
      heading: "Blend trees and the movement problem",
      body: "A character that walks and runs should not snap between two clips. A blend tree is a state containing multiple clips blended by a parameter — at speed 0 it is idle, at 2 it is walk, at 6 it is run, and everything between is a weighted blend. 2D blend trees extend this to two parameters, which is how strafing works: forward/back on one axis, left/right on the other, with eight directional clips blended by a movement vector. Getting the parameter smoothing right matters more than the clips: feeding a raw input value into a blend tree produces snapping, while damping it over 0.1 seconds produces natural acceleration. The SetFloat overload with a damp time exists exactly for this."
    },
    {
      heading: "Layers, avatar masks and doing two things at once",
      body: "A character that needs to wave while walking has a problem a single state machine cannot express. Animator Layers solve it: each layer is its own state machine, and layers combine either by override or additive blending, restricted to a set of bones by an Avatar Mask. The upper-body layer plays the wave masked to the arms and spine; the base layer keeps running the locomotion. This is also how you implement aiming, carrying, or damage reactions without multiplying your locomotion states by every upper-body variation."
    },
    {
      heading: "Timeline versus Animator",
      body: "Timeline is a different tool for a different job. The Animator handles reactive, parameter-driven, indefinitely-looping animation — what a character does moment to moment. Timeline handles authored sequences with a fixed structure — a cutscene, a scripted door opening with camera move and audio, a boss intro. Timeline can sequence animation, audio, activation, and custom tracks together on one timeline with a scrubbable editor. Using the Animator for a cutscene means encoding time in transitions, which is miserable; using Timeline for locomotion means authoring every possible reaction in advance, which is impossible. Pick by whether the sequence is authored or reactive."
    },
    {
      heading: "Root motion, and the decision you must make consciously",
      body: "Root motion means the animation itself moves the character — a run clip that travels forward moves the GameObject. The alternative is in-place animation with code-driven movement. Root motion produces perfect foot planting with no sliding, and makes precise control harder because the character moves at whatever speed the animator authored. Code-driven movement gives exact control and requires tuning the animation speed to match or accepting foot sliding. Neither is wrong. What is wrong is not deciding, because mixing them produces a character that fights itself."
    }
  ],
  keyConcepts: [
    { term: "Animator parameters", detail: "Floats, ints, bools, triggers. Code sets these; the graph decides what plays." },
    { term: "Blend tree", detail: "Weighted blend of clips driven by a parameter. Smooth the parameter, not the output." },
    { term: "Animator Layer + Avatar Mask", detail: "Independent state machines restricted to bone subsets. Upper body over locomotion." },
    { term: "Timeline", detail: "Authored multi-track sequences: cutscenes, scripted moments." },
    { term: "Root motion", detail: "Animation drives movement. Great planting, less control. Choose deliberately." },
    { term: "Animation Event", detail: "A callback fired at a point in a clip — footstep sounds, hit frames." }
  ],
  takeaways: [
    "Set parameters; do not call Play(). Let the graph decide.",
    "Use the damped SetFloat overload for blend tree parameters or movement will snap.",
    "Layers with avatar masks are how one character does two things at once.",
    "Timeline for authored sequences, Animator for reactive behaviour.",
    "Decide root motion versus code-driven movement early and stick to it."
  ],
  pitfalls: [
    "Trigger parameters that are set but never consumed, causing a transition to fire much later.",
    "Transition durations left at the default, producing floaty responsiveness on attacks.",
    "Building a cutscene out of Animator states instead of using Timeline."
  ]
}

]);
