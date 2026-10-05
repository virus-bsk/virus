import { Link, Navigate, useLocation } from "react-router-dom";
import useMembership from "../hooks/useMembership";

/**
 * Gate for paid content (the MAANG kit and the Resume Builder).
 *
 * Like RequireAuth, but the signed-in account's Firestore document must also
 * have isPaid === true. The flag is read live from users/{email-prefix} — it is
 * never cached in code — so flipping it in Firebase takes effect immediately.
 * Fails closed: while the document is still loading, or cannot be read (for
 * example because the security rules are not published), the page is not shown.
 */
export default function RequirePaid({ children }) {
  const location = useLocation();
  const { user, authReady, path, loading, error, doc, isPaid } =
    useMembership();

  if (!authReady) {
    return (
      <div className="gate-screen" role="status">
        <span className="gate-spinner" aria-hidden="true" />
        <p className="gate-text">Checking your login…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loading) {
    return (
      <div className="gate-screen" role="status">
        <span className="gate-spinner" aria-hidden="true" />
        <p className="gate-text">Checking your membership…</p>
      </div>
    );
  }

  if (error) {
    const denied = error?.code === "permission-denied";
    return (
      <div className="gate-screen" role="alert">
        <span className="gate-lock" aria-hidden="true">
          🔒
        </span>
        <h1 className="gate-title">We could not verify your membership</h1>
        <p className="gate-text">
          {denied
            ? `Firestore denied the read of ${path}: ${error.message}`
            : `Firestore could not read ${path || "the user document"} (${error.code || "unknown error"}): ${error.message || "Please try again in a moment."}`}
        </p>
        <div className="gate-actions">
          <Link to="/payment" className="gate-secondary">
            Go to Payment
          </Link>
          <Link to="/" className="gate-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!isPaid) {
    const name = doc?.userName || user?.name || "";
    return (
      <div className="gate-screen gate-paywall" role="alert">
        <span className="gate-lock" aria-hidden="true">
          🔒
        </span>
        <h1 className="gate-title">The MAANG Kit is a paid product</h1>
        <p className="gate-text">
          {name ? `${name}, your` : "Your"} current plan is{" "}
          <strong>{doc ? "Free" : "unknown"}</strong>. Upgrade to unlock the
          full preparation kit and the Resume Builder.
        </p>
        <ul className="gate-list">
          <li>MAANG preparation kit — DSA, System Design, LLD &amp; HLD</li>
          <li>Resume Builder with PDF export</li>
          <li>Access tied to this Firebase account — no coupon codes</li>
        </ul>
        <div className="gate-actions">
          <Link to="/payment" className="gate-cta">
            View payment options
          </Link>
          <Link to="/" className="gate-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
