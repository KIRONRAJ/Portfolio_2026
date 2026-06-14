import { useEffect, useState } from 'react'
import { profile, socials } from '../data/content'
import { scrollToTop } from '../lib/scroll'
import { click } from '../lib/sound'
import './Footer.css'

export default function Footer() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tickClock = () => {
      try {
        setClock(
          new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(new Date())
        )
      } catch (e) {
        setClock(new Date().toLocaleTimeString())
      }
    }
    tickClock()
    const id = setInterval(tickClock, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta" data-reveal>
          <span className="mono-label">// end_of_transmission</span>
          <h2 className="footer-big glitch" data-text="LET’S BUILD" onClick={() => { click(); scrollToTop() }}>
            LET’S BUILD
          </h2>
          <p className="footer-sub">Secure systems · clean interfaces · curious mind.</p>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <span className="footer-k">Links</span>
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="footer-link">
                {s.label} <span>↗</span>
              </a>
            ))}
          </div>

          <div className="footer-col">
            <span className="footer-k">Coordinates</span>
            <span className="footer-meta">{profile.location}</span>
            <span className="footer-meta">
              Wellington <span className="footer-clock">{clock}</span> NZST
            </span>
            <a className="footer-meta footer-phone" href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
              {profile.phone}
            </a>
            <span className="footer-meta">{profile.available}</span>
          </div>

          <div className="footer-col footer-col-end">
            <button className="footer-top" onClick={() => { click(); scrollToTop() }}>
              BACK_TO_TOP ↑
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
          <span>Designed &amp; built by {profile.fullName} · v1.0</span>
        </div>
      </div>
    </footer>
  )
}
