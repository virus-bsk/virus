import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { skills } from "../data/skills";
import SkillCard from "../components/SkillCard";
import EmailContactModal from "../components/EmailContactModal";
import ColoredMaangText from "../components/ColoredMaangText";
import { getCurrentUser } from "../utils/auth";
import "./HomeMaangKit.css";

const MAANG_COLORS = ["#FF6B6B", "#FFB703", "#F6E05E", "#2EC4B6", "#4CC9F0"];

function Home() {
  const isLoggedIn = !!getCurrentUser();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [maangKitOpen, setMaangKitOpen] = useState(false);
  const maangKitRef = useRef(null);

  useEffect(() => {
    if (!maangKitOpen) return;

    const closeOnOutsideClick = (event) => {
      if (!maangKitRef.current?.contains(event.target)) {
        setMaangKitOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMaangKitOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [maangKitOpen]);

  const linkFor = (id) => {
    if (id === "90-day-job-roadmap") return "/roadmap";
    if (id === "java") return "/java";
    if (id === "javascript") return "/javascript";
    if (id === "reactjs") return "/reactjs";
    if (id === "spring-boot") return "/spring-boot";
    if (id === "microservices") return "/microservices";
    if (id === "sql-databases") return "/sql";
    if (id === "apache-kafka") return "/kafka";
    if (id === "reactive-programming") return "/reactive-programming";
    if (id === "dsa") return "/dsa";
    if (id === "system-design") return "/system-design";
    if (id === "company-interview") return "/company-interview";
    return "#";
  };

  return (
    <div className="main-container">
      {/* Hero Section */}
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">🚀</span>
          <h1 className="logo-text">BSK CODING</h1>
        </div>
        <p className="subtitle">
          Master modern software engineering with real project learning paths,
          expert-led courses, and career-ready outcomes.
        </p>
        <div className="hero-actions">
          <Link to="/roadmap" className="cta-button primary">
            Start Learning Path
          </Link>
        </div>
        <div className="hero-badges">
          <div className="hero-badge">
            <span>12</span>
            <p>Expert Tracks</p>
          </div>
          <div className="hero-badge">
            <span>120+</span>
            <p>Hands-on Modules</p>
          </div>
          <div
            className="hero-badge support-badge-clickable"
            onClick={() => setEmailModalOpen(true)}
            role="button"
            aria-label="Open email support"
          >
            <span>24/7</span>
            <p>Support</p>
          </div>
        </div>
      </section>

      <div className="home-maang-kit" ref={maangKitRef}>
        <button
          type="button"
          className="home-maang-toggle"
          onClick={() => setMaangKitOpen((open) => !open)}
          aria-label="Toggle MAANG Kit links"
          aria-expanded={maangKitOpen}
          aria-controls="home-maang-menu"
        >
          <span className="home-maang-label">
            <span className="home-maang-icon" aria-hidden="true">
              🔥
            </span>
            <span className="home-maang-word">
              <ColoredMaangText text="MAANG" colors={MAANG_COLORS} />
            </span>
            <span className="home-maang-kit-name">Kit</span>
          </span>
          <span className="home-maang-caret" aria-hidden="true">
            {maangKitOpen ? "▴" : "▾"}
          </span>
        </button>
        {maangKitOpen && (
          <div className="home-maang-menu" id="home-maang-menu">
            <Link
              to="/maang"
              className="home-maang-link"
              onClick={() => setMaangKitOpen(false)}
            >
              <span aria-hidden="true">🎓</span>
              <span>
                <ColoredMaangText text="MAANG" colors={MAANG_COLORS} />
                <span className="maang-word-gap" aria-hidden="true" />
                <ColoredMaangText
                  text="Preparation"
                  colors={MAANG_COLORS}
                  color="#2EC4B6"
                />
              </span>
              {!isLoggedIn && (
                <span
                  className="home-maang-link-lock"
                  aria-label="Login required"
                >
                  🔒
                </span>
              )}
            </Link>
            <Link
              to="/resume-builder"
              className="home-maang-link"
              onClick={() => setMaangKitOpen(false)}
            >
              <span aria-hidden="true">📄</span>
              <span>Resume Preparation</span>
              {!isLoggedIn && (
                <span
                  className="home-maang-link-lock"
                  aria-label="Login required"
                >
                  🔒
                </span>
              )}
            </Link>
          </div>
        )}
      </div>

      {/* Skills Grid with Sub-grids */}
      <section className="skills-section">
        <h2 className="section-title">Learning Tracks</h2>
        <p className="section-subtitle">
          Choose your path and start building real-world skills
        </p>
        <div className="skills-grid">
          {/* MAANG Kit moved to the dedicated Features page */}
          {skills
            .filter((skill) => skill.id !== "maang")
            .map((skill) => {
              const linkPath = linkFor(skill.id);
              return (
                <div key={skill.id} className="skill-card-container">
                  <Link to={linkPath} className="skill-card-link">
                    <SkillCard skill={skill} />
                  </Link>
                </div>
              );
            })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="content">
          <h2 className="title">Ready to Transform Your Career?</h2>
          <p className="description">
            Join thousands of developers who are mastering cutting-edge
            technologies through our expertly crafted, hands-on learning paths
            designed for real-world success.
          </p>
          <div className="action-buttons">
            <button className="cta-button primary" type="button">
              Explore All Courses
            </button>
            <button className="cta-button secondary" type="button">
              View Learning Paths
            </button>
          </div>
          <div className="footer-badge">
            <span className="badge">Trusted by developers worldwide</span>
          </div>
        </div>
      </section>

      <EmailContactModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      />
    </div>
  );
}

export default Home;
