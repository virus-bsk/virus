import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { interviewPrepTopics } from "../data/interviewPrepData";
import { interviewPrepAnswers } from "../data/interviewPrepAnswers";
import "./InterviewPrep.css";

/** Section labels shown in the answer popup (short human-friendly format). */
const ANSWER_SECTIONS = [
  ["description", "📖 Description", "#2563eb"],
  ["example", "🌍 Real-time Example", "#16a34a"],
];

/** Badge label for the code header, per topic. */
const CODE_LANG = {
  sql: "SQL",
  java: "Java",
  "spring-boot": "Java",
  microservices: "Java",
  kafka: "Java",
  reactive: "Java",
};

/** Keywords colored inside popup code blocks (SQL + Java + a bit of shell). */
const CODE_KEYWORDS = new Set(
  (
    "select from where group by having order limit offset join inner left right full outer on as with union all " +
    "insert into values update set delete create table index primary key foreign references unique not null distinct " +
    "explain analyze alter add constraint cascade begin commit rollback recursive rows unbounded preceding partition rank " +
    "row_number dense_rank lag sum count max min avg over between like exists case when then else end and or is " +
    "class public private protected static final void new return if else for while do int boolean string extends " +
    "implements interface import try catch finally throw throws synchronized volatile abstract default this super record " +
    "var let const function async await true false null undefined newtypeof"
  ).split(" "),
);

/**
 * Tiny syntax highlighter for popup code blocks — colors comments,
 * strings, keywords and numbers. No dependency, pure React spans.
 */
