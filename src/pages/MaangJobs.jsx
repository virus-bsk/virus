import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { subscribeJobs } from "../utils/jobs";
import { asDate } from "../utils/firestore";
import "./MaangJobs.css";

/**
 * MaangJobs
 *
 * Dedicated job board (/maang/jobs) holding ONE full grid of every
 * product-company job stored in Firestore (jobs collection).
 *
 * - Live-subscribed: openings posted by the nightly AI cron appear
 *   immediately, without a refresh.
 * - Client-side search across title / company / description.
 * - Skeleton cards while loading, styled empty states, expandable
 *   descriptions, company initial avatars, responsive grid.
 *
 * Reached from the FIRST card of the MAANG Preparation hub grid.
 */

// Deterministic avatar colour per company (0-4), so the same company
// always gets the same tile colour.
function companyColorIndex(name) {
  let h = 0;
  for (const ch of name || "") h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % 5;
}

// Compact relative date: "Today", "Yesterday", "12d ago", else a date.
function timeAgo(value) {
  const d = asDate(value);
  if (!d) return "";
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString();
}

// Posts from the last 48h get a glowing "NEW" badge.
function isRecent(value) {
  const d = asDate(value);
  return !!d && Date.now() - d.getTime() < 48 * 3_600_000;
}

function MaangJobs() {
  const [jobs, setJobs] = useState([]);
  const [jobsLoaded, setJobsLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState({}); // job id -> boolean

  useEffect(() => {
    const unsubscribe = subscribeJobs((rows, err) => {
      if (err) {
        console.error("Jobs load failed:", err);
        setJobsLoaded(true);
        return;
      }
      const sorted = [...(rows || [])].sort(
        (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
      );
      setJobs(sorted);
      setJobsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  // Live search across title, company and description.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((job) =>
      [job.title, job.company, job.description].some((field) =>
        (field || "").toLowerCase().includes(q),
      ),
    );
  }, [jobs, query]);

  return (
    <div className="maang-page mjobs">
      <Link to="/maang" className="mjobs-back">
        ← Back to MAANG Preparation
      </Link>

      {/* ===== HERO: title left, live stat tiles right ===== */}
      <section className="mjobs-hero">
        <div className="mjobs-hero-main">
          <h1 className="mjobs-title">Product Company Jobs</h1>
          <p className="mjobs-subtitle">
            Fresh openings at product-based companies — direct apply links only.
            Found, validated and posted automatically by AI every day.
          </p>
        </div>
        <div className="mjobs-stats">
          <div className="mjobs-stat">
            <span className="mjobs-stat-value">
              {jobsLoaded ? jobs.length : "…"}
            </span>
            <span className="mjobs-stat-label">Open roles</span>
          </div>
          <div className="mjobs-stat">
            <span className="mjobs-stat-value">24h</span>
            <span className="mjobs-stat-label">Refresh cycle</span>
          </div>
          <div className="mjobs-stat">
            <span className="mjobs-stat-value">100%</span>
            <span className="mjobs-stat-label">Direct links</span>
          </div>
        </div>
      </section>

      {/* ===== SEARCH TOOLBAR (only once jobs exist) ===== */}
      {jobsLoaded && jobs.length > 0 && (
        <div className="mjobs-toolbar">
          <div className="mjobs-search-wrap">
            <input
              className="mjobs-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, company or skill… e.g. Google, SDE, Go"
              aria-label="Search jobs"
            />
            {query && (
              <button
                className="mjobs-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <span className="mjobs-results">
            {filtered.length} of {jobs.length} shown
          </span>
        </div>
      )}

      {/* ===== CONTENT ===== */}
      {!jobsLoaded ? (
        <div className="mjobs-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mjobs-card mjobs-skeleton">
              <div className="mjobs-sk-head">
                <span className="mjobs-sk mjobs-sk-avatar" />
                <span className="mjobs-sk-lines">
                  <span className="mjobs-sk mjobs-sk-title" />
                  <span className="mjobs-sk mjobs-sk-company" />
                </span>
              </div>
              <span className="mjobs-sk mjobs-sk-desc" />
              <span className="mjobs-sk mjobs-sk-chip" />
              <span className="mjobs-sk mjobs-sk-apply" />
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="mjobs-empty">
          <span className="mjobs-empty-icon" aria-hidden="true">
            💼
          </span>
          <h3>No openings listed right now</h3>
          <p>
            The AI job finder scans product companies every day and posts fresh,
            direct apply links here. Check back tomorrow — or keep preparing
            while you wait.
          </p>
          <Link to="/maang" className="mjobs-empty-cta">
            Start with MAANG Preparation →
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mjobs-empty">
          <span className="mjobs-empty-icon" aria-hidden="true">
            🔍
          </span>
          <h3>No jobs match “{query}”</h3>
          <p>
            Try a different role, company or skill — or clear the search to see
            all {jobs.length} open roles.
          </p>
          <button
            type="button"
            className="mjobs-empty-cta"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mjobs-grid">
          {filtered.map((job, i) => {
            const isOpen = !!expanded[job.id];
            const longDesc = (job.description || "").length > 220;
            return (
              <article
                key={job.id}
                className="mjobs-card"
                style={{ "--mj-idx": i }}
              >
                <header className="mjobs-card-head">
                  <span
                    className={`mjobs-avatar mj-c${companyColorIndex(job.company)}`}
                    aria-hidden="true"
                  >
                    {(job.company || "?").trim().slice(0, 1).toUpperCase()}
                  </span>
                  <div className="mjobs-card-heading">
                    <h3 className="mjobs-card-title">{job.title}</h3>
                    <span className="mjobs-card-company">{job.company}</span>
                  </div>
                  {isRecent(job.createdAt) && (
                    <span className="mjobs-new">NEW</span>
                  )}
                </header>

                <p
                  className={
                    isOpen
                      ? "mjobs-card-desc mjobs-desc-open"
                      : "mjobs-card-desc"
                  }
                >
                  {job.description}
                </p>
                {longDesc && (
                  <button
                    type="button"
                    className="mjobs-more"
                    onClick={() =>
                      setExpanded((prev) => ({ ...prev, [job.id]: !isOpen }))
                    }
                  >
                    {isOpen ? "Show less ↑" : "Read more ↓"}
                  </button>
                )}

                <div className="mjobs-card-foot">
                  <span className="mjobs-chip">
                    👥 {job.experience} yr
                    {String(job.experience) === "1" ? "" : "s"}
                  </span>
                  {timeAgo(job.createdAt) && (
                    <span className="mjobs-chip">
                      📅 {timeAgo(job.createdAt)}
                    </span>
                  )}
                </div>

                <a
                  className="mjobs-apply"
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now →
                </a>
              </article>
            );
          })}
        </div>
      )}

      {/* ===== FOOTER NOTE ===== */}
      <footer className="mjobs-footer">
        Listings are fetched, de-duplicated and validated by AI every night and
        appear here automatically. Part of the{" "}
        <Link to="/maang">MAANG Preparation</Link> track.
      </footer>
    </div>
  );
}

export default MaangJobs;
