import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // skip on touch / coarse pointers
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate(${rx}px, ${ry}px)`
    }

    const over = (e) => {
      const el = e.target.closest('a, button, [data-magnetic], input, textarea, [data-cursor]')
      if (!el) {
        ring.classList.remove('is-hover', 'is-text')
        return
      }
      if (el.matches('input, textarea') || el.dataset.cursor === 'text') {
        ring.classList.add('is-text')
        ring.classList.remove('is-hover')
      } else {
        ring.classList.add('is-hover')
        ring.classList.remove('is-text')
      }
    }
    const down = () => ring.classList.add('is-down')
    const up = () => ring.classList.remove('is-down')
    const leaveWin = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const enterWin = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leaveWin)
    document.addEventListener('mouseenter', enterWin)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leaveWin)
      document.removeEventListener('mouseenter', enterWin)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
