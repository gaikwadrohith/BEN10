import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ALIENS = [
  { name: 'Heatblast',   img: '/images/aliens/heatblast.png',   color: '#FF4500', species: 'Pyronite'      },
  { name: 'Four Arms',   img: '/images/aliens/fourarms.png',    color: '#CC2200', species: 'Tetramand'     },
  { name: 'XLR8',        img: '/images/aliens/xlr8.png',        color: '#1E90FF', species: 'Kineceleran'   },
  { name: 'Diamondhead', img: '/images/aliens/diamondhead.png', color: '#00E5FF', species: 'Petrosapien'   },
  { name: 'Grey Matter', img: '/images/aliens/greymatter.png',  color: '#B0C4DE', species: 'Galvan'        },
  { name: 'Stinkfly',    img: '/images/aliens/stinkfly.png',    color: '#9ACD32', species: 'Lepidopterran' },
  { name: 'Ghostfreak',  img: '/images/aliens/ghostfreak.png',  color: '#7B68EE', species: 'Ectonurite'    },
  { name: 'Wildmutt',    img: '/images/aliens/wildmutt.png',    color: '#8B4513', species: 'Vulpimancer'   },
  { name: 'Upgrade',     img: '/images/aliens/upgrade.png',     color: '#00BFFF', species: 'Mechamorph'    },
  { name: 'Ripjaws',     img: '/images/aliens/ripjaws.png',     color: '#006994', species: 'Volann'        },
]

// SVG Omnitrix Watch — faithful to classic design
function OmnitrixSVG({ active }) {
  return (
    <svg viewBox="0 0 220 280" width="220" height="280" style={{ filter: active ? 'drop-shadow(0 0 32px #39FF14) drop-shadow(0 0 64px rgba(57,255,20,0.4))' : 'drop-shadow(0 0 8px rgba(57,255,20,0.2))', transition: 'filter 0.8s ease' }}>
      {/* Band top */}
      <rect x="78" y="2" width="64" height="40" rx="10" fill="#1a2a1a" stroke="#39FF14" strokeWidth="1.5"/>
      <rect x="86" y="10" width="48" height="4" rx="2" fill="#39FF14" opacity="0.3"/>
      <rect x="86" y="18" width="48" height="4" rx="2" fill="#39FF14" opacity="0.2"/>
      <rect x="86" y="26" width="48" height="4" rx="2" fill="#39FF14" opacity="0.1"/>

      {/* Outer watch case */}
      <rect x="22" y="38" width="176" height="160" rx="24" fill="#0d1a0d" stroke={active ? '#39FF14' : '#1a4a1a'} strokeWidth="2.5"/>

      {/* Inner bezel */}
      <rect x="30" y="46" width="160" height="144" rx="20" fill="#050805" stroke={active ? '#1a7a00' : '#0d2a0d'} strokeWidth="1.5"/>

      {/* Screen */}
      <rect x="42" y="56" width="136" height="124" rx="14" fill={active ? '#0a1a0a' : '#040804'}/>

      {/* Screen glow when active */}
      {active && (
        <rect x="42" y="56" width="136" height="124" rx="14"
          fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.6"/>
      )}

      {/* Hourglass / DNA symbol in center */}
      <g transform="translate(110,118)">
        {/* Outer ring */}
        <circle cx="0" cy="0" r="36" fill="none" stroke={active ? '#39FF14' : '#1a4a1a'} strokeWidth="2.5"
          strokeDasharray={active ? 'none' : '6 4'} opacity={active ? 1 : 0.5}/>

        {/* Inner ring */}
        <circle cx="0" cy="0" r="24" fill={active ? 'rgba(57,255,20,0.08)' : 'rgba(57,255,20,0.02)'}
          stroke={active ? '#39FF14' : '#1a4a1a'} strokeWidth="1.5" opacity={active ? 0.8 : 0.4}/>

        {/* Hourglass shape */}
        <path d="M-14,-24 L14,-24 L0,0 L14,24 L-14,24 L0,0 Z"
          fill={active ? '#39FF14' : '#1a4a1a'} opacity={active ? 0.9 : 0.3}/>

        {/* Center dot */}
        <circle cx="0" cy="0" r="5" fill={active ? '#ffffff' : '#0d2a0d'}
          style={{ filter: active ? 'drop-shadow(0 0 6px #39FF14)' : 'none' }}/>
      </g>

      {/* Side buttons */}
      <rect x="13" y="88" width="9" height="28" rx="3" fill="#0d1a0d" stroke={active ? '#39FF14' : '#1a4a1a'} strokeWidth="1.5"/>
      <rect x="198" y="88" width="9" height="28" rx="3" fill="#0d1a0d" stroke={active ? '#39FF14' : '#1a4a1a'} strokeWidth="1.5"/>

      {/* Band bottom */}
      <rect x="78" y="198" width="64" height="78" rx="10" fill="#1a2a1a" stroke={active ? '#39FF14' : '#1a4a1a'} strokeWidth="1.5"/>
      <rect x="86" y="206" width="48" height="4" rx="2" fill="#39FF14" opacity="0.3"/>
      <rect x="86" y="214" width="48" height="4" rx="2" fill="#39FF14" opacity="0.2"/>
      {/* Buckle */}
      <rect x="88" y="258" width="44" height="12" rx="6" fill={active ? '#39FF14' : '#1a4a1a'}
        style={{ filter: active ? 'drop-shadow(0 0 6px #39FF14)' : 'none' }}/>

      {/* Scan line animation */}
      {active && (
        <>
          <line x1="42" y1="90" x2="178" y2="90" stroke="#39FF14" strokeWidth="0.5" opacity="0.3" className="scan-h"/>
          <line x1="42" y1="110" x2="178" y2="110" stroke="#39FF14" strokeWidth="0.5" opacity="0.2"/>
          <line x1="42" y1="130" x2="178" y2="130" stroke="#39FF14" strokeWidth="0.5" opacity="0.2"/>
          <line x1="42" y1="150" x2="178" y2="150" stroke="#39FF14" strokeWidth="0.5" opacity="0.3"/>
        </>
      )}
    </svg>
  )
}

