import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./LibraryLot.css";
import { JAVA_A } from "./lb1";
import { JAVA_B } from "./lb2";
import { JAVA_C } from "./lb3";
import { SQL, UML } from "./libraryTexts";

function CodeBlock({ code, lang }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) { ref.current.removeAttribute("data-highlighted"); hljs.highlightElement(ref.current); }
  }, [code]);
  return (
    <div className="lib-code">
      <div className="lib-code-head"><span className="dots"><i/><i/><i/></span><span className="pl-lang">{lang}</span></div>
      <pre className="lib-pre"><code ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
}
const Section = ({ id, children }) => <section id={id} className="lib-section">{children}</section>;
const H2 = ({ children }) => <h2 className="lib-h2">{children}</h2>;
const H3 = ({ children }) => <h3 className="lib-h3">{children}</h3>;
const Bullet = ({ title, children }) => (<div className="lib-bullet"><b>{title}</b><span>{children}</span></div>);
const Tip = ({ children }) => <div className="lib-tip">{children}</div>;

export default function LibraryPage() {
  return (
    <div className="lib-root">
      <header className="lib-header">
        <Link to="/maang/system-design/advanced" className="lib-back">← Back to Advanced System Design</Link>
        <h1><i className="fas fa-book-open" /> Library Management — LLD <span className="lib-badge"><i className="fab fa-java" /> Java + UML</span></h1>
        <div className="lib-sub-info">
          <span><i className="fas fa-list-check" /> 6 Steps</span>
          <span><i className="fas fa-code" /> Working Java</span>
          <span><i className="fas fa-database" /> DB Schema</span>
          <span className="lib-badge-alt"><i className="fas fa-mouse-pointer" /> Scroll down</span>
        </div>
        <nav className="lib-nav">
          <a href="#req">1. Requirements</a><a href="#ent">2. Entities</a><a href="#uml">3. Diagram</a><a href="#db">4. DB</a><a href="#java">5. Java</a><a href="#wrap">6. Wrap-up</a>
        </nav>
      </header>

      <Section id="req">
        <H2><i className="fas fa-list-check" /> Step 1 — Requirements (5 min)</H2>
        <p className="lib-intro"><b>What to do:</b> Pick <b>4 functional</b> + <b>3 non-functional</b>. State what is OUT of scope (e-books, inter-library loan, recommendations).</p>
        <H3>Functional — what the system DOES</H3>
        <Bullet title="1. Book catalog + multiple copies">Each book has ISBN, title, author. Copies have barcode + status.<br /><i>Why: one book, many copies — availability logic.</i></Bullet>
        <Bullet title="2. Member management — issue, return, renew">Member borrows copy, returns it. Max books enforced.<br /><i>Why: links Member + Copy — core flow.</i></Bullet>
        <Bullet title="3. Search — title, author, ISBN, genre">SearchStrategy interface for new types.<br /><i>Why: Strategy — interviewers look for this.</i></Bullet>
        <Bullet title="4. Fine on late return">Due = borrow + loan period. Fine = days late x rate.<br /><i>Why: edge cases — beyond happy path.</i></Bullet>
        <H3>Non-Functional — how the system BEHAVES</H3>
        <Bullet title="1. Thread-safe borrow/return">Two members must not borrow same copy. Synchronized.<br /><i>Why: concurrency is the #1 follow-up.</i></Bullet>
        <Bullet title="2. Extensible">New search = new strategy. New fine = new strategy. No core changes.<br /><i>Why: OCP and DIP.</i></Bullet>
        <Bullet title="3. Low latency — O(1) copy lookup">Copy by barcode is O(1). HashMap.<br /><i>Why: performance signal.</i></Bullet>
        <Tip><b>Interview line:</b> Skip e-books, inter-library loan, recommendations unless asked — focus on catalog, borrow, return, fine flow.</Tip>
      </Section>

      <Section id="ent">
        <H2><i className="fas fa-boxes-stacked" /> Step 2 — Entities (3 min)</H2>
        <p className="lib-intro"><b>Rule:</b> Take nouns from requirements — each becomes a class.</p>
        <Bullet title="LibraryService (Singleton + Facade)">Top-level controller. Holds catalog, members, loans.<br /><i>Why Singleton: one instance. Facade over sub-systems.</i></Bullet>
        <Bullet title="Book">Metadata — ISBN, title, author, genre. Immutable.<br /><i>Why: separates metadata from physical copies.</i></Bullet>
        <Bullet title="BookCopy">Physical copy — barcode, status, book ref. Unit of borrow.<br /><i>Why: what actually gets borrowed.</i></Bullet>
        <Bullet title="Member + Regular/Premium">Max books and loan period differ by type.<br /><i>Why inheritance: different tier limits.</i></Bullet>
        <Bullet title="Loan">Has copy, member, dates, fine. The receipt.<br /><i>Why: enables audit and fine calc.</i></Bullet>
        <Bullet title="SearchStrategy + FineStrategy">Title/Author/ISBN search. StandardFine calc.<br /><i>Why: Strategy — swap without touching core.</i></Bullet>
      </Section>

      <Section id="uml">
        <H2><i className="fas fa-project-diagram" /> Step 3 — Class Diagram (10 min)</H2>
        <p className="lib-intro">Draw this on the whiteboard. Relationships are the key signal:</p>
        <CodeBlock code={UML} lang="text" />
        <Tip><b>Key relationship:</b> Service to Catalog is Composition. Copy to Book is Association. Service to Strategies is Dependency (DIP).</Tip>
      </Section>

      <Section id="db">
        <H2><i className="fas fa-database" /> Step 4 — DB Design (5 min)</H2>
        <p className="lib-intro">Even for in-memory LLD, show you can persist it. 6 normalized tables:</p>
        <CodeBlock code={SQL} lang="sql" />
        <Bullet title="idx_book_title / idx_book_author">Makes search O(log n).<br /><i>Why: avoids full scan.</i></Bullet>
        <Bullet title="idx_copy_status">Find available copy of ISBN is O(log n).<br /><i>Why: critical for borrow flow.</i></Bullet>
        <Bullet title="idx_loan_due">Overdue batch job O(log n).<br /><i>Why: nightly scan optimization.</i></Bullet>
      </Section>

      <Section id="java">
        <H2><i className="fab fa-java" /> Step 5 — Java Code (20-25 min)</H2>
        <p className="lib-intro">Minimal working Java. Skip boilerplate getters unless asked:</p>
        <H3>Block A — Enums + Book + BookCopy</H3>
        <CodeBlock code={JAVA_A} lang="java" />
        <H3>Block B — Members + Loan + Strategies</H3>
        <CodeBlock code={JAVA_B} lang="java" />
        <H3>Block C — Catalog + Service + Main</H3>
        <CodeBlock code={JAVA_C} lang="java" />
      </Section>

      <Section id="wrap">
        <H2><i className="fas fa-flag-checkered" /> Step 6 — Wrap-up (3 min)</H2>
        <p className="lib-intro">Be ready to answer these without thinking:</p>
        <Bullet title="Concurrency — same copy race?">borrow() synchronized on copy. Service.borrow also synchronized.<br /><i>Why: find + lock must be atomic.</i></Bullet>
        <Bullet title="How to add genre search?">GenreSearch implements SearchStrategy. No core changes.<br /><i>Why: OCP + Strategy.</i></Bullet>
        <Bullet title="How to handle reservations?">Reservation queue per ISBN. Returned copy goes to queue head.<br /><i>Why: hold queue design.</i></Bullet>
        <Bullet title="Patterns used + SOLID">Singleton, Strategy, Composition, Inheritance.<br /><i>Why: naming patterns shows vocabulary.</i></Bullet>
        <Tip><b>Scorecard:</b> Requirements (5) + Entities (3) + Diagram (10) + DB (5) + Code (20) + Wrap-up (3) = 46 min.</Tip>
      </Section>

      <footer className="lib-footer">
        <Link to="/maang/system-design/advanced">Back to Advanced System Design</Link>
      </footer>
    </div>
  );
}