import { about, profile, education, skills } from '../data/content'
import CountUp from './CountUp'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="section-index">02</span>
          <h2 className="section-title">About_Me</h2>
          <span className="section-kicker">// operator profile</span>
        </div>

        <div className="about-top">
          <div className="about-photo" data-reveal>
            <div className="about-photo-frame">
              <img
                src={profile.avatar}
                alt={profile.fullName}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentNode.classList.add('no-img')
                }}
              />
              <span className="about-photo-fallback">{profile.initials}</span>
              <span className="about-photo-corner tl" />
              <span className="about-photo-corner br" />
            </div>
            <div className="about-loc">
              <span className="blip" /> {profile.location}
            </div>
          </div>

          <div className="about-body">
            {about.paragraphs.map((p, i) => (
              <p className="about-para" data-reveal data-delay={i * 0.05} key={i}>
                {p}
              </p>
            ))}

            <div className="about-stats" data-reveal-group>
              {about.stats.map((s) => (
                <div className="about-stat" key={s.label}>
                  <span className="about-stat-val"><CountUp value={s.value} /></span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* education */}
        <div className="about-sub">
          <h3 className="about-subtitle" data-reveal>
            <span className="mono-label">Education_History</span>
          </h3>
          <div className="edu-list" data-reveal-group>
            {education.map((e, i) => (
              <div className={`edu-row ${e.current ? 'is-current' : ''}`} key={i}>
                <span className="edu-period">{e.period}</span>
                <div className="edu-meta">
                  <span className="edu-degree">{e.degree}</span>
                  <span className="edu-school">{e.school}</span>
                  {e.note && <span className="edu-note">{e.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* skills */}
        <div className="about-sub">
          <h3 className="about-subtitle" data-reveal>
            <span className="mono-label">Technical_Proficiency</span>
          </h3>
          <div className="skills-grid" data-reveal-group>
            {skills.map((g) => (
              <div className="skill-card" key={g.group}>
                <div className="skill-card-head">{g.group}</div>
                <ul className="skill-items">
                  {g.items.map((it) => (
                    <li key={it}>
                      <span className="skill-arrow">▹</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
