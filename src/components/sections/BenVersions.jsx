import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@/components/animations/useGSAP'
import { fadeUpOnScroll } from '@/components/animations/scrollAnimations'

const VERSIONS = [
  {
    label: 'Ben 10',
    years: '2005-2008',
    age: 'Age 10',
    note: 'Classic era — the original hero',
    omnitrix: 'Original Omnitrix',
    aliens: 10,
    bio: 'Benjamin Kirby Tennyson discovered the Omnitrix during a camping trip with his Grandpa Max and cousin Gwen. A regular 10-year-old kid who became an unlikely hero, fighting Vilgax, Kevin 11, and the Forever Knights across America.',
    powers: ['10 alien forms', 'Hand-to-hand combat', 'Quick thinking'],
    highlight: 'First wielder of the Omnitrix',
    color: '#39FF14',
    photo: '/images/bens/ben-classic.png',
    omnitrixImg: '/images/omnitrix/omnitrix-classic.png',
    layout: 'photo-tl',
  },
  {
    label: 'Alien Force',
    years: '2008-2010',
    age: 'Age 15',
    note: 'Teen era — darker and more serious',
    omnitrix: 'Recalibrated Omnitrix',
    aliens: 10,
    bio: 'Five years after retiring, Ben returned to action when Grandpa Max disappeared investigating the Highbreed invasion. A more mature and serious Ben led a team with Gwen and a reformed Kevin against alien threats far greater than before.',
    powers: ['Recalibrated Omnitrix', 'Team leadership', 'Plumber training'],
    highlight: 'Defeated the Highbreed invasion',
    color: '#00BFFF',
    photo: '/images/bens/ben-alienforce.png',
    omnitrixImg: '/images/omnitrix/omnitrix-recalibrated.png',
    layout: 'photo-tr',
  },
  {
    label: 'Ultimate Alien',
    years: '2010-2012',
    age: 'Age 16',
    note: 'Revealed identity to the world',
    omnitrix: 'Ultimatrix',
    aliens: 60,
    bio: 'After his secret identity was exposed to the world, Ben became a celebrity hero. Wielding the Ultimatrix — capable of evolving aliens to their Ultimate forms — Ben faced Aggregor, Diagon, and even Vilgax once more.',
    powers: ['Ultimatrix', 'Ultimate forms', 'Celebrity status'],
    highlight: 'First public superhero identity',
    color: '#FF6B35',
    photo: '/images/bens/ben-ultimatealien.png',
    omnitrixImg: '/images/omnitrix/ultimatrix.png',
    layout: 'photo-top',
  },
  {
    label: 'Omniverse',
    years: '2012-2014',
    age: 'Age 16+',
    note: 'Partners with Rook in Bellwood',
    omnitrix: 'New Omnitrix',
    aliens: 70,
    bio: 'Ben received a new and improved Omnitrix and was partnered with Rook Blonko, a by-the-book Plumber from Revonnah. Together they protected Bellwood and the universe, facing the Incurseans, Maltruant, and alternate timeline threats.',
    powers: ['New Omnitrix (70+ aliens)', 'Plumber HQ access', 'Time travel experience'],
    highlight: 'Largest alien roster ever',
    color: '#9B59B6',
    photo: '/images/bens/ben-omniverse.png',
    omnitrixImg: '/images/omnitrix/omnitrix-omniverse.png',
    layout: 'photo-br',
  },
  {
    label: 'Ben 10 Reboot',
    years: '2016-2021',
    age: 'Age 10',
    note: 'New generation, same heart',
    omnitrix: 'Reboot Omnitrix',
    aliens: 10,
    bio: 'A reimagined Ben Tennyson for a new generation. Still 10 years old, still on a road trip with Grandpa Max and Gwen, still discovering the Omnitrix. A lighter, more adventurous take on the classic origin story with modern animation.',
    powers: ['Reboot Omnitrix', 'Fusions unlocked', 'Glitch forms'],
    highlight: 'Introduced alien fusions',
    color: '#39FF14',
    photo: '/images/bens/ben-reboot.png',
    omnitrixImg: '/images/omnitrix/omnitrix-reboot.png',
    layout: 'photo-cl',
  },
  {
    label: 'Ben 10,000',
    years: '2030s+',
    age: 'Age 30+',
    note: 'The future — ultimate hero',
    omnitrix: 'Perfected Omnitrix',
    aliens: 10000,
    bio: 'In a possible future, Ben Tennyson has mastered the Omnitrix and unlocked 10,000 alien forms. A hardened, battle-worn veteran who has fought threats across the entire universe. He lost his sense of fun but gained unmatched power and experience.',
    powers: ['10,000 alien forms', 'Instant transformation', 'Future tech'],
    highlight: 'Unlocked 10,000 alien forms',
    color: '#FFD700',
    photo: '/images/bens/ben-10000.png',
    omnitrixImg: '/images/omnitrix/ben-10000.png',
    layout: 'photo-tr',
  },
]

