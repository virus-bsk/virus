// Python & API Foundations — full concept list for FDE Module 2.
// Same shape as reactjsCourseConcepts: id, title, category, level,
// description, why, when, code. Rendered by FDEPythonCourse.

export const pythonModuleConcepts = [
  {
    "id": 1,
    "title": "Variables & Dynamic Typing",
    "category": "python",
    "level": "beginner",
    "description": "Python variables need no type declarations — the type lives on the value, not the name. Reassign freely and inspect with type().",
    "why": "Every AI script starts with variables holding prompts, responses, keys and parsed JSON — you must know how Python names and types behave.",
    "when": "Declaring prompts, chaining API responses, reshaping data between pipeline steps.",
    "code": "# No declarations — the value carries the type\nmodel = \"gpt-4o-mini\"\nmax_tokens = 500\ntemperature = 0.7\ntags = [\"summarize\", \"rag\"]\n\nprint(type(model))        # <class 'str'>\nprint(type(max_tokens))   # <class 'int'>\n\n# Reassigning to another type is legal\ntemperature = \"low\"  # now a str — linters will flag this"
  },
  {
    "id": 2,
    "title": "Strings & f-strings",
    "category": "python",
    "level": "beginner",
    "description": "f-strings embed expressions directly in string literals. They are the standard way to build prompts with variables.",
    "why": "Prompt templating is string interpolation — f-strings make it readable and far less error-prone than concatenation.",
    "when": "Building prompts, formatting model output, creating log lines and filenames.",
    "code": "user = \"Asha\"\ntopic = \"photosynthesis\"\n\nprompt = f\"Explain {topic} to {user} in 3 bullet points.\"\nprint(prompt)\n\n# Expressions and format specs work inline\nscore = 0.87341\nprint(f\"Accuracy: {score:.1%}\")          # Accuracy: 87.3%\nprint(f\"Upper: {topic.upper()}\")          # Upper: PHOTOSYNTHESIS\n\n# Cleaning model output\nraw = \"  Yes,  Paris.\\n\"\nprint(raw.strip().rstrip(\".\"))             # Yes,  Paris"
  },
  {
    "id": 3,
    "title": "Lists, Dicts & Sets",
    "category": "python",
    "level": "beginner",
    "description": "list for ordered items, dict for keyed records (JSON maps to dict), set for dedupe and membership tests.",
    "why": "Chat histories are lists of dicts, tool args are dicts, dedupe of chunks uses sets — these three carry most AI plumbing.",
    "when": "Message histories, JSON payloads, chunk lists, dedupe and filtering.",
    "code": "# Chat history = list of dicts\nmessages = [\n    {\"role\": \"system\", \"content\": \"You are helpful.\"},\n    {\"role\": \"user\", \"content\": \"Hi!\"},\n]\nmessages.append({\"role\": \"assistant\", \"content\": \"Hello!\"})\n\n# Dict access with safe defaults\nlast = messages[-1]\nprint(last.get(\"content\", \"\"))\n\n# Set for dedupe\nchunks = [\"a\", \"b\", \"a\", \"c\"]\nprint(list(set(chunks)))  # order not preserved\n\n# Membership is O(1) on sets\nallowed = {\"gpt-4o\", \"claude-3-5-sonnet\"}\nprint(\"gpt-4o\" in allowed)  # True"
  },
  {
    "id": 4,
    "title": "Comprehensions",
    "category": "python",
    "level": "beginner",
    "description": "One-line list/dict/set builders: [expr for x in items if cond]. The idiomatic way to transform collections.",
    "why": "They turn chunk cleaning, score filtering and payload reshaping into single readable lines.",
    "when": "Transforming retrieval results, filtering by score, reshaping API responses.",
    "code": "chunks = [\n    {\"text\": \"  hello \", \"score\": 0.9},\n    {\"text\": \"junk\", \"score\": 0.2},\n    {\"text\": \" world\", \"score\": 0.8},\n]\n\n# Keep high-score texts, cleaned\ntexts = [c[\"text\"].strip() for c in chunks if c[\"score\"] > 0.5]\nprint(texts)  # ['hello', 'world']\n\n# Dict comprehension: id -> text index\nindex = {i: c[\"text\"] for i, c in enumerate(chunks)}\n\n# Set comprehension: unique roles\nmessages = [{\"role\": \"user\"}, {\"role\": \"user\"}, {\"role\": \"system\"}]\nprint({m[\"role\"] for m in messages})  # {'user', 'system'}"
  },
  {
    "id": 5,
    "title": "Functions, *args & **kwargs",
    "category": "python",
    "level": "beginner",
    "description": "def blocks with positional, default, *args and **kwargs parameters. Return multiple values as tuples.",
    "why": "Wrapping each API call in a small function keeps retry logic, logging and parsing in one testable place.",
    "when": "Helper functions for completions, parsers, retries and pipeline steps.",
    "code": "def chat(model, prompt, temperature=0.7, **options):\n    print(f\"[{model}] temp={temperature}\", options)\n    return f\"reply to: {prompt}\"\n\nprint(chat(\"gpt-4o-mini\", \"Hi\"))\nprint(chat(\"gpt-4o-mini\", \"Hi\", temperature=0.2, timeout=30))\n\n# *args collects extras, tuple unpacking returns many values\ndef split_role(message):\n    return message.get(\"role\"), message.get(\"content\")\n\nrole, content = split_role({\"role\": \"user\", \"content\": \"hi\"})"
  },
  {
    "id": 6,
    "title": "Reading Files Safely",
    "category": "files-json",
    "level": "beginner",
    "description": "Open files with `with open(...)` so handles always close. Prefer pathlib.Path for joining and checking paths.",
    "why": "Prompt files, datasets and logs all live on disk — a leaked handle or wrong encoding corrupts your pipeline silently.",
    "when": "Loading prompts from prompts/, reading datasets, writing logs and outputs.",
    "code": "from pathlib import Path\n\n# with-block closes the file even on errors\nwith open(\"prompts/system.txt\", encoding=\"utf-8\") as f:\n    system_prompt = f.read()\n\n# pathlib: OS-independent paths\nprompt_file = Path(\"prompts\") / \"system.txt\"\nif prompt_file.exists():\n    text = prompt_file.read_text(encoding=\"utf-8\")\n    print(f\"{len(text)} chars loaded\")\n\n# Iterate large files line-by-line (no full read)\nwith open(\"data/docs.txt\", encoding=\"utf-8\") as f:\n    for line in f:\n        line = line.strip()\n        if line:\n            print(line[:60])"
  },
  {
    "id": 7,
    "title": "JSON: load, loads, dump, dumps",
    "category": "files-json",
    "level": "beginner",
    "description": "json.load/loads parse files/strings into dicts; json.dump/dumps serialize dicts back. Know which of the four you need.",
    "why": "LLM APIs speak JSON — every request body and response is a dict you serialize or parse with these four functions.",
    "when": "Parsing API responses, saving tool args, writing eval datasets, config files.",
    "code": "import json\n\n# loads: string -> dict | load: file -> dict\nraw = '{\"model\": \"gpt-4o-mini\", \"tokens\": 120}'\npayload = json.loads(raw)\nprint(payload[\"model\"])\n\nwith open(\"config.json\", encoding=\"utf-8\") as f:\n    config = json.load(f)\n\n# dumps: dict -> string | dump: dict -> file\nprint(json.dumps(payload, indent=2))\n\nwith open(\"out.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(payload, f, indent=2, ensure_ascii=False)\n\n# Defensive parse of model output\ntry:\n    data = json.loads(model_text)\nexcept json.JSONDecodeError:\n    data = {\"raw\": model_text}"
  },
  {
    "id": 8,
    "title": "Classes & Dataclasses",
    "category": "oop-errors",
    "level": "intermediate",
    "description": "Classes bundle state + behavior; @dataclass removes boilerplate for data holders like configs, messages and tool specs.",
    "why": "Clients, tools and agents are objects with config and methods — classes keep them organized instead of dict soup.",
    "when": "Wrapping an LLM client, defining tool schemas, modeling pipeline state.",
    "code": "from dataclasses import dataclass, field\n\n@dataclass\nclass ChatConfig:\n    model: str = \"gpt-4o-mini\"\n    temperature: float = 0.7\n    max_tokens: int = 500\n    stop: list = field(default_factory=list)\n\nclass ChatClient:\n    def __init__(self, config: ChatConfig):\n        self.config = config\n        self.history: list = []\n\n    def ask(self, prompt: str) -> str:\n        self.history.append({\"role\": \"user\", \"content\": prompt})\n        reply = f\"[{self.config.model}] {prompt[:40]}...\"\n        self.history.append({\"role\": \"assistant\", \"content\": reply})\n        return reply\n\nclient = ChatClient(ChatConfig(temperature=0.2))\nprint(client.ask(\"Hello\"))"
  },
  {
    "id": 9,
    "title": "try/except & Custom Exceptions",
    "category": "oop-errors",
    "level": "intermediate",
    "description": "try/except/else/finally for expected failures; custom exception classes so callers can handle YOUR errors precisely.",
    "why": "API calls fail (timeouts, 429s, bad JSON) — structured exceptions let you retry transient errors and surface real bugs.",
    "when": "Wrapping SDK calls, parsing model output, validating tool arguments.",
    "code": "class LLMError(Exception):\n    \"\"\"Base for all our LLM failures.\"\"\"\n\nclass RateLimitError(LLMError):\n    pass\n\ndef safe_parse(text):\n    import json\n    try:\n        data = json.loads(text)\n    except json.JSONDecodeError as e:\n        raise LLMError(f\"Model returned invalid JSON: {e}\") from e\n    else:\n        return data  # runs only if no exception\n    finally:\n        print(\"parse attempted\")  # always runs\n\n# Catch narrowly — never blanket `except:`\ntry:\n    safe_parse(\"not json\")\nexcept RateLimitError:\n    print(\"back off and retry\")\nexcept LLMError as e:\n    print(f\"handled: {e}\")"
  },
  {
    "id": 10,
    "title": "Retries with Backoff & Logging",
    "category": "oop-errors",
    "level": "intermediate",
    "description": "Retry transient failures with exponential backoff; log with the logging module instead of print for levels and timestamps.",
    "why": "429s and 5xx errors are normal with LLM APIs — a 10-line retry wrapper is the difference between a demo and production.",
    "when": "Every outbound API call, batch eval runs, nightly pipelines.",
    "code": "import logging\nimport time\nimport random\n\nlogging.basicConfig(\n    level=logging.INFO,\n    format=\"%(asctime)s | %(levelname)s | %(message)s\",\n)\nlog = logging.getLogger(\"llm\")\n\ndef call_with_retry(fn, tries=4, base_delay=1.0):\n    for attempt in range(1, tries + 1):\n        try:\n            return fn()\n        except RateLimitError as e:\n            wait = base_delay * (2 ** (attempt - 1)) + random.random()\n            log.warning(\"rate limited (try %d/%d), wait %.1fs: %s\",\n                        attempt, tries, wait, e)\n            time.sleep(wait)\n    raise LLMError(\"exhausted retries\")\n\n# usage: call_with_retry(lambda: client.ask(\"hi\"))"
  },
  {
    "id": 11,
    "title": "async def, await & asyncio",
    "category": "async",
    "level": "intermediate",
    "description": "async def defines a coroutine; await pauses it without blocking the thread. The event loop runs many coroutines at once.",
    "why": "LLM calls are network-bound waits — async lets one process juggle hundreds of concurrent requests instead of idling.",
    "when": "Batch evals, parallel completions, fan-out RAG queries.",
    "code": "import asyncio\n\nasync def fake_call(prompt: str) -> str:\n    await asyncio.sleep(1)  # network wait — thread is free\n    return f\"reply: {prompt}\"\n\nasync def main():\n    # Sequential: ~3s total\n    # r1 = await fake_call(\"a\")\n    # r2 = await fake_call(\"b\")\n\n    # Concurrent: ~1s total\n    results = await asyncio.gather(\n        fake_call(\"a\"),\n        fake_call(\"b\"),\n        fake_call(\"c\"),\n    )\n    print(results)\n\nasyncio.run(main())"
  },
  {
    "id": 12,
    "title": "Concurrency Limits & Async Clients",
    "category": "async",
    "level": "advanced",
    "description": "Unbounded gather hammers APIs — use Semaphore for limits and async SDK clients (AsyncOpenAI, httpx.AsyncClient).",
    "why": "Rate limits punish unbounded concurrency; semaphores + async clients give you speed without 429 storms.",
    "when": "Production batch jobs, eval harnesses, high-throughput pipelines.",
    "code": "import asyncio\nimport httpx\n\nsem = asyncio.Semaphore(5)  # max 5 in flight\n\nasync def fetch(client, prompt):\n    async with sem:  # waits here if 5 are running\n        r = await client.post(\n            \"https://api.example.com/chat\",\n            json={\"prompt\": prompt},\n            timeout=30.0,\n        )\n        r.raise_for_status()\n        return r.json()\n\nasync def main(prompts):\n    async with httpx.AsyncClient() as client:\n        return await asyncio.gather(\n            *(fetch(client, p) for p in prompts)\n        )"
  },
  {
    "id": 13,
    "title": "venv & Requirements",
    "category": "env-git",
    "level": "beginner",
    "description": "venv creates an isolated environment per project; pip freeze pins exact versions so installs are reproducible.",
    "why": "Without isolation, one project's upgrade breaks another's — and unpinned deps break deploys months later.",
    "when": "Starting any project, before pip install, before deploying.",
    "code": "# Create + activate (run in terminal)\n# python -m venv .venv\n# Windows: .venv\\Scripts\\activate\n# macOS/Linux: source .venv/bin/activate\n\n# Inside the venv:\n# pip install openai python-dotenv httpx\n# pip freeze > requirements.txt\n\n# Reproduce elsewhere:\n# pip install -r requirements.txt"
  },
  {
    "id": 14,
    "title": "Secrets Hygiene with python-dotenv",
    "category": "env-git",
    "level": "beginner",
    "description": "Keys live in an untracked .env file, loaded by python-dotenv. Code reads os.environ — never a hardcoded string.",
    "why": "A committed API key is a compromised key — bots scan GitHub in seconds. .env keeps secrets out of code and history.",
    "when": "Any script touching an API key, token or connection string.",
    "code": "# .env file (NEVER commit this)\n# OPENAI_API_KEY=sk-xxxx\n# ANTHROPIC_API_KEY=sk-ant-xxxx\n\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()  # reads .env into environment\n\napi_key = os.environ.get(\"OPENAI_API_KEY\")\nif not api_key:\n    raise SystemExit(\"OPENAI_API_KEY missing — check your .env\")\n\n# .gitignore must contain:\n# .env\n# .venv/\n# __pycache__/"
  },
  {
    "id": 15,
    "title": "Project Layout: src/, prompts/, tests/",
    "category": "env-git",
    "level": "intermediate",
    "description": "A standard AI project shape: src/ for code, prompts/ versioned as files, tests/ with pytest, notebooks/ for exploration.",
    "why": "Prompts are code — versioning them as files with regression tests is what makes prompt changes safe and reviewable.",
    "when": "Scaffolding any project that will live longer than a weekend.",
    "code": "# my-ai-app/\n# src/client.py       # ChatClient wrapper\n# src/prompts.py      # load_prompt(\"summarize.txt\")\n# prompts/system.txt  # versioned like code\n# tests/test_prompts.py  # regression tests\n# notebooks/explore.ipynb\n# .env  (gitignored) | requirements.txt\n\nfrom pathlib import Path\n\ndef load_prompt(name: str) -> str:\n    return (Path(\"prompts\") / name).read_text(encoding=\"utf-8\")\n\nsystem = load_prompt(\"system.txt\")\nprint(f\"loaded {len(system)} chars\")"
  },
  {
    "id": 16,
    "title": "HTTP with requests",
    "category": "apis",
    "level": "beginner",
    "description": "GET for fetching, POST with json= for sending. Always set timeouts and check status codes before parsing.",
    "why": "Every SDK wraps HTTP — knowing requests lets you debug any integration when the wrapper's error hides the cause.",
    "when": "Calling REST endpoints directly, webhooks, health checks.",
    "code": "import requests\n\n# GET with query params\nr = requests.get(\n    \"https://api.example.com/models\",\n    headers={\"Authorization\": \"Bearer sk-xxxx\"},\n    timeout=10,\n)\nr.raise_for_status()  # raises on 4xx/5xx\nprint(r.json())\n\n# POST with a JSON body\nr = requests.post(\n    \"https://api.example.com/chat\",\n    json={\"model\": \"x\", \"prompt\": \"hi\"},\n    timeout=30,\n)\nif r.status_code == 429:\n    print(\"rate limited — back off\")\nelse:\n    r.raise_for_status()\n    print(r.json())"
  },
  {
    "id": 17,
    "title": "Status Codes & Pagination",
    "category": "apis",
    "level": "intermediate",
    "description": "2xx success, 4xx your fault, 429 slow down, 5xx try later. Paginate list endpoints with cursor/limit loops.",
    "why": "Correct status handling separates retryable blips from real bugs; pagination is how you fetch 10k records 100 at a time.",
    "when": "Listing models/files/runs, syncing datasets, resilient integrations.",
    "code": "import requests\n\ndef list_all(base_url, headers):\n    items, cursor = [], None\n    while True:\n        params = {\"limit\": 100}\n        if cursor:\n            params[\"after\"] = cursor\n        r = requests.get(base_url, headers=headers,\n                         params=params, timeout=10)\n        if r.status_code == 429:\n            import time; time.sleep(5)\n            continue  # retry after waiting\n        r.raise_for_status()\n        data = r.json()\n        items.extend(data[\"items\"])\n        cursor = data.get(\"next_cursor\")\n        if not cursor:\n            break\n    return items"
  },
  {
    "id": 18,
    "title": "OpenAI SDK: Chat Completions",
    "category": "apis",
    "level": "intermediate",
    "description": "client.chat.completions.create with a messages list. Tune temperature, track usage for cost, stream for live UX.",
    "why": "This is the core call behind most AI features — master its shape and every OpenAI-compatible API feels familiar.",
    "when": "Chat features, completions, structured extraction, streaming UIs.",
    "code": "from openai import OpenAI\n\nclient = OpenAI()  # reads OPENAI_API_KEY from env\n\nresp = client.chat.completions.create(\n    model=\"gpt-4o-mini\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"You are concise.\"},\n        {\"role\": \"user\", \"content\": \"Explain tokens in one line.\"},\n    ],\n    temperature=0.2,\n    max_tokens=200,\n)\nprint(resp.choices[0].message.content)\nprint(resp.usage)  # prompt_tokens, completion_tokens\n\n# Streaming: tokens as they arrive\nstream = client.chat.completions.create(\n    model=\"gpt-4o-mini\",\n    messages=[{\"role\": \"user\", \"content\": \"Hi\"}],\n    stream=True,\n)\nfor chunk in stream:\n    print(chunk.choices[0].delta.content or \"\", end=\"\")"
  },
  {
    "id": 19,
    "title": "Anthropic SDK & Prompt Caching",
    "category": "apis",
    "level": "advanced",
    "description": "Messages API with top-level system; cache_control breakpoints reuse long static prefixes — up to 90% cheaper.",
    "why": "System prompts + few-shot examples are re-sent every call — caching turns that repeated cost into a one-time write.",
    "when": "Long system prompts, RAG with static context, agentic loops re-sending history.",
    "code": "import anthropic\n\nclient = anthropic.Anthropic()\n\nLONG_SYSTEM = open(\"prompts/system.txt\").read()  # 5k tokens\n\nmsg = client.messages.create(\n    model=\"claude-3-5-sonnet-latest\",\n    max_tokens=500,\n    system=[\n        {\n            \"type\": \"text\",\n            \"text\": LONG_SYSTEM,\n            \"cache_control\": {\"type\": \"ephemeral\"},\n        }\n    ],\n    messages=[{\"role\": \"user\", \"content\": \"Summarize this.\"}],\n)\nprint(msg.content[0].text)\nprint(msg.usage)  # check cache_read_input_tokens"
  },
  {
    "id": 20,
    "title": "DSPy: Compiled Prompts",
    "category": "apis",
    "level": "advanced",
    "description": "Declare signatures (input to output) and let optimizers like BootstrapFewShot tune instructions + examples against your metric.",
    "why": "Hand-tuned prompts rot — DSPy compiles prompts from data so improvements are measured, not vibes.",
    "when": "Classification/extraction at scale, prompt optimization, reproducible pipelines.",
    "code": "import dspy\n\nlm = dspy.LM(\"openai/gpt-4o-mini\")\ndspy.configure(lm=lm)\n\nclass Classify(dspy.Signature):\n    ticket: str = dspy.InputField()\n    label: str = dspy.OutputField()\n\nprogram = dspy.Predict(Classify)\nprint(program(ticket=\"Charged twice!\").label)\n\n# Optimize with labeled examples + a metric\ndef metric(example, pred, trace=None):\n    return example.label == pred.label\n\ntrain = [dspy.Example(ticket=\"...\", label=\"billing\").with_inputs(\"ticket\")]\noptimizer = dspy.BootstrapFewShot(metric=metric)\ncompiled = optimizer.compile(program, trainset=train)"
  },
];