// Theme store: dark (default) <-> light, persisted in localStorage.
const KEY = 'kr-theme'
const listeners = new Set()

export const getTheme = () =>
  document.documentElement.getAttribute('data-theme') || 'dark'

export const applyTheme = (t) => {
  document.documentElement.setAttribute('data-theme', t)
  try {
    localStorage.setItem(KEY, t)
  } catch (e) {
    /* storage blocked — fine */
  }
  listeners.forEach((fn) => fn(t))
  window.dispatchEvent(new CustomEvent('themechange', { detail: t }))
}

export const toggleTheme = () => {
  const next = getTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}

export const subscribeTheme = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Run before React renders to prevent a flash of the wrong theme.
export const initTheme = () => {
  let t
  try {
    t = localStorage.getItem(KEY)
  } catch (e) {
    t = null
  }
  if (t !== 'light' && t !== 'dark') {
    t =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
  }
  document.documentElement.setAttribute('data-theme', t)
  return t
}
