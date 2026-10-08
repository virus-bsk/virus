import { Link, useParams } from "react-router-dom";
import { fdeModules } from "../../data/fde/forwardDeploymentEngineerModules";
import { fdeModule1Concepts } from "../../data/fde/fdeModule1Concepts";
import FDEPythonCourse from "./FDEPythonCourse";
import "./ForwardDeploymentEngineer.css";

const MODULE1_SECTIONS = [
  "LLM Fundamentals",
  "Prompt Design",
  "Advanced Techniques",
];

const MODULE2_COURSES = {
  "Python Foundations": {
    filterCategories: ["python", "files-json", "oop-errors", "async", "env-git"],
    searchId: "fde-python-search-foundations",
  },
  "APIs & SDKs": {
    filterCategories: ["apis"],
    searchId: "fde-python-search-apis",
  },
};

function ForwardDeploymentEngineerModule() {
  const { moduleId } = useParams();
  const index = fdeModules.findIndex((m) => String(m.id) === moduleId);
  const mod = index !== -1 ? fdeModules[index] : null;

  if (!mod) {
    return (
      <div className="fde-page fde-module-page">
        <div className="fde-module-missing">
          <span className="fde-module-missing-emoji">🤷</span>
          <h1 className="fde-title">Module Not Found</h1>
          <p>
            We couldn't find module {moduleId} in the Forward Deployment Engineer
            curriculum.
          </p>
          <Link
            to="/maang/forward-deployment-engineer"
            className="fde-module-back-all"
          >
            ← Back to all modules
          </Link>
        </div>
      </div>
    );
  }

  const prev = index > 0 ? fdeModules[index - 1] : null;
  const next = index < fdeModules.length - 1 ? fdeModules[index + 1] : null;

  return (
    <div className="fde-page fde-module-page">
      <p className="fde-module-breadcrumb">
        <Link to="/maang">MAANG</Link>
        <span className="fde-module-crumb-sep">/</span>
        <Link to="/maang/forward-deployment-engineer">
          Forward Deployment Engineer
        </Link>
        <span className="fde-module-crumb-sep">/</span>
        <span className="fde-module-crumb-current">Module {mod.no}</span>
      </p>

      {/* ===== Module header ===== */}
      <section className="fde-module-hero">
        <div className="fde-module-hero-row">
          <span className="fde-module-no">{mod.no}</span>
          <span className="fde-module-icon">{mod.icon}</span>
        </div>
        <h1 className="fde-module-title">{mod.title}</h1>
        <p className="fde-module-meta">
          Module {mod.no} of {fdeModules.length} · Duration – {mod.duration}
        </p>
        <p className="fde-module-summary">{mod.summary}</p>
      </section>

      {/* ===== Module 1 + 2: each section card carries its own workspace
          directly beneath its headline + topic list — navigator on the left,
          lesson detail on the right (same pattern as Module 2) ===== */}
      <h2 className="fde-module-section-kicker">What you'll learn</h2>
      <div className="fde-module-sections">
        {mod.sections.map((section, i) => (
          <section
            key={section.heading}
                        className={`fde-module-section${
              (mod.id === 1 && MODULE1_SECTIONS.includes(section.heading)) ||
              (mod.id === 2 && MODULE2_COURSES[section.heading])
                ? " fde-module-section-wide"
                : ""
            }`}
          >
            <div className="fde-module-section-head">
              <span className="fde-module-section-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{section.heading}</h3>
            </div>
            <ul className="fde-module-topic-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {mod.id === 1 &&
              MODULE1_SECTIONS.includes(section.heading) && (
                <FDEPythonCourse
                  key={`m1-${section.heading}`}
                  mode="lessons"
                  concepts={fdeModule1Concepts}
                  filterIds={[
                    fdeModule1Concepts.find((c) => c.title === section.heading)
                      ?.id,
                  ].filter(Boolean)}
                  searchId={`fde-m1-search-${i}`}
                  headline={section.items.join(" · ")}
                />
              )}
            {mod.id === 2 && section.heading === "Python Foundations" && (
              <FDEPythonCourse
                key="m2-python-foundations"
                filterCategories={[
                  "python",
                  "files-json",
                  "oop-errors",
                  "async",
                  "env-git",
                ]}
                searchId="fde-python-search-foundations"
              />
            )}
            {mod.id === 2 && section.heading === "APIs & SDKs" && (
              <FDEPythonCourse
                key="m2-apis-sdks"
                filterCategories={["apis"]}
                searchId="fde-python-search-apis"
              />
            )}
          </section>
        ))}
      </div>

      {/* ===== Capstone ===== */}
      <div className="fde-module-project">
        <span className="fde-module-project-label">Capstone Project</span>
        <span className="fde-module-project-name">🎯 {mod.project}</span>
      </div>

      {/* ===== Prev / Next ===== */}
      <div className="fde-module-nav">
        {prev ? (
          <Link
            to={`/maang/forward-deployment-engineer/${prev.id}`}
            className="fde-module-nav-btn fde-module-nav-prev"
          >
            <span>← Previous</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <Link
            to="/maang/forward-deployment-engineer"
            className="fde-module-nav-btn fde-module-nav-prev"
          >
            <span>←</span>
            <strong>All modules</strong>
          </Link>
        )}

        {next ? (
          <Link
            to={`/maang/forward-deployment-engineer/${next.id}`}
            className="fde-module-nav-btn fde-module-nav-next"
          >
            <span>Next →</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <Link
            to="/maang/forward-deployment-engineer"
            className="fde-module-nav-btn fde-module-nav-next"
          >
            <span>Finish →</span>
            <strong>All modules</strong>
          </Link>
        )}
      </div>

      <p className="fde-back">
        <Link to="/maang/forward-deployment-engineer">
          ← Back to all modules
        </Link>
      </p>
    </div>
  );
}

export default ForwardDeploymentEngineerModule;