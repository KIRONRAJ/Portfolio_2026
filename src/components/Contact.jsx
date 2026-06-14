import { useState } from 'react'
import { contact, profile, socials } from '../data/content'
import { click } from '../lib/sound'
import useMagnetic from '../hooks/useMagnetic'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const btnRef = useMagnetic(0.35)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    click()
    const subject = encodeURIComponent(`Secure transmission from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `Identity: ${form.name}\nReturn address: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="section-index">06</span>
          <h2 className="section-title">Get_In_Touch</h2>
          <span className="section-kicker">// what’s next?</span>
        </div>

        <div className="contact-grid">
          <div className="contact-intro" data-reveal>
            <p className="contact-lead">{contact.intro}</p>

            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>

            {profile.phone && (
              <a className="contact-phone" href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
                {profile.phone}
              </a>
            )}

            <div className="contact-links">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="contact-link">
                  <span className="contact-link-label">{s.label}</span>
                  <span className="contact-link-handle">{s.handle}</span>
                  <span className="contact-link-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={submit} data-reveal>
            <div className="cf-bar">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="cf-bar-title">contact_module.sh</span>
            </div>

            <div className="cf-body">
              <label className="cf-field">
                <span className="cf-prompt">root@visitor:~$ Identity</span>
                <input required value={form.name} onChange={set('name')} placeholder="your name" spellCheck="false" />
              </label>

              <label className="cf-field">
                <span className="cf-prompt">root@visitor:~$ Return_Address</span>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="you@domain.com" spellCheck="false" />
              </label>

              <label className="cf-field">
                <span className="cf-prompt">root@visitor:~$ Payload</span>
                <textarea required rows="4" value={form.message} onChange={set('message')} placeholder="your message…" />
              </label>

              <button ref={btnRef} type="submit" className="btn btn--solid cf-send" data-magnetic>
                {sent ? '✓ Transmission_Ready' : './execute_send.sh →'}
              </button>
              {sent && (
                <p className="cf-status">
                  <span className="blip" /> channel opened — your mail client should appear.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
