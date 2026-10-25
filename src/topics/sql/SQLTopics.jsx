import { Link } from "react-router-dom";
import "../java/JavaTopics.css";

function SQLTopics() {
  const sqlColor = "#07acff";

  return (
    <div className="java-topics-page">
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">🗃️</span>
          <h1 className="logo-text">SQL & DATABASES</h1>
        </div>
        <p className="subtitle">
          Master SQL fundamentals, database design, and interview preparation
        </p>
      </section>

      <section className="skills-section">
        <h2 className="section-title">Choose Your Path</h2>
        <p className="section-subtitle">
          Select a learning track to get started
        </p>
        <div className="skills-grid">
          <Link to="/sql/course" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: sqlColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: sqlColor + "18",
                    color: sqlColor,
                    boxShadow: `0 0 20px ${sqlColor}25, inset 0 0 0 1px ${sqlColor}30`,
                  }}
                >
                  📚
                </span>
                <span className="skill-card-title">SQL Full Course</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: sqlColor + "18",
                    color: sqlColor,
                    borderColor: sqlColor + "40",
                  }}
                >
                  Course
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  Comprehensive SQL concepts, queries, and database design
                  topics
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: sqlColor + "15",
                    color: sqlColor,
                    borderColor: sqlColor + "35",
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

          <Link to="/sql/interview" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: sqlColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: sqlColor + "18",
                    color: sqlColor,
                    boxShadow: `0 0 20px ${sqlColor}25, inset 0 0 0 1px ${sqlColor}30`,
                  }}
                >
                  💼
                </span>
                <span className="skill-card-title">SQL Interview Q&A</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: sqlColor + "18",
                    color: sqlColor,
                    borderColor: sqlColor + "40",
                  }}
                >
                  100+ Questions
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  Practice SQL interview questions with clear answers and
                  examples
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: sqlColor + "15",
                    color: sqlColor,
                    borderColor: sqlColor + "35",
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

export default SQLTopics;
