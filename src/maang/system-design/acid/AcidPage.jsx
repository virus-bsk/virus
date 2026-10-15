import { useState } from "react";
import { Link } from "react-router-dom";
import "./AcidPage.css";

/**
 * ACID Properties page (Route: /maang/system-design/acid).
 *
 * ACID is a database/transaction concept (Atomicity, Consistency, Isolation,
 * Durability). This page explains it in plain, easy-to-understand language
 * with real-world analogies (bank transfer), a clear SQL example, a simple
 * diagram, and why it matters for system design.
 */

const PROPERTIES = [
  {
    id: "A",
    name: "Atomicity",
    tagline: "All or nothing",
    accent: "#c2410c",
    meaning:
      "Simple rule: ALL steps of a transaction happen together — or NONE of them do.\n\nIf even one step fails, the whole transaction is rolled back, as if it never ran. Like a two-step bank transfer: debit from Account A AND credit to Account B. If the credit to B fails, the debit from A is undone too. Money is never lost or created halfway.",
    analogy:
      "Bank transfer: debit ₹100 from Account A and credit ₹100 to Account B. If the credit to B fails, the debit from A is also undone. Money is never lost or created halfway.",
    sql: `BEGIN;
-- Step 1: debit A
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Step 2: credit B
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- only runs if BOTH steps succeed
-- If anything fails during the 2 steps -> ROLLBACK;`,
  },
  {
    id: "C",
    name: "Consistency",
    tagline: "Always a valid state",
    accent: "#b45309",
    meaning:
      "Simple rule: the data always ends up in a valid state — before and after the transaction.\n\nEvery rule, constraint, and invariant is always enforced. A CHECK constraint that says balance cannot go negative will reject any transfer that breaks it. The data can only move from one valid state to another.",
    analogy:
      "A balance can never go negative. A CHECK constraint rejects any transfer that would push the balance below zero. The rule always holds, no matter what.",
    sql: `-- Enforce the rule in the database
ALTER TABLE accounts
  ADD CONSTRAINT chk_balance CHECK (balance >= 0);

-- A transfer that breaks the rule is simply rejected
UPDATE accounts SET balance = balance - 5000
WHERE id = 1;  -- ERROR if balance would go below 0`,
  },
  {
    id: "I",
    name: "Isolation",
    tagline: "Transactions don't interfere",
    accent: "#15803d",
    meaning:
      "Simple rule: transactions don't see each other's half-done work.\n\nTwo transfers running at exactly the same time each see a clean, consistent balance — no double-spending and no reading partially-updated data. They behave as if they ran one after another, not at the same time.",
    analogy:
      "Two people transfer money at exactly the same time. Each transfer sees a clean, consistent balance — no double-spending and no reading partially-updated data.",
    sql: `-- Default: each transaction is shielded from others
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

BEGIN;
-- nothing half-done is visible to other users
SELECT balance FROM accounts WHERE id = 1;  -- safe snapshot
COMMIT;`,
  },
  {
    id: "D",
    name: "Durability",
    tagline: "Survives crashes",
    accent: "#1d4ed8",
    meaning:
      "Simple rule: once committed, the changes are permanent.\n\nThey survive crashes, power loss, or server restarts. The database writes the change to durable storage (disk / WAL) BEFORE saying done. So even if the server goes down a second later, the record is still there.",
    analogy:
      "After the transfer completes, the money stays transferred. Even if the server restarts a second later, the record is still there.",
    sql: `-- COMMIT makes the change permanent & crash-proof
COMMIT;

-- The DB wrote it to the Write-Ahead Log (WAL) on disk
-- BEFORE COMMIT returns -> survives any crash`,
  },
];
function PropertyCard({ prop, index, isActive, onClick }) {
  const shortMeaning = `${prop.meaning.slice(0, 110)}...`;

  return (
    <article
      className={`acid-card ${isActive ? "active" : ""}`}
      style={{ "--acid-accent": prop.accent }}
      onClick={() => onClick(prop.id)}
    >
      <div className="acid-card-head">
        <span className="acid-card-letter">{prop.id}</span>
        <div>
          <h3 className="acid-card-name">{prop.name}</h3>
          <span className="acid-card-tagline">{prop.tagline}</span>
        </div>
      </div>

      <p className="acid-card-summary">{shortMeaning}</p>

      <div className="acid-card-actions">
        <button
          className="acid-card-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick(prop.id);
          }}
        >
          View details
        </button>
        <span className="acid-card-badge">DB rule</span>
      </div>

      <span className="acid-card-index">{index + 1} / 4</span>
      {isActive && (
        <span className="acid-active-indicator">
          <i className="fas fa-check-circle" />
        </span>
      )}
    </article>
  );
}

