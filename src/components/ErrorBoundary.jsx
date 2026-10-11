import { Component } from "react";
import { Link } from "react-router-dom";

// Auto-reload settings. When a page fails to load (commonly a stale cached
// bundle after a deploy — a hashed chunk 404s and the dynamic import throws),
// the boundary reloads automatically, up to MAX_AUTO_RELOADS times per visit,
// before falling back to the manual buttons.
const AUTO_RELOAD_KEY = "errorBoundaryAutoReloadCount";
const MAX_AUTO_RELOADS = 3; // automatic retry reloads per visit
// Kept short on purpose: the user should barely notice the interstitial.
// Long enough to avoid a tight reload loop against the network.
const AUTO_RELOAD_DELAY_MS = 800;

/** True for the "Failed to fetch dynamically imported module" chunk-404 class
 *  of errors — those are always fixed by a reload, never by staying put. */
function isChunkLoadError(error) {
  const msg = String(error?.message || error || "");
  return (
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Unable to preload CSS/i.test(msg) ||
    /Importing a module script failed/i.test(msg) ||
    /error loading dynamically imported module/i.test(msg)
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, reloading: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error, errorInfo);
    // Catch here as well as in the update hook. componentDidMount has already
    // run by the time an async failure happens, so relying on mount alone
    // means the auto-reload never fires for late lazy-import rejections.
    this.scheduleAutoReload(error);
  }

  componentDidUpdate(prevProps, prevState) {
    // React calls componentDidMount exactly once, while hasError is still
    // false — so a stale-chunk failure that happens after first paint was
    // never scheduling a reload and the user got the manual buttons instead.
    // Re-arm whenever hasError flips false -> true.
    if (!prevState.hasError && this.state.hasError) {
      this.scheduleAutoReload(this.state.error);
    }
  }

  componentWillUnmount() {
    if (this.reloadTimer) clearTimeout(this.reloadTimer);
  }

  handleReload = () => {
    if (this.reloadTimer) clearTimeout(this.reloadTimer);
    // Cache-busting navigation: a fresh query string is a fresh cache key, so
    // index.html is re-fetched (bringing the new hashed chunk names) instead of
    // being served from the browser's stale copy. replace() keeps the dead URL
    // out of the back-history stack.
    const url = window.location;
    const sep = url.search ? "&" : "?";
    window.location.replace(
      `${url.pathname}${url.search}${sep}_r=${Date.now()}${url.hash}`,
    );
  };

  scheduleAutoReload(error) {
    // Idempotent: componentDidCatch and componentDidUpdate can both fire for
    // the same error, and re-renders must not restart the timer.
    if (this.state.reloading || this.reloadTimer) return;

    const count = this.getReloadCount();
    if (count >= MAX_AUTO_RELOADS) {
      // Already retried enough this visit — stop looping, show manual UI.
      return;
    }

    this.setState({ reloading: true });
    this.setReloadCount(count + 1);

    // A stale-chunk 404 is definitely fixed by reloading, so skip the wait —
    // the user should not be shown an error screen at all in that case.
    const delay = isChunkLoadError(error) ? 0 : AUTO_RELOAD_DELAY_MS;
    this.reloadTimer = setTimeout(this.handleReload, delay);
  }

  getReloadCount() {
    try {
      return parseInt(window.sessionStorage.getItem(AUTO_RELOAD_KEY) || "0", 10);
    } catch {
      return 0;
    }
  }

  setReloadCount(value) {
    try {
      window.sessionStorage.setItem(AUTO_RELOAD_KEY, String(value));
    } catch {
      /* storage unavailable — ignore */
    }
  }

  resetReloadCount() {
    try {
      window.sessionStorage.removeItem(AUTO_RELOAD_KEY);
    } catch {
      /* storage unavailable — ignore */
    }
  }

  componentDidMount() {
    if (this.state.hasError) {
      // Error was already present at mount time (error thrown during the very
      // first render).
      this.scheduleAutoReload();
    } else {
      // Loaded fine: clear the retry counter so the next visit starts clean.
      this.resetReloadCount();
    }
  }

  render() {
    if (this.state.hasError) {
      const auto = this.state.reloading;
      return (
        <div className="error-boundary">
          <div className="error-boundary-card">
            <div className="error-boundary-icon">{auto ? "🔄" : "⚠️"}</div>
            <h1 className="error-boundary-title">
              {auto ? "Reloading automatically" : "Something went wrong"}
            </h1>
            <p className="error-boundary-text">
              {auto
                ? "We're refreshing the page for you now — this usually fixes itself."
                : "An unexpected error occurred while loading this page. This is usually caused by a stale cached version of the site."}
            </p>
            {auto && (
              <p className="error-boundary-auto">
                Reloading in {AUTO_RELOAD_DELAY_MS / 1000} seconds… If the page
                doesn't refresh automatically, use the button below.
              </p>
            )}
            {this.state.error && (
              <pre className="error-boundary-detail">
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <div className="error-boundary-actions">
              <button
                type="button"
                className="error-boundary-btn error-boundary-primary"
                onClick={this.handleReload}
              >
                🔄 Reload Page
              </button>
              <Link
                to="/"
                className="error-boundary-btn error-boundary-secondary"
              >
                🏠 Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

