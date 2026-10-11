import "./LogoLoader.css";

/**
 * LogoLoader — the <Suspense> fallback shown while a lazily-imported route
 * chunk is being fetched and evaluated. Every page in App.jsx is lazy-loaded,
 * so this is what the user sees during the first paint of any navigation.
 *
 * The logo lives in public/ so it is referenced through BASE_URL — that keeps
 * it working on both the custom domain (base "/") and GitHub Pages
 * (base "/<repo>"), same convention as the favicon links in index.html.
 */
function LogoLoader({ caption = "Loading" }) {
  const logoSrc = `${import.meta.env.BASE_URL}bskcodingimg1.png`;

  return (
    <div className="logo-loader" role="status" aria-live="polite">
      <div className="logo-loader-ring">
        {/* width/height are the real pixel size of the asset — declaring them
            lets the browser reserve space and avoids a layout shift while the
            image loads. CSS still scales it down to fit the ring. */}
        <img src={logoSrc} alt="BSK Coding" width="420" height="182" />
      </div>
      <p className="logo-loader-caption">{caption}</p>
    </div>
  );
}

export default LogoLoader;
