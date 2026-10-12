import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./AtmLot.css";
import { JAVA_A } from "./a1";
import { JAVA_B } from "./a2";
import { JAVA_C } from "./a3";
import { SQL, UML } from "./atmTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="atm-code">
      <div className="atm-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="atm-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="atm-section">{children}</section>;
const H2 = ({ children }) => <h2 className="atm-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="atm-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="atm-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="atm-tip">{children}</div>;

export default function AtmPage() {
  return (
    <div className="atm-root">
      <header className="atm-header">
        <Link to="/maang/system-design/advanced" className="atm-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-money-check-dollar" /> ATM — LLD <span className="atm-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="atm-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="atm-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="atm-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="atm-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (cheque deposit, mobile top-up, cardless withdrawal).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Authentication — card + PIN">User inserts card, enters PIN. 3 attempts max, then card blocked. Auth via BankService.<br /><i>Why: drives State transition IDLE to AUTHENTICATED.</i></Bullet>
        <Bullet title="2. Cash withdrawal with denominations">User requests amount. ATM dispenses using available denominations. Chain of Responsibility.<br /><i>Why: CoR is the classic ATM pattern interviewers look for.</i></Bullet>
        <Bullet title="3. Balance enquiry + Mini statement">Read-only operations. No state mutation beyond logging.<br /><i>Why: separates read vs write operations.</i></Bullet>
        <Bullet title="4. Deposit (cash) + Transfer">Deposit updates balance. Transfer moves money between accounts.<br /><i>Why: full transaction lifecycle.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe cash dispensing">Two withdrawals simultaneously must not over-dispense. Use synchronized.<br /><i>Why: concurrency is the #1 follow-up.</i></Bullet>
        <Bullet title="2. Extensible">New transaction type = new State + handler. New denomination = new dispenser.<br /><i>Why: shows SOLID, especially OCP and DIP.</i></Bullet>
        <Bullet title="3. Audit trail — every transaction logged">Every operation writes to log with timestamp, card, amount, status.<br /><i>Why: compliance and debugging.</i></Bullet>
        <Tip><b>Interview line:</b> Skip cheque deposit, mobile top-up, cardless withdrawal unless asked — focus on auth, transaction, dispense flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="atm-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="ATM (Singleton + Context)">Top-level container. Holds state, dispenser chain, current card.<br /><i>Why Singleton: one instance per physical unit. Context for State.</i></Bullet>
        <Bullet title="ATMState + Idle/HasCard/Authenticated/Dispensing">Each state handles events differently.<br /><i>Why State pattern: behavior changes per state — classic use case.</i></Bullet>
        <Bullet title="Card">Has cardNumber, bank, expiry. No PIN stored — verified via BankService.<br /><i>Why: card is identity — separate from account.</i></Bullet>
        <Bullet title="Account">Has accountNumber, balance, owner. BankService manages accounts.<br /><i>Why: account is the money holder.</i></Bullet>
        <Bullet title="BankService + MockBankService">authenticate, getBalance, debit, credit.<br /><i>Why DIP: ATM depends on interface, not concrete bank.</i></Bullet>
        <Bullet title="CashDispenser chain">Chain of Responsibility. Each handles its denomination.<br /><i>Why CoR: decouples denomination logic, extensible.</i></Bullet>
        <Bullet title="Transaction">Records type, card, account, amount, status, timestamp.<br /><i>Why: transaction is the receipt — audit trail.</i></Bullet>
        <Bullet title="TransactionType (enum)">WITHDRAWAL, DEPOSIT, TRANSFER, BALANCE_ENQUIRY.<br /><i>Why: type-safe categorization.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="atm-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> ATM to State is Composition. ATM to BankService is Dependency (DIP). Dispenser chain is CoR.</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="atm-intro">Even for in-memory LLD, show you can persist it. 5 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_card_account">Makes card to account lookup O(log n).<br /><i>Why: interviewers ask about indexing.</i></Bullet>
        <Bullet title="failed_attempts on cards">Tracks PIN failures. At 3, status flips to BLOCKED.<br /><i>Why: security audit — persisted for compliance.</i></Bullet>
        <Bullet title="cash_inventory separate table">Denominations are per-ATM. Normalized.<br /><i>Why: enables dispenser chain to check availability.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="atm-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + Card + Account + BankService</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — CashDispenser + Transaction</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — States + ATM + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="atm-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — prevent over-dispensing?">dispense is synchronized. For scale, per-denomination locks.<br /><i>Why: concurrency awareness.</i></Bullet>
        <Bullet title="What if dispense fails midway?">Rollback: restore count, mark FAILED, reverse debit via credit.<br /><i>Why: failure handling — compensating actions.</i></Bullet>
        <Bullet title="How would you add a new denomination?">New CashDispenser subclass, insert into chain. No other changes.<br /><i>Why: OCP + CoR in action.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, State, Chain of Responsibility, Strategy.<br /><i>Why: naming patterns shows design vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="atm-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}