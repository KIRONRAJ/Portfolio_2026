import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, socials } from '../data/content'
import { scrollToId } from '../lib/scroll'
import { click } from '../lib/sound'
import useMagnetic from '../hooks/useMagnetic'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ started }) {
  const root = useRef(null)
  const nameRef = useRef(null)
  const resumeRef = useMagnetic(0.4)
  const contactRef = useMagnetic(0.4)

  // hide on mount (covered by preloader), then animate when started
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    gsap.set('[data-hero]', { autoAlpha: 0, y: 34 })
  }, [])

  useEffect(() => {
    if (!started) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set('[data-hero]', { autoAlpha: 1, y: 0 })
      return
    }
    const tl = gsap.timeline({ delay: 0.15 })
    tl.to('[data-hero]', {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.09,
    })
    return () => tl.kill()
  }, [started])

  // scroll parallax (depth)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-main', {
        yPercent: 16,
        autoAlpha: 0.5,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
      })
      gsap.to('.hero-side', {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
      })
    })
    return () => ctx.revert()
  }, [])

  // periodic glitch burst
  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    let to
    const burst = () => {
      el.classList.add('is-glitching')
      setTimeout(() => el.classList.remove('is-glitching'), 360)
      to = setTimeout(burst, 2600 + Math.random() * 3500)
    }
    to = setTimeout(burst, 2600)
    return () => clearTimeout(to)
  }, [])

  return (
    <section id="home" className="hero" ref={root}>
      <div className="container hero-grid">
        <div className="hero-main">
          <p className="hero-manifest" data-hero>
            <span className="blip" /> // IDENTITY_MANIFEST
          </p>

          <h1 className="hero-name" data-hero>
            <span
              ref={nameRef}
              className="glitch hero-name-line"
              data-text="KIRON"
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('is-glitching')
                setTimeout(() => e.currentTarget.classList.remove('is-glitching'), 400)
              }}
            >
              KIRON
            </span>
            <span className="hero-name-line hero-name-outline">RAJ</span>
          </h1>

          <p className="hero-role" data-hero>
            {profile.headline}
          </p>
          <p className="hero-tagline" data-hero>
            {profile.tagline}
          </p>

          <div className="hero-cta" data-hero>
            <a
              ref={resumeRef}
              className="btn btn--solid"
              data-magnetic
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              onClick={click}
            >
              Download_Résumé ↓
            </a>
            <button
              ref={contactRef}
              className="btn"
              data-magnetic
              onClick={() => {
                click()
                scrollToId('contact')
              }}
            >
              Init_Contact →
            </button>
          </div>

          <div className="hero-socials" data-hero>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="hero-social"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <aside className="hero-side" data-hero aria-hidden="true">
          <div className="hero-card">
            <div className="hero-card-top">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="hero-card-title">visitor@kironraj-desktop: ~/portfolio</span>
            </div>
            <div className="hero-card-body">
              <p><span className="cl-prompt">$</span> whoami</p>
              <p className="cl-out">{profile.fullName.toLowerCase().replace(/\s+/g, '_')}</p>
              <p><span className="cl-prompt">$</span> cat status.txt</p>
              <p className="cl-out cl-ok">▹ {profile.available}</p>
              <p className="cl-out">▹ {profile.location}</p>
              <p><span className="cl-prompt">$</span> ./run --mode=secure<span className="caret">&nbsp;</span></p>
            </div>
          </div>
        </aside>
      </div>

      <button className="hero-scroll" data-hero onClick={() => scrollToId('about')} aria-label="Scroll to about">
        <span>SCROLL</span>
        <span className="hero-scroll-line" />
      </button>
    </section>
  )
}