export default function OmnitrixOrbit() {
  const sectionRef  = useRef(null)
  const watchRef    = useRef(null)
  const watchWrap   = useRef(null)
  const orbitsRef   = useRef([])
  const labelsRef   = useRef([])
  const particleRef = useRef(null)
  const glowRef     = useRef(null)
  const activeRef   = useRef(false)
  const dialRef     = useRef(null)
  const titleRef    = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Initial states — everything hidden
    gsap.set(watchWrap.current, { scale: 0.6, opacity: 0, y: 60 })
    gsap.set(glowRef.current, { scale: 0.5, opacity: 0 })
    gsap.set(orbitsRef.current, { scale: 0, opacity: 0 })
    gsap.set(labelsRef.current, { opacity: 0, y: 10 })
    gsap.set(titleRef.current, { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 10%',
        scrub: false,
        once: false,
        onEnter: () => playActivation(),
        onLeaveBack: () => playDeactivation(),
      },
    })

    function playActivation() {
      if (activeRef.current) return
      activeRef.current = true

      const master = gsap.timeline()

      // Step 1: Watch appears
      master.to(watchWrap.current, { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.4)' })

      // Step 2: Glow pulse — watch powers on
      master.to(glowRef.current, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      master.to(glowRef.current, { scale: 1.3, opacity: 0.7, duration: 0.3, ease: 'power1.inOut', yoyo: true, repeat: 1 }, '-=0.1')

      // Step 3: Dial opens (rotate watch)
      master.to(watchWrap.current, { rotateY: -12, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      master.to(watchWrap.current, { rotateY: 8, duration: 0.3, ease: 'power2.inOut' })
      master.to(watchWrap.current, { rotateY: 0, duration: 0.4, ease: 'elastic.out(1,0.5)' })

      // Step 4: Title appears
      master.to(titleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, '-=0.3')

      // Step 5: Alien icons orbit in — staggered
      master.to(orbitsRef.current, {
        scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)',
      }, '-=0.2')

      // Step 6: Labels appear
      master.to(labelsRef.current, {
        opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out',
      }, '-=0.3')

      // Step 7: Start continuous orbit rotation
      ALIENS.forEach((_, i) => {
        const el = orbitsRef.current[i]
        if (!el) return
        const startAngle = (i / ALIENS.length) * 360
        // Continuously animate the angle
        gsap.to({ angle: startAngle }, {
          angle: startAngle + 360,
          duration: 12 + (i % 3) * 2,
          ease: 'none',
          repeat: -1,
          id: `orbit-${i}`,
          onUpdate: function () {
            const angle = this.targets()[0].angle
            const rad   = (angle * Math.PI) / 180
            const rx    = 200 + (i % 2) * 30  // elliptical — x radius
            const ry    = 90  + (i % 3) * 10  // y radius (pseudo-3D)
            const x     = Math.cos(rad) * rx
            const y     = Math.sin(rad) * ry
            const scale = 0.75 + (Math.sin(rad) + 1) * 0.125 // depth scaling
            const zIdx  = Math.sin(rad) > 0 ? 10 : 2
            gsap.set(el, { x, y, scale, zIndex: zIdx })
            // Move label with icon
            const lbl = labelsRef.current[i]
            if (lbl) gsap.set(lbl, { x, y: y + 52 * scale, opacity: Math.max(0, (Math.sin(rad) + 1) * 0.5) })
          },
        })
      })

      // Continuous glow pulse on watch
      gsap.to(glowRef.current, {
        scale: 1.15, opacity: 0.8, duration: 1.8,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
        id: 'glow-pulse',
      })

      // Particles float up
      gsap.to('.omni-particle', {
        y: -120, opacity: 0, duration: 2.5, stagger: 0.3,
        ease: 'power1.out', repeat: -1, repeatDelay: 0.2,
      })
    }

    function playDeactivation() {
      if (!activeRef.current) return
      activeRef.current = false

      // Kill all orbit tweens
      ALIENS.forEach((_, i) => gsap.killTweensOf(`orbit-${i}`))
      gsap.killTweensOf('glow-pulse')

      gsap.to([...orbitsRef.current, ...labelsRef.current], { scale: 0, opacity: 0, duration: 0.4, stagger: 0.04 })
      gsap.to(glowRef.current, { scale: 0.5, opacity: 0, duration: 0.5 })
      gsap.to(watchWrap.current, { scale: 0.6, opacity: 0, y: 60, duration: 0.6 })
      gsap.to(titleRef.current, { opacity: 0, y: 40, duration: 0.4 })
      gsap.killTweensOf('.omni-particle')
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      ALIENS.forEach((_, i) => gsap.killTweensOf(`orbit-${i}`))
      gsap.killTweensOf('.omni-particle')
    }
  }, [])

  // Hover: highlight alien
  const onAlienHover = (i, enter) => {
    const el = orbitsRef.current[i]
    if (!el) return
    gsap.to(el, {
      scale: enter ? 1.35 : undefined,
      duration: 0.3,
      ease: 'back.out(2)',
      overwrite: 'auto',
    })
  }

  // Particles array
  const particles = Array.from({ length: 16 }, (_, i) => ({
    left: `${10 + (i * 5.5) % 80}%`,
    delay: `${(i * 0.4) % 3}s`,
    size: 3 + (i % 3),
    opacity: 0.3 + (i % 4) * 0.1,
  }))

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #0a1a0a 0%, #050805 60%, #020402 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 20px',
      }}
    >
      {/* Hex grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(57,255,20,0.06) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }}/>

      {/* Scan lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(57,255,20,0.015) 3px,rgba(57,255,20,0.015) 4px)',
      }}/>

      {/* Floating particles */}
      <div ref={particleRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {particles.map((p, i) => (
          <div key={i} className="omni-particle" style={{
            position: 'absolute',
            bottom: '10%',
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#39FF14',
            boxShadow: '0 0 6px #39FF14, 0 0 12px rgba(57,255,20,0.5)',
            opacity: p.opacity,
            animationDelay: p.delay,
          }}/>
        ))}
      </div>

      {/* Section label */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 40, opacity: 0 }}>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, letterSpacing: 6, textTransform: 'uppercase',
          color: '#39FF14', marginBottom: 10,
          textShadow: '0 0 10px #39FF14',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <span style={{ display: 'inline-block', width: 20, height: 1, background: '#39FF14' }}/>
          Omnitrix Active — Select Alien Form
          <span style={{ display: 'inline-block', width: 20, height: 1, background: '#39FF14' }}/>
        </p>
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 'clamp(28px,5vw,60px)',
          color: '#ffffff',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          ALIEN <span style={{ color: '#39FF14', textShadow: '0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.4)' }}>SELECTOR</span>
        </h2>
      </div>

      {/* Main orbit stage */}
      <div style={{ position: 'relative', width: 520, height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Outer glow ring */}
        <div ref={glowRef} style={{
          position: 'absolute',
          width: 460, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(57,255,20,0.12) 0%, transparent 70%)',
          boxShadow: '0 0 60px rgba(57,255,20,0.15), 0 0 120px rgba(57,255,20,0.08)',
          pointerEvents: 'none',
        }}/>

        {/* Orbit ring visual — ellipse */}
        <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 520 520">
          <ellipse cx="260" cy="260" rx="215" ry="97"
            fill="none" stroke="rgba(57,255,20,0.12)" strokeWidth="1"
            strokeDasharray="4 6"/>
          <ellipse cx="260" cy="260" rx="230" ry="107"
            fill="none" stroke="rgba(57,255,20,0.06)" strokeWidth="1"/>
        </svg>

        {/* Watch */}
        <div ref={watchWrap} style={{
          position: 'relative', zIndex: 5,
          transformStyle: 'preserve-3d',
          cursor: 'default',
        }}>
          <OmnitrixSVG active={true} />

          {/* Green power pulse rings */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 60, height: 60, borderRadius: '50%',
            border: '2px solid rgba(57,255,20,0.4)',
            animation: 'ringPulse 2s ease-out infinite',
            pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 80, height: 80, borderRadius: '50%',
            border: '1px solid rgba(57,255,20,0.2)',
            animation: 'ringPulse 2s ease-out infinite',
            animationDelay: '0.6s',
            pointerEvents: 'none',
          }}/>
        </div>

        {/* Alien icons — absolutely positioned, GSAP moves them */}
        {ALIENS.map((alien, i) => (
          <div key={alien.name} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
            {/* Icon bubble */}
            <div
              ref={el => orbitsRef.current[i] = el}
              onMouseEnter={() => onAlienHover(i, true)}
              onMouseLeave={() => onAlienHover(i, false)}
              style={{
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                width: 58, height: 58,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alien.color}22 0%, rgba(5,8,5,0.9) 70%)`,
                border: `1.5px solid ${alien.color}60`,
                boxShadow: `0 0 14px ${alien.color}40, inset 0 0 10px ${alien.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'box-shadow 0.3s',
              }}
            >
              <img src={alien.img} alt={alien.name}
                style={{ width: 36, height: 36, objectFit: 'contain', filter: `drop-shadow(0 0 8px ${alien.color}80)` }}
              />
              {/* Alien color dot */}
              <div style={{
                position: 'absolute', bottom: 4, right: 4,
                width: 6, height: 6, borderRadius: '50%',
                background: alien.color,
                boxShadow: `0 0 4px ${alien.color}`,
              }}/>
            </div>

            {/* Label */}
            <div
              ref={el => labelsRef.current[i] = el}
              style={{
                position: 'absolute',
                transform: 'translate(-50%,0)',
                textAlign: 'center',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <p style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 8, letterSpacing: 2,
                textTransform: 'uppercase',
                color: alien.color,
                textShadow: `0 0 8px ${alien.color}`,
                marginBottom: 1,
              }}>{alien.name}</p>
              <p style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 7, letterSpacing: 1,
                color: 'rgba(200,220,200,0.5)',
              }}>{alien.species}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom hint */}
      <p style={{
        marginTop: 40,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 9, letterSpacing: 5,
        textTransform: 'uppercase',
        color: 'rgba(57,255,20,0.4)',
      }}>Hover aliens to inspect · 10 forms available</p>

      {/* Keyframes */}
      <style>{`
        @keyframes ringPulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0;   }
        }
      `}</style>
    </section>
  )
}
