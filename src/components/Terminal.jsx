import { useEffect, useMemo, useRef, useState } from 'react'
import {
  profile,
  about,
  skills,
  education,
  experience,
  projects,
  certifications,
  socials,
} from '../data/content'
import { tick } from '../lib/sound'
import './Terminal.css'

const L = (t = '', c = '') => ({ t, c })

const COMMANDS = ['help', 'whoami', 'about', 'skills', 'education', 'experience', 'projects', 'certs', 'contact', 'socials', 'resume', 'neofetch', 'ls', 'clear']

export default function Terminal() {
  const [history, setHistory] = useState([])
  const [value, setValue] = useState('')
  const [cmdLog, setCmdLog] = useState([])
  const [logIdx, setLogIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const wrapRef = useRef(null)

  const builders = useMemo(() => makeBuilders(), [])

  // boot greeting
  useEffect(() => {
    setHistory([
      { type: 'out', lines: builders.banner() },
      { type: 'out', lines: [L("Type 'help' to list commands, or click one below.", 'dim')] },
    ])
  }, [builders])

  // focus when scrolled into view
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
          }
        })
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history])

  const run = (raw) => {
    const input = raw.trim()
    const next = [...history, { type: 'in', cmd: raw }]
    if (!input) {
      setHistory(next)
      return
    }
    setCmdLog((c) => [...c, input])
    setLogIdx(-1)

    const [cmd, ...args] = input.split(/\s+/)
    const key = cmd.toLowerCase()

    if (key === 'clear' || key === 'cls') {
      setHistory([])
      return
    }
    const out = resolve(key, args, builders)
    setHistory([...next, { type: 'out', lines: out }])
  }

  const onKey = (e) => {
    if (e.key === 'Enter') {
      run(value)
      setValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!cmdLog.length) return
      const idx = logIdx < 0 ? cmdLog.length - 1 : Math.max(0, logIdx - 1)
      setLogIdx(idx)
      setValue(cmdLog[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (logIdx < 0) return
      const idx = logIdx + 1
      if (idx >= cmdLog.length) {
        setLogIdx(-1)
        setValue('')
      } else {
        setLogIdx(idx)
        setValue(cmdLog[idx])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const m = COMMANDS.find((c) => c.startsWith(value.toLowerCase()))
      if (m) setValue(m)
    } else {
      tick()
    }
  }

  const chip = (c) => {
    run(c)
    setValue('')
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <section id="terminal" className="section terminal-sec">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="section-index">05</span>
          <h2 className="section-title">Live_Terminal</h2>
          <span className="section-kicker">// explore via commands</span>
        </div>

        <div className="term" ref={wrapRef} data-reveal onClick={() => inputRef.current?.focus({ preventScroll: true })}>
          <div className="term-bar">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="term-bar-title">visitor@kironraj — zsh — 80×24</span>
          </div>

          <div className="term-body" ref={bodyRef}>
            {history.map((h, i) =>
              h.type === 'in' ? (
                <div className="term-in" key={i}>
                  <span className="term-prompt">visitor@kironraj:~$</span>
                  <span className="term-cmd">{h.cmd}</span>
                </div>
              ) : (
                <div className="term-out" key={i}>
                  {h.lines.map((ln, j) => (
                    <div className={`term-line ${ln.c}`} key={j}>
                      {ln.t === '' ? ' ' : ln.t}
                    </div>
                  ))}
                </div>
              )
            )}

            <div className="term-input-line">
              <span className="term-prompt">visitor@kironraj:~$</span>
              <input
                ref={inputRef}
                className="term-input"
                value={value}
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Terminal input"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
              />
              <span className="caret term-caret">&nbsp;</span>
            </div>
          </div>

          <div className="term-chips">
            {COMMANDS.map((c) => (
              <button className="term-chip" key={c} onClick={() => chip(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- command resolver ---------------- */
function resolve(key, args, b) {
  switch (key) {
    case 'help': return b.help()
    case 'whoami': return b.whoami()
    case 'about': return b.about()
    case 'skills': case 'stack': return b.skills()
    case 'education': case 'edu': return b.education()
    case 'experience': case 'work': case 'exp': return b.experience()
    case 'projects': case 'work-samples': return b.projects()
    case 'certs': case 'certifications': case 'certifals': return b.certs()
    case 'contact': return b.contact()
    case 'socials': case 'social': case 'links': return b.socials()
    case 'resume': case 'cv':
      if (typeof window !== 'undefined') window.open(profile.resume, '_blank', 'noopener')
      return [L('opening resume.pdf in a new tab…', 'ok')]
    case 'neofetch': case 'banner': return b.banner()
    case 'ls': case 'dir': return b.ls()
    case 'cat': return b.cat(args[0])
    case 'date': return [L(new Date().toString(), 'dim')]
    case 'echo': return [L(args.join(' '))]
    case 'sudo': return [L('[sudo] password for visitor: ', 'dim'), L('Permission denied. Nice try.', 'err')]
    case 'pwd': return [L('/home/visitor/portfolio')]
    case 'theme': return [L('active theme: matrix-green (locked)', 'ok')]
    case 'exit': case 'quit': return [L('this session cannot be closed. you live here now.', 'dim')]
    case 'rm': return [L('rm: operation not permitted on a portfolio this good.', 'err')]
    case 'hello': case 'hi': return [L('hello. type "help" to get started.', 'ok')]
    default: return [L(`command not found: ${key}`, 'err'), L("type 'help' for the list of commands.", 'dim')]
  }
}

/* ---------------- output builders ---------------- */
function makeBuilders() {
  const banner = () => [
    L('┌──────────────────────────────────────────────┐', 'green'),
    L('│   KIRON RAJ · SECURE SHELL · portfolio v1.0    │', 'green'),
    L('└──────────────────────────────────────────────┘', 'green'),
    L(''),
    L(`${profile.fullName}  ·  ${profile.role}`, 'ok'),
    L(`${profile.location}  ·  ${profile.available}`, 'dim'),
  ]

  const help = () => [
    L('AVAILABLE COMMANDS', 'green'),
    L('  whoami        identity summary'),
    L('  about         background & bio'),
    L('  skills        technical proficiency'),
    L('  education     academic history'),
    L('  experience    career log'),
    L('  projects      selected work'),
    L('  certs         certifications'),
    L('  contact       how to reach me'),
    L('  socials       external links'),
    L('  resume        open résumé (new tab)'),
    L('  neofetch      system summary'),
    L('  ls / cat      browse files'),
    L('  clear         clear the screen'),
    L(''),
    L('tip: ↑/↓ history · Tab autocompletes', 'dim'),
  ]

  const whoami = () => [
    L(profile.fullName, 'green'),
    L(profile.headline),
    L(''),
    L(profile.tagline, 'dim'),
  ]

  const aboutLines = () => [
    ...about.paragraphs.map((p) => L(p)),
    L(''),
    L(`location: ${profile.location}`, 'dim'),
  ]

  const skillsB = () => {
    const out = [L('TECHNICAL PROFICIENCY', 'green')]
    skills.forEach((g) => {
      out.push(L(''))
      out.push(L(`[${g.group}]`, 'ok'))
      out.push(L('  ' + g.items.join('  ·  ')))
    })
    return out
  }

  const educationB = () => {
    const out = [L('EDUCATION', 'green')]
    education.forEach((e) => {
      out.push(L(''))
      out.push(L(`  ${e.period}  ${e.degree}`, e.current ? 'ok' : ''))
      out.push(L(`            ${e.school}`, 'dim'))
    })
    return out
  }

  const experienceB = () => {
    const out = [L('EXPERIENCE LOG', 'green')]
    experience.forEach((j) => {
      out.push(L(''))
      out.push(L(`  ${j.period}  ${j.role}`, 'ok'))
      out.push(L(`            @ ${j.org} · ${j.place}`, 'dim'))
      j.points.forEach((p) => out.push(L(`            ▹ ${p}`)))
    })
    return out
  }

  const projectsB = () => {
    const out = [L('SELECTED WORK', 'green')]
    projects.forEach((p) => {
      out.push(L(''))
      out.push(L(`  [${p.index}] ${p.title}`, 'ok'))
      out.push(L(`        ${p.status}`, 'dim'))
      out.push(L(`        ${p.blurb}`))
      out.push(L(`        tags: ${p.tags.join(', ')}`, 'dim'))
    })
    return out
  }

  const certsB = () => {
    const out = [L(`CERTIFICATIONS (${certifications.length})`, 'green'), L('')]
    certifications.forEach((c) => out.push(L(`  ${c.year}  ${c.name}  ·  ${c.issuer}`)))
    return out
  }

  const contactB = () => [
    L('SECURE CHANNEL', 'green'),
    L(''),
    L(`  email     ${profile.email}`, 'ok'),
    ...socials.map((s) => L(`  ${s.label.toLowerCase().padEnd(9)} ${s.url}`)),
    L(''),
    L('or scroll to the contact module to transmit a message.', 'dim'),
  ]

  const socialsB = () => [
    L('EXTERNAL LINKS', 'green'),
    L(''),
    ...socials.map((s) => L(`  ${s.label.padEnd(10)} ${s.url}`)),
  ]

  const ls = () => [
    L('about.txt   experience.log   projects/   certs.db', 'green'),
    L('skills.json   contact.sh   resume.pdf', 'green'),
    L("use: cat <file>   (e.g. cat about.txt)", 'dim'),
  ]

  const FILES = {
    'about.txt': aboutLines,
    'experience.log': experienceB,
    'projects/': projectsB,
    'projects': projectsB,
    'certs.db': certsB,
    'skills.json': skillsB,
    'contact.sh': contactB,
    'education': educationB,
    'resume.pdf': () => [L('[binary file] run: resume   (opens in a new tab)', 'dim')],
  }

  const cat = (file) => {
    if (!file) return [L('usage: cat <file> — try "ls" first', 'dim')]
    const f = FILES[file]
    if (!f) return [L(`cat: ${file}: No such file or directory`, 'err')]
    return f()
  }

  return {
    banner,
    help,
    whoami,
    about: aboutLines,
    skills: skillsB,
    education: educationB,
    experience: experienceB,
    projects: projectsB,
    certs: certsB,
    contact: contactB,
    socials: socialsB,
    ls,
    cat,
  }
}
