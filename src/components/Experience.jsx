import { experience } from '../data/content'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="section-index">03</span>
          <h2 className="section-title">Experience_Log</h2>
          <span className="section-kicker">// career trace</span>
        </div>

        <div className="exp-list">
          {experience.map((job, i) => (
            <article className="exp-row" data-reveal data-delay={i * 0.05} key={i}>
              <div className="exp-left">
                <span className="exp-period">{job.period}</span>
                {job.current && <span className="exp-live"><span className="blip" /> ACTIVE</span>}
              </div>

              <div className="exp-main">
                <h3 className="exp-role">{job.role}</h3>
                <p className="exp-org">
                  @ {job.org} <span className="exp-place">· {job.place}</span>
                </p>
                <ul className="exp-points">
                  {job.points.map((p, j) => (
                    <li key={j}>
                      <span className="exp-arrow">▹</span> {p}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="exp-num">0{experience.length - i}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
