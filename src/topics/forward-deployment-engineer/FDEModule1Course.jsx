import { useState } from "react";
import { fdeModule1Concepts } from "../../data/fde/fdeModule1Concepts";
import "../reactjs/ReactJSCourse.css";
import "./FDEPythonCourse.css";
import "./FDEModule1Course.css";

const topics = fdeModule1Concepts.flatMap((area) =>
  area.lessons.map((lesson, index) => ({
    id: `${area.id}-${index}`,
    area: area.title,
    title: lesson.title,
    description: lesson.description,
    videoLink: lesson.videoLink,
    content: area.contentMap?.[lesson.title],
  })),
);

const areas = ["All topics", ...fdeModule1Concepts.map((area) => area.title)];

const learningFlows = {
  "LLM Fundamentals": [
    "Text input",
    "Token IDs",
    "Transformer layers",
    "Next-token scores",
    "Generated text",
  ],
  "Prompt Design": [
    "Role & task",
    "Context & examples",
    "Prompt structure",
    "Model response",
    "Evaluate & refine",
  ],
  "Advanced Techniques": [
    "User request",
    "Choose tool or schema",
    "Execute & validate",
    "Grounded response",
  ],
};

function FDEModule1Course() {
  const [selectedId, setSelectedId] = useState(topics[0]?.id);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("All topics");
  const [showNavigator, setShowNavigator] = useState(true);

  const visibleTopics = topics.filter((topic) => {
    const matchesArea = area === "All topics" || topic.area === area;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      `${topic.title} ${topic.description} ${topic.area}`
        .toLowerCase()
        .includes(query);
    return matchesArea && matchesSearch;
  });
  const selected =
    visibleTopics.find((topic) => topic.id === selectedId) ||
    visibleTopics[0] ||
    null;
  const selectedIndex = selected
    ? topics.findIndex((topic) => topic.id === selected.id)
    : -1;

  const chooseArea = (value) => {
    setArea(value);
    setSearch("");
    const firstTopic =
      value === "All topics"
        ? topics[0]
        : topics.find((topic) => topic.area === value);
    if (firstTopic) setSelectedId(firstTopic.id);
  };

  const chooseTopic = (topic) => {
    setSelectedId(topic.id);
    setShowNavigator(false);
  };

  const moveTopic = (offset) => {
    const nextTopic = topics[selectedIndex + offset];
    if (!nextTopic) return;
    setSelectedId(nextTopic.id);
  };

  return (
    <div className="react-course-page fde-module1-course">
      <section className="react-course-workspace fde-module1-workspace">
        <button
          type="button"
          className="react-course-mobile-toggle"
          aria-label={showNavigator ? "Hide topics" : "Show topics"}
          aria-expanded={showNavigator}
          onClick={() => setShowNavigator((value) => !value)}
        >
          {showNavigator ? "←" : "→"}
        </button>

        <aside
          className={`react-course-sidebar${showNavigator ? "" : " is-mobile-collapsed"}`}
          aria-label="Module 1 topic navigation"
        >
          <div className="react-course-sidebar-top">
            <label htmlFor="fde-module-1-search">Find a topic</label>
            <input
              id="fde-module-1-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Module 1"
            />
          </div>
          <div className="react-course-filters" aria-label="Filter topic areas">
            {areas.map((item) => (
              <button
                key={item}
                type="button"
                className={area === item ? "active" : ""}
                onClick={() => chooseArea(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="react-course-list">
            {visibleTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className={`react-course-nav-item${selected?.id === topic.id ? " selected" : ""}`}
                onClick={() => chooseTopic(topic)}
              >
                <span>
                  {String(topics.indexOf(topic) + 1).padStart(2, "0")}
                </span>
                <strong>{topic.title}</strong>
                <small>{topic.area}</small>
              </button>
            ))}
            {!visibleTopics.length && (
              <p className="react-course-empty">No topics match that search.</p>
            )}
          </div>
        </aside>

        <main className="react-course-detail" aria-live="polite">
          {selected ? (
            <>
              <div className="react-course-detail-top">
                <span className="react-course-level level-intermediate">
                  {selected.area}
                </span>
                <span className="react-course-number">
                  Topic {selectedIndex + 1} of {topics.length}
                </span>
              </div>
              <h2>{selected.title}</h2>
              <p className="react-course-description">
                {selected.content?.intro || selected.description}
              </p>

              <section
                className="fde-module1-diagram"
                aria-label={`${selected.area} learning flow`}
              >
                <div className="fde-module1-diagram-heading">
                  <span>Learning flow</span>
                  <strong>{selected.area}</strong>
                </div>
                <div className="fde-module1-diagram-steps">
                  {learningFlows[selected.area].map((step, index, flow) => (
                    <div className="fde-module1-diagram-item" key={step}>
                      <span className="fde-module1-diagram-node">{step}</span>
                      {index < flow.length - 1 && (
                        <span
                          className="fde-module1-diagram-arrow"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {selected.content?.sections?.map((section, index) => (
                <section
                  className="fde-module1-lesson-section"
                  key={section.heading}
                >
                  <div className="fde-module1-section-heading">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{section.heading}</h3>
                  </div>
                  {section.body && <p>{section.body}</p>}
                  {section.bullets?.length > 0 && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {selected.content?.takeaways?.length > 0 && (
                <section className="fde-module1-takeaways">
                  <h3>Key takeaways</h3>
                  <ul>
                    {selected.content.takeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="fde-module1-detail-footer">
                {selected.videoLink && (
                  <a href={selected.videoLink} target="_blank" rel="noreferrer">
                    Watch lesson video ↗
                  </a>
                )}
                <div className="react-course-detail-nav">
                  <button
                    type="button"
                    disabled={selectedIndex <= 0}
                    onClick={() => moveTopic(-1)}
                  >
                    Previous topic
                  </button>
                  <button
                    type="button"
                    disabled={selectedIndex >= topics.length - 1}
                    onClick={() => moveTopic(1)}
                  >
                    Next topic
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="react-course-empty">No topics match that search.</p>
          )}
        </main>
      </section>
    </div>
  );
}

export default FDEModule1Course;
