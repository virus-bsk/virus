import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Remove the pre-paint loader from index.html. It exists so the very first
// frame is not blank while this bundle downloads and parses; React renders
// into #root alongside it and then this takes it out of the way.
// Runs before render() so there is never a frame with both visible.
const boot = document.getElementById('bsk-boot')
if (boot) boot.remove()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
