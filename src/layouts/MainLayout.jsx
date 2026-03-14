import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { useLenis } from '@/hooks/useLenis'
import { useCursor } from '@/hooks/useCursor'

export default function MainLayout({ children }) {
  useLenis()
  const { dotRef, ringRef } = useCursor()
  const { pathname } = useLocation()

  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight
      if (max <= 0) return
      gsap.set(bar, { scaleX: window.scrollY / max })
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div id="scroll-progress" />
      <Navbar />
      <main>{children}</main>
      {pathname !== '/about' && <Footer />}
    </>
  )
}