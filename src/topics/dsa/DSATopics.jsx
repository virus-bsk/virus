import { Link } from "react-router-dom";
import "./DSATopics.css";

function DSATopics() {
  const dsaColor = "#a855f7";

  return (
    <div className="dsa-topics-page">
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">📊</span>
          <h1 className="logo-text">DATA STRUCTURES & ALGORITHMS</h1>
        </div>
        <p className="subtitle">
          Master DSA from fundamentals to advanced problem solving — complete
          video course plus a curated set of 75 LeetCode problems
        </p>
      </section>

      {/* Topics Grid */}
      <section className="skills-section">
        <h2 className="section-title">Choose Your Path</h2>
        <p className="section-subtitle">
          Select a learning track to get started
        </p>
        <div className="skills-grid">
          {/* DSA Full Course */}
          <Link to="/dsa/course" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: dsaColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: dsaColor + "18",
                    color: dsaColor,
                    boxShadow: `0 0 20px ${dsaColor}25, inset 0 0 0 1px ${dsaColor}30`,
                  }}
                >
                  📚
                </span>
                <span className="skill-card-title">DSA Full Course</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: dsaColor + "18",
                    color: dsaColor,
                    borderColor: dsaColor + "40",
                  }}
                >
                  39 Video Lessons
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  Day-by-day video lessons covering recursion, sorting,
                  searching, arrays, linked lists, stacks, queues, trees and
                  graphs — watch right here in the app.
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: dsaColor + "15",
                    color: dsaColor,
                    borderColor: dsaColor + "35",
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

          {/* 75 LeetCode Problems */}
          <Link to="/dsa/leetcode" className="skill-card-link">
            <div className="skill-card" style={{ borderColor: dsaColor }}>
              <div className="skill-card-top">
                <span
                  className="skill-card-icon"
                  style={{
                    backgroundColor: dsaColor + "18",
                    color: dsaColor,
                    boxShadow: `0 0 20px ${dsaColor}25, inset 0 0 0 1px ${dsaColor}30`,
                  }}
                >
                  🧩
                </span>
                <span className="skill-card-title">75 LeetCode Problems</span>
              </div>
              <div className="skill-card-middle">
                <span className="skill-card-line" />
                <span
                  className="skill-card-badge"
                  style={{
                    background: dsaColor + "18",
                    color: dsaColor,
                    borderColor: dsaColor + "40",
                  }}
                >
                  Curated List
                </span>
                <span className="skill-card-line" />
              </div>
              <div className="skill-card-bottom">
                <p className="skill-card-desc">
                  The most-asked 75 LeetCode problems for interviews — arrays,
                  strings, trees, graphs, DP and more, organized by pattern.
                </p>
                <button
                  className="skill-card-btn"
                  style={{
                    background: dsaColor + "15",
                    color: dsaColor,
                    borderColor: dsaColor + "35",
                  }}
                >
                  View Problems
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

export default DSATopics;
