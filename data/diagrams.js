/* Unity Learning Hub — original SVG diagrams.
   All colours come from CSS custom properties so both themes work.
   Each diagram: { title, caption, svg } keyed by id. */
window.UNITY_DIAGRAMS = {

"monobehaviour-lifecycle": {
  title: "MonoBehaviour execution order",
  caption: "The order Unity calls your methods in. Note that the physics block can run zero or many times per rendered frame — that is the single most consequential fact on this diagram.",
  svg: `<svg viewBox="0 0 780 430" role="img" aria-label="MonoBehaviour lifecycle flow chart">
<defs><marker id="mbl-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Initialisation — once</text>
<rect x="16" y="34" width="150" height="42" rx="7" class="d-box d-accent"/><text x="91" y="53" class="d-t d-ctr">Awake()</text><text x="91" y="68" class="d-tm d-ctr">object created</text>
<rect x="196" y="34" width="150" height="42" rx="7" class="d-box d-accent"/><text x="271" y="53" class="d-t d-ctr">OnEnable()</text><text x="271" y="68" class="d-tm d-ctr">each time enabled</text>
<rect x="376" y="34" width="150" height="42" rx="7" class="d-box d-accent"/><text x="451" y="53" class="d-t d-ctr">Start()</text><text x="451" y="68" class="d-tm d-ctr">before first Update</text>
<path d="M166 55 H194" class="d-line" marker-end="url(#mbl-a)"/>
<path d="M346 55 H374" class="d-line" marker-end="url(#mbl-a)"/>
<path d="M451 76 V96 H60 V120" class="d-line" marker-end="url(#mbl-a)"/>

<rect x="16" y="120" width="330" height="162" rx="9" class="d-panel"/>
<text x="32" y="142" class="d-h">Physics loop — 0..n times per frame</text>
<text x="32" y="159" class="d-tm">runs until simulated time catches up to real time</text>
<rect x="32" y="170" width="140" height="36" rx="6" class="d-box d-warn"/><text x="102" y="192" class="d-t d-ctr">FixedUpdate()</text>
<rect x="196" y="170" width="134" height="36" rx="6" class="d-box"/><text x="263" y="192" class="d-t d-ctr">physics step</text>
<rect x="32" y="218" width="298" height="34" rx="6" class="d-box"/><text x="181" y="239" class="d-t d-ctr">OnTriggerEnter / OnCollisionEnter / Stay / Exit</text>
<path d="M172 188 H194" class="d-line" marker-end="url(#mbl-a)"/>
<path d="M263 206 V216" class="d-line" marker-end="url(#mbl-a)"/>
<path d="M330 188 H338 V268 H42 V210" class="d-line d-dash" marker-end="url(#mbl-a)"/>
<text x="240" y="264" class="d-tm">repeat</text>

<rect x="396" y="120" width="368" height="162" rx="9" class="d-panel"/>
<text x="412" y="142" class="d-h">Frame loop — exactly once per rendered frame</text>
<rect x="412" y="156" width="150" height="36" rx="6" class="d-box d-accent2"/><text x="487" y="178" class="d-t d-ctr">Update()</text>
<rect x="592" y="156" width="156" height="36" rx="6" class="d-box d-accent2"/><text x="670" y="178" class="d-t d-ctr">LateUpdate()</text>
<path d="M562 174 H590" class="d-line" marker-end="url(#mbl-a)"/>
<text x="412" y="212" class="d-tm">input, timers, game logic</text>
<text x="592" y="212" class="d-tm">camera follow, IK</text>
<rect x="412" y="228" width="336" height="34" rx="6" class="d-box"/><text x="580" y="250" class="d-t d-ctr">rendering: culling → draw → post-processing</text>
<path d="M346 195 H394" class="d-line" marker-end="url(#mbl-a)"/>

<path d="M580 282 V298 H60 V312" class="d-line d-dash" marker-end="url(#mbl-a)"/>
<text x="300" y="294" class="d-tm">next frame</text>

<text x="16" y="342" class="d-h">Teardown</text>
<rect x="16" y="352" width="150" height="40" rx="7" class="d-box"/><text x="91" y="377" class="d-t d-ctr">OnDisable()</text>
<rect x="196" y="352" width="150" height="40" rx="7" class="d-box"/><text x="271" y="377" class="d-t d-ctr">OnDestroy()</text>
<path d="M166 372 H194" class="d-line" marker-end="url(#mbl-a)"/>
<rect x="376" y="352" width="388" height="40" rx="7" class="d-box d-warn"/>
<text x="570" y="370" class="d-t d-ctr">Rule: read input in Update, apply forces in FixedUpdate.</text>
<text x="570" y="385" class="d-tm d-ctr">GetKeyDown inside FixedUpdate can miss presses entirely.</text>
<text x="16" y="420" class="d-tm">Awake runs on all objects before any Start runs — that is why cross-object references belong in Start, not Awake.</text>
</svg>`
},

"fixed-timestep": {
  title: "Why FixedUpdate is not once per frame",
  caption: "Unity accumulates elapsed real time and runs whole physics steps to catch up. A fast frame may run none; a slow frame runs several.",
  svg: `<svg viewBox="0 0 780 260" role="img" aria-label="Fixed timestep accumulator timeline">
<defs><marker id="fts-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Real time →</text>
<line x1="16" y1="44" x2="764" y2="44" class="d-line" marker-end="url(#fts-a)"/>
<text x="16" y="78" class="d-h">Rendered frames (Update)</text>
<rect x="16" y="88" width="120" height="30" rx="5" class="d-box d-accent2"/><text x="76" y="108" class="d-t d-ctr">frame 1 · 8ms</text>
<rect x="142" y="88" width="230" height="30" rx="5" class="d-box d-accent2"/><text x="257" y="108" class="d-t d-ctr">frame 2 · 42ms (hitch)</text>
<rect x="378" y="88" width="110" height="30" rx="5" class="d-box d-accent2"/><text x="433" y="108" class="d-t d-ctr">frame 3 · 9ms</text>
<rect x="494" y="88" width="150" height="30" rx="5" class="d-box d-accent2"/><text x="569" y="108" class="d-t d-ctr">frame 4 · 22ms</text>
<rect x="650" y="88" width="114" height="30" rx="5" class="d-box d-accent2"/><text x="707" y="108" class="d-t d-ctr">frame 5 · 10ms</text>

<text x="16" y="152" class="d-h">Physics steps (FixedUpdate, 20ms each)</text>
<rect x="16" y="162" width="52" height="30" rx="5" class="d-box d-warn"/><text x="42" y="182" class="d-t d-ctr">×0</text>
<rect x="142" y="162" width="70" height="30" rx="5" class="d-box d-warn"/><text x="177" y="182" class="d-t d-ctr">step</text>
<rect x="216" y="162" width="70" height="30" rx="5" class="d-box d-warn"/><text x="251" y="182" class="d-t d-ctr">step</text>
<rect x="290" y="162" width="70" height="30" rx="5" class="d-box d-warn"/><text x="325" y="182" class="d-t d-ctr">step</text>
<rect x="378" y="162" width="52" height="30" rx="5" class="d-box d-warn"/><text x="404" y="182" class="d-t d-ctr">×0</text>
<rect x="494" y="162" width="70" height="30" rx="5" class="d-box d-warn"/><text x="529" y="182" class="d-t d-ctr">step</text>
<rect x="650" y="162" width="70" height="30" rx="5" class="d-box d-warn"/><text x="685" y="182" class="d-t d-ctr">step</text>

<rect x="16" y="210" width="748" height="38" rx="7" class="d-panel"/>
<text x="32" y="228" class="d-t">Consequence: force applied in Update lands an unpredictable number of times per simulated step.</text>
<text x="32" y="243" class="d-tm">Same code, different framerate, different movement speed. This is the bug that only appears on someone else's machine.</text>
</svg>`
},

"gameobject-component": {
  title: "GameObject + Component composition",
  caption: "A GameObject is a near-empty container. Every capability is a Component you attach. Remove one and that capability disappears — nothing else breaks.",
  svg: `<svg viewBox="0 0 780 330" role="img" aria-label="GameObject component composition">
<defs><marker id="gc-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="28" width="230" height="270" rx="10" class="d-panel"/>
<text x="131" y="52" class="d-h d-ctr">GameObject "Enemy"</text>
<rect x="32" y="64" width="198" height="34" rx="6" class="d-box d-accent"/><text x="131" y="86" class="d-t d-ctr">Transform (always present)</text>
<rect x="32" y="106" width="198" height="34" rx="6" class="d-box"/><text x="131" y="128" class="d-t d-ctr">MeshRenderer</text>
<rect x="32" y="148" width="198" height="34" rx="6" class="d-box"/><text x="131" y="170" class="d-t d-ctr">CapsuleCollider</text>
<rect x="32" y="190" width="198" height="34" rx="6" class="d-box"/><text x="131" y="212" class="d-t d-ctr">Rigidbody</text>
<rect x="32" y="232" width="198" height="34" rx="6" class="d-box d-accent2"/><text x="131" y="254" class="d-t d-ctr">EnemyHealth (your script)</text>
<text x="131" y="286" class="d-tm d-ctr">position in the Hierarchy</text>

<text x="290" y="52" class="d-h">What each one contributes</text>
<path d="M246 81 H286" class="d-line" marker-end="url(#gc-a)"/>
<text x="292" y="86" class="d-tm">position, rotation, scale, parenting</text>
<path d="M246 123 H286" class="d-line" marker-end="url(#gc-a)"/>
<text x="292" y="128" class="d-tm">it is visible — remove and it still exists, unseen</text>
<path d="M246 165 H286" class="d-line" marker-end="url(#gc-a)"/>
<text x="292" y="170" class="d-tm">it has shape — remove and things pass through</text>
<path d="M246 207 H286" class="d-line" marker-end="url(#gc-a)"/>
<text x="292" y="212" class="d-tm">it is simulated — remove and it becomes static</text>
<path d="M246 249 H286" class="d-line" marker-end="url(#gc-a)"/>
<text x="292" y="254" class="d-tm">it has behaviour — your logic, via MonoBehaviour</text>

<rect x="290" y="272" width="474" height="42" rx="7" class="d-box d-warn"/>
<text x="304" y="290" class="d-t">Composition, not inheritance.</text>
<text x="304" y="305" class="d-tm">A flying enemy is not a subclass — it is the same object with a different movement component.</text>
</svg>`
},

"collision-matrix": {
  title: "Which collisions actually fire callbacks",
  caption: "The rule that saves hours: at least one participant needs a Rigidbody. Two static colliders touching produce nothing at all.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Collision interaction matrix">
<text x="16" y="24" class="d-h">Do collision / trigger callbacks fire?</text>
<rect x="200" y="38" width="180" height="32" rx="5" class="d-box d-accent"/><text x="290" y="59" class="d-t d-ctr">Static collider</text>
<rect x="386" y="38" width="180" height="32" rx="5" class="d-box d-accent"/><text x="476" y="59" class="d-t d-ctr">Rigidbody</text>
<rect x="572" y="38" width="192" height="32" rx="5" class="d-box d-accent"/><text x="668" y="59" class="d-t d-ctr">Kinematic Rigidbody</text>

<rect x="16" y="76" width="178" height="46" rx="5" class="d-box d-accent"/><text x="105" y="103" class="d-t d-ctr">Static collider</text>
<rect x="200" y="76" width="180" height="46" rx="5" class="d-box d-no"/><text x="290" y="97" class="d-t d-ctr">nothing</text><text x="290" y="112" class="d-tm d-ctr">no Rigidbody anywhere</text>
<rect x="386" y="76" width="180" height="46" rx="5" class="d-box d-yes"/><text x="476" y="103" class="d-t d-ctr">collision + trigger</text>
<rect x="572" y="76" width="192" height="46" rx="5" class="d-box d-part"/><text x="668" y="97" class="d-t d-ctr">trigger only</text><text x="668" y="112" class="d-tm d-ctr">no collision response</text>

<rect x="16" y="128" width="178" height="46" rx="5" class="d-box d-accent"/><text x="105" y="155" class="d-t d-ctr">Rigidbody</text>
<rect x="200" y="128" width="180" height="46" rx="5" class="d-box d-yes"/><text x="290" y="155" class="d-t d-ctr">collision + trigger</text>
<rect x="386" y="128" width="180" height="46" rx="5" class="d-box d-yes"/><text x="476" y="155" class="d-t d-ctr">collision + trigger</text>
<rect x="572" y="128" width="192" height="46" rx="5" class="d-box d-yes"/><text x="668" y="155" class="d-t d-ctr">collision + trigger</text>

<rect x="16" y="180" width="178" height="46" rx="5" class="d-box d-accent"/><text x="105" y="200" class="d-t d-ctr">Kinematic Rigidbody</text><text x="105" y="215" class="d-tm d-ctr">platforms, doors</text>
<rect x="200" y="180" width="180" height="46" rx="5" class="d-box d-part"/><text x="290" y="207" class="d-t d-ctr">trigger only</text>
<rect x="386" y="180" width="180" height="46" rx="5" class="d-box d-yes"/><text x="476" y="207" class="d-t d-ctr">collision + trigger</text>
<rect x="572" y="180" width="192" height="46" rx="5" class="d-box d-part"/><text x="668" y="207" class="d-t d-ctr">trigger only</text>

<rect x="16" y="240" width="748" height="64" rx="7" class="d-panel"/>
<text x="32" y="260" class="d-t">Reading it: "trigger only" means Is Trigger callbacks fire but the objects pass through each other.</text>
<text x="32" y="278" class="d-tm">A trigger zone built from two objects with no Rigidbody will never fire. Add a kinematic Rigidbody to the moving one.</text>
<text x="32" y="294" class="d-tm">The Layer Collision Matrix in Physics settings then filters which layer pairs are tested at all — set it up early.</text>
</svg>`
},

"physics-decision": {
  title: "Which body type do I need?",
  caption: "Most physics bugs are a body-type choice made by accident rather than on purpose.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Physics body type decision tree">
<defs><marker id="pd-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="290" y="16" width="200" height="40" rx="7" class="d-box d-accent"/><text x="390" y="41" class="d-t d-ctr">Does it ever move?</text>
<path d="M290 36 H190 V80" class="d-line" marker-end="url(#pd-a)"/><text x="214" y="30" class="d-tm">no</text>
<path d="M490 36 H600 V80" class="d-line" marker-end="url(#pd-a)"/><text x="540" y="30" class="d-tm">yes</text>

<rect x="90" y="84" width="200" height="54" rx="7" class="d-box d-yes"/><text x="190" y="106" class="d-t d-ctr">Static collider</text><text x="190" y="122" class="d-tm d-ctr">Collider, no Rigidbody</text>

<rect x="500" y="84" width="200" height="40" rx="7" class="d-box d-accent"/><text x="600" y="109" class="d-t d-ctr">Moved by forces?</text>
<path d="M500 104 H420 V152" class="d-line" marker-end="url(#pd-a)"/><text x="440" y="98" class="d-tm">no</text>
<path d="M700 104 H740 V152" class="d-line" marker-end="url(#pd-a)"/><text x="706" y="98" class="d-tm">yes</text>

<rect x="320" y="156" width="200" height="54" rx="7" class="d-box d-yes"/><text x="420" y="178" class="d-t d-ctr">Kinematic Rigidbody</text><text x="420" y="194" class="d-tm d-ctr">MovePosition / animation</text>
<rect x="560" y="156" width="204" height="54" rx="7" class="d-box d-yes"/><text x="662" y="178" class="d-t d-ctr">Dynamic Rigidbody</text><text x="662" y="194" class="d-tm d-ctr">AddForce in FixedUpdate</text>

<rect x="16" y="230" width="748" height="60" rx="7" class="d-panel"/>
<text x="32" y="250" class="d-t">Examples: walls and ground → static. Moving platform, sliding door, animated boss → kinematic.</text>
<text x="32" y="268" class="d-tm">Crates, ragdolls, thrown objects, a ball → dynamic. A player character is usually kinematic (CharacterController) or</text>
<text x="32" y="284" class="d-tm">dynamic with a frozen rotation constraint — pick one and never set transform.position on a dynamic body.</text>
</svg>`
},

"input-system-flow": {
  title: "Input System: device to gameplay",
  caption: "Your code never learns which device produced the action. That indirection is the whole point.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Input System data flow">
<defs><marker id="is-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="22" class="d-h">Devices</text>
<rect x="16" y="32" width="130" height="30" rx="5" class="d-box"/><text x="81" y="52" class="d-t d-ctr">Keyboard</text>
<rect x="16" y="68" width="130" height="30" rx="5" class="d-box"/><text x="81" y="88" class="d-t d-ctr">Gamepad</text>
<rect x="16" y="104" width="130" height="30" rx="5" class="d-box"/><text x="81" y="124" class="d-t d-ctr">Touchscreen</text>

<text x="186" y="22" class="d-h">Bindings</text>
<rect x="186" y="32" width="170" height="102" rx="7" class="d-panel"/>
<text x="271" y="54" class="d-tm d-ctr">W/A/S/D → 2D composite</text>
<text x="271" y="74" class="d-tm d-ctr">left stick → Vector2</text>
<text x="271" y="94" class="d-tm d-ctr">on-screen stick</text>
<text x="271" y="118" class="d-tm d-ctr">(control scheme per family)</text>
<path d="M146 47 H184" class="d-line" marker-end="url(#is-a)"/>
<path d="M146 83 H184" class="d-line" marker-end="url(#is-a)"/>
<path d="M146 119 H184" class="d-line" marker-end="url(#is-a)"/>

<text x="396" y="22" class="d-h">Action</text>
<rect x="396" y="32" width="170" height="102" rx="7" class="d-box d-accent"/>
<text x="481" y="70" class="d-t d-ctr">"Move"</text>
<text x="481" y="90" class="d-tm d-ctr">type: Value (Vector2)</text>
<text x="481" y="110" class="d-tm d-ctr">in map: Gameplay</text>
<path d="M356 83 H394" class="d-line" marker-end="url(#is-a)"/>

<text x="606" y="22" class="d-h">Your code</text>
<rect x="606" y="32" width="158" height="102" rx="7" class="d-box d-accent2"/>
<text x="685" y="66" class="d-tm d-ctr">ReadValue&lt;Vector2&gt;()</text>
<text x="685" y="86" class="d-tm d-ctr">or .performed +=</text>
<text x="685" y="110" class="d-tm d-ctr">device-agnostic</text>
<path d="M566 83 H604" class="d-line" marker-end="url(#is-a)"/>

<rect x="16" y="158" width="370" height="72" rx="7" class="d-panel"/>
<text x="32" y="178" class="d-h">Action Maps switch context</text>
<rect x="32" y="188" width="160" height="30" rx="5" class="d-box d-yes"/><text x="112" y="208" class="d-t d-ctr">Gameplay — enabled</text>
<rect x="206" y="188" width="164" height="30" rx="5" class="d-box d-no"/><text x="288" y="208" class="d-t d-ctr">UI — disabled</text>

<rect x="396" y="158" width="368" height="72" rx="7" class="d-box d-warn"/>
<text x="412" y="178" class="d-h">Check this first when input does nothing</text>
<text x="412" y="197" class="d-tm">Player Settings → Active Input Handling must be set to the</text>
<text x="412" y="213" class="d-tm">Input System Package. Installing the package does not switch it.</text>

<text x="16" y="256" class="d-tm">Discrete events (jump, fire, interact) → subscribe to .performed. Continuous values (move, aim) → poll ReadValue in Update.</text>
<text x="16" y="276" class="d-tm">Generate the C# wrapper class from the .inputactions asset so action names are compile-time checked instead of strings.</text>
</svg>`
},

"event-architecture": {
  title: "Direct references vs event-driven",
  caption: "The left side is where every unmanaged project ends up. The right side is one afternoon of refactoring away.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Coupling comparison diagram">
<defs><marker id="ea-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Direct references — every change ripples</text>
<rect x="16" y="36" width="360" height="200" rx="9" class="d-panel d-panel-bad"/>
<rect x="150" y="52" width="100" height="32" rx="5" class="d-box d-accent"/><text x="200" y="73" class="d-t d-ctr">Player</text>
<rect x="36" y="118" width="90" height="32" rx="5" class="d-box"/><text x="81" y="139" class="d-t d-ctr">HealthBar</text>
<rect x="156" y="118" width="90" height="32" rx="5" class="d-box"/><text x="201" y="139" class="d-t d-ctr">Audio</text>
<rect x="272" y="118" width="90" height="32" rx="5" class="d-box"/><text x="317" y="139" class="d-t d-ctr">Camera</text>
<rect x="96" y="186" width="90" height="32" rx="5" class="d-box"/><text x="141" y="207" class="d-t d-ctr">SaveSystem</text>
<rect x="216" y="186" width="90" height="32" rx="5" class="d-box"/><text x="261" y="207" class="d-t d-ctr">Achievements</text>
<path d="M180 84 L96 116" class="d-line" marker-end="url(#ea-a)"/>
<path d="M200 84 L201 116" class="d-line" marker-end="url(#ea-a)"/>
<path d="M222 84 L304 116" class="d-line" marker-end="url(#ea-a)"/>
<path d="M81 150 L130 184" class="d-line" marker-end="url(#ea-a)"/>
<path d="M201 150 L155 184" class="d-line" marker-end="url(#ea-a)"/>
<path d="M317 150 L272 184" class="d-line" marker-end="url(#ea-a)"/>
<path d="M126 134 H154" class="d-line" marker-end="url(#ea-a)"/>
<path d="M246 134 H270" class="d-line" marker-end="url(#ea-a)"/>
<text x="196" y="256" class="d-tm d-ctr">Player must know all five. Delete one → Player stops compiling.</text>

<text x="404" y="24" class="d-h">Event-driven — nobody knows anybody</text>
<rect x="404" y="36" width="360" height="200" rx="9" class="d-panel d-panel-good"/>
<rect x="534" y="52" width="100" height="32" rx="5" class="d-box d-accent"/><text x="584" y="73" class="d-t d-ctr">Player</text>
<rect x="474" y="110" width="220" height="34" rx="6" class="d-box d-accent2"/><text x="584" y="132" class="d-t d-ctr">event OnHealthChanged</text>
<path d="M584 84 V108" class="d-line" marker-end="url(#ea-a)"/>
<rect x="420" y="176" width="86" height="32" rx="5" class="d-box"/><text x="463" y="197" class="d-t d-ctr">HealthBar</text>
<rect x="514" y="176" width="86" height="32" rx="5" class="d-box"/><text x="557" y="197" class="d-t d-ctr">Audio</text>
<rect x="608" y="176" width="86" height="32" rx="5" class="d-box"/><text x="651" y="197" class="d-t d-ctr">Camera</text>
<path d="M520 144 L470 174" class="d-line d-dash" marker-end="url(#ea-a)"/>
<path d="M573 144 L560 174" class="d-line d-dash" marker-end="url(#ea-a)"/>
<path d="M640 144 L648 174" class="d-line d-dash" marker-end="url(#ea-a)"/>
<text x="584" y="228" class="d-tm d-ctr">subscribers, not dependencies</text>
<text x="584" y="256" class="d-tm d-ctr">Delete any subscriber → Player is unaffected.</text>

<rect x="16" y="272" width="748" height="38" rx="7" class="d-box d-warn"/>
<text x="32" y="290" class="d-t">The discipline that makes it work: subscribe in OnEnable, unsubscribe in OnDisable.</text>
<text x="32" y="305" class="d-tm">A destroyed object still subscribed is a leak and a null reference waiting for the next raise.</text>
</svg>`
},

"state-machine": {
  title: "Boolean soup vs an explicit state machine",
  caption: "Four booleans describe sixteen states, twelve of which are invalid. A state machine cannot represent them at all.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="State machine comparison">
<defs><marker id="sm-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Booleans</text>
<rect x="16" y="34" width="250" height="150" rx="9" class="d-panel d-panel-bad"/>
<text x="32" y="58" class="d-code">bool isJumping;</text>
<text x="32" y="78" class="d-code">bool isAttacking;</text>
<text x="32" y="98" class="d-code">bool isDead;</text>
<text x="32" y="118" class="d-code">bool isStunned;</text>
<text x="32" y="146" class="d-tm">isDead &amp;&amp; isAttacking == true ?</text>
<text x="32" y="164" class="d-tm">The compiler allows it. Your game ships it.</text>

<text x="300" y="24" class="d-h">Explicit states</text>
<rect x="300" y="34" width="464" height="150" rx="9" class="d-panel d-panel-good"/>
<rect x="322" y="56" width="96" height="34" rx="17" class="d-box d-accent"/><text x="370" y="78" class="d-t d-ctr">Idle</text>
<rect x="470" y="56" width="96" height="34" rx="17" class="d-box d-accent"/><text x="518" y="78" class="d-t d-ctr">Moving</text>
<rect x="618" y="56" width="120" height="34" rx="17" class="d-box d-accent"/><text x="678" y="78" class="d-t d-ctr">Attacking</text>
<rect x="396" y="128" width="96" height="34" rx="17" class="d-box d-accent2"/><text x="444" y="150" class="d-t d-ctr">Stunned</text>
<rect x="556" y="128" width="96" height="34" rx="17" class="d-box d-no"/><text x="604" y="150" class="d-t d-ctr">Dead</text>
<path d="M418 68 H468" class="d-line" marker-end="url(#sm-a)"/>
<path d="M468 80 H420" class="d-line" marker-end="url(#sm-a)"/>
<path d="M566 68 H616" class="d-line" marker-end="url(#sm-a)"/>
<path d="M678 90 V110 H492 V126" class="d-line d-dash" marker-end="url(#sm-a)"/>
<path d="M444 128 V100 L400 92" class="d-line d-dash" marker-end="url(#sm-a)"/>
<path d="M518 90 V126 H554" class="d-line" marker-end="url(#sm-a)"/>
<text x="330" y="176" class="d-tm">Exactly one state is active. Transitions are explicit and reviewable.</text>

<rect x="16" y="200" width="748" height="86" rx="7" class="d-panel"/>
<text x="32" y="222" class="d-h">The shape in code</text>
<text x="32" y="244" class="d-code">interface IState { void Enter(); void Tick(); void Exit(); }</text>
<text x="32" y="264" class="d-tm">Enter() sets up (play animation, disable input), Tick() runs per frame, Exit() cleans up. Adding a state touches one file.</text>
<text x="32" y="280" class="d-tm">The Animator is this same pattern with a visual editor — which is why the two concepts feel familiar once you know one.</text>
</svg>`
},

"scriptableobject-pattern": {
  title: "ScriptableObject as shared data",
  caption: "One asset in the project, referenced by every instance. Designers create new content by right-clicking, with no code change.",
  svg: `<svg viewBox="0 0 780 290" role="img" aria-label="ScriptableObject data sharing">
<defs><marker id="so-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Without — data duplicated per prefab</text>
<rect x="16" y="34" width="340" height="120" rx="9" class="d-panel d-panel-bad"/>
<rect x="32" y="50" width="96" height="88" rx="6" class="d-box"/><text x="80" y="72" class="d-t d-ctr">Tomato</text><text x="80" y="90" class="d-tm d-ctr">hp 10</text><text x="80" y="106" class="d-tm d-ctr">icon…</text><text x="80" y="124" class="d-tm d-ctr">price 3</text>
<rect x="140" y="50" width="96" height="88" rx="6" class="d-box"/><text x="188" y="72" class="d-t d-ctr">Tomato</text><text x="188" y="90" class="d-tm d-ctr">hp 10</text><text x="188" y="106" class="d-tm d-ctr">icon…</text><text x="188" y="124" class="d-tm d-ctr">price 5 ✗</text>
<rect x="248" y="50" width="96" height="88" rx="6" class="d-box"/><text x="296" y="72" class="d-t d-ctr">Tomato</text><text x="296" y="90" class="d-tm d-ctr">hp 10</text><text x="296" y="106" class="d-tm d-ctr">icon…</text><text x="296" y="124" class="d-tm d-ctr">price 3</text>
<text x="186" y="172" class="d-tm d-ctr">Change the price → edit every copy. Miss one → a bug nobody can reproduce.</text>

<text x="404" y="24" class="d-h">With a ScriptableObject</text>
<rect x="404" y="34" width="360" height="120" rx="9" class="d-panel d-panel-good"/>
<rect x="512" y="44" width="150" height="54" rx="7" class="d-box d-accent2"/><text x="587" y="65" class="d-t d-ctr">TomatoSO.asset</text><text x="587" y="83" class="d-tm d-ctr">hp 10 · icon · price 3</text>
<rect x="424" y="116" width="86" height="28" rx="5" class="d-box"/><text x="467" y="135" class="d-t d-ctr">instance</text>
<rect x="544" y="116" width="86" height="28" rx="5" class="d-box"/><text x="587" y="135" class="d-t d-ctr">instance</text>
<rect x="664" y="116" width="86" height="28" rx="5" class="d-box"/><text x="707" y="135" class="d-t d-ctr">instance</text>
<path d="M530 98 L480 114" class="d-line" marker-end="url(#so-a)"/>
<path d="M587 98 V114" class="d-line" marker-end="url(#so-a)"/>
<path d="M644 98 L694 114" class="d-line" marker-end="url(#so-a)"/>
<text x="584" y="172" class="d-tm d-ctr">One source of truth. One edit. In memory once, however many instances exist.</text>

<rect x="16" y="196" width="748" height="80" rx="7" class="d-panel"/>
<text x="32" y="218" class="d-code">[CreateAssetMenu(menuName = "Game/Ingredient")]</text>
<text x="32" y="238" class="d-code">public class IngredientSO : ScriptableObject { public string label; public Sprite icon; public int price; }</text>
<text x="32" y="262" class="d-tm">Caution: a ScriptableObject edited at runtime keeps that change in the editor after you stop playing. Treat them as read-only config,</text>
<text x="32" y="278" class="d-tm">or copy the values into runtime state on load.</text>
</svg>`
},

"prefab-workflow": {
  title: "Prefabs, instances, overrides and variants",
  caption: "Edit the asset, every instance updates. Override one instance, it stops following the asset for that property only.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Prefab workflow">
<defs><marker id="pf-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="280" y="16" width="220" height="56" rx="8" class="d-box d-accent2"/>
<text x="390" y="40" class="d-t d-ctr">Enemy.prefab</text><text x="390" y="58" class="d-tm d-ctr">the asset in your Project window</text>

<path d="M320 72 L150 108" class="d-line" marker-end="url(#pf-a)"/>
<path d="M390 72 V108" class="d-line" marker-end="url(#pf-a)"/>
<path d="M460 72 L630 108" class="d-line" marker-end="url(#pf-a)"/>

<rect x="60" y="112" width="180" height="62" rx="7" class="d-box"/><text x="150" y="134" class="d-t d-ctr">instance in Level 1</text><text x="150" y="152" class="d-tm d-ctr">hp 100 · speed 3</text><text x="150" y="168" class="d-tm d-ctr">follows the asset</text>
<rect x="300" y="112" width="180" height="62" rx="7" class="d-box d-warn"/><text x="390" y="134" class="d-t d-ctr">instance in Level 2</text><text x="390" y="152" class="d-tm d-ctr">hp 100 · speed <tspan class="d-em">6 (override)</tspan></text><text x="390" y="168" class="d-tm d-ctr">speed no longer follows</text>
<rect x="540" y="112" width="180" height="62" rx="7" class="d-box"/><text x="630" y="134" class="d-t d-ctr">instance in Level 3</text><text x="630" y="152" class="d-tm d-ctr">hp 100 · speed 3</text><text x="630" y="168" class="d-tm d-ctr">follows the asset</text>

<rect x="280" y="198" width="220" height="56" rx="8" class="d-box d-accent"/>
<text x="390" y="222" class="d-t d-ctr">EliteEnemy — variant</text><text x="390" y="240" class="d-tm d-ctr">inherits, then diverges deliberately</text>
<path d="M390 174 V196" class="d-line d-dash" marker-end="url(#pf-a)"/>

<rect x="16" y="266" width="748" height="26" rx="6" class="d-box d-warn"/>
<text x="32" y="284" class="d-tm">Never move or rename prefab files outside Unity — the .meta file carries the GUID every reference depends on.</text>
</svg>`
},

"render-pipeline": {
  title: "What happens between your scene and a pixel",
  caption: "Knowing this order tells you where a performance problem can live and why transparency costs more than opaque geometry.",
  svg: `<svg viewBox="0 0 780 280" role="img" aria-label="Render pipeline stages">
<defs><marker id="rp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="40" width="104" height="52" rx="7" class="d-box d-accent"/><text x="68" y="64" class="d-t d-ctr">Culling</text><text x="68" y="80" class="d-tm d-ctr">frustum, occlusion</text>
<rect x="136" y="40" width="104" height="52" rx="7" class="d-box"/><text x="188" y="64" class="d-t d-ctr">Shadow pass</text><text x="188" y="80" class="d-tm d-ctr">per shadowed light</text>
<rect x="256" y="40" width="104" height="52" rx="7" class="d-box"/><text x="308" y="64" class="d-t d-ctr">Opaque</text><text x="308" y="80" class="d-tm d-ctr">front-to-back</text>
<rect x="376" y="40" width="104" height="52" rx="7" class="d-box"/><text x="428" y="64" class="d-t d-ctr">Skybox</text><text x="428" y="80" class="d-tm d-ctr">fills the gaps</text>
<rect x="496" y="40" width="112" height="52" rx="7" class="d-box d-warn"/><text x="552" y="64" class="d-t d-ctr">Transparent</text><text x="552" y="80" class="d-tm d-ctr">back-to-front</text>
<rect x="624" y="40" width="140" height="52" rx="7" class="d-box d-accent2"/><text x="694" y="64" class="d-t d-ctr">Post-processing</text><text x="694" y="80" class="d-tm d-ctr">Volume stack</text>
<path d="M120 66 H134" class="d-line" marker-end="url(#rp-a)"/>
<path d="M240 66 H254" class="d-line" marker-end="url(#rp-a)"/>
<path d="M360 66 H374" class="d-line" marker-end="url(#rp-a)"/>
<path d="M480 66 H494" class="d-line" marker-end="url(#rp-a)"/>
<path d="M608 66 H622" class="d-line" marker-end="url(#rp-a)"/>

<rect x="16" y="112" width="366" height="88" rx="8" class="d-panel d-panel-good"/>
<text x="32" y="134" class="d-h">Why opaque is drawn front-to-back</text>
<text x="32" y="154" class="d-tm">The depth buffer rejects pixels already covered by something</text>
<text x="32" y="170" class="d-tm">nearer, so the expensive fragment shader never runs for them.</text>
<text x="32" y="190" class="d-tm">Free performance from sorting alone.</text>

<rect x="398" y="112" width="366" height="88" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="134" class="d-h">Why transparency is expensive</text>
<text x="414" y="154" class="d-tm">It must blend with what is behind it, so it cannot reject</text>
<text x="414" y="170" class="d-tm">early and must sort back-to-front. Overlapping transparent</text>
<text x="414" y="190" class="d-tm">quads shade the same pixel repeatedly — overdraw.</text>

<rect x="16" y="216" width="748" height="50" rx="7" class="d-box d-warn"/>
<text x="32" y="236" class="d-t">On mobile, overdraw from full-screen transparent effects and UI is one of the most common causes of a GPU-bound frame.</text>
<text x="32" y="254" class="d-tm">Diagnostic: drop the resolution dramatically. If the framerate jumps, you are fill-rate bound, not CPU bound.</text>
</svg>`
},

"srp-comparison": {
  title: "Choosing a render pipeline",
  caption: "The first irreversible decision in a project. Target platform decides it more than art ambition does.",
  svg: `<svg viewBox="0 0 780 290" role="img" aria-label="Render pipeline comparison">
<rect x="16" y="20" width="240" height="210" rx="9" class="d-panel"/>
<text x="136" y="46" class="d-h d-ctr">Built-in</text>
<text x="32" y="72" class="d-tm">· Legacy; no further development</text>
<text x="32" y="94" class="d-tm">· What most old tutorials assume</text>
<text x="32" y="116" class="d-tm">· Surface shaders, no Shader Graph</text>
<text x="32" y="138" class="d-tm">· Separate post-processing stack</text>
<rect x="32" y="158" width="208" height="56" rx="6" class="d-box d-no"/>
<text x="136" y="180" class="d-t d-ctr">Choose only if</text>
<text x="136" y="198" class="d-tm d-ctr">a dependency forces it</text>

<rect x="270" y="20" width="240" height="210" rx="9" class="d-panel d-panel-good"/>
<text x="390" y="46" class="d-h d-ctr">URP</text>
<text x="286" y="72" class="d-tm">· Mobile → console scaling</text>
<text x="286" y="94" class="d-tm">· Shader Graph, VFX Graph</text>
<text x="286" y="116" class="d-tm">· Volume-based post</text>
<text x="286" y="138" class="d-tm">· SRP Batcher, camera stacking</text>
<rect x="286" y="158" width="208" height="56" rx="6" class="d-box d-yes"/>
<text x="390" y="180" class="d-t d-ctr">The default answer</text>
<text x="390" y="198" class="d-tm d-ctr">for most projects</text>

<rect x="524" y="20" width="240" height="210" rx="9" class="d-panel"/>
<text x="644" y="46" class="d-h d-ctr">HDRP</text>
<text x="540" y="72" class="d-tm">· High-end PC and console only</text>
<text x="540" y="94" class="d-tm">· Physical light units, volumetrics</text>
<text x="540" y="116" class="d-tm">· Ray tracing support</text>
<text x="540" y="138" class="d-tm">· Heavy baseline cost</text>
<rect x="540" y="158" width="208" height="56" rx="6" class="d-box d-part"/>
<text x="644" y="180" class="d-t d-ctr">Needs hardware and</text>
<text x="644" y="198" class="d-tm d-ctr">art-pipeline discipline</text>

<rect x="16" y="244" width="748" height="34" rx="7" class="d-box d-warn"/>
<text x="32" y="266" class="d-tm">A magenta object means the material's shader is not valid for the active pipeline. It is never a missing texture.</text>
</svg>`
},

"profiler-loop": {
  title: "The measurement loop",
  caption: "Applying five remembered optimisations at once teaches you nothing. One change, one measurement.",
  svg: `<svg viewBox="0 0 780 290" role="img" aria-label="Profiling loop">
<defs><marker id="pl-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="60" y="24" width="160" height="50" rx="8" class="d-box d-accent"/><text x="140" y="46" class="d-t d-ctr">1. Measure</text><text x="140" y="63" class="d-tm d-ctr">dev build, target device</text>
<rect x="300" y="24" width="180" height="50" rx="8" class="d-box"/><text x="390" y="46" class="d-t d-ctr">2. CPU or GPU bound?</text><text x="390" y="63" class="d-tm d-ctr">the fixes do not overlap</text>
<rect x="560" y="24" width="160" height="50" rx="8" class="d-box"/><text x="640" y="46" class="d-t d-ctr">3. Hypothesise</text><text x="640" y="63" class="d-tm d-ctr">name the suspected cause</text>
<rect x="560" y="126" width="160" height="50" rx="8" class="d-box d-accent2"/><text x="640" y="148" class="d-t d-ctr">4. Change ONE thing</text><text x="640" y="165" class="d-tm d-ctr">exactly one</text>
<rect x="300" y="126" width="180" height="50" rx="8" class="d-box d-accent"/><text x="390" y="148" class="d-t d-ctr">5. Measure again</text><text x="390" y="165" class="d-tm d-ctr">same device, same scene</text>
<rect x="60" y="126" width="160" height="50" rx="8" class="d-box"/><text x="140" y="148" class="d-t d-ctr">6. Keep or revert</text><text x="140" y="165" class="d-tm d-ctr">no sentiment</text>
<path d="M220 49 H298" class="d-line" marker-end="url(#pl-a)"/>
<path d="M480 49 H558" class="d-line" marker-end="url(#pl-a)"/>
<path d="M640 74 V124" class="d-line" marker-end="url(#pl-a)"/>
<path d="M560 151 H482" class="d-line" marker-end="url(#pl-a)"/>
<path d="M300 151 H222" class="d-line" marker-end="url(#pl-a)"/>
<path d="M140 176 V200 H740 V49 H722" class="d-line d-dash" marker-end="url(#pl-a)"/>
<text x="420" y="196" class="d-tm d-ctr">repeat until inside budget on minimum spec</text>

<rect x="16" y="216" width="366" height="62" rx="7" class="d-panel d-panel-bad"/>
<text x="32" y="238" class="d-h">CPU-bound fixes</text>
<text x="32" y="258" class="d-tm">algorithms, caching, jobs + Burst, fewer draw</text>
<text x="32" y="272" class="d-tm">calls, zero per-frame allocation</text>

<rect x="398" y="216" width="366" height="62" rx="7" class="d-panel d-panel-good"/>
<text x="414" y="238" class="d-h">GPU-bound fixes</text>
<text x="414" y="258" class="d-tm">fewer/cheaper pixels, simpler shaders, less</text>
<text x="414" y="272" class="d-tm">overdraw, smaller textures, lower resolution</text>
</svg>`
},

"frame-budget": {
  title: "The 16.7ms frame budget",
  caption: "Every system spends from the same envelope. 'Slow' is not absolute — it is a share of this bar.",
  svg: `<svg viewBox="0 0 780 240" role="img" aria-label="Frame budget breakdown">
<text x="16" y="24" class="d-h">60 fps — 16.7ms total</text>
<rect x="16" y="34" width="748" height="44" rx="7" class="d-box"/>
<rect x="18" y="36" width="130" height="40" rx="5" class="d-seg d-seg1"/><text x="83" y="61" class="d-t d-ctr">scripts 3.0</text>
<rect x="150" y="36" width="100" height="40" class="d-seg d-seg2"/><text x="200" y="61" class="d-t d-ctr">physics 2.2</text>
<rect x="252" y="36" width="90" height="40" class="d-seg d-seg3"/><text x="297" y="61" class="d-t d-ctr">anim 2.0</text>
<rect x="344" y="36" width="150" height="40" class="d-seg d-seg4"/><text x="419" y="61" class="d-t d-ctr">rendering 3.4</text>
<rect x="496" y="36" width="80" height="40" class="d-seg d-seg5"/><text x="536" y="61" class="d-t d-ctr">UI 1.8</text>
<rect x="578" y="36" width="184" height="40" rx="5" class="d-seg d-seg6"/><text x="670" y="61" class="d-t d-ctr">headroom 4.3ms</text>

<text x="16" y="112" class="d-h">Same game, thermally throttled phone, tenth minute</text>
<rect x="16" y="122" width="748" height="44" rx="7" class="d-box"/>
<rect x="18" y="124" width="200" height="40" rx="5" class="d-seg d-seg1"/><text x="118" y="149" class="d-t d-ctr">scripts 4.5</text>
<rect x="220" y="124" width="150" height="40" class="d-seg d-seg2"/><text x="295" y="149" class="d-t d-ctr">physics 3.3</text>
<rect x="372" y="124" width="120" height="40" class="d-seg d-seg3"/><text x="432" y="149" class="d-t d-ctr">anim 2.7</text>
<rect x="494" y="124" width="268" height="40" rx="5" class="d-seg d-seg4"/><text x="628" y="149" class="d-t d-ctr">rendering 6.0 — now over budget</text>

<rect x="16" y="186" width="748" height="44" rx="7" class="d-box d-warn"/>
<text x="32" y="206" class="d-t">This is why you profile a build on the weakest device, for long enough to get hot.</text>
<text x="32" y="222" class="d-tm">A game that holds 60fps for ninety seconds in the editor can be unshippable at minute ten on real hardware.</text>
</svg>`
},

"build-pipeline": {
  title: "From project to player build",
  caption: "The stages where build-only failures hide. Everything here works perfectly in the editor, which is the problem.",
  svg: `<svg viewBox="0 0 780 280" role="img" aria-label="Build pipeline stages">
<defs><marker id="bp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="36" width="130" height="56" rx="7" class="d-box d-accent"/><text x="81" y="60" class="d-t d-ctr">Your C#</text><text x="81" y="78" class="d-tm d-ctr">+ assemblies</text>
<rect x="166" y="36" width="140" height="56" rx="7" class="d-box"/><text x="236" y="60" class="d-t d-ctr">Mono or IL2CPP</text><text x="236" y="78" class="d-tm d-ctr">JIT vs C++ → native</text>
<rect x="326" y="36" width="150" height="56" rx="7" class="d-box d-warn"/><text x="401" y="60" class="d-t d-ctr">Managed stripping</text><text x="401" y="78" class="d-tm d-ctr">removes "unused" code</text>
<rect x="496" y="36" width="130" height="56" rx="7" class="d-box"/><text x="561" y="60" class="d-t d-ctr">Asset packing</text><text x="561" y="78" class="d-tm d-ctr">scenes, bundles</text>
<rect x="646" y="36" width="118" height="56" rx="7" class="d-box d-accent2"/><text x="705" y="60" class="d-t d-ctr">Player build</text><text x="705" y="78" class="d-tm d-ctr">the artefact</text>
<path d="M146 64 H164" class="d-line" marker-end="url(#bp-a)"/>
<path d="M306 64 H324" class="d-line" marker-end="url(#bp-a)"/>
<path d="M476 64 H494" class="d-line" marker-end="url(#bp-a)"/>
<path d="M626 64 H644" class="d-line" marker-end="url(#bp-a)"/>

<rect x="16" y="116" width="366" height="94" rx="8" class="d-panel d-panel-bad"/>
<text x="32" y="138" class="d-h">Stripping breaks reflection</text>
<text x="32" y="158" class="d-tm">The stripper proves a type is unused by looking at call</text>
<text x="32" y="174" class="d-tm">sites. It cannot see through reflection or name-based</text>
<text x="32" y="190" class="d-tm">deserialization. Fix: link.xml or [Preserve].</text>
<text x="32" y="206" class="d-tm">Symptom: a missing-type exception only in the build.</text>

<rect x="398" y="116" width="366" height="94" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="138" class="d-h">Other build-only failures</text>
<text x="414" y="158" class="d-tm">· Shader variants absent from the build → magenta</text>
<text x="414" y="174" class="d-tm">· Case-sensitive paths that worked on Windows</text>
<text x="414" y="190" class="d-tm">· Platform APIs behaving differently</text>
<text x="414" y="206" class="d-tm">· Assets only present in your local folder</text>

<rect x="16" y="226" width="748" height="42" rx="7" class="d-box d-warn"/>
<text x="32" y="246" class="d-t">Mitigation, and it is the whole answer: build on the target platform from week one, not week fifty.</text>
<text x="32" y="262" class="d-tm">Then verify a clean checkout builds on a machine that is not yours.</text>
</svg>`
},

"netcode-authority": {
  title: "Client-authoritative vs server-authoritative",
  caption: "This choice is not retrofittable. It determines whether cheating is possible and how your entire codebase is shaped.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Network authority models">
<defs><marker id="na-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Client-authoritative</text>
<rect x="16" y="34" width="360" height="166" rx="9" class="d-panel d-panel-bad"/>
<rect x="40" y="56" width="120" height="40" rx="6" class="d-box d-accent"/><text x="100" y="81" class="d-t d-ctr">Client A</text>
<rect x="232" y="56" width="120" height="40" rx="6" class="d-box d-accent"/><text x="292" y="81" class="d-t d-ctr">Client B</text>
<rect x="136" y="132" width="120" height="40" rx="6" class="d-box"/><text x="196" y="157" class="d-t d-ctr">relay / host</text>
<path d="M100 96 L180 130" class="d-line" marker-end="url(#na-a)"/>
<path d="M292 96 L214 130" class="d-line" marker-end="url(#na-a)"/>
<text x="196" y="118" class="d-tm d-ctr">"I am at X, I dealt 50 damage"</text>
<text x="196" y="192" class="d-tm d-ctr">The claim is simply believed.</text>

<text x="404" y="24" class="d-h">Server-authoritative</text>
<rect x="404" y="34" width="360" height="166" rx="9" class="d-panel d-panel-good"/>
<rect x="428" y="56" width="110" height="40" rx="6" class="d-box d-accent"/><text x="483" y="81" class="d-t d-ctr">Client A</text>
<rect x="630" y="56" width="110" height="40" rx="6" class="d-box d-accent"/><text x="685" y="81" class="d-t d-ctr">Client B</text>
<rect x="514" y="132" width="140" height="40" rx="6" class="d-box d-accent2"/><text x="584" y="151" class="d-t d-ctr">Server</text><text x="584" y="166" class="d-tm d-ctr">simulates, decides</text>
<path d="M483 96 L546 130" class="d-line" marker-end="url(#na-a)"/>
<path d="M685 96 L622 130" class="d-line" marker-end="url(#na-a)"/>
<path d="M556 130 L500 100" class="d-line d-dash" marker-end="url(#na-a)"/>
<path d="M614 130 L670 100" class="d-line d-dash" marker-end="url(#na-a)"/>
<text x="584" y="118" class="d-tm d-ctr">inputs up ↑ · authoritative state down ↓</text>
<text x="584" y="192" class="d-tm d-ctr">Clients request; the server decides.</text>

<rect x="16" y="216" width="366" height="70" rx="7" class="d-panel"/>
<text x="32" y="238" class="d-h">NetworkVariable — state</text>
<text x="32" y="258" class="d-tm">Has a current value. Survives late joins and</text>
<text x="32" y="274" class="d-tm">packet loss. Health, position, score.</text>

<rect x="398" y="216" width="366" height="70" rx="7" class="d-panel"/>
<text x="414" y="238" class="d-h">RPC — events</text>
<text x="414" y="258" class="d-tm">Happens at a moment. ServerRpc up, ClientRpc</text>
<text x="414" y="274" class="d-tm">down. Fire weapon, spawn effect, request action.</text>
</svg>`
},

"client-prediction": {
  title: "Prediction and reconciliation",
  caption: "How an authoritative server still feels instant. Three techniques, each solving a different symptom of latency.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Client prediction timeline">
<defs><marker id="cp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Client timeline</text>
<line x1="16" y1="46" x2="764" y2="46" class="d-line" marker-end="url(#cp-a)"/>
<circle cx="90" cy="46" r="6" class="d-dot d-dot-a"/><text x="90" y="34" class="d-tm d-ctr">input</text>
<text x="90" y="70" class="d-tm d-ctr">move immediately</text>
<text x="90" y="86" class="d-tm d-ctr">(prediction)</text>
<circle cx="470" cy="46" r="6" class="d-dot d-dot-b"/><text x="470" y="34" class="d-tm d-ctr">server state arrives</text>
<text x="470" y="70" class="d-tm d-ctr">disagrees slightly</text>
<circle cx="600" cy="46" r="6" class="d-dot d-dot-c"/><text x="600" y="34" class="d-tm d-ctr">reconcile</text>
<text x="600" y="70" class="d-tm d-ctr">rewind + replay inputs</text>

<text x="16" y="124" class="d-h">Server timeline</text>
<line x1="16" y1="146" x2="764" y2="146" class="d-line" marker-end="url(#cp-a)"/>
<circle cx="280" cy="146" r="6" class="d-dot d-dot-b"/><text x="280" y="134" class="d-tm d-ctr">input received</text>
<text x="280" y="170" class="d-tm d-ctr">simulate, decide truth</text>
<path d="M96 52 L274 140" class="d-line d-dash" marker-end="url(#cp-a)"/>
<path d="M286 140 L464 52" class="d-line d-dash" marker-end="url(#cp-a)"/>
<text x="180" y="108" class="d-tm">↑ latency</text>
<text x="380" y="108" class="d-tm">latency ↓</text>

<rect x="16" y="196" width="240" height="90" rx="8" class="d-panel d-panel-good"/>
<text x="136" y="218" class="d-h d-ctr">Prediction</text>
<text x="136" y="240" class="d-tm d-ctr">Your own actions feel</text>
<text x="136" y="256" class="d-tm d-ctr">instant because you do not</text>
<text x="136" y="272" class="d-tm d-ctr">wait for the round trip.</text>

<rect x="270" y="196" width="240" height="90" rx="8" class="d-panel d-panel-good"/>
<text x="390" y="218" class="d-h d-ctr">Reconciliation</text>
<text x="390" y="240" class="d-tm d-ctr">When the server disagrees,</text>
<text x="390" y="256" class="d-tm d-ctr">snap to its truth and replay</text>
<text x="390" y="272" class="d-tm d-ctr">pending inputs smoothly.</text>

<rect x="524" y="196" width="240" height="90" rx="8" class="d-panel d-panel-good"/>
<text x="644" y="218" class="d-h d-ctr">Interpolation</text>
<text x="644" y="240" class="d-tm d-ctr">Other players are rendered</text>
<text x="644" y="256" class="d-tm d-ctr">slightly in the past, between</text>
<text x="644" y="272" class="d-tm d-ctr">snapshots — smooth, not jumpy.</text>
</svg>`
},

"ui-systems": {
  title: "Three UI systems, one decision",
  caption: "UI Toolkit is the future and uGUI still wins on world-space UI and ecosystem. Using both is a legitimate architecture.",
  svg: `<svg viewBox="0 0 780 280" role="img" aria-label="Unity UI systems comparison">
<rect x="16" y="20" width="240" height="192" rx="9" class="d-panel d-panel-good"/>
<text x="136" y="46" class="d-h d-ctr">UI Toolkit</text>
<text x="32" y="72" class="d-tm">· UXML structure, USS styling</text>
<text x="32" y="94" class="d-tm">· Flexbox layout</text>
<text x="32" y="116" class="d-tm">· Scales to dense screens</text>
<text x="32" y="138" class="d-tm">· Used by the editor itself</text>
<text x="32" y="160" class="d-tm">· Web experience transfers</text>
<rect x="32" y="174" width="208" height="28" rx="5" class="d-box d-yes"/><text x="136" y="193" class="d-t d-ctr">menus, HUD, tooling</text>

<rect x="270" y="20" width="240" height="192" rx="9" class="d-panel"/>
<text x="390" y="46" class="d-h d-ctr">uGUI</text>
<text x="286" y="72" class="d-tm">· Canvas + RectTransform</text>
<text x="286" y="94" class="d-tm">· What most tutorials teach</text>
<text x="286" y="116" class="d-tm">· World-space UI works well</text>
<text x="286" y="138" class="d-tm">· Huge Asset Store ecosystem</text>
<text x="286" y="160" class="d-tm">· Canvas rebuild cost</text>
<rect x="286" y="174" width="208" height="28" rx="5" class="d-box d-yes"/><text x="390" y="193" class="d-t d-ctr">world-space, packages</text>

<rect x="524" y="20" width="240" height="192" rx="9" class="d-panel d-panel-bad"/>
<text x="644" y="46" class="d-h d-ctr">IMGUI</text>
<text x="540" y="72" class="d-tm">· Immediate mode, OnGUI</text>
<text x="540" y="94" class="d-tm">· Redraws every frame</text>
<text x="540" y="116" class="d-tm">· Editor scripting only</text>
<text x="540" y="138" class="d-tm">· Custom inspectors</text>
<rect x="540" y="174" width="208" height="28" rx="5" class="d-box d-no"/><text x="644" y="193" class="d-t d-ctr">never for runtime UI</text>

<rect x="16" y="228" width="748" height="42" rx="7" class="d-box d-warn"/>
<text x="32" y="248" class="d-t">uGUI performance rule: any change to any element rebuilds the whole canvas.</text>
<text x="32" y="264" class="d-tm">Put your per-frame timer and health bar on their own canvas, separate from the static HUD.</text>
</svg>`
},

"animator-graph": {
  title: "The Animator is a state machine",
  caption: "Your code sets parameters. The graph decides what plays. Calling Play() directly abandons the machinery that blends for you.",
  svg: `<svg viewBox="0 0 780 290" role="img" aria-label="Animator state machine">
<defs><marker id="ag-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="28" width="190" height="150" rx="9" class="d-panel"/>
<text x="111" y="52" class="d-h d-ctr">Your code sets</text>
<rect x="32" y="64" width="158" height="26" rx="5" class="d-box d-accent2"/><text x="111" y="82" class="d-t d-ctr">Speed (float) = 4.2</text>
<rect x="32" y="96" width="158" height="26" rx="5" class="d-box d-accent2"/><text x="111" y="114" class="d-t d-ctr">Grounded (bool)</text>
<rect x="32" y="128" width="158" height="26" rx="5" class="d-box d-accent2"/><text x="111" y="146" class="d-t d-ctr">Attack (trigger)</text>
<text x="111" y="170" class="d-tm d-ctr">never Play("Run")</text>

<path d="M206 100 H242" class="d-line" marker-end="url(#ag-a)"/>

<rect x="250" y="28" width="514" height="150" rx="9" class="d-panel d-panel-good"/>
<text x="266" y="52" class="d-h">The graph decides</text>
<rect x="276" y="64" width="190" height="66" rx="8" class="d-box d-accent"/>
<text x="371" y="86" class="d-t d-ctr">Locomotion (blend tree)</text>
<text x="371" y="104" class="d-tm d-ctr">idle ─ walk ─ run</text>
<text x="371" y="120" class="d-tm d-ctr">blended by Speed</text>
<rect x="520" y="64" width="110" height="40" rx="8" class="d-box"/><text x="575" y="89" class="d-t d-ctr">Jump</text>
<rect x="650" y="64" width="98" height="40" rx="8" class="d-box"/><text x="699" y="89" class="d-t d-ctr">Attack</text>
<path d="M466 84 H518" class="d-line" marker-end="url(#ag-a)"/>
<path d="M575 104 V120 H470 V100" class="d-line d-dash" marker-end="url(#ag-a)"/>
<path d="M630 84 H648" class="d-line" marker-end="url(#ag-a)"/>
<text x="490" y="78" class="d-tm">!Grounded</text>
<text x="266" y="158" class="d-tm">Transitions carry conditions and a duration — the duration is what makes blending automatic.</text>

<rect x="16" y="196" width="366" height="82" rx="8" class="d-panel"/>
<text x="32" y="218" class="d-h">Layers + Avatar Mask</text>
<text x="32" y="238" class="d-tm">Base layer: locomotion, whole body.</text>
<text x="32" y="254" class="d-tm">Upper-body layer: wave, aim, carry — masked to arms</text>
<text x="32" y="270" class="d-tm">and spine, overriding or adding on top.</text>

<rect x="398" y="196" width="366" height="82" rx="8" class="d-box d-warn"/>
<text x="414" y="218" class="d-h">Two things that bite everyone</text>
<text x="414" y="238" class="d-tm">· Feed blend-tree floats through the damped SetFloat</text>
<text x="414" y="254" class="d-tm">  overload or movement snaps.</text>
<text x="414" y="270" class="d-tm">· A trigger set but never consumed fires much later.</text>
</svg>`
},

"object-pool": {
  title: "Object pooling",
  caption: "Instantiate/Destroy allocates and frees. Do that at ten bullets a second and the collector eventually interrupts a frame.",
  svg: `<svg viewBox="0 0 780 250" role="img" aria-label="Object pooling lifecycle">
<defs><marker id="op-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Without a pool</text>
<rect x="16" y="34" width="340" height="80" rx="8" class="d-panel d-panel-bad"/>
<rect x="34" y="54" width="90" height="34" rx="5" class="d-box"/><text x="79" y="76" class="d-t d-ctr">Instantiate</text>
<rect x="148" y="54" width="76" height="34" rx="5" class="d-box"/><text x="186" y="76" class="d-t d-ctr">live</text>
<rect x="248" y="54" width="90" height="34" rx="5" class="d-box d-no"/><text x="293" y="76" class="d-t d-ctr">Destroy</text>
<path d="M124 71 H146" class="d-line" marker-end="url(#op-a)"/>
<path d="M224 71 H246" class="d-line" marker-end="url(#op-a)"/>
<text x="186" y="106" class="d-tm d-ctr">allocation → garbage → collection → frame spike</text>

<text x="404" y="24" class="d-h">With a pool</text>
<rect x="404" y="34" width="360" height="80" rx="8" class="d-panel d-panel-good"/>
<rect x="422" y="54" width="86" height="34" rx="5" class="d-box d-accent"/><text x="465" y="76" class="d-t d-ctr">Get()</text>
<rect x="530" y="54" width="76" height="34" rx="5" class="d-box"/><text x="568" y="76" class="d-t d-ctr">live</text>
<rect x="628" y="54" width="120" height="34" rx="5" class="d-box d-accent"/><text x="688" y="76" class="d-t d-ctr">Release()</text>
<path d="M508 71 H528" class="d-line" marker-end="url(#op-a)"/>
<path d="M606 71 H626" class="d-line" marker-end="url(#op-a)"/>
<path d="M688 88 V100 H465 V90" class="d-line d-dash" marker-end="url(#op-a)"/>
<text x="580" y="110" class="d-tm d-ctr">deactivated and reused — no allocation</text>

<rect x="16" y="134" width="748" height="100" rx="8" class="d-panel"/>
<text x="32" y="156" class="d-h">Use the built-in one</text>
<text x="32" y="178" class="d-code">using UnityEngine.Pool;</text>
<text x="32" y="198" class="d-code">pool = new ObjectPool&lt;Bullet&gt;(Create, OnGet, OnRelease, OnDestroyItem, true, 32, 256);</text>
<text x="32" y="222" class="d-tm">Reset state in OnGet, not OnRelease — a pooled object arrives carrying whatever the last user left on it. Velocity, trail</text>
<text x="32" y="238" class="d-tm">renderers and coroutines are the usual culprits.</text>
</svg>`
},

"job-system-flow": {
  title: "Where work can happen",
  caption: "Three places: the main thread, worker threads, and the GPU. Optimisation is largely the art of moving work between them.",
  svg: `<svg viewBox="0 0 780 260" role="img" aria-label="Job system and compute work placement">
<defs><marker id="js-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="28" width="240" height="150" rx="9" class="d-panel d-panel-bad"/>
<text x="136" y="52" class="d-h d-ctr">Main thread</text>
<text x="32" y="78" class="d-tm">MonoBehaviour code lives here</text>
<text x="32" y="100" class="d-tm">Unity API calls are only legal here</text>
<text x="32" y="122" class="d-tm">Everything competes for one core</text>
<rect x="32" y="136" width="208" height="30" rx="5" class="d-box d-no"/><text x="136" y="156" class="d-t d-ctr">the bottleneck by default</text>

<rect x="270" y="28" width="240" height="150" rx="9" class="d-panel d-panel-good"/>
<text x="390" y="52" class="d-h d-ctr">Worker threads — Jobs</text>
<text x="286" y="78" class="d-tm">Structs of data + Execute()</text>
<text x="286" y="100" class="d-tm">NativeArray, not managed objects</text>
<text x="286" y="122" class="d-tm">Burst compiles to SIMD native</text>
<rect x="286" y="136" width="208" height="30" rx="5" class="d-box d-yes"/><text x="390" y="156" class="d-t d-ctr">parallel CPU maths</text>

<rect x="524" y="28" width="240" height="150" rx="9" class="d-panel d-panel-good"/>
<text x="644" y="52" class="d-h d-ctr">GPU — Compute shaders</text>
<text x="540" y="78" class="d-tm">Thousands of threads</text>
<text x="540" y="100" class="d-tm">Upload/readback has real cost</text>
<text x="540" y="122" class="d-tm">Best when data stays resident</text>
<rect x="540" y="136" width="208" height="30" rx="5" class="d-box d-yes"/><text x="644" y="156" class="d-t d-ctr">massively parallel work</text>

<path d="M256 100 H268" class="d-line" marker-end="url(#js-a)"/>
<path d="M510 100 H522" class="d-line" marker-end="url(#js-a)"/>

<rect x="16" y="196" width="748" height="50" rx="7" class="d-box d-warn"/>
<text x="32" y="216" class="d-t">Jobs cannot touch the Unity API or managed objects. That restriction is what makes them safe to parallelise.</text>
<text x="32" y="234" class="d-tm">Schedule early in the frame, Complete() late — calling Complete() immediately after Schedule() just blocks the main thread.</text>
</svg>`
},

"serialization-flow": {
  title: "What Unity serializes",
  caption: "The rules behind 'I changed the default in code and nothing happened' and 'my Dictionary is empty'.",
  svg: `<svg viewBox="0 0 780 270" role="img" aria-label="Unity serialization rules">
<rect x="16" y="24" width="366" height="180" rx="9" class="d-panel d-panel-good"/>
<text x="32" y="48" class="d-h">Serialized</text>
<text x="32" y="74" class="d-tm">public fields of supported types</text>
<text x="32" y="96" class="d-tm">[SerializeField] private fields</text>
<text x="32" y="118" class="d-tm">int, float, bool, string, enum</text>
<text x="32" y="140" class="d-tm">UnityEngine.Object references</text>
<text x="32" y="162" class="d-tm">arrays and List&lt;T&gt; of the above</text>
<text x="32" y="184" class="d-tm">classes marked [System.Serializable]</text>

<rect x="398" y="24" width="366" height="180" rx="9" class="d-panel d-panel-bad"/>
<text x="414" y="48" class="d-h">Not serialized</text>
<text x="414" y="74" class="d-tm">properties (even with public get/set)</text>
<text x="414" y="96" class="d-tm">static fields</text>
<text x="414" y="118" class="d-tm">readonly fields</text>
<text x="414" y="140" class="d-tm">Dictionary&lt;K,V&gt;</text>
<text x="414" y="162" class="d-tm">interface-typed fields</text>
<text x="414" y="184" class="d-tm">nested nulls in plain classes</text>

<rect x="16" y="218" width="748" height="44" rx="7" class="d-box d-warn"/>
<text x="32" y="238" class="d-t">The consequence that confuses everyone: a serialized value in the scene overrides your field initialiser.</text>
<text x="32" y="255" class="d-tm">You change the initialiser from 5f to 10f in code, nothing changes in play mode, because the scene already stored 5. Fix it in the Inspector.</text>
</svg>`
},

"editor-layout": {
  title: "The editor windows and what each answers",
  caption: "Most beginner confusion is spatial, not conceptual: not knowing which window holds the answer.",
  svg: `<svg viewBox="0 0 780 280" role="img" aria-label="Unity editor layout">
<rect x="16" y="24" width="180" height="150" rx="7" class="d-box d-accent"/>
<text x="106" y="48" class="d-t d-ctr">Hierarchy</text>
<text x="106" y="70" class="d-tm d-ctr">what is in this scene</text>
<text x="106" y="90" class="d-tm d-ctr">right now</text>
<text x="106" y="118" class="d-tm d-ctr">runtime instances</text>
<text x="106" y="140" class="d-tm d-ctr">parenting structure</text>

<rect x="206" y="24" width="300" height="150" rx="7" class="d-box"/>
<text x="356" y="48" class="d-t d-ctr">Scene / Game view</text>
<text x="356" y="72" class="d-tm d-ctr">Scene = your editing viewport, gizmos visible</text>
<text x="356" y="94" class="d-tm d-ctr">Game = what the camera actually renders</text>
<text x="356" y="124" class="d-tm d-ctr">Changes made during Play mode are</text>
<text x="356" y="144" class="d-tm d-ctr">discarded when you stop. Everyone loses work</text>
<text x="356" y="162" class="d-tm d-ctr">to this exactly once.</text>

<rect x="516" y="24" width="248" height="150" rx="7" class="d-box d-accent2"/>
<text x="640" y="48" class="d-t d-ctr">Inspector</text>
<text x="640" y="70" class="d-tm d-ctr">components on the selected thing</text>
<text x="640" y="92" class="d-tm d-ctr">and their serialized values</text>
<text x="640" y="122" class="d-tm d-ctr">Blue text = prefab override</text>
<text x="640" y="144" class="d-tm d-ctr">Lock it to keep a target selected</text>

<rect x="16" y="186" width="370" height="80" rx="7" class="d-box"/>
<text x="201" y="210" class="d-t d-ctr">Project</text>
<text x="201" y="232" class="d-tm d-ctr">files on disk — assets, prefabs, scripts, scenes</text>
<text x="201" y="252" class="d-tm d-ctr">Move things here, never in your OS file browser</text>

<rect x="396" y="186" width="368" height="80" rx="7" class="d-box"/>
<text x="580" y="210" class="d-t d-ctr">Console</text>
<text x="580" y="232" class="d-tm d-ctr">errors, warnings, your Debug.Log calls</text>
<text x="580" y="252" class="d-tm d-ctr">Read the FIRST error — later ones are usually its children</text>
</svg>`
},

"project-anatomy": {
  title: "What is in a Unity project folder",
  caption: "Knowing which folders are source and which are generated tells you exactly what belongs in version control.",
  svg: `<svg viewBox="0 0 780 270" role="img" aria-label="Unity project folder structure">
<rect x="16" y="24" width="366" height="196" rx="9" class="d-panel d-panel-good"/>
<text x="32" y="48" class="d-h">Commit these</text>
<text x="32" y="76" class="d-code">Assets/</text><text x="150" y="76" class="d-tm">everything you make</text>
<text x="32" y="100" class="d-code">Assets/**/*.meta</text><text x="180" y="100" class="d-tm">GUIDs — critical</text>
<text x="32" y="124" class="d-code">ProjectSettings/</text><text x="180" y="124" class="d-tm">physics, tags, build</text>
<text x="32" y="148" class="d-code">Packages/manifest.json</text><text x="220" y="148" class="d-tm">dependencies</text>
<text x="32" y="172" class="d-code">Packages/packages-lock.json</text>
<text x="32" y="200" class="d-tm">Use Unity's .gitignore and Git LFS for binary art.</text>

<rect x="398" y="24" width="366" height="196" rx="9" class="d-panel d-panel-bad"/>
<text x="414" y="48" class="d-h">Never commit these</text>
<text x="414" y="76" class="d-code">Library/</text><text x="530" y="76" class="d-tm">import cache, huge, regenerates</text>
<text x="414" y="100" class="d-code">Temp/</text><text x="530" y="100" class="d-tm">transient</text>
<text x="414" y="124" class="d-code">Logs/</text><text x="530" y="124" class="d-tm">editor logs</text>
<text x="414" y="148" class="d-code">Builds/</text><text x="530" y="148" class="d-tm">output artefacts</text>
<text x="414" y="172" class="d-code">*.csproj / *.sln</text><text x="560" y="172" class="d-tm">generated</text>
<text x="414" y="200" class="d-tm">Deleting Library/ is a safe, standard repair step.</text>

<rect x="16" y="234" width="748" height="26" rx="6" class="d-box d-warn"/>
<text x="32" y="252" class="d-tm">A .meta file holds the GUID every reference points at. Lose it and your prefab links break — which is why you move files inside Unity.</text>
</svg>`
},

"addressables-flow": {
  title: "Resources vs Addressables",
  caption: "Why the folder beginners discover first is the one that will not survive shipping.",
  svg: `<svg viewBox="0 0 780 250" role="img" aria-label="Resources versus Addressables">
<defs><marker id="ad-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Resources/</text>
<rect x="16" y="34" width="360" height="110" rx="9" class="d-panel d-panel-bad"/>
<rect x="36" y="54" width="120" height="34" rx="5" class="d-box"/><text x="96" y="76" class="d-t d-ctr">every asset</text>
<rect x="216" y="54" width="140" height="34" rx="5" class="d-box d-no"/><text x="286" y="76" class="d-t d-ctr">all in the build</text>
<path d="M156 71 H214" class="d-line" marker-end="url(#ad-a)"/>
<text x="196" y="110" class="d-tm d-ctr">loaded at startup whether used or not</text>
<text x="196" y="130" class="d-tm d-ctr">string paths, synchronous, no remote updates</text>

<text x="404" y="24" class="d-h">Addressables</text>
<rect x="404" y="34" width="360" height="110" rx="9" class="d-panel d-panel-good"/>
<rect x="424" y="54" width="110" height="34" rx="5" class="d-box"/><text x="479" y="76" class="d-t d-ctr">address</text>
<rect x="562" y="54" width="90" height="34" rx="5" class="d-box"/><text x="607" y="76" class="d-t d-ctr">bundle</text>
<rect x="670" y="54" width="80" height="34" rx="5" class="d-box d-yes"/><text x="710" y="76" class="d-t d-ctr">on demand</text>
<path d="M534 71 H560" class="d-line" marker-end="url(#ad-a)"/>
<path d="M652 71 H668" class="d-line" marker-end="url(#ad-a)"/>
<text x="584" y="110" class="d-tm d-ctr">async load and unload, memory you control</text>
<text x="584" y="130" class="d-tm d-ctr">can be hosted remotely — content updates without resubmission</text>

<rect x="16" y="166" width="748" height="70" rx="7" class="d-panel"/>
<text x="32" y="188" class="d-t">The migration cost is that async loading changes the shape of your code.</text>
<text x="32" y="208" class="d-tm">That is precisely why you choose Addressables at the start of a project that will ship, rather than migrating at the end.</text>
<text x="32" y="228" class="d-tm">For a game jam, Resources is entirely fine — the trap is only when the project outlives the jam.</text>
</svg>`
},

"shader-stages": {
  title: "Vertex and fragment stages",
  caption: "Nearly every shader behaviour is a consequence of this two-program structure with interpolation in between.",
  svg: `<svg viewBox="0 0 780 250" role="img" aria-label="Shader pipeline stages">
<defs><marker id="ss-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="40" width="160" height="60" rx="7" class="d-box"/><text x="96" y="66" class="d-t d-ctr">Mesh vertices</text><text x="96" y="84" class="d-tm d-ctr">object space</text>
<rect x="206" y="40" width="170" height="60" rx="7" class="d-box d-accent"/><text x="291" y="66" class="d-t d-ctr">Vertex program</text><text x="291" y="84" class="d-tm d-ctr">once per vertex</text>
<rect x="406" y="40" width="170" height="60" rx="7" class="d-box"/><text x="491" y="66" class="d-t d-ctr">Rasteriser</text><text x="491" y="84" class="d-tm d-ctr">interpolates across pixels</text>
<rect x="606" y="40" width="158" height="60" rx="7" class="d-box d-accent2"/><text x="685" y="66" class="d-t d-ctr">Fragment program</text><text x="685" y="84" class="d-tm d-ctr">once per pixel</text>
<path d="M176 70 H204" class="d-line" marker-end="url(#ss-a)"/>
<path d="M376 70 H404" class="d-line" marker-end="url(#ss-a)"/>
<path d="M576 70 H604" class="d-line" marker-end="url(#ss-a)"/>

<rect x="16" y="120" width="366" height="76" rx="8" class="d-panel"/>
<text x="32" y="142" class="d-h">Space transforms in the vertex stage</text>
<text x="32" y="164" class="d-tm">object → world → view → clip</text>
<text x="32" y="184" class="d-tm">Most shader bugs are a value used in the wrong space.</text>

<rect x="398" y="120" width="366" height="76" rx="8" class="d-panel"/>
<text x="414" y="142" class="d-h">Why normals need renormalising</text>
<text x="414" y="164" class="d-tm">Interpolating two unit vectors gives a shorter one.</text>
<text x="414" y="184" class="d-tm">normalize() in the fragment stage, every time.</text>

<rect x="16" y="210" width="748" height="30" rx="6" class="d-box d-warn"/>
<text x="32" y="230" class="d-tm">Shader Graph compiles to these same two stages — understanding the structure makes the node graph legible rather than magical.</text>
</svg>`
},

"canvas-hierarchy": {
  title: "Anchors vs pivot in uGUI",
  caption: "The single most confusing part of uGUI, and it is two independent ideas wearing similar handles.",
  svg: `<svg viewBox="0 0 780 260" role="img" aria-label="RectTransform anchors and pivot">
<text x="16" y="24" class="d-h">Anchor — how it reacts when the parent resizes</text>
<rect x="16" y="36" width="230" height="130" rx="7" class="d-box"/>
<rect x="60" y="70" width="90" height="50" rx="5" class="d-box d-accent"/><text x="105" y="100" class="d-t d-ctr">button</text>
<circle cx="60" cy="70" r="4" class="d-dot d-dot-a"/><circle cx="150" cy="70" r="4" class="d-dot d-dot-a"/>
<circle cx="60" cy="120" r="4" class="d-dot d-dot-a"/><circle cx="150" cy="120" r="4" class="d-dot d-dot-a"/>
<text x="131" y="188" class="d-tm d-ctr">anchored to centre → stays centred,</text>
<text x="131" y="204" class="d-tm d-ctr">keeps its size on resize</text>

<rect x="266" y="36" width="230" height="130" rx="7" class="d-box"/>
<rect x="286" y="56" width="190" height="90" rx="5" class="d-box d-accent2"/><text x="381" y="106" class="d-t d-ctr">panel</text>
<circle cx="286" cy="56" r="4" class="d-dot d-dot-b"/><circle cx="476" cy="56" r="4" class="d-dot d-dot-b"/>
<circle cx="286" cy="146" r="4" class="d-dot d-dot-b"/><circle cx="476" cy="146" r="4" class="d-dot d-dot-b"/>
<text x="381" y="188" class="d-tm d-ctr">anchors stretched to the corners →</text>
<text x="381" y="204" class="d-tm d-ctr">grows and shrinks with the parent</text>

<text x="524" y="24" class="d-h">Pivot — the origin</text>
<rect x="524" y="36" width="240" height="130" rx="7" class="d-box"/>
<rect x="574" y="66" width="140" height="60" rx="5" class="d-box d-accent"/>
<circle cx="574" cy="126" r="5" class="d-dot d-dot-c"/><text x="574" y="146" class="d-tm d-ctr">(0,0)</text>
<circle cx="644" cy="96" r="5" class="d-dot d-dot-c"/><text x="664" y="100" class="d-tm">(0.5,0.5)</text>
<text x="644" y="188" class="d-tm d-ctr">rotation and scale happen around</text>
<text x="644" y="204" class="d-tm d-ctr">the pivot; position is measured from it</text>

<rect x="16" y="220" width="748" height="30" rx="6" class="d-box d-warn"/>
<text x="32" y="240" class="d-tm">A health bar that should drain from the left needs its pivot at x=0 — then scaling x from 1 to 0 empties it in the right direction.</text>
</svg>`
},

"procedural-pipeline": {
  title: "Procedural terrain, end to end",
  caption: "The stages most procedural generation series follow, and where each one's parameters actually matter.",
  svg: `<svg viewBox="0 0 780 240" role="img" aria-label="Procedural terrain generation pipeline">
<defs><marker id="pp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="36" width="130" height="54" rx="7" class="d-box d-accent"/><text x="81" y="60" class="d-t d-ctr">Noise</text><text x="81" y="78" class="d-tm d-ctr">Perlin / simplex</text>
<rect x="166" y="36" width="130" height="54" rx="7" class="d-box"/><text x="231" y="60" class="d-t d-ctr">Octaves</text><text x="231" y="78" class="d-tm d-ctr">detail at scales</text>
<rect x="316" y="36" width="130" height="54" rx="7" class="d-box"/><text x="381" y="60" class="d-t d-ctr">Falloff / curve</text><text x="381" y="78" class="d-tm d-ctr">islands, plateaus</text>
<rect x="466" y="36" width="140" height="54" rx="7" class="d-box"/><text x="536" y="60" class="d-t d-ctr">Mesh generation</text><text x="536" y="78" class="d-tm d-ctr">verts + triangles</text>
<rect x="626" y="36" width="138" height="54" rx="7" class="d-box d-accent2"/><text x="695" y="60" class="d-t d-ctr">Chunks + LOD</text><text x="695" y="78" class="d-tm d-ctr">stream by distance</text>
<path d="M146 63 H164" class="d-line" marker-end="url(#pp-a)"/>
<path d="M296 63 H314" class="d-line" marker-end="url(#pp-a)"/>
<path d="M446 63 H464" class="d-line" marker-end="url(#pp-a)"/>
<path d="M606 63 H624" class="d-line" marker-end="url(#pp-a)"/>

<rect x="16" y="110" width="366" height="76" rx="8" class="d-panel"/>
<text x="32" y="132" class="d-h">Parameters that matter</text>
<text x="32" y="154" class="d-tm">persistence — how fast octave amplitude falls</text>
<text x="32" y="174" class="d-tm">lacunarity — how fast octave frequency rises</text>

<rect x="398" y="110" width="366" height="76" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="132" class="d-h">Always seed it</text>
<text x="414" y="154" class="d-tm">A fixed seed makes generation reproducible, which</text>
<text x="414" y="174" class="d-tm">is the difference between debugging and guessing.</text>

<rect x="16" y="200" width="748" height="30" rx="6" class="d-box d-warn"/>
<text x="32" y="220" class="d-tm">Mesh generation is the expensive stage — it is the natural candidate for the Job System, which is exactly where most series take it.</text>
</svg>`
},

"unity-ai-modes": {
  title: "Unity AI: three products, three jobs",
  caption: "What replaced Muse and Sentis, and which piece has no alternative elsewhere.",
  svg: `<svg viewBox="0 0 780 240" role="img" aria-label="Unity AI components">
<rect x="16" y="24" width="240" height="150" rx="9" class="d-panel"/>
<text x="136" y="48" class="d-h d-ctr">Assistant</text>
<text x="32" y="74" class="d-tm">project-aware editor chat</text>
<text x="32" y="96" class="d-tm">ask · plan · agent modes</text>
<text x="32" y="118" class="d-tm">writes C#, automates edits</text>
<rect x="32" y="132" width="208" height="28" rx="5" class="d-box d-part"/><text x="136" y="151" class="d-t d-ctr">replaced Muse Chat</text>

<rect x="270" y="24" width="240" height="150" rx="9" class="d-panel"/>
<text x="390" y="48" class="d-h d-ctr">Generators</text>
<text x="286" y="74" class="d-tm">sprites, textures, animation</text>
<text x="286" y="96" class="d-tm">and sound</text>
<text x="286" y="118" class="d-tm">publishes into Unity assets</text>
<rect x="286" y="132" width="208" height="28" rx="5" class="d-box d-part"/><text x="390" y="151" class="d-t d-ctr">check licensing before shipping</text>

<rect x="524" y="24" width="240" height="150" rx="9" class="d-panel d-panel-good"/>
<text x="644" y="48" class="d-h d-ctr">Inference Engine</text>
<text x="540" y="74" class="d-tm">runs models locally</text>
<text x="540" y="96" class="d-tm">editor or shipped runtime</text>
<text x="540" y="118" class="d-tm">no data leaves the device</text>
<rect x="540" y="132" width="208" height="28" rx="5" class="d-box d-yes"/><text x="644" y="151" class="d-t d-ctr">formerly Sentis — the unique piece</text>

<rect x="16" y="192" width="748" height="38" rx="7" class="d-box d-warn"/>
<text x="32" y="210" class="d-t">Use it for work you could verify yourself but would rather not type.</text>
<text x="32" y="226" class="d-tm">Generated code that looks plausible and is subtly wrong is most dangerous for the audience most attracted to it.</text>
</svg>`
}

};
