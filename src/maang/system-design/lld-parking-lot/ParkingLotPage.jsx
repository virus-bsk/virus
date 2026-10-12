import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./ParkingLot.css";
import { JAVA1 } from "./j1";
import { JAVA2 } from "./j2";
import { JAVA3 } from "./j3";
import { SQL, UML } from "./texts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-highlighted");
      hljs.highlightElement(ref.current);
    }
  }, [code]);
  return (
    <div className="pl-code">
      <div className="pl-code-head">
        <span className="dots"><i/><i/><i/></span>
        <span className="pl-lang">{lang}</span>
      </div>
      <pre className="pl-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}

function Section({ id, children }) {
  return <section id={id} className="pl-section">{children}</section>;
}

function H2({ children }) {
  return <h2 className="pl-h2">{children}</h2>;
}

function Bullet({ title, children }) {
  return (
    <div className="pl-bullet">
      <b>{title}</b>
      <span>{children}</span>
    </div>
  );
}

function Tip({ children }) {
  return <div className="pl-tip">{children}</div>;
}

export default function ParkingLotPage() {
  return (
    <div className="pl-root">
      <header className="pl-header">
        <Link to="/maang/system-design/advanced" className="pl-back">← Back to Advanced System Design</Link>
        <h1>
          <i className="fas fa-square-parking" /> Parking Lot — LLD
          <span className="pl-badge">
            <i className="fab fa-java" /> Java + UML
          </span>
        </h1>
        <div className="pl-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java Code</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="pl-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="pl-nav">
          <a href="#req">1. Requirements</a>
          <a href="#ent">2. Entities</a>
          <a href="#uml">3. Class Diagram</a>
          <a href="#db">4. DB Design</a>
          <a href="#java">5. Java Code</a>
          <a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2>Step 1 — Requirements (5 min)</H2>
        <p className="pl-intro">
          <b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. Don't cover everything — scope discipline is graded.
          State what's OUT of scope (reservations, EV charging, refunds) — shows maturity.
        </p>
        <h3 className="pl-h3">Functional — what the system DOES</h3>
        <Bullet title="1. Multi-floor, 3 spot sizes">
          Each floor has spots sized SMALL, MEDIUM, LARGE. Motorcycle fits SMALL, Car fits MEDIUM+, Truck only in LARGE.
          <br/><i>Why: drives the canFitIn() logic and spot-type filter.</i>
        </Bullet>
        <Bullet title="2. Vehicle types — Motorcycle, Car, Truck">
          Vehicle is abstract; each subtype overrides canFitIn(SpotSize). Nearest free compatible spot on entry.
          <br/><i>Why: Inheritance + Strategy combo interviewers look for.</i>
        </Bullet>
        <Bullet title="3. Ticket lifecycle — issue on entry, fee on exit">
          EntryGate creates ticket with timestamp. ExitGate reads ticket, computes hours × rate, returns fee.
          <br/><i>Why: links Vehicle + Spot + time — core flow of the system.</i>
        </Bullet>
        <Bullet title="4. Payment — Cash + Card (extensible)">
          At least two methods. Use PaymentStrategy interface so UPI can be added later without touching core.
          <br/><i>Why: demonstrates Open/Closed Principle (OCP).</i>
        </Bullet>
        <h3 className="pl-h3">Non-Functional — how the system BEHAVES</h3>
        <Bullet title="1. Thread-safe spot allocation">
          Two cars arriving at same time must not get same spot. Use synchronized on assign() or DB version column.
          <br/><i>Why: concurrency is the #1 follow-up question.</i>
        </Bullet>
        <Bullet title="2. Extensible">
          New vehicle type = new subclass. New pricing = new strategy. No core class changes.
          <br/><i>Why: shows SOLID, especially OCP and DIP.</i>
        </Bullet>
        <Bullet title="3. Low latency — O(1) or near-constant">
          Spot lookup should not scan all floors linearly. Use a queue/map of free spots per floor.
          <br/><i>Why: signals you think about performance, not just correctness.</i>
        </Bullet>
        <Tip><b>💡 Interview line:</b> "I'll skip reservations, EV charging, and refunds unless you want them — keeps design focused on core park→unpark→pay flow."</Tip>
      </Section>

      <Section id="ent">
        <H2>Step 2 — Entities (3 min)</H2>
        <p className="pl-intro">
          <b>Rule:</b> Take nouns from requirements — each becomes a class. 8 classes is the sweet spot.
        </p>
        <Bullet title="ParkingLot (Singleton)">
          Top-level container. Holds floors. Has allocate(Vehicle) and release(Spot).
          <br/><i>Why Singleton: only one lot exists. Use double-checked locking.</i>
        </Bullet>
        <Bullet title="Floor">
          Groups spots on one level. Has findFreeSpot(Vehicle) — scans only its own spots.
          <br/><i>Why: separates per-floor logic from lot. Lot delegates to floors.</i>
        </Bullet>
        <Bullet title="ParkingSpot">
          Smallest allocatable unit. Has assign(Vehicle) + release(). State: FREE or OCCUPIED.
          <br/><i>Why: spot is the unit of concurrency — lock here, not on whole lot.</i>
        </Bullet>
        <Bullet title="Vehicle (abstract) + Motorcycle / Car / Truck">
          Holds license plate + type. canFitIn(SpotSize) is abstract — each subclass decides.
          <br/><i>Why inheritance: different vehicles have different size rules.</i>
        </Bullet>
        <Bullet title="Ticket">
          Links Vehicle + Spot + entry time. On exit, exitTime is set. duration() = exit - entry.
          <br/><i>Why: ticket is the receipt — nothing happens without it.</i>
        </Bullet>
        <Bullet title="EntryGate">
          Calls lot.allocate(vehicle), creates Ticket on success. Returns empty Optional if lot full.
          <br/><i>Why: separates entry logic from lot (Single Responsibility).</i>
        </Bullet>
        <Bullet title="ExitGate">
          Reads ticket, calls PricingStrategy.fee(ticket), calls PaymentStrategy.pay(fee), releases spot.
          <br/><i>Why: fee + payment are interfaces — ExitGate depends on abstractions (DIP).</i>
        </Bullet>
        <Bullet title="PricingStrategy + PaymentStrategy (interfaces)">
          PricingStrategy.fee(Ticket) → HourlyPricing, FlatRatePricing. PaymentStrategy.pay(double) → Cash, Card, UPI.
          <br/><i>Why: Strategy pattern — swap algorithms without changing caller (OCP).</i>
        </Bullet>
      </Section>

      <Section id="uml">
        <H2>Step 3 — Class Diagram (10 min)</H2>
        <p className="pl-intro">Draw this on the whiteboard. Relationships are the key signal — composition vs inheritance choices matter most.</p>
        <CodeBlock code={UML} lang="text" />
        <h3 className="pl-h3">Relationship cheat-sheet</h3>
        <table className="pl-table">
          <thead><tr><th>From → To</th><th>Type</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>ParkingLot → Floor</td><td>Composition (◇)</td><td>Floors die with lot — no independent life</td></tr>
            <tr><td>Floor → ParkingSpot</td><td>Composition (◇)</td><td>Spots die with floor</td></tr>
            <tr><td>ParkingSpot → Vehicle</td><td>Association (0..1)</td><td>Spot holds a vehicle temporarily</td></tr>
            <tr><td>Vehicle → subclasses</td><td>Inheritance</td><td>is-a relationship</td></tr>
            <tr><td>Ticket → Spot, Vehicle</td><td>Association</td><td>Ticket references them</td></tr>
            <tr><td>ExitGate → PricingStrategy</td><td>Dependency</td><td>DIP — depends on interface</td></tr>
            <tr><td>ExitGate → PaymentStrategy</td><td>Dependency</td><td>DIP — depends on interface</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="db">
        <H2>Step 4 — DB Design (5 min)</H2>
        <p className="pl-intro">Even for in-memory LLD, show you can persist it. 4 tables, normalized, minimal. License plate is denormalized into tickets — vehicles are not long-lived here.</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_spot_free_size on parking_spots(state, size)">
          Makes free-spot lookup O(log n). Without this, scanning all spots is O(n).
        </Bullet>
        <Bullet title="License plate in tickets (denormalized)">
          No vehicles table needed — a car parks, leaves, and we just need ticket history. Plate on ticket is enough.
        </Bullet>
        <Bullet title="Separate payments table (audit)">
          One ticket can have multiple payment attempts (retry on failure). Separating keeps tickets clean.
        </Bullet>
      </Section>

      <Section id="java">
        <H2>Step 5 — Java Code (20–25 min)</H2>
        <p className="pl-intro">Minimal working Java. Skip boilerplate getters unless asked. Each block builds on previous — run together at end.</p>
        <h3 className="pl-h3">Block A — Enums + Vehicle hierarchy</h3>
        <p className="pl-intro">4 enums + abstract Vehicle + 3 subclasses. canFitIn(SpotSize) is the core rule — Motorcycle fits SMALL only, Car fits MEDIUM+, Truck fits LARGE only.</p>
        <CodeBlock code={JAVA1} lang="java" />
        <h3 className="pl-h3">Block B — Spot + Floor + Ticket</h3>
        <p className="pl-intro">ParkingSpot has synchronized assign() — two threads cannot book same spot. Floor.findFreeSpot() streams spots, filters free + compatible size. Ticket tracks entry/exit time.</p>
        <CodeBlock code={JAVA2} lang="java" />
        <h3 className="pl-h3">Block C — Strategies + Lot + Gates</h3>
        <p className="pl-intro">PricingStrategy + HourlyPricing computes fee from ticket duration. PaymentStrategy + Cash/Card. ParkingLot is double-checked Singleton. EntryGate.admit() returns Optional (empty if full). ExitGate.checkout() calculates fee, processes payment, releases spot.</p>
        <CodeBlock code={JAVA3} lang="java" />
      </Section>

      <Section id="wrap">
        <H2>Step 6 — Wrap-up Talking Points (3 min)</H2>
        <p className="pl-intro">Be ready to answer these without thinking. Each maps to a grading signal.</p>
        <Bullet title="Concurrency — how do you prevent double-booking?">
          "Spot assignment is synchronized on the spot itself — fine-grained lock, not whole lot. For scale, shard spots per floor with per-floor locks or use ConcurrentLinkedQueue of free spots. At DB level, optimistic locking with version column."
        </Bullet>
        <Bullet title="Nearest spot vs best-fit">
          "Currently first-free (any floor). For nearest, add a distance field per spot and sort by it per floor. For best-fit, prefer the smallest spot that fits (saves LARGE for trucks)."
        </Bullet>
        <Bullet title="How would you add a new vehicle type?">
          "Create a new Vehicle subclass, override canFitIn(). No other class changes — that is OCP in action."
        </Bullet>
        <Bullet title="What if payment fails?">
          "Ticket stays ACTIVE, spot stays OCCUPIED. User retries payment (same ticket ID — idempotent). Only on SUCCESS do we release the spot."
        </Bullet>
        <Bullet title="Patterns used + SOLID">
          "Singleton (Lot), Factory (Ticket), Strategy (Pricing + Payment), State (SpotState FREE/OCCUPIED), Composition (Lot to Floor to Spot). SOLID: SRP (Gate vs Lot), OCP (new strategies), DIP (ExitGate depends on interfaces)."
        </Bullet>
        <h3 className="pl-h3">Scorecard — what interviewers grade</h3>
        <table className="pl-table">
          <thead><tr><th>Section</th><th>Time</th><th>Graded on</th></tr></thead>
          <tbody>
            <tr><td>Requirements</td><td>5 min</td><td>Scope discipline (4 func + 3 NFR)</td></tr>
            <tr><td>Entities</td><td>3 min</td><td>Naming, coverage — no extras</td></tr>
            <tr><td>Class diagram</td><td>10 min</td><td>Relationship correctness (composition vs inheritance)</td></tr>
            <tr><td>DB</td><td>5 min</td><td>Normalization + indexes</td></tr>
            <tr><td>Code</td><td>20–25 min</td><td>Working, clean, patterns applied</td></tr>
            <tr><td>Wrap-up</td><td>3 min</td><td>Extensibility + concurrency awareness</td></tr>
          </tbody>
        </table>
        <Tip><b>💡 Final tip:</b> Don't memorize code — memorize the flow: Vehicle enters, Lot finds free Spot, Ticket created, Vehicle parks, On exit fee calculated, Payment processed, Spot freed. Everything else is detail around this flow.</Tip>
      </Section>

      <footer className="pl-footer">
        <Link to="/maang/system-design/advanced">← Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}