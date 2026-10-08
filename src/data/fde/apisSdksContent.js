// APIs & SDKs — written lesson content for FDE Module 2.
// `apisSdkLessons` feeds the card grid;
// `apisSdkContent` is keyed by lesson title and powers the reader modal.

export const apisSdkLessons = [
  {
    title: "HTTP & API Calls — requests, status codes, pagination",
    description:
      "The HTTP plumbing under every AI integration: GET/POST with requests, reading status codes, headers and JSON bodies, paginating list endpoints, and parsing responses defensively.",
    category: "APIs & SDKs",
  },
  {
    title: "OpenAI SDK — chat completions & streaming",
    description:
      "Calling OpenAI from Python: chat completions message format, temperatures and sampling knobs, token usage and cost tracking, streaming tokens to the UI, and retries plus error handling.",
    category: "APIs & SDKs",
  },
  {
    title: "Anthropic SDK — prompt caching with cache_control",
    description:
      "Calling Claude from Python: the Messages API shape, system parameter and content blocks, and explicit prompt caching with cache_control breakpoints to cut cost and latency on long repeated contexts.",
    category: "APIs & SDKs",
  },
  {
    title: "DSPy Hands-On — automatic prompt compilation",
    description:
      "From hand-tuned prompts to compiled programs: DSPy signatures and modules, defining a metric, and optimizers like BootstrapFewShot and MIPROv2 that tune instructions and examples against your data.",
    category: "APIs & SDKs",
  },
];

