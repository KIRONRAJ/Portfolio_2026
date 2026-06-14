import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Counts up a leading number (e.g. "8+", "11") when scrolled into view. */
export default function CountUp({ value }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const m = String(value).match(/^(\d+)(.*)$/)
    if (!m) {
      el.textContent = value // non-numeric (e.g. ∞)
      return
    }
    const target = parseInt(m[1], 10)
    const suffix = m[2] || ''
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value
      return
    }
    el.textContent = '0' + suffix
    const obj = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix
          },
        }),
    })
    return () => st.kill()
  }, [value])

  return <span ref={ref} />
}
