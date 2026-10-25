import { Link } from "react-router-dom";
import "./MicroservicesTopics.css";

function MicroservicesTopics() {
  const microservicesColor = "#07acff";

  return (
    <div className="microservices-topics-page">
      {/* Hero Section */}
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">🔧</span>
          <h1 className="logo-text">MICROSERVICES</h1>
        </div>
        <p className="subtitle">
          Master Microservices architecture with comprehensive courses and
          interview preparation
        </p>
      </section>

      {/* Topics Grid */}
      <section className="skills-section">
        <h2 className="section-title">Choose Your Path</h2>
        <p className="section-subtitle">
          Select a learning track to get started
        </p>
        <div className="skills-grid">
          {/* Microservices Full Course */}
          <Link to="/microservices/course" className="skill-card-link">
            <div
              className="skill-card"
              style={{ borderColor: microservicesColor }}
            >
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: microservicesColor + "18",
                    color: microservicesColor,
                    boxShadow: `0 0 20px ${microservicesColor}25, inset 0 0 0 1px ${microservicesColor}30`,
                  }}
                >
                  📚
                </span>
                <span className="skill-card-title">
                  Microservices Full Course
                </span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: microservicesColor + "18",
                    color: microservicesColor,
                    borderColor: microservicesColor + "40",
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
                    background: microservicesColor + "15",
                    color: microservicesColor,
                    borderColor: microservicesColor + "35",
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

          {/* Microservices Interview Q&A */}
          <Link to="/microservices/interview" className="skill-card-link">
            <div
              className="skill-card"
              style={{ borderColor: microservicesColor }}
            >
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: microservicesColor + "18",
                    color: microservicesColor,
                    boxShadow: `0 0 20px ${microservicesColor}25, inset 0 0 0 1px ${microservicesColor}30`,
                  }}
                >
                  💼
                </span>
                <span className="skill-card-title">
                  Microservices Interview Q&A
                </span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: microservicesColor + "18",
                    color: microservicesColor,
                    borderColor: microservicesColor + "40",
                  }}
                >
                  60+ Questions
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
                    background: microservicesColor + "15",
                    color: microservicesColor,
                    borderColor: microservicesColor + "35",
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

export default MicroservicesTopics;
