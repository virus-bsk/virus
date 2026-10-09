// Advanced RAG & LLM Fine-Tuning — full concept list for FDE Module 4.
// Same shape as ragModuleConcepts: id, title, category, level,
// description, why, when, code. Rendered by FDEPythonCourse.

export const advancedRagFinetuneConcepts = [
  {
    id: 1,
    title: "Query Rewriting & Multi-Hop Retrieval",
    category: "advanced-rag",
    level: "advanced",
    description:
      "Rewrite vague user queries into retrieval-friendly forms (HyDE, step-back, sub-question split) and chain hops: retrieve, read, then retrieve again with new context for questions needing 2+ docs.",
    why: "Real questions are under-specified and multi-hop. Single-shot retrieval on the raw query misses bridge entities the second hop needs.",
    when: "Multi-doc QA; follow-up questions; anytime top-k misses despite the answer existing in the corpus.",
    code: "subs = llm('Split into sub-questions: ' + q).splitlines()\ndocs = [store.search(s, k=5) for s in subs]\nanswer = llm(ctx(docs), q)  # hop 2 uses hop-1 facts",
  },
  {
    id: 2,
    title: "Cross-Encoder Reranking (Advanced)",
    category: "advanced-rag",
    level: "advanced",
    description:
      "Retrieve 50-100 cheaply with bi-encoders, then score (query, doc) pairs jointly with a cross-encoder (bge-reranker, ms-marco-MiniLM). Keep top 5 for the LLM.",
    why: "Biggest single quality win in RAG: fixes ordering mistakes dense and BM25 search both make, directly lifting answer accuracy.",
    when: "Final stage of any pipeline where top-1 accuracy beats a few hundred ms of latency.",
    code: "from sentence_transformers import CrossEncoder\nr = CrossEncoder('BAAI/bge-reranker-base')\ns = r.predict([(q, d) for d in cands])\ntop5 = [d for _, d in sorted(zip(s, cands), reverse=True)[:5]]",
  },
  {
    id: 3,
    title: "Self-Correcting RAG: CRAG, Self-RAG, Agentic RAG",
    category: "advanced-rag",
    level: "advanced",
    description:
      "CRAG grades retrieved docs and falls back to web search when quality is low. Self-RAG trains the model to emit reflection tokens (retrieve? relevant? supported?). Agentic RAG lets an agent loop retrieve, critique and retry.",
    why: "Static pipelines fail silently on bad retrieval. Self-correction routes each query down the right path instead of one fixed flow.",
    when: "Noisy corpora; mixed answerable and unanswerable queries; production RAG that must say I-don't-know safely.",
    code: "docs = retrieve(q)\nif grade(docs, q) < 0.5: docs = web_search(q)  # CRAG fallback\nans = llm(ctx(docs), q)\nif not grounded(ans, docs): ans = llm(ctx(retrieve(q+' details')), q)",
  },
  {
    id: 4,
    title: "LoRA & QLoRA Fine-Tuning",
    category: "fine-tuning",
    level: "intermediate",
    description:
      "LoRA freezes base weights and trains small rank-r adapters (r=8-64). QLoRA adds 4-bit quantisation (bitsandbytes NF4) so a 7B model fits on one consumer GPU.",
    why: "Full fine-tuning needs datacenter GPUs. LoRA/QLoRA cuts trainable params ~1000x with near-equal quality on style and domain tasks.",
    when: "Adapting an open model to your tone, format or domain on a single GPU.",
    code: "from peft import LoraConfig, get_peft_model\ncfg = LoraConfig(r=16, lora_alpha=32, target_modules=['q_proj','v_proj'])\nmodel = get_peft_model(base_model, cfg)  # + load_in_4bit for QLoRA",
  },
  {
    id: 5,
    title: "Adapters & Prefix Tuning (HuggingFace)",
    category: "fine-tuning",
    level: "intermediate",
    description:
      "Adapters insert tiny bottleneck layers per task; prefix tuning prepends learnable virtual tokens. Both via transformers plus PEFT plus datasets with <1% trainable params.",
    why: "One frozen base, many swappable task modules: multi-tenant serving without copying 7B weights per task.",
    when: "Many tasks on one base model; swapping skills at runtime; tiny datasets.",
    code: "from peft import PrefixTuningConfig, get_peft_model\ncfg = PrefixTuningConfig(num_virtual_tokens=20)\nmodel = get_peft_model(base, cfg)\nmodel.print_trainable_parameters()  # <1% trainable",
  },
  {
    id: 6,
    title: "Axolotl YAML-Driven Fine-Tuning Pipeline",
    category: "fine-tuning",
    level: "advanced",
    description:
      "Axolotl turns tuning into a config file: base_model, datasets, LoRA, trainer, wandb in one YAML. Reproducible runs with axolotl train config.yml.",
    why: "Removes glue code: dataset formatting, trainer wiring and eval are declarative and version-controlled.",
    when: "Standardising tuning runs across a team; moving from notebook to repeatable pipeline.",
    code: "base_model: TinyLlama-1.1B-Chat\nload_in_4bit: true\nadapter: qlora\nlora_r: 16",
  },
  {
    id: 7,
    title: "GPU Rental on RunPod & vast.ai",
    category: "fine-tuning",
    level: "beginner",
    description:
      "Rent A100/4090-class GPUs by the hour: RunPod (templates, pods, serverless) and vast.ai (cheapest spot market). Pick VRAM first, then price vs reliability.",
    why: "QLoRA still needs 12-24GB VRAM. Rental gives datacenter GPUs for dollars per run instead of thousands in hardware.",
    when: "Tuning runs longer than Colab allows; choosing 3090 vs 4090 vs A100 for a run.",
    code: "# RunPod: pick GPU (24GB+), deploy PyTorch template, run:\n# pip install -r requirements.txt && axolotl train config.yml\n# vast.ai: filter cuda>=12, vram>=24, sort $/hr, ssh in.",
  },
  {
    id: 8,
    title: "Distillation, RLHF & DPO with trl",
    category: "fine-tuning",
    level: "advanced",
    description:
      "Distillation trains a small student on teacher outputs. RLHF aligns via reward model + PPO. DPO skips the reward model and optimises preferred vs rejected pairs directly — all in HuggingFace trl.",
    why: "SFT teaches format; alignment teaches preferences (helpful, safe, on-brand). DPO gives most of RLHF's gain with far less infra.",
    when: "After SFT, when outputs are correct but tone/safety/preference is off; compressing a big model into a small one.",
    code: "from trl import DPOTrainer\ntrainer = DPOTrainer(model, ref, args, train_data, tokenizer)\ntrainer.train()  # pairs: {prompt, chosen, rejected}",
  },
  {
    id: 9,
    title: "Training Monitoring with Weights & Biases",
    category: "fine-tuning",
    level: "beginner",
    description:
      "wandb logs loss curves, learning rate, GPU util and sample outputs per run. Compare runs side-by-side and kill diverged jobs early.",
    why: "Blind training wastes GPU dollars. Live curves catch divergence, overfitting and bad LR in minutes not hours.",
    when: "Every tuning run; comparing LoRA ranks, LRs and datasets.",
    code: "import wandb\nwandb.init(project='fde-tune', config={'lr': 2e-4, 'r': 16})\nwandb.log({'loss': 1.2, 'lr': 2e-4})  # or report_to='wandb' in HF Trainer",
  },
  {
    id: 10,
    title: "Ollama for Local Inference",
    category: "local-deployment",
    level: "beginner",
    description:
      "Ollama runs open models locally: ollama pull llama3.1, ollama run mistral, plus an OpenAI-compatible API at localhost:11434 for RAG apps.",
    why: "Zero API cost, private data stays on-device, and offline dev for the whole RAG stack.",
    when: "Local dev and eval; privacy-sensitive docs; demos without cloud bills.",
    code: "# ollama pull llama3.1:8b\n# ollama run llama3.1:8b\ncurl localhost:11434/api/generate -d '{\"model\":\"llama3.1:8b\",\"prompt\":\"Hi\"}'",
  },
  {
    id: 11,
    title: "GGUF Quantisation (Q4_K_M, Q8_0)",
    category: "local-deployment",
    level: "intermediate",
    description:
      "GGUF packs weights into fewer bits: Q8_0 (~1GB per 1B params, near-lossless), Q4_K_M (~0.5GB per 1B, best quality/size balance). 8B model: ~8GB at Q8, ~5GB at Q4.",
    why: "Quantisation decides what fits in your RAM/VRAM. Q4_K_M is the default sweet spot for laptops; Q8_0 when quality matters most.",
    when: "Fitting 7-8B models on 8-16GB machines; trading perplexity vs memory.",
    code: "# ollama pull llama3.1:8b            # Q4_K_M default\n# ollama pull llama3.1:8b-instruct-q8_0  # higher quality, more RAM",
  },
  {
    id: 12,
    title: "Llama 3, Phi-3, Mistral",
    category: "local-deployment",
    level: "beginner",
    description:
      "Llama 3.1 8B: best general open default. Phi-3 mini/small: fastest on CPU, great for constrained boxes. Mistral 7B/Mixtral: strong quality, sliding-window attention for long context.",
    why: "Picking the right base sets the ceiling for RAG answer quality and the floor for latency and RAM.",
    when: "Choosing the local model for a RAG app, eval harness or fine-tune base.",
    code: "ollama pull llama3.1:8b   # general default\nollama pull phi3:mini      # CPU / low RAM\nollama pull mistral:7b     # quality + long context",
  },
  {
    id: 13,
    title: "Model Selection & Cost-Performance Trade-offs",
    category: "local-deployment",
    level: "intermediate",
    description:
      "Score candidates on quality (evals/RAGAS), latency (tokens/sec), memory (fits Q4?), licence (commercial use?) and cost (API $/1M tokens vs GPU $/hr). Small + RAG often beats big alone.",
    why: "A 8B model with great retrieval beats a 70B model with bad retrieval at 10x lower cost. Selection is a system decision, not a leaderboard pick.",
    when: "Shipping: cloud API vs rented GPU vs local; justifying 8B vs 70B to stakeholders.",
    code: "# Rule: eval quality first, then cheapest tier that clears the bar.\n# 8B+good RAG > 70B+bad RAG at ~1/10th the cost.",
  },
];
