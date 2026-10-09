// Agentic AI Systems — full concept list for FDE Module 5.
// Same shape as ragModuleConcepts: id, title, category, level,
// description, why, when, code. Rendered by FDEPythonCourse.

export const agenticAiConcepts = [
  {
    id: 1,
    title: "ReAct Loop & Planner-Executor Pattern",
    category: "agent-architecture",
    level: "intermediate",
    description:
      "ReAct loops Thought -> Action -> Observation until done. Planner-executor splits it: a planner breaks the goal into steps, executors run each step with tools.",
    why: "Pure prompting guesses; ReAct grounds every step in a tool observation. Planner-executor scales it to multi-step tasks without losing the plot.",
    when: "Any agent that uses tools; multi-step research, coding and ops tasks.",
    code: "while not done:\n    thought = llm(ctx(history))\n    action = parse_tool_call(thought)\n    obs = run_tool(action)  # search, code, api\n    history += [thought, obs]  # loop on observation",
  },
  {
    id: 2,
    title: "Tool Arbiter Pattern",
    category: "agent-architecture",
    level: "advanced",
    description:
      "An arbiter sits between the agent and tools: validates args, checks policy, routes to the right tool, retries or escalates on failure. No raw tool calls.",
    why: "Agents hallucinate args and pick wrong tools. The arbiter is the policy and safety checkpoint that keeps tool use reliable.",
    when: "Production agents with many tools; destructive or paid actions; multi-tenant tool access.",
    code: "def arbiter(call):\n    check_policy(call)  # allow? quota? tenant?\n    tool = route(call)  # pick impl + validate args\n    try:\n        return tool.run(call.args)\n    except ToolError:\n        return retry_or_escalate(call)",
  },
  {
    id: 3,
    title: "Function Calling & MCP",
    category: "agent-architecture",
    level: "intermediate",
    description:
      "Function calling: model emits structured JSON matching your schema. MCP (Model Context Protocol) standardises it: servers expose tools/resources, clients discover and call them uniformly.",
    why: "JSON schemas turn free text into reliable actions; MCP stops every integration being custom glue code.",
    when: "Giving any model tools; exposing your API to agents via one MCP server.",
    code: "tools = [{'name': 'search', 'parameters': {'q': 'str'}}]\ncall = llm(prompt, tools=tools)  # {'name': 'search', 'args': {...}}\n# MCP: client lists server tools, then calls by name with args.",
  },
  {
    id: 4,
    title: "Agent Tool Use: Tavily Search & Parallel Calls",
    category: "agent-architecture",
    level: "intermediate",
    description:
      "Tavily gives search results optimised for LLM consumption. Independent calls (3 searches, N file reads) go out in parallel via asyncio.gather, not one by one.",
    why: "Serial tool calls make agents painfully slow. Parallel fan-out cuts multi-search latency from sum to max.",
    when: "Research agents; any step needing several independent lookups.",
    code: "import asyncio\nfrom tavily import TavilyClient\nt = TavilyClient()\nres = await asyncio.gather(*[t.search(q) for q in queries])\nprint(len(res), 'results in one round-trip window')",
  },
  {
    id: 5,
    title: "LangGraph: State, Nodes, Edges, Checkpointing, HITL",
    category: "frameworks",
    level: "advanced",
    description:
      "LangGraph models agents as graphs: nodes do work, edges route, shared state flows through, checkpointer persists every step, human-in-the-loop interrupts for approval.",
    why: "Raw chains cannot branch, retry or pause. Graphs give loops, conditional routing and resume-after-approval for real workflows.",
    when: "Multi-step agents with branches, retries and human approval gates.",
    code: "from langgraph.graph import StateGraph\ng = StateGraph(State)\ng.add_node('plan', planner)\ng.add_node('act', executor)\ng.add_edge('plan', 'act')  # + checkpointer + interrupt_before=['act']",
  },
  {
    id: 6,
    title: "CrewAI Role-Based Multi-Agent Teams",
    category: "frameworks",
    level: "intermediate",
    description:
      "CrewAI assigns role, goal and backstory per agent (researcher, writer, critic), hands them tools, and runs the crew with a process. Roles beat generic agents on quality.",
    why: "Specialisation works: a researcher plus a critic outperforms one do-everything prompt on complex deliverables.",
    when: "Content pipelines, research reports, code review teams.",
    code: "from crewai import Agent, Task, Crew\nr = Agent(role='Researcher', goal='find facts', tools=[search])\nw = Agent(role='Writer', goal='draft report')\nCrew(agents=[r, w], tasks=[t1, t2]).kickoff()",
  },
  {
    id: 7,
    title: "Sequential vs Hierarchical Process",
    category: "frameworks",
    level: "intermediate",
    description:
      "Sequential: tasks run in fixed order, each feeding the next. Hierarchical: a manager agent plans, delegates to workers in parallel, then synthesises.",
    why: "Order fits pipelines; hierarchy fits open-ended goals where the manager adapts the plan from worker results.",
    when: "Fixed pipeline -> sequential. Research or build tasks with unknowns -> hierarchical.",
    code: "# CrewAI: process=Process.sequential  # fixed pipeline\n# process=Process.hierarchical  # manager delegates + synthesises",
  },
  {
    id: 8,
    title: "Agentic RAG & n8n Workflow Automation",
    category: "frameworks",
    level: "intermediate",
    description:
      "Agentic RAG: the agent decides when to retrieve, what to retrieve and whether to retry — retrieval is a tool, not a fixed pipe. n8n wires the same flows visually with LLM nodes.",
    why: "Fixed RAG retrieves once even when wrong. Agent-driven retrieval loops until evidence is sufficient; n8n ships it without boilerplate.",
    when: "Hard QA needing adaptive retrieval; automating AI pipelines for non-dev teammates.",
    code: "def agent_qa(q):\n    docs = retrieve(q)\n    while not sufficient(docs, q):\n        docs += retrieve(rewrite(q, docs))  # agent loops\n    return llm(ctx(docs), q)",
  },
  {
    id: 9,
    title: "Agent Memory: Short-Term, Long-Term, Episodic",
    category: "memory-safety",
    level: "intermediate",
    description:
      "Short-term: conversation buffer in the prompt window. Long-term: facts and embeddings in a vector store across sessions. Episodic: past trajectories to learn from.",
    why: "Stateless agents repeat questions and forget users. Layered memory gives continuity without blowing the context window.",
    when: "Multi-turn assistants; personalisation; agents that improve from past runs.",
    code: "history.append(msg)  # short-term buffer (trim to N)\nstore.upsert(user_id, fact_vec)  # long-term vector memory\nlog(episode)  # episodic: replay wins and failures",
  },
  {
    id: 10,
    title: "Multi-Agent Orchestration & Fault Isolation",
    category: "memory-safety",
    level: "advanced",
    description:
      "Supervisor: one brain routes to workers. Peer-to-peer: agents negotiate. Fault isolation: timeouts, retries with backoff, bulkheads and kill-switches per agent.",
    why: "One rogue agent should not hang or corrupt the whole system. Orchestration plus isolation keeps fleets reliable.",
    when: "3+ agents cooperating; untrusted tools; production fleets.",
    code: "with timeout(30):\n    out = await worker.run(task)  # isolate per agent\n# supervisor routes; failures retry once, then escalate.",
  },
  {
    id: 11,
    title: "LLM Evaluation: RAGAS, DeepEval, PromptFoo, Trajectories",
    category: "memory-safety",
    level: "advanced",
    description:
      "RAGAS: faithfulness and relevancy. DeepEval: pytest-style LLM asserts in CI. PromptFoo: prompt regression across models. Trajectory eval: score the whole tool-use path, not just the final answer.",
    why: "Agents fail mid-path with a plausible final answer. Trajectory eval catches wrong tool calls that answer-only evals miss.",
    when: "CI for agents; comparing prompts, models and tool layouts.",
    code: "# deepeval: assert answer_relevancy > 0.8 in pytest\n# promptfoo eval config.yaml  # prompt regression\n# log full trajectory: thoughts, calls, obs -> score path",
  },
  {
    id: 12,
    title: "Guardrails, Injection Defence, PII Scrubbing, Filtering",
    category: "memory-safety",
    level: "advanced",
    description:
      "Guardrails AI validates inputs and outputs against schemas and policies. Injection defence: delimit untrusted content, least-privilege tools. PII scrubbing redacts before logging. Output filtering blocks unsafe content.",
    why: "Agents touch tools and data — prompt injection becomes remote-code-execution risk. Layered guardrails contain it.",
    when: "Any agent reading untrusted web/docs or taking actions; compliance and logging.",
    code: "text = redact_pii(raw)  # scrub before LLM + logs\nout = guard.validate(llm(prompt(untrusted)))  # schema + policy\n# tools get least privilege; confirm destructive calls.",
  },
];
