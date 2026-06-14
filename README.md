# KIRON RAJ — Portfolio

An **awwwards-level**, hybrid *cyber + 3D* portfolio for Kiron Raj — Master's student in Cyber Security, Full Stack & Network Engineer.

Built with **React + Vite + Three.js + GSAP + Lenis**.

---

## ✦ Features

- **WebGL particle hero** — a custom GLSL shader "data sphere" (Three.js) that distorts with simplex noise and reacts to the mouse. Adapts to the active theme.
- **Dark / light mode** — toggle in the navbar (sun/moon), remembered in `localStorage`, respects your OS preference on first visit, no flash on load.
- **Custom magnetic cursor** — blend-mode cursor with magnetic pull on buttons and a text-caret state over inputs.
- **3D tilt + spotlight cards** — project and certification cards tilt toward the cursor with a tracking glow.
- **Smooth scroll** — Lenis-powered inertia scrolling, integrated with GSAP ScrollTrigger.
- **Scroll-driven animations** — section reveals, staggered grids, hero parallax, count-up stats, a **scramble/decode** effect on section titles, a top **scroll-progress** bar, and an animated terminal-boot **preloader**.
- **Interactive terminal** — a real, typeable shell. Try `help`, `whoami`, `projects`, `cat about.txt`, `neofetch`. Supports `↑/↓` history and `Tab` autocomplete.
- **Glitch typography, scanlines & film grain** for the cyber aesthetic.
- **Synthesised UI sound** (toggle in the navbar — off by default, no audio files).
- Fully **responsive** + honours `prefers-reduced-motion`.
- **0 npm vulnerabilities** (Vite 7 + pinned esbuild).

---

## ✦ Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## ✦ Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## ✦ Deploy

The `dist/` folder is a static site — drop it on any host:

- **Netlify / Vercel** — connect the repo, build command `npm run build`, publish dir `dist`.
- **GitHub Pages** — push `dist/` (the build already uses relative asset paths via `base: './'`).
- **Your own host / cPanel** — upload the contents of `dist/`.

---

## ✦ Editing your content

Everything is data-driven. Open **`src/data/content.js`** and edit the objects:

| Object | What it controls |
|---|---|
| `profile` | name, role, location, email, résumé link, avatar |
| `about` | bio paragraphs + headline stats |
| `education` | academic history |
| `skills` | the three proficiency groups |
| `certifications` | the 11 certs (marquee + grid + terminal) |
| `experience` | the career log |
| `projects` | featured research + project cards |
| `socials` | external links |

No component edits are needed — the whole site re-renders from that file.

> Tip: the résumé button points at `profile.resume` (`https://kironraj.com/resume.pdf`). Update it if your résumé moves.

---

## ✦ Structure

```
src/
├─ main.jsx              app entry
├─ App.jsx               layout + smooth-scroll + preloader gate
├─ index.css            design system (colours, type, fx)
├─ data/content.js       ← all your content
├─ lib/                  scroll + sound helpers
├─ hooks/                magnetic + scroll-reveal hooks
└─ components/           Preloader, Cursor, ParticleField, Navbar,
                         Hero, About, Experience, Projects,
                         Certifications, Terminal, Contact, Footer
```

Designed & built for Kiron Raj. v1.0
