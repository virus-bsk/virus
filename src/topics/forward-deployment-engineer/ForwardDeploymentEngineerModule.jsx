import { Link, useParams } from "react-router-dom";
import { fdeModules } from "../../data/fde/forwardDeploymentEngineerModules";
import FDEModule1Course from "./FDEModule1Course";
import FDEPythonCourse from "./FDEPythonCourse";
import "./ForwardDeploymentEngineer.css";

const MODULE2_COURSES = {
  "Python Foundations": {
    filterCategories: [
      "python",
      "files-json",
      "oop-errors",
      "async",
      "env-git",
    ],
    searchId: "fde-python-search-foundations",
  },
  "APIs & SDKs": {
    filterCategories: ["apis"],
    searchId: "fde-python-search-apis",
  },
};
const MODULE2_CATEGORIES = [
  ...new Set(
    Object.values(MODULE2_COURSES).flatMap((course) => course.filterCategories),
  ),
];

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
            We couldn't find module {moduleId} in the Forward Deployment
            Engineer curriculum.
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
    <div
      className={`fde-page fde-module-page${[1, 2].includes(mod.id) ? " fde-module-page-workspace" : ""}`}
    >
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

      {mod.id === 1 ? (
        <section className="fde-module-lesson-workspace">
          <FDEModule1Course />
        </section>
      ) : mod.id === 2 ? (
        <section className="fde-module-lesson-workspace">
          <FDEPythonCourse
            filterCategories={MODULE2_CATEGORIES}
            searchId="fde-module-2-search"
          />
        </section>
      ) : (
        <>
          <h2 className="fde-module-section-kicker">What you'll learn</h2>
          <div className="fde-module-sections">
            {mod.sections.map((section, i) => (
              <section key={section.heading} className="fde-module-section">
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
              </section>
            ))}
          </div>
        </>
      )}

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