export const apisSdkContent = {
  "HTTP & API Calls — requests, status codes, pagination": {
    intro:
      "Every SDK is a wrapper around HTTP. Understanding requests, status codes and pagination lets you debug any API integration — AI or otherwise — when the magic wrapper leaks.",
    sections: [
      {
        heading: "Requests Basics",
        body: "The 90% pattern:",
        bullets: [
          "GET for fetching (query params in params={...}); POST with json={...} for sending structured bodies — most AI endpoints are POST.",
          "Headers carry auth (Authorization: Bearer sk-...) and content negotiation (Accept, Content-Type: application/json).",
          "Use a requests.Session() to reuse connections across many calls — faster and kinder to the server.",
          "Always pass timeout=... — the default is 'wait forever', which is never what you want in production.",
        ],
      },
      {
        heading: "Status Codes & Error Handling",
        body: "Read the number before the body:",
        bullets: [
          "2xx success (200 OK, 201 Created, 200 with SSE stream); parse JSON only after confirming success.",
          "4xx client errors: 400 bad request (fix your payload), 401/403 auth (fix your key/permissions), 404 wrong URL, 422 validation (read the error detail).",
          "429 rate limit: back off and retry with delay — respect Retry-After headers; hammering gets you banned longer.",
          "5xx server errors: retry with backoff; response.raise_for_status() turns errors into exceptions you can catch uniformly.",
        ],
      },
      {
        heading: "Pagination & Defensive Parsing",
        body: "Real APIs don't return everything at once:",
        bullets: [
          "Patterns: page/per_page numbers, cursor/next tokens, limit+offset — loop until no next page, with a max-pages safety cap.",
          "Parse defensively: data.get('items', []) instead of data['items']; validate shapes before indexing nested fields.",
          "Log request IDs / response headers on failures — support teams can't help without them.",
          "Cache GET responses (in-memory dict, disk, Redis) when data changes slowly — saves money and latency.",
        ],
      },
    ],
    takeaways: [
      "GET to fetch, POST with JSON to send; Session for reuse; always set timeouts.",
      "2xx parse, 4xx fix your side, 429 back off, 5xx retry — raise_for_status for uniform handling.",
      "Paginate with a safety cap, parse with .get() defaults, log request IDs, cache slow-changing GETs.",
    ],
  },
  "OpenAI SDK — chat completions & streaming": {
    intro:
      "The OpenAI Python SDK is the reference client most AI code is written against. Master its message format, sampling knobs, streaming, and usage tracking here and every other SDK feels familiar.",
    sections: [
      {
        heading: "Chat Completions Shape",
        body: "Messages in, message out:",
        bullets: [
          "Client setup: OpenAI(api_key=os.getenv('OPENAI_API_KEY')); async variant AsyncOpenAI for concurrent code.",
          "messages list with roles: system (instructions), user (input), assistant (history), tool (function results) — order matters.",
          "Key params: model, temperature (0 precise → 1 creative), max_tokens cap, response_format for JSON mode, tools + tool_choice for functions.",
          "Responses API vs Chat Completions: same ideas, newer stateful interface — learn chat completions first, it transfers directly.",
        ],
      },
      {
        heading: "Streaming & Usage Tracking",
        body: "Tokens as they arrive, costs as they accrue:",
        bullets: [
          "stream=True returns an iterator of deltas — accumulate content chunks and forward them to the UI for live typing effect.",
          "With streaming, usage arrives at the end (or via stream_options={'include_usage': True}) — don't lose it if you bill by tokens.",
          "Non-streamed responses expose usage.prompt_tokens / completion_tokens / total_tokens — log all three with the model name per call.",
          "Cost math: (input_tokens × input_price + output_tokens × output_price) / 1M — wrap it in a helper and log spend per feature, not just per call.",
        ],
      },
      {
        heading: "Retries & Production Calls",
        body: "The SDK helps, but verify:",
        bullets: [
          "The SDK auto-retries transient errors a couple of times — add your own backoff wrapper for 429-heavy batch workloads.",
          "Catch APIError/APIConnectionError/RateLimitError specifically; time out hung streams client-side.",
          "Pin the SDK version in requirements — API shapes evolve and unpinned upgrades break deploys.",
          "Mock the client in tests (fake .create returning canned responses) so CI never spends real tokens.",
        ],
      },
    ],
    takeaways: [
      "System/user/assistant/tool roles in order; temperature and max_tokens per call; JSON mode and tools when structure matters.",
      "Stream deltas for live UX; always capture usage and log cost per feature.",
      "Layer your own retries/timeouts, pin SDK versions, mock the client in tests.",
    ],
  },
  "Anthropic SDK — prompt caching with cache_control": {
    intro:
      "Claude's Messages API mirrors OpenAI's with two big differences: system is a top-level parameter, and prompt caching is explicit via cache_control breakpoints — cutting cost up to 90% on repeated long contexts.",
    sections: [
      {
        heading: "Messages API Shape",
        body: "Same ideas, slightly different envelope:",
        bullets: [
          "Client: anthropic.Anthropic() (or AsyncAnthropic); call messages.create(model=..., max_tokens=..., system=..., messages=[...]).",
          "system is a separate top-level parameter, not a message role — keep long stable instructions there for cacheability.",
          "messages use user/assistant roles only; content blocks (text, image, tool_use/tool_result) compose multimodal and tool calls.",
          "max_tokens is required per call; thinking budgets (extended thinking) trade latency for reasoning depth.",
        ],
      },
      {
        heading: "Prompt Caching with cache_control",
        body: "Pay full price once, cached price after:",
        bullets: [
          "Mark stable prefixes: add cache_control={'type': 'ephemeral'} to system and the first long content blocks (docs, few-shot examples).",
          "Up to 4 breakpoints; cache writes cost extra once (25% surcharge) but reads cost ~10% of base — huge wins for repeated RAG contexts.",
          "Cache keys are prefix-exact: identical prefix reuses cache; any change invalidates everything after it — put volatile content (user query) last.",
          "Track cache_creation vs cache_read tokens in usage — verify hit rates in LangSmith/dashboard before assuming savings.",
        ],
      },
      {
        heading: "When Caching Pays",
        body: "Not every call benefits:",
        bullets: [
          "Best: long system prompts, repeated document contexts, multi-turn agents re-sending history, eval suites re-running fixtures.",
          "Weak: one-shot short prompts (minimum cacheable length ~1024 tokens); constantly-changing prefixes defeat the cache.",
          "Design for it: stable-instructions-first ordering, version prompts deliberately (new version = cold cache, brief cost spike).",
          "OpenAI comparison: automatic prefix caching needs no markup but less control; Anthropic gives explicit breakpoints and bigger discounts.",
        ],
      },
    ],
    takeaways: [
      "Messages API: top-level system, user/assistant messages, content blocks, required max_tokens.",
      "cache_control breakpoints on stable prefixes cut repeated-context cost ~90%; keep volatile content last.",
      "Verify with cache_read metrics; minimum lengths apply; version changes briefly cool the cache.",
    ],
  },
  "DSPy Hands-On — automatic prompt compilation": {
    intro:
      "DSPy replaces hand-tuned prompt strings with programs: declare what each step does (signatures), wire them into modules, define a metric, and let an optimizer compile better prompts from your data.",
    sections: [
      {
        heading: "Signatures & Modules",
        body: "Declare intent, not wording:",
        bullets: [
          "A Signature is 'input fields -> output fields' (question -> answer); DSPy generates the actual prompt text around it.",
          "Modules compose steps: Predict (one call), ChainOfThought (reasoning + answer), ReAct (reason + act tools) — pipelines are Python objects.",
          "Swap models without rewriting prompts: dspy.configure(lm=dspy.LM('openai/gpt-4o-mini')) changes the backend for all modules.",
          "Start zero-shot; add raw examples only if needed — the optimizer will find better ones than you hand-pick.",
        ],
      },
      {
        heading: "Metrics: the Score That Matters",
        body: "Optimizers tune whatever you measure:",
        bullets: [
          "A metric is a function(example, prediction) -> float/bool: exact match for QA, LLM-judge for open-ended, schema-valid for structured outputs.",
          "Keep dev and test sets separate — optimize on train/dev, report on held-out test, or you fool yourself.",
          "Small sets work: 50-200 labeled examples are enough to beat hand-tuning on most tasks.",
          "Metric design is the real skill: a sloppy metric compiles a prompt that's great at the wrong thing.",
        ],
      },
      {
        heading: "Optimizers: BootstrapFewShot & MIPROv2",
        body: "Two workhorses:",
        bullets: [
          "BootstrapFewShot: runs your module on training data, keeps traces that score well, and installs them as few-shot demos — instant quality jump.",
          "MIPROv2: jointly searches instructions + examples (proposal + credit assignment) for bigger gains at higher compile cost.",
          "Compile once, serve the artifact: save the optimized program (program.save('v1.json')) and load it in production — no optimizer at runtime.",
          "Loop the workflow: evaluate → find failures → add examples/fix metric → recompile → regression-test before shipping.",
        ],
      },
    ],
    takeaways: [
      "Signatures declare I/O, modules compose steps, backends swap with one configure call.",
      "Define a metric first — optimizers tune exactly what you measure; keep test data held out.",
      "BootstrapFewShot for quick demo wins, MIPROv2 for deeper tuning; save compiled programs and serve them statically.",
    ],
  },
};