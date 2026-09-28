/* Unity Learning Hub — resource dataset, part 1: Foundations & Editor
   Each entry carries an original, written-from-scratch explainer so the detail
   view is useful even before you open the linked resource. */
window.UNITY_RESOURCES = (window.UNITY_RESOURCES || []).concat([

{
  id: "unity-manual",
  title: "Unity User Manual (6.3 LTS)",
  author: "Unity Technologies",
  type: "doc",
  level: "all",
  duration: "Reference",
  cost: "Free",
  url: "https://docs.unity3d.com/Manual/",
  tags: ["editor", "reference", "official", "scripting", "graphics"],
  updated: "Tracks the current release",
  tldr: "The canonical reference. Every subsystem you will ever touch is documented here, versioned per release — always check the version selector in the top-right before trusting a page.",
  diagrams: ["gameobject-component", "project-anatomy"],
  prerequisites: [],
  summary: [
    {
      heading: "What this actually is",
      body: "The Manual is prose documentation organised by subsystem — rendering, physics, animation, input, UI, build settings, package management. It is deliberately separate from the Scripting API reference, which documents individual classes and methods. In practice you bounce between the two constantly: the Manual explains why a system is shaped the way it is, the Scripting API tells you the exact signature of the method you need. A habit worth forming early is reading the Manual page for a subsystem once, end to end, before you start using it. It takes twenty minutes and saves you from the class of bug where the code compiles and runs but the system was never designed to be used the way you are using it."
    },
    {
      heading: "The version selector is not optional",
      body: "Unity's docs are published per minor version and the URL carries the version. A search engine will happily hand you the 2019.4 page for a Unity 6 API that has since changed its default behaviour. Unity 6 is the current family: 6.3 is the LTS (supported into December 2027), 6.6 is the newest Supported Update release. If a page looks subtly wrong — a checkbox that isn't in your Inspector, a namespace that doesn't resolve — check the version dropdown first. Package documentation is versioned separately again, on its own site, because packages ship on their own cadence independent of the editor."
    },
    {
      heading: "The pages that repay early reading",
      body: "Four sections carry disproportionate weight for a beginner. 'GameObjects and Components' explains the composition model that the entire engine rests on. 'Order of execution for event functions' is the single most useful page in the Manual — it is the authoritative lifecycle diagram, and most 'why did my null reference happen in Awake' questions are answered by it. 'Asset Workflow' explains the .meta file system and why you must never move assets outside the editor. 'Build Settings' and the platform-specific pages explain what actually gets shipped, which is where half of all first-time release problems originate."
    },
    {
      heading: "How it relates to everything else on this site",
      body: "Treat the Manual as the authority and community tutorials as the teaching. A video shows you a working path through a system in forty minutes; the Manual tells you the whole surface area of that system including the parts the video skipped. When a tutorial and the Manual disagree, the Manual is right and the tutorial is probably older than the API change. This is especially true post-Unity 6, where the render pipelines, input handling, and UI all have a modern path and a legacy path that look superficially similar in tutorials."
    }
  ],
  keyConcepts: [
    { term: "Manual vs Scripting API", detail: "Manual = conceptual prose per subsystem. Scripting API = per-class/method reference. You need both open." },
    { term: "Version selector", detail: "Docs are per-release. Wrong version is the most common source of 'the docs lied to me'." },
    { term: "Package docs", detail: "Packages (Input System, URP, Cinemachine, Netcode) version independently and document on separate sites." },
    { term: "LTS vs Supported Update", detail: "6.3 LTS = two years of support, for shipping. 6.x Supported Updates = newer features, shorter window." }
  ],
  takeaways: [
    "Bookmark the 'Order of execution for event functions' page — you will return to it for years.",
    "Check the version dropdown before believing any Unity doc page you arrived at via search.",
    "Package documentation lives on its own site with its own version; the Manual only links out to it.",
    "Read a subsystem's Manual overview once before writing code against it."
  ],
  pitfalls: [
    "Landing on a 2019/2020 doc page from search and following a workflow that has since been replaced.",
    "Assuming the Scripting API's code sample is production-shaped — many are minimal illustrations, not patterns."
  ]
},

{
  id: "unity-essentials",
  title: "Unity Essentials Pathway",
  author: "Unity Learn",
  type: "course",
  level: "beginner",
  duration: "8–10 hours (2 weeks suggested)",
  cost: "Free",
  url: "https://learn.unity.com/pathway/unity-essentials",
  tags: ["editor", "beginner", "official", "scripting", "physics", "prefabs"],
  updated: "Maintained for Unity 6",
  tldr: "The official zero-prerequisite starting point. Teaches editor navigation, GameObjects, prefabs, basic C#, physics and building a project by designing rooms of a house.",
  diagrams: ["editor-layout", "gameobject-component", "prefab-workflow"],
  prerequisites: [],
  summary: [
    {
      heading: "Why start here rather than a YouTube series",
      body: "Almost every learning path that works starts with a structured tour of the editor rather than a game. The reason is that Unity's difficulty for beginners is rarely the code — it is not knowing where things live. Which window shows the thing you are looking for, what the difference is between the Hierarchy and the Project window, why dragging an object into the Project folder changed its icon. Essentials front-loads that spatial knowledge. It is built around designing rooms of a house rather than a game, which sounds like a detour but removes game-design decisions from the learning surface so you are only learning one thing at a time."
    },
    {
      heading: "The mental model it installs",
      body: "The single most important idea transferred by this pathway is the composition model: a GameObject is an empty container with a Transform, and everything it can do comes from Components attached to it. A cube that falls is a GameObject with a MeshRenderer (it is visible), a BoxCollider (it has shape for physics), and a Rigidbody (it is simulated). Remove the Rigidbody and it becomes static geometry. Remove the Collider and things pass through it. Once this clicks, the entire Inspector stops being a mysterious wall of settings and becomes a readable list of capabilities. The pathway also introduces prefabs early, which is the right call — prefabs are how you stop duplicating work, and beginners who skip them end up hand-editing forty copies of the same enemy."
    },
    {
      heading: "What is covered, concretely",
      body: "Installing via Unity Hub and understanding why the Hub exists (multiple editor versions coexisting per project). Scene view navigation in both 2D and 3D, including the pivot/center and local/global toggles that confuse everyone once. Creating and transforming GameObjects. Materials and the basics of how an object gets its appearance. Prefabs and prefab variants. Reading and writing simple C# that touches the Unity API. Common logic structures inside a MonoBehaviour. Basic physics: colliders, rigidbodies, triggers. Cameras and how a camera decides what the player sees. 3D audio in a scene. The Sprite Editor for slicing sprite sheets. And finally, configuring a build — which is where a surprising number of self-taught developers have a gap."
    },
    {
      heading: "How to actually get value from it",
      body: "The in-editor tutorial mode is worth using: it runs the instructions inside Unity itself so you are not alt-tabbing between a browser and the editor, which is where beginners lose their place. Resist the urge to speed through — the value is in the muscle memory of the editor, and that only forms by repetition. When you finish a unit, close the tutorial project and rebuild a small piece of it from memory in an empty project. That five-minute exercise converts recognition into recall, which is the difference between 'I watched a tutorial' and 'I can use Unity'. Completion earns a Credly badge, which is worth roughly what any completion badge is worth — the value here is the structure, not the credential."
    }
  ],
  keyConcepts: [
    { term: "Unity Hub", detail: "Manages editor installs and projects. Multiple editor versions coexist; each project is pinned to one." },
    { term: "GameObject + Component", detail: "GameObjects are containers; Components supply behaviour. Composition, not inheritance." },
    { term: "Prefab", detail: "A saved GameObject template. Edit the prefab, every instance updates. Variants allow controlled divergence." },
    { term: "Scene", detail: "A container of GameObjects — often a level, a menu, or a loading screen." },
    { term: "Trigger vs Collider", detail: "A collider blocks; a trigger detects without blocking. Same component, one checkbox apart." }
  ],
  takeaways: [
    "Editor fluency is the real prerequisite for everything else — invest the hours here.",
    "Composition (components) rather than deep inheritance is the Unity way; internalise it now.",
    "Use prefabs from day one; retrofitting them into a project built on duplicates is painful.",
    "Do a build at the end of the pathway even if the project is trivial — knowing the build pipeline early prevents panic later."
  ],
  pitfalls: [
    "Rushing the editor units to get to 'the coding part' — the editor gaps then haunt every later tutorial.",
    "Moving or renaming asset files outside Unity, which orphans the .meta file and breaks every reference."
  ]
},

{
  id: "roll-a-ball",
  title: "Roll-a-Ball",
  author: "Unity Learn",
  type: "course",
  level: "beginner",
  duration: "~2.5 hours",
  cost: "Free",
  url: "https://learn.unity.com/project/roll-a-ball",
  tags: ["beginner", "official", "physics", "scripting", "ui"],
  updated: "Maintained for Unity 6",
  tldr: "The classic first Unity project: a ball you steer with physics, pickups that spin and disappear, a score counter and a win condition. Small enough to finish, complete enough to be a real game loop.",
  diagrams: ["monobehaviour-lifecycle", "physics-decision", "collision-matrix"],
  prerequisites: ["unity-essentials"],
  summary: [
    {
      heading: "Why this specific toy project endures",
      body: "Roll-a-Ball has been the canonical first Unity project for over a decade because it contains, in miniature, the complete shape of a game: input drives a character, the character interacts with the world through physics, interactions change state, state drives UI, and reaching a state ends the game. Nothing in it is throwaway — the same five stages appear in a commercial title, just with more layers. Finishing it in one sitting also matters psychologically. A beginner who completes a small whole thing learns more than one who abandons an ambitious thing at 30%."
    },
    {
      heading: "The physics lesson hidden inside it",
      body: "The single most transferable idea in Roll-a-Ball is where you apply force and when. The player script reads input every frame in Update, but applies force to the Rigidbody in FixedUpdate. This is not arbitrary. Unity runs physics on a fixed timestep (0.02s by default) that is decoupled from the render framerate, so physics forces applied in Update get applied an inconsistent number of times per simulation step — the ball then moves at different speeds on different machines. Reading input in Update and acting in FixedUpdate is the correct pattern and it generalises to every physics-driven character you will ever write. The tutorial also teaches AddForce over directly setting transform.position, which is the difference between a body the physics engine can reason about and one that teleports through walls."
    },
    {
      heading: "Triggers, collisions and the layer matrix",
      body: "Pickups in Roll-a-Ball use trigger colliders: the ball passes through them and OnTriggerEnter fires, rather than bouncing off them. This introduces the collider/trigger distinction, which is one checkbox in the Inspector and a completely different callback path in code. It also introduces the rule that trips up everyone at least once: for collision or trigger callbacks to fire at all, at least one of the two objects must have a Rigidbody. Two static colliders touching produce nothing. The tutorial's pickups also use tags to identify what was hit, which is the beginner-appropriate approach; as projects grow, most developers migrate to interfaces or component lookups instead of string tags, but tags are fine here and understanding them matters because you will meet them in every tutorial."
    },
    {
      heading: "UI and the count-to-win loop",
      body: "The last stage wires a score counter and a win message. This is where the tutorial introduces the idea of a script holding state that the UI reads, rather than the UI holding state. It is a small thing but it is the seed of every larger architecture question — who owns the truth, and who merely displays it. The win condition (count equals total pickups) is deliberately naive; noticing that it is naive, and wondering what happens if a pickup is destroyed some other way, is exactly the instinct that turns a tutorial follower into a developer."
    }
  ],
  keyConcepts: [
    { term: "Rigidbody", detail: "Hands an object to the physics engine. Without it, colliders are static geometry." },
    { term: "FixedUpdate", detail: "Runs on the physics timestep, not the frame rate. All force application belongs here." },
    { term: "AddForce vs transform", detail: "AddForce respects the simulation; setting transform.position teleports and breaks collision response." },
    { term: "OnTriggerEnter", detail: "Fires when a collider enters a trigger. Requires a Rigidbody on at least one participant." },
    { term: "Tags", detail: "Cheap string identity for GameObjects. Fine for tutorials; interfaces scale better." }
  ],
  takeaways: [
    "Read input in Update, apply physics in FixedUpdate — this pattern never stops being correct.",
    "At least one participant in a collision or trigger pair needs a Rigidbody, or nothing fires.",
    "Finish it in one session. The completeness is the lesson.",
    "The naive win condition is a feature — notice it and you have started thinking like a developer."
  ],
  pitfalls: [
    "Calling AddForce in Update, producing framerate-dependent movement that feels fine on your machine and wrong on others.",
    "Forgetting Is Trigger on pickups and wondering why the ball bounces off them.",
    "Using GetComponent inside Update every frame instead of caching it in Awake."
  ]
},

{
  id: "microgames",
  title: "Unity Microgames (2D Platformer, Karting, FPS)",
  author: "Unity Learn",
  type: "interactive",
  level: "beginner",
  duration: "1–3 hours each",
  cost: "Free",
  url: "https://learn.unity.com/project/2d-platformer-template",
  tags: ["beginner", "official", "2d", "3d", "templates"],
  updated: "Available via Unity Hub templates",
  tldr: "Pre-built playable games with guided in-editor 'mods'. You start with something that already works and change it, which is the fastest route to feeling capable.",
  diagrams: ["prefab-workflow", "project-anatomy"],
  prerequisites: [],
  summary: [
    {
      heading: "Learning by modification rather than construction",
      body: "Microgames invert the usual tutorial structure. Instead of building a game from an empty scene, you open a finished, playable game and make guided changes to it — swap the character sprite, change jump height, add a new obstacle type. Pedagogically this is strong for two reasons. First, the feedback loop is immediate and the thing is always playable, which sustains motivation. Second, it teaches reading an existing codebase, which is what you will actually spend most of your career doing. Building from scratch teaches syntax; modifying teaches navigation."
    },
    {
      heading: "What each one is good for",
      body: "The 2D Platformer microgame is the best starting point if you are unsure what you want to make — 2D removes an entire axis of spatial confusion and platformer mechanics are legible. The Karting microgame is the most fun to modify and teaches vehicle physics and track design, though the underlying vehicle controller is more complex than a beginner should try to fully understand. The FPS microgame demonstrates a surprisingly complete 3D game architecture including weapons, enemies and health, and is worth opening simply to read how a non-trivial project is organised even if you never ship it."
    },
    {
      heading: "The trap to avoid",
      body: "Microgames are scaffolding, not foundations. Because the project already works, it is easy to make twenty guided mods and feel fluent while still being unable to start an empty project. The correct use is as a confidence-builder and a reading exercise alongside a structured pathway, not instead of one. A good discipline: after each mod, open the script you changed and read the whole file, not just the line you edited. Ask what every other method in it is for. That converts a mod into a lesson."
    }
  ],
  keyConcepts: [
    { term: "Template project", detail: "A pre-built project available from Unity Hub's New Project screen." },
    { term: "Guided mods", detail: "In-editor tutorial steps that walk you through a specific change." },
    { term: "Reading over writing", detail: "The real skill being trained is navigating an unfamiliar project." }
  ],
  takeaways: [
    "Great for momentum and for learning to read an existing project.",
    "Pair with a structured pathway — mods alone do not teach you to start from empty.",
    "Read the entire script you modify, not just the line the tutorial pointed at."
  ],
  pitfalls: [
    "Mistaking 'I completed the mods' for 'I can build this from scratch'.",
    "Trying to fully understand the karting vehicle physics too early and concluding you are bad at this."
  ]
},

{
  id: "cs-fundamentals",
  title: "C# for Unity: the subset that actually matters",
  author: "Unity Learning Hub (synthesis)",
  type: "article",
  level: "beginner",
  duration: "Reference",
  cost: "Free",
  url: "https://learn.unity.com/pathway/junior-programmer",
  tags: ["scripting", "csharp", "beginner", "fundamentals"],
  updated: "Evergreen",
  tldr: "Unity uses a constrained slice of C#. Knowing which parts matter — and which advanced features to ignore for now — saves months.",
  diagrams: ["monobehaviour-lifecycle", "serialization-flow"],
  prerequisites: [],
  summary: [
    {
      heading: "Unity is C#-only, and that is simpler than it sounds",
      body: "Unlike Unreal (Blueprints) or Godot (GDScript plus C#), Unity gives you exactly one scripting language for gameplay. That sounds restrictive but is actually a relief: there is one answer to 'how do I do this'. The subset of C# that Unity gameplay code uses is also narrower than general .NET development. You need variables, methods, conditionals, loops, classes, inheritance, interfaces, events and collections. You can defer LINQ, async/await, generics beyond basic usage, reflection and most of the type system's advanced corners until you have shipped something."
    },
    {
      heading: "Access modifiers are an editor feature, not just a code feature",
      body: "In ordinary C#, public versus private is about encapsulation. In Unity it is also about the Inspector: public fields show up as editable slots in the Inspector by default, private fields do not. This leads beginners to make everything public just to tune it in the editor, which destroys encapsulation. The correct answer is [SerializeField] private float speed; — private to code, visible and editable in the Inspector. Conversely [HideInInspector] public hides a public field. Understanding that serialization and access control are separate concerns that Unity happens to bundle is one of the genuinely non-obvious things about the engine."
    },
    {
      heading: "What Unity serializes, and what it silently does not",
      body: "Unity's serializer is what saves your scene and populates the Inspector, and it has rules that surprise people. It serializes public fields and [SerializeField] private fields of supported types: primitives, strings, enums, Unity object references, arrays and Lists of those, and classes marked [System.Serializable]. It does not serialize properties, static fields, readonly fields, Dictionaries, interfaces, or null-vs-default distinctions for structs. The consequence: a Dictionary populated in code will be empty after a domain reload, and a value you set in the Inspector overrides whatever your field initialiser said. That last one causes a classic confusion — you change the default in code, nothing happens, because the scene has a serialized value already."
    },
    {
      heading: "Coroutines: the one Unity-specific concept",
      body: "Coroutines are the piece of Unity C# with no real equivalent in ordinary application programming. A coroutine is a method returning IEnumerator that can pause itself with yield return and resume on a later frame. They exist because games are frame-based and you frequently need logic that spans time — fade this over two seconds, wait then spawn, poll until a condition. Without coroutines you would write state machines with timers by hand for all of it. The key mental model: a coroutine is not a thread. It runs on the main thread, cooperatively, at a defined point in the frame loop. It stops if the GameObject is disabled or destroyed, which is both a footgun and a useful lifetime guarantee."
    },
    {
      heading: "Events and the coupling problem",
      body: "The most common architectural mistake in intermediate Unity projects is everything holding a direct reference to everything else — the player script referencing the UI script referencing the audio manager. C# events (and UnityEvents in the Inspector) break this. The player raises OnHealthChanged; the health bar, the screen-shake and the audio all subscribe. None of them know about each other. This is the single highest-leverage architectural idea for a solo developer, and it is worth learning before your project gets big enough to need it. The discipline it requires is unsubscribing in OnDisable — a subscriber that is destroyed while still subscribed is a classic leak and a source of null reference exceptions."
    }
  ],
  keyConcepts: [
    { term: "[SerializeField]", detail: "Expose a private field to the Inspector without making it public. The correct default." },
    { term: "Serialization rules", detail: "No properties, no Dictionaries, no statics. Inspector values override field initialisers." },
    { term: "Coroutine", detail: "IEnumerator method that yields across frames. Main-thread, cooperative, dies with its GameObject." },
    { term: "C# event", detail: "Publisher raises, subscribers listen. Breaks direct references between systems." },
    { term: "OnDisable unsubscribe", detail: "Always unsubscribe where you subscribed, or you leak and crash." }
  ],
  takeaways: [
    "Use [SerializeField] private rather than public for anything you only want to tune in the editor.",
    "Inspector-serialized values beat your code's default values — change them in the Inspector, not the field initialiser.",
    "A coroutine is not a thread; it is cooperative and tied to its GameObject's lifetime.",
    "Learn events before your project needs them — retrofitting decoupling is far harder than starting with it."
  ],
  pitfalls: [
    "Making fields public purely for Inspector access.",
    "Expecting a Dictionary to survive a play-mode reload or show in the Inspector.",
    "Subscribing in OnEnable and forgetting to unsubscribe in OnDisable."
  ]
},

{
  id: "gmtk-2d",
  title: "Game Maker's Toolkit — build a game in under an hour",
  author: "Mark Brown (GMTK)",
  type: "video",
  level: "beginner",
  duration: "<1 hour",
  cost: "Free",
  url: "https://www.youtube.com/@GMTK",
  tags: ["2d", "beginner", "video", "game-design"],
  updated: "Evergreen",
  tldr: "The fastest honest path from 'never opened Unity' to 'a thing I made runs'. Design-literate framing from a critic who became a shipping developer.",
  diagrams: ["monobehaviour-lifecycle"],
  prerequisites: [],
  summary: [
    {
      heading: "Why a short tutorial beats a long one first",
      body: "Ten-hour courses are excellent and you should do one. But the first thing a beginner needs is not depth, it is proof that the loop closes — that you can go from empty project to running game in an evening. A sub-hour 2D tutorial does that. The compression forces the instructor to show only the load-bearing steps, which also means you see the skeleton of a Unity project without the decoration. You will not understand everything. That is correct and expected; you are building a scaffold to hang later understanding on."
    },
    {
      heading: "The design perspective is the differentiator",
      body: "GMTK's background is game design criticism, and it shows in what gets emphasised. Most technical tutorials teach you to make a character move; this framing asks what the movement should feel like and why, then implements that. Concepts like coyote time, jump buffering and input forgiveness — the small mercies that make a platformer feel good rather than merely function — come from this school of thinking. Learning the technical and the design layer together, early, avoids the common outcome of a developer who can implement anything and cannot tell what is worth implementing."
    },
    {
      heading: "Where to go immediately after",
      body: "A sub-hour tutorial leaves real gaps: project organisation, version control, the physics timestep subtleties, and anything about shipping. The right sequence is to do this for momentum, then a structured pathway for coverage, then a long project-based course for depth. Do not stack five short tutorials — you end up with five half-understood copies of the same beginner material and no architecture."
    }
  ],
  keyConcepts: [
    { term: "Game feel", detail: "How input maps to sensation. Distinct from, and often more important than, mechanics on paper." },
    { term: "Coyote time", detail: "A short grace window after leaving a ledge during which a jump still registers." },
    { term: "Input buffering", detail: "Accepting an input slightly before it is actionable and firing it when it becomes valid." }
  ],
  takeaways: [
    "Do one short tutorial first for proof that the loop closes, then go deep.",
    "Learn design vocabulary alongside implementation — it changes what you choose to build.",
    "Don't stack multiple beginner tutorials; move to a structured path after the first."
  ],
  pitfalls: [
    "Concluding you 'know Unity' after a one-hour build.",
    "Tutorial-hopping between short videos instead of committing to one long project."
  ]
}

]);