const TICK_MARKS = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2
  const isMajor = i % 6 === 0
  return {
    x1: 150 + Math.cos(angle) * 138,
    y1: 150 + Math.sin(angle) * 138,
    x2: 150 + Math.cos(angle) * (isMajor ? 126 : 132),
    y2: 150 + Math.sin(angle) * (isMajor ? 126 : 132),
    isMajor,
  }
})

// ── Shared sub-components ──────────────────────────────────────────────────

function BenPhoto({ active, imgErr, markErr, style }) {
  if (imgErr[`p-${active.label}`]) {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${active.color}06`, fontFamily: 'monospace', fontSize: 8, textTransform: 'uppercase', color: `${active.color}35` }}>
        No image
      </div>
    )
  }
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={active.photo}
        alt={`${active.label} Ben`}
        style={{ display: 'block', filter: 'contrast(1.08) saturate(1.15)', ...style }}
        onError={() => markErr(`p-${active.label}`)}
      />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent 50%, rgba(4,10,4,0.65) 100%)' }} />
      <span style={{ position: 'absolute', bottom: 5, left: 0, right: 0, textAlign: 'center', fontFamily: 'monospace', fontSize: 7, letterSpacing: 3, textTransform: 'uppercase', color: `${active.color}70` }}>
        Ben
      </span>
    </div>
  )
}

function WatchPhoto({ active, imgErr, markErr }) {
  if (imgErr[`o-${active.label}`]) {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 8, textTransform: 'uppercase', color: `${active.color}35` }}>
        No image
      </div>
    )
  }
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={active.omnitrixImg}
        alt={active.omnitrix}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: 8 }}
        onError={() => markErr(`o-${active.label}`)}
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: `linear-gradient(to top, rgba(4,10,4,0.8), transparent)`, padding: '10px 8px 4px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 7, letterSpacing: 3, textTransform: 'uppercase', color: `${active.color}70` }}>
          Watch
        </span>
      </div>
    </div>
  )
}

function VersionHeader({ active }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: `${active.color}60`, border: `1px solid ${active.color}25`, padding: '3px 8px' }}>
          {active.years}
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
          {active.age}
        </span>
      </div>
      <div>
        <h3 style={{ fontFamily: 'inherit', fontSize: 'clamp(18px,2.5vw,26px)', letterSpacing: 3, textTransform: 'uppercase', color: active.color, textShadow: `0 0 20px ${active.color}50`, margin: '0 0 3px', lineHeight: 1, fontWeight: 700 }}>
          {active.label}
        </h3>
        <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 4, textTransform: 'uppercase', color: `${active.color}55`, margin: 0 }}>
          {active.omnitrix}
        </p>
      </div>
      <div style={{ height: 1, background: `linear-gradient(90deg, ${active.color}30, transparent)` }} />
    </div>
  )
}

function BioText({ active }) {
  return (
    <p style={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', margin: 0, letterSpacing: 0.3 }}>
      {active.bio}
    </p>
  )
}

function PowerTags({ active }) {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 4, textTransform: 'uppercase', color: `${active.color}50`, margin: '0 0 6px' }}>
        // Abilities
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {active.powers.map((p) => (
          <span key={p} style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${active.color}28`, color: `${active.color}90`, background: `${active.color}08` }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}

