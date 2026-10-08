import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { llmCourseVideos } from "../../data/llm/llmCourseVideos";
import { llmCourseContent } from "../../data/llm/llmCourseContent";
import "./LLMCourse.css";

function LLMCourse({
  embedded = false,
  lessons = llmCourseVideos,
  contentMap = llmCourseContent,
  subtitle = `${llmCourseVideos.length} lessons covering Transformers, attention, KV Cache, MoE, reasoning models, ChatGPT/Claude/Copilot/Cursor, and no-code AI tools (Bolt, Lovable, v0, n8n). Click any lesson to read the full written explanation — concepts, examples and key takeaways.`,
}) {
  const [activeLesson, setActiveLesson] = useState(null);

  // Build category list preserving the order of appearance
  const categories = useMemo(() => {
    const cats = [];
    for (const v of lessons) {
      if (!cats.includes(v.category)) cats.push(v.category);
    }
    return cats;
  }, [lessons]);

  const openLesson = (lesson) => setActiveLesson(lesson);
  const closeLesson = () => setActiveLesson(null);

  // Close the lesson reader on Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setActiveLesson(null);
  }, []);

  useEffect(() => {
    if (!activeLesson) return undefined;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeLesson, handleKeyDown]);

  return (
    <div className={`llm-course-page${embedded ? " llm-course-embedded" : ""}`}>
      {/* Hero is supplied by the parent module when embedded. */}
      {!embedded && <section className="course-hero">
        <Link to="/maang" className="back-button">
          ← Back to MAANG Preparation
        </Link>
        <h1 className="course-title">LLM Fundamentals</h1>
        <p className="course-subtitle">{subtitle}</p>
      </section>}

      {/* Lessons grouped by category */}
      <section className="lessons-section">
        {categories.map((cat) => {
          const lessonsForCat = lessons
            .map((video, idx) => ({ video, idx }))
            .filter(({ video }) => video.category === cat);

          return (
            <div key={cat} className="lesson-category">
              <h2 className="lesson-category-title">
                {cat}
                <span className="lesson-category-count">
                  {lessonsForCat.length} lesson
                  {lessonsForCat.length > 1 ? "s" : ""}
                </span>
              </h2>
              <div className="lessons-grid">
                {lessonsForCat.map(({ video, idx }) => (
                  <button
                    key={idx}
                    type="button"
                    className="lesson-card"
                    onClick={() => openLesson(video)}
                  >
                    <div className="lesson-card-top">
                      <span className="lesson-category-badge">{cat.split(" ")[0]}</span>
                      <span
                        className="lesson-read-btn"
                        aria-hidden="true"
                        title="Read lesson"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="lesson-title">{video.title}</h3>
                    <p className="lesson-desc">{video.description}</p>
                    <span className="lesson-open-label">Read lesson →</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ===== Written lesson reader modal ===== */}
      {activeLesson && (
        <div
          className="llm-reader-overlay"
          onClick={closeLesson}
          role="dialog"
          aria-modal="true"
          aria-label={activeLesson.title}
        >
          <div className="llm-reader" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="llm-reader-close"
              onClick={closeLesson}
              aria-label="Close lesson"
            >
              ✕
            </button>

            <div className="llm-reader-header">
              <span className="llm-reader-category">
                {activeLesson.category}
              </span>
              <h2 className="llm-reader-title">{activeLesson.title}</h2>
            </div>

            <div className="llm-reader-body">
              {(() => {
                const content = contentMap[activeLesson.title];
                if (!content) {
                  return (
                    <p className="llm-reader-intro">{activeLesson.description}</p>
                  );
                }
                return (
                  <>
                    <p className="llm-reader-intro">{content.intro}</p>

                    {content.sections.map((section, i) => (
                      <section
                        key={section.heading}
                        className="llm-reader-section"
                      >
                        <div className="llm-reader-section-head">
                          <span className="llm-reader-section-num">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="llm-reader-section-title">
                            {section.heading}
                          </h3>
                        </div>
                        {section.body && (
                          <p className="llm-reader-section-body">
                            {section.body}
                          </p>
                        )}
                        {section.bullets && (
                          <ul className="llm-reader-list">
                            {section.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </section>
                    ))}

                    {content.takeaways?.length > 0 && (
                      <section className="llm-reader-takeaways">
                        <h3 className="llm-reader-takeaways-title">
                          🎯 Key Takeaways
                        </h3>
                        <ul className="llm-reader-list">
                          {content.takeaways.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LLMCourse;
