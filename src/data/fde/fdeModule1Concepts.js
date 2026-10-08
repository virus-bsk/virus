// FDE Module 1 concept data — one workspace entry per section (same pattern
// Module 2 uses: navigator on the left, lesson detail on the right). Each
// entry carries that section's card-grid lessons + written content, rendered
// in "lessons" mode by FDEPythonCourse via the shared LLMCourse component.
import { llmCourseVideos } from "../llm/llmCourseVideos";
import { llmCourseContent } from "../llm/llmCourseContent";
import {
  promptDesignLessons,
  promptDesignContent,
} from "./promptDesignContent";
import {
  advancedTechniqueLessons,
  advancedTechniqueContent,
} from "./advancedTechniquesContent";

export const fdeModule1Concepts = [
  {
    id: 1,
    title: "LLM Fundamentals",
    category: "module-1",
    level: "core",
    description:
      "Transformer architecture, attention, KV Cache, MoE, reasoning models, AI assistants and no-code tools — the foundations every LLM engineer needs.",
    why: "Core mental models for how LLMs work and when to reach for each assistant or tool.",
    when: "Starting any LLM project — pick the right model, assistant and tooling first.",
    lessons: llmCourseVideos,
    contentMap: llmCourseContent,
  },
  {
    id: 2,
    title: "Prompt Design",
    category: "module-1",
    level: "core",
    description:
      "Zero-shot, few-shot, role, task, context, format, persona & tone, Chain-of-Thought, Tree of Thought, self-consistency, reflection, chaining, system prompts and injection defence.",
    why: "Prompting is the highest-leverage skill in applied LLM work.",
    when: "Every LLM feature — design, test and harden prompts before shipping.",
    lessons: promptDesignLessons,
    contentMap: promptDesignContent,
  },
  {
    id: 3,
    title: "Advanced Techniques",
    category: "module-1",
    level: "advanced",
    description:
      "Function calling, structured outputs, Pydantic, tokenization & cost, DSPy, ReAct, safety prompting, multimodal inputs and LLM APIs.",
    why: "Production LLM systems need tools, structure, cost control and safety.",
    when: "Moving from demos to reliable, observable production systems.",
    lessons: advancedTechniqueLessons,
    contentMap: advancedTechniqueContent,
  },
];

