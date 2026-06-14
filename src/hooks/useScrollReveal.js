import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sets up scroll reveals once `ready` is true (i.e. after the preloader).
 *  - [data-reveal]         → single element fade + slide up
 *  - [data-reveal-group]   → staggered children
 *  - [data-delay="0.2"]    → optional per-element delay
 */
export default function useScrollReveal(ready) {
  useEffect(() => {
    if (!ready) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-reveal], [data-reveal-group] > *', { autoAlpha: 1, y: 0 })
        return
      }

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        const delay = parseFloat(el.dataset.delay || 0)
        gsap.fromTo(
          el,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power3.out',
            delay,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })

      gsap.utils.toArray('[data-reveal-group]').forEach((grp) => {
        gsap.fromTo(
          grp.children,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: { trigger: grp, start: 'top 85%', once: true },
          }
        )
      })
    })

    const t = setTimeout(() => ScrollTrigger.refresh(), 60)
    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [ready])
}
