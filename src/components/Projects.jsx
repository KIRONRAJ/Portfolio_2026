import { projects } from '../data/content'
import TiltCard from './TiltCard'
import './Projects.css'

function Tags({ tags }) {
  return (
    <div className="proj-tags">
      {tags.map((t) => (
        <span className="tag" key={t}>
          {t}
        </span>
      ))}
    </div>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="section-index">04</span>
          <h2 className="section-title">Selected_Work</h2>
          <span className="section-kicker">// academic & applied</span>
        </div>

        {/* featured */}
        <article className="proj-featured" data-reveal>
          <div className="proj-featured-meta">
            <span className="proj-index">{featured.index}</span>
            <span className="proj-status">{featured.status}</span>
            <Tags tags={featured.tags} />
          </div>
          <div className="proj-featured-body">
            <h3 className="proj-featured-title">{featured.title}</h3>
            <p className="proj-featured-desc">{featured.description}</p>
            <span className="proj-line" />
          </div>
        </article>

        {/* grid */}
        <div className="proj-grid">
          {rest.map((p) => (
            <TiltCard as="article" tilt={6} className="proj-card" data-reveal key={p.index}>
              <div className="proj-card-top">
                <span className="proj-index">{p.index}</span>
                <span className="proj-status">{p.status}</span>
              </div>
              <h3 className="proj-card-title">{p.title}</h3>
              <p className="proj-card-desc">{p.description}</p>
              <Tags tags={p.tags} />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