function DetailPanel({ property, onClose }) {
  if (!property) return null;

  return (
    <div className="acid-modal-backdrop" onClick={onClose}>
      <div className="acid-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="acid-detail-header">
          <h2>
            <span className="acid-detail-letter">{property.id}</span>
            <span className="acid-detail-title">{property.name}</span>
            <span className="acid-detail-sub">— {property.tagline}</span>
          </h2>
          <button
            className="acid-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="acid-modal-scroll-content">
          <div className="acid-definition-box">
            <strong>📘 Definition:</strong> {property.meaning}
          </div>

          <div className="acid-detail-grid">
            <div className="acid-info-box">
              <h3>Why it matters</h3>
              <p>{property.analogy}</p>
            </div>

            <div className="acid-code-box">
              <h3>SQL example</h3>
              <pre>
                <code>{property.sql}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcidPage() {
  const [activeId, setActiveId] = useState(null);
  const activeProperty = PROPERTIES.find(
    (property) => property.id === activeId,
  );

  const handleClick = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div className="acid-page">
      {/* ===== HERO ===== */}
      <section className="acid-hero">
        <Link to="/maang/system-design-basics" className="acid-back">
          ← Back to System Design Basics
        </Link>
        <h1 className="acid-title">
          ACID <span>Properties</span>
        </h1>
        <p className="acid-subtitle">
          The four rules that keep a database safe, consistent, and reliable —
          explained simply with a real bank-transfer example.{" "}
          <strong>ACID</strong> = <strong>A</strong>tomicity ·{" "}
          <strong>C</strong>onsistency · <strong>I</strong>solation ·{" "}
          <strong>D</strong>urability
        </p>

        <div className="acid-chip-row">
          <span className="acid-chip">🧩 4 properties</span>
          <span className="acid-chip">🏦 Bank transfer analogy</span>
          <span className="acid-chip">
            🛢️ Every relational DB (PostgreSQL, MySQL)
          </span>
        </div>
      </section>

      {/* ===== SIMPLE DEFINITION ===== */}
      <section className="acid-define">
        <h2>🤔 What is ACID in one line?</h2>
        <p>
          ACID is a set of rules that guarantees your{" "}
          <b>database transactions</b> (a group of operations treated as one)
          are processed <b>reliably</b>. Think of a transaction as a single
          logical task — like <i>money moving from one account to another</i>.
          ACID makes sure that task never leaves your data broken, partial, or
          lost.
        </p>
        <div className="acid-one-liner">
          💡 If a transaction obeys ACID, your data is <b>never half-written</b>
          , <b>never invalid</b>, <b>never corrupted by another user</b>, and{" "}
          <b>never lost after a crash</b>.
        </div>
      </section>
      {/* ===== 4 PROPERTY CARDS ===== */}
      <section className="acid-props">
        <h2 className="acid-section-title">The 4 Properties</h2>
        <p className="acid-section-sub">
          Each property is one letter of ACID — everything explained right here.
        </p>
        <div className="acid-grid">
          {PROPERTIES.map((prop, i) => (
            <PropertyCard
              key={prop.id}
              prop={prop}
              index={i}
              isActive={activeId === prop.id}
              onClick={handleClick}
            />
          ))}
        </div>
      </section>

      <DetailPanel
        property={activeProperty}
        onClose={() => setActiveId(null)}
      />

      {/* ===== PUTTING IT ALL TOGETHER ===== */}
      <section className="acid-together">
        <h2>🏦 ACID in action — one complete example</h2>
        <div className="acid-together-wrap">
          <div className="acid-flow">
            <div className="acid-flow-step">
              <span className="acid-flow-num">1</span>
              <p>
                <b>BEGIN</b> — start a transaction. Everything below is now one
                unit.
              </p>
            </div>
            <div className="acid-flow-step">
              <span className="acid-flow-num">2</span>
              <p>
                <b>Debit ₹100 from A</b> — the database checks the rule (balance
                ≥ 0). <span className="acid-flow-tag">Consistency</span>
              </p>
            </div>
            <div className="acid-flow-step">
              <span className="acid-flow-num">3</span>
              <p>
                <b>Credit ₹100 to B</b> — B's new balance is still hidden from
                other users. <span className="acid-flow-tag">Isolation</span>
              </p>
            </div>
            <div className="acid-flow-step">
              <span className="acid-flow-num">4</span>
              <p>
                <b>COMMIT</b> — both changes saved permanently. Nothing is lost
                after this. <span className="acid-flow-tag">Durability</span>
              </p>
            </div>
            <div className="acid-flow-step acid-flow-step-fail">
              <span className="acid-flow-num">✕</span>
              <p>
                <b>If any step fails</b> → <b>ROLLBACK</b> undoes everything, as
                if it never happened.{" "}
                <span className="acid-flow-tag">Atomicity</span>
              </p>
            </div>
          </div>

          <pre className="acid-code acid-code-big">
            <code>{`BEGIN;                                 -- 1. start
UPDATE accounts SET balance = balance - 100
  WHERE id = 1;                      -- 2. debit A
UPDATE accounts SET balance = balance + 100
  WHERE id = 2;                      -- 3. credit B
COMMIT;                              -- 4. save permanently
-- any error above -> ROLLBACK;      -- ✕ undo all`}</code>
          </pre>
        </div>
      </section>
      {/* ===== WHY IT MATTERS FOR SYSTEM DESIGN ===== */}
      <section className="acid-why">
        <h2>🌍 Why ACID matters in System Design</h2>
        <div className="acid-why-grid">
          <div className="acid-why-card">
            <h4>✅ When to prefer ACID</h4>
            <ul>
              <li>
                Banking, payments, orders, inventory — where correctness is
                critical.
              </li>
              <li>
                Strong, reliable relational databases (PostgreSQL, MySQL,
                Oracle).
              </li>
              <li>Data must never be lost or duplicated.</li>
            </ul>
          </div>
          <div className="acid-why-card">
            <h4>⚖️ ACID vs BASE</h4>
            <ul>
              <li>
                <b>ACID</b> = strong consistency, strict — perfect for money
                &amp; orders.
              </li>
              <li>
                <b>BASE</b> = eventually consistent, flexible — used by NoSQL
                (MongoDB, Cassandra) for massive scale.
              </li>
              <li>
                Choice is a trade-off: <b>strict rules</b> vs{" "}
                <b>scale &amp; speed</b>.
              </li>
            </ul>
          </div>
          <div className="acid-why-card">
            <h4>🎯 Interview answer tip</h4>
            <ul>
              <li>
                Always mention the bank-transfer analogy — it shows you really
                get it.
              </li>
              <li>Say which DBs use ACID vs BASE and why they're chosen.</li>
              <li>
                Link it to transactions: "I used @Transactional to keep a
                payment atomic."
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <div className="acid-footer-note">
        <span>🧱</span> ACID keeps your data reliable — the foundation of every
        transactional system you'll design.
      </div>
    </div>
  );
}

export default AcidPage;
