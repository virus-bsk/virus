import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hljs from "../../utils/hljs";
import { scrollActiveQuestionIntoView } from "../../utils/scrollQuestion";
import "highlight.js/styles/atom-one-dark.css";
import "../java/JavaInterview.css";
import { sqlInterviewQuestions } from "../../data/sql/sqlInterviewQuestions";

const highlightCode = (code, language) => {
  try {
    if (!language) language = "sql";
    const highlighted = hljs.highlight(code, {
      language,
      ignoreIllegals: true,
    }).value;
    return highlighted;
  } catch (err) {
    console.warn(`Highlight.js error for language '${language}':`, err);
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }
};

const parseQuestions = (content) => {
  const categories = [];
  const lines = content.split("\n");
  let currentCategory = null;
  let currentQuestion = null;
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeBlockLanguage = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = trimmedLine.replace(/```/g, "").trim() || "sql";
        codeBlockContent = [];
      } else {
        inCodeBlock = false;
        if (currentQuestion && codeBlockContent.length > 0) {
          const codeLines = codeBlockContent.join("\n").split("\n");
          const minIndent = Math.min(
            ...codeLines
              .filter((l) => l.trim())
              .map((l) => l.match(/^\s*/)[0].length),
          );
          const trimmedContent = codeLines
            .map((l) => l.slice(minIndent))
            .join("\n")
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

    const categoryMatch = line.match(/^#{2,3}\s+(.+)/);
    if (categoryMatch) {
      currentCategory = { name: categoryMatch[1], questions: [] };
      categories.push(currentCategory);
      currentQuestion = null;
      continue;
    }

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
        currentQuestion.response.push({ type: "text", content: responseText });
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
        currentQuestion.response.push({ type: "note", content: responseText });
      }
    } else if (
      currentQuestion &&
      /^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmedLine)
    ) {
      // Ignore Markdown horizontal rules such as --- separators.
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
        currentQuestion.response.push({ type: "text", content: formattedText });
      }
    }
  }

  return categories;
};

const interviewCategories = parseQuestions(sqlInterviewQuestions);
const totalQuestions = interviewCategories.reduce(
  (sum, cat) => sum + cat.questions.length,
  0,
);

function SQLInterview() {
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
    <div className="interview-page">
      <section className="interview-header">
        <div className="interview-header-content">
          <Link to="/sql" className="back-button">
            ← Back to SQL & Databases
          </Link>
          <h1 className="interview-title">SQL Interview Questions</h1>
          <p className="interview-subtitle">
            Master SQL interview questions with detailed answers and code
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
                              {q.response.map((block, index) => {
                                if (block.type === "code") {
                                  return (
                                    <div key={index} className="code-block">
                                      <div className="code-header">
                                        <span className="code-language">
                                          {block.language || "sql"}
                                        </span>
                                      </div>
                                      <pre>
                                        <code
                                          dangerouslySetInnerHTML={{
                                            __html: highlightCode(
                                              block.content,
                                              block.language,
                                            ),
                                          }}
                                        />
                                      </pre>
                                    </div>
                                  );
                                }
                                if (block.type === "example") {
                                  return (
                                    <div key={index} className="answer-example">
                                      <strong>Example:</strong> {block.content}
                                    </div>
                                  );
                                }
                                if (block.type === "note") {
                                  return (
                                    <div key={index} className="answer-note">
                                      <strong>Note:</strong> {block.content}
                                    </div>
                                  );
                                }
                                return (
                                  <p key={index} className="answer-text">
                                    {block.content}
                                  </p>
                                );
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

export default SQLInterview;
