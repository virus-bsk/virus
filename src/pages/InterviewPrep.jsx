import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { interviewPrepTopics } from "../data/interviewPrepData";
import { interviewPrepAnswers } from "../data/interviewPrepAnswers";
import "./InterviewPrep.css";

const ANSWER_SECTIONS = [
  ["description", "🎤 Interview Answer", "#2563eb"],
  ["example", "🌍 Real-time Example", "#16a34a"],
];

const CODE_LANG = {
  sql: "SQL",
  java: "Java",
  "spring-boot": "Java",
  microservices: "Java",
  kafka: "Java",
  reactive: "Java",
  javascript: "JavaScript",
  react: "JavaScript / JSX",
};

const CODE_KEYWORDS = new Set(
  (
    "select from where group by having order limit offset join inner left right full outer on as with union all " +
    "insert into values update set delete create table index primary key foreign references unique not null distinct " +
    "class public private protected static final void new return if else for while do int boolean string extends " +
    "implements interface import export default try catch finally throw throws synchronized volatile abstract this super " +
    "var let const function async await true false null undefined typeof promise then catch finally " +
    "console log fetch map filter reduce settimeout cleartimeout setinterval clearinterval " +
    "localstorage sessionstorage object create bind call apply symbol bigint instanceof " +
    "usestate useeffect useref usememo usecallback usereducer usecontext memo lazy suspense createcontext provider " +
    "dispatch props state react response json"
  ).split(" "),
);

function renderLines(value) {
  if (value === undefined || value === null || value === "") return null;

  return String(value)
    .split(/\\n|\n/)
    .map((line, index) => (
      <span key={index}>
        {line}
        {index < String(value).split(/\\n|\n/).length - 1 && <br />}
      </span>
    ));
}

