import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Root() {
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
