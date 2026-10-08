import { useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { pythonModuleConcepts } from "../../data/fde/pythonModuleConcepts";
import "../reactjs/ReactJSCourse.css";
import "./FDEPythonCourse.css";

const PAGE_SIZE = 10;
const categories = [
  "all",
  ...new Set(pythonModuleConcepts.map((item) => item.category)),
];

const highlightCode = (code) =>
  hljs.highlight(code, {
    language: "python",
    ignoreIllegals: true,
  }).value;

function FDEPythonCourse() {
  const [selectedId, setSelectedId] = useState(1);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showMobileNavigator, setShowMobileNavigator] = useState(true);

  const filteredConcepts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return pythonModuleConcepts.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        !query ||
        `${item.title} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const pageCount = Math.max(1, Math.ceil(filteredConcepts.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filteredConcepts.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );
  const selected =
    filteredConcepts.find((item) => item.id === selectedId) ||
    pageItems[0] ||
    pythonModuleConcepts[0];

  const chooseCategory = (value) => {
    setCategory(value);
    setPage(0);
  };

  const chooseItem = (item) => {
    if (!item) return;
    setSelectedId(item.id);
    setShowMobileNavigator(false);
    const itemPage = Math.floor(
      filteredConcepts.findIndex((entry) => entry.id === item.id) / PAGE_SIZE,
    );
    if (itemPage >= 0) setPage(itemPage);
  };

  return (
    <div className="react-course-page fde-python-course">
      <section className="react-course-workspace">
        <button
          type="button"
          className="react-course-mobile-toggle"
          aria-label="Toggle concepts"
          aria-expanded={showMobileNavigator}
          onClick={() => setShowMobileNavigator((value) => !value)}
        >
          {showMobileNavigator ? "←" : "→"}
        </button>
        <aside
          className={`react-course-sidebar${showMobileNavigator ? "" : " is-mobile-collapsed"}`}
          aria-label="Python course navigation"
        >
          <div className="react-course-sidebar-top">
            <label htmlFor="fde-python-search">Find a concept</label>
            <input
              id="fde-python-search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(0);
              }}
              placeholder="Search concepts"
            />
          </div>
          <div className="react-course-filters" aria-label="Filter concepts">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "active" : ""}
                onClick={() => chooseCategory(item)}
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
                className={`react-course-nav-item ${selected?.id === item.id ? "selected" : ""}`}
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
              Concept {selected.id} of {pythonModuleConcepts.length}
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
              <span>Python</span>
            </div>
            <pre>
              <code
                className="hljs language-python"
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
              onClick={() => chooseItem(pythonModuleConcepts[selected.id - 2])}
            >
              Previous concept
            </button>
            <button
              type="button"
              disabled={selected.id === pythonModuleConcepts.length}
              onClick={() => chooseItem(pythonModuleConcepts[selected.id])}
            >
              Next concept
            </button>
          </div>
        </main>
      </section>
    </div>
  );
}

export default FDEPythonCourse;
