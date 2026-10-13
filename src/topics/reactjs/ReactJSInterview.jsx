import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hljs from "../../utils/hljs";
import { scrollActiveQuestionIntoView } from "../../utils/scrollQuestion";
import "highlight.js/styles/atom-one-dark.css";
import "./ReactJSInterview.css";
import { reactjsInterviewPart1 } from "../../data/reactjs/reactjsInterviewPart1";
import { reactjsInterviewPart2 } from "../../data/reactjs/reactjsInterviewPart2";

// Split into two files to keep each file small and manageable.
// Part 1 = Questions 1-50, Part 2 = Questions 51-100.
const interviewData = reactjsInterviewPart1 + reactjsInterviewPart2;

// Newline constant (avoids escape-sequence issues in source)
const NL = String.fromCharCode(10);

// Syntax highlight code using Highlight.js
// Note: highlight.js has no separate "jsx" grammar — JSX is handled by
// its javascript language, so map jsx/bash/etc. to supported languages.
const highlightCode = (code, language) => {
  try {
    let lang = language || "jsx";
    // Map unsupported aliases to languages highlight.js knows.
    if (lang === "jsx" || lang === "tsx") lang = "javascript";
    if (lang === "bash" || lang === "shell") lang = "bash";
    const highlighted = hljs.highlight(code, {
      language: lang,
      ignoreIllegals: true,
    }).value;
    return highlighted;
  } catch (err) {
    console.warn(`Highlight.js error for language '${language}':`, err);
    // Fallback: return HTML-escaped plain text
    const AMP = String.fromCharCode(38);
    const LT = String.fromCharCode(60);
    const GT = String.fromCharCode(62);
    const QUOT = String.fromCharCode(34);
    const APOS = String.fromCharCode(39);
    return code
      .split(AMP)
      .join(`${AMP}amp;`)
      .split(LT)
      .join(`${AMP}lt;`)
      .split(GT)
      .join(`${AMP}gt;`)
      .split(QUOT)
      .join(`${AMP}quot;`)
      .split(APOS)
      .join(`${AMP}#x27;`);
  }
};

// Parse questions from markdown with categories
const parseQuestions = (content) => {
  const categories = [];
  const lines = content.split(NL);
  let currentCategory = null;
  let currentQuestion = null;
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeBlockLanguage = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect code blocks
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = trimmedLine.replace(/```/g, "").trim() || "jsx";
        codeBlockContent = [];
      } else {
        inCodeBlock = false;
        if (currentQuestion && codeBlockContent.length > 0) {
          // Remove common leading whitespace from all lines
          const blockLines = codeBlockContent.join(NL).split(NL);
          const minIndent = Math.min(
            ...blockLines
              .filter((l) => l.trim())
              .map((l) => l.match(/^\s*/)[0].length),
          );
          const trimmedContent = blockLines
            .map((l) => l.slice(minIndent))
            .join(NL)
            .trim();
          currentQuestion.response.push({
            type: "code",
            content: trimmedContent,
            language: codeBlockLanguage,
          });
        }
        codeBlockContent = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Detect category (### Category Name)
    const categoryMatch = line.match(/^###\s+(.+)/);
    if (categoryMatch) {
      currentCategory = {
        name: categoryMatch[1],
        questions: [],
      };
      categories.push(currentCategory);
      currentQuestion = null;
      continue;
    }

    // Detect question
    const questionMatch = line.match(/^(\d+)\.\s*\*\*(.+?)\*\*/);
    if (questionMatch) {
      currentQuestion = {
        id: questionMatch[1],
        question: questionMatch[2],
        response: [],
      };
      if (currentCategory) {
        currentCategory.questions.push(currentQuestion);
      }
    } else if (currentQuestion && line.trim().startsWith("- **Answer**:")) {
      const responseText = line.replace("- **Answer**:", "").trim();
      if (responseText) {
        currentQuestion.response.push({
          type: "text",
          content: responseText,
        });
      }
    } else if (currentQuestion && line.trim().startsWith("- **Example**:")) {
      const responseText = line.replace("- **Example**:", "").trim();
      if (responseText) {
        currentQuestion.response.push({
          type: "example",
          content: responseText,
        });
      }
    } else if (currentQuestion && line.trim().startsWith("- **Note**:")) {
      const responseText = line.replace("- **Note**:", "").trim();
      if (responseText) {
        currentQuestion.response.push({
          type: "note",
          content: responseText,
        });
      }
    } else if (currentQuestion && line.trim() && !line.trim().startsWith("#")) {
      const cleanLine = line.trim();
      if (
        cleanLine &&
        cleanLine.length > 1 &&
        !cleanLine.match(/^[-*]\s*$/) &&
        !cleanLine.match(/^[a-zA-Z]$/) &&
        !cleanLine.match(/^[0-9]$/)
      ) {
        const formattedText = cleanLine
          .replace(/^\s*[-*]\s+/, "")
          .replace(/\*\*(.+?)\*\*/g, "$1")
          .replace(/`([^`]+)`/g, "$1");

        currentQuestion.response.push({
          type: "text",
          content: formattedText,
        });
      }
    }
  }

  return categories;
};

const interviewCategories = parseQuestions(interviewData);
const totalQuestions = interviewCategories.reduce(
  (sum, cat) => sum + cat.questions.length,
  0,
);

function ReactJSInterview() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // When a question expands, bring its header to the top of the viewport so
  // the answer always starts in view instead of staying scrolled mid-page.
  useEffect(() => {
    if (expandedId === null) return;
    scrollActiveQuestionIntoView(".question-item-vertical", ".question-item-header");
  }, [expandedId]);

  return (
    <div className="react-interview-page">
      {/* Hero Section */}
      <section className="interview-header">
        <div className="interview-header-content">
          <Link to="/reactjs" className="back-button">
            ← Back to ReactJS
          </Link>
          <h1 className="interview-title">ReactJS Interview Questions</h1>
          <p className="interview-subtitle">
            Master ReactJS interview questions with detailed answers and code
            examples
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

      {/* Questions List */}
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
                                          {item.language || "jsx"}
                                        </span>
                                      </div>
                                      <pre
                                        className={`language-${item.language === "tsx" ? "javascript" : item.language || "javascript"}`}
                                      >
                                        <code
                                          className={`language-${item.language === "tsx" ? "javascript" : item.language || "javascript"}`}
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
                                    <p key={idx} className="answer-text">
                                      📘 {item.content}
                                    </p>
                                  );
                                } else if (item.type === "note") {
                                  return (
                                    <p key={idx} className="answer-text">
                                      💡 {item.content}
                                    </p>
                                  );
                                } else {
                                  return (
                                    <p key={idx} className="answer-text">
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

export default ReactJSInterview;