function StatBlock({ label, value, color }) {
  return (
    <div style={{ padding: '10px 14px', border: `1px solid ${color}18`, background: `${color}06`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: '100%', background: color, opacity: 0.5 }} />
      <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: `${color}70`, margin: '0 0 4px' }}>
        {label}
      </p>
      <p style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: 1, color, margin: 0, fontWeight: 500 }}>
        {value}
      </p>
    </div>
  )
}

function StatusBar({ active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', borderTop: `1px solid ${active.color}15`, background: `${active.color}04`, position: 'relative', zIndex: 1 }}>
      <span style={{ fontFamily: 'monospace', fontSize: 7, letterSpacing: 4, textTransform: 'uppercase', color: `${active.color}45` }}>
        // {active.omnitrix}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: active.color, boxShadow: `0 0 6px ${active.color}` }} />
        <span style={{ fontFamily: 'monospace', fontSize: 7, letterSpacing: 3, textTransform: 'uppercase', color: `${active.color}60` }}>
          Active
        </span>
      </div>
    </div>
  )
}

// ── Empty state ────────────────────────────────────────────────────────────

function OmnitrixEmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes bv-cw   { to { transform: rotate(360deg);  } }
        @keyframes bv-ccw  { to { transform: rotate(-360deg); } }
        @keyframes bv-scan { to { transform: rotate(360deg);  } }
        @keyframes bv-pulse {
          0%,100% { box-shadow: 0 0 40px rgba(57,255,20,0.08), inset 0 0 30px rgba(57,255,20,0.04); border-color: rgba(57,255,20,0.35); }
          50%     { box-shadow: 0 0 60px rgba(57,255,20,0.22), inset 0 0 40px rgba(57,255,20,0.12); border-color: rgba(57,255,20,0.7);  }
        }
        @keyframes bv-dot { 0%,100% { opacity: 0.65; } 50% { opacity: 1.0; } }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)' }} />

      <div style={{ position: 'absolute', width: 300, height: 300, animation: 'bv-cw 18s linear infinite' }}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="138" fill="none" stroke="rgba(57,255,20,0.12)" strokeWidth="1" />
          {TICK_MARKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={`rgba(57,255,20,${t.isMajor ? 0.45 : 0.15})`}
              strokeWidth={t.isMajor ? 1.5 : 0.75} />
          ))}
        </svg>
      </div>

      <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: '1px dashed rgba(57,255,20,0.09)', animation: 'bv-ccw 12s linear infinite' }} />

      <div style={{ position: 'absolute', width: 176, height: 176, borderRadius: '50%', overflow: 'hidden', animation: 'bv-scan 3s linear infinite', opacity: 0.22 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, rgba(57,255,20,0.55) 0deg, rgba(57,255,20,0.08) 55deg, transparent 85deg)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: 118, height: 118, borderRadius: '50%', background: 'radial-gradient(circle at 38% 38%, rgba(57,255,20,0.13), rgba(0,0,0,0.88))', border: '2px solid rgba(57,255,20,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'bv-pulse 2.6s ease-in-out infinite' }}>
        <svg width="58" height="58" viewBox="0 0 56 56" fill="none">
          <polygon points="28,4 50,16 50,40 28,52 6,40 6,16" stroke="rgba(57,255,20,0.55)" strokeWidth="1" fill="rgba(57,255,20,0.07)" />
          <polygon points="28,12 43,20 43,36 28,44 13,36 13,20" stroke="rgba(57,255,20,0.22)" strokeWidth="0.5" fill="none" />
          <circle cx="28" cy="28" r="5" fill="rgba(57,255,20,0.85)" style={{ animation: 'bv-dot 2.6s ease-in-out infinite' }} />
          <circle cx="28" cy="28" r="9" stroke="rgba(57,255,20,0.18)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div style={{ marginTop: 28, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 6, textTransform: 'uppercase', color: 'rgba(57,255,20,0.5)', margin: '0 0 6px' }}>Omnitrix · Ready</p>
        <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', margin: 0 }}>Select a version to activate</p>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function BenVersions() {
  const [selected, setSelected] = useState(null)
  const [imgErr, setImgErr] = useState({})

  const scopeRef = useGSAP(() => {
    fadeUpOnScroll('.bv-text', { stagger: 0.1 })
  }, [])

  const active = selected !== null ? VERSIONS[selected] : null
  const markErr = (key) => setImgErr((prev) => ({ ...prev, [key]: true }))

  const B = (style) => <BenPhoto active={active} imgErr={imgErr} markErr={markErr} style={style} />
  const W = () => <WatchPhoto active={active} imgErr={imgErr} markErr={markErr} />

  return (
    <section ref={scopeRef} id="ben-versions" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.p className="section-label"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >Through the Years</motion.p>

        <motion.h2
          className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)] mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          ALL VERSIONS <span className="text-[var(--green)] text-glow">OF BEN</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT PANEL ── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={`card-${active.label}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'relative' }}
                >
                  {/* Corner brackets */}
                  {[
                    { top: 0,    left: 0,  borderTop:    `2px solid ${active.color}`, borderLeft:   `2px solid ${active.color}` },
                    { top: 0,    right: 0, borderTop:    `2px solid ${active.color}`, borderRight:  `2px solid ${active.color}` },
                    { bottom: 0, left: 0,  borderBottom: `2px solid ${active.color}`, borderLeft:   `2px solid ${active.color}` },
                    { bottom: 0, right: 0, borderBottom: `2px solid ${active.color}`, borderRight:  `2px solid ${active.color}` },
                  ].map((s, i) => (
                    <div key={i} style={{ position: 'absolute', width: 20, height: 20, zIndex: 3, ...s }} />
                  ))}

                  <div style={{ border: '1px solid var(--border)', background: 'rgba(4,10,4,0.75)', overflow: 'hidden', backdropFilter: 'blur(8px)', position: 'relative' }}>

                    {/* Ambient glow */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 60% 60% at 70% 40%, ${active.color}0A, transparent 70%)`, zIndex: 0 }} />

                    {/* Top accent line */}
                    <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${active.color}, transparent)`, position: 'relative', zIndex: 1 }} />

                    {/* ── LAYOUT: photo-tl ── photo top-left | text top-right | watch bottom-right | stat bottom-left */}
                    {active.layout === 'photo-tl' && (
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: 200, overflow: 'hidden', borderRight: `1px solid ${active.color}15`, borderBottom: `1px solid ${active.color}15` }}>
                              {B({ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' })}
                            </div>
                            <div style={{ flex: 1, borderRight: `1px solid ${active.color}15`, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                              <StatBlock label="Alien forms" value={active.aliens.toLocaleString()} color={active.color} />
                            </div>
                          </div>
                          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <VersionHeader active={active} />
                            <BioText active={active} />
                            <PowerTags active={active} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', borderTop: `1px solid ${active.color}15` }}>
                          <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center' }}>
                            <StatBlock label="Highlight" value={active.highlight} color={active.color} />
                          </div>
                          <div style={{ height: 120, borderLeft: `1px solid ${active.color}15`, overflow: 'hidden', background: `${active.color}05` }}>
                            {W()}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── LAYOUT: photo-tr ── text top-left | photo top-right | watch bottom-left | stat bottom-right */}
                    {active.layout === 'photo-tr' && (
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px' }}>
                          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, borderRight: `1px solid ${active.color}15` }}>
                            <VersionHeader active={active} />
                            <BioText active={active} />
                            <PowerTags active={active} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: 200, overflow: 'hidden', borderBottom: `1px solid ${active.color}15` }}>
                              {B({ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' })}
                            </div>
                            <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <StatBlock label="Alien forms" value={active.aliens.toLocaleString()} color={active.color} />
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', borderTop: `1px solid ${active.color}15` }}>
                          <div style={{ height: 120, borderRight: `1px solid ${active.color}15`, overflow: 'hidden', background: `${active.color}05` }}>
                            {W()}
                          </div>
                          <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center' }}>
                            <StatBlock label="Highlight" value={active.highlight} color={active.color} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── LAYOUT: photo-top ── full-width photo banner with name overlay | bio + powers left | watch + stat right */}
                    {active.layout === 'photo-top' && (
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ height: 200, overflow: 'hidden', borderBottom: `1px solid ${active.color}15`, position: 'relative' }}>
                          {B({ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' })}
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(4,10,4,0.88) 0%, transparent 55%)', pointerEvents: 'none' }} />
                          <div style={{ position: 'absolute', bottom: 16, left: 18 }}>
                            <h3 style={{ fontFamily: 'inherit', fontSize: 'clamp(18px,2.5vw,26px)', letterSpacing: 3, textTransform: 'uppercase', color: active.color, textShadow: `0 0 20px ${active.color}60`, margin: '0 0 2px', fontWeight: 700 }}>
                              {active.label}
                            </h3>
                            <p style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: 4, textTransform: 'uppercase', color: `${active.color}70`, margin: 0 }}>
                              {active.years} · {active.age}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px' }}>
                          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, borderRight: `1px solid ${active.color}15` }}>
                            <BioText active={active} />
                            <PowerTags active={active} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1, overflow: 'hidden', background: `${active.color}05`, borderBottom: `1px solid ${active.color}15` }}>
                              {W()}
                            </div>
                            <div style={{ padding: 12 }}>
                              <StatBlock label="Alien forms" value={active.aliens.toLocaleString()} color={active.color} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── LAYOUT: photo-br ── text + watch stacked left | photo full-height right */}
                    {active.layout === 'photo-br' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 155px', position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', borderRight: `1px solid ${active.color}15` }}>
                          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                            <VersionHeader active={active} />
                            <BioText active={active} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                              <StatBlock label="Alien forms" value={active.aliens.toLocaleString()} color={active.color} />
                              <StatBlock label="Highlight" value={active.highlight} color={active.color} />
                            </div>
                            <PowerTags active={active} />
                          </div>
                          <div style={{ height: 110, borderTop: `1px solid ${active.color}15`, overflow: 'hidden', background: `${active.color}05` }}>
                            {W()}
                          </div>
                        </div>
                        <div style={{ minHeight: 400, overflow: 'hidden', position: 'relative' }}>
                          {B({ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' })}
                        </div>
                      </div>
                    )}

                    {/* ── LAYOUT: photo-cl ── photo full-height left | text + powers right | stats + watch bottom */}
                    {active.layout === 'photo-cl' && (
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '155px 1fr', minHeight: 300 }}>
                          <div style={{ overflow: 'hidden', borderRight: `1px solid ${active.color}15` }}>
                            {B({ width: '100%', height: '100%', minHeight: 300, objectFit: 'cover', objectPosition: 'center center' })}
                          </div>
                          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <VersionHeader active={active} />
                            <BioText active={active} />
                            <PowerTags active={active} />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 155px', borderTop: `1px solid ${active.color}15` }}>
                          <div style={{ padding: '12px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, alignItems: 'center' }}>
                            <StatBlock label="Alien forms" value={active.aliens.toLocaleString()} color={active.color} />
                            <StatBlock label="Highlight" value={active.highlight} color={active.color} />
                          </div>
                          <div style={{ height: 110, borderLeft: `1px solid ${active.color}15`, overflow: 'hidden', background: `${active.color}05` }}>
                            {W()}
                          </div>
                        </div>
                      </div>
                    )}

                    <StatusBar active={active} />
                  </div>
                </motion.div>

              ) : (
                <OmnitrixEmptyState />
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT — version list ── */}
          <div className="space-y-3">
            {VERSIONS.map((v, i) => (
              <motion.div
                key={v.label}
                className="bv-text opacity-0 panel p-5 group cursor-none transition-all"
                style={{ borderColor: selected === i ? `${v.color}50` : undefined }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(selected === i ? null : i)}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[3px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-sm tracking-[3px] transition-colors"
                      style={{ color: selected === i ? v.color : 'var(--text)' }}>
                      {v.label}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-[2px]" style={{ color: v.color }}>{v.age}</span>
                    <span className="font-mono text-[8px] tracking-[2px] transition-colors"
                      style={{ color: selected === i ? v.color : 'rgba(57,255,20,0.3)' }}>
                      {selected === i ? '▲' : '▼'}
                    </span>
                  </div>
                </div>
                <div className="pl-7 flex items-center justify-between">
                  <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-[2px]">{v.note}</p>
                  <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-[2px]">{v.years}</span>
                </div>
                <div className="mt-3 h-px transition-transform duration-500 origin-left"
                  style={{ background: v.color, boxShadow: `0 0 4px ${v.color}`, transform: selected === i ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
