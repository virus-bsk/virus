import { useEffect } from 'react'
import App from './App.jsx'

// Owns the pre-paint boot-loader handoff. It lives in its own file (not
// main.jsx) because main.jsx has no exports, which would trip
// react-refresh/only-export-components: "Fast refresh only works when a file
// has exports. Move your component(s) to a separate file."
export default function Root() {
  // Hand off from the pre-paint boot loader (inline SVG + CSS in index.html).
  // The loader painted before this bundle existed; now that React has mounted,
  // fade it out and let the app show. Defined inline in index.html so it is
  // ready even before this module downloads. The 2.5s timeout is a fallback
  // in case the inline definition never ran (e.g. blocked script).
  useEffect(() => {
    if (typeof window.__bskHideBootLoader === 'function') {
      window.__bskHideBootLoader()
    } else {
      const fallback = setTimeout(() => {
        document.getElementById('bsk-boot')?.remove()
      }, 2500)
      return () => clearTimeout(fallback)
    }
  }, [])

  return <App />
}