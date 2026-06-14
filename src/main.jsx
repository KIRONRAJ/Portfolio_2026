import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initTheme } from './lib/theme'
import './index.css'

// set theme before first paint (no flash)
initTheme()

// Note: StrictMode is intentionally omitted — it double-invokes effects in dev,
// which would mount/unmount the WebGL + Lenis instances twice.
createRoot(document.getElementById('root')).render(<App />)
