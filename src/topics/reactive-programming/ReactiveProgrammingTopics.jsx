import { Link } from "react-router-dom";
import "../spring-boot/SpringBootTopics.css";

function ReactiveProgrammingTopics() {
  const reactiveColor = "#8b5cf6";

  return (
    <div className="spring-boot-topics-page">
      {/* Hero Section */}
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">🔁</span>
          <h1 className="logo-text">REACTIVE PROGRAMMING</h1>
        </div>
        <p className="subtitle">
          Build resilient, asynchronous data streams with reactive paradigms.
          Master Project Reactor, Spring WebFlux, backpressure, and event-driven
          architectures.
        </p>
      </section>

      {/* Topics Grid */}
      <section className="skills-section">
        <h2 className="section-title">Choose Your Path</h2>
        <p className="section-subtitle">
          Select a learning track to get started
        </p>
        <div className="skills-grid">
          {/* Reactive Programming Full Course */}
          <Link to="/reactive-programming/course" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: reactiveColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: reactiveColor + "18",
                    color: reactiveColor,
                    boxShadow: `0 0 20px ${reactiveColor}25, inset 0 0 0 1px ${reactiveColor}30`,
                  }}
                >
                  📚
                </span>
                <span className="skill-card-title">
                  Reactive Programming Full Course
                </span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: reactiveColor + "18",
                    color: reactiveColor,
                    borderColor: reactiveColor + "40",
                  }}
                >
                  Course
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  Understand reactive fundamentals, Project Reactor, WebFlux,
                  backpressure, and real-time streaming patterns
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: reactiveColor + "15",
                    color: reactiveColor,
                    borderColor: reactiveColor + "35",
                  }}
                >
                  Start Learning
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>

          {/* Reactive Programming Interview Q&A */}
          <Link
            to="/reactive-programming/interview"
            className="skill-card-link"
          >
            <div className="skill-card" style={{ borderColor: reactiveColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: reactiveColor + "18",
                    color: reactiveColor,
                    boxShadow: `0 0 20px ${reactiveColor}25, inset 0 0 0 1px ${reactiveColor}30`,
                  }}
                >
                  💼
                </span>
                <span className="skill-card-title">
                  Reactive Programming Interview Q&A
                </span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: reactiveColor + "18",
                    color: reactiveColor,
                    borderColor: reactiveColor + "40",
                  }}
                >
                  100 Questions
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  Practice Reactive Programming interview questions with
                  detailed answers and code examples
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: reactiveColor + "15",
                    color: reactiveColor,
                    borderColor: reactiveColor + "35",
                  }}
                >
                  Start Practicing
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ReactiveProgrammingTopics;
