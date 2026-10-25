/**
 * javaCodingGridConfig
 * Presentation config for the "Top 30 Java Coding Questions" grid that is
 * rendered on the home page. The `id`/`name`/`tagline` values below are the
 * copy the grid header displays (these intentionally live inside the grid,
 * not duplicated in the home-page hero).
 */
export const javaCodingGridConfig = {
  id: "java-30-coding-questions",
  name: "Top 30 Java Coding Interview Questions",
  tagline: "Prepare with these frequently asked interview questions",
  icon: "☕",
  totalQuestions: 30,
  answered: 30,
  progress: 100,
  description:
    "Thirty must-know Java coding problems — arrays & strings, hashing, two-pointer & sliding-window, heaps, linked lists, divide-and-conquer (merge sort inversion counting), and dynamic programming — each solved with an optimized, syntax-highlighted Java solution.",
  subtopics: [
    { name: "Arrays & Strings", icon: "📦" },
    { name: "Two Pointers & Sliding Window", icon: "🔄" },
    { name: "Hashing", icon: "🧭" },
    { name: "Heaps & Priority Queue", icon: "📊" },
    { name: "Linked Lists", icon: "🔗" },
    { name: "Divide & Conquer", icon: "✂️" },
    { name: "Dynamic Programming", icon: "🧠" },
    { name: "Binary Search", icon: "🔍" },
    { name: "Stacks & Queues", icon: "📚" },
  ],
};