function highlightCode(code) {
  const parts = code.split(/(\/\/[^\n]*|--[^\n]*|#[^\n]*|"[^"\n]*"|'[^'\n]*')/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (
      part.startsWith("//") ||
      part.startsWith("--") ||
      (part.startsWith("#") && !/['"]/.test(part))
    ) {
      return (
        <span className="ip-tok-cm" key={i}>
          {part}
        </span>
      );
    }
    if (part.startsWith('"') || part.startsWith("'")) {
      return (
        <span className="ip-tok-str" key={i}>
          {part}
        </span>
      );
    }
    return part.split(/(\b\w+\b)/g).map((w, j) => {
      if (!w) return null;
      if (CODE_KEYWORDS.has(w.toLowerCase())) {
        return (
          <span className="ip-tok-kw" key={`${i}-${j}`}>
            {w}
          </span>
        );
      } else if (/^\d+$/.test(w)) {
        return (
          <span className="ip-tok-num" key={`${i}-${j}`}>
            {w}
          </span>
        );
      }
      return w;
    });
  });
}

/**
 * InterviewPrep — one-page, step-by-step interview preparation hub.
 *
 * Route: /maang/interview-prep
 *
 * Walks through every backend topic in order (Step 1 → Step 6):
 * Java, SQL, Spring Boot, Microservices, Kafka, Reactive Programming.
 * Each topic shows 20 important concept questions + 10 scenario-based
 * questions, laid out as simple grids. A sticky step bar at the top
 * lets you jump between steps.
 *
 * Clicking any question opens a white popup with a clear,
 * interview-oriented answer structured as:
 * Description → Real-time Example → Code (code only when it helps).
 */
function InterviewPrep() {
  // popup state: { topicId, kind: "important" | "scenarios", index } | null
  const [active, setActive] = useState(null);

  const openPopup = (topicId, kind, index) => setActive({ topicId, kind, index });
  const closePopup = useCallback(() => setActive(null), []);

  const activeTopic = active ? interviewPrepTopics.find((t) => t.id === active.topicId) : null;
  const activeList = active ? interviewPrepAnswers[active.topicId]?.[active.kind] ?? [] : [];
  const activeQuestion = activeTopic && active ? activeTopic[active.kind][active.index] : "";
  const activeAnswer = active ? activeList[active.index] : null;
  const activeSectionTitle =
    active?.kind === "important" ? "📘 Important Question" : "🧠 Scenario-Based Question";

  // Prev / next inside the current topic list (1..n with wrap-around).
  const move = (step) =>
    setActive((cur) =>
      cur ? { ...cur, index: (cur.index + step + activeList.length) % activeList.length } : cur
    );

  // Esc closes popup; arrow keys navigate.
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closePopup();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // lock background scroll
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, activeList.length, closePopup]);
  return (
    <div className="ip-page">
      <header className="ip-page-header">
        <div className="ip-page-heading">
          <span className="ip-page-eyebrow">Interview preparation</span>
          <h1 className="ip-page-title">Java Backend Interview Topics</h1>
          <p className="ip-page-subtitle">Click any question to open a clear, interview-ready answer.</p>
        </div>
        <Link className="ip-back-link" to="/maang">
          <span aria-hidden="true">←</span> Back to MAANG Preparation
        </Link>
      </header>

      {/* Compact topic navigation: the questions are the main content. */}
      <nav className="ip-steps ip-steps-compact" aria-label="Interview topics">
        <span className="ip-steps-label">Jump to topic</span>
        {interviewPrepTopics.map((t) => (
          <a key={t.id} href={`#ip-${t.id}`} className="ip-step-chip" style={{ "--step-color": t.color }}>
            <span className="ip-step-icon">{t.icon}</span>
            <span className="ip-step-name">{t.title}</span>
          </a>
        ))}
      </nav>


      {/* Topics — one section per step */}
      <div className="ip-topics">
        {interviewPrepTopics.map((topic, index) => (
          <section
            key={topic.id}
            id={`ip-${topic.id}`}
            className="ip-topic"
            style={{ "--step-color": topic.color }}
          >
            <header className="ip-topic-header">
              <div className="ip-topic-heading">
                <span className="ip-topic-step">{topic.step}</span>
                <span className="ip-topic-icon">{topic.icon}</span>
                <div>
                  <h2 className="ip-topic-title">{topic.title}</h2>
                  <p className="ip-topic-count">
                    {topic.important.length} important · {topic.scenarios.length} scenario-based
                  </p>
                </div>
              </div>
            </header>

            {/* 20 important concept questions */}
            <h3 className="ip-block-title">📘 20 Important Questions (concept-wise)</h3>
            <ol className="ip-grid ip-grid-important">
              {topic.important.map((q, i) => (
                <li
                  className="ip-question"
                  key={i}
                  role="button"
                  tabIndex={0}
                  title="Click to see the answer"
                  onClick={() => openPopup(topic.id, "important", i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openPopup(topic.id, "important", i);
                    }
                  }}
                >
                  <span className="ip-qnum">{i + 1}</span>
                  <span className="ip-qtext">{q}</span>
                  <span className="ip-qhint">👁 view answer</span>
                </li>
              ))}
            </ol>

            {/* 10 scenario-based questions */}
            <h3 className="ip-block-title ip-block-title-scenario">
              🧠 10 Scenario-Based Questions (real-time)
            </h3>
            <ol className="ip-grid ip-grid-scenario">
              {topic.scenarios.map((q, i) => (
                <li
                  className="ip-question ip-question-scenario"
                  key={i}
                  role="button"
                  tabIndex={0}
                  title="Click to see the answer"
                  onClick={() => openPopup(topic.id, "scenarios", i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openPopup(topic.id, "scenarios", i);
                    }
                  }}
                >
                  <span className="ip-qnum">{i + 1}</span>
                  <span className="ip-qtext">{q}</span>
                  <span className="ip-qhint">👁 view answer</span>
                </li>
              ))}
            </ol>

            {index < interviewPrepTopics.length - 1 && (
              <div className="ip-topic-divider" aria-hidden="true">
                ▼
              </div>
            )}
          </section>
        ))}
      </div>



      {/* Answer popup — white background */}
      {active && activeTopic && (
        <div
          className="ip-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Answer"
          onClick={closePopup}
        >
          <div
            className="ip-popup"
            onClick={(e) => e.stopPropagation()}
            style={{ borderTopColor: activeTopic.color }}
          >
            <header className="ip-popup-header">
              <div className="ip-popup-heading">
                <span className="ip-popup-topic" style={{ color: activeTopic.color }}>
                  {activeTopic.icon} {activeTopic.title} · {activeSectionTitle}
                </span>
                <h3 className="ip-popup-q">{activeQuestion}</h3>
              </div>
              <button className="ip-popup-close" aria-label="Close" onClick={closePopup}>
                ✕
              </button>
            </header>

            <div className="ip-popup-body">
              {activeAnswer ? (
                <>
                  {ANSWER_SECTIONS.map(([key, label, color]) =>
                    activeAnswer[key] ? (
                      <div
                        className="ip-answer-section"
                        key={key}
                        style={{ borderLeftColor: color }}
                      >
                        <span className="ip-answer-label" style={{ color }}>
                          {label}
                        </span>
                        <p>{activeAnswer[key]}</p>
                      </div>
                    ) : null
                  )}
                  {activeAnswer.code && (
                    <div className="ip-answer-section ip-answer-section-code">
                      <span className="ip-answer-label">💻 Code / Query</span>
                      <div className="ip-codebox">
                        <div className="ip-codebox-bar">
                          <span className="ip-codebox-lang">
                            {CODE_LANG[active.topicId] || "Code"}
                          </span>
                        </div>
                        <pre className="ip-answer-code">
                          <code>{highlightCode(activeAnswer.code)}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="ip-answer-section">
                  <span className="ip-answer-label">📖 Description</span>
                  <p>
                    Answer for this question is being written. The format is simple:
                    Description → Real-time Example → Code.
                  </p>
                </div>
              )}
            </div>

            <div className="ip-popup-nav">
              <button
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
