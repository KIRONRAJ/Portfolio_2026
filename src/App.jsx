import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import ParticleField from './components/ParticleField'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Terminal from './components/Terminal'
import Contact from './components/Contact'
import Footer from './components/Footer'

import useScrollReveal from './hooks/useScrollReveal'
import useScramble from './hooks/useScramble'
import { setLenis } from './lib/scroll'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady] = useState(false)
  const lenisRef = useRef(null)

  // smooth scroll + gsap integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis
    setLenis(lenis)
    lenis.stop()

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // release scroll once the preloader is done
  useEffect(() => {
    if (ready && lenisRef.current) {
      lenisRef.current.start()
      const t = setTimeout(() => ScrollTrigger.refresh(), 120)
      return () => clearTimeout(t)
    }
  }, [ready])

  useScrollReveal(ready)
  useScramble(ready)

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <ParticleField />

      {/* atmosphere */}
      <div className="fx-layer fx-grain" />
      <div className="fx-layer fx-scan" />
      <div className="fx-layer fx-vignette" />

      <Navbar />

      <main id="app">
        <Hero started={ready} />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Terminal />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
