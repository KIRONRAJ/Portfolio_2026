import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&_/<>*'

function scramble(el, finalText) {
  let frame = 0
  const total = finalText.length
  const id = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < frame) return finalText[i]
        return GLYPHS[(Math.random() * GLYPHS.length) | 0]
      })
      .join('')
    frame += 0.5
    if (frame >= total) {
      el.textContent = finalText
      clearInterval(id)
    }
  }, 28)
  return id
}

/** Scrambles/decodes all `.section-title` elements when scrolled into view. */
export default function useScramble(ready) {
  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const intervals = []
    const triggers = []
    document.querySelectorAll('.section-title').forEach((el) => {
      const finalText = el.textContent
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 86%',
        once: true,
        onEnter: () => intervals.push(scramble(el, finalText)),
      })
      triggers.push(st)
    })

    return () => {
      intervals.forEach(clearInterval)
      triggers.forEach((t) => t.kill())
    }
  }, [ready])
}
