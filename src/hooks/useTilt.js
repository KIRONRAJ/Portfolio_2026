import { useEffect, useRef } from 'react'

/**
 * 3D tilt + cursor spotlight. Sets element transform on mousemove and
 * exposes --mx / --my (cursor position %) for a spotlight overlay.
 * Disabled on touch / reduced-motion.
 */
export default function useTilt(max = 8) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = null
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = (0.5 - py) * max
      const ry = (px - 0.5) * max
      el.style.setProperty('--mx', px * 100 + '%')
      el.style.setProperty('--my', py * 100 + '%')
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
      })
    }
    const leave = () => {
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
    }

    el.style.transition = 'transform 0.4s var(--ease)'
    el.style.transformStyle = 'preserve-3d'
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [max])

  return ref
}
