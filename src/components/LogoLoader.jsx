import "./LogoLoader.css";

/**
 * LogoLoader — the <Suspense> fallback shown while a lazily-imported route
 * chunk is being fetched and evaluated. Every page in App.jsx is lazy-loaded,
 * so this is what the user sees during the first paint of any navigation.
 *
 * Deliberately image-free: the center mark is pure CSS text, so the loader
 * never waits on a logo download (which made it appear late on slow
 * connections). Kept in sync with the pre-paint #bsk-boot block in
 * index.html so the hand-off from static HTML to React is seamless.
 */
function LogoLoader({ caption = "Loading" }) {
  return (
    <div className="logo-loader" role="status" aria-live="polite">
      <div className="logo-loader-ring">
        <span className="logo-loader-word" aria-hidden="true">
          <span className="logo-loader-word-top">BSK</span>
          <span className="logo-loader-word-sub">Coding</span>
        </span>
      </div>
      <p className="logo-loader-caption">{caption}</p>
    </div>
  );
}

export default LogoLoader;
