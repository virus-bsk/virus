import { BASENAME } from "../utils/basePath";

// React twin of the pre-paint boot loader (inline in index.html): the same
// BSK logo inside the same rotating cyan/electric-blue ring. Used as the
// lazy-route Suspense fallback and by the auth/membership gates, so the logo
// stays on screen during EVERY loading state instead of only the first page
// load (the index.html overlay is removed permanently on React mount).
//
// The artwork ships once as public/boot-logo.svg. Its URL is built from the
// runtime BASENAME (same detection the router uses) because the build has
// Vite base "/" but may be served from a GitHub Pages sub-path; an absolute
// path also survives client-side routes like /maang/basic-dsa that would
// break a document-relative URL.
const LOGO_SRC = `${BASENAME === "/" ? "" : BASENAME}/boot-logo.svg`;

export default function BrandLoader({ label }) {
  return (
    <div
      className="brand-loader"
      role="status"
      aria-live="polite"
      aria-label={label || "Loading BSK Coding"}
    >
      <div className="brand-loader-ring" aria-hidden="true">
        <img
          className="brand-loader-logo"
          src={LOGO_SRC}
          alt=""
          width="738"
          height="458"
        />
      </div>
      {label ? <p className="brand-loader-label">{label}</p> : null}
    </div>
  );
}
