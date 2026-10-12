import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./SplitwiseLot.css";
import { JAVA_A } from "./s1";
import { JAVA_B } from "./s2";
import { JAVA_C } from "./s3";
import { SQL, UML } from "./splitwiseTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="sw-code">
      <div className="sw-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="sw-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="sw-section">{children}</section>;
const H2 = ({ children }) => <h2 className="sw-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="sw-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="sw-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="sw-tip">{children}</div>;

export default function SplitwisePage() {
  return (
    <div className="sw-root">
      <header className="sw-header">
        <Link to="/maang/system-design/advanced" className="sw-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-money-bill-transfer" /> Splitwise — LLD <span className="sw-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="sw-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="sw-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="sw-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="sw-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (multi-currency, bank settlements, recurring expenses).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Users + Groups">Each user has id, name, email. Groups contain members. A user can belong to multiple groups.<br /><i>Why: drives the membership check and balance scoping.</i></Bullet>
        <Bullet title="2. Add expense with split strategies">Equal, Exact, Percentage splits. Expense has payer, amount, participants, split type.<br /><i>Why: Strategy pattern — swap split algorithms without changing core.</i></Bullet>
        <Bullet title="3. Balance calculation — who owes whom">Net balance per user per group. Positive = gets back, negative = owes.<br /><i>Why: links Expense + User — core value of the system.</i></Bullet>
        <Bullet title="4. Settle up — record payment">User can settle a balance. Creates a Settlement record. Balances update.<br /><i>Why: closes the loop — full lifecycle.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe balance updates">Two expenses added simultaneously must not corrupt balances. Use synchronized.<br /><i>Why: concurrency is the #1 follow-up question.</i></Bullet>
        <Bullet title="2. Extensible">New split type = new SplitStrategy. New notification = new Observer. No core changes.<br /><i>Why: shows SOLID, especially OCP and DIP.</i></Bullet>
        <Bullet title="3. Low latency — O(1) balance lookup">Balance lookup by (user, group) should be O(1). Use nested Map.<br /><i>Why: signals you think about performance.</i></Bullet>
        <Tip><b>Interview line:</b> Skip multi-currency, bank settlements, recurring expenses unless asked — keeps design focused on add expense, balance, settle flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-users" /> Step 2 — Entities (3 min)</H2>
        <p className="sw-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="SplitwiseService (Singleton)">Top-level facade. Holds users, groups, expenses. Has addExpense, getBalances, settleUp.<br /><i>Why Singleton: only one service instance.</i></Bullet>
        <Bullet title="User">Has id, name, email. Immutable identity.<br /><i>Why: user is the actor — everything revolves around them.</i></Bullet>
        <Bullet title="Group">Contains members. Has addMember, isMember.<br /><i>Why: separates group logic from service.</i></Bullet>
        <Bullet title="Expense">Has id, payer, amount, participants, splitType, shares. Created via factory.<br /><i>Why: core entity — nothing happens without it.</i></Bullet>
        <Bullet title="Split (abstract) + Equal/Exact/Percentage">calculate(amount, participants, shares) returns per-user amounts.<br /><i>Why: inheritance + Strategy — same interface, different rules.</i></Bullet>
        <Bullet title="BalanceSheet">Holds Map per group. Has updateBalance, getBalance.<br /><i>Why: separates balance logic from expense (SRP).</i></Bullet>
        <Bullet title="Settlement">Records a payment from one user to another. Has fromUser, toUser, amount.<br /><i>Why: settlement is the receipt — closes the loop.</i></Bullet>
        <Bullet title="NotificationObserver (interface) + Email/Push">onExpenseAdded, onSettlement.<br /><i>Why: Observer pattern — notify without coupling.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="sw-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Service to Group is Composition. Expense to SplitStrategy is Dependency on interface (DIP). Observer notifies without coupling.</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="sw-intro">Even for in-memory LLD, show you can persist it. 6 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_expense_group on expenses(group_id)">Makes group expense lookup O(log n). Without this, scanning is O(n).<br /><i>Why: interviewers ask about indexing.</i></Bullet>
        <Bullet title="expense_shares separate table">One expense has many shares. Normalized — no repeating columns.<br /><i>Why: 1-to-N relationship.</i></Bullet>
        <Bullet title="Settlements separate table">Distinct from expenses. Keeping them separate preserves history.<br /><i>Why: audit trail — never delete, only append.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="sw-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + User + Group</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — Expense + Split Strategies</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — Observer + Service + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="sw-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — prevent corrupted balances?">updateBalance is synchronized. For scale, ConcurrentHashMap with atomic merge.<br /><i>Why: shows concurrency awareness.</i></Bullet>
        <Bullet title="How does balance calculation work?">Payer credited full amount, each participant debited their share. Positive = gets back, negative = owes.<br /><i>Why: the core logic — must explain clearly.</i></Bullet>
        <Bullet title="How would you add a new split type?">New SplitStrategy subclass + enum + switch case. No other changes — OCP.<br /><i>Why: the answer they want to hear.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, Strategy, Observer, Composition. SRP, OCP, DIP.<br /><i>Why: naming patterns shows design vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="sw-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}