import { Link } from "react-router-dom";
import "./JavaTopics.css";

function JavaTopics() {
  const javaColor = "#07acff";

  return (
    <div className="java-topics-page">
      {/* Hero Section */}
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">☕</span>
          <h1 className="logo-text">JAVA</h1>
        </div>
        <p className="subtitle">
          Master Java programming with comprehensive courses and interview
          preparation
        </p>
      </section>

      {/* Topics Grid */}
      <section className="skills-section">
        <h2 className="section-title">Choose Your Path</h2>
        <p className="section-subtitle">
          Select a learning track to get started
        </p>
        <div className="skills-grid">
          {/* Java Full Course */}
          <Link to="/java/course" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: javaColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: javaColor + "18",
                    color: javaColor,
                    boxShadow: `0 0 20px ${javaColor}25, inset 0 0 0 1px ${javaColor}30`,
                  }}
                >
                  📚
                </span>
                <span className="skill-card-title">Java Full Course</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: javaColor + "18",
                    color: javaColor,
                    borderColor: javaColor + "40",
                  }}
                >
                  Course
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  Comprehensive learning materials with examples, exercises, and
                  projects
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: javaColor + "15",
                    color: javaColor,
                    borderColor: javaColor + "35",
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

          {/* Java Interview Q&A */}
          <Link to="/java/interview" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: javaColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: javaColor + "18",
                    color: javaColor,
                    boxShadow: `0 0 20px ${javaColor}25, inset 0 0 0 1px ${javaColor}30`,
                  }}
                >
                  💼
                </span>
                <span className="skill-card-title">Java Interview Q&A</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: javaColor + "18",
                    color: javaColor,
                    borderColor: javaColor + "40",
                  }}
                >
                  100+ Questions
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  Master interview questions with detailed answers and code
                  examples
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: javaColor + "15",
                    color: javaColor,
                    borderColor: javaColor + "35",
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

export default JavaTopics;
