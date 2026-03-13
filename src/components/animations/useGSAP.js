import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function useGSAP(fn, deps = []) {
  const scopeRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(fn, scopeRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scopeRef
}

export function useMagneticButton(strength = 0.4) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const onMove  = e => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX-(r.left+r.width/2))*strength, y: (e.clientY-(r.top+r.height/2))*strength, duration: 0.4, ease: 'power2.out' }) }
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])
  return ref
}
