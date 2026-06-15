import { useState } from 'react'
import { contact, profile, socials } from '../data/content'
import { click } from '../lib/sound'
import useMagnetic from '../hooks/useMagnetic'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const btnRef = useMagnetic(0.35)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Netlify Forms: AJAX POST to "/" with url-encoded body incl. form-name.
  const submit = async (e) => {
    e.preventDefault()
    click()
    setStatus('sending')
    try {
      const body = new URLSearchParams(new FormData(e.target)).toString()
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!res.ok) throw new Error('network')
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  const btnLabel =
    status === 'sending'
      ? 'transmitting…'
      : status === 'sent'
      ? '✓ Transmission_received'
      : status === 'error'
      ? '⚠ Retry_send →'
      : './execute_send.sh →'

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

          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={submit}
            data-reveal
          >
            {/* required so Netlify routes the AJAX POST to the right form */}
            <input type="hidden" name="form-name" value="contact" />
            {/* honeypot: hidden from humans, catches bots */}
            <p className="cf-hp" aria-hidden="true">
              <label>
                Don’t fill this out: <input name="bot-field" tabIndex="-1" autoComplete="off" />
              </label>
            </p>

            <div className="cf-bar">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="cf-bar-title">contact_module.sh</span>
            </div>

            <div className="cf-body">
              <label className="cf-field">
                <span className="cf-prompt">root@visitor:~$ Identity</span>
                <input required name="name" value={form.name} onChange={set('name')} placeholder="your name" spellCheck="false" />
              </label>

              <label className="cf-field">
                <span className="cf-prompt">root@visitor:~$ Return_Address</span>
                <input required type="email" name="email" value={form.email} onChange={set('email')} placeholder="you@domain.com" spellCheck="false" />
              </label>

              <label className="cf-field">
                <span className="cf-prompt">root@visitor:~$ Payload</span>
                <textarea required name="message" rows="4" value={form.message} onChange={set('message')} placeholder="your message…" />
              </label>

              <button
                ref={btnRef}
                type="submit"
                className="btn btn--solid cf-send"
                data-magnetic
                disabled={status === 'sending' || status === 'sent'}
              >
                {btnLabel}
              </button>

              {status === 'sent' && (
                <p className="cf-status">
                  <span className="blip" /> transmission received — I’ll reply to your inbox soon.
                </p>
              )}
              {status === 'error' && (
                <p className="cf-status cf-status-err">
                  connection refused — email me directly at {profile.email}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
