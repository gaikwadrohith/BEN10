import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@/components/animations/useGSAP'
import { fadeUpOnScroll } from '@/components/animations/scrollAnimations'
import { ORIGINAL_10, CATEGORY_COLORS } from '@/data/ben10'

function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[9px] text-[var(--text-muted)] tracking-[2px] uppercase mb-1.5">
        <span>{label}</span><span style={{ color }}>{value}</span>
      </div>
      <div className="h-1 bg-[var(--border)] overflow-hidden">
        <motion.div className="h-full"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16,1,0.3,1] }}
        />
      </div>
    </div>
  )
}

export default function Features() {
  const [active, setActive] = useState(ORIGINAL_10[0])
  const scopeRef = useGSAP(() => {
    fadeUpOnScroll('.alien-btn', { stagger: 0.06 })
  }, [])

  return (
    <section ref={scopeRef} id="aliens" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 bg-[var(--bg2)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <motion.p className="section-label"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >Original Omnitrix</motion.p>
          <motion.h2
            className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)]"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            THE ORIGINAL <span className="text-[var(--green)] text-glow">10</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Alien selector */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {ORIGINAL_10.map((alien) => (
              <button key={alien.id}
                onClick={() => setActive(alien)}
                className={`alien-btn opacity-0 flex-shrink-0 flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 cursor-none group
                  ${active.id === alien.id
                    ? 'bg-[var(--green)]/10 border border-[var(--green)]/40 text-[var(--green)]'
                    : 'glass border-transparent hover:border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' }}
              >
                {/* Alien image replacing emoji */}
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={alien.img}
                    alt={alien.name}
                    style={{
                      width: 28, height: 28, objectFit: 'contain',
                      filter: active.id === alien.id
                        ? `drop-shadow(0 0 6px ${alien.color}80)`
                        : 'grayscale(60%) opacity(0.7)',
                      transition: 'filter 0.3s',
                    }}
                  />
                </div>
                <div className="hidden lg:block">
                  <p className="font-display text-xs tracking-widest">{alien.name}</p>
                  <p className="font-mono text-[8px] tracking-[2px] text-[var(--text-muted)] mt-0.5">{alien.species}</p>
                </div>
                {active.id === alien.id && (
                  <div className="ml-auto w-1 h-4 bg-[var(--green)] shadow-[0_0_6px_var(--green)] hidden lg:block" />
                )}
              </button>
            ))}
          </div>

          {/* Alien detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={active.id}
              className="panel bracketed p-8 scanlines"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            >
              {/* Top bar */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-5">
                  {/* Big alien image replacing emoji */}
                  <div className="w-16 h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={active.img}
                      alt={active.name}
                      style={{
                        width: 60, height: 60, objectFit: 'contain',
                        filter: `drop-shadow(0 0 16px ${active.color}60)`,
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-[3px] uppercase mb-1">#{String(ORIGINAL_10.findIndex(a=>a.id===active.id)+1).padStart(2,'0')} / Original 10</p>
                    <h3 className="font-display text-3xl tracking-widest" style={{ color: active.color, textShadow: `0 0 20px ${active.color}60` }}>{active.name}</h3>
                    <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest mt-1">{active.species} — {active.homeworld}</p>
                  </div>
                </div>
                <span className="alien-badge hidden md:flex" style={{ color: CATEGORY_COLORS[active.category] || active.color }}>
                  {active.category}
                </span>
              </div>

              <p className="text-[var(--text-muted)] leading-relaxed mb-6 text-sm max-w-xl">{active.desc}</p>

              <div className="mb-6">
                <p className="font-mono text-[9px] text-[var(--green)] tracking-[4px] uppercase mb-3">Abilities</p>
                <div className="flex flex-wrap gap-2">
                  {active.abilities.map(a => (
                    <span key={a} className="px-3 py-1.5 font-mono text-[9px] tracking-[2px] uppercase"
                      style={{ background: active.color + '12', color: active.color, border: `1px solid ${active.color}30` }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <StatBar label="Power"    value={active.power}    color={active.color} />
                <StatBar label="Speed"    value={active.speed}    color={active.color} />
                <StatBar label="Strength" value={active.strength} color={active.color} />
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border)] flex justify-between items-center">
                <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[2px] uppercase">First Appearance</span>
                <span className="font-mono text-[9px] text-[var(--green)]">{active.firstEp}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
