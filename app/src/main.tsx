import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.tsx'

document.documentElement.classList.add('js')

/* install: keep the browser's install event so our own Install button can open it later */
declare global {
  interface Window {
    __installPrompt?: Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }
  }
}
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.__installPrompt = e as Window['__installPrompt']
  window.dispatchEvent(new Event('install-ready'))
})

/* offline support; a new version reloads right away if the app has only just opened */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  const hadController = !!navigator.serviceWorker.controller
  navigator.serviceWorker
    .register('./sw.js')
    .then((reg) => reg.update())
    .catch(() => {})
  let reloaded = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloaded) return
    if (performance.now() < 15000) {
      reloaded = true
      location.reload()
    }
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
