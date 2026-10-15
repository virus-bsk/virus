import { useState } from "react";
import { Link } from "react-router-dom";
import "./DesignPatternsPage.css";
import { designPatternsTopics } from "./designPatternsData";

/**
 * Design Patterns page (Route: /maang/system-design/patterns).
 * Renders a grid of design-pattern cards, same look-and-feel as the OOPS
 * and SOLID pages. Clicking a card opens a detail panel (Java + UML).
 * Each card has a YouTube video link (plays in-app via the handler).
 */
function TopicCard({ topic, isActive, onClick }) {
  return (
    <div
      className={`oops-topic-card ${isActive ? "active" : ""}`}
      onClick={() => onClick(topic.id)}
    >
      <div className="oops-card-icon">
        <i className={`fas ${topic.icon}`} />
      </div>
      <h3>{topic.title}</h3>
      <span className="oops-card-sub">{topic.sub}</span>
      <p>{topic.desc}</p>
      <a
        className="oops-video-link"
        href={topic.videoLink}
        onClick={(e) => e.stopPropagation()}
        title="Watch video"
      >
        <i className="fas fa-play-circle" /> Video
      </a>
      <span className="oops-card-tag">
        <i className="fas fa-code" /> Java + UML
      </span>
      {isActive && (
        <span className="oops-active-indicator">
          <i className="fas fa-check-circle" />
        </span>
      )}
    </div>
  );
}

function DetailPanel({ topic, onClose }) {
  if (!topic) return null;
  const svgString = topic.diagram();

  return (
    <div className="oops-modal-backdrop" onClick={onClose}>
      <div
        className="oops-detail-panel modal-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="oops-detail-header">
          <h2>
            <i className={`fas ${topic.icon}`} />
            <span className="oops-title-text">{topic.title}</span>
            <span className="oops-detail-sub">— {topic.sub}</span>
          </h2>
          <button
            className="oops-close-btn"
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="oops-modal-scroll-content">
          <div className="oops-definition-box">
            <strong>📘 Definition: </strong>
            {topic.definition}
          </div>

          <div className="oops-detail-grid">
            <div>
              <div className="oops-code-section">
                <div className="oops-code-header">
                  <span>
                    <i className="fab fa-java" /> Java Code
                  </span>
                  <span className="oops-lang-badge">Java 17+</span>
                </div>
                <pre>{topic.code}</pre>
              </div>
            </div>

            <div className="oops-diagram-section">
              <div className="oops-diagram-title">
                <i className="fas fa-diagram-project" /> UML Class Diagram
              </div>
              <div dangerouslySetInnerHTML={{ __html: svgString }} />
              <div className="oops-diagram-caption">
                <i className="fas fa-info-circle" />
                <span className="oops-rel-tag">{topic.relation}</span>
                <span>
                  <i className="fas fa-arrow-right" />{" "}
                  {topic.points.join(" • ")}
                </span>
              </div>
            </div>
          </div>

          <div className="oops-key-points">
            {topic.points.map((p, idx) => (
              <span key={idx}>
                <i className="fas fa-check-circle" /> {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Design Patterns page — mirrors the OOPS / SOLID pages' structure & style.
 */
export default function DesignPatternsPage() {
  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleClose = () => setActiveId(null);
  const activeTopic = designPatternsTopics.find((t) => t.id === activeId);

  return (
    <div className="oops-app-wrapper">
      <Link to="/maang/system-design-basics" className="oops-back">
        ← Back to System Design Basics
      </Link>
      <header className="oops-main-header">
        <h1>
          <i className="fas fa-puzzle-piece" /> Design Patterns
          <span className="oops-java-badge">
            <i className="fab fa-java" /> Java + UML
          </span>
        </h1>
        <div className="oops-sub-info">
          <span>
            <i className="fas fa-diagram-project" /> Creational · Structural ·
            Behavioural
          </span>
          <span>
            <i className="fas fa-code" /> Real Java Examples
          </span>
          <span>
            <i className="fas fa-eye" /> Visual Diagrams
          </span>
          <span className="oops-badge">
            <i className="fas fa-mouse-pointer" /> Click any card
          </span>
        </div>
      </header>

      <section className="oops-why-box">
        <div className="oops-why-header">
          <i className="fas fa-lightbulb" /> Why do we need Design Patterns?
        </div>
        <div className="oops-why-content">
          <p>
            Every senior developer eventually solves the same problems:
            <i>"How do I create only one object?"</i>,
            <i>"How do I notify many components when something changes?"</i>,
            <i>"How do I add new features without breaking old code?"</i>.
            Design patterns are <b>proven, reusable solutions</b> to these
            recurring problems — battle-tested by millions of developers.
          </p>
          <ul className="oops-why-list">
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Faster development</b> — don't reinvent the wheel, use a
                known solution
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Common vocabulary</b> — say "use a Factory" instead of
                explaining 50 lines
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Parts stay independent</b> — you can swap one piece out
                without breaking the rest
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Production-tested</b> — used in Spring, Hibernate, Java
                collections, JDK
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Interview must-know</b> — asked in every LLD / System Design
                round
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>3 simple groups</b> — Creational (making objects),
                Structural (fitting pieces together), Behavioural (how pieces
                talk)
              </span>
            </li>
          </ul>
          <p className="oops-why-foot">
            👉 Real-world usage: <code>Runtime.getRuntime()</code> is a
            <b> Singleton</b>. <code>Calendar.getInstance()</code> is a
            <b> Factory</b>. <code>StringBuilder</code> is a <b>Builder</b>.
            <code> java.util.logging</code> uses <b>Observer</b>.
            <code> Collections.sort(list, comparator)</code> uses
            <b> Strategy</b>. <code>java.lang.reflect.Proxy</code> IS the
            <b> Proxy</b> pattern. <code>Servlet filters</code> form a
            <b> Chain of Responsibility</b>.
          </p>
        </div>
      </section>

      {/* ===== Patterns grouped by category ===== */}
      {[
        {
          key: "creational",
          label: "Creational Patterns",
          sub: "About making new objects the smart way",
          icon: "fa-cubes",
          color: "#ff6b6b",
        },
        {
          key: "structural",
          label: "Structural Patterns",
          sub: "About fitting pieces together cleanly",
          icon: "fa-shapes",
          color: "#4ecdc4",
        },
        {
          key: "behavioral",
          label: "Behavioural Patterns",
          sub: "About how pieces talk and share work",
          icon: "fa-people-arrows",
          color: "#a78bfa",
        },
      ].map((cat) => {
        const items = designPatternsTopics.filter(
          (t) => t.category === cat.key,
        );
        if (items.length === 0) return null;
        return (
          <section key={cat.key} className="oops-pattern-category">
            <div
              className="oops-category-header"
              style={{ "--cat-color": cat.color }}
            >
              <i className={`fas ${cat.icon}`} />
              <div>
                <h2>{cat.label}</h2>
                <span>{cat.sub}</span>
              </div>
              <span className="oops-category-count">
                {items.length} pattern{items.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="oops-topic-grid">
              {items.map((t) => (
                <TopicCard
                  key={t.id}
                  topic={t}
                  isActive={t.id === activeId}
                  onClick={handleClick}
                />
              ))}
            </div>
          </section>
        );
      })}

      <DetailPanel topic={activeTopic} onClose={handleClose} />

      <div className="oops-footer-note">
        <i className="fas fa-graduation-cap" /> Master Design Patterns for
        System Design — Each pattern includes Java code + visual diagram
      </div>
    </div>
  );
}

export { TopicCard, DetailPanel };
