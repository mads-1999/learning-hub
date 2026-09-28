/* Unity Learning Hub — curated learning paths. */
window.UNITY_PATHS = [
  {
    id: "zero-to-first-game",
    name: "Zero to your first finished game",
    weeks: "6–10 weeks",
    blurb: "For someone who has never opened Unity. Ends with a small complete game you built and can explain.",
    steps: [
      { id: "gmtk-2d", note: "Do this first, in one evening. Proof that the loop closes." },
      { id: "unity-essentials", note: "The editor fluency everything else depends on. Don't rush it." },
      { id: "cs-fundamentals", note: "Read alongside — especially serialization and [SerializeField]." },
      { id: "roll-a-ball", note: "Your first complete game loop. Finish it in one session." },
      { id: "microgames", note: "Optional. Good for momentum and for learning to read a project." },
      { id: "unity-manual", note: "Start the habit: read the Manual page before using a system." }
    ]
  },
  {
    id: "beginner-to-intermediate",
    name: "Beginner to intermediate",
    weeks: "3–4 months",
    blurb: "The stall point for most self-taught developers. This path is about architecture — the thing that decides whether your project survives past hour thirty.",
    steps: [
      { id: "kitchen-chaos", note: "The core of this path. Architecture is the real subject." },
      { id: "physics-deep", note: "Read when physics starts misbehaving — which it will." },
      { id: "input-system", note: "Migrate off the legacy input system before your project gets big." },
      { id: "animation-system", note: "Animator as state machine; decide root motion early." },
      { id: "ui-toolkit", note: "Pick your UI system deliberately rather than by tutorial accident." },
      { id: "tarodev-patterns", note: "Watch when your own project starts feeling unmaintainable." },
      { id: "gamedevtv-3d", note: "Optional. Take this instead if your real gap is C# rather than Unity." }
    ]
  },
  {
    id: "graphics-track",
    name: "Technical art and graphics",
    weeks: "4–6 months",
    blurb: "For people who want to control how the game looks at the pixel level. Demands comfort with vector maths.",
    steps: [
      { id: "render-pipelines", note: "Settle the pipeline question before anything else." },
      { id: "catlike-basics", note: "The maths and performance foundation. Written, slow, high retention." },
      { id: "shader-stages-ref", ref: "catlike-rendering", note: "Vertex/fragment structure explains almost everything downstream." },
      { id: "catlike-rendering", note: "Do the Custom SRP series rather than the old Rendering one if you are on URP." },
      { id: "sebastian-lague", note: "For technique and problem decomposition, not copyable code." },
      { id: "performance-profiling", note: "GPU-bound problems need different fixes from CPU-bound ones." }
    ]
  },
  {
    id: "ship-it",
    name: "Finish and ship it",
    weeks: "Alongside the last third of a project",
    blurb: "The phase almost no tutorial covers, and the one where projects die two weeks from release.",
    steps: [
      { id: "performance-profiling", note: "Measure on the weakest target device, in a build, for long enough to get hot." },
      { id: "build-ship", note: "Build on your target platform from week one, not week fifty." },
      { id: "unity-manual", note: "Platform pages — each target has requirements no general tutorial covers." },
      { id: "multiplayer-netcode", note: "Only if you are shipping multiplayer. It roughly triples the work." }
    ]
  }
];
