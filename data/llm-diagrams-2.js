/* Learning Hub — additional LLM diagrams. Merged into the shared registry. */
window.UNITY_DIAGRAMS = Object.assign(window.UNITY_DIAGRAMS || {}, {

"sampling": {
  title: "Temperature, top-k and top-p",
  caption: "The model always produces the same distribution. These parameters only change how a token is picked from it — which is why 'make it less creative' is a sampling question, not a prompting one.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Sampling parameters">
<text x="16" y="24" class="d-h">The raw distribution (identical every time for the same context)</text>
<rect x="16" y="34" width="120" height="16" rx="3" class="d-seg d-seg1"/><text x="142" y="47" class="d-tm">mat 0.40</text>
<rect x="16" y="54" width="75" height="16" rx="3" class="d-seg d-seg1"/><text x="142" y="67" class="d-tm">floor 0.25</text>
<rect x="16" y="74" width="45" height="16" rx="3" class="d-seg d-seg1"/><text x="142" y="87" class="d-tm">roof 0.15</text>
<rect x="16" y="94" width="24" height="16" rx="3" class="d-seg d-seg1"/><text x="142" y="107" class="d-tm">bed 0.08</text>
<rect x="16" y="114" width="9" height="16" rx="3" class="d-seg d-seg1"/><text x="142" y="127" class="d-tm">…long tail</text>

<rect x="240" y="30" width="170" height="106" rx="8" class="d-panel"/>
<text x="325" y="52" class="d-h d-ctr">temperature</text>
<text x="256" y="74" class="d-tm">0 → always the top token</text>
<text x="256" y="92" class="d-tm">&lt;1 → sharper, safer</text>
<text x="256" y="110" class="d-tm">&gt;1 → flatter, wilder</text>
<text x="256" y="128" class="d-tm">rescales before softmax</text>

<rect x="424" y="30" width="166" height="106" rx="8" class="d-panel"/>
<text x="507" y="52" class="d-h d-ctr">top-k</text>
<text x="440" y="74" class="d-tm">keep the k best,</text>
<text x="440" y="92" class="d-tm">discard the rest</text>
<text x="440" y="116" class="d-tm">fixed count, ignores</text>
<text x="440" y="130" class="d-tm">how peaked it is</text>

<rect x="604" y="30" width="160" height="106" rx="8" class="d-panel d-panel-good"/>
<text x="684" y="52" class="d-h d-ctr">top-p (nucleus)</text>
<text x="620" y="74" class="d-tm">keep the smallest set</text>
<text x="620" y="92" class="d-tm">summing to p</text>
<text x="620" y="116" class="d-tm">adapts: few tokens when</text>
<text x="620" y="130" class="d-tm">confident, many when not</text>

<rect x="16" y="156" width="366" height="70" rx="8" class="d-panel d-panel-good"/>
<text x="32" y="178" class="d-h">Want reproducible output?</text>
<text x="32" y="198" class="d-tm">temperature 0. Same input, same output — the usual</text>
<text x="32" y="215" class="d-tm">choice for extraction, classification and structured data.</text>

<rect x="398" y="156" width="366" height="70" rx="8" class="d-panel"/>
<text x="414" y="178" class="d-h">Want variety?</text>
<text x="414" y="198" class="d-tm">Raise temperature to ~0.8–1.0 and use top-p ~0.9.</text>
<text x="414" y="215" class="d-tm">Brainstorming, drafting, anything you will curate.</text>

<rect x="16" y="242" width="748" height="64" rx="7" class="d-box d-warn"/>
<text x="32" y="262" class="d-t">Two things people get wrong</text>
<text x="32" y="282" class="d-tm">Temperature 0 is not "more accurate" — it is more repeatable. A confident hallucination stays confident at temperature 0.</text>
<text x="32" y="298" class="d-tm">And stacking a low temperature with an aggressive top-k on a reasoning model can truncate its reasoning. Change one at a time.</text>
</svg>`
},

"chat-format": {
  title: "What a chat actually looks like to the model",
  caption: "There is no conversation object. There is one long formatted string with role markers, rebuilt and re-sent on every single turn.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Chat message format">
<defs><marker id="cf-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">What your app sends</text>
<rect x="16" y="34" width="330" height="200" rx="9" class="d-panel"/>
<rect x="32" y="50" width="298" height="42" rx="6" class="d-box d-accent2"/>
<text x="44" y="68" class="d-t">system</text><text x="44" y="84" class="d-tm">who you are, rules, format</text>
<rect x="32" y="100" width="298" height="34" rx="6" class="d-box d-accent"/>
<text x="44" y="122" class="d-t">user — "explain attention"</text>
<rect x="32" y="142" width="298" height="34" rx="6" class="d-box"/>
<text x="44" y="164" class="d-t">assistant — (its earlier reply)</text>
<rect x="32" y="184" width="298" height="34" rx="6" class="d-box d-accent"/>
<text x="44" y="206" class="d-t">user — "now with an example"</text>

<path d="M346 134 H386" class="d-line" marker-end="url(#cf-a)"/>

<text x="398" y="24" class="d-h">What the model receives</text>
<rect x="398" y="34" width="366" height="200" rx="9" class="d-panel d-panel-good"/>
<text x="414" y="58" class="d-code">&lt;|system|&gt;who you are…&lt;|end|&gt;</text>
<text x="414" y="82" class="d-code">&lt;|user|&gt;explain attention&lt;|end|&gt;</text>
<text x="414" y="106" class="d-code">&lt;|assistant|&gt;…&lt;|end|&gt;</text>
<text x="414" y="130" class="d-code">&lt;|user|&gt;now with an example&lt;|end|&gt;</text>
<text x="414" y="154" class="d-code">&lt;|assistant|&gt;</text>
<text x="414" y="184" class="d-tm">One flat token sequence. The special markers are</text>
<text x="414" y="201" class="d-tm">learned during finetuning — they are how the model</text>
<text x="414" y="218" class="d-tm">tells the roles apart at all.</text>

<rect x="16" y="250" width="366" height="60" rx="8" class="d-box d-warn"/>
<text x="32" y="270" class="d-t">The system prompt is not privileged</text>
<text x="32" y="290" class="d-tm">It is text in the same sequence, earlier. Strongly attended to,</text>
<text x="32" y="304" class="d-tm">but not enforced — which is why jailbreaks are possible at all.</text>

<rect x="398" y="250" width="366" height="60" rx="8" class="d-panel">
</rect>
<text x="414" y="270" class="d-h">Each model has its own template</text>
<text x="414" y="290" class="d-tm">Use the tokenizer's apply_chat_template rather than</text>
<text x="414" y="304" class="d-tm">hand-formatting; the wrong markers degrade quality badly.</text>
</svg>`
},

"tool-calling": {
  title: "Structured output and tool calling",
  caption: "The same underlying mechanism serves both: constrain what the model may emit, then interpret it as data rather than prose.",
  svg: `<svg viewBox="0 0 780 310" role="img" aria-label="Tool calling flow">
<defs><marker id="tc-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="34" width="150" height="52" rx="7" class="d-box d-accent"/><text x="91" y="56" class="d-t d-ctr">You declare</text><text x="91" y="74" class="d-tm d-ctr">a JSON schema</text>
<rect x="196" y="34" width="160" height="52" rx="7" class="d-box"/><text x="276" y="56" class="d-t d-ctr">Model emits</text><text x="276" y="74" class="d-tm d-ctr">a matching object</text>
<rect x="386" y="34" width="160" height="52" rx="7" class="d-box d-accent2"/><text x="466" y="56" class="d-t d-ctr">Your code runs</text><text x="466" y="74" class="d-tm d-ctr">the real function</text>
<rect x="576" y="34" width="188" height="52" rx="7" class="d-box"/><text x="670" y="56" class="d-t d-ctr">Result back in</text><text x="670" y="74" class="d-tm d-ctr">as a tool message</text>
<path d="M166 60 H194" class="d-line" marker-end="url(#tc-a)"/>
<path d="M356 60 H384" class="d-line" marker-end="url(#tc-a)"/>
<path d="M546 60 H574" class="d-line" marker-end="url(#tc-a)"/>
<path d="M670 86 V106 H276 V88" class="d-line d-dash" marker-end="url(#tc-a)"/>
<text x="470" y="102" class="d-tm">model continues with the answer</text>

<rect x="16" y="126" width="366" height="86" rx="8" class="d-panel d-panel-good"/>
<text x="32" y="148" class="d-h">Constrained decoding</text>
<text x="32" y="170" class="d-tm">Strict modes mask out any token that would break the</text>
<text x="32" y="187" class="d-tm">schema at each step, so the output is valid by construction</text>
<text x="32" y="204" class="d-tm">rather than valid by luck. Prefer it where offered.</text>

<rect x="398" y="126" width="366" height="86" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="148" class="d-h">Valid ≠ correct</text>
<text x="414" y="170" class="d-tm">A schema guarantees shape, never truth. The model can</text>
<text x="414" y="187" class="d-tm">return perfectly formed JSON with an invented value in it.</text>
<text x="414" y="204" class="d-tm">Validate meaning separately from structure.</text>

<rect x="16" y="228" width="748" height="72" rx="8" class="d-box d-warn"/>
<text x="32" y="248" class="d-t">The model never executes anything</text>
<text x="32" y="268" class="d-tm">It only produces a request to call a function. Your code decides whether to honour it. That boundary is the entire security</text>
<text x="32" y="284" class="d-tm">model: validate arguments, enforce permissions, and never let a tool's own output escalate what the next call is allowed to do.</text>
</svg>`
},

"vector-db": {
  title: "Where retrieval actually runs",
  caption: "Exhaustive comparison is exact and slow; approximate indexes trade a little recall for orders of magnitude of speed. That trade is the whole product category.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Vector database index types">
<rect x="16" y="30" width="240" height="126" rx="9" class="d-panel"/>
<text x="136" y="54" class="d-h d-ctr">Flat / exact</text>
<text x="32" y="78" class="d-tm">Compare against every vector</text>
<text x="32" y="100" class="d-tm">100% recall, linear cost</text>
<rect x="32" y="112" width="208" height="30" rx="5" class="d-box d-yes"/>
<text x="136" y="132" class="d-tm d-ctr">right up to ~100k chunks</text>

<rect x="270" y="30" width="240" height="126" rx="9" class="d-panel d-panel-good"/>
<text x="390" y="54" class="d-h d-ctr">HNSW</text>
<text x="286" y="78" class="d-tm">Navigable graph, greedy walk</text>
<text x="286" y="100" class="d-tm">Fast, high recall, memory hungry</text>
<rect x="286" y="112" width="208" height="30" rx="5" class="d-box d-yes"/>
<text x="390" y="132" class="d-tm d-ctr">the usual default at scale</text>

<rect x="524" y="30" width="240" height="126" rx="9" class="d-panel"/>
<text x="644" y="54" class="d-h d-ctr">IVF + PQ</text>
<text x="540" y="78" class="d-tm">Cluster, then compress vectors</text>
<text x="540" y="100" class="d-tm">Much smaller, some recall lost</text>
<rect x="540" y="112" width="208" height="30" rx="5" class="d-box d-part"/>
<text x="644" y="132" class="d-tm d-ctr">when memory is the constraint</text>

<rect x="16" y="172" width="366" height="56" rx="8" class="d-panel"/>
<text x="32" y="192" class="d-h">Metadata filtering is not a detail</text>
<text x="32" y="212" class="d-tm">Filtering by tenant, date or permission before the search is</text>
<text x="32" y="225" class="d-tm">often what makes results correct — and what keeps them legal.</text>

<rect x="398" y="172" width="366" height="56" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="192" class="d-h">Re-indexing is a migration</text>
<text x="414" y="212" class="d-tm">Change the embedding model and every stored vector is</text>
<text x="414" y="225" class="d-tm">meaningless. Budget for it before you pick one.</text>

<rect x="16" y="244" width="748" height="46" rx="7" class="d-box d-warn"/>
<text x="32" y="264" class="d-t">Do not start with a vector database.</text>
<text x="32" y="282" class="d-tm">Below roughly 100k chunks, an exact search over an array in memory — or pgvector in a database you already run — is simpler, exact, and fast enough.</text>
</svg>`
},

"token-cost": {
  title: "Where the money goes",
  caption: "Cost is a function of tokens, not requests. A long conversation gets more expensive every turn, because the whole history is re-sent each time.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Token cost breakdown">
<text x="16" y="24" class="d-h">Turn 1 — cheap</text>
<rect x="16" y="34" width="748" height="30" rx="6" class="d-box"/>
<rect x="18" y="36" width="90" height="26" rx="4" class="d-seg d-seg1"/><text x="63" y="54" class="d-t d-ctr">system</text>
<rect x="110" y="36" width="60" height="26" class="d-seg d-seg4"/><text x="140" y="54" class="d-t d-ctr">ask</text>
<rect x="172" y="36" width="80" height="26" rx="4" class="d-seg d-seg2"/><text x="212" y="54" class="d-t d-ctr">reply</text>

<text x="16" y="94" class="d-h">Turn 5 — the same question costs several times more</text>
<rect x="16" y="104" width="748" height="30" rx="6" class="d-box"/>
<rect x="18" y="106" width="90" height="26" rx="4" class="d-seg d-seg1"/><text x="63" y="124" class="d-t d-ctr">system</text>
<rect x="110" y="106" width="400" height="26" class="d-seg d-seg3"/><text x="310" y="124" class="d-t d-ctr">the whole conversation so far, re-sent</text>
<rect x="512" y="106" width="60" height="26" class="d-seg d-seg4"/><text x="542" y="124" class="d-t d-ctr">ask</text>
<rect x="574" y="106" width="80" height="26" rx="4" class="d-seg d-seg2"/><text x="614" y="124" class="d-t d-ctr">reply</text>

<rect x="16" y="156" width="240" height="78" rx="8" class="d-panel d-panel-good"/>
<text x="136" y="178" class="d-h d-ctr">Prompt caching</text>
<text x="32" y="200" class="d-tm">A long, stable prefix can be</text>
<text x="32" y="217" class="d-tm">cached — large discount on the</text>
<text x="32" y="230" class="d-tm">repeated part. Keep it stable.</text>

<rect x="270" y="156" width="240" height="78" rx="8" class="d-panel d-panel-good"/>
<text x="390" y="178" class="d-h d-ctr">Route by difficulty</text>
<text x="286" y="200" class="d-tm">Most traffic does not need the</text>
<text x="286" y="217" class="d-tm">largest model. A cheap model for</text>
<text x="286" y="230" class="d-tm">easy cases cuts spend sharply.</text>

<rect x="524" y="156" width="240" height="78" rx="8" class="d-panel d-panel-good"/>
<text x="644" y="178" class="d-h d-ctr">Cap the output</text>
<text x="540" y="200" class="d-tm">Output tokens cost several times</text>
<text x="540" y="217" class="d-tm">input. Asking for brevity is a</text>
<text x="540" y="230" class="d-tm">real cost control, not just style.</text>

<rect x="16" y="250" width="748" height="42" rx="7" class="d-box d-warn"/>
<text x="32" y="270" class="d-t">Estimate before you build: tokens per request × requests per day × price.</text>
<text x="32" y="286" class="d-tm">Teams routinely discover at launch that the per-user economics never worked. Ten minutes with a spreadsheet prevents it.</text>
</svg>`
},

"prompt-injection": {
  title: "Prompt injection: the paths in",
  caption: "The model cannot distinguish your instructions from text that arrives inside its context. Every channel that reaches the context is an attack surface.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Prompt injection attack paths">
<defs><marker id="pi-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="300" y="126" width="180" height="56" rx="8" class="d-box d-accent"/>
<text x="390" y="148" class="d-t d-ctr">Model context</text>
<text x="390" y="167" class="d-tm d-ctr">all text looks alike here</text>

<rect x="16" y="30" width="200" height="48" rx="7" class="d-box"/><text x="116" y="50" class="d-t d-ctr">Your system prompt</text><text x="116" y="68" class="d-tm d-ctr">trusted</text>
<rect x="16" y="96" width="200" height="48" rx="7" class="d-box d-part"/><text x="116" y="116" class="d-t d-ctr">User input</text><text x="116" y="134" class="d-tm d-ctr">semi-trusted</text>
<rect x="16" y="162" width="200" height="48" rx="7" class="d-box d-no"/><text x="116" y="182" class="d-t d-ctr">Retrieved documents</text><text x="116" y="200" class="d-tm d-ctr">untrusted</text>
<rect x="16" y="228" width="200" height="48" rx="7" class="d-box d-no"/><text x="116" y="248" class="d-t d-ctr">Fetched web pages</text><text x="116" y="266" class="d-tm d-ctr">untrusted</text>
<rect x="16" y="294" width="200" height="22" rx="5" class="d-box d-no"/><text x="116" y="310" class="d-tm d-ctr">tool output, file contents, email</text>

<path d="M216 54 L298 140" class="d-line" marker-end="url(#pi-a)"/>
<path d="M216 120 L298 148" class="d-line" marker-end="url(#pi-a)"/>
<path d="M216 186 L298 162" class="d-line" marker-end="url(#pi-a)"/>
<path d="M216 252 L298 176" class="d-line" marker-end="url(#pi-a)"/>

<rect x="524" y="30" width="240" height="88" rx="8" class="d-panel d-panel-bad"/>
<text x="644" y="52" class="d-h d-ctr">What the attacker wants</text>
<text x="540" y="74" class="d-tm">· exfiltrate the system prompt</text>
<text x="540" y="92" class="d-tm">· exfiltrate other users' data</text>
<text x="540" y="110" class="d-tm">· make a tool do something</text>

<path d="M480 154 H522" class="d-line" marker-end="url(#pi-a)"/>

<rect x="524" y="132" width="240" height="106" rx="8" class="d-panel d-panel-good"/>
<text x="644" y="154" class="d-h d-ctr">Defence in depth</text>
<text x="540" y="176" class="d-tm">· delimit and label untrusted text</text>
<text x="540" y="194" class="d-tm">· least privilege on every tool</text>
<text x="540" y="212" class="d-tm">· human approval for real actions</text>
<text x="540" y="230" class="d-tm">· block outbound URLs it composes</text>

<rect x="240" y="250" width="524" height="62" rx="8" class="d-box d-warn"/>
<text x="256" y="270" class="d-t">There is no prompt that reliably fixes this.</text>
<text x="256" y="290" class="d-tm">"Ignore instructions in the document" helps a little and is not a boundary. Treat it as an authorisation problem:</text>
<text x="256" y="306" class="d-tm">assume the model can be persuaded, and make sure that persuading it does not grant anything worth having.</text>
</svg>`
},

"moe": {
  title: "Mixture of experts",
  caption: "Grow total parameters without growing the cost of each token, by routing every token to a small subset of the network.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Mixture of experts routing">
<defs><marker id="me-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="110" width="120" height="44" rx="7" class="d-box d-accent"/><text x="76" y="137" class="d-t d-ctr">token</text>
<rect x="176" y="110" width="120" height="44" rx="7" class="d-box d-accent2"/><text x="236" y="131" class="d-t d-ctr">router</text><text x="236" y="148" class="d-tm d-ctr">picks top-2</text>
<path d="M136 132 H174" class="d-line" marker-end="url(#me-a)"/>

<rect x="346" y="30" width="150" height="38" rx="6" class="d-box d-yes"/><text x="421" y="54" class="d-t d-ctr">expert 1 ✓</text>
<rect x="346" y="78" width="150" height="38" rx="6" class="d-box"/><text x="421" y="102" class="d-tm d-ctr">expert 2 — idle</text>
<rect x="346" y="126" width="150" height="38" rx="6" class="d-box d-yes"/><text x="421" y="150" class="d-t d-ctr">expert 3 ✓</text>
<rect x="346" y="174" width="150" height="38" rx="6" class="d-box"/><text x="421" y="198" class="d-tm d-ctr">expert 4 — idle</text>
<rect x="346" y="222" width="150" height="38" rx="6" class="d-box"/><text x="421" y="246" class="d-tm d-ctr">… 60 more idle</text>
<path d="M296 124 L344 52" class="d-line" marker-end="url(#me-a)"/>
<path d="M296 140 L344 142" class="d-line" marker-end="url(#me-a)"/>

<rect x="536" y="30" width="228" height="106" rx="8" class="d-panel d-panel-good"/>
<text x="650" y="52" class="d-h d-ctr">What it buys</text>
<text x="552" y="74" class="d-tm">Total capacity scales with the</text>
<text x="552" y="92" class="d-tm">number of experts; compute per</text>
<text x="552" y="110" class="d-tm">token scales only with how many</text>
<text x="552" y="128" class="d-tm">are active. Big model, small bill.</text>

<rect x="536" y="150" width="228" height="110" rx="8" class="d-panel d-panel-bad"/>
<text x="650" y="172" class="d-h d-ctr">What it costs</text>
<text x="552" y="194" class="d-tm">Every expert still occupies</text>
<text x="552" y="212" class="d-tm">memory, so VRAM tracks total</text>
<text x="552" y="230" class="d-tm">parameters, not active ones.</text>
<text x="552" y="250" class="d-tm">Routing also needs balancing.</text>

<rect x="16" y="272" width="748" height="26" rx="6" class="d-box d-warn"/>
<text x="32" y="290" class="d-tm">Read "active parameters" not "total parameters" when comparing MoE models — the second number describes memory, the first describes speed and roughly the capability per token.</text>
</svg>`
},

"test-time-compute": {
  title: "Reasoning models and test-time compute",
  caption: "A second scaling axis. Instead of a bigger model, spend more computation at answer time — thinking longer before replying.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Test time compute">
<defs><marker id="tt-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Standard model</text>
<rect x="16" y="34" width="360" height="56" rx="8" class="d-panel"/>
<rect x="34" y="50" width="90" height="24" rx="4" class="d-seg d-seg4"/><text x="79" y="67" class="d-tm d-ctr">question</text>
<rect x="134" y="50" width="220" height="24" rx="4" class="d-seg d-seg2"/><text x="244" y="67" class="d-tm d-ctr">answer, immediately</text>

<text x="398" y="24" class="d-h">Reasoning model</text>
<rect x="398" y="34" width="366" height="56" rx="8" class="d-panel d-panel-good"/>
<rect x="414" y="50" width="70" height="24" rx="4" class="d-seg d-seg4"/><text x="449" y="67" class="d-tm d-ctr">question</text>
<rect x="490" y="50" width="180" height="24" rx="4" class="d-seg d-seg3"/><text x="580" y="67" class="d-tm d-ctr">hidden reasoning tokens</text>
<rect x="676" y="50" width="72" height="24" rx="4" class="d-seg d-seg2"/><text x="712" y="67" class="d-tm d-ctr">answer</text>

<rect x="16" y="110" width="366" height="94" rx="8" class="d-panel"/>
<text x="32" y="132" class="d-h">How it was trained</text>
<text x="32" y="154" class="d-tm">Reinforcement learning on problems with checkable</text>
<text x="32" y="171" class="d-tm">answers — maths, code. Because the reward is ground</text>
<text x="32" y="188" class="d-tm">truth rather than a learned proxy, it can be optimised</text>
<text x="32" y="200" class="d-tm">hard without the usual reward hacking.</text>

<rect x="398" y="110" width="366" height="94" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="132" class="d-h">Where the gains are not</text>
<text x="414" y="154" class="d-tm">Improvement concentrates in verifiable domains. On</text>
<text x="414" y="171" class="d-tm">open-ended writing, summarisation or taste, extra</text>
<text x="414" y="188" class="d-tm">thinking buys little — and costs latency and tokens</text>
<text x="414" y="200" class="d-tm">you are still paying for.</text>

<rect x="16" y="220" width="748" height="68" rx="8" class="d-box d-warn"/>
<text x="32" y="240" class="d-t">Prompt them differently</text>
<text x="32" y="260" class="d-tm">Do not say "think step by step" — they already do, and prescribing a procedure can cut across their trained one.</text>
<text x="32" y="278" class="d-tm">State the goal, the constraints and what a good answer looks like, then let the model choose its own route.</text>
</svg>`
},

"parallelism": {
  title: "Splitting training across many GPUs",
  caption: "Three ways to divide the work, usually combined. Which you need depends on what does not fit: the batch, the layer, or the model.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Parallelism strategies">
<rect x="16" y="30" width="240" height="136" rx="9" class="d-panel d-panel-good"/>
<text x="136" y="54" class="d-h d-ctr">Data parallel</text>
<text x="32" y="78" class="d-tm">Full model on every GPU,</text>
<text x="32" y="95" class="d-tm">different batch slice on each.</text>
<text x="32" y="117" class="d-tm">Gradients averaged each step.</text>
<rect x="32" y="128" width="208" height="28" rx="5" class="d-box d-yes"/>
<text x="136" y="147" class="d-tm d-ctr">simplest — start here</text>

<rect x="270" y="30" width="240" height="136" rx="9" class="d-panel"/>
<text x="390" y="54" class="d-h d-ctr">Tensor parallel</text>
<text x="286" y="78" class="d-tm">One layer's matrices split</text>
<text x="286" y="95" class="d-tm">across GPUs; each holds a shard.</text>
<text x="286" y="117" class="d-tm">Communicates within every layer.</text>
<rect x="286" y="128" width="208" height="28" rx="5" class="d-box d-part"/>
<text x="390" y="147" class="d-tm d-ctr">needs fast interconnect</text>

<rect x="524" y="30" width="240" height="136" rx="9" class="d-panel"/>
<text x="644" y="54" class="d-h d-ctr">Pipeline parallel</text>
<text x="540" y="78" class="d-tm">Different layers on different</text>
<text x="540" y="95" class="d-tm">GPUs; activations flow along.</text>
<text x="540" y="117" class="d-tm">Micro-batches hide the bubble.</text>
<rect x="540" y="128" width="208" height="28" rx="5" class="d-box d-part"/>
<text x="644" y="147" class="d-tm d-ctr">idle time is the cost</text>

<rect x="16" y="182" width="366" height="60" rx="8" class="d-panel"/>
<text x="32" y="202" class="d-h">What actually runs out first</text>
<text x="32" y="222" class="d-tm">Not the weights — the optimiser state and activations.</text>
<text x="32" y="236" class="d-tm">ZeRO/FSDP shard those across GPUs and often suffice alone.</text>

<rect x="398" y="182" width="366" height="60" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="202" class="d-h">Cheaper before you go distributed</text>
<text x="414" y="222" class="d-tm">Mixed precision, gradient checkpointing, gradient</text>
<text x="414" y="236" class="d-tm">accumulation. Try all three before adding machines.</text>

<rect x="16" y="258" width="748" height="30" rx="6" class="d-box d-warn"/>
<text x="32" y="278" class="d-tm">Frontier runs combine all three — typically tensor parallel inside a node where bandwidth is high, pipeline and data parallel across nodes.</text>
</svg>`
},

"distillation": {
  title: "Distillation and the case for small models",
  caption: "A large model teaches a small one on your task. The result is cheaper, faster, private — and narrower.",
  svg: `<svg viewBox="0 0 780 290" role="img" aria-label="Model distillation">
<defs><marker id="di-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="40" width="170" height="70" rx="8" class="d-box d-accent"/>
<text x="101" y="66" class="d-t d-ctr">Teacher</text><text x="101" y="85" class="d-tm d-ctr">large, expensive,</text><text x="101" y="100" class="d-tm d-ctr">already good at the task</text>
<rect x="236" y="40" width="170" height="70" rx="8" class="d-box"/>
<text x="321" y="66" class="d-t d-ctr">Generate</text><text x="321" y="85" class="d-tm d-ctr">answers on your real</text><text x="321" y="100" class="d-tm d-ctr">inputs, then filter hard</text>
<rect x="456" y="40" width="170" height="70" rx="8" class="d-box d-accent2"/>
<text x="541" y="66" class="d-t d-ctr">Student</text><text x="541" y="85" class="d-tm d-ctr">small model finetuned</text><text x="541" y="100" class="d-tm d-ctr">on those pairs</text>
<rect x="656" y="40" width="108" height="70" rx="8" class="d-box d-yes"/>
<text x="710" y="70" class="d-t d-ctr">Ship</text><text x="710" y="90" class="d-tm d-ctr">10–50× cheaper</text>
<path d="M186 75 H234" class="d-line" marker-end="url(#di-a)"/>
<path d="M406 75 H454" class="d-line" marker-end="url(#di-a)"/>
<path d="M626 75 H654" class="d-line" marker-end="url(#di-a)"/>

<rect x="16" y="130" width="366" height="86" rx="8" class="d-panel d-panel-good"/>
<text x="32" y="152" class="d-h">Why it works so well</text>
<text x="32" y="174" class="d-tm">A narrow task needs a fraction of a frontier model's</text>
<text x="32" y="191" class="d-tm">generality. On one well-defined job a small student</text>
<text x="32" y="208" class="d-tm">often matches its teacher at a fraction of the cost.</text>

<rect x="398" y="130" width="366" height="86" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="152" class="d-h">What you give up</text>
<text x="414" y="174" class="d-tm">Everything outside the distilled task. The student will</text>
<text x="414" y="191" class="d-tm">fail on adjacent requests it was never shown, often</text>
<text x="414" y="208" class="d-tm">confidently. Scope it deliberately and evaluate the edges.</text>

<rect x="16" y="232" width="748" height="44" rx="7" class="d-box d-warn"/>
<text x="32" y="252" class="d-t">Check the teacher model's terms before you start.</text>
<text x="32" y="270" class="d-tm">Some providers restrict using outputs to train competing models. This is a licensing question, not only a technical one.</text>
</svg>`
},

"multimodal": {
  title: "How a model sees an image",
  caption: "The same transformer, fed a different kind of token. Images become patch embeddings that sit in the sequence alongside text.",
  svg: `<svg viewBox="0 0 780 280" role="img" aria-label="Multimodal input processing">
<defs><marker id="mm-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="40" width="110" height="80" rx="7" class="d-box"/>
<text x="71" y="66" class="d-t d-ctr">Image</text>
<rect x="32" y="76" width="26" height="26" class="d-seg d-seg1"/><rect x="60" y="76" width="26" height="26" class="d-seg d-seg2"/><rect x="88" y="76" width="26" height="26" class="d-seg d-seg3"/>
<text x="71" y="114" class="d-tm d-ctr">split into patches</text>

<rect x="166" y="40" width="140" height="80" rx="7" class="d-box d-accent"/>
<text x="236" y="70" class="d-t d-ctr">Vision encoder</text><text x="236" y="90" class="d-tm d-ctr">patch → vector</text><text x="236" y="107" class="d-tm d-ctr">(often a ViT)</text>

<rect x="346" y="40" width="140" height="80" rx="7" class="d-box d-accent2"/>
<text x="416" y="70" class="d-t d-ctr">Projection</text><text x="416" y="90" class="d-tm d-ctr">into the same space</text><text x="416" y="107" class="d-tm d-ctr">as text embeddings</text>

<rect x="526" y="40" width="238" height="80" rx="7" class="d-box d-yes"/>
<text x="645" y="66" class="d-t d-ctr">One sequence</text>
<text x="645" y="88" class="d-tm d-ctr">[img][img][img] "what is in this?"</text>
<text x="645" y="107" class="d-tm d-ctr">attention treats them alike</text>

<path d="M126 80 H164" class="d-line" marker-end="url(#mm-a)"/>
<path d="M306 80 H344" class="d-line" marker-end="url(#mm-a)"/>
<path d="M486 80 H524" class="d-line" marker-end="url(#mm-a)"/>

<rect x="16" y="140" width="366" height="76" rx="8" class="d-panel"/>
<text x="32" y="162" class="d-h">Images are expensive in tokens</text>
<text x="32" y="184" class="d-tm">A single high-resolution image can cost as much context</text>
<text x="32" y="201" class="d-tm">as a page of text. Resize before sending unless the detail</text>
<text x="32" y="214" class="d-tm">genuinely matters — it usually does not.</text>

<rect x="398" y="140" width="366" height="76" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="162" class="d-h">Reliable, and not</text>
<text x="414" y="184" class="d-tm">Good: describing scenes, reading clear text, extracting</text>
<text x="414" y="201" class="d-tm">structure from documents. Weak: precise spatial relations,</text>
<text x="414" y="214" class="d-tm">counting many objects, dense small text, exact measurement.</text>

<rect x="16" y="232" width="748" height="34" rx="6" class="d-box d-warn"/>
<text x="32" y="253" class="d-tm">Images are untrusted input too: text inside a picture can carry instructions, and the model reads it. A screenshot is an injection vector.</text>
</svg>`
}

});
