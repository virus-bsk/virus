import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "../../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./SolidPage.css";
import { solidTopics } from "./solidData";

/**
 * SOLID Principles page (Route: /maang/system-design/solid).
 * Renders a grid of SOLID concept cards.
 * Clicking a card opens a detail panel with a Java example + UML diagram.
 * Each card also has a YouTube video link (plays in-app via the handler).
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
 * SOLID Principles page.
 * Mirrors the look-and-feel of the OOPS page (same classes reused) but
 * imports solidTopics / SolidPage.css.
 */
export default function SolidPage() {
  const [activeId, setActiveId] = useState(null);

  const handleClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleClose = () => setActiveId(null);
  const activeTopic = solidTopics.find((t) => t.id === activeId);

  return (
    <div className="oops-app-wrapper">
      <Link to="/maang/system-design-basics" className="oops-back">
        ← Back to System Design Basics
      </Link>
      <header className="oops-main-header">
        <h1>
          <i className="fas fa-gem" /> SOLID Principles
          <span className="oops-java-badge">
            <i className="fab fa-java" /> Java + UML
          </span>
        </h1>
        <div className="oops-sub-info">
          <span>
            <i className="fas fa-diagram-project" /> 5 SOLID Principles
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
        <a
          className="oops-series-link"
          href="https://www.youtube.com/watch?v=-itY-xe2x1s"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="Watch the full SOLID series (Telugu)"
        >
          <i className="fab fa-youtube" /> Watch Full SOLID Series (Telugu)
        </a>
      </header>

      <section className="oops-why-box">
        <div className="oops-why-header">
          <i className="fas fa-lightbulb" /> Why do we need SOLID Principles?
        </div>
        <div className="oops-why-content">
          <p>
            As your codebase grows, classes become tightly coupled, changes
            break unrelated features, and testing becomes a nightmare. SOLID
            gives you <b>5 proven rules</b> to write code that is:
          </p>
          <ul className="oops-why-list">
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Easy to maintain</b> — small focused classes, one reason to
                change
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Easy to extend</b> — add new features without touching old
                code
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Easy to test</b> — depend on abstractions, mock anything
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Reusable</b> — small interfaces, swappable implementations
              </span>
            </li>
            <li>
              <i className="fas fa-check-circle" />
              <span>
                <b>Interview-ready</b> — asked in every LLD / Senior dev round
              </span>
            </li>
          </ul>
          <p className="oops-why-foot">
            👉 In real projects: SRP keeps controllers thin, OCP avoids
            <code>if-else</code> hell, LSP prevents subtle bugs in inheritance,
            ISP stops “fat-interface” pain, and DIP makes your code testable
            with mocks.
          </p>
        </div>
      </section>

      <div className="oops-topic-grid">
        {solidTopics.map((t) => (
          <TopicCard
            key={t.id}
            topic={t}
            isActive={t.id === activeId}
            onClick={handleClick}
          />
        ))}
      </div>

      <DetailPanel topic={activeTopic} onClose={handleClose} />

      <div className="oops-footer-note">
        <i className="fas fa-graduation-cap" /> Master SOLID for System Design —
        Each principle includes Java code + visual diagram
      </div>
    </div>
  );
}

export { TopicCard, DetailPanel };
