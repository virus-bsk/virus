import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Remove the pre-paint brand logo from index.html. It exists so the very first
// frame shows the BSK Coding logo instead of a blank screen while this bundle
// downloads and parses. React renders into #root alongside it, then this takes
// it out of the way. Runs before render() so there is never a frame with both.
const boot = document.getElementById('bsk-boot')
if (boot) boot.remove()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
