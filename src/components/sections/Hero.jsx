import { motion } from 'framer-motion'
import { FiArrowRight, FiZap } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import { useGSAP } from '@/components/animations/useGSAP'
import { gsap } from 'gsap'

function SplitHeading({ text, className, delay = 0 }) {
  return (
    <span className={className} style={{ perspective: '800px' }}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
          <motion.span className="inline-block"
            initial={{ y: '110%', rotateX: -45, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: delay + i * 0.13, ease: [0.16,1,0.3,1] }}
          >{w}</motion.span>
        </span>
      ))}
    </span>
  )
}

function OmnitrixWatch({ size = 260 }) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={size * 1.2}>
      <rect x="75" y="0" width="50" height="35" rx="8" fill="#1a2a1a" stroke="#39FF14" strokeWidth="1"/>
      <rect x="80" y="8" width="40" height="4" rx="2" fill="#39FF14" opacity="0.3"/>
      <rect x="80" y="16" width="40" height="4" rx="2" fill="#39FF14" opacity="0.2"/>
      <rect x="80" y="24" width="40" height="4" rx="2" fill="#39FF14" opacity="0.1"/>
      <rect x="30" y="30" width="140" height="130" rx="20" fill="#0d1a0d" stroke="#39FF14" strokeWidth="2"/>
      <rect x="35" y="35" width="130" height="120" rx="17" fill="#050805" stroke="#1a7a00" strokeWidth="1"/>
      <rect x="45" y="45" width="110" height="100" rx="12" fill="#0a1a0a"/>
      <g transform="translate(100,95)">
        <ellipse cx="0" cy="-28" rx="22" ry="14" fill="none" stroke="#39FF14" strokeWidth="2"/>
        <ellipse cx="0" cy="28"  rx="22" ry="14" fill="none" stroke="#39FF14" strokeWidth="2"/>
        <line x1="-22" y1="-28" x2="0" y2="0" stroke="#39FF14" strokeWidth="2"/>
        <line x1="22" y1="-28"  x2="0" y2="0" stroke="#39FF14" strokeWidth="2"/>
        <line x1="-22" y1="28"  x2="0" y2="0" stroke="#39FF14" strokeWidth="2"/>
        <line x1="22" y1="28"   x2="0" y2="0" stroke="#39FF14" strokeWidth="2"/>
        <circle cx="0" cy="0" r="7" fill="#39FF14"/>
        <circle cx="0" cy="0" r="4" fill="#050805"/>
      </g>
      <rect x="22" y="70" width="8" height="20" rx="2" fill="#1a3a1a" stroke="#39FF14" strokeWidth="1"/>
      <rect x="170" y="70" width="8" height="20" rx="2" fill="#1a3a1a" stroke="#39FF14" strokeWidth="1"/>
      <rect x="75" y="160" width="50" height="80" rx="8" fill="#1a2a1a" stroke="#39FF14" strokeWidth="1"/>
      <rect x="80" y="168" width="40" height="4" rx="2" fill="#39FF14" opacity="0.3"/>
      <rect x="80" y="176" width="40" height="4" rx="2" fill="#39FF14" opacity="0.2"/>
      <rect x="80" y="220" width="40" height="8" rx="4" fill="#39FF14" opacity="0.4"/>
    </svg>
  )
}

const HERO_ALIENS = [
  { name: 'Heatblast',   color: '#FF4500', img: '/images/aliens/heatblast.png',   pos: { top: '15%', right: '2%'  }, delay: 0.5 },
  { name: 'Four Arms',   color: '#CC2200', img: '/images/aliens/fourarms.png',    pos: { top: '45%', right: '12%' }, delay: 0.8 },
  { name: 'Diamondhead', color: '#00E5FF', img: '/images/aliens/diamondhead.png', pos: { bottom: '20%', right: '3%' }, delay: 1.0 },
]

