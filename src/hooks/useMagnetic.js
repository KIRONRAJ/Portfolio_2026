import { useEffect, useRef } from 'react'

/**
 * Magnetic hover: the element drifts toward the cursor while hovered,
 * snapping back on leave. Disabled on touch devices.
 */
export default function useMagnetic(strength = 0.4) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    let rafId = null
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      })
    }
    const leave = () => {
      if (rafId) cancelAnimationFrame(rafId)
      el.style.transform = 'translate(0px, 0px)'
    }

    el.style.transition = 'transform 0.35s cubic-bezier(0.22,1,0.36,1)'
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [strength])

  return ref
}
