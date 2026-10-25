import { Link } from "react-router-dom";
import "./SpringBootTopics.css";

function SpringBootTopics() {
  const springBootColor = "#07acff";

  return (
    <div className="spring-boot-topics-page">
      {/* Hero Section */}
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">🌱</span>
          <h1 className="logo-text">SPRING BOOT</h1>
        </div>
        <p className="subtitle">
          Master Spring Boot framework with comprehensive courses and interview
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
          {/* Spring Boot Full Course */}
          <Link to="/spring-boot/course" className="skill-card-link">
            <div
              className="skill-card"
              style={{ borderColor: springBootColor }}
            >
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: springBootColor + "18",
                    color: springBootColor,
                    boxShadow: `0 0 20px ${springBootColor}25, inset 0 0 0 1px ${springBootColor}30`,
                  }}
                >
                  📚
                </span>
                <span className="skill-card-title">
                  Spring Boot Full Course
                </span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: springBootColor + "18",
                    color: springBootColor,
                    borderColor: springBootColor + "40",
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
                    background: springBootColor + "15",
                    color: springBootColor,
                    borderColor: springBootColor + "35",
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

          {/* Spring Boot Interview Q&A */}
          <Link to="/spring-boot/interview" className="skill-card-link">
            <div
              className="skill-card"
              style={{ borderColor: springBootColor }}
            >
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: springBootColor + "18",
                    color: springBootColor,
                    boxShadow: `0 0 20px ${springBootColor}25, inset 0 0 0 1px ${springBootColor}30`,
                  }}
                >
                  💼
                </span>
                <span className="skill-card-title">
                  Spring Boot Interview Q&A
                </span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: springBootColor + "18",
                    color: springBootColor,
                    borderColor: springBootColor + "40",
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
                    background: springBootColor + "15",
                    color: springBootColor,
                    borderColor: springBootColor + "35",
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

export default SpringBootTopics;
