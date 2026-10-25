const ROUTE_LABELS = {
  features: "Features",
  roadmap: "90-Day Job Roadmap",
  java: "Java",
  javascript: "JavaScript",
  reactjs: "ReactJS",
  "spring-boot": "Spring Boot",
  microservices: "Microservices",
  sql: "SQL & Databases",
  kafka: "Apache Kafka",
  dsa: "Data Structures & Algorithms",
  "reactive-programming": "Reactive Programming",
  "system-design": "System Design",
  "company-interview": "Company Interviews",
  contact: "Contact",
  "cline-test": "Cline Test",
  profile: "My Profile",
  payment: "Payment",
  "resume-builder": "Resume Builder",
  "bsk-admin-97": "Admin Console",
  login: "Login",
  register: "Register",
  course: "Course",
  interview: "Interview Preparation",
  "coding-questions": "Coding Interview Questions",
  leetcode: "LeetCode Practice",
  maang: "MAANG",
  jobs: "Company Jobs",
  "interview-prep": "Interview Preparation",
  "basic-dsa": "Basic DSA",
  "advanced-dsa": "Advanced DSA",
  graphs: "Graph Algorithms",
  dp: "Dynamic Programming",
  "weekly-preparation": "Weekly Preparation",
  "system-design-basics": "System Design Basics",
  oops: "Object-Oriented Programming",
  solid: "SOLID Principles",
  patterns: "Design Patterns",
  uml: "UML",
  acid: "ACID Properties",
  cap: "CAP Theorem",
  scalability: "Scalability",
  "load-balancing": "Load Balancing",
  caching: "Caching",
  "database-concepts": "Database Concepts",
  "api-design": "API Design",
  "distributed-systems": "Distributed Systems",
  messaging: "Messaging",
  "reactive-deep-dive": "Reactive Deep Dive",
  "ai-ml-fundamentals": "AI/ML Fundamentals",
  "high-availability": "High Availability",
  observability: "Observability",
  security: "Security",
  cdn: "Content Delivery Networks",
  "search-systems": "Search Systems",
  "file-storage": "File Storage",
  "distributed-techniques": "Distributed Techniques",
  "data-processing": "Data Processing",
  "cloud-infrastructure": "Cloud Infrastructure",
  "advanced-modern": "Advanced & Modern Systems",
  "lld-parking-lot": "Parking Lot",
  "lld-elevator": "Elevator",
  "lld-vending": "Vending Machine",
  "lld-splitwise": "Splitwise",
  "lld-atm": "ATM",
  "lld-chess": "Chess",
  "lld-tictactoe": "Tic-Tac-Toe",
  "lld-snake": "Snake",
  "lld-lru": "LRU Cache",
  "lld-ratelimit": "Rate Limiter",
  "lld-library": "Library Management",
  "hld-url-shortener": "URL Shortener",
  "lld-hotel": "Hotel Booking",
  advanced: "Advanced System Design",
  "llm-fundamentals": "LLM Fundamentals",
  "forward-deployment-engineer": "Forward Deployment Engineer",
};

function labelFor(segment, parentLabel) {
  if (segment === "course" && parentLabel) {
    return `${parentLabel} Course`;
  }
  if (segment === "interview" && parentLabel) {
    return `${parentLabel} Interview Prep`;
  }
  return (
    ROUTE_LABELS[segment] ||
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function buildAppBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return [];
  }

  const breadcrumbs = [];
  const isMaangRoute = segments[0] === "maang";
  let routePrefix = "";

  breadcrumbs.push({ label: "Home", to: "/" });

  for (let index = 0; index < segments.length; index++) {
    const segment = segments[index];

    if (
      isMaangRoute &&
      segment === "system-design" &&
      segments.length > index + 1
    ) {
      breadcrumbs.push({
        label: "System Design Basics",
        to: "/maang/system-design-basics",
      });
      routePrefix = "/maang/system-design";
      continue;
    }

    routePrefix += `/${segment}`;
    const previous = breadcrumbs[breadcrumbs.length - 1];
    let label = labelFor(segment, previous?.label);

    if (
      segment === "forward-deployment-engineer" &&
      /^\d+$/.test(segments[index + 1] || "")
    ) {
      label = "Forward Deployment Engineer";
    } else if (
      /^\d+$/.test(segment) &&
      segments[index - 1] === "forward-deployment-engineer"
    ) {
      label = `Module ${String(Number(segment)).padStart(2, "0")}`;
    }

    breadcrumbs.push({ label, to: routePrefix });
  }

  return breadcrumbs;
}
