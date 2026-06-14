// Tiny synthesised UI sound layer (no assets). Off by default.
let enabled = false
let actx = null
const listeners = new Set()

const ensure = () => {
  if (!actx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (AC) actx = new AC()
  }
  if (actx && actx.state === 'suspended') actx.resume()
  return actx
}

export const isSoundOn = () => enabled
export const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
export const toggleSound = () => {
  enabled = !enabled
  if (enabled) {
    ensure()
    beep(880, 0.06, 'square', 0.04)
  }
  listeners.forEach((fn) => fn(enabled))
  return enabled
}

export const beep = (freq = 660, dur = 0.05, type = 'square', gain = 0.03) => {
  if (!enabled) return
  const c = ensure()
  if (!c) return
  try {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.value = freq
    o.connect(g)
    g.connect(c.destination)
    const t = c.currentTime
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.start(t)
    o.stop(t + dur)
  } catch (e) {
    /* no-op */
  }
}

export const tick = () => beep(1200, 0.02, 'square', 0.02)
export const click = () => beep(520, 0.06, 'square', 0.035)
