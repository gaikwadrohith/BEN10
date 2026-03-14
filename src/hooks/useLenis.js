import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Global lenis instance so RouteWatcher can reset scroll position
let globalLenis = null
export function getLenis() { return globalLenis }

export function useLenis() {
  const ref = useRef(null)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Stop lenis interfering with GSAP ScrollTrigger pinning
      syncTouch: false,
    })
    ref.current = lenis
    globalLenis = lenis

    function raf(time) { lenis.raf(time * 1000) }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      globalLenis = null
    }
  }, [])
  return ref
}
