import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import hljs from "../../utils/hljs";
import "highlight.js/styles/atom-one-dark.css";
import { javascriptCourseConcepts } from "../../data/javascript/javascriptCourseConcepts";
import "../reactjs/ReactJSCourse.css";

const PAGE_SIZE = 10;
const categories = [
  "all",
  ...new Set(javascriptCourseConcepts.map((item) => item.category)),
];

const highlightCode = (code) =>
  hljs.highlight(code, {
    language: "javascript",
    ignoreIllegals: true,
  }).value;

function JavaScriptCourse() {
  const [selectedId, setSelectedId] = useState(1);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showMobileNavigator, setShowMobileNavigator] = useState(true);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return javascriptCourseConcepts.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        (!query ||
          `${item.title} ${item.description} ${item.category}`
            .toLowerCase()
            .includes(query)),
    );
  }, [category, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );
  const selected =
    filtered.find((item) => item.id === selectedId) ||
    pageItems[0] ||
    javascriptCourseConcepts[0];

  const chooseItem = (item) => {
    if (!item) return;
    setSelectedId(item.id);
    setShowMobileNavigator(false);
    const index = filtered.findIndex((entry) => entry.id === item.id);
    if (index >= 0) setPage(Math.floor(index / PAGE_SIZE));
  };

  return (
    <div className="react-course-page javascript-course-page">
      <section className="react-course-hero">
        <Link to="/javascript" className="react-course-back">
          ← Back to JavaScript
        </Link>
        <div className="react-course-kicker">JavaScript learning path</div>
        <h1>Complete JavaScript</h1>
        <p>
          65+ essential concepts from beginner fundamentals to advanced browser
          and language features, with the complete examples, Why, and When
          content.
        </p>
        <div className="react-course-stats">
          <span>
            <strong>{javascriptCourseConcepts.length}</strong> concepts
          </span>
          <span>
            <strong>{categories.length - 1}</strong> learning areas
          </span>
          <span>
            <strong>4</strong> levels
          </span>
        </div>
      </section>

      <section className="react-course-workspace">
        <button
          type="button"
          className="react-course-mobile-toggle"
          aria-label={
            showMobileNavigator
              ? "Hide course concepts"
              : "Show course concepts"
          }
          aria-expanded={showMobileNavigator}
          onClick={() => setShowMobileNavigator((value) => !value)}
        >
          {showMobileNavigator ? "←" : "→"}
        </button>
        <aside
          className={`react-course-sidebar${showMobileNavigator ? "" : " is-mobile-collapsed"}`}
          aria-label="JavaScript course navigation"
        >
          <div className="react-course-sidebar-top">
            <label htmlFor="javascript-course-search">Find a concept</label>
            <input
              id="javascript-course-search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(0);
              }}
              placeholder="Search concepts"
            />
          </div>
          <div className="react-course-filters">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "active" : ""}
                onClick={() => {
                  setCategory(item);
                  setPage(0);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="react-course-list">
            {pageItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`react-course-nav-item ${selected.id === item.id ? "selected" : ""}`}
                onClick={() => chooseItem(item)}
              >
                <span>{String(item.id).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <small>{item.level}</small>
              </button>
            ))}
            {!pageItems.length && (
              <p className="react-course-empty">
                No concepts match that search.
              </p>
            )}
          </div>
          <div className="react-course-pagination">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
            >
              Previous
            </button>
            <span>
              {safePage + 1} / {pageCount}
            </span>
            <button
              type="button"
              disabled={safePage === pageCount - 1}
              onClick={() =>
                setPage((value) => Math.min(pageCount - 1, value + 1))
              }
            >
              Next
            </button>
          </div>
        </aside>

        <main className="react-course-detail" aria-live="polite">
          <div className="react-course-detail-top">
            <span className={`react-course-level level-${selected.level}`}>
              {selected.level}
            </span>
            <span className="react-course-category">{selected.category}</span>
            <span className="react-course-number">
              Concept {selected.id} of {javascriptCourseConcepts.length}
            </span>
          </div>
          <h2>{selected.title}</h2>
          <p className="react-course-description">{selected.description}</p>
          <div className="react-course-explain-grid">
            <section>
              <h3>Why:</h3>
              <p>{selected.why}</p>
            </section>
            <section>
              <h3>When:</h3>
              <p>{selected.when}</p>
            </section>
          </div>
          <section className="react-course-example">
            <div className="react-course-example-heading">
              <h3>Example:</h3>
              <span>JavaScript</span>
            </div>
            <pre>
              <code
                className="hljs language-javascript"
                dangerouslySetInnerHTML={{
                  __html: highlightCode(selected.code),
                }}
              />
            </pre>
          </section>
          <div className="react-course-detail-nav">
            <button
              type="button"
              disabled={selected.id === 1}
              onClick={() =>
                chooseItem(javascriptCourseConcepts[selected.id - 2])
              }
            >
              ← Previous concept
            </button>
            <button
              type="button"
              disabled={selected.id === javascriptCourseConcepts.length}
              onClick={() => chooseItem(javascriptCourseConcepts[selected.id])}
            >
              Next concept →
            </button>
          </div>
        </main>
      </section>
    </div>
  );
}

export default JavaScriptCourse;
