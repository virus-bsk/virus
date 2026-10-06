import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getCurrentUser, logout } from "../utils/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ColoredMaangText from "./ColoredMaangText";
import bskimg from "../assets/bskimg.svg";

const CURRENT_USER_KEY = "bsk_current_user";

// Same vibrant per-character palette the MAANG brand uses across the app.
const MAANG_COLORS = ["#FF5733", "#FFBD33", "#33FF57", "#33A1FF", "#A133FF"];

function NavBar({ onOpenChangePassword, onOpenFounder }) {
  const [user, setUser] = useState(getCurrentUser());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [glowColor, setGlowColor] = useState("blue");
  const [profileOpen, setProfileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const profileRef = useRef(null);
  const featuresRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setUser(getCurrentUser());
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          id: currentUser.uid,
          name:
            currentUser.displayName || currentUser.email?.split("@")[0] || "",
          email: currentUser.email,
        };
        setUser(userData);
        // Save to localStorage for RequireAuth check
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("storage", handler);
    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", handler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the MAANG Kit dropdown when clicking outside of it
  useEffect(() => {
    if (!featuresOpen) return;
    const onOutsideClick = (e) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [featuresOpen]);

  // Close the profile dropdown when clicking outside of it
  useEffect(() => {
    if (!profileOpen) return;
    const onOutsideClick = (e) => {
      // Both desktop + mobile dropdowns share these classes, so one check
      // covers both wrappers (profileRef only points at the desktop one).
      if (e.target.closest?.(".nav-user-wrapper, .profile-dropdown")) return;
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      } else if (!profileRef.current) {
        setProfileOpen(false);
      }
    };
    const onEscape = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [profileOpen]);

  // Close profile + mobile menus whenever the route changes so the
  // dropdown never stays open after navigating to another page.
  // Deferred via rAF so this is a subscription-style update, not a
  // synchronous setState-in-effect (keeps `npm run lint` green).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setProfileOpen(false);
      setMenuOpen(false);
      setFeaturesOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem(CURRENT_USER_KEY);
      setUser(null);
      setMenuOpen(false);
      setProfileOpen(false);
      // The site is free to browse, so stay on the current page after
      // logout. If the page requires login (resume builder, MAANG
      // sub-topics), RequireAuth redirects to /login on this re-render.
      navigate(location.pathname + location.search, { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    setFeaturesOpen(false);
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleGlowClick = () => {
    setGlowColor(glowColor === "blue" ? "green" : "blue");
  };

  return (
    <header className={`nav-bar${scrolled ? " nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <NavLink to="/" className="nav-brand" onClick={closeMenu}>
          <div
            className={`nav-logo-wrapper${glowColor === "green" ? " green-glow" : ""}`}
            onClick={handleGlowClick}
          >
            <img src={bskimg} alt="BSK Coding" className="nav-logo" />
          </div>
        </NavLink>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links${menuOpen ? " open" : ""}`}>
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>
            <span>Home</span>
          </NavLink>
          <button
            type="button"
            className="nav-link nav-link-btn"
            onClick={() => {
              closeMenu();
              if (onOpenFounder) onOpenFounder();
            }}
          >
            <span>About</span>
          </button>
          <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
            <span>Contact</span>
          </NavLink>
          {/* MAANG Kit dropdown — clicking the button opens quick links to
              the two premium features: MAANG Preparation + Resume Builder */}
          <div className="nav-dropdown" ref={featuresRef}>
            <button
              type="button"
              className={`nav-link nav-dropdown-trigger${
                location.pathname === "/maang" ||
                location.pathname === "/resume-builder"
                  ? " active"
                  : ""
              }`}
              onClick={() => setFeaturesOpen(!featuresOpen)}
              aria-haspopup="true"
              aria-expanded={featuresOpen}
            >
              <span className="nav-dropdown-fire">🔥</span>
              <span className="maang-letters-glued nav-maang-kit-text">
                <ColoredMaangText text="MAANG" colors={MAANG_COLORS} />
                <span className="maang-word-gap" aria-hidden="true" />
                <ColoredMaangText text="Kit" colors={MAANG_COLORS} color="#33FF57" />
              </span>
              <span className="nav-dropdown-caret-icon">▾</span>
            </button>
            {featuresOpen && (
              <div className="nav-dropdown-menu">
                <NavLink
                  to="/maang"
                  className="nav-dropdown-item"
                  onClick={closeMenu}
                >
                  <span className="nav-dropdown-item-icon">🏆</span>
                  <span className="maang-letters-glued">
                    <ColoredMaangText text="MAANG" colors={MAANG_COLORS} />
                    <span className="maang-word-gap" aria-hidden="true" />
                    <ColoredMaangText text="Preparation" colors={MAANG_COLORS} color="#33FF57" />
                  </span>
                  {!user && <span className="nav-dropdown-item-lock">🔒</span>}
                </NavLink>
                <NavLink
                  to="/resume-builder"
                  className="nav-dropdown-item nav-dropdown-item-resume"
                  onClick={closeMenu}
                >
                  <span className="nav-dropdown-item-icon">📄</span>
                  <span>Resume Builder</span>
                  {!user && <span className="nav-dropdown-item-lock">🔒</span>}
                </NavLink>
              </div>
            )}
          </div>
          <a
            href="https://topmate.io/venkatesh_bharath"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={closeMenu}
          >
            <span>1:1 Call</span>
          </a>
          <a
            href="https://www.youtube.com/@bskcoding"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={closeMenu}
          >
            <span>▶ YouTube</span>
          </a>
          {!user && (
            <>
              <NavLink
                to="/login"
                className="nav-link nav-link-highlight"
                onClick={closeMenu}
              >
                <span>Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className="nav-link nav-link-cta"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </>
          )}
          {user && (
            <>
              <div className="nav-user-wrapper" ref={profileRef}>
                <button
                  className="nav-user-trigger"
                  onClick={toggleProfile}
                  aria-label="User menu"
                  aria-expanded={profileOpen}
                >
                  <div className="nav-user-avatar">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="nav-user-name">{user.name}</span>
                  <span className="nav-user-arrow">▼</span>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <div className="profile-avatar-large">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="profile-info">
                        <div className="profile-name">{user.name}</div>
                        <div className="profile-dropdown-email">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="profile-dropdown-divider" />

                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                    >
                      <span className="profile-item-icon">👤</span>
                      <span>My Profile</span>
                    </button>

                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/payment");
                      }}
                    >
                      <span className="profile-item-icon">💳</span>
                      <span>Payment</span>
                    </button>

                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        setProfileOpen(false);
                        if (onOpenChangePassword) {
                          onOpenChangePassword();
                        }
                      }}
                    >
                      <span className="profile-item-icon">🔒</span>
                      <span>Change Password</span>
                    </button>

                    <div className="profile-dropdown-divider" />

                    <button
                      className="profile-dropdown-item profile-dropdown-logout"
                      onClick={handleLogout}
                    >
                      <span className="profile-item-icon">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
