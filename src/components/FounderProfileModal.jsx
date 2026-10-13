import { useEffect, useRef, useState } from "react";
import { FaBolt, FaCode, FaDatabase, FaGlobe, FaHandshake, FaJava, FaLinkedin, FaNetworkWired, FaSitemap, FaYoutube } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";

/**
 * FounderProfileModal
 * -------------------
 * Cinematic "spotlight reveal" shown when the navbar About item is clicked:
 *   1. A searchlight beam sweeps across a floating gold-dust starfield.
 *   2. The card materializes out of a blur with 3D mouse tilt.
 *   3. The name assembles letter by letter, the headline types itself out,
 *      and the three headline stats flip in one by one.
 *   4. "See Everything" expands the full bio, skills, and links in-place.
 * Replaces the old About page entirely.
 */
const NAME = "Venkatesh Bharath";
const HEADLINE = "Technical Specialist \u00B7 Founder at BSK Coding";
const SPOTLIGHT_MS = 1050;

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "Free", label: "Learning" },
  { value: "12+", label: "Tracks" },
];

// Deterministic "gold dust" particles (stable positions across renders).
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: (i * 37 + 11) % 100,
  top: 20 + ((i * 53 + 7) % 75),
  size: 2 + ((i * 7) % 4),
  delay: ((i * 11) % 45) / 10,
  duration: 6 + ((i * 13) % 7),
  cyan: i % 4 === 0,
}));

function FounderProfileModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState("idle"); // idle -> spotlight -> reveal
  const [expanded, setExpanded] = useState(false);
  const [typed, setTyped] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Phase machine: sweep the spotlight, then materialize the card.
  useEffect(() => {
    if (!isOpen) {
      const resetTimer = setTimeout(() => {
        setPhase("idle");
        setExpanded(false);
      }, 0);
      return () => clearTimeout(resetTimer);
    }
    document.body.style.overflow = "hidden";
    if (prefersReducedMotion) {
      const revealTimer = setTimeout(() => setPhase("reveal"), 0);
      return () => {
        clearTimeout(revealTimer);
        document.body.style.overflow = "";
      };
    }
    const spotlightTimer = setTimeout(() => setPhase("spotlight"), 0);
    const revealTimer = setTimeout(() => setPhase("reveal"), SPOTLIGHT_MS);
    return () => {
      clearTimeout(spotlightTimer);
      clearTimeout(revealTimer);
      document.body.style.overflow = "";
    };
  }, [isOpen, prefersReducedMotion]);

  // ESC closes.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Typewriter headline once the card is revealed.
  useEffect(() => {
    if (phase !== "reveal") return undefined;
    if (prefersReducedMotion) {
      const typedTimer = setTimeout(() => setTyped(HEADLINE), 0);
      return () => clearTimeout(typedTimer);
    }
    let i = 0;
    let id;
    const resetTimer = setTimeout(() => {
      setTyped("");
      id = setInterval(() => {
        i += 1;
        setTyped(HEADLINE.slice(0, i));
        if (i >= HEADLINE.length) clearInterval(id);
      }, 26);
    }, 0);
    return () => {
      clearTimeout(resetTimer);
      if (id) clearInterval(id);
    };
  }, [phase, prefersReducedMotion]);

  // 3D tilt + cursor glow coordinates.
  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <div className="founder-overlay" onClick={onClose} role="presentation">
      <span className="founder-beam" aria-hidden="true" />
      <span className="founder-orb" aria-hidden="true" />
      <div className="founder-stars" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className={`founder-star${p.cyan ? " is-cyan" : ""}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {phase === "reveal" && (
        <div
          className="founder-modal is-entering"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={cardRef}
            className="founder-modal-inner"
            role="dialog"
            aria-modal="true"
            aria-label="Founder profile"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <button
              type="button"
              className="founder-modal-close"
              onClick={onClose}
              aria-label="Close profile"
            >
              ✕
            </button>

            <div className="founder-avatar-wrap">
              <span className="founder-avatar-ring" aria-hidden="true" />
              <img
                src="/founder.png"
                alt="Venkatesh Bharath"
                className="founder-avatar"
              />
              <span className="founder-crown-chip">👑</span>
            </div>

            <h2 className="founder-name">
              {NAME.split("").map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  className="founder-letter"
                  style={{ animationDelay: `${240 + i * 34}ms` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h2>

            <p className="founder-headline">
              {typed}
              <span className="founder-caret" aria-hidden="true" />
            </p>

            {/* Three headline stats — flip in one by one */}
            <div className="founder-headline-stats">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="founder-headline-stat"
                  style={{ animationDelay: `${680 + i * 160}ms` }}
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            {!expanded ? (
              <button
                type="button"
                className="founder-view-all"
                onClick={() => setExpanded(true)}
              >
                See Everything →
              </button>
            ) : (
              <div className="founder-expanded">
                <p className="founder-bio">
                  <span className="founder-bio-lead">Venkatesh Bharath</span> is
                  a passionate <strong>Technical Specialist</strong> with{" "}
                  <strong>5+ years</strong> of hands-on experience in{" "}
                  <strong>Java</strong>, <strong>Spring Boot</strong>, and
                  backend development.
                </p>
                <p className="founder-bio founder-bio-mission">
                  <span className="founder-mission-tag">Why BSK Coding</span> He
                  created this platform to help fellow developers navigate their
                  career journey through{" "}
                  <strong>structured roadmaps</strong>,{" "}
                  <strong>hands-on learning paths</strong>, and{" "}
                  <strong>real-world interview preparation</strong>.
                </p>

                <h3 className="founder-section-label">Core Expertise</h3>
                <div className="founder-badges">
                  <span className="founder-badge">
                    <FaJava className="founder-badge-icon" style={{ color: "#f89820" }} aria-hidden="true" />
                    Java
                  </span>
                  <span className="founder-badge">
                    <SiSpringboot className="founder-badge-icon" style={{ color: "#6DB33F" }} aria-hidden="true" />
                    Spring Boot
                  </span>
                  <span className="founder-badge">
                    <FaNetworkWired className="founder-badge-icon" style={{ color: "#a78bfa" }} aria-hidden="true" />
                    Microservices
                  </span>
                  <span className="founder-badge">
                    <FaDatabase className="founder-badge-icon" style={{ color: "#38bdf8" }} aria-hidden="true" />
                    SQL
                  </span>
                  <span className="founder-badge">
                    <FaCode className="founder-badge-icon" style={{ color: "#fbbf24" }} aria-hidden="true" />
                    DSA
                  </span>
                  <span className="founder-badge">
                    <FaSitemap className="founder-badge-icon" style={{ color: "#67e8f9" }} aria-hidden="true" />
                    System Design
                  </span>
                  <span className="founder-badge">
                    <FaBolt className="founder-badge-icon" style={{ color: "#f472b6" }} aria-hidden="true" />
                    Reactive Programming
                  </span>
                </div>

                <h3 className="founder-section-label">What you get here</h3>
                <ul className="founder-highlights">
                  <li>
                    Clear, structured roadmaps — always know what to learn next
                  </li>
                  <li>
                    Hands-on learning paths built from real production
                    experience
                  </li>
                  <li>
                    Interview prep with real company questions &amp; answers
                  </li>
                </ul>

                <div className="founder-socials">
                  <a
                    href="https://www.youtube.com/@bskcoding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-social founder-social-youtube"
                  >
                    <span className="founder-social-icon" aria-hidden="true">
                      <FaYoutube />
                    </span>
                    <span>
                      YouTube
                      <small>Free video lessons</small>
                    </span>
                  </a>
                  <a
                    href="https://topmate.io/venkatesh_bharath"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-social founder-social-topmate"
                  >
                    <span className="founder-social-icon" aria-hidden="true">
                      <FaHandshake />
                    </span>
                    <span>
                      1:1 Call
                      <small>Career mentorship</small>
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/bsk-coding/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-social founder-social-linkedin"
                  >
                    <span className="founder-social-icon" aria-hidden="true">
                      <FaLinkedin />
                    </span>
                    <span>
                      LinkedIn
                      <small>Connect &amp; follow</small>
                    </span>
                  </a>
                  <a
                    href="https://bskcoding.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-social founder-social-website"
                  >
                    <span className="founder-social-icon" aria-hidden="true">
                      <FaGlobe />
                    </span>
                    <span>
                      Website
                      <small>Explore BSK Coding</small>
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FounderProfileModal;
