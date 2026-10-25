import { Link } from "react-router-dom";
import "./ReactJSTopics.css";

function ReactJSTopics() {
  const reactColor = "#61dafb";

  return (
    <div className="react-topics-page">
      {/* Hero Section */}
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">⚛️</span>
          <h1 className="logo-text">REACTJS</h1>
        </div>
        <p className="subtitle">
          Master ReactJS with comprehensive courses and interview preparation
        </p>
      </section>

      {/* Topics Grid */}
      <section className="skills-section">
        <h2 className="section-title">Choose Your Path</h2>
        <p className="section-subtitle">
          Select a learning track to get started
        </p>
        <div className="skills-grid">
          {/* ReactJS Full Course */}
          <Link to="/reactjs/course" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: reactColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: reactColor + "18",
                    color: reactColor,
                    boxShadow: `0 0 20px ${reactColor}25, inset 0 0 0 1px ${reactColor}30`,
                  }}
                >
                  📚
                </span>
                <span className="skill-card-title">ReactJS Full Course</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: reactColor + "18",
                    color: reactColor,
                    borderColor: reactColor + "40",
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
                    background: reactColor + "15",
                    color: reactColor,
                    borderColor: reactColor + "35",
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

          {/* ReactJS Interview Q&A */}
          <Link to="/reactjs/interview" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: reactColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: reactColor + "18",
                    color: reactColor,
                    boxShadow: `0 0 20px ${reactColor}25, inset 0 0 0 1px ${reactColor}30`,
                  }}
                >
                  💼
                </span>
                <span className="skill-card-title">ReactJS Interview Q&A</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: reactColor + "18",
                    color: reactColor,
                    borderColor: reactColor + "40",
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
                    background: reactColor + "15",
                    color: reactColor,
                    borderColor: reactColor + "35",
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

export default ReactJSTopics;
