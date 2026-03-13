import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const pos     = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)
  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current
    if (!dot || !ring) return
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY }; gsap.set(dot, { left: e.clientX, top: e.clientY }) }
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1
      gsap.set(ring, { left: pos.current.x, top: pos.current.y })
      raf.current = requestAnimationFrame(tick)
    }
    const onEnter = () => { dot.classList.add('hovering'); ring.classList.add('hovering') }
    const onLeave = () => { dot.classList.remove('hovering'); ring.classList.remove('hovering') }
    document.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(tick)
    const attach = () => document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave)
    })
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); obs.disconnect() }
  }, [])
  return { dotRef, ringRef }
}
