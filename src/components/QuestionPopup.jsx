import { useEffect, useRef } from "react";
import "./QuestionPopup.css";

/**
 * QuestionPopup — shared MAANG-style answer popup for the topic interview
 * pages (Java, JavaScript, Spring Boot, SQL, ReactJS, Kafka,
 * Microservices, Reactive Programming).
 *
 * Same look as the MAANG interview-prep popup (overlay, white panel with
 * accent top border, fixed header with eyebrow + question, scrollable
 * answer body, fixed bottom nav with Previous / Next) plus ‹ › side-move
 * arrows flanking the panel on wide screens.
 *
 * The answer always starts from the top: the body scrolls back to top on
 * every question change, and background page scroll is locked while open.
 *
 * Props:
 * - eyebrow: small label shown above the question (e.g. "Java Interview")
 * - accent: color for the top border + eyebrow (per-topic brand color)
 * - questions: flattened array of { key, id, question, category, response }
 * - index: active question index (null/undefined = closed)
 * - onClose: close the popup
 * - onMove: (step) => void — move to prev/next question (wrap-around)
 * - renderAnswer: (question) => ReactNode — page-specific answer markup
 *   (reuses each page's own answer-block styling)
 */
function QuestionPopup({
  eyebrow,
  accent = "#e94560",
  questions,
  index,
  onClose,
  onMove,
  renderAnswer,
}) {
  const bodyRef = useRef(null);
  const total = questions.length;
  const question =
    index !== null && index !== undefined ? questions[index] : null;

  // Esc closes, arrow keys move between questions; lock background scroll.
  // Handlers are read through refs so pages can pass plain callbacks
  // without re-subscribing the listener on every render.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const moveRef = useRef(onMove);
  moveRef.current = onMove;
  useEffect(() => {
    if (!question) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current();
      else if (e.key === "ArrowRight") moveRef.current(1);
      else if (e.key === "ArrowLeft") moveRef.current(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [question]);

  // Every newly opened question starts from the top of the popup body.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [index]);

  if (!question) return null;

  return (
    <div
      className="qp-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Answer"
      onClick={onClose}
    >
      <button
        type="button"
        className="qp-side-arrow qp-side-prev"
        aria-label="Previous question"
        onClick={(e) => {
          e.stopPropagation();
          onMove(-1);
        }}
      >
        ‹
      </button>
      <div
        className="qp-popup"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTopColor: accent }}
      >
        <header className="qp-header">
          <div className="qp-heading">
            <span className="qp-eyebrow" style={{ color: accent }}>
              {eyebrow}
              {question.category ? ` · ${question.category}` : ""}
            </span>
            <h3 className="qp-q">
              <span className="qp-qnum">Q{question.id}</span> {question.question}
            </h3>
          </div>
          <button
            type="button"
            className="qp-close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="qp-body" ref={bodyRef}>
          {renderAnswer(question)}
        </div>

        <div className="qp-nav">
          <button
            type="button"
            className="qp-btn"
            onClick={() => onMove(-1)}
            disabled={total === 0}
          >
            ← Previous
          </button>
          <span className="qp-pos">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            className="qp-btn"
            onClick={() => onMove(1)}
            disabled={total === 0}
          >
            Next →
          </button>
        </div>
      </div>
      <button
        type="button"
        className="qp-side-arrow qp-side-next"
        aria-label="Next question"
        onClick={(e) => {
          e.stopPropagation();
          onMove(1);
        }}
      >
        ›
      </button>
    </div>
  );
}

export default QuestionPopup;
