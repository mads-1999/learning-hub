/* Learning Hub — original SVG diagrams for the LLM track.
   Merged into the shared diagram registry. Colours come from CSS variables
   so both themes work. */
window.UNITY_DIAGRAMS = Object.assign(window.UNITY_DIAGRAMS || {}, {

"next-token": {
  title: "What an LLM actually computes",
  caption: "A language model does exactly one thing: given a sequence, produce a probability distribution over the next token. Everything else — chat, reasoning, code — is built on repeating that.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Next token prediction">
<defs><marker id="nt-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Input context</text>
<rect x="16" y="34" width="66" height="34" rx="5" class="d-box d-accent"/><text x="49" y="56" class="d-t d-ctr">The</text>
<rect x="88" y="34" width="66" height="34" rx="5" class="d-box d-accent"/><text x="121" y="56" class="d-t d-ctr">cat</text>
<rect x="160" y="34" width="66" height="34" rx="5" class="d-box d-accent"/><text x="193" y="56" class="d-t d-ctr">sat</text>
<rect x="232" y="34" width="66" height="34" rx="5" class="d-box d-accent"/><text x="265" y="56" class="d-t d-ctr">on</text>
<rect x="304" y="34" width="66" height="34" rx="5" class="d-box d-accent"/><text x="337" y="56" class="d-t d-ctr">the</text>
<path d="M386 51 H424" class="d-line" marker-end="url(#nt-a)"/>
<rect x="430" y="30" width="150" height="42" rx="7" class="d-box d-accent2"/><text x="505" y="56" class="d-t d-ctr">the model</text>
<path d="M580 51 H618" class="d-line" marker-end="url(#nt-a)"/>
<text x="628" y="24" class="d-h">Distribution</text>

<rect x="628" y="30" width="136" height="16" rx="3" class="d-seg d-seg6"/>
<rect x="628" y="30" width="88" height="16" rx="3" class="d-seg d-seg1"/><text x="632" y="43" class="d-tm">mat  0.41</text>
<rect x="628" y="50" width="136" height="16" rx="3" class="d-seg d-seg6"/>
<rect x="628" y="50" width="48" height="16" rx="3" class="d-seg d-seg1"/><text x="632" y="63" class="d-tm">floor 0.22</text>
<rect x="628" y="70" width="136" height="16" rx="3" class="d-seg d-seg6"/>
<rect x="628" y="70" width="26" height="16" rx="3" class="d-seg d-seg1"/><text x="632" y="83" class="d-tm">roof 0.09</text>
<text x="628" y="102" class="d-tm">…50,000 more tokens</text>

<rect x="16" y="122" width="366" height="86" rx="8" class="d-panel"/>
<text x="32" y="144" class="d-h">Sampling picks one</text>
<text x="32" y="164" class="d-tm">temperature 0 → always "mat" (deterministic)</text>
<text x="32" y="182" class="d-tm">temperature 1 → samples proportionally</text>
<text x="32" y="200" class="d-tm">higher → flatter distribution, more surprising</text>

<rect x="398" y="122" width="366" height="86" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="144" class="d-h">Then it loops</text>
<text x="414" y="164" class="d-tm">The chosen token is appended to the context</text>
<text x="414" y="182" class="d-tm">and the whole thing runs again. One token at a</text>
<text x="414" y="200" class="d-tm">time, every time — this is autoregression.</text>

<rect x="16" y="226" width="748" height="60" rx="7" class="d-box d-warn"/>
<text x="32" y="246" class="d-t">Why this explains hallucination: the model is always producing a plausible continuation,</text>
<text x="32" y="264" class="d-tm">never consulting a store of facts. A confident wrong answer and a confident right answer are produced by the identical</text>
<text x="32" y="280" class="d-tm">mechanism. "Knowing" and "sounding right" are not separated anywhere in the architecture.</text>
</svg>`
},

"tokenization": {
  title: "Tokenization: why models see neither letters nor words",
  caption: "Text is split into sub-word chunks before the model sees anything. A surprising number of odd model behaviours trace back to this step.",
  svg: `<svg viewBox="0 0 780 290" role="img" aria-label="Tokenization process">
<defs><marker id="tk-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Raw text</text>
<rect x="16" y="34" width="300" height="36" rx="6" class="d-box"/><text x="166" y="57" class="d-t d-ctr">"unbelievable tokenization"</text>
<path d="M316 52 H354" class="d-line" marker-end="url(#tk-a)"/>
<text x="366" y="24" class="d-h">Tokens (what the model receives)</text>
<rect x="366" y="34" width="54" height="36" rx="5" class="d-box d-accent"/><text x="393" y="57" class="d-t d-ctr">un</text>
<rect x="424" y="34" width="66" height="36" rx="5" class="d-box d-accent"/><text x="457" y="57" class="d-t d-ctr">bel</text>
<rect x="494" y="34" width="72" height="36" rx="5" class="d-box d-accent"/><text x="530" y="57" class="d-t d-ctr">iev</text>
<rect x="570" y="34" width="72" height="36" rx="5" class="d-box d-accent"/><text x="606" y="57" class="d-t d-ctr">able</text>
<rect x="646" y="34" width="54" height="36" rx="5" class="d-box d-accent2"/><text x="673" y="57" class="d-t d-ctr">␣token</text>
<rect x="704" y="34" width="60" height="36" rx="5" class="d-box d-accent2"/><text x="734" y="57" class="d-t d-ctr">ization</text>

<rect x="16" y="90" width="748" height="34" rx="6" class="d-box"/>
<text x="32" y="112" class="d-tm">Each token becomes an integer id → 861, 6667, 12061, 481, 11241, 2065 → then an embedding vector the network operates on.</text>

<rect x="16" y="140" width="366" height="94" rx="8" class="d-panel d-panel-bad"/>
<text x="32" y="162" class="d-h">What this breaks</text>
<text x="32" y="182" class="d-tm">· Counting letters ("how many r's in strawberry")</text>
<text x="32" y="199" class="d-tm">· Reversing strings, rhyming, character puzzles</text>
<text x="32" y="216" class="d-tm">· Arithmetic — digits split unpredictably</text>
<text x="32" y="230" class="d-tm">· Rare languages cost many more tokens</text>

<rect x="398" y="140" width="366" height="94" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="162" class="d-h">Why it is done anyway</text>
<text x="414" y="182" class="d-tm">Characters → sequences far too long to attend over.</text>
<text x="414" y="199" class="d-tm">Whole words → vocabulary explodes and every typo</text>
<text x="414" y="216" class="d-tm">is unknown. Sub-words are the compromise: rare</text>
<text x="414" y="230" class="d-tm">words decompose, common words stay single tokens.</text>

<rect x="16" y="250" width="748" height="32" rx="6" class="d-box d-warn"/>
<text x="32" y="271" class="d-tm">Rule of thumb for English: ~4 characters per token, ~0.75 words per token. Billing, context limits and rate limits are all in tokens.</text>
</svg>`
},

"transformer-block": {
  title: "Inside one transformer block",
  caption: "A model is this block repeated dozens of times. Attention moves information between positions; the MLP does the per-position computing.",
  svg: `<svg viewBox="0 0 780 330" role="img" aria-label="Transformer block architecture">
<defs><marker id="tb-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="250" y="16" width="280" height="292" rx="10" class="d-panel"/>
<text x="390" y="38" class="d-h d-ctr">One block (×N layers)</text>

<rect x="276" y="52" width="228" height="34" rx="6" class="d-box"/><text x="390" y="74" class="d-t d-ctr">LayerNorm</text>
<rect x="276" y="98" width="228" height="48" rx="6" class="d-box d-accent"/>
<text x="390" y="118" class="d-t d-ctr">Multi-head self-attention</text>
<text x="390" y="136" class="d-tm d-ctr">positions exchange information</text>
<rect x="276" y="158" width="228" height="30" rx="6" class="d-box d-accent2"/><text x="390" y="178" class="d-t d-ctr">+ residual</text>

<rect x="276" y="200" width="228" height="30" rx="6" class="d-box"/><text x="390" y="220" class="d-t d-ctr">LayerNorm</text>
<rect x="276" y="240" width="228" height="42" rx="6" class="d-box d-accent"/>
<text x="390" y="258" class="d-t d-ctr">Feed-forward MLP</text>
<text x="390" y="274" class="d-tm d-ctr">most of the parameters live here</text>

<path d="M390 86 V96" class="d-line" marker-end="url(#tb-a)"/>
<path d="M390 146 V156" class="d-line" marker-end="url(#tb-a)"/>
<path d="M390 188 V198" class="d-line" marker-end="url(#tb-a)"/>
<path d="M390 230 V238" class="d-line" marker-end="url(#tb-a)"/>

<path d="M270 60 H262 V174 H274" class="d-line d-dash" marker-end="url(#tb-a)"/>
<path d="M510 60 H520 V296 H400" class="d-line d-dash" marker-end="url(#tb-a)"/>

<rect x="16" y="60" width="210" height="108" rx="8" class="d-panel d-panel-good"/>
<text x="121" y="82" class="d-h d-ctr">Residual stream</text>
<text x="32" y="104" class="d-tm">Every block reads from and writes</text>
<text x="32" y="121" class="d-tm">back into the same running vector.</text>
<text x="32" y="138" class="d-tm">Gradients flow through it unchanged,</text>
<text x="32" y="155" class="d-tm">which is what makes depth trainable.</text>

<rect x="16" y="190" width="210" height="118" rx="8" class="d-panel"/>
<text x="121" y="212" class="d-h d-ctr">Before block 1</text>
<text x="32" y="234" class="d-tm">token ids → embeddings</text>
<text x="32" y="252" class="d-tm">+ positional information</text>
<text x="32" y="276" class="d-tm">Attention is order-blind on its</text>
<text x="32" y="293" class="d-tm">own; position must be injected.</text>

<rect x="554" y="60" width="210" height="108" rx="8" class="d-panel"/>
<text x="659" y="82" class="d-h d-ctr">After block N</text>
<text x="570" y="104" class="d-tm">final LayerNorm, then a</text>
<text x="570" y="121" class="d-tm">projection to vocabulary size</text>
<text x="570" y="145" class="d-tm">→ logits → softmax</text>
<text x="570" y="162" class="d-tm">→ probability per token</text>

<rect x="554" y="190" width="210" height="118" rx="8" class="d-box d-warn"/>
<text x="659" y="212" class="d-h d-ctr">Scale, concretely</text>
<text x="570" y="234" class="d-tm">GPT-2 small: 12 blocks</text>
<text x="570" y="252" class="d-tm">GPT-3: 96 blocks</text>
<text x="570" y="276" class="d-tm">Frontier models: more blocks,</text>
<text x="570" y="293" class="d-tm">wider vectors, same structure.</text>
</svg>`
},

"self-attention": {
  title: "Self-attention, in plain mechanics",
  caption: "Every token asks a question, every token advertises what it offers, and the match decides who reads from whom.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Self attention query key value">
<defs><marker id="sa-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Three projections of every token</text>
<rect x="16" y="34" width="230" height="52" rx="7" class="d-box d-accent"/><text x="131" y="55" class="d-t d-ctr">Query — "what am I looking for?"</text><text x="131" y="74" class="d-tm d-ctr">the current token's question</text>
<rect x="262" y="34" width="230" height="52" rx="7" class="d-box d-accent2"/><text x="377" y="55" class="d-t d-ctr">Key — "what do I offer?"</text><text x="377" y="74" class="d-tm d-ctr">every token's advertisement</text>
<rect x="508" y="34" width="256" height="52" rx="7" class="d-box d-warn"/><text x="636" y="55" class="d-t d-ctr">Value — "what I actually pass on"</text><text x="636" y="74" class="d-tm d-ctr">the content that gets mixed in</text>

<rect x="16" y="104" width="748" height="58" rx="7" class="d-panel"/>
<text x="32" y="126" class="d-h">The computation</text>
<text x="32" y="148" class="d-code">scores = Q · Kᵀ / √d   →   weights = softmax(scores)   →   output = weights · V</text>

<text x="16" y="192" class="d-h">Worked example: resolving "it"</text>
<rect x="16" y="202" width="748" height="74" rx="7" class="d-panel d-panel-good"/>
<rect x="34" y="218" width="96" height="30" rx="5" class="d-box"/><text x="82" y="238" class="d-t d-ctr">The</text>
<rect x="142" y="218" width="96" height="30" rx="5" class="d-box d-accent2"/><text x="190" y="238" class="d-t d-ctr">animal</text>
<rect x="250" y="218" width="96" height="30" rx="5" class="d-box"/><text x="298" y="238" class="d-t d-ctr">crossed</text>
<rect x="358" y="218" width="96" height="30" rx="5" class="d-box"/><text x="406" y="238" class="d-t d-ctr">because</text>
<rect x="466" y="218" width="96" height="30" rx="5" class="d-box d-accent"/><text x="514" y="238" class="d-t d-ctr">it</text>
<rect x="574" y="218" width="96" height="30" rx="5" class="d-box"/><text x="622" y="238" class="d-t d-ctr">was</text>
<rect x="682" y="218" width="66" height="30" rx="5" class="d-box"/><text x="715" y="238" class="d-t d-ctr">tired</text>
<path d="M500 218 Q345 186 200 216" class="d-line" marker-end="url(#sa-a)"/>
<text x="350" y="266" class="d-tm d-ctr">"it" attends strongly to "animal" — that attention weight is how the reference is resolved</text>

<rect x="16" y="288" width="366" height="28" rx="6" class="d-box d-warn"/>
<text x="32" y="307" class="d-tm">Causal masking: a token may only attend backwards.</text>
<rect x="398" y="288" width="366" height="28" rx="6" class="d-box"/>
<text x="414" y="307" class="d-tm">Multi-head = many of these in parallel, each learning a different relation.</text>
</svg>`
},

"training-pipeline": {
  title: "How a chat model is actually made",
  caption: "Three distinct stages with different data, different costs and different purposes. Conflating them is the most common misunderstanding about LLMs.",
  svg: `<svg viewBox="0 0 780 330" role="img" aria-label="LLM training pipeline">
<defs><marker id="tp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="30" width="238" height="150" rx="9" class="d-panel d-panel-good"/>
<text x="135" y="54" class="d-h d-ctr">1 · Pretraining</text>
<text x="32" y="78" class="d-tm">Data: trillions of tokens of</text>
<text x="32" y="95" class="d-tm">web text, books, code</text>
<text x="32" y="117" class="d-tm">Objective: predict next token</text>
<text x="32" y="139" class="d-tm">Cost: months, ~$10M–$100M+</text>
<rect x="32" y="150" width="206" height="22" rx="4" class="d-box"/><text x="135" y="166" class="d-tm d-ctr">result: a text completer</text>

<rect x="270" y="30" width="238" height="150" rx="9" class="d-panel"/>
<text x="389" y="54" class="d-h d-ctr">2 · Supervised finetuning</text>
<text x="286" y="78" class="d-tm">Data: ~10k–1M curated</text>
<text x="286" y="95" class="d-tm">conversation examples</text>
<text x="286" y="117" class="d-tm">Objective: imitate good answers</text>
<text x="286" y="139" class="d-tm">Cost: days, thousands of $</text>
<rect x="286" y="150" width="206" height="22" rx="4" class="d-box"/><text x="389" y="166" class="d-tm d-ctr">result: it answers questions</text>

<rect x="524" y="30" width="240" height="150" rx="9" class="d-panel"/>
<text x="644" y="54" class="d-h d-ctr">3 · Preference training</text>
<text x="540" y="78" class="d-tm">Data: human/AI rankings of</text>
<text x="540" y="95" class="d-tm">competing answers</text>
<text x="540" y="117" class="d-tm">Method: RLHF, DPO, RLVR</text>
<text x="540" y="139" class="d-tm">Cost: relatively small</text>
<rect x="540" y="150" width="208" height="22" rx="4" class="d-box"/><text x="644" y="166" class="d-tm d-ctr">result: helpful, styled, safer</text>

<path d="M254 105 H268" class="d-line" marker-end="url(#tp-a)"/>
<path d="M508 105 H522" class="d-line" marker-end="url(#tp-a)"/>

<rect x="16" y="198" width="748" height="56" rx="7" class="d-box d-warn"/>
<text x="32" y="218" class="d-t">Where knowledge comes from, and where behaviour comes from</text>
<text x="32" y="238" class="d-tm">Essentially all factual knowledge is acquired in stage 1. Stages 2 and 3 shape how the model behaves — tone, format,</text>
<text x="32" y="250" class="d-tm">refusals, willingness to say "I don't know" — but teach it very little new about the world.</text>

<rect x="16" y="268" width="748" height="50" rx="7" class="d-panel d-panel-bad"/>
<text x="32" y="288" class="d-h">The practical consequence</text>
<text x="32" y="308" class="d-tm">Finetuning is the wrong tool for "make the model know our internal documents" — that is a retrieval problem. Finetuning is the right tool for "make the model respond in our format and style."</text>
</svg>`
},

"adaptation-decision": {
  title: "Prompt, retrieve, or finetune?",
  caption: "The single most common architectural mistake in LLM projects is reaching for finetuning when the actual problem is retrieval.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Adaptation method decision tree">
<defs><marker id="ad2-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="270" y="16" width="240" height="40" rx="7" class="d-box d-accent"/><text x="390" y="41" class="d-t d-ctr">What is actually missing?</text>

<path d="M270 36 H150 V78" class="d-line" marker-end="url(#ad2-a)"/>
<path d="M390 56 V78" class="d-line" marker-end="url(#ad2-a)"/>
<path d="M510 36 H640 V78" class="d-line" marker-end="url(#ad2-a)"/>

<rect x="30" y="82" width="240" height="64" rx="7" class="d-box"/>
<text x="150" y="104" class="d-t d-ctr">Clear instructions</text>
<text x="150" y="124" class="d-tm d-ctr">the model can do it, it just</text>
<text x="150" y="139" class="d-tm d-ctr">isn't being told properly</text>

<rect x="286" y="82" width="208" height="64" rx="7" class="d-box"/>
<text x="390" y="104" class="d-t d-ctr">Facts it cannot know</text>
<text x="390" y="124" class="d-tm d-ctr">your docs, current data,</text>
<text x="390" y="139" class="d-tm d-ctr">private knowledge</text>

<rect x="520" y="82" width="240" height="64" rx="7" class="d-box"/>
<text x="640" y="104" class="d-t d-ctr">Consistent behaviour</text>
<text x="640" y="124" class="d-tm d-ctr">a format, style or task shape</text>
<text x="640" y="139" class="d-tm d-ctr">prompting can't hold reliably</text>

<path d="M150 146 V174" class="d-line" marker-end="url(#ad2-a)"/>
<path d="M390 146 V174" class="d-line" marker-end="url(#ad2-a)"/>
<path d="M640 146 V174" class="d-line" marker-end="url(#ad2-a)"/>

<rect x="30" y="178" width="240" height="72" rx="7" class="d-box d-yes"/>
<text x="150" y="200" class="d-t d-ctr">Prompt engineering</text>
<text x="150" y="220" class="d-tm d-ctr">minutes · free · instant iteration</text>
<text x="150" y="238" class="d-tm d-ctr">always try this first</text>

<rect x="286" y="178" width="208" height="72" rx="7" class="d-box d-yes"/>
<text x="390" y="200" class="d-t d-ctr">RAG</text>
<text x="390" y="220" class="d-tm d-ctr">days · moderate · updatable</text>
<text x="390" y="238" class="d-tm d-ctr">sources are citable</text>

<rect x="520" y="178" width="240" height="72" rx="7" class="d-box d-part"/>
<text x="640" y="200" class="d-t d-ctr">Finetuning</text>
<text x="640" y="220" class="d-tm d-ctr">weeks · expensive · frozen</text>
<text x="640" y="238" class="d-tm d-ctr">needs a real dataset</text>

<rect x="16" y="266" width="748" height="46" rx="7" class="d-box d-warn"/>
<text x="32" y="286" class="d-t">Finetuning does not reliably install facts — it installs behaviour.</text>
<text x="32" y="304" class="d-tm">A model finetuned on your documents will adopt their tone and still invent details. Retrieval puts the text in front of it at answer time, which is what actually grounds it.</text>
</svg>`
},

"rag-pipeline": {
  title: "Retrieval-augmented generation",
  caption: "Two phases people conflate: indexing happens once, ahead of time; retrieval happens per question. Most RAG quality problems live in the retrieval half, not the model.",
  svg: `<svg viewBox="0 0 780 330" role="img" aria-label="RAG pipeline">
<defs><marker id="rg-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<text x="16" y="24" class="d-h">Indexing — once, offline</text>
<rect x="16" y="34" width="748" height="76" rx="9" class="d-panel"/>
<rect x="34" y="52" width="120" height="42" rx="6" class="d-box"/><text x="94" y="70" class="d-t d-ctr">Documents</text><text x="94" y="86" class="d-tm d-ctr">PDFs, wiki, tickets</text>
<rect x="186" y="52" width="120" height="42" rx="6" class="d-box"/><text x="246" y="70" class="d-t d-ctr">Chunk</text><text x="246" y="86" class="d-tm d-ctr">split sensibly</text>
<rect x="338" y="52" width="130" height="42" rx="6" class="d-box d-accent"/><text x="403" y="70" class="d-t d-ctr">Embed</text><text x="403" y="86" class="d-tm d-ctr">text → vector</text>
<rect x="500" y="52" width="130" height="42" rx="6" class="d-box d-accent2"/><text x="565" y="70" class="d-t d-ctr">Vector store</text><text x="565" y="86" class="d-tm d-ctr">indexed for search</text>
<path d="M154 73 H184" class="d-line" marker-end="url(#rg-a)"/>
<path d="M306 73 H336" class="d-line" marker-end="url(#rg-a)"/>
<path d="M468 73 H498" class="d-line" marker-end="url(#rg-a)"/>
<text x="652" y="70" class="d-tm">chunking strategy</text>
<text x="652" y="86" class="d-tm">decides everything</text>

<text x="16" y="140" class="d-h">Answering — per question</text>
<rect x="16" y="150" width="748" height="84" rx="9" class="d-panel d-panel-good"/>
<rect x="34" y="170" width="104" height="44" rx="6" class="d-box d-accent"/><text x="86" y="188" class="d-t d-ctr">Question</text><text x="86" y="205" class="d-tm d-ctr">embed it too</text>
<rect x="170" y="170" width="120" height="44" rx="6" class="d-box"/><text x="230" y="188" class="d-t d-ctr">Similarity search</text><text x="230" y="205" class="d-tm d-ctr">top-k chunks</text>
<rect x="322" y="170" width="120" height="44" rx="6" class="d-box"/><text x="382" y="188" class="d-t d-ctr">Rerank</text><text x="382" y="205" class="d-tm d-ctr">optional, big win</text>
<rect x="474" y="170" width="140" height="44" rx="6" class="d-box d-warn"/><text x="544" y="188" class="d-t d-ctr">Stuff into prompt</text><text x="544" y="205" class="d-tm d-ctr">context + question</text>
<rect x="646" y="170" width="102" height="44" rx="6" class="d-box d-accent2"/><text x="697" y="188" class="d-t d-ctr">Model</text><text x="697" y="205" class="d-tm d-ctr">grounded answer</text>
<path d="M138 192 H168" class="d-line" marker-end="url(#rg-a)"/>
<path d="M290 192 H320" class="d-line" marker-end="url(#rg-a)"/>
<path d="M442 192 H472" class="d-line" marker-end="url(#rg-a)"/>
<path d="M614 192 H644" class="d-line" marker-end="url(#rg-a)"/>

<rect x="16" y="250" width="366" height="70" rx="8" class="d-panel d-panel-bad"/>
<text x="32" y="272" class="d-h">Where RAG actually fails</text>
<text x="32" y="292" class="d-tm">Almost always retrieval, not generation. If the right</text>
<text x="32" y="309" class="d-tm">chunk never surfaces, no model can rescue the answer.</text>

<rect x="398" y="250" width="366" height="70" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="272" class="d-h">So debug in this order</text>
<text x="414" y="292" class="d-tm">1. Was the correct chunk retrieved at all?</text>
<text x="414" y="309" class="d-tm">2. If yes, then fix the prompt. Never the reverse.</text>
</svg>`
},

"context-window": {
  title: "The context window and what it costs",
  caption: "Everything the model 'knows' at answer time is in this window. It is not memory — it is re-sent, re-read and re-billed on every single call.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Context window composition">
<text x="16" y="24" class="d-h">One request's context window</text>
<rect x="16" y="34" width="748" height="48" rx="7" class="d-box"/>
<rect x="18" y="36" width="120" height="44" rx="5" class="d-seg d-seg1"/><text x="78" y="63" class="d-t d-ctr">system prompt</text>
<rect x="140" y="36" width="190" height="44" class="d-seg d-seg2"/><text x="235" y="63" class="d-t d-ctr">retrieved documents</text>
<rect x="332" y="36" width="230" height="44" class="d-seg d-seg3"/><text x="447" y="63" class="d-t d-ctr">conversation history</text>
<rect x="564" y="36" width="90" height="44" class="d-seg d-seg4"/><text x="609" y="63" class="d-t d-ctr">question</text>
<rect x="656" y="36" width="106" height="44" rx="5" class="d-seg d-seg6"/><text x="709" y="63" class="d-t d-ctr">room to reply</text>

<rect x="16" y="100" width="366" height="92" rx="8" class="d-panel d-panel-bad"/>
<text x="32" y="122" class="d-h">There is no memory between calls</text>
<text x="32" y="142" class="d-tm">A stateless API sees only what you send. "Remembering"</text>
<text x="32" y="159" class="d-tm">earlier turns means resending them — so a long chat</text>
<text x="32" y="176" class="d-tm">costs more per message than a short one, every turn.</text>

<rect x="398" y="100" width="366" height="92" rx="8" class="d-panel"/>
<text x="414" y="122" class="d-h">Attention cost grows quadratically</text>
<text x="414" y="142" class="d-tm">Every token attends to every other token, so doubling</text>
<text x="414" y="159" class="d-tm">the context roughly quadruples attention work. This is</text>
<text x="414" y="176" class="d-tm">why long context is expensive rather than merely large.</text>

<rect x="16" y="208" width="748" height="76" rx="8" class="d-box d-warn"/>
<text x="32" y="228" class="d-t">A big window is not a reason to fill it</text>
<text x="32" y="248" class="d-tm">Retrieval quality degrades when relevant text sits in the middle of a large context — models attend most reliably to the</text>
<text x="32" y="264" class="d-tm">beginning and end. Ten well-chosen chunks routinely beat a hundred mediocre ones, and cost a tenth as much.</text>
<text x="32" y="280" class="d-tm">Put instructions at the start, the question at the end, and the evidence in between.</text>
</svg>`
},

"scaling-laws": {
  title: "Scaling laws and the compute budget",
  caption: "Loss falls predictably as a power law in parameters, data and compute — which is why labs can forecast a model's quality before training it.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Scaling laws">
<text x="16" y="24" class="d-h">Loss vs compute (log–log)</text>
<rect x="16" y="34" width="360" height="190" rx="8" class="d-panel"/>
<line x1="60" y1="196" x2="350" y2="196" class="d-line"/>
<line x1="60" y1="60" x2="60" y2="196" class="d-line"/>
<path d="M66 76 C130 110, 200 150, 344 178" class="d-line" style="stroke:var(--accent);stroke-width:2.5"/>
<text x="205" y="214" class="d-tm d-ctr">compute →</text>
<text x="34" y="130" class="d-tm">loss</text>
<text x="180" y="96" class="d-tm">a straight line on log–log</text>
<text x="180" y="112" class="d-tm">= a power law</text>

<rect x="398" y="34" width="366" height="90" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="56" class="d-h">Why this mattered so much</text>
<text x="414" y="78" class="d-tm">It made capability a budgeting decision rather than a</text>
<text x="414" y="95" class="d-tm">research gamble. You can measure small runs, fit the</text>
<text x="414" y="112" class="d-tm">curve, and predict the big one before committing.</text>

<rect x="398" y="134" width="366" height="90" rx="8" class="d-panel"/>
<text x="414" y="156" class="d-h">The Chinchilla correction</text>
<text x="414" y="178" class="d-tm">Early large models were badly undertrained — too many</text>
<text x="414" y="195" class="d-tm">parameters, too few tokens. For a fixed budget, smaller</text>
<text x="414" y="212" class="d-tm">models trained on much more data do better.</text>

<rect x="16" y="240" width="748" height="50" rx="7" class="d-box d-warn"/>
<text x="32" y="260" class="d-t">Read the caveat: the laws predict next-token loss, not usefulness.</text>
<text x="32" y="278" class="d-tm">Lower loss correlates with capability but does not guarantee any particular skill, and inference cost — not training cost — dominates a deployed product's economics.</text>
</svg>`
},

"kv-cache": {
  title: "Why generation is slow, and the KV cache",
  caption: "Two phases with completely different performance characteristics. Knowing which one you are in tells you which lever to pull.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Prefill and decode phases">
<defs><marker id="kv-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="16" y="30" width="366" height="128" rx="9" class="d-panel d-panel-good"/>
<text x="199" y="54" class="d-h d-ctr">Prefill — the prompt</text>
<text x="32" y="78" class="d-tm">All input tokens processed in parallel, in one pass.</text>
<text x="32" y="98" class="d-tm">Saturates the GPU: compute-bound.</text>
<text x="32" y="122" class="d-tm">Fast per token. This is why a 5,000-token prompt</text>
<text x="32" y="139" class="d-tm">does not take 5,000 times as long as one token.</text>

<rect x="398" y="30" width="366" height="128" rx="9" class="d-panel d-panel-bad"/>
<text x="581" y="54" class="d-h d-ctr">Decode — the reply</text>
<text x="414" y="78" class="d-tm">One token at a time, each depending on the last.</text>
<text x="414" y="98" class="d-tm">Cannot be parallelised: memory-bandwidth-bound.</text>
<text x="414" y="122" class="d-tm">The GPU spends most of its time moving weights,</text>
<text x="414" y="139" class="d-tm">not computing. This is where the latency lives.</text>

<rect x="16" y="174" width="748" height="58" rx="8" class="d-panel"/>
<text x="32" y="196" class="d-h">The KV cache</text>
<text x="32" y="218" class="d-tm">Each new token would otherwise recompute keys and values for the entire history. Caching them turns per-token cost from quadratic to linear — at the price of memory that grows with every token, for every concurrent user.</text>

<rect x="16" y="246" width="240" height="46" rx="7" class="d-box d-warn"/>
<text x="136" y="266" class="d-t d-ctr">Output tokens cost more</text>
<text x="136" y="283" class="d-tm d-ctr">than input tokens — this is why</text>

<rect x="270" y="246" width="240" height="46" rx="7" class="d-box"/>
<text x="390" y="266" class="d-t d-ctr">Want lower latency?</text>
<text x="390" y="283" class="d-tm d-ctr">Generate fewer tokens.</text>

<rect x="524" y="246" width="240" height="46" rx="7" class="d-box"/>
<text x="644" y="266" class="d-t d-ctr">Want higher throughput?</text>
<text x="644" y="283" class="d-tm d-ctr">Batch more requests together.</text>
</svg>`
},

"finetune-methods": {
  title: "Full finetuning vs LoRA",
  caption: "Why almost nobody updates all the weights any more, and what the adapter approach actually changes.",
  svg: `<svg viewBox="0 0 780 280" role="img" aria-label="Full finetuning versus LoRA">
<rect x="16" y="30" width="366" height="140" rx="9" class="d-panel d-panel-bad"/>
<text x="199" y="54" class="d-h d-ctr">Full finetuning</text>
<text x="32" y="80" class="d-tm">Every parameter updated.</text>
<text x="32" y="102" class="d-tm">Optimiser state needs several times the model size</text>
<text x="32" y="119" class="d-tm">in GPU memory — often 12–16 bytes per parameter.</text>
<text x="32" y="143" class="d-tm">One full copy of the model per task.</text>
<text x="32" y="160" class="d-tm">Risk: catastrophic forgetting of general ability.</text>

<rect x="398" y="30" width="366" height="140" rx="9" class="d-panel d-panel-good"/>
<text x="581" y="54" class="d-h d-ctr">LoRA / QLoRA</text>
<text x="414" y="80" class="d-tm">Base weights frozen. Small low-rank matrices</text>
<text x="414" y="97" class="d-tm">trained alongside and added at inference.</text>
<text x="414" y="121" class="d-tm">Often under 1% of parameters trained.</text>
<text x="414" y="143" class="d-tm">Adapters are megabytes, not gigabytes — swap</text>
<text x="414" y="160" class="d-tm">many tasks over one shared base model.</text>

<rect x="16" y="186" width="748" height="38" rx="7" class="d-box d-warn"/>
<text x="32" y="206" class="d-t">QLoRA adds quantisation of the frozen base, which is what puts 7B–13B finetuning on a single consumer GPU.</text>
<text x="32" y="220" class="d-tm">This is the reason hobbyist finetuning became possible at all.</text>

<rect x="16" y="236" width="748" height="34" rx="7" class="d-panel"/>
<text x="32" y="257" class="d-tm">Before any of this: confirm prompting genuinely failed, and that you have a real evaluation set. Finetuning without an eval set means you cannot tell whether you improved anything.</text>
</svg>`
},

"evals": {
  title: "Evaluating an LLM system",
  caption: "The discipline that separates a demo from a product. Without it you are tuning by vibes and every change is a coin flip.",
  svg: `<svg viewBox="0 0 780 310" role="img" aria-label="LLM evaluation approaches">
<rect x="16" y="30" width="240" height="126" rx="9" class="d-panel"/>
<text x="136" y="54" class="d-h d-ctr">Benchmarks</text>
<text x="32" y="78" class="d-tm">MMLU, GSM8K, HumanEval,</text>
<text x="32" y="95" class="d-tm">SWE-bench, GPQA</text>
<text x="32" y="119" class="d-tm">Good for comparing models.</text>
<text x="32" y="136" class="d-tm">Say little about your task.</text>
<rect x="32" y="144" width="208" height="0" class="d-box"/>

<rect x="270" y="30" width="240" height="126" rx="9" class="d-panel d-panel-good"/>
<text x="390" y="54" class="d-h d-ctr">Your own eval set</text>
<text x="286" y="78" class="d-tm">50–200 real examples from</text>
<text x="286" y="95" class="d-tm">your actual use case</text>
<text x="286" y="119" class="d-tm">The only thing that tells you</text>
<text x="286" y="136" class="d-tm">whether a change helped.</text>

<rect x="524" y="30" width="240" height="126" rx="9" class="d-panel"/>
<text x="644" y="54" class="d-h d-ctr">LLM-as-judge</text>
<text x="540" y="78" class="d-tm">A model grades outputs against</text>
<text x="540" y="95" class="d-tm">a written rubric</text>
<text x="540" y="119" class="d-tm">Scales well; inherits the judge's</text>
<text x="540" y="136" class="d-tm">biases. Spot-check it.</text>

<rect x="16" y="174" width="748" height="60" rx="8" class="d-box d-warn"/>
<text x="32" y="194" class="d-t">Benchmark contamination is real</text>
<text x="32" y="214" class="d-tm">Public benchmarks leak into training data, so a high score may reflect memorisation rather than capability. This is</text>
<text x="32" y="228" class="d-tm">precisely why a private eval set drawn from your own traffic is worth more than any leaderboard position.</text>

<rect x="16" y="248" width="748" height="52" rx="8" class="d-panel d-panel-good"/>
<text x="32" y="268" class="d-h">Build the eval set before you start tuning</text>
<text x="32" y="290" class="d-tm">Write down the failure you are trying to fix, collect examples of it, then change one thing and re-measure. It is the same measure-change-measure loop as performance work — and it is skipped just as often.</text>
</svg>`
},

"agent-loop": {
  title: "The agent loop",
  caption: "An agent is a model in a loop with tools and a stopping condition. The interesting engineering is almost entirely in the loop, not the model.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="Agent tool use loop">
<defs><marker id="al-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="d-head"/></marker></defs>
<rect x="60" y="30" width="160" height="50" rx="8" class="d-box d-accent"/><text x="140" y="52" class="d-t d-ctr">Goal</text><text x="140" y="69" class="d-tm d-ctr">from the user</text>
<rect x="300" y="30" width="180" height="50" rx="8" class="d-box d-accent2"/><text x="390" y="52" class="d-t d-ctr">Model decides</text><text x="390" y="69" class="d-tm d-ctr">answer, or call a tool</text>
<rect x="560" y="30" width="160" height="50" rx="8" class="d-box"/><text x="640" y="52" class="d-t d-ctr">Tool runs</text><text x="640" y="69" class="d-tm d-ctr">search, code, API</text>
<rect x="300" y="140" width="180" height="50" rx="8" class="d-box"/><text x="390" y="162" class="d-t d-ctr">Result appended</text><text x="390" y="179" class="d-tm d-ctr">back into context</text>
<rect x="60" y="140" width="160" height="50" rx="8" class="d-box d-yes"/><text x="140" y="162" class="d-t d-ctr">Done</text><text x="140" y="179" class="d-tm d-ctr">stop and answer</text>

<path d="M220 55 H298" class="d-line" marker-end="url(#al-a)"/>
<path d="M480 55 H558" class="d-line" marker-end="url(#al-a)"/>
<path d="M640 80 V165 H482" class="d-line" marker-end="url(#al-a)"/>
<path d="M300 165 H222" class="d-line" marker-end="url(#al-a)"/>
<path d="M340 140 V100 Q340 88 352 88 H390" class="d-line d-dash" marker-end="url(#al-a)"/>
<text x="500" y="118" class="d-tm">loop until done or capped</text>

<rect x="16" y="210" width="366" height="82" rx="8" class="d-panel d-panel-bad"/>
<text x="32" y="232" class="d-h">Why agents fail in practice</text>
<text x="32" y="252" class="d-tm">· Errors compound — 95% per step is 60% over ten</text>
<text x="32" y="269" class="d-tm">· Loops with no iteration cap or budget</text>
<text x="32" y="286" class="d-tm">· Tool descriptions too vague to choose between</text>

<rect x="398" y="210" width="366" height="82" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="232" class="d-h">What makes them work</text>
<text x="414" y="252" class="d-tm">· Few, well-described, hard-to-misuse tools</text>
<text x="414" y="269" class="d-tm">· Hard caps on steps, time and spend</text>
<text x="414" y="286" class="d-tm">· Tools that return errors the model can act on</text>
</svg>`
},

"prompt-anatomy": {
  title: "Anatomy of a prompt that works",
  caption: "Most prompt 'tricks' are downstream of a few structural choices. Get the structure right and the tricks matter much less.",
  svg: `<svg viewBox="0 0 780 320" role="img" aria-label="Prompt structure">
<rect x="16" y="30" width="470" height="240" rx="9" class="d-panel"/>
<rect x="34" y="48" width="434" height="38" rx="6" class="d-box d-accent"/>
<text x="46" y="65" class="d-t">Role and task</text><text x="46" y="80" class="d-tm">who the model is, what it is producing, for whom</text>
<rect x="34" y="94" width="434" height="38" rx="6" class="d-box"/>
<text x="46" y="111" class="d-t">Context and evidence</text><text x="46" y="126" class="d-tm">documents, data, prior decisions — delimited clearly</text>
<rect x="34" y="140" width="434" height="38" rx="6" class="d-box"/>
<text x="46" y="157" class="d-t">Examples</text><text x="46" y="172" class="d-tm">two or three, showing the exact shape you want back</text>
<rect x="34" y="186" width="434" height="38" rx="6" class="d-box"/>
<text x="46" y="203" class="d-t">Constraints</text><text x="46" y="218" class="d-tm">length, format, what to do when unsure</text>
<rect x="34" y="232" width="434" height="30" rx="6" class="d-box d-accent2"/>
<text x="46" y="252" class="d-t">The actual question — last</text>

<rect x="502" y="30" width="262" height="114" rx="8" class="d-panel d-panel-good"/>
<text x="518" y="52" class="d-h">What reliably helps</text>
<text x="518" y="74" class="d-tm">· Show, don't describe — examples beat</text>
<text x="518" y="90" class="d-tm">  adjectives every time</text>
<text x="518" y="110" class="d-tm">· Say what to do when uncertain</text>
<text x="518" y="130" class="d-tm">· Delimit inputs with clear markers</text>

<rect x="502" y="156" width="262" height="114" rx="8" class="d-panel d-panel-bad"/>
<text x="518" y="178" class="d-h">What mostly doesn't</text>
<text x="518" y="200" class="d-tm">· Politeness, threats, offers of payment</text>
<text x="518" y="220" class="d-tm">· "You are the world's best…"</text>
<text x="518" y="240" class="d-tm">· Piling on emphasis words</text>
<text x="518" y="260" class="d-tm">· Very long prompts nobody has tested</text>

<rect x="16" y="284" width="748" height="30" rx="6" class="d-box d-warn"/>
<text x="32" y="304" class="d-tm">Reasoning models change this: asking them to "think step by step" is redundant and sometimes harmful. Give them the goal and constraints, not a procedure.</text>
</svg>`
},

"embeddings": {
  title: "Embeddings: meaning as geometry",
  caption: "The idea underneath search, RAG, clustering and recommendation — text becomes a point in space, and nearness means relatedness.",
  svg: `<svg viewBox="0 0 780 290" role="img" aria-label="Embedding space">
<rect x="16" y="30" width="366" height="200" rx="9" class="d-panel"/>
<text x="199" y="54" class="d-h d-ctr">Similar meanings land near each other</text>
<circle cx="120" cy="110" r="6" class="d-dot d-dot-a"/><text x="134" y="114" class="d-tm">dog</text>
<circle cx="150" cy="130" r="6" class="d-dot d-dot-a"/><text x="164" y="134" class="d-tm">puppy</text>
<circle cx="112" cy="142" r="6" class="d-dot d-dot-a"/><text x="126" y="146" class="d-tm">canine</text>
<circle cx="290" cy="180" r="6" class="d-dot d-dot-b"/><text x="230" y="184" class="d-tm">database</text>
<circle cx="310" cy="160" r="6" class="d-dot d-dot-b"/><text x="248" y="164" class="d-tm">index</text>
<circle cx="200" cy="90" r="6" class="d-dot d-dot-c"/><text x="214" y="94" class="d-tm">wolf</text>
<text x="199" y="214" class="d-tm d-ctr">distance = dissimilarity, in a few hundred dimensions</text>

<rect x="398" y="30" width="366" height="94" rx="8" class="d-panel d-panel-good"/>
<text x="414" y="52" class="d-h">What it buys you</text>
<text x="414" y="74" class="d-tm">Search by meaning rather than keyword. "How do I</text>
<text x="414" y="91" class="d-tm">cancel?" finds a document titled "Terminating your</text>
<text x="414" y="108" class="d-tm">subscription" with no shared words at all.</text>

<rect x="398" y="134" width="366" height="96" rx="8" class="d-panel d-panel-bad"/>
<text x="414" y="156" class="d-h">Where it disappoints</text>
<text x="414" y="178" class="d-tm">Exact identifiers — error codes, SKUs, names — are</text>
<text x="414" y="195" class="d-tm">where keyword search still wins. Hybrid retrieval</text>
<text x="414" y="212" class="d-tm">(semantic + keyword) beats either alone, which is why</text>
<text x="414" y="226" class="d-tm">serious RAG systems run both.</text>

<rect x="16" y="246" width="748" height="34" rx="6" class="d-box d-warn"/>
<text x="32" y="267" class="d-tm">Embeddings from different models are not comparable. Change the embedding model and you must re-index everything — budget for that before you choose one.</text>
</svg>`
},

"llm-limits": {
  title: "Failure modes worth recognising on sight",
  caption: "Each of these has a mechanism behind it. Knowing the mechanism tells you whether a prompt fix will help or whether you need different architecture.",
  svg: `<svg viewBox="0 0 780 300" role="img" aria-label="LLM failure modes">
<rect x="16" y="26" width="240" height="118" rx="8" class="d-panel d-panel-bad"/>
<text x="136" y="48" class="d-h d-ctr">Hallucination</text>
<text x="32" y="70" class="d-tm">Fluent, confident, wrong.</text>
<text x="32" y="92" class="d-tm">Mechanism: it samples plausible</text>
<text x="32" y="108" class="d-tm">continuations; nothing checks truth.</text>
<text x="32" y="132" class="d-tm">Fix: retrieval, citations, tools.</text>

<rect x="270" y="26" width="240" height="118" rx="8" class="d-panel d-panel-bad"/>
<text x="390" y="48" class="d-h d-ctr">Sycophancy</text>
<text x="286" y="70" class="d-tm">Agrees when pushed back on,</text>
<text x="286" y="87" class="d-tm">even when it was right.</text>
<text x="286" y="108" class="d-tm">Mechanism: preference training</text>
<text x="286" y="124" class="d-tm">rewards answers people liked.</text>
<text x="286" y="140" class="d-tm">Fix: ask before revealing your view.</text>

<rect x="524" y="26" width="240" height="118" rx="8" class="d-panel d-panel-bad"/>
<text x="644" y="48" class="d-h d-ctr">Knowledge cutoff</text>
<text x="540" y="70" class="d-tm">Confident about a world that</text>
<text x="540" y="87" class="d-tm">has moved on.</text>
<text x="540" y="108" class="d-tm">Mechanism: facts come from</text>
<text x="540" y="124" class="d-tm">pretraining, frozen at a date.</text>
<text x="540" y="140" class="d-tm">Fix: search tools, not finetuning.</text>

<rect x="16" y="158" width="240" height="112" rx="8" class="d-panel"/>
<text x="136" y="180" class="d-h d-ctr">Tokenizer artefacts</text>
<text x="32" y="202" class="d-tm">Letter counting, reversal,</text>
<text x="32" y="219" class="d-tm">digit-level arithmetic.</text>
<text x="32" y="240" class="d-tm">Fix: give it a tool. No amount</text>
<text x="32" y="256" class="d-tm">of prompting repairs this.</text>

<rect x="270" y="158" width="240" height="112" rx="8" class="d-panel"/>
<text x="390" y="180" class="d-h d-ctr">Lost in the middle</text>
<text x="286" y="202" class="d-tm">Evidence buried mid-context</text>
<text x="286" y="219" class="d-tm">gets less reliable attention.</text>
<text x="286" y="240" class="d-tm">Fix: retrieve less and better;</text>
<text x="286" y="256" class="d-tm">put key material at the edges.</text>

<rect x="524" y="158" width="240" height="112" rx="8" class="d-panel"/>
<text x="644" y="180" class="d-h d-ctr">Prompt injection</text>
<text x="540" y="202" class="d-tm">Retrieved or fetched text</text>
<text x="540" y="219" class="d-tm">carries instructions.</text>
<text x="540" y="240" class="d-tm">Fix: treat all fetched content as</text>
<text x="540" y="256" class="d-tm">data; never grant it authority.</text>

<rect x="16" y="282" width="748" height="0" class="d-box"/>
</svg>`
}

});
