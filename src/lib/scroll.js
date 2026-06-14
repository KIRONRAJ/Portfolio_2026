// tiny shared store so any component can drive the Lenis instance
let lenis = null

export const setLenis = (l) => {
  lenis = l
}

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.25 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.25 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
