import { certifications } from '../data/content'
import TiltCard from './TiltCard'
import './Certifications.css'

export default function Certifications() {
  const ticker = [...certifications, ...certifications]
  return (
    <section id="certs" className="section certs">
      {/* marquee */}
      <div className="cert-marquee" aria-hidden="true">
        <div className="cert-track">
          {ticker.map((c, i) => (
            <span className="cert-tick" key={i}>
              {c.name} <span className="cert-tick-dot">◇</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="section-head cert-head" data-reveal>
          <span className="section-index">✦</span>
          <h2 className="section-title">Certifications</h2>
          <span className="section-kicker">// {certifications.length} verified credentials</span>
        </div>

        <div className="cert-grid" data-reveal-group>
          {certifications.map((c, i) => (
            <TiltCard tilt={5} className="cert-card" key={i}>
              <span className="cert-year">{c.year}</span>
              <span className="cert-name">{c.name}</span>
              <span className="cert-issuer">{c.issuer}</span>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
