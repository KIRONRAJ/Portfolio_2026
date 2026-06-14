import { useEffect, useState } from 'react'
import { nav, profile } from '../data/content'
import { scrollToId, scrollToTop } from '../lib/scroll'
import { toggleSound, isSoundOn, subscribe, tick, click } from '../lib/sound'
import { toggleTheme, getTheme, subscribeTheme } from '../lib/theme'
import useMagnetic from '../hooks/useMagnetic'
import './Navbar.css'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
)
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [sound, setSound] = useState(isSoundOn())
  const [theme, setTheme] = useState(getTheme())
  const [scrolled, setScrolled] = useState(false)
  const logoRef = useMagnetic(0.5)

  useEffect(() => subscribe(setSound), [])
  useEffect(() => subscribeTheme(setTheme), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const go = (id) => {
    click()
    setOpen(false)
    scrollToId(id)
  }

  const flipTheme = () => {
    click()
    setTheme(toggleTheme())
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <button
          ref={logoRef}
          className="nav-logo"
          data-magnetic
          onClick={() => {
            click()
            scrollToTop()
          }}
          aria-label="Back to top"
        >
          <span className="nav-logo-b">{'<'}</span>KR
          <span className="nav-logo-slash">/</span>
          <span className="nav-logo-b">{'>'}</span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {nav.map((n, i) => (
            <button
              key={n.id}
              className={`nav-link ${active === n.id ? 'is-active' : ''}`}
              onClick={() => go(n.id)}
              onMouseEnter={tick}
            >
              <span className="nav-num">0{i + 1}</span>
              <span className="nav-text">{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <button
            className="nav-icon-btn nav-theme"
            onClick={flipTheme}
            onMouseEnter={tick}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className={`nav-icon-btn nav-sound ${sound ? 'is-on' : ''}`}
            onClick={() => setSound(toggleSound())}
            aria-label="Toggle sound"
            title={sound ? 'Sound on' : 'Sound off'}
          >
            <span className="nav-sound-bars" aria-hidden="true">
              <i></i><i></i><i></i><i></i>
            </span>
          </button>

          <a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer" onClick={click}>
            Résumé
          </a>

          <button
            className={`nav-burger ${open ? 'is-open' : ''}`}
            onClick={() => {
              click()
              setOpen((o) => !o)
            }}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`nav-mobile ${open ? 'is-open' : ''}`}>
        {nav.map((n, i) => (
          <button key={n.id} className="nav-mobile-link" onClick={() => go(n.id)}>
            <span className="nav-num">0{i + 1}</span>
            {n.label}
          </button>
        ))}
        <a className="nav-mobile-resume" href={profile.resume} target="_blank" rel="noreferrer">
          Download Résumé ↗
        </a>
      </div>
    </header>
  )
}
