import { useState } from "react";
import { Link } from "react-router-dom";
import hljs from "../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import "../spring-boot/SpringBootInterview.css";
import { kafkaInterviewQuestions } from "../../data/kafka/kafkaInterviewQuestions";

const highlightCode = (code, language) => {
  try {
    if (!language) language = "bash";
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
  let questionNumber = 1;
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeBlockLanguage = "";

  const formatInlineText = (value) =>
    value
      .trim()
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1");

  const pushText = (value) => {
    const trimmed = formatInlineText(value);
    if (!trimmed) return;
    if (
      /^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmed) ||
      /^\|/.test(trimmed) ||
      /^\s*$/.test(trimmed)
    ) {
      return;
    }
    // Skip standalone label lines like "Example:", "Flow:", "Key capabilities:"
    // — the code block / list that follows already communicates the structure.
    if (/^[\w\s'/&()-]{1,45}:$/.test(trimmed)) {
      return;
    }
    if (currentQuestion) {
      currentQuestion.response.push({ type: "text", content: trimmed });
    }
  };

  const pushListItem = (value) => {
    const trimmed = formatInlineText(value);
    if (!trimmed) return;
    if (currentQuestion) {
      const lastBlock =
        currentQuestion.response[currentQuestion.response.length - 1];
      if (lastBlock?.type === "list") {
        lastBlock.items.push(trimmed);
      } else {
        currentQuestion.response.push({ type: "list", items: [trimmed] });
      }
    }
  };

  const isTableSeparator = (value) => {
    const cells = value
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = trimmedLine.replace(/```/g, "").trim() || "bash";
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

    const categoryMatch = line.match(/^##\s+(.+)/);
    if (categoryMatch) {
      currentCategory = { name: categoryMatch[1], questions: [] };
      categories.push(currentCategory);
      currentQuestion = null;
      continue;
    }

    const questionMatch = line.match(/^###\s+(.+)/);
    if (questionMatch) {
      currentQuestion = {
        id: `${questionNumber}`,
        question: questionMatch[1],
        response: [],
      };
      if (currentCategory) {
        currentCategory.questions.push(currentQuestion);
      }
      questionNumber += 1;
      continue;
    }

    if (!currentQuestion) continue;

    if (
      trimmedLine.startsWith("**") &&
      trimmedLine.endsWith("**") &&
      trimmedLine.length > 4
    ) {
      pushText(trimmedLine.slice(2, -2));
      continue;
    }

    if (/^[-*]\s+/.test(trimmedLine)) {
      pushListItem(trimmedLine.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (/^\|/.test(trimmedLine)) {
      if (isTableSeparator(trimmedLine)) {
        continue;
      }

      const cells = trimmedLine
        .split("|")
        .slice(1, -1)
        .map((cell) => formatInlineText(cell));
      if (cells.length > 0) {
        if (
          !currentQuestion.response.length ||
          currentQuestion.response[currentQuestion.response.length - 1].type !==
            "table"
        ) {
          currentQuestion.response.push({ type: "table", rows: [] });
        }
        const tableBlock =
          currentQuestion.response[currentQuestion.response.length - 1];
        if (tableBlock.type === "table") {
          tableBlock.rows.push(cells);
        }
      }
      continue;
    }

    if (/^\d+\./.test(trimmedLine)) {
      pushText(trimmedLine.replace(/^\d+\.\s*/, ""));
      continue;
    }

    if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
      pushText(trimmedLine.replace(/^\*\*/g, "").replace(/\*\*$/g, ""));
      continue;
    }

    if (trimmedLine && !trimmedLine.startsWith("#")) {
      pushText(trimmedLine);
    }
  }

  return categories;
};

const interviewCategories = parseQuestions(kafkaInterviewQuestions);

const totalQuestions = interviewCategories.reduce(
  (sum, cat) => sum + cat.questions.length,
  0,
);

function KafkaInterview() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="spring-boot-interview-page">
      <section className="interview-header">
        <div className="interview-header-content">
          <Link to="/kafka" className="back-button">
            ← Back to Apache Kafka
          </Link>
          <h1 className="interview-title">Kafka Interview Questions</h1>
          <p className="interview-subtitle">
            Master Kafka interview questions with detailed answers and code
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
                              <h3 className="answer-title">Answer:</h3>
                              {q.response.map((block, index) => {
                                if (block.type === "code") {
                                  return (
                                    <div key={index} className="code-block">
                                      <div className="code-header">
                                        <span className="code-language">
                                          {block.language || "bash"}
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
                                if (block.type === "list") {
                                  return (
                                    <ul key={index} className="answer-list">
                                      {block.items.map((item, itemIndex) => (
                                        <li
                                          key={`${index}-${itemIndex}`}
                                          className="answer-list-item"
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                }
                                if (block.type === "table") {
                                  const [header, ...rows] = block.rows;
                                  return (
                                    <div
                                      key={index}
                                      className="answer-table-wrapper"
                                    >
                                      <table className="answer-table">
                                        <thead>
                                          <tr>
                                            {header.map((cell, cellIndex) => (
                                              <th
                                                key={`${index}-h-${cellIndex}`}
                                              >
                                                {cell}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {rows.map((row, rowIndex) => (
                                            <tr key={`${index}-r-${rowIndex}`}>
                                              {row.map((cell, cellIndex) => (
                                                <td
                                                  key={`${index}-c-${rowIndex}-${cellIndex}`}
                                                >
                                                  {cell}
                                                </td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  );
                                }
                                return (
                                  <p
                                    key={index}
                                    className={`answer-text answer-${block.type}`}
                                  >
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

export default KafkaInterview;
