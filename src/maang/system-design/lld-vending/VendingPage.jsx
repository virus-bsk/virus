import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./VendingLot.css";
import { JAVA_A } from "./v1";
import { JAVA_B } from "./v2";
import { JAVA_C } from "./v3";
import { SQL, UML } from "./vendingTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="vm-code">
      <div className="vm-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="vm-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="vm-section">{children}</section>;
const H2 = ({ children }) => <h2 className="vm-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="vm-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="vm-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="vm-tip">{children}</div>;

export default function VendingPage() {
  return (
    <div className="vm-root">
      <header className="vm-header">
        <Link to="/maang/system-design/advanced" className="vm-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-candy-cane" /> Vending Machine — LLD <span className="vm-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="vm-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="vm-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="vm-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="vm-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (refunds, dynamic pricing, cashless wallets).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Product inventory with slots">Each slot holds one product type with a quantity. Products have code, name, price. Slot is the smallest allocatable unit.<br /><i>Why: drives the dispense logic and inventory checks.</i></Bullet>
        <Bullet title="2. Multiple payment methods — Cash + Card">At least two methods. Use PaymentStrategy interface so UPI can be added later without touching core.<br /><i>Why: demonstrates Open/Closed Principle (OCP).</i></Bullet>
        <Bullet title="3. Purchase flow — select, pay, dispense">User selects product code, system validates stock, collects payment, dispenses item, updates inventory.<br /><i>Why: links Product + Slot + Payment — core flow.</i></Bullet>
        <Bullet title="4. Change/refund handling">If payment exceeds price, return change. If dispense fails after payment, refund full amount.<br /><i>Why: real-world edge case — beyond happy path.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe inventory">Two users buying same product must not both get it if only one left. Use synchronized on slot.<br /><i>Why: concurrency is the #1 follow-up question.</i></Bullet>
        <Bullet title="2. Extensible">New payment method = new strategy. New product type = new subclass. No core class changes.<br /><i>Why: shows SOLID, especially OCP and DIP.</i></Bullet>
        <Bullet title="3. Low latency — O(1) product lookup">Product lookup by code should be O(1). Use Map not linear scan.<br /><i>Why: signals you think about performance.</i></Bullet>
        <Tip><b>Interview line:</b> Skip refunds, dynamic pricing, cashless wallets unless asked — keeps design focused on select, pay, dispense flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="vm-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class. 8 classes is the sweet spot.</p>
        <Bullet title="VendingMachine (Singleton)">Top-level container. Holds slots. Has selectProduct, insertPayment, dispense.<br /><i>Why Singleton: only one machine instance per physical unit.</i></Bullet>
        <Bullet title="Slot">Holds one product type + quantity. Has isAvailable, dispense, restock.<br /><i>Why: slot is the unit of concurrency — lock here, not whole machine.</i></Bullet>
        <Bullet title="Product">Immutable value object. Has code, name, price.<br /><i>Why: separate from slot (which holds inventory).</i></Bullet>
        <Bullet title="PaymentStrategy + Cash/Card (interfaces)">pay(double) - Cash, Card, UPI.<br /><i>Why: Strategy pattern — swap algorithms without changing caller (OCP).</i></Bullet>
        <Bullet title="Transaction">Links Product + Slot + payment + timestamp. Records what happened.<br /><i>Why: transaction is the receipt — nothing happens without it.</i></Bullet>
        <Bullet title="VendingMachineState (State pattern)">IDLE, PRODUCT_SELECTED, PAYMENT_PENDING, DISPENSING.<br /><i>Why: State pattern — machine behaves differently per state.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="vm-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Machine to Slot is Composition. Machine to Payment is Dependency on interface (DIP).</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="vm-intro">Even for in-memory LLD, show you can persist it. 4 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_slot_product on slots(product_code)">Makes product-to-slot lookup O(log n). Without this, scanning all slots is O(n).<br /><i>Why: interviewers ask about indexing.</i></Bullet>
        <Bullet title="Separate payments table">One transaction can have multiple payment attempts. Separating keeps transactions clean.<br /><i>Why: 1-to-N relationship — retry logic.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="vm-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + Product + Slot</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — Transaction + Payment + Change</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — States + VendingMachine + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="vm-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — how do you prevent double-dispense?">Slot dispense is synchronized on the slot itself — fine-grained lock, not whole machine.<br /><i>Why: fine-grained locking shows maturity.</i></Bullet>
        <Bullet title="What if payment succeeds but dispense fails?">Transaction marked FAILED, full refund issued. Machine returns to IDLE.<br /><i>Why: shows you handle failure paths.</i></Bullet>
        <Bullet title="How would you add a new payment method?">Create a new PaymentStrategy implementation. No other class changes — OCP.<br /><i>Why: the answer they want to hear.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, Strategy, State, Composition. SRP, OCP, DIP.<br /><i>Why: naming patterns shows design vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="vm-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}