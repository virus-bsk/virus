// LLMOps & Deployment — full concept list for FDE Module 6.
// Same shape as ragModuleConcepts: id, title, category, level,
// description, why, when, code. Rendered by FDEPythonCourse.

export const llmOpsDeployConcepts = [
  {
    id: 1,
    title: "FastAPI: Async Endpoints, SSE Streaming, Auth, Rate Limits",
    category: "serving",
    level: "intermediate",
    description:
      "FastAPI serves the RAG agent: async endpoints for concurrent LLM calls, SSE streaming for token-by-token UX, auth middleware for tenants, slowapi rate limiting per key.",
    why: "Sync servers block on every LLM call; streaming plus async is what makes AI apps feel instant and scale.",
    when: "Shipping any chat/RAG API; adding per-user quotas and auth.",
    code: "from fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\napp = FastAPI()\n@app.get('/chat')\nasync def chat(q: str):\n    return StreamingResponse(tokens(q))  # + auth middleware + slowapi limits",
  },
  {
    id: 2,
    title: "Docker & Compose: API + ChromaDB + Redis",
    category: "serving",
    level: "intermediate",
    description:
      "One Dockerfile per service (slim python base), one compose file wiring API, ChromaDB and Redis. Slim images cut pull time and CVE surface.",
    why: "Works-on-my-machine dies in prod. Compose gives the whole stack (API, vector DB, cache) in one reproducible up.",
    when: "Containerising the RAG app; local prod-parity dev; first deploy.",
    code: "# docker-compose.yml: api (build .) + chromadb image + redis image\n# Dockerfile: FROM python:3.12-slim, COPY requirements, CMD uvicorn",
  },
  {
    id: 3,
    title: "GitHub Actions CI/CD + Prompt Regression",
    category: "serving",
    level: "intermediate",
    description:
      "Pipeline: test -> build image -> push to registry -> deploy. Prompt regression (PromptFoo/DeepEval) runs in CI so a prompt tweak cannot silently break answers.",
    why: "Prompts are code: untested prompt edits are the top cause of AI regressions. CI gates them like unit tests.",
    when: "Every push to main; before any prompt or model change ships.",
    code: "# .github/workflows/ci.yml: pytest -> promptfoo eval -> docker build+push -> deploy\n# fail the build if faithfulness or relevancy drops.",
  },
  {
    id: 4,
    title: "Environments & Secret Management",
    category: "serving",
    level: "beginner",
    description:
      "Separate staging and prod configs; secrets (API keys, DB URLs) in a manager (AWS Secrets Manager, Doppler, Vault) — never in git or images.",
    why: "Leaked keys and staging-prod mixups are the most common prod incidents. One pattern prevents both.",
    when: "First staging env; onboarding teammates; audit prep.",
    code: "# .env.example checked in, .env never\n# prod reads secrets at runtime: secrets manager -> env vars",
  },
  {
    id: 5,
    title: "Kubernetes: Deployments, Services, Limits, HPA",
    category: "cloud",
    level: "advanced",
    description:
      "Deployments roll out pods, Services route to them, resource limits protect neighbours, HPA scales replicas on CPU, latency or queue depth.",
    why: "Compose fits one box; K8s fits traffic spikes and zero-downtime deploys across many boxes.",
    when: "Traffic outgrows one host; need autoscale and rolling deploys.",
    code: "# deployment.yaml: replicas 3, limits cpu/memory, readinessProbe /health\n# hpa: min 2 max 10, target CPU 70%",
  },
  {
    id: 6,
    title: "Terraform: Infra as Code & State",
    category: "cloud",
    level: "advanced",
    description:
      "Terraform declares VPC, cluster, DB and buckets in HCL; state tracks reality; plan previews, apply converges. Same file rebuilds staging and prod.",
    why: "Click-ops cannot be reviewed or repeated. Code-reviewed infra is reproducible and auditable.",
    when: "Second environment; team-owned cloud; disaster recovery.",
    code: "# main.tf: aws_eks_cluster + aws_db_instance\n# terraform plan -> review -> apply; state in S3 backend",
  },
  {
    id: 7,
    title: "AWS: EC2, ECS Fargate, ECR, S3, RDS",
    category: "cloud",
    level: "intermediate",
    description:
      "EC2 for GPU boxes, ECS Fargate for serverless containers, ECR as the image registry, S3 for docs and artefacts, RDS Postgres (pgvector) for metadata plus vectors.",
    why: "One coherent AWS map stops service sprawl: each workload lands on the cheapest service that fits.",
    when: "First AWS deploy; choosing Fargate vs EC2 for the API; storing corpora and models.",
    code: "# ECR push -> ECS Fargate service -> RDS Postgres + S3 bucket\n# GPU tuning on EC2 g5, serving on Fargate or inf2",
  },
  {
    id: 8,
    title: "Spot Instances, Autoscaling & Inference Cost Profile",
    category: "cloud",
    level: "intermediate",
    description:
      "Spots cut GPU cost ~70% but can vanish; mix spot batch jobs with on-demand serving. Autoscale to zero idle, and know the $/1M-tokens math for API vs self-host.",
    why: "Always-on GPUs idle-burn money. Cost-aware scaling is often the difference between viable and dead AI products.",
    when: "Cutting the cloud bill; batch evals vs live serving split.",
    code: "# batch evals -> spot (interrupt-tolerant)\n# live API -> on-demand + HPA to zero idle",
  },
  {
    id: 9,
    title: "LangSmith Tracing, Cost & Latency Dashboards",
    category: "observability",
    level: "intermediate",
    description:
      "LangSmith traces every chain, retriever and LLM call: inputs, outputs, tokens, cost and latency per step. Dashboards surface slow steps and expensive prompts.",
    why: "Blind pipelines cannot be debugged or billed. Traces turn 'wrong answer' into the exact guilty step.",
    when: "First production issue; cost attribution per tenant; latency tuning.",
    code: "# LANGSMITH_TRACING=true, key set -> every LCEL run traced\n# filter by run type, sort by latency, replay inputs",
  },
  {
    id: 10,
    title: "Guardrails AI & OpenAI Moderation API",
    category: "observability",
    level: "intermediate",
    description:
      "Guardrails AI enforces schemas and policies on inputs/outputs; Moderation API flags hate, self-harm and sexual content before serving or logging.",
    why: "One unsafe output can end a product. Two cheap gates catch most of it before users see it.",
    when: "User-facing generation; UGC pipelines; compliance requirements.",
    code: "flags = moderation(input)\nif flags.block: refuse()\nout = guard.validate(llm(answer))  # schema + policy rails",
  },
  {
    id: 11,
    title: "PII Scrubbing & Output Filtering",
    category: "observability",
    level: "beginner",
    description:
      "Redact emails, phones, keys and IDs before prompts, traces and logs; filter outputs for secrets and unsafe content before display.",
    why: "Logs and traces leak what prompts see. Scrub-once-upstream protects every downstream store.",
    when: "Logging prompts; traces with user data; support tooling.",
    code: "clean = scrub_pii(raw)  # regex + detector before LLM/logs\nserve(filter_output(answer))",
  },
  {
    id: 12,
    title: "Eval Suites in CI: DeepEval + PromptFoo",
    category: "observability",
    level: "advanced",
    description:
      "DeepEval gives pytest-style LLM asserts (relevancy, faithfulness) in CI; PromptFoo diffs prompts and models across a matrix. Both gate deploys.",
    why: "Evals outside CI rot. In-CI suites block the exact commit that regressed quality.",
    when: "Merging prompt, model or retrieval changes; nightly regression runs.",
    code: "# deepeval test suite in pytest; promptfoo eval config.yaml\n# CI fails if faithfulness < 0.9 or regression > threshold",
  },
  {
    id: 13,
    title: "LLMOps: Operating Non-Deterministic Software",
    category: "observability",
    level: "beginner",
    description:
      "LLMs are probabilistic: same input, varied output; behaviour drifts with model versions. LLMOps means versioned prompts, datasets, evals, traces and staged rollouts instead of deploy-and-pray.",
    why: "Traditional ops assumes deterministic builds. AI needs statistical quality gates and rollback by eval score.",
    when: "Explaining ops overhead to stakeholders; setting up the AI release process.",
    code: "# version prompts + datasets + evals; canary new model;\n# rollback when eval score drops, not just on 500s",
  },
];
