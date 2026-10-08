// Python Foundations — written lesson content for FDE Module 2.
// `pythonFoundationLessons` feeds the card grid;
// `pythonFoundationContent` is keyed by lesson title and powers the reader modal.

export const pythonFoundationLessons = [
  {
    title: "Python Language Essentials",
    description:
      "The core Python you actually need for AI work: types, strings and f-strings, lists/dicts/sets, comprehensions, functions, modules, and the stdlib pieces (os, pathlib, json, datetime) you will reach for daily.",
    category: "Python Foundations",
  },
  {
    title: "File Handling & JSON — load, dump, dumps",
    description:
      "Reading and writing files safely with context managers, parsing JSON with json.load/json.loads, serialising with json.dump/json.dumps, handling encoding errors, and config-vs-data conventions used in AI projects.",
    category: "Python Foundations",
  },
  {
    title: "OOP & Error Handling",
    description:
      "Classes, dataclasses and composition for structuring AI code (clients, tools, agents), plus Pythonic error handling: try/except/else/finally, custom exceptions, retries with backoff, and logging instead of print.",
    category: "Python Foundations",
  },
  {
    title: "Async Python — async def, await, asyncio",
    description:
      "Non-blocking API calls with async/await: the event loop, coroutines vs threads, concurrent LLM requests with asyncio.gather, semaphores for rate limits, and async SDK clients (OpenAI, httpx).",
    category: "Python Foundations",
  },
  {
    title: "venv, python-dotenv, Secrets Hygiene & Git",
    description:
      "Isolated environments with venv, pinning requirements, loading secrets with python-dotenv, never committing keys (.gitignore, gitleaks), and rotating leaked credentials.",
    category: "Python Foundations",
  },
  {
    title: "Project Structure — src/, prompts/, tests/, notebooks/",
    description:
      "A production-ready AI project layout: src/ for code, prompts/ versioned as files, tests/ with pytest including prompt regression tests, notebooks/ for exploration, plus config and logging conventions.",
    category: "Python Foundations",
  },
];

