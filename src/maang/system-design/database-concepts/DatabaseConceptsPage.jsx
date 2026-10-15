import { useState } from "react";
import { Link } from "react-router-dom";
import "./DatabaseConceptsPage.css";

const CONCEPTS = [
  {
    id: "sql-vs-nosql",
    icon: "fa-database",
    title: "SQL vs NoSQL",
    sub: "Structured vs flexible",
    desc: "SQL is strict and relational; NoSQL is flexible and built for scale.",
    definition:
      `Simple rule: Use SQL when you need strict structure, tables, and guaranteed accuracy. Use NoSQL when you need flexibility, speed, and can tolerate some inconsistency.

SQL = tables with fixed columns. NoSQL = flexible documents.
Rule: SQL for money, NoSQL for feeds.`,
    points: [
      "SQL has a fixed table structure",
      "NoSQL stores data in flexible documents or key-value forms",
      "Use SQL for transactions and consistency",
      "Use NoSQL for scale and fast-changing data",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <div className="dbc-table-wrap">
          <div className="dbc-table-box dbc-sql-box">
            <div className="dbc-table-title">SQL Table</div>
            <div className="dbc-table-row dbc-head-row">
              <span>id</span>
              <span>name</span>
              <span>age</span>
            </div>
            <div className="dbc-table-row">
              <span>1</span>
              <span>Alice</span>
              <span>30</span>
            </div>
            <div className="dbc-table-row">
              <span>2</span>
              <span>Bob</span>
              <span>28</span>
            </div>
          </div>
          <div className="dbc-arrow">⇄</div>
          <div className="dbc-table-box dbc-nosql-box">
            <div className="dbc-table-title">NoSQL Document</div>
            <pre>{`{\n  "_id": 1,\n  "name": "Alice",\n  "hobbies": ["reading", "hiking"],\n  "city": "Bengaluru"\n}`}</pre>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "indexing",
    icon: "fa-search",
    title: "Indexing",
    sub: "Faster lookup",
    desc: "An index works like a book index so DB finds rows much faster.",
    definition:
      `Simple rule: An index is a lookup table for your database, like the index at the back of a book. Instead of scanning every page to find a name, you jump straight to it.

Rule: Add index on any column you search, sort, or join on often.`,
    points: [
      "Index speeds up WHERE queries",
      "It reduces full table scans",
      "Too many indexes slow writes",
      "Use it on repeated filters and join keys",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <div className="dbc-index-flow">
          <div className="dbc-index-group">
            <div className="dbc-index-head">id</div>
            <div>1</div>
            <div className="dbc-index-highlight">2</div>
            <div>3</div>
          </div>
          <div className="dbc-arrow">→</div>
          <div className="dbc-index-group">
            <div className="dbc-index-head">Index</div>
            <div>2 → row</div>
            <div>1 → row</div>
            <div>3 → row</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "joins",
    icon: "fa-link",
    title: "Joins",
    sub: "Connect related data",
    desc: "Joins combine rows from two tables using a shared field like user_id.",
    definition:
      `Simple rule: Joins stitch separate tables back into one story. You split data to keep it clean. You join it back to read it.

Example: users and orders are two tables. You join them on user_id to see who ordered what.`,
    points: [
      "INNER JOIN gives only matching rows",
      "LEFT JOIN keeps all left rows",
      "RIGHT JOIN keeps all right rows",
      "FULL JOIN includes everything from both sides",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <div className="dbc-join-grid">
          <div className="dbc-join-card">
            <div className="dbc-join-name">INNER</div>
            <div className="dbc-venn">
              <span className="dbc-venn-left" />
              <span className="dbc-venn-right" />
            </div>
          </div>
          <div className="dbc-join-card">
            <div className="dbc-join-name">LEFT</div>
            <div className="dbc-venn">
              <span className="dbc-venn-left dbc-venn-left-full" />
              <span className="dbc-venn-right dbc-venn-right-empty" />
            </div>
          </div>
          <div className="dbc-join-card">
            <div className="dbc-join-name">RIGHT</div>
            <div className="dbc-venn">
              <span className="dbc-venn-left dbc-venn-left-empty" />
              <span className="dbc-venn-right dbc-venn-right-full" />
            </div>
          </div>
          <div className="dbc-join-card dbc-join-card-full">
            <div className="dbc-join-name">FULL</div>
            <div className="dbc-venn">
              <span className="dbc-venn-left dbc-venn-left-full" />
              <span className="dbc-venn-right dbc-venn-right-full" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "normalization",
    icon: "fa-shield-halved",
    title: "Normalization",
    sub: "Remove duplicate data",
    desc: "Normalization keeps data clean by removing repeated data and splitting facts logically.",
    definition:
      `Simple rule: Normalize to avoid repeating the same data everywhere. Write a fact once. Link to it when needed.

Like a library: one master catalog, many book copies pointing to it.
Rule: If you see the same data repeated in many rows, it needs normalization.`,
    points: [
      "Avoids repeated values in many rows",
      "Keeps facts in one source of truth",
      "Better consistency and easier updates",
      "NoSQL often denormalizes for speed",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <div className="dbc-flow-line">
          <div className="dbc-flow-box danger">Unnormalized</div>
          <div className="dbc-flow-arrow">→</div>
          <div className="dbc-flow-box">1NF</div>
          <div className="dbc-flow-arrow">→</div>
          <div className="dbc-flow-box">2NF</div>
          <div className="dbc-flow-arrow">→</div>
          <div className="dbc-flow-box">3NF</div>
        </div>
      </div>
    ),
  },
  {
    id: "replication",
    icon: "fa-copy",
    title: "Replication",
    sub: "Backup and availability",
    desc: "Replication copies data to multiple servers for safety and read scaling.",
    definition:
      `Simple rule: Replication is like making copies of your data on different servers. If one shop burns down, the others keep selling.

Rule: Use replication when uptime and read speed matter more than instant data freshness.`,
    points: [
      "Primary server handles writes",
      "Replica nodes receive copies",
      "Helps with failover and availability",
      "Improves read scalability",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <div className="dbc-replica-layout">
          <div className="dbc-replica-box dbc-primary-box">
            <div className="dbc-replica-label">Primary DB</div>
            <small>Write here</small>
          </div>
          <div className="dbc-sync-line">
            <span>sync</span>
          </div>
          <div className="dbc-replica-sides">
            <div className="dbc-replica-box dbc-replica-box-green">
              <div className="dbc-replica-label">Replica A</div>
              <small>Read backup</small>
            </div>
            <div className="dbc-replica-box dbc-replica-box-green">
              <div className="dbc-replica-label">Replica B</div>
              <small>Failover</small>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "partitioning",
    icon: "fa-border-all",
    title: "Partitioning",
    sub: "Split large tables",
    desc: "Partitioning splits one large dataset into smaller logical parts.",
    definition:
      `Simple rule: Partitioning is slicing one giant table into smaller chunks. Like organizing a big pile of papers into folders by year.

Rule: Partition by the column you query most (date, region, category).`,
    points: [
      "Good for large historical tables",
      "Used by time, region, or category",
      "Improves query speed and maintenance",
      "Simpler than full sharding",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <div className="dbc-partition-board">
          <div className="dbc-partition-header">One big table</div>
          <div className="dbc-partition-main">
            <div className="dbc-partition-label">Orders</div>
            <div className="dbc-partition-rail">
              <div className="dbc-partition-box dbc-partition-2023">2023</div>
              <div className="dbc-partition-box dbc-partition-2024">2024</div>
              <div className="dbc-partition-box dbc-partition-2025">2025</div>
            </div>
          </div>
          <div className="dbc-partition-query">
            <span>Query: year = 2025</span>
            <div className="dbc-partition-pointer">
              Only this partition is checked
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "sharding",
    icon: "fa-layer-group",
    title: "Sharding",
    sub: "Distribute across machines",
    desc: "Sharding spreads data across many servers so one machine does not hold everything.",
    definition:
      `Simple rule: Sharding is splitting your data across many servers. Like a chain of shops, each holds part of the inventory.

Rule: Shard when one machine cannot hold the data or handle the load. You need a shard key (like user_id) to know where data lives.`,
    points: [
      "Splits data across nodes",
      "Improves scale and storage capacity",
      "Adds routing and consistency complexity",
      "Common in large distributed systems",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <div className="dbc-shard-layout">
          <div className="dbc-shard-top">hash(user_id)</div>
          <div className="dbc-shard-row">
            <div className="dbc-shard-box dbc-shard-a">
              <div>Shard A</div>
              <small>1–1000</small>
            </div>
            <div className="dbc-shard-box dbc-shard-b">
              <div>Shard B</div>
              <small>1001–2000</small>
            </div>
            <div className="dbc-shard-box dbc-shard-c">
              <div>Shard C</div>
              <small>2001–3000</small>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "BASE",
    icon: "fa-water",
    title: "BASE",
    sub: "The NoSQL alternative to ACID",
    desc: "BASE trades instant consistency for availability and partition tolerance.",
    definition: `Simple rule: BASE = Eventually consistent. When the network is fine, be consistent. When things break, stay open and converge later.

ACID says: be correct at every instant. BASE says: be available now, fix it later.

Think of a social media like-counter: a celebrity post may show 1.2M likes on one server and 1,200,037 on another for a few seconds. Nobody is harmed - it settles to one number eventually, and the post stays available the whole time.`,
    points: [
      "Basically Available - the system always responds",
      "Soft state - replicas may differ for a short time",
      "Eventually consistent - all copies converge to one value",
      "Use BASE for likes, feeds, carts; ACID for bank transfers",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <pre>{`ACID  : correct at every instant, scales down
BASE  : available now, correct later, scales out

Basically Available    : system always responds
Soft state             : replicas may differ
Eventually consistent  : all copies converge

# Where each fits
bank transfer  -> ACID (Postgres/MySQL)
likes, feeds,  -> BASE (Dynamo, Cassandra,
carts, views            MongoDB)`}</pre>
      </div>
    ),
  },
  {
    id: "RWSPLIT",
    icon: "fa-shuffle",
    title: "Read/Write Splitting",
    sub: "Writes to primary, reads to replicas",
    desc: "Writes go to one primary; reads fan out to many replicas.",
    definition: `Simple rule: Write to the boss (primary). Read from the helpers (replicas).

Rule: Route reads and writes differently. If you need to read your own write, check the primary.

Think of a teacher (primary) writing the official mark sheet once, then photocopying it for all students (replicas). Everyone reads a copy at once - just know a student checking right after an update may see yesterday's sheet.`,
    points: [
      "Writes go to the primary - one source of truth",
      "Reads go to replicas - many readers at once",
      "Replication lag means you may read stale data",
      "Fix: read-your-writes - pin user to primary for N seconds",
    ],
    videoLink: "",
    videoLabel: "Soon",
    diagram: (
      <div className="dbc-diagram-box">
        <pre>{`app -> writes -> PRIMARY
        -> reads  -> replica1, replica2

# Implementation
- proxy: ProxySQL, RDS Reader Endpoint
- ORM: route reads/writes by query type

# Replication lag (async!)
write -> primary (ack)
       -> replica (ms-sec later)`}</pre>
      </div>
    ),
  },

];

function TopicCard({ concept, isActive, onClick }) {
  const hasVideo = Boolean(concept.videoLink && concept.videoLink.trim());

  return (
    <div
      className={`dbc-topic-card ${isActive ? "active" : ""}`}
      onClick={() => onClick(concept.id)}
    >
      <div className="dbc-card-icon">
        <i className={`fas ${concept.icon}`} />
      </div>
      <h3>{concept.title}</h3>
      <span className="dbc-card-sub">{concept.sub}</span>
      <p>{concept.desc}</p>

      <div className="dbc-card-actions">
        {hasVideo ? (
          <a
            className="dbc-video-link"
            href={concept.videoLink}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            title="Watch video"
          >
            <i className="fab fa-youtube" /> Video
          </a>
        ) : (
          <button
            className="dbc-video-link dbc-video-soon"
            type="button"
            onClick={(e) => e.stopPropagation()}
            title="Video coming soon"
          >
            <i className="fas fa-clock" /> {concept.videoLabel || "Soon"}
          </button>
        )}

        <span className="dbc-card-tag">
          <i className="fas fa-diagram-project" /> Diagram
        </span>
      </div>

      {isActive && (
        <span className="dbc-active-indicator">
          <i className="fas fa-check-circle" />
        </span>
      )}
    </div>
  );
}

function DetailPanel({ concept, onClose }) {
  if (!concept) return null;

  return (
    <div className="dbc-modal-backdrop" onClick={onClose}>
      <div className="dbc-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="dbc-detail-header">
          <h2>
            <i className={`fas ${concept.icon}`} />
            <span>{concept.title}</span>
            <span className="dbc-detail-sub">— {concept.sub}</span>
          </h2>
          <button
            className="dbc-close-btn"
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

        <div className="dbc-modal-scroll-content">
          <div className="dbc-definition-box">
            <strong>📘 Definition: </strong>
            {concept.definition}
          </div>

          <div className="dbc-detail-grid">
            <div className="dbc-info-box">
              <h3>Why it matters</h3>
              <ul>
                {concept.points.map((point, index) => (
                  <li key={`${concept.id}-${index}`}>
                    <i className="fas fa-check-circle" /> {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="dbc-diagram-box">
              <h3>Diagram view</h3>
              {concept.diagram}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DatabaseConceptsPage() {
  const [activeId, setActiveId] = useState(null);
  const activeConcept = CONCEPTS.find((concept) => concept.id === activeId);

  const handleClick = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div className="dbc-app-wrapper">
      <Link to="/maang/system-design-basics" className="dbc-back">
        ← Back to System Design Basics
      </Link>

      <header className="dbc-main-header">
        <h1>
          <i className="fas fa-database" /> Database Concepts
          <span className="dbc-small-badge">Easy + Visual</span>
        </h1>
        <div className="dbc-sub-info">
          <span>
            <i className="fas fa-database" /> 9 core concepts
          </span>
          <span>
            <i className="fas fa-diagram-project" /> Diagram friendly
          </span>
          <span>
            <i className="fas fa-bolt" /> Beginner friendly
          </span>
          <span className="dbc-badge">
            <i className="fas fa-mouse-pointer" /> Click any card
          </span>
        </div>
      </header>

      <section className="dbc-why-box">
        <div className="dbc-why-header">
          <i className="fas fa-lightbulb" /> Why do database concepts matter?
        </div>
        <div className="dbc-why-content">
          <p>
            A database is not just storage. It decides how data is organized,
            searched, connected, protected, and scaled. These ideas matter a lot
            in real system design interviews and architecture decisions.
          </p>
          <ul className="dbc-why-list">
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Faster reads</b> with indexing and partitioning
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Cleaner data</b> with normalization
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Higher reliability</b> with replication
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Better scaling</b> with sharding
              </span>
            </li>
          </ul>
          <p className="dbc-why-foot">
            👉 In interviews, people often ask: “Which database should we
            choose?” and “How will it scale?” This page builds the foundation
            for that.
          </p>
        </div>
      </section>

      <div className="dbc-topic-grid">
        {CONCEPTS.map((concept) => (
          <TopicCard
            key={concept.id}
            concept={concept}
            isActive={activeId === concept.id}
            onClick={handleClick}
          />
        ))}
      </div>

      <DetailPanel concept={activeConcept} onClose={() => setActiveId(null)} />
    </div>
  );
}
