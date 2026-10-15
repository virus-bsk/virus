// ===== UML Diagrams — topic data =====
import {
  svgClassDiagram,
  svgSequenceDiagram,
  svgUseCaseDiagram,
  svgActivityDiagram,
  svgStateMachineDiagram,
  svgComponentDiagram,
  svgDeploymentDiagram,
  svgPackageDiagram,
} from "./umlDiagrams";

const CHANNEL_UPLOADS =
  "https://www.youtube.com/playlist?list=UUTirDqmh7EyUCB8661XdwYw";

export const umlTopics = [
  // ---------- 1. CLASS DIAGRAM ----------
  {
    id: "class-diagram",
    icon: "fa-th-large",
    title: "Class Diagram",
    sub: "Structure — static view",
    category: "structural",
    desc: "Shows classes, their attributes, methods, and the relationships among them.",
    definition:
      "Simple rule: one diagram = one picture of what your system looks like.\n\nEach class is a box with 3 sections \u2014 name, attributes (what it holds), and operations (what it can do). Lines between boxes show how classes talk to each other \u2014 inheritance, association, composition, or just a passing reference.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ==== CLASS DIAGRAM (structural) ====
// Rendered as boxes with 3 sections: name / attributes / operations

class Employee {                 // +----------+
    private String name;         // | Employee |  <- class name
    private int id;              // +----------+
    private double salary;       // | - name   |  <- attributes
                                 // | - id     |
    public Employee(String n){ } // | - salary |
    public double getSalary(){   // +----------+
        return salary;           // | + Employee  <- operations
    }                            // | + getSalary
    public void setName(String n) { // + setName
        this.name = n;
    }
}

// Relationships to show on the diagram:
//   Employee "1" -------- "1..*" works in "0..*" Department  (association + multiplicity)
//   Manager --> Employee                                        (inheritance)
//   House *-- Room                                             (composition)
//   Car  o-- Wheel                                             (aggregation)
//   Order ..> Logger                                           (dependency, dashed)
`,
    diagram: svgClassDiagram,
    relation: "Static structure: classes + attributes + operations + relationships",
    points: [
      "3-section box (name/attrs/ops)",
      "Visibility: + public, - private, # protected",
      "Multiplicity (1, 0..*, 1..*)",
      "Association / inheritance / composition arrows",
    ],
  },

  // ---------- 2. SEQUENCE DIAGRAM ----------
  {
    id: "sequence-diagram",
    icon: "fa-arrows-alt-v",
    title: "Sequence Diagram",
    sub: "Behaviour / time-ordered",
    category: "behavioral",
    desc: "Shows how objects interact over time via messages, in a vertical lifeline timeline.",
    definition:
      "Simple rule: read the diagram top-to-bottom, like a timeline.\n\nEach participant (class/actor) has a lifeline (dashed vertical line). Horizontal arrows are messages passed between them, in the order they happen. Activation bars (thin rectangles on the lifeline) show when an object is actively working on a task.",
    videoLink: CHANNEL_UPLOADS,
    code: `/* ==== SEQUENCE DIAGRAM (behavioural, time-ordered) ====
   User         OrderService        PaymentGateway        OrderRepository
    |  placeOrder() |                    |                      |
    |-------------->|  processPayment()  |                      |
    |               |------------------>|                      |
    |               |   paymentOk()     |                      |
    |               |<------------------|                      |
    |               |  save(order)      |                      |
    |               |------------------------------------------->|
    |               |         orderSaved()                       |
    |               |<-------------------------------------------|
    | <confirm>     |                    |                      |
    |<--------------|                    |                      |
--- The vertical dashed lines are LIFELINES.
--- Arrows are MESSAGES sent in time order (top -> bottom).
--- Solid arrows = call, dashed arrow = return.
--- Thin rectangles = ACTIVATION (focus of control).
*/

class OrderService {
    void placeOrder(Order order) {
        boolean ok = pay(order);        // message to PaymentGateway
        if (ok) repository.save(order); // message to OrderRepository
    }
}
`,
    diagram: svgSequenceDiagram,
    relation: "Time-ordered messages between objects - lifelines + activation bars",
    points: [
      "Lifelines for each participant",
      "Activation bars show focus",
      "Call (solid) vs return (dashed) arrows",
      "Top-to-bottom time flow",
    ],
  },

  // ---------- 3. USE-CASE DIAGRAM ----------
  {
    id: "use-case-diagram",
    icon: "fa-user-check",
    title: "Use-Case Diagram",
    sub: "Behaviour / functional view",
    category: "behavioral",
    desc: "Captures the functional requirements of a system: actors, use cases, and the relationships between them.",
    definition:
      "Simple rule: use cases answer what does this system DO not HOW. Actors (stick figures) represent users or other systems. Use cases (ovals) are the features they can use, drawn inside a system boundary (the rectangle). The include arrow means one use case always needs another (mandatory). The extend arrow means one use case optionally triggers another.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ==== USE-CASE DIAGRAM (behavioural) ====
// Captures functional requirements as ACTORS + USE CASES
//
// Actors (who)  ->  stick figures outside the box
// Use cases     ->  ovals inside the system boundary
// System        ->  rectangle (the "what we're building")
//
// Relationships:
//   -- association : actor connects to use case
//   include        : base use case ALWAYS uses another (mandatory reuse)
//   extend         : base use case OPTIONALLY triggers another
//
// Example - Online Shopping:
//   Customer -- (Browse Products)
//   Customer -- (Place Order) --include--> (Make Payment)
//   Customer -- (Place Order) --extend---> (Apply Coupon)
//   Admin    -- (Manage Inventory)
//   PaymentGateway -- (Make Payment)
`,
    diagram: svgUseCaseDiagram,
    relation: "What the system does - actors, use cases, system boundary",
    points: [
      "Actors (stick figures) interact with system",
      "Use cases = ovals inside system boundary",
      "include = mandatory reuse",
      "extend = optional behavior",
    ],
  },

  // ---------- 4. ACTIVITY DIAGRAM ----------
  {
    id: "activity-diagram",
    icon: "fa-project-diagram",
    title: "Activity Diagram",
    sub: "Behaviour / workflow",
    category: "behavioral",
    desc: "Models the workflow / business process as a flowchart of activities, decisions, and parallel actions.",
    definition:
      "An Activity diagram is a flowchart of a process. Start (filled circle) -> Activities (rounded rectangles) -> Decisions (diamonds) -> Fork/Join bars (parallelism) -> End (bull's eye). Perfect for modelling business logic, algorithms, and use-case flows.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ==== ACTIVITY DIAGRAM (behavioural, workflow) ====
// Flowchart of business logic with decisions and parallelism
//
//   (start) -> [Login] -> <valid?> -yes-> <admin?> -yes-> [Admin Panel]
//                                   |                  \\-no-> [User Home]
//                                   \\-no-> [Show Error] -> (end)
//
// Fork/Join bars for PARALLEL work:
//   +----------+
//   | Process  |---> [Send Email]
//   | Order    |--> [Update Inventory]   <-- these run in PARALLEL
//   +----------+
//
// Used to model:
//   * Use-case internals
//   * Business workflows (order -> pay -> ship)
//   * Algorithm steps
//   * Method call flows with parallelism
`,
    diagram: svgActivityDiagram,
    relation: "Workflow / process flow with decisions, forks, joins",
    points: [
      "Start and end nodes",
      "Activities = rounded rectangles",
      "Decision diamonds, parallel fork/join bars",
      "Use for business workflows",
    ],
  },

  // ---------- 5. STATE MACHINE DIAGRAM ----------
  {
    id: "state-machine-diagram",
    icon: "fa-toggle-on",
    title: "State Machine Diagram",
    sub: "Behaviour / states of an object",
    category: "behavioral",
    desc: "Models the lifecycle of a single object: states, events, transitions, and actions.",
    definition:
      "A State Machine diagram (or State-Chart) describes how an object moves through different states in response to events. Useful for object lifecycles (Order -> Pending -> Paid -> Shipped -> Delivered), UI flows, and protocol states.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ==== STATE MACHINE DIAGRAM (behavioural) ====
// Models the LIFECYCLE of ONE object through its states
//
//   (start) --> [Pending] --pay()--> [Paid] --ship()--> [Shipped]
//                                              \\cancel()   |
//                                               \\--------->[Cancelled]
//
// States         = rounded rectangles
// Transitions    = arrows labelled with the EVENT that triggers them
// Initial state  = filled black circle
// Final state    = bull's eye (circle around a filled circle)
//
// Example - Order:
//   Pending   -pay()->    Paid
//   Paid      -ship()->   Shipped
//   Paid      -cancel()-> Cancelled
//   Shipped   -deliver()->Delivered
//   Delivered -refund()-> Refunded
//
// Used for:
//   * Order / payment workflows
//   * User session (logged-out -> logged-in -> expired)
//   * TCP connection states (LISTEN, SYN_SENT, ESTABLISHED, ...)
//   * Vending machine, traffic light, elevator logic
`,
    diagram: svgStateMachineDiagram,
    relation: "Object lifecycle: states, events and transitions",
    points: [
      "States = rounded rectangles",
      "Transitions = arrows labelled with the triggering event",
      "Initial (filled circle) and final (bull's eye) states",
      "Use for object lifecycles and protocols",
    ],
  },

  // ---------- 6. COMPONENT DIAGRAM ----------
  {
    id: "component-diagram",
    icon: "fa-cubes",
    title: "Component Diagram",
    sub: "Structural / modules and dependencies",
    category: "structural",
    desc: "Shows the software modules (components) and the interfaces/dependencies between them.",
    definition:
      "A Component diagram models the high-level software structure: components (rectangles with two small rectangles on the left), provided/required interfaces (lollipops/sockets), and dependency arrows. Helps plan service boundaries and module ownership.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ==== COMPONENT DIAGRAM (structural, architecture) ====
// Models the software as INTERCONNECTED COMPONENTS
//
// Notation:
//   Component     = rectangle with two small rectangles on the left
//   Interface     = small circle (provided = lollipop) or half-circle (required = socket)
//   Dependency    = dashed arrow
//
// Example - Order microservice:
//
//   [API Gateway] ---> [OrderService] ---> [PaymentService]
//                          |  |
//                          |  +--> [InventoryService]
//                          |
//                          +--> [OrderRepository] (DB)
//
//   Each component EXPOSES a provided interface and REQUIRES another.
//   OrderService  --provides--> IOrderApi
//   OrderService  --requires--> IPaymentGateway
//   PaymentService --provides--> IPaymentGateway
//
// Used for:
//   * Microservice / service-oriented architecture
//   * Module ownership in large codebases
//   * Dependency analysis (who depends on whom)
//`,
    diagram: svgComponentDiagram,
    relation: "Components, provided/required interfaces, dependencies",
    points: [
      "Component = rectangle with two side tabs",
      "Lollipop = provided interface",
      "Socket = required interface",
      "Dashed arrows = dependencies",
    ],
  },

  // ---------- 7. DEPLOYMENT DIAGRAM ----------
  {
    id: "deployment-diagram",
    icon: "fa-server",
    title: "Deployment Diagram",
    sub: "Physical / hardware topology",
    category: "structural",
    desc: "Shows the physical hardware (nodes) where the software components actually run, and the network links between them.",
    definition:
      "A Deployment diagram maps software artifacts (components) onto physical nodes (servers, containers, devices). Nodes are 3D-style boxes; artifacts are shown inside; arrows are communication paths (TCP, HTTP, etc.). Essential for capacity planning and DevOps.",
    videoLink: CHANNEL_UPLOADS,
    code: `// ==== DEPLOYMENT DIAGRAM (structural, physical view) ====
// Maps software onto HARDWARE / NODES
//
// Notation:
//   Node (device)    = 3D-style box
//   Node (exec env)  = 3D-style box with <<executionEnvironment>> stereotype
//   Artifact         = document with folded corner
//   Connection       = line between nodes (with protocol label)
//
// Example - typical 3-tier web app:
//
//   [Client Browser] ---HTTPS---> [Load Balancer] ---HTTP---> [Web Server]
//                                                                     |
//                                                                [App Server] <----TCP----> [DB Server]
//
// Nodes may be nested:
//   [AWS EC2 Instance]  contains  [Nginx]  contains  [Web App.war]
//   [Docker Container]  contains  [Node.js]
//
// Used for:
//   * Production architecture diagrams
//   * On-call runbooks (where does X run?)
//   * Capacity planning
//`,
    diagram: svgDeploymentDiagram,
    relation: "Physical view: nodes, artifacts, network connections",
    points: [
      "Nodes = 3D-style boxes (servers, containers)",
      "Artifacts inside nodes (war, jar, docker)",
      "Connections labelled with protocol (HTTP, TCP, JDBC)",
      "Use for architecture and DevOps planning",
    ],
  },

  // ---------- 8. PACKAGE DIAGRAM ----------
  {
    id: "package-diagram",
    icon: "fa-folder-open",
    title: "Package Diagram",
    sub: "Structural / namespace organisation",
    category: "structural",
    desc: "Shows how the system is organised into packages (namespaces) and the dependencies between those packages.",
    definition:
      "A Package diagram groups related UML elements (classes, use cases, etc.) into packages (folders). Used to show the high-level module structure of a system, package dependencies, and import directions. Critical for enforcing layered architecture (controller -> service -> repository).",
    videoLink: CHANNEL_UPLOADS,
    code: `// ==== PACKAGE DIAGRAM (structural, namespace view) ====
// Organises the system into PACKAGES (logical folders / namespaces)
//
// Notation:
//   Package      = tabbed folder icon
//   Dependency   = dashed arrow (<<import>>, <<merge>>)
//
// Example - layered Java application:
//
//   +-----------------------+         +---------------------+
//   | com.shop.controller   |         | com.shop.model      |
//   | (REST controllers)    |         | (entities, DTOs)    |
//   +-----------------------+         +---------------------+
//              |                                  ^
//              v                                  |
//   +-----------------------+         +---------------------+
//   | com.shop.service      |-------->| com.shop.repository |
//   | (business logic)      |         | (DB access)         |
//   +-----------------------+         +---------------------+
//              |
//              v
//   +-----------------------+
//   | com.shop.util         |
//   | (helpers, constants)  |
//   +-----------------------+
//
// Used for:
//   * High-level module organisation
//   * Enforcing layered architecture
//   * Identifying cyclic package dependencies (BAD)
`,
    diagram: svgPackageDiagram,
    relation: "Packages, namespace dependencies, layered structure",
    points: [
      "Packages = tabbed folder icons",
      "Dashed arrows = package dependencies",
      "Use for high-level module layout",
      "Detect cyclic package dependencies",
    ],
  },
];
