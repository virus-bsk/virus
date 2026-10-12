import { useState } from "react";
import { Link } from "react-router-dom";
import hljs from "../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "../spring-boot/SpringBootInterview.css";
import "./ReactiveProgrammingInterview.css";
import { reactiveProgrammingQuestions } from "../../data/reactive-programming/reactiveProgramming";

// Escape HTML special characters using the DOM (avoids literal HTML entities
// in source that auto-formatters may corrupt).
const escapeHtml = (text) => {
  const el = document.createElement("textarea");
  el.textContent = text;
  return el.innerHTML;
};

// Syntax highlight code using Highlight.js
const highlightCode = (code, language) => {
  try {
    if (!language) language = "java";
    const highlighted = hljs.highlight(code, {
      language,
      ignoreIllegals: true,
    }).value;
    return highlighted;
  } catch (err) {
    console.warn(`Highlight.js error for language '${language}':`, err);
    return escapeHtml(code);
  }
};

// Convert structured question object to the response format expected by the UI
const buildResponse = (q) => {
  const response = [];
  if (q.answer) {
    response.push({ type: "text", content: q.answer });
  }
  if (q.example) {
    response.push({ type: "code", content: q.example, language: "java" });
  }
  if (q.note) {
    response.push({ type: "note", content: q.note });
  }
  return response;
};

// Group questions by topic into categories (mirrors the markdown parser output)
const topicMap = new Map();
reactiveProgrammingQuestions.forEach((q) => {
  if (!topicMap.has(q.topic)) {
    topicMap.set(q.topic, []);
  }
  topicMap.get(q.topic).push({
    id: String(q.id),
    question: q.question,
    response: buildResponse(q),
  });
});

const interviewCategories = Array.from(topicMap, ([name, questions]) => ({
  name,
  questions,
}));

const totalQuestions = reactiveProgrammingQuestions.length;

function ReactiveProgrammingInterview() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="spring-boot-interview-page reactive-interview-page">
      {/* Hero Section */}
      <section className="interview-header">
        <div className="interview-header-content">
          <Link to="/reactive-programming" className="back-button">
            ← Back to Reactive Programming
          </Link>
          <h1 className="interview-title">
            Reactive Programming Interview Questions
          </h1>
          <p className="interview-subtitle">
            Master Reactive Programming interview questions with detailed
            answers and code examples
          </p>
          <div className="interview-stats">
            <div className="interview-stat">
              <span className="stat-number">{totalQuestions}+</span>
              <span className="stat-label">Questions</span>
            </div>
            <div className="interview-stat">
              <span className="stat-number">{interviewCategories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="interview-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="questions-section">
        <div className="questions-container">
          <div className="questions-list">
            {interviewCategories.map((category, catIndex) => (
              <div key={catIndex} className="category-section">
                <h2 className="category-title">{category.name}</h2>
                <div className="questions-vertical">
                  {category.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`question-item-vertical ${expandedId === q.id ? "active" : ""}`}
                    >
                      <div
                        className="question-item-header"
                        onClick={() => toggleQuestion(q.id)}
                      >
                        <span className="q-number">Q{q.id}</span>
                        <p className="q-text">{q.question}</p>
                        <span
                          className={`expand-arrow ${expandedId === q.id ? "expanded" : ""}`}
                        >
                          ▼
                        </span>
                      </div>
                      {expandedId === q.id && (
                        <div className="question-item-content">
                          <div className="question-card">
                            <div className="question-answer">
                              <h3 className="answer-title">Answer:</h3>
                              {q.response.map((item, idx) => {
                                if (item.type === "code") {
                                  return (
                                    <div key={idx} className="code-block">
                                      <div className="code-header">
                                        <span className="code-language">
                                          {item.language || "java"}
                                        </span>
                                      </div>
                                      <pre
                                        className={`language-${item.language || "java"}`}
                                      >
                                        <code
                                          className={`language-${item.language || "java"}`}
                                          dangerouslySetInnerHTML={{
                                            __html: highlightCode(
                                              item.content,
                                              item.language,
                                            ),
                                          }}
                                        />
                                      </pre>
                                    </div>
                                  );
                                } else if (item.type === "example") {
                                  return (
                                    <p
                                      key={idx}
                                      className={`answer-text answer-${item.type}`}
                                      style={{ whiteSpace: "pre-wrap" }}
                                    >
                                      📘 {item.content}
                                    </p>
                                  );
                                } else if (item.type === "note") {
                                  return (
                                    <p
                                      key={idx}
                                      className={`answer-text answer-${item.type}`}
                                      style={{ whiteSpace: "pre-wrap" }}
                                    >
                                      💡 {item.content}
                                    </p>
                                  );
                                } else {
                                  return (
                                    <p
                                      key={idx}
                                      className={`answer-text answer-${item.type}`}
                                      style={{ whiteSpace: "pre-wrap" }}
                                    >
                                      {item.content}
                                    </p>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReactiveProgrammingInterview;
