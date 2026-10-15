import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./OopsPage.css";
import { oopsTopics } from "./oopsData";

/**
 * OOP System Design page (Route: /maang/system-design/oops).
 * Renders a grid of OOP concept cards (Class & Object, Encapsulation, ...).
 * Clicking a card opens a detail panel with a Java example + UML diagram.
 * Each card also has a YouTube video link that plays in-app (the global
 * YouTubeLinkHandler intercepts the anchor and opens VideoPlayerModal).
 */

// IDE-style syntax-highlighted Java code block (same approach as the LLD pages).
function CodeBlock({ code }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-highlighted");
      hljs.highlightElement(ref.current);
    }
  }, [code]);
  return (
    <pre className="oops-code-pre language-java">
      <code ref={ref} className="language-java">
        {code}
      </code>
    </pre>
  );
}
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
                <CodeBlock code={topic.code} />
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
 * Renders our own header, then simply embeds the standalone-looking page
 * content. We do not import ReactDOM here — the page is part of the app.
 */
export default function OopsPage() {
  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleClose = () => setActiveId(null);
  const activeTopic = oopsTopics.find((t) => t.id === activeId);

  return (
    <div className="oops-app-wrapper">
      <Link to="/maang/system-design-basics" className="oops-back">
        ← Back to System Design Basics
      </Link>
      <header className="oops-main-header">
        <h1>
          <i className="fas fa-cubes" /> OOP System Design
          <span className="oops-java-badge">
            <i className="fab fa-java" /> Java + UML
          </span>
        </h1>
        <div className="oops-sub-info">
          <span>
            <i className="fas fa-gem" /> OOP Foundations
          </span>
          <span>
            <i className="fas fa-crown" /> 4 Pillars
          </span>
          <span>
            <i className="fas fa-project-diagram" /> Core Relationships
          </span>
          <span>
            <i className="fas fa-code" /> Real Java Examples
          </span>
          <span>
            <i className="fas fa-eye" /> Visual Class Diagrams
          </span>
          <span className="oops-badge">
            <i className="fas fa-mouse-pointer" /> Click any card
          </span>
        </div>
      </header>

      <section className="oops-why-box">
        <div className="oops-why-header">
          <i className="fas fa-lightbulb" /> Why do we need OOP?
        </div>
        <div className="oops-why-content">
          <p>
            As software grows, plain functions and global variables become a
            tangled mess. <b>Object-Oriented Programming</b> models real-world
            entities as <b>objects</b> that bundle <i>data</i> and
            <i> behavior</i> together — making large codebases
            <b> organized, reusable, and easier to change</b>.
          </p>
          <ul className="oops-why-list">
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Modularity</b> — each object is a self-contained unit
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Reusability</b> — inherit and extend existing classes
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Security</b> — encapsulation hides internal state
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Flexibility</b> — polymorphism lets one interface, many
                behaviors
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Real-world mapping</b> — BankAccount, Order, User, Product →
                all objects
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Interview essential</b> — foundation for LLD / System Design
              </span>
            </li>
          </ul>
          <p className="oops-why-foot">
            👉 OOP is the <b>foundation</b> of frameworks like Spring,
            Hibernate, and the entire Java ecosystem. Master it once, use it
            everywhere.
          </p>
        </div>
      </section>

      <div className="oops-foundation-section">
        <div className="oops-section-header oops-foundation-header">
          <i className="fas fa-gem" /> Foundation of OOP
          <span className="oops-section-sub">
            The starting point — without this, no other OOP concept exists
          </span>
        </div>
        <div className="oops-topic-grid">
          {oopsTopics
            .filter((t) => t.category === "foundation")
            .map((t) => (
              <TopicCard
                key={t.id}
                topic={t}
                isActive={t.id === activeId}
                onClick={handleClick}
              />
            ))}
        </div>
      </div>

      <div className="oops-pillars-section">
        <div className="oops-section-header oops-pillars-header">
          <i className="fas fa-crown" /> The 4 Pillars of OOP
          <span className="oops-section-sub">
            The core building blocks of Object-Oriented Programming
          </span>
        </div>
        <div className="oops-topic-grid">
          {oopsTopics
            .filter((t) => t.category === "pillar")
            .map((t) => (
              <TopicCard
                key={t.id}
                topic={t}
                isActive={t.id === activeId}
                onClick={handleClick}
              />
            ))}
        </div>
      </div>

      <div className="oops-relations-section">
        <div className="oops-section-header oops-relations-header">
          <i className="fas fa-project-diagram" /> Class Relationships
          <span className="oops-section-sub">
            How classes connect, own, and use each other
          </span>
        </div>
        <div className="oops-topic-grid">
          {oopsTopics
            .filter((t) => t.category === "relation")
            .map((t) => (
              <TopicCard
                key={t.id}
                topic={t}
                isActive={t.id === activeId}
                onClick={handleClick}
              />
            ))}
        </div>
      </div>

      <DetailPanel topic={activeTopic} onClose={handleClose} />

      <div className="oops-footer-note">
        <i className="fas fa-graduation-cap" /> Master the Foundation + 4
        Pillars + Class Relationships of OOP for System Design — Each concept
        includes Java code + visual diagram
      </div>
    </div>
  );
}

export { TopicCard, DetailPanel };
