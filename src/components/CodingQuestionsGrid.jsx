import { useMemo, useState } from "react";
import hljs from "../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "./CodingQuestionsGrid.css";
import { javaInterviewQuestions } from "../data/javaInterviewQuestions";
import { javaInterviewAnswers } from "../data/javaInterviewAnswers";
import { javaCodingGridConfig } from "../data/javaCodingGridConfig";

/**
 * CodingQuestionsGrid – the "Top 30 Java Coding Interview Questions" page.
 * Each card shows its question number/title plus the optimized
 * Java answer for that question, looked up from javaInterviewAnswers by id.
 *
 * The header copy (name + tagline) lives in javaCodingGridConfig so it is owned
 * by the grid, not the home-page hero.
 *
 * Solutions start collapsed so the question list is easy to scan, and can be
 * expanded individually via the toggle button.
 */
const highlightCode = (code, language = "java") => {
  try {
    return hljs.highlight(code, {
      language,
      ignoreIllegals: true,
    }).value;
  } catch (err) {
    console.warn(`Highlight.js error for language "${language}":`, err);
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }
};

function CodingQuestionsGrid() {
  const answersById = useMemo(() => {
    const map = {};
    javaInterviewAnswers.forEach((entry) => {
      map[entry.id] = entry.answer;
    });
    return map;
  }, []);

  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState("");
  const toggleAnswer = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const {
    name,
    tagline,
    icon,
    totalQuestions,
    answered,
    progress,
    description,
    subtopics,
  } = javaCodingGridConfig;

  const filteredQuestions = javaInterviewQuestions.filter((question) =>
    `${question.question} ${question.input} ${question.output}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  return (
    <section className="coding-questions-grid-wrapper">
      <div className="coding-grid-header">
        <div className="coding-grid-hero">
          <div className="coding-grid-title-row">
            <span className="coding-grid-icon" aria-hidden="true">
              {icon}
            </span>
            <div>
              <span className="coding-grid-eyebrow">JAVA INTERVIEW PREP</span>
              <h1 className="coding-grid-name">{name}</h1>
            </div>
          </div>
          <p className="coding-grid-tagline">{tagline}</p>
          <p className="coding-grid-description">{description}</p>
          <div className="coding-grid-stats" aria-label="Question set details">
            <span>
              <strong>{totalQuestions}</strong> curated questions
            </span>
            <span>
              <strong>{answered}</strong> solutions included
            </span>
            <span>
              <strong>Java</strong> language
            </span>
          </div>
        </div>

        <div className="coding-grid-controls">
          <div className="coding-grid-progress">
            <div className="coding-grid-progress-copy">
              <span>Learning set</span>
              <strong>{progress}% complete</strong>
            </div>
            <div
              className="progress-bar-track"
              role="progressbar"
              aria-label="Learning set completion"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress}
            >
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <label className="coding-question-search">
            <span className="coding-search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a question..."
              aria-label="Search Java coding questions"
            />
            <kbd>/</kbd>
          </label>
        </div>

        <div className="subtopics-container">
          {subtopics.map((st) => (
            <span key={st.name} className="subtopic-badge">
              <span className="subtopic-icon" aria-hidden="true">
                {st.icon}
              </span>
              {st.name}
            </span>
          ))}
        </div>
        <p className="coding-question-count" aria-live="polite">
          Showing <strong>{filteredQuestions.length}</strong> of{" "}
          {javaInterviewQuestions.length} questions
        </p>
      </div>

      <div className="coding-questions-grid">
        {filteredQuestions.map((q) => {
          const answer = answersById[q.id] || "No answer available yet.";
          const isOpen = expanded[q.id] === true;
          return (
            <div
              key={q.id}
              className="coding-question-card"
              data-id={q.id}
            >
              <div className="question-header">
                <span className="question-number">{q.id}</span>
                <span className="question-text">{q.question}</span>
                <button
                  type="button"
                  className="answer-toggle"
                  aria-label={isOpen ? "Collapse answer" : "Show answer"}
                  aria-expanded={isOpen}
                  onClick={() => toggleAnswer(q.id)}
                >
                  <span>{isOpen ? "Hide solution" : "View solution"}</span>
                  <span className="answer-toggle-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </div>

              {isOpen && (
                <>
                  <div className="question-meta">
                    <span className="question-meta-item">
                      <strong>Input:</strong> {q.input}
                    </span>
                    <span className="question-meta-item">
                      <strong>Output:</strong> {q.output}
                    </span>
                  </div>
                  <pre className="question-answer-pre">
                    <code
                      className="hljs language-java"
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(answer, "java"),
                      }}
                    />
                  </pre>
                </>
              )}
            </div>
          );
        })}
        {filteredQuestions.length === 0 && (
          <div className="coding-questions-empty">
            <span aria-hidden="true">⌕</span>
            <h2>No questions found</h2>
            <p>Try another question name or clear your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CodingQuestionsGrid;
