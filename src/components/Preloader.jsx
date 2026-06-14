import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Preloader.css'

const BOOT = [
  'initializing kironraj.sys',
  'mounting /identity ............... ok',
  'loading modules [ security · network · fullstack ] ... ok',
  'decrypting credentials ........... ok',
  'establishing secure channel ...... ok',
]

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const pctRef = useRef(null)
  const barRef = useRef(null)
  const grantRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const counter = { v: 0 }

    const tl = gsap.timeline({
      onComplete: () => onDone && onDone(),
    })

    if (reduced) {
      gsap.set('.pl-line', { autoAlpha: 1 })
      if (pctRef.current) pctRef.current.textContent = '100'
      if (barRef.current) barRef.current.style.width = '100%'
      tl.to(root.current, { autoAlpha: 0, duration: 0.4, delay: 0.4 }).set(root.current, { display: 'none' })
      return () => tl.kill()
    }

    tl.to('.pl-line', { autoAlpha: 1, duration: 0.18, stagger: 0.16, ease: 'none' }, 0.1)
      .to(
        counter,
        {
          v: 100,
          duration: 1.7,
          ease: 'power1.inOut',
          onUpdate: () => {
            const v = Math.round(counter.v)
            if (pctRef.current) pctRef.current.textContent = String(v).padStart(3, '0')
            if (barRef.current) barRef.current.style.width = v + '%'
          },
        },
        0.2
      )
      .to(grantRef.current, { autoAlpha: 1, duration: 0.05 }, '>-0.05')
      .fromTo(
        grantRef.current,
        { filter: 'blur(6px)' },
        { filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' },
        '<'
      )
      .to('.pl-boot, .pl-meter', { autoAlpha: 0, duration: 0.3 }, '+=0.35')
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.05')
      .set(root.current, { display: 'none' })

    return () => tl.kill()
  }, [onDone])

  return (
    <div className="preloader" ref={root}>
      <div className="pl-inner">
        <div className="pl-boot">
          {BOOT.map((l, i) => (
            <div className="pl-line" key={i}>
              <span className="pl-prompt">root@kironraj:~$</span> {l}
            </div>
          ))}
        </div>

        <div className="pl-meter">
          <div className="pl-meter-top">
            <span>LOADING_PORTFOLIO</span>
            <span>
              <span ref={pctRef}>000</span>%
            </span>
          </div>
          <div className="pl-track">
            <div className="pl-bar" ref={barRef} />
          </div>
        </div>

        <div className="pl-grant" ref={grantRef}>
          ACCESS_GRANTED
        </div>
      </div>
    </div>
  )
}
