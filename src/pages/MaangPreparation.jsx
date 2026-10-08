import { Link } from "react-router-dom";
import { skills } from "../data/skills";
import ColoredMaangText from "../components/ColoredMaangText";
import { googleSeriesIntro } from "../maang/basic-dsa/dsaBasicProblems";
import youtubeLogo from "../assets/youtube-logo.svg";

/**
 * MaangPreparation
 *
 * Landing page for the MAANG Preparation track. Shows the colourful
 * letter grid (every character a different colour) plus the list of
 * sub-topics you need to master to crack the top product companies.
 *
 * Sub-topics that have a dedicated page are rendered as navigation links;
 * the rest remain as static cards.
 */

// Map MAANG sub-topics to their route paths (only the ones that exist)
const subtopicRoutes = {
  "🎯 Interview Prep - All Topics": "/maang/interview-prep",
  "📊 DSA Foundation": "/maang/basic-dsa",
  "🌳 Advanced DSAs": "/maang/advanced-dsa",
  "🔀 Graph Mastery": "/maang/graphs",
  "🧩 Dynamic Programming": "/maang/dp",
  "📅 Weekly DSA Preparation": "/maang/weekly-preparation",
  "🏗️ System Design - Basics": "/maang/system-design-basics",
  "🌐 Advanced System Design": "/maang/system-design/advanced",
  "🚀 Forward Deployment Engineer": "/maang/forward-deployment-engineer",
};

function MaangPreparation() {
  const maang = skills.find((s) => s.id === "maang") || {};

  const charColors = maang.charColors;
  // One simple entry card before DSA: all-topics interview prep
  // (Java, SQL, Spring Boot, Microservices, Kafka, Reactive — 20+10 questions each).
  const subtopics = ["🎯 Interview Prep - All Topics", ...(maang.subtopics || [])];
  const description =
    maang.description ||
    "Master DSA + System Design + Reactive + Agentic AI to crack top product-based companies";

  return (
    <div className="maang-page">
      <section className="maang-page-hero">
        <h1 className="maang-page-title">
          <span className="maang-letters-glued">
            <ColoredMaangText text="MAANG" colors={charColors} />
            <span className="maang-word-gap" aria-hidden="true" />
            <ColoredMaangText text="Preparation" colors={charColors} color="#33FF57" />
          </span>
        </h1>
        <p className="maang-page-subtitle">{description}</p>

        {/* Watch Intro — the ONLY place this pill lives now: the internal
            DSA sheet pages (Basic/Advanced/DP/Graphs/Weekly) no longer
            render it. The global YouTubeLinkHandler intercepts the click
            and plays the video inside the app. */}
        <div className="maang-intro-video-wrap">
          <a
            className="maang-intro-video"
            href={googleSeriesIntro.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Watch Google Crack Coding Series Intro"
          >
            <img
              className="maang-intro-logo"
              src={youtubeLogo}
              alt="YouTube"
            />
            <span className="maang-video-text">
              <span className="maang-video-label">Watch Intro</span>
              <span className="maang-video-sub">Start here · 2 min</span>
            </span>
            <span className="maang-video-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="maang-subtopics">
        <h2 className="section-title">What You'll Master</h2>
        <p className="section-subtitle">
          A complete learning path from fundamentals to mock interviews
        </p>
        <div className="maang-subtopics-grid">
          {subtopics.map((topic, i) => {
            const route = subtopicRoutes[topic];

            return route ? (
              <Link
                key={topic}
                to={route}
                className="maang-subtopic-card maang-subtopic-link"
              >
                <span className="maang-subtopic-shine" aria-hidden="true" />
                <div className="maang-subtopic-top">
                  <span
                    className="maang-subtopic-emoji"
                    style={{ "--ml-idx": i }}
                    aria-hidden="true"
                  >
                    {topic.match(/^\S+/)?.[0] ?? "📌"}
                  </span>
                  <span className="maang-subtopic-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="maang-subtopic-name">{topic}</span>
              </Link>
            ) : (
              <div key={topic} className="maang-subtopic-card">
                <span className="maang-subtopic-shine" aria-hidden="true" />
                <div className="maang-subtopic-top">
                  <span
                    className="maang-subtopic-emoji"
                    style={{ "--ml-idx": i }}
                    aria-hidden="true"
                  >
                    {topic.match(/^\S+/)?.[0] ?? "📌"}
                  </span>
                  <span className="maang-subtopic-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="maang-subtopic-name">{topic}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="maang-page-cta">
        <Link to="/" className="cta-button secondary">
          Back to Home
        </Link>
      </section>
    </div>
  );
}

export default MaangPreparation;
