import { useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { pythonModuleConcepts } from "../../data/fde/pythonModuleConcepts";
import LLMCourse from "../llm/LLMCourse";
import "../reactjs/ReactJSCourse.css";
import "./FDEPythonCourse.css";

const PAGE_SIZE = 10;

const highlightCode = (code, language = "python") =>
  hljs.highlight(code, {
    language,
    ignoreIllegals: true,
  }).value;

// Generic FDE course workspace: left navigator + lesson detail, same layout
// as Module 2. Two detail modes:
// - "code" (default): description + Why/When + highlighted code example.
// - "lessons": card-grid style lessons opened in the LLMCourse reader modal.
function FDEPythonCourse({
  concepts = pythonModuleConcepts,
  filterCategories = null,
  filterIds = null,
  searchId = "fde-python-search",
  mini = false,
  mode = "code",
  codeLanguage = "python",
  codeLabel = "Python",
  headline = null,
}) {
  const scopeConcepts = useMemo(() => {
    if (filterIds && filterIds.length) {
      const order = new Map(filterIds.map((id, index) => [id, index]));
      return concepts
        .filter((item) => order.has(item.id))
        .sort((a, b) => order.get(a.id) - order.get(b.id));
    }
    return filterCategories && filterCategories.length
      ? concepts.filter((item) => filterCategories.includes(item.category))
      : concepts;
  }, [concepts, filterCategories, filterIds]);
  const scopeCategories = useMemo(
    () => ["all", ...new Set(scopeConcepts.map((item) => item.category))],
    [scopeConcepts],
  );
  const [selectedId, setSelectedId] = useState(() => scopeConcepts[0]?.id ?? 1);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showMobileNavigator, setShowMobileNavigator] = useState(true);

  // NOTE: parents pass a stable `key` per scope (see ForwardDeploymentEngineerModule),
  // so each scoped workspace mounts fresh with its own selection state.

  const filteredConcepts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return scopeConcepts.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        !query ||
        `${item.title} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search, scopeConcepts]);

  const pageCount = Math.max(1, Math.ceil(filteredConcepts.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filteredConcepts.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );
  const selected =
    filteredConcepts.find((item) => item.id === selectedId) ||
    pageItems[0] ||
    scopeConcepts[0];

  const chooseCategory = (value) => {
    setCategory(value);
    setPage(0);
  };

  const selectedIndex = Math.max(
    0,
    scopeConcepts.findIndex((item) => item.id === selected?.id),
  );
  const prevConcept =
    selectedIndex > 0 ? scopeConcepts[selectedIndex - 1] : null;
  const nextConcept =
    selectedIndex < scopeConcepts.length - 1
      ? scopeConcepts[selectedIndex + 1]
      : null;

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
    <div className={`react-course-page fde-python-course${mini ? " fde-python-mini" : ""}`}>
      {headline && <p className="fde-course-headline">{headline}</p>}
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
            <label htmlFor={searchId}>Find a concept</label>
            <input
              id={searchId}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(0);
              }}
              placeholder="Search concepts"
            />
          </div>
          <div className="react-course-filters" aria-label="Filter concepts">
            {scopeCategories.map((item) => (
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
            {pageItems.map((item, listIndex) => (
              <button
                key={item.id}
                type="button"
                className={`react-course-nav-item ${selected?.id === item.id ? "selected" : ""}`}
                onClick={() => chooseItem(item)}
              >
                <span>
                  {String(safePage * PAGE_SIZE + listIndex + 1).padStart(2, "0")}
                </span>
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
              Concept {selectedIndex + 1} of {scopeConcepts.length}
            </span>
          </div>
          <h2>{selected.title}</h2>
          <p className="react-course-description">{selected.description}</p>
          {mode === "lessons" ? (
            <LLMCourse
              embedded
              lessons={selected.lessons || []}
              contentMap={selected.contentMap || {}}
            />
          ) : (
            <>
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
              {selected.code && (
                <section className="react-course-example">
                  <div className="react-course-example-heading">
                    <h3>Example:</h3>
                    <span>{codeLabel}</span>
                  </div>
                  <pre>
                    <code
                      className={`hljs language-${codeLanguage}`}
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(selected.code, codeLanguage),
                      }}
                    />
                  </pre>
                </section>
              )}
            </>
          )}
          <div className="react-course-detail-nav">
            <button
              type="button"
              disabled={!prevConcept}
              onClick={() => chooseItem(prevConcept)}
            >
              Previous concept
            </button>
            <button
              type="button"
              disabled={!nextConcept}
              onClick={() => chooseItem(nextConcept)}
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