export const pythonFoundationContent = {
  "Python Language Essentials": {
    intro:
      "You don't need all of Python to build AI apps — but you need the working core cold: data structures, comprehensions, functions, imports, and the stdlib modules in every AI codebase.",
    sections: [
      {
        heading: "Types & Data Structures",
        body: "Four containers carry 90% of AI plumbing:",
        bullets: [
          "str with f-strings for prompt templating, plus .strip(), .split(), .join() for cleaning model output.",
          "list for ordered items (messages, chunks, results); dict for structured records (JSON payloads, tool args); set for dedupe.",
          "tuple for fixed records such as (role, content) pairs; None as the explicit 'no value' for optional fields.",
          "Type hints (def chat(messages: list[dict]) -> str:) — cheap docs that catch bugs with mypy/pyright.",
        ],
      },
      {
        heading: "Comprehensions & Iteration",
        body: "Idiomatic transforms you'll write constantly:",
        bullets: [
          "List/dict comprehensions with filters for selecting and reshaping chunks, messages, and results.",
          "enumerate() and zip() instead of manual counters; dict.get(key, default) instead of KeyError-prone indexing.",
          "Generator expressions stream large files line-by-line without loading everything into memory.",
          "Slicing (text[:4000]) for quick truncation before stuffing content into a context window.",
        ],
      },
      {
        heading: "Functions, Modules & Stdlib",
        body: "Organise code the way AI projects expect:",
        bullets: [
          "Small pure functions (chunk_text, build_prompt, parse_json) that are easy to unit-test without API calls.",
          "*args/**kwargs for flexible SDK wrappers; default arguments for model names and temperatures.",
          "One module per concern (llm_client, prompts, retrieval); absolute imports from src/; __init__.py makes packages.",
          "Stdlib essentials: os and pathlib for paths, json for payloads, datetime for timestamps, collections for analysis.",
        ],
      },
    ],
    takeaways: [
      "Master lists/dicts/sets, comprehensions, and f-strings — they carry most AI glue code.",
      "Write small testable functions and use type hints as projects grow.",
      "Know the stdlib basics (pathlib, json, datetime, os) before adding third-party packages.",
    ],
  },
  "File Handling & JSON — load, dump, dumps": {
    intro:
      "AI apps are file-intensive: prompts on disk, JSON configs, datasets, cached responses. This lesson covers safe file patterns and the load/loads/dump/dumps distinction.",
    sections: [
      {
        heading: "Reading & Writing Files Safely",
        body: "Context managers guarantee cleanup even on errors:",
        bullets: [
          "Always use with open(path, 'r', encoding='utf-8') as f: — the file closes automatically, even mid-error.",
          "pathlib over string concatenation: Path('data') / 'docs' / f'{doc_id}.md' works cross-platform.",
          "Read modes: .read() for small files, iterate lines for large logs/datasets, .readlines() rarely.",
          "Write modes: 'w' overwrites, 'a' appends (logs), 'x' fails if the file exists; always set encoding explicitly.",
        ],
      },
      {
        heading: "The JSON Quartet",
        body: "Two axes — file vs string, parse vs serialise:",
        bullets: [
          "json.load(f) parses from an open file; json.loads(s) parses from a string such as raw LLM output.",
          "json.dump(obj, f) writes JSON to a file; json.dumps(obj) returns a JSON string for bodies and logs.",
          "Pretty-print editable configs: json.dump(cfg, f, indent=2, ensure_ascii=False).",
          "Wrap LLM output parsing in try/except json.JSONDecodeError — model text is not guaranteed valid JSON.",
        ],
      },
      {
        heading: "Configs, Data & Encoding Pitfalls",
        body: "Conventions that prevent whole classes of bugs:",
        bullets: [
          "Editable configs go in YAML/TOML or pretty JSON; secrets in .env; datasets in JSONL (one object per line).",
          "UnicodeDecodeError means wrong encoding — try utf-8-sig (BOM) or latin-1, then normalise on write.",
          "json can't serialise datetime/set/custom objects — convert to ISO strings/lists first, or pass default=str.",
          "Atomic writes for important files: write to temp, then os.replace(), so crashes never leave half-written configs.",
        ],
      },
    ],
    takeaways: [
      "with open(...) + pathlib for all file I/O; stream large files line-by-line.",
      "load/loads parse (file/string), dump/dumps serialise (file/string) — guard LLM parsing with try/except.",
      "Secrets in .env, configs as pretty JSON/YAML, datasets as JSONL; write atomically when it matters.",
    ],
  },
  "OOP & Error Handling": {
    intro:
      "AI codebases stay maintainable with small classes (clients, tools, agents, evaluators) and disciplined error handling — especially retries, because every external API fails eventually.",
    sections: [
      {
        heading: "Classes the Pythonic Way",
        body: "Prefer composition and dataclasses over deep hierarchies:",
        bullets: [
          "@dataclass for plain data carriers (Document, Message, EvalCase) — free init, repr and equality with hints.",
          "Regular classes for behaviour: LLMClient (key, model, retry policy), Tool (name, schema, function), Agent (tool loop).",
          "Composition over inheritance: an Agent has Tools and an LLMClient — avoid deep class trees.",
          "Dunder basics: __init__ for setup, __repr__ for debuggable output, context managers for resources.",
        ],
      },
      {
        heading: "Exceptions Done Right",
        body: "Handle what you can, let the rest propagate with context:",
        bullets: [
          "try/except/else/finally: try the risky call, except specific errors, else on success, finally always cleans up.",
          "Catch specific exceptions — bare except hides bugs, including KeyboardInterrupt.",
          "Custom exceptions (RetriableError vs FatalError) let callers distinguish 'try again' from 'give up'.",
          "raise ... from e preserves the chain so logs show the original cause.",
        ],
      },
      {
        heading: "Retries, Timeouts & Logging",
        body: "The production trio for flaky LLM APIs:",
        bullets: [
          "Retry transient failures (429, 5xx, timeouts) with exponential backoff + jitter; never retry auth/validation 4xx.",
          "Always set timeouts on network calls — a hung request without one hangs the whole pipeline.",
          "Use the logging module over print; log prompt versions, latency and token usage per call.",
          "Circuit-breaker mindset: after N consecutive failures, fail fast for a cooldown instead of hammering a dead API.",
        ],
      },
    ],
    takeaways: [
      "Dataclasses for data, small composed classes for behaviour; avoid deep inheritance.",
      "Catch specific exceptions, define custom ones for retriable vs fatal, preserve chains with raise-from.",
      "Retry with backoff on 429/5xx/timeouts, always set timeouts, log properly.",
    ],
  },
  "Async Python — async def, await, asyncio": {
    intro:
      "LLM calls are I/O-bound: programs spend most time waiting on the network. Async lets one process juggle hundreds of concurrent API calls — critical for batch evals, parallel tools, and responsive servers.",
    sections: [
      {
        heading: "Core Concepts",
        body: "Cooperative concurrency in five ideas:",
        bullets: [
          "async def defines a coroutine that can pause; await pauses it, freeing the event loop for other work.",
          "asyncio.run(main()) drives the loop: while one coroutine awaits I/O, others progress — one thread, many requests.",
          "asyncio.gather(...) fans out N coroutines concurrently and returns all results — the standard parallel-LLM-call pattern.",
          "asyncio.Semaphore(n) caps concurrency (e.g., 10 at a time) to respect rate limits while staying fast.",
          "Rule of thumb: async for I/O-bound work (API calls); threads/multiprocessing for CPU-bound work.",
        ],
      },
      {
        heading: "Async HTTP & SDK Clients",
        body: "Network libraries need async variants:",
        bullets: [
          "httpx.AsyncClient (with async with) instead of requests — requests blocks the whole event loop.",
          "AsyncOpenAI client: await client.chat.completions.create(...) — same API, non-blocking; AsyncAnthropic likewise.",
          "Async streaming: async for chunk in stream: forwards tokens to a UI or SSE response as they arrive.",
          "Local file I/O rarely needs async — plain sync reads are fast; don't over-async everything.",
        ],
      },
      {
        heading: "Patterns & Pitfalls",
        body: "What trips people up:",
        bullets: [
          "Never call blocking code (time.sleep, requests.get) in a coroutine — use asyncio.sleep, async clients, or asyncio.to_thread().",
          "Use return_exceptions=True in batch gather calls so one failure doesn't kill the whole batch.",
          "Per-call timeouts via asyncio.wait_for(coro(), timeout=60) stop one slow request stalling a batch.",
          "Rate-limit with semaphore plus backoff on 429s; async FastAPI endpoints multiply these wins server-side.",
        ],
      },
    ],
    takeaways: [
      "async/await juggles many waiting network calls; gather for fan-out, semaphores for limits.",
      "Use async HTTP/SDK clients; never block the loop with requests or sleep.",
      "Batch with return_exceptions, per-call timeouts, and backoff on 429s.",
    ],
  },
  "venv, python-dotenv, Secrets Hygiene & Git": {
    intro:
      "Leaked API keys are the most common AI-project incident. One venv per project, secrets in .env, and a git setup that makes committing keys nearly impossible.",
    sections: [
      {
        heading: "Virtual Environments & Dependencies",
        body: "Isolate every project:",
        bullets: [
          "python -m venv .venv then activate it — one environment per project, always.",
          "Pin versions in requirements.txt (openai==1.12.0) so teammates and deploys get identical packages.",
          "Never pip install into global Python — system tools depend on it and conflicts will ruin your week.",
          "Deploys rebuild from requirements — if it's not pinned, it's not reproducible.",
        ],
      },
      {
        heading: "Secrets with python-dotenv",
        body: "Keys live in the environment, never in code:",
        bullets: [
          "Put OPENAI_API_KEY=sk-... in .env, call load_dotenv() at startup, read with os.getenv().",
          "Fail fast if missing — a clear 'Set OPENAI_API_KEY in .env' beats a cryptic 401 later.",
          "Separate .env per environment; production uses a real secret manager (AWS Secrets Manager, Vault, cloud env vars).",
          ".env files are for local dev, not servers.",
        ],
      },
      {
        heading: "Git Hygiene: Never Commit a Key",
        body: "Make leaks structurally impossible:",
        bullets: [
          ".gitignore must include .env, .venv/, __pycache__/, *.pyc — added before the first commit, not after a leak.",
          "A key in git history must be rotated — deleting the file later doesn't help; revoke and reissue.",
          "Pre-commit guards (git-secrets, gitleaks) block commits containing key patterns.",
          "Keep prompts/ and evals in the repo so prompt changes are reviewable diffs.",
        ],
      },
    ],
    takeaways: [
      "One venv per project, pinned requirements, never install globally.",
      "Secrets via .env + os.getenv with fail-fast checks; real secret managers in production.",
      ".gitignore secrets from day one; leaked key means rotate immediately; guard with gitleaks hooks.",
    ],
  },
  "Project Structure — src/, prompts/, tests/, notebooks/": {
    intro:
      "A layout that scales from prototype to team project: code in src/, prompts versioned as files, tests that catch regressions, notebooks quarantined to exploration.",
    sections: [
      {
        heading: "The Standard Layout",
        body: "A proven starting tree:",
        bullets: [
          "src/ — application code as a package (config, llm_client, retrieval, agents, api). Importable, testable, deployable.",
          "prompts/ — every prompt as a versioned file (summarise.v1.md); loaded at runtime, never hardcoded.",
          "tests/ — pytest suite: chunking, parsing, plus prompt regression tests with golden input/output pairs.",
          "notebooks/ — exploration only; anything that works gets promoted into src/ + tests, never runs in production.",
        ],
      },
      {
        heading: "Config & Prompts as Files",
        body: "Separate what changes at different speeds:",
        bullets: [
          "config.py reads env vars once into a typed Settings object — nobody scatters os.getenv calls around.",
          ".env.example with placeholder values documents every required variable for the next developer.",
          "Prompt files carry front-matter (model, temperature, version) so runs log exactly which version produced each output.",
          "Changing a prompt means editing a .md file and running evals — no code deploy needed.",
        ],
      },
      {
        heading: "Tests & Quality Gates",
        body: "What to test in an AI app:",
        bullets: [
          "Unit-test deterministic parts: chunking, parsing, prompt rendering, retry logic, cost math — pytest in CI.",
          "Regression-test prompts: golden inputs with recorded good outputs; flag diffs for human review.",
          "Lint, format and type-check (ruff, black, mypy) in CI — stringly-typed AI code rots fast without them.",
          "Add a smoke test that imports src/ and runs one mocked end-to-end pass; keep notebooks out of CI.",
        ],
      },
    ],
    takeaways: [
      "src/ for code, prompts/ versioned as files, tests/ with pytest, notebooks/ for exploration only.",
      "Centralise config; document secrets in .env.example; log prompt versions per run.",
      "Unit-test deterministic parts, regression-test prompts, enforce ruff/black/mypy in CI.",
    ],
  },
};