export default function Hero() {
  const scopeRef = useGSAP(() => {
    gsap.to('.hero-orb', { scale: 1.15, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to('.omnitrix-ring-anim', { rotation: 360, duration: 20, ease: 'none', repeat: -1 })
    gsap.to('.scan-line', { top: '110%', duration: 2.5, ease: 'none', repeat: -1, delay: 1 })
  }, [])

  return (
    <section ref={scopeRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-20 px-6 md:px-12 lg:px-20 hex-bg">

      <div className="hero-orb absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full bg-[var(--green)]/5 blur-[160px] pointer-events-none" />
      <div className="scan-line absolute left-0 right-0 h-24 pointer-events-none opacity-[0.03]"
        style={{ background: 'linear-gradient(to bottom,transparent,var(--green),transparent)' }} />
      <div className="omnitrix-ring-anim absolute right-[-15%] top-[-10%] w-[800px] h-[800px] omnitrix-ring opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">

          <motion.div
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 glass border-l-2 border-[var(--green)]"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-[var(--green)] animate-omnitrix-pulse shadow-[0_0_8px_var(--green)]" />
            <span className="font-mono text-[9px] tracking-[4px] uppercase text-[var(--green)]">
              Omnitrix v3.0 — 70+ Alien Forms Unlocked
            </span>
          </motion.div>

          <h1 className="font-display leading-[0.88] tracking-wide mb-8">
            <SplitHeading text="IT'S HERO"
              className="block text-[clamp(48px,9vw,120px)] text-[var(--text)]"
              delay={0.4}
            />
            <SplitHeading text="TIME."
              className="block text-[clamp(48px,9vw,120px)] text-[var(--green)] text-glow"
              delay={0.7}
            />
          </h1>

          <motion.p
            className="text-base md:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed mb-12 font-light"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Explore every alien in the Omnitrix — from the original 10 to all 70+ unlocked forms.
            The complete Ben 10 universe database.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Button size="lg" iconRight={<FiArrowRight />} href="#aliens">
              Explore Aliens
            </Button>
            <Button size="lg" variant="outline" icon={<FiZap size={14} />} href="#series">
              View All Series
            </Button>
          </motion.div>

          <motion.div className="flex flex-wrap gap-10 pt-8 border-t border-[var(--border)]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          >
            {[['70+','Alien Forms'],['5','Series'],['334+','Episodes'],['10','Original Aliens']].map(([v,l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-[var(--green)] text-glow">{v}</div>
                <div className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-[3px] mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block animate-alien-float"
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16,1,0.3,1] }}
          style={{ filter: 'drop-shadow(0 0 40px rgba(57,255,20,0.3))' }}
        >
          <OmnitrixWatch size={280} />
        </motion.div>

        {/* Floating alien icons — images replacing emojis */}
        {HERO_ALIENS.map(a => (
          <motion.div key={a.name}
            className="absolute hidden xl:flex flex-col items-center gap-2"
            style={{ ...a.pos }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: a.delay + 1, ease: [0.16,1,0.3,1] }}
          >
            <div className="w-14 h-14 glass flex items-center justify-center border-glow animate-alien-float overflow-hidden"
              style={{ borderColor: a.color + '40', animationDelay: `${a.delay}s`, boxShadow: `0 0 20px ${a.color}20` }}>
              <img
                src={a.img}
                alt={a.name}
                style={{ width: 40, height: 40, objectFit: 'contain', filter: `drop-shadow(0 0 6px ${a.color}80)` }}
              />
            </div>
            <span className="font-mono text-[8px] tracking-[2px] uppercase" style={{ color: a.color }}>{a.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
      >
        <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[4px] uppercase">Scroll</span>
        <motion.div className="w-px h-10 bg-gradient-to-b from-[var(--green)] to-transparent shadow-[0_0_4px_var(--green)]"
          animate={{ scaleY: [1,0.4,1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.div>
    </section>
  )
}