function highlightCode(code) {
  const parts = String(code).split(
    /(\/\/[^\n]*|--[^\n]*|#[^\n]*|"[^"\n]*"|'[^'\n]*'|`[^`\n]*`)/g,
  );

  return parts.map((part, index) => {
    if (!part) return null;

    if (
      part.startsWith("//") ||
      part.startsWith("--") ||
      (part.startsWith("#") && !/['"]/.test(part))
    ) {
      return (
        <span className="ip-tok-cm" key={index}>
          {part}
        </span>
      );
    }

    if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
      return (
        <span className="ip-tok-str" key={index}>
          {part}
        </span>
      );
    }

    return part.split(/(\b\w+\b)/g).map((word, wordIndex) => {
      if (!word) return null;

      if (CODE_KEYWORDS.has(word.toLowerCase())) {
        return (
          <span className="ip-tok-kw" key={`${index}-${wordIndex}`}>
            {word}
          </span>
        );
      }

      if (/^\d+$/.test(word)) {
        return (
          <span className="ip-tok-num" key={`${index}-${wordIndex}`}>
            {word}
          </span>
        );
      }

      return word;
    });
  });
}

function InterviewPrep() {
  const [selectedTopicId, setSelectedTopicId] = useState(
    interviewPrepTopics[0]?.id ?? "",
  );

  const [active, setActive] = useState(null);

  const openPopup = (topicId, kind, index) => {
    setActive({ topicId, kind, index });
  };

  const closePopup = useCallback(() => {
    setActive(null);
  }, []);

  const activeTopic = active
    ? interviewPrepTopics.find((topic) => topic.id === active.topicId)
    : null;

  const activeList = active
    ? (interviewPrepAnswers[active.topicId]?.[active.kind] ?? [])
    : [];

  const activeQuestion =
    activeTopic && active
      ? (activeTopic[active.kind]?.[active.index] ?? "")
      : "";

  const activeAnswer = active ? activeList[active.index] : null;

  const activeSectionTitle =
    active?.kind === "important"
      ? "📘 Important Question"
      : "🧠 Scenario-Based Question";

  const isJavaScriptOrReact =
    active?.topicId === "javascript" || active?.topicId === "react";

  // Safely get the code string from the answer object.
  const codeValue = useMemo(() => {
    if (!activeAnswer) return "";

    const value = activeAnswer.code;

    if (typeof value === "string") return value;
    if (value === undefined || value === null) return "";

    return String(value);
  }, [activeAnswer]);

  const hasCode = codeValue.trim().length > 0;

  const move = useCallback((step) => {
    setActive((current) => {
      if (!current) return current;

      const list = interviewPrepAnswers[current.topicId]?.[current.kind] ?? [];

      if (list.length === 0) return current;

      return {
        ...current,
        index: (current.index + step + list.length) % list.length,
      };
    });
  }, []);

  // Popup keyboard controls and background scroll lock.
  useEffect(() => {
    if (!active) return undefined;

    const previousOverflow = document.body.style.overflow;

    const onKey = (event) => {
      if (event.key === "Escape") {
        closePopup();
      } else if (event.key === "ArrowRight") {
        move(1);
      } else if (event.key === "ArrowLeft") {
        move(-1);
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, closePopup, move]);

  const totalImportant = interviewPrepTopics.reduce(
    (total, topic) => total + (topic.important?.length ?? 0),
    0,
  );

  const totalScenarios = interviewPrepTopics.reduce(
    (total, topic) => total + (topic.scenarios?.length ?? 0),
    0,
  );

  const selectedTopic = interviewPrepTopics.find(
    (topic) => topic.id === selectedTopicId,
  );

  return (
    <div className="ip-page">
      {/* Popup and code visibility styles */}
      <style>{`
        .ip-popup-overlay {
          position: fixed !important;
          inset: 0 !important;
          z-index: 99999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 16px !important;
          background: rgba(15, 23, 42, .78) !important;
          backdrop-filter: blur(5px);
          overflow-y: auto !important;
        }

        .ip-popup {
          width: min(950px, 100%) !important;
          max-width: 950px !important;
          max-height: 94vh !important;
          display: flex !important;
          flex-direction: column !important;
          background: #ffffff !important;
          color: #172033 !important;
          border-radius: 16px !important;
          border-top: 5px solid #2563eb;
          box-shadow: 0 24px 70px rgba(0,0,0,.3) !important;
          overflow: hidden !important;
        }

        .ip-popup-header {
          flex-shrink: 0 !important;
          padding: 22px 26px !important;
          background: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
          display: flex !important;
          align-items: flex-start !important;
          justify-content: space-between !important;
          gap: 16px !important;
        }

        .ip-popup-topic {
          display: block !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          margin-bottom: 10px !important;
        }

        .ip-popup-q {
          color: #111827 !important;
          font-size: clamp(19px, 3vw, 25px) !important;
          line-height: 1.5 !important;
          font-weight: 800 !important;
          margin: 0 !important;
        }

        .ip-popup-close {
          flex-shrink: 0 !important;
          width: 38px !important;
          height: 38px !important;
          border-radius: 10px !important;
          border: 1px solid #cbd5e1 !important;
          background: #ffffff !important;
          color: #334155 !important;
          font-size: 20px !important;
          cursor: pointer !important;
        }

        .ip-popup-body {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          max-height: none !important;
          overflow-y: auto !important;
          padding: 24px 26px !important;
          background: #ffffff !important;
        }

        .ip-answer-section {
          margin-bottom: 22px !important;
          padding: 18px 20px !important;
          border-left: 5px solid #2563eb !important;
          border-radius: 8px !important;
          background: #f8fafc !important;
        }

        .ip-answer-label {
          display: block !important;
          font-size: 16px !important;
          font-weight: 800 !important;
          margin-bottom: 12px !important;
        }

        .ip-answer-section p {
          color: #172033 !important;
          font-size: 16px !important;
          line-height: 1.65 !important;
          font-weight: 600 !important;
          margin: 0 !important;
          overflow-wrap: anywhere !important;
        }

        .ip-answer-section-code {
          display: block !important;
          width: 100% !important;
          flex: 0 0 auto !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          padding: 0 !important;
          border: 1px solid #334155 !important;
          border-left: 5px solid #64748b !important;
          border-radius: 10px !important;
          overflow: hidden !important;
          background: #0b1220 !important;
        }

        .ip-answer-section-code > .ip-answer-label {
          padding: 16px 20px 12px !important;
          margin: 0 !important;
          color: #f8fafc !important;
          background: #172033 !important;
        }

        .ip-codebox {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          overflow: hidden !important;
          background: #0b1220 !important;
        }

        .ip-codebox-bar {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 10px 18px !important;
          background: #1e293b !important;
          border-bottom: 1px solid #334155 !important;
        }

        .ip-codebox-lang {
          color: #93c5fd !important;
          font-size: 14px !important;
          font-weight: 800 !important;
        }

        .ip-answer-code {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          min-height: 60px !important;
          max-height: 260px !important;
          margin: 0 !important;
          padding: 16px 20px !important;
          overflow: auto !important;
          background: #0b1220 !important;
          color: #f8fafc !important;
          font-family: Consolas, Monaco, "Courier New", monospace !important;
          font-size: 15px !important;
          line-height: 1.85 !important;
          tab-size: 4 !important;
          white-space: pre !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .ip-answer-code code {
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          color: #f8fafc !important;
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: inherit !important;
          white-space: pre !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .ip-tok-kw {
          color: #93c5fd !important;
          font-weight: 800 !important;
        }

        .ip-tok-str {
          color: #86efac !important;
        }

        .ip-tok-cm {
          color: #94a3b8 !important;
          font-style: italic !important;
        }

        .ip-tok-num {
          color: #fbbf24 !important;
        }

        .ip-code-missing {
          padding: 16px 20px !important;
          color: #fbbf24 !important;
          background: #172033 !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }

        .ip-popup-nav {
          flex-shrink: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 12px !important;
          padding: 16px 26px !important;
          background: #f8fafc !important;
          border-top: 1px solid #e2e8f0 !important;
        }

        .ip-popup-btn {
          min-width: 115px !important;
          padding: 11px 17px !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 9px !important;
          background: #ffffff !important;
          color: #1e293b !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          cursor: pointer !important;
        }

        .ip-popup-btn:hover:not(:disabled) {
          background: #2563eb !important;
          border-color: #2563eb !important;
          color: #ffffff !important;
        }

        .ip-popup-btn:disabled {
          opacity: .4 !important;
          cursor: not-allowed !important;
        }

        .ip-popup-pos {
          color: #475569 !important;
          font-size: 14px !important;
          font-weight: 800 !important;
        }

        .ip-question {
          cursor: pointer !important;
        }

        .ip-question:focus-visible {
          outline: 3px solid #2563eb !important;
          outline-offset: 3px !important;
        }

        @media (max-width: 600px) {
          .ip-popup-overlay {
            padding: 8px !important;
          }

          .ip-popup {
            max-height: 95vh !important;
            border-radius: 12px !important;
          }

          .ip-popup-header {
            padding: 16px !important;
          }

          .ip-popup-body {
            padding: 15px !important;
          }

          .ip-answer-section {
            padding: 14px !important;
            margin-bottom: 16px !important;
          }

          .ip-answer-section p {
            font-size: 17px !important;
            line-height: 1.8 !important;
          }

          .ip-answer-code {
            padding: 14px !important;
            font-size: 13px !important;
          }

          .ip-popup-nav {
            padding: 12px !important;
          }

          .ip-popup-btn {
            min-width: 90px !important;
            padding: 10px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      {/* Page header */}
      <header className="ip-page-header">
        <div className="ip-page-heading">
          <span className="ip-page-eyebrow">Interview preparation</span>

          <h1 className="ip-page-title">Java & Full-Stack Interview Topics</h1>

          <p className="ip-page-subtitle">
            Choose a topic to view its questions, then select a question to open
            its answer.
          </p>

          <div className="ip-page-stats">
            <span className="ip-stat">
              <b>{interviewPrepTopics.length}</b> topics
            </span>

            <span className="ip-stat ip-stat-key">
              <b>{totalImportant}</b> important questions
            </span>

            <span className="ip-stat ip-stat-alt">
              <b>{totalScenarios}</b> scenario questions
            </span>

            <span className="ip-stat ip-stat-ok">
              <b>{totalImportant + totalScenarios}</b> total questions
            </span>
          </div>
        </div>

        <Link className="ip-back-link" to="/maang">
          <span aria-hidden="true">←</span> Back to MAANG Preparation
        </Link>
      </header>

      {/* Topic navigation */}
      <nav className="ip-steps ip-steps-compact" aria-label="Interview topics">
        <span className="ip-steps-label">Choose a topic</span>

        {interviewPrepTopics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className={`ip-step-chip ${
              selectedTopicId === topic.id ? "ip-step-chip-active" : ""
            }`}
            style={{ "--step-color": topic.color }}
            aria-pressed={selectedTopicId === topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
          >
            <span className="ip-step-icon">{topic.icon}</span>
            <span className="ip-step-name">{topic.title}</span>
          </button>
        ))}
      </nav>

      {/* Selected topic */}
      <div className="ip-topics">
        {selectedTopic && (
          <section
            key={selectedTopic.id}
            id="ip-selected-topic"
            className="ip-topic"
            style={{ "--step-color": selectedTopic.color }}
          >
            <header className="ip-topic-header">
              <div className="ip-topic-heading">
                <span className="ip-topic-step">{selectedTopic.step}</span>
                <span className="ip-topic-icon">{selectedTopic.icon}</span>

                <div>
                  <h2 className="ip-topic-title">{selectedTopic.title}</h2>

                  <p className="ip-topic-count">
                    <span className="ip-count-chip ip-count-chip-key">
                      {selectedTopic.important.length} important
                    </span>

                    <span className="ip-count-chip ip-count-chip-alt">
                      {selectedTopic.scenarios.length} scenario-based
                    </span>
                  </p>
                </div>
              </div>
            </header>

            {/* Important questions */}
            <h3 className="ip-block-title">
              <span aria-hidden="true">📘</span>
              Important Questions
              <span className="ip-block-count ip-block-count-key">
                {selectedTopic.important.length} questions
              </span>
            </h3>

            <ol className="ip-grid ip-grid-important">
              {selectedTopic.important.map((question, index) => (
                <li
                  className="ip-question"
                  key={index}
                  role="button"
                  tabIndex={0}
                  title="Click to see the answer"
                  onClick={() =>
                    openPopup(selectedTopic.id, "important", index)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openPopup(selectedTopic.id, "important", index);
                    }
                  }}
                >
                  <span className="ip-qnum">{index + 1}</span>
                  <span className="ip-qtext">{question}</span>
                  <span className="ip-qhint">👁 view answer ›</span>
                </li>
              ))}
            </ol>

            {/* Scenario questions */}
            <h3 className="ip-block-title ip-block-title-scenario">
              <span aria-hidden="true">🧠</span>
              Scenario-Based Questions
              <span className="ip-block-count ip-block-count-alt">
                {selectedTopic.scenarios.length} questions
              </span>
            </h3>

            <ol className="ip-grid ip-grid-scenario">
              {selectedTopic.scenarios.map((question, index) => (
                <li
                  className="ip-question ip-question-scenario"
                  key={index}
                  role="button"
                  tabIndex={0}
                  title="Click to see the answer"
                  onClick={() =>
                    openPopup(selectedTopic.id, "scenarios", index)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openPopup(selectedTopic.id, "scenarios", index);
                    }
                  }}
                >
                  <span className="ip-qnum">{index + 1}</span>
                  <span className="ip-qtext">{question}</span>
                  <span className="ip-qhint">👁 view answer ›</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {/* Answer popup */}
      {active && activeTopic && (
        <div
          className="ip-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Interview answer"
          onClick={closePopup}
        >
          <div
            className="ip-popup"
            onClick={(event) => event.stopPropagation()}
            style={{ borderTopColor: activeTopic.color }}
          >
            {/* Popup header */}
            <header className="ip-popup-header">
              <div className="ip-popup-heading">
                <span
                  className="ip-popup-topic"
                  style={{ color: activeTopic.color }}
                >
                  {activeTopic.icon} {activeTopic.title}
                  {" · "}
                  {activeSectionTitle}
                </span>

                <h3 className="ip-popup-q">{activeQuestion}</h3>
              </div>

              <button
                type="button"
                className="ip-popup-close"
                aria-label="Close"
                onClick={closePopup}
              >
                ✕
              </button>
            </header>

            {/* Popup answer body */}
            <div className="ip-popup-body">
              {activeAnswer ? (
                <>
                  {/* Interview Answer and Real-time Example */}
                  {ANSWER_SECTIONS.map(([key, label, color]) => {
                    const value = activeAnswer[key];

                    // Always show the example section for JavaScript and React.
                    if (!value && !(key === "example" && isJavaScriptOrReact)) {
                      return null;
                    }

                    return (
                      <div
                        className="ip-answer-section"
                        key={key}
                        style={{ borderLeftColor: color }}
                      >
                        <span className="ip-answer-label" style={{ color }}>
                          {label}
                        </span>

                        {value ? (
                          <p className="ip-answer-preserve-lines">
                            {renderLines(value)}
                          </p>
                        ) : (
                          <p>
                            Real-time example is missing in
                            interviewPrepAnswers.js. Add an "example" field to
                            this answer object.
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div className="ip-answer-section ip-answer-section-code">
                    <span className="ip-answer-label">
                      💻 {hasCode ? "Code / Example" : "Code Example"}
                    </span>

                    {hasCode ? (
                      <div className="ip-codebox">
                        <div className="ip-codebox-bar">
                          <span className="ip-codebox-lang">
                            {CODE_LANG[active.topicId] || "Code"}
                          </span>
                          <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                            Code example
                          </span>
                        </div>

                        <pre className="ip-answer-code">
                          <code>
                            {highlightCode(codeValue.replace(/\\n/g, "\n"))}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <div className="ip-code-missing">
                        No code example is available for this question yet. Add
                        a "code" field to this answer in interviewPrepAnswers.js.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="ip-answer-section">
                  <span className="ip-answer-label">🎤 Interview Answer</span>
                  <p>An answer for this question is not available yet.</p>
                </div>
              )}
            </div>

            {/* Previous / Next navigation */}
            <div className="ip-popup-nav">
              <button
                type="button"
                className="ip-popup-btn"
                onClick={() => move(-1)}
                disabled={activeList.length === 0}
              >
                ← Previous
              </button>

              <span className="ip-popup-pos">
                {active.index + 1} / {activeList.length}
              </span>

              <button
                type="button"
                className="ip-popup-btn"
                onClick={() => move(1)}
                disabled={activeList.length === 0}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewPrep;
