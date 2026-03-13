import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'React',      level: 92 },
  { name: 'GSAP',       level: 88 },
  { name: 'CSS / SCSS', level: 90 },
  { name: 'Node.js',    level: 78 },
  { name: 'Three.js',   level: 70 },
  { name: 'Figma',      level: 85 },
]

const TIMELINE = [
  { year: '2019', title: 'Started Coding',  desc: 'Fell in love with frontend development and never looked back.' },
  { year: '2020', title: 'First Project',   desc: 'Built my first full-stack app and deployed it to production.' },
  { year: '2021', title: 'React Mastery',   desc: 'Went deep on React, GSAP animations and interactive UI.' },
  { year: '2022', title: 'Design Systems',  desc: 'Started building design systems and component libraries.' },
  { year: '2023', title: 'Open Source',     desc: 'Contributing to open source and building in public.' },
  { year: '2024', title: 'Going Further',   desc: 'Exploring 3D web, WebGL and advanced animation techniques.' },
]

export default function AboutPage() {
  const [photoError, setPhotoError] = useState(false)
  const nameRef     = useRef(null)
  const tagRef      = useRef(null)
  const bioRef      = useRef(null)
  const imgRef      = useRef(null)
  const ctaRef      = useRef(null)
  const skillsRef   = useRef([])
  const timelineRef = useRef([])

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())

    const ctx = gsap.context(() => {
      gsap.set([nameRef.current, tagRef.current, bioRef.current, ctaRef.current], { opacity: 0, y: 40 })
      gsap.set(imgRef.current, { opacity: 0, scale: 0.85 })

      const tl = gsap.timeline({ delay: 0.4 })
      tl.to(nameRef.current, { opacity: 1, y: 0, duration: 1,   ease: 'power4.out' })
        .to(tagRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to(bioRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(ctaRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to(imgRef.current,  { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }, '-=1.2')

      skillsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { opacity: 0, x: -30 })
        ScrollTrigger.create({
          trigger: el, start: 'top 88%',
          onEnter: () => {
            gsap.to(el, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.07, ease: 'power3.out' })
            const bar = el.querySelector('.skill-fill')
            if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.8, delay: i * 0.07 + 0.15, ease: 'power3.out', transformOrigin: 'left' })
          },
          once: true,
        })
      })

      timelineRef.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { opacity: 0, x: i % 2 === 0 ? -40 : 40 })
        ScrollTrigger.create({
          trigger: el, start: 'top 90%',
          onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.6, delay: i * 0.04, ease: 'power3.out' }),
          once: true,
        })
      })
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: "'Exo 2', sans-serif", overflowX: 'hidden' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 60px', background: 'rgba(1,2,1,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(57,255,20,0.08)', zIndex: 100 }}>
        <Link to="/" style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: '#39FF14', textDecoration: 'none', textShadow: '0 0 10px rgba(57,255,20,0.5)' }}>← Ben 10</Link>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 6, textTransform: 'uppercase', color: 'rgba(57,255,20,0.35)' }}>About · Me</span>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,140px) clamp(20px,5vw,80px) 80px', position: 'relative', gap: 'clamp(40px,6vw,80px)', maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(57,255,20,0.04) 1px,transparent 0)', backgroundSize: '30px 30px' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(57,255,20,0.01) 3px,rgba(57,255,20,0.01) 4px)' }} />

        {/* Text */}
        <div style={{ flex: 1, minWidth: 280, position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 6, textTransform: 'uppercase', color: '#39FF14', marginBottom: 16, textShadow: '0 0 10px #39FF14' }}>// Bio.init()</p>
          <h1 ref={nameRef} style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(36px,6vw,88px)', lineHeight: 0.95, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text)', marginBottom: 24 }}>
            ROHIT<br />
            <span style={{ color: '#39FF14', textShadow: '0 0 30px #39FF14, 0 0 60px rgba(57,255,20,0.3)' }}>GAIKWAD</span>
          </h1>
          <p ref={tagRef} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(57,255,20,0.6)', marginBottom: 32, borderLeft: '2px solid #39FF14', paddingLeft: 16 }}>Frontend Developer · UI Architect · Motion Designer</p>
          <p ref={bioRef} style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 520, marginBottom: 40 }}>
            I build immersive web experiences that blur the line between design and code.
            Passionate about motion, interaction, and pushing what's possible in the browser.
            Currently obsessed with GSAP, React and creative frontend development.
          </p>
          <div ref={ctaRef} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="mailto:you@email.com" style={{ fontFamily: "'Orbitron',monospace", fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#010201', background: '#39FF14', padding: '12px 28px', textDecoration: 'none', boxShadow: '0 0 20px rgba(57,255,20,0.4)' }}>Contact Me</a>
            <a href="#timeline" style={{ fontFamily: "'Orbitron',monospace", fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#39FF14', border: '1px solid rgba(57,255,20,0.4)', padding: '12px 28px', textDecoration: 'none' }}>My Journey</a>
          </div>
        </div>

        {/* Photo */}
        <div ref={imgRef} style={{ flexShrink: 0, width: 'clamp(240px,28vw,320px)', height: 'clamp(280px,33vw,380px)', position: 'relative', zIndex: 2 }}>
          <div style={{ position: 'absolute', top: -8, left: -8, right: 8, bottom: 8, border: '1px solid rgba(57,255,20,0.2)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 8, left: 8, right: -8, bottom: -8, border: '1px solid rgba(57,255,20,0.08)', pointerEvents: 'none' }} />
          {[{ top:0,left:0 },{ top:0,right:0 },{ bottom:0,left:0 },{ bottom:0,right:0 }].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', ...pos, width: 20, height: 20, borderTop: pos.bottom===undefined?'2px solid #39FF14':'none', borderBottom: pos.top===undefined?'2px solid #39FF14':'none', borderLeft: pos.right===undefined?'2px solid #39FF14':'none', borderRight: pos.left===undefined?'2px solid #39FF14':'none' }} />
          ))}
          {photoError ? (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0a1f0a,#030803)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(57,255,20,0.3)' }}>Your Photo</span>
            </div>
          ) : (
            <img src="/images/about/photo.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%) contrast(1.1)', display: 'block' }} onError={() => setPhotoError(true)} />
          )}
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: 'clamp(60px,8vw,80px) clamp(20px,5vw,80px)', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 6, textTransform: 'uppercase', color: '#39FF14', marginBottom: 8, textShadow: '0 0 10px #39FF14' }}>// Skills.load()</p>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(24px,4vw,52px)', color: 'var(--text)', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 56 }}>Arsenal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '28px 60px' }}>
          {SKILLS.map((skill, i) => (
            <div key={skill.name} ref={el => skillsRef.current[i] = el}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text)' }}>{skill.name}</span>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 2, color: '#39FF14' }}>{skill.level}%</span>
              </div>
              <div style={{ height: 2, background: 'rgba(57,255,20,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div className="skill-fill" style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${skill.level}%`, background: 'linear-gradient(90deg,#39FF14,rgba(57,255,20,0.5))', boxShadow: '0 0 8px #39FF14' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" style={{ padding: 'clamp(60px,8vw,80px) clamp(20px,5vw,80px) 120px', maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 6, textTransform: 'uppercase', color: '#39FF14', marginBottom: 8, textShadow: '0 0 10px #39FF14' }}>// Timeline.render()</p>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(24px,4vw,52px)', color: 'var(--text)', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 64 }}>Journey</h2>
        <div style={{ position: 'absolute', left: '50%', top: 180, bottom: 80, width: 1, background: 'linear-gradient(to bottom,rgba(57,255,20,0.4),rgba(57,255,20,0.05))', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'relative' }}>
          {TIMELINE.map((item, i) => (
            <div key={item.year} ref={el => timelineRef.current[i] = el} style={{ display: 'flex', justifyContent: i%2===0?'flex-start':'flex-end', marginBottom: 48, paddingLeft: i%2===0?0:'50%', paddingRight: i%2===0?'50%':0 }}>
              <div style={{ width: 'calc(100% - 48px)', padding: '24px 28px', background: 'rgba(57,255,20,0.03)', border: '1px solid rgba(57,255,20,0.12)', position: 'relative', marginLeft: i%2===0?0:48, marginRight: i%2===0?48:0 }}>
                <div style={{ position: 'absolute', top: '50%', [i%2===0?'right':'left']: -52, transform: 'translateY(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#39FF14', boxShadow: '0 0 12px #39FF14, 0 0 24px rgba(57,255,20,0.4)' }} />
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: '#39FF14', display: 'block', marginBottom: 6 }}>{item.year}</span>
                <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(57,255,20,0.08)', padding: '32px clamp(20px,5vw,60px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(57,255,20,0.25)' }}>© 2024 · Rohit Gaikwad</span>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(57,255,20,0.25)' }}>Built with React + GSAP</span>
      </footer>

      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  )
}
