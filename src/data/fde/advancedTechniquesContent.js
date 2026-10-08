// Advanced Techniques — written lesson content for FDE Module 1, section
// "Advanced Techniques". `advancedTechniqueLessons` feeds the card grid;
// `advancedTechniqueContent` is keyed by lesson title and powers the reader modal.

export const advancedTechniqueLessons = [
  {
    title: "Function Calling, Tool-Integrated LLMs & Structured Outputs",
    description:
      "How models call your APIs: declaring tools with JSON Schema, the describe → model-chooses → you-execute → feed-back loop, parallel and nested tool calls, and forcing reliable structured outputs with strict schemas instead of parsing free text.",
    category: "Advanced Techniques",
  },
  {
    title: "Pydantic, instructor & json_schema",
    description:
      "Turning LLM text into validated Python objects. Define a Pydantic model, let instructor validate and repair the model's output against it, and understand the json_schema primitives underneath — including retry-on-validation-error loops and when to use strict mode.",
    category: "Advanced Techniques",
  },
  {
    title: "Tokenization & Cost — tiktoken, BPE, Prompt Compression",
    description:
      "Why LLM pricing is measured in tokens: how BPE tokenization splits text, measuring tokens with tiktoken, estimating and controlling cost per request, prompt caching, and prompt-compression techniques that cut tokens without losing quality.",
    category: "Advanced Techniques",
  },
  {
    title: "Few-Shot Optimisation & DSPy",
    description:
      "Moving from hand-tuned prompts to optimized ones: selecting better examples, compiling pipelines with DSPy — signatures, modules, metrics and optimizers like MIPROv2 and BootstrapFewShot — so demonstrations and instructions are tuned systematically against a metric.",
    category: "Advanced Techniques",
  },
  {
    title: "ReAct, Safety Prompting & Responsible AI",
    description:
      "The ReAct loop of interleaved reasoning and acting with tools, plus the safety side: prompt-level guardrails, refusal boundaries, red-teaming, bias and hallucination mitigation, and responsible-AI practices that keep systems trustworthy in production.",
    category: "Advanced Techniques",
  },
  {
    title: "Multimodal Inputs, Document Understanding & Code Review Prompting",
    description:
      "Working with images, PDFs and screenshots: vision inputs, OCR-free document understanding, tables and layout extraction, and a disciplined prompting approach for code review — diffs, checklists, severity levels and actionable comments.",
    category: "Advanced Techniques",
  },
  {
    title: "LLM APIs (OpenAI, Anthropic, Gemini) & Prompt Versioning",
    description:
      "Practical differences between the three major LLM APIs — message formats, tool calling, caching and model tiers — plus how to version, evaluate and roll out prompt changes safely with registries, canaries and regression suites.",
    category: "Advanced Techniques",
  },
];

export const advancedTechniqueContent = {
  "Function Calling, Tool-Integrated LLMs & Structured Outputs": {
    intro:
      "LLMs can't call your APIs by themselves — function calling is the protocol that lets a model request an action, you execute it, and the model continues with the result. It's the backbone of every agent, and its JSON-Schema cousin gives you reliable structured outputs.",
    sections: [
      {
        heading: "The Tool-Calling Loop",
        body: "Function calling is a handshake between model and application, not the model running code.",
        bullets: [
          "Declare tools: name, description, and a JSON Schema of parameters — the model 'reads' these like an API doc.",
          "Model decides: for a user request it returns either a plain answer or tool_calls with a function name + JSON arguments.",
          "You execute: your code runs the actual API/DB call — the model never touches your systems directly.",
          "Feed back: append a tool message with the result; the model produces the final natural-language answer.",
          "Multi-step: repeat the loop until the model stops requesting tools (this is how agents work).",
        ],
      },
      {
        heading: "Writing Good Tool Definitions",
        body: "Tool quality is prompt quality — the model chooses only as well as your descriptions allow.",
        bullets: [
          "Describe when to use the tool, not just what it does: 'Use for current weather; do NOT use for forecasts >7 days.'",
          "Keep schemas tight: required fields, enums over free strings, sensible defaults, bounded numeric ranges.",
          "Fewer, broader tools beat dozens of overlapping ones — overlapping descriptions cause misroutes.",
          "Name functions like verbs (search_orders, create_refund) so intent is obvious to the model.",
        ],
      },
      {
        heading: "Parallel and Nested Calls",
        body: "Modern APIs support more than one call per turn.",
        bullets: [
          "Parallel calls: the model can request several independent tools in one step (e.g., weather for two cities) — execute them concurrently.",
          "Chained/dependent calls: tool results may trigger further tool requests; cap iterations to avoid infinite loops.",
          "Always validate tool arguments against your schema server-side — models occasionally emit malformed or invented arguments.",
        ],
      },
      {
        heading: "Structured Outputs Without Function Calling",
        body: "Sometimes you just need JSON back, not a tool invocation.",
        bullets: [
          "response_format / json_schema strict mode: the API constrains decoding so the output is guaranteed-valid JSON matching your schema.",
          "Without strict mode: prompt for JSON, set temperature 0, and parse with repair + retry — accept only validated results.",
          "Structured outputs are also the handoff format between chained prompts — schema-validated intermediates prevent drift.",
          "Trade-off: strict schemas reduce creativity — use them for extraction/classification, not open-ended writing.",
        ],
      },
    ],
    takeaways: [
      "Function calling = declare (JSON Schema) → model requests → you execute → feed result back.",
      "Tool descriptions and tight schemas determine selection accuracy — treat them as prompts.",
      "Use strict json_schema for guaranteed JSON; validate tool arguments server-side every time.",
    ],
  },

  "Pydantic, instructor & json_schema": {
    intro:
      "The LLM gives you text; your program needs typed, validated data. Pydantic defines the shape, JSON Schema is the wire format, and instructor glues them together — validating the model's output and feeding errors back for automatic repair.",
    sections: [
      {
        heading: "Pydantic: Schemas as Python Classes",
        body: "Pydantic lets you declare data shape once and get validation, serialization and JSON Schema for free.",
        bullets: [
          "Define a BaseModel with typed, constrained fields: str with max_length, Literal enums, PositiveInt, EmailStr.",
          "model_json_schema() emits the JSON Schema you hand to the LLM (or feed to structured-output APIs).",
          "Validation errors are precise — field-level messages that make excellent retry prompts.",
          "The same model validates incoming API requests and outgoing LLM responses — one source of truth.",
        ],
      },
      {
        heading: "instructor: Validate-then-Repair",
        body: "instructor patches the LLM client so every response is parsed into your Pydantic model — and retried when it isn't valid.",
        bullets: [
          "Basic flow: client = instructor.patch(OpenAI()) → response = client.chat(model=..., response_model=Article) → typed object.",
          "On validation failure, instructor re-prompts the model with the Pydantic errors: 'Your answer was invalid because field X ... try again.'",
          "Modes: modes for tool-calling, JSON schema, or plain prompting — choose per model/provider.",
          "Supports nested models, lists, unions and Field descriptions that flow into the schema the model sees.",
          "max_retries bounds the repair loop; log failures to catch systematically bad prompts.",
        ],
      },
      {
        heading: "json_schema: The Common Language",
        body: "JSON Schema is the interoperable format underneath everything — understood by OpenAI, Anthropic, Gemini and every tool.",
        bullets: [
          "Types, required, enums, patterns, additionalProperties — the vocabulary of structured generation.",
          "Strict mode requires: every property in required, additionalProperties: false (provider-specific rules differ).",
          "Pydantic and instructor both compile down to it; hand-writing it is fine for non-Python stacks.",
          "Version your schema like code: adding fields is easy, changing field types breaks consumers.",
        ],
      },
      {
        heading: "Practical Patterns & Pitfalls",
        body: "Getting structured extraction right in production:",
        bullets: [
          "Give the schema room to say 'unknown' — forced guesses produce confident garbage; add Optional/nullable fields.",
          "Include short field descriptions — models fill ambiguous fields better with guidance.",
          "Batch extraction with a list[Item] model — one call for many records, then iterate.",
          "Keep temperature low for extraction; reserve higher temperatures for generation tasks.",
          "Test with adversarial inputs: long values, unicode, missing fields — Pydantic catches what the model misses.",
        ],
      },
    ],
    takeaways: [
      "Pydantic = schema + validation in Python; json_schema is its provider-agnostic wire format.",
      "instructor patches the LLM client to auto-validate and repair outputs against your model.",
      "Bound retries, describe fields, allow nulls — and validate again downstream.",
    ],
  },

  "Tokenization & Cost — tiktoken, BPE, Prompt Compression": {
    intro:
      "LLMs bill by tokens, and tokens are not words. Understanding BPE tokenization, measuring with tiktoken, and controlling what you send is the difference between a demo and a viable product — costs can vary 10× on the same logical request.",
    sections: [
      {
        heading: "BPE: How Text Becomes Tokens",
        body: "Byte-Pair Encoding learns frequent sub-word merges from training data — the tokenizer ships as a lookup table.",
        bullets: [
          "Common words become one token; rare words split: 'information' → ['inform', 'ation'], 'tokenizer' → ['token', 'izer'].",
          "Rough rule: 1 token ≈ ¾ of an English word ≈ 4 characters; code tokenizes worse than prose (symbols, indentation).",
          "Different models use different tokenizers — a count in tiktoken (OpenAI) won't match Claude or Gemini counts exactly.",
          "Pathological cases: random strings, base64, emoji, CJK text can explode into 2–4× more tokens per character.",
        ],
      },
      {
        heading: "Measuring with tiktoken",
        body: "tiktoken is OpenAI's fast tokenizer library — the standard way to count and budget tokens locally.",
        bullets: [
          "enc = tiktoken.get_encoding('o200k_base'); len(enc.encode(text)) → exact token count, no API call.",
          "Price any request before shipping: input_tokens × input_price + output_tokens × output_price (output usually costs 3–4× more).",
          "Use it in CI: fail builds when a system prompt + schema silently grows past your budget.",
          "Estimate others: characters/4 is a decent cross-model ballpark for planning.",
        ],
      },
      {
        heading: "Cost Control Levers",
        body: "Ordered by impact:",
        bullets: [
          "Prompt caching: providers discount cached input tokens (often 50–90%) — put stable prefixes (system prompt, docs) first and keep them byte-identical.",
          "Model tiering: route simple classification/summarization to mini/flash models, reserve frontier models for hard steps.",
          "Trim output: set max_tokens, ask for concise formats, 'no preamble' — you pay for every generated token.",
          "Batch API: non-urgent workloads get ~50% off via async batch endpoints.",
          "Reduce history: summarize old turns instead of resending the full transcript every turn.",
        ],
      },
      {
        heading: "Prompt Compression",
        body: "Cut tokens without cutting the information the model needs.",
        bullets: [
          "Structural trims: remove politeness filler, collapse whitespace, drop redundant instructions repeated across sections.",
          "Selective inclusion: send only relevant chunks (retrieval) rather than whole documents — biggest win in RAG systems.",
          "Learned compressors (LLMLingua etc.): a small model rewrites input at ~2× compression with minor quality loss.",
          "Compression has a floor — over-compressed prompts lose negations, numbers and entities; evaluate quality after any change.",
        ],
      },
    ],
    takeaways: [
      "Tokens come from BPE — count them with tiktoken, budget them in CI, and watch output tokens (3–4× price).",
      "Caching, model tiering and output limits are the highest-impact cost levers.",
      "Prompt compression and retrieval cut input size; always re-evaluate quality after compressing.",
    ],
  },

  "Few-Shot Optimisation & DSPy": {
    intro:
      "Hand-tuning prompts doesn't scale: change one word, watch three evals regress. DSPy reframes prompting as programming — you declare signatures and metrics, then optimizers automatically find better instructions and demonstrations.",
    sections: [
      {
        heading: "Few-Shot Example Selection",
        body: "Which examples you show matters more than how many.",
        bullets: [
          "Representative: cover the input distribution — include edge cases, not just easy ones.",
          "Diverse: distinct labels/topics/lengths per shot so the model learns the mapping, not a pattern shortcut.",
          "Consistent: identical formatting across examples; one messy example teaches messy output.",
          "Current best practice: many libraries now embed inputs and retrieve the most similar examples per query (dynamic few-shot) instead of one static set.",
        ],
      },
      {
        heading: "DSPy: Prompts as Compiled Programs",
        body: "DSPy separates what you want (signature) from how to get it (optimized prompt).",
        bullets: [
          "Signature: declare input/output types — 'question -> answer', 'passage, question -> relevant: bool' — instead of writing prose instructions.",
          "Modules: ChainOfThought, ReAct, RetrieveThenRead — composable pipelines over signatures.",
          "Metric: an evaluation function (exact match, LLM-as-judge, programmatic checks) that scores outputs.",
          "Compile: run an optimizer against a training set; DSPy rewrites instructions and selects demonstrations, producing an optimized 'prompt' you rarely edit by hand.",
          "The output of compilation is portable: exports to plain API calls, no runtime dependency on magic.",
        ],
      },
      {
        heading: "DSPy Optimizers",
        body: "Pick the optimizer by how much labeled data and budget you have:",
        bullets: [
          "BootstrapFewShot: traces successful runs and converts them into few-shot examples — strong with zero/low data.",
          "MIPROv2: jointly optimizes instructions and demo selection using a Bayesian search over the metric.",
          "GRPO/other newer optimizers: policy-style optimization for reasoning-heavy modules.",
          "Rule of thumb: start with BootstrapFewShot (cheap), graduate to MIPROv2 for meaningful metric gains.",
        ],
      },
      {
        heading: "When DSPy Pays Off — and When It Doesn't",
        body: "Adopt it for repetition, skip it for one-offs.",
        bullets: [
          "Worth it: many similar tasks (classification, extraction, RAG answering), measurable metric, repeated re-tuning as data changes.",
          "Overkill: a single chatbot with a hand-written system prompt and qualitative goals.",
          "Prerequisites: an eval set (even 30–50 examples) and a metric — DSPy optimizes exactly what you measure, garbage metric → garbage prompts.",
          "Alternative lighter tooling: promptfoo / braintrust style eval loops when you just need A/B prompt testing.",
        ],
      },
    ],
    takeaways: [
      "Few-shot selection: representative, diverse, consistent — beats raw example count.",
      "DSPy = signatures + modules + metric → optimizer compiles better instructions and demos.",
      "You must have a metric; start with BootstrapFewShot, scale to MIPROv2 for bigger gains.",
    ],
  },

  "ReAct, Safety Prompting & Responsible AI": {
    intro:
      "ReAct gives agents their loop — reason about the problem, act with a tool, observe the result, repeat. Safety prompting and responsible-AI practice ensure that same capability can't be turned against users or used irresponsibly.",
    sections: [
      {
        heading: "The ReAct Loop",
        body: "ReAct interleaves explicit Thought → Action → Observation cycles instead of reasoning-only or act-only.",
        bullets: [
          "Thought: 'I need the current price; my knowledge is stale.' → Action: tool call (search / API).",
          "Observation: tool result feeds back into context → next Thought evaluates it.",
          "Repeat until confident, then emit Final Answer with citations to the observations used.",
          "Why it beats plain CoT: grounding — every claim can trace to a tool result, reducing hallucination.",
          "Implementation today: mostly via the tools/function-calling API rather than literal 'Thought:' strings; the pattern is identical.",
          "Guard the loop: max-iteration caps, timeouts, and a stop condition so agents can't spin forever.",
        ],
      },
      {
        heading: "Safety Prompting & Guardrails",
        body: "Prompt-level defences are layer one — necessary, not sufficient.",
        bullets: [
          "Explicit boundaries in the system prompt: topics to refuse, escalation phrases, when to say 'I don't know'.",
          "Input guardrails before the model: toxicity/prompt-injection classifiers, PII redaction, jailbreak-signature detection.",
          "Output guardrails after: content filters, secret/PII leakage checks, schema validation, grounding checks for factual claims.",
          "Rate limits and tool allow-lists in code — enforcement that doesn't depend on model cooperation.",
        ],
      },
      {
        heading: "Responsible AI in Practice",
        body: "The engineering habits that make LLM systems trustworthy:",
        bullets: [
          "Hallucination mitigation: retrieval grounding, citations required, 'answer from provided context only' instructions, abstention when context lacks the answer.",
          "Bias awareness: evaluate outputs across demographic slices; biased training data surfaces as skewed answers.",
          "Red-teaming: systematically attack your own system (jailbreaks, injection, harmful requests) before release — maintain an attack regression suite.",
          "Transparency: disclose when users are talking to AI; document model versions, data handling and known limitations.",
          "Human-in-the-loop for high-stakes decisions (medical, legal, financial, termination) — the model advises, humans decide.",
          "Logging & feedback: capture flagged outputs, feed them into evals, and re-test after every prompt/model change.",
        ],
      },
      {
        heading: "Building the Safety Eval",
        body: "Safety without measurement is vibes.",
        bullets: [
          "Maintain a 'should-refuse' test set alongside your 'should-answer' set — both must pass on every release.",
          "Score refusal quality: right refusals, zero over-refusals on benign edge cases.",
          "Include multi-turn attacks and indirect injection cases — single-turn tests miss most real attacks.",
          "Automate the suite into CI with the same gate as unit tests.",
        ],
      },
    ],
    takeaways: [
      "ReAct = Thought → Act → Observe cycles; today it's implemented with tool calling + iteration caps.",
      "Layer guardrails: prompt boundaries, input classifiers, output filters, and code-level enforcement.",
      "Responsible AI is measurable — maintain should-refuse and injection test sets in CI, keep humans on high-stakes calls.",
    ],
  },

  "Multimodal Inputs, Document Understanding & Code Review Prompting": {
    intro:
      "Modern LLMs read images and PDFs directly — no OCR pipeline required. This lesson covers passing multimodal inputs well, extracting structure from documents, and a disciplined prompting approach for AI-assisted code review.",
    sections: [
      {
        heading: "Multimodal Inputs",
        body: "Vision-capable APIs accept images alongside text in the same message.",
        bullets: [
          "Pass images as base64 or URL in the message content array — the model sees pixels, not extracted text.",
          "Great for: screenshots of errors, UI critique, charts/diagrams, handwritten notes, whiteboards.",
          "Prompting tip: ask pointed questions ('List every form field and its validation error') — vague 'what is this?' wastes the modality.",
          "Watch token cost: images are billed as tokens by size/tile count — resize large images before sending.",
          "Audio and video are supported by some providers (or via transcription first — whisper-style STT then text prompt).",
        ],
      },
      {
        heading: "Document Understanding",
        body: "PDFs, contracts, invoices, slides — parse without building an OCR pipeline.",
        bullets: [
          "Native PDF support: send the file directly; the model handles layout, columns and tables reasonably well.",
          "For tables and forms: ask for markdown tables or JSON extraction — usually better than prose description.",
          "Long documents: combine with retrieval (chunk + embed + retrieve relevant pages) or long-context models; don't blindly send 500 pages.",
          "Layout-critical documents (invoices, resumes): for scale and precision, pair a layout-aware parser (unstructured, OCR libraries) with LLM post-processing.",
          "Always spot-check numbers — models transpose figures in dense tables; extract-then-verify against source coordinates for finance/legal use.",
        ],
      },
      {
        heading: "Code Review Prompting",
        body: "AI code review works when you give it a contract, not a vibe.",
        bullets: [
          "Provide: the diff (not whole repo unless codebase-aware), changed-file context, and your team's review checklist.",
          "Ask by severity: 'Blocker / Should-fix / Nit' with justification per comment — prevents nitpick floods.",
          "Focus the ask: security (injection, secrets, authz), correctness (off-by-one, races, error handling), performance, maintainability, tests missing.",
          "Require actionable comments: file + line + why + concrete fix suggestion — no 'consider improving this'.",
          "Tell it what NOT to comment: style already covered by the linter, speculative refactors, generated code.",
          "Human remains the approver: AI review catches the mechanical 70%; design trade-offs stay with engineers.",
        ],
      },
      {
        heading: "End-to-End Patterns",
        body: "Combining the three:",
        bullets: [
          "Screenshot → model extracts state → code fix suggested → reviewer verifies (great for bug triage).",
          "Spec PDF → structured requirement JSON → implementation checklist → AI review of the diff against the checklist.",
          "CI integration: post review comments on pull requests, but require human approval to merge — AI as commenter, never as merger.",
        ],
      },
    ],
    takeaways: [
      "Pass images/PDFs natively and ask precise questions; resize to control image token cost.",
      "For structured extraction from tables/forms, ask for JSON/markdown and verify critical numbers.",
      "Code review prompting = diff + checklist + severity labels + actionable comments; humans approve merges.",
    ],
  },

  "LLM APIs (OpenAI, Anthropic, Gemini) & Prompt Versioning": {
    intro:
      "The three major LLM APIs are more alike than different — but the differences (message roles, caching controls, tool semantics) bite in production. Pair that with disciplined prompt versioning and you can change prompts as safely as code.",
    sections: [
      {
        heading: "Comparing the Three APIs",
        body: "Core concepts map 1:1; syntax and features differ.",
        bullets: [
          "OpenAI: chat.completions or the Responses API; system/assistant/user/tool roles; tools + tool_choice; strict json_schema; automatic and manual prompt caching.",
          "Anthropic (Messages API): separate top-level system parameter; thinking (extended) budget controls; cache_control breakpoints for explicit prompt caching; content blocks for text + images.",
          "Gemini (Google AI / Vertex): systemInstruction; generationConfig (temperature, responseMimeType for JSON); function_declarations tools; strong native multimodal and generous free tiers.",
          "Commonalities: message lists, tool/function calling, JSON modes, streaming, safety settings — write a thin provider adapter and swap models freely.",
          "Practical differences: tokenizers and pricing differ; caching semantics differ (automatic prefix vs explicit breakpoints); each has its own model tiers (flagship vs fast/cheap).",
        ],
      },
      {
        heading: "Choosing a Provider",
        body: "Decision heuristics:",
        bullets: [
          "Long-document and careful-writing workloads: Anthropic's large context and extended thinking.",
          "Ecosystem breadth, browsing, structured outputs maturity: OpenAI.",
          "Multimodal-heavy, cost-sensitive, GSuite/Vertex shops: Gemini.",
          "Portability: keep prompts provider-agnostic where possible, isolate provider quirks in an adapter layer, and run the same eval set across providers when switching.",
        ],
      },
      {
        heading: "Prompt Versioning",
        body: "Prompts are production artifacts — version them like code.",
        bullets: [
          "Store prompts as files (YAML/MD) in git, not buried in application code — diffs and reviews work naturally.",
          "Semantic versioning + changelog per prompt: note the eval metric before/after each change.",
          "Prompt registries/frameworks (promptfoo, LangSmith, Braintrust, internal registries): central storage, environments, rollback.",
          "Deploy like code: staged rollouts / canary traffic for prompt changes, instant rollback to the previous version.",
          "Log the prompt version with every production request — you cannot debug a complaint without knowing which prompt produced it.",
        ],
      },
      {
        heading: "Evaluation-Gated Changes",
        body: "No prompt change ships without numbers.",
        bullets: [
          "Maintain a golden eval set (50–200 cases) covering core behavior + edge cases + should-refuse cases.",
          "Run the full suite on every prompt version; block regressions past a threshold (e.g., <2% accuracy drop allowed).",
          "Combine automatic checks (exact match, schema validity, judge scores) with periodic human review samples.",
          "Track live metrics post-deploy: user thumbs-down rate, tool-call failures, fallback usage — evals approximate reality, monitoring measures it.",
        ],
      },
    ],
    takeaways: [
      "OpenAI/Anthropic/Gemini share core concepts — adapt provider quirks behind one interface.",
      "Version prompts in git/registries, canary rollouts, and log the prompt version per request.",
      "Gate every change on an eval suite; monitor live feedback after deploy.",
    ],
  },
};
