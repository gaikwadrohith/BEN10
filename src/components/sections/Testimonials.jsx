import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useGSAP } from '@/components/animations/useGSAP'
import { fadeUpOnScroll } from '@/components/animations/scrollAnimations'
import { SERIES, VILLAINS } from '@/data/ben10'

export default function Testimonials() {
  const [activeSeries, setActiveSeries] = useState(0)
  const [activeVillain, setActiveVillain] = useState(0)
  const scopeRef = useGSAP(() => {
    fadeUpOnScroll('.villain-card', { stagger: 0.1 })
    fadeUpOnScroll('.series-item', { stagger: 0.08 })
  }, [])

  const s = SERIES[activeSeries]
  const v = VILLAINS[activeVillain]

  return (
    <section ref={scopeRef} id="series" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 bg-[var(--bg2)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Series section */}
        <div className="mb-24">
          <motion.p className="section-label"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >The Ben 10 Saga</motion.p>
          <motion.h2
            className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)] mb-12"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            ALL <span className="text-[var(--green)] text-glow">SERIES</span>
          </motion.h2>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
            {/* Series list */}
            <div className="space-y-2">
              {SERIES.map((ser, i) => (
                <motion.button key={ser.id} onClick={() => setActiveSeries(i)}
                  className={`series-item opacity-0 w-full text-left p-5 transition-all duration-300 cursor-none
                    ${activeSeries === i ? 'border-l-2 pl-6' : 'glass hover:border-l-2 hover:pl-6'}`}
                  style={{
                    borderColor: activeSeries === i ? ser.color : 'transparent',
                    background: activeSeries === i ? ser.color + '10' : '',
                  }}
                  whileHover={{ x: 4 }} transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[3px] w-4">0{ser.id}</span>
                      <div>
                        <p className="font-display text-sm tracking-[3px] text-[var(--text)]">{ser.title}</p>
                        <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-[2px] mt-0.5">{ser.years} · {ser.eps} Episodes · {ser.era}</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{ background: ser.color, boxShadow: `0 0 8px ${ser.color}` }} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Series detail */}
            <AnimatePresence mode="wait">
              <motion.div key={s.id}
                className="panel sticky top-24 scanlines bracketed overflow-hidden"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Series image */}
                <div style={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden', background: '#010201' }}>
                  <img
                    src={`/images/series/series${s.id}.png`}
                    alt={s.title}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'contrast(1.1) saturate(1.2)',
                      transition: 'transform 0.6s ease',
                    }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {/* Color overlay at bottom */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, transparent 40%, #010201 100%)`,
                    pointerEvents: 'none',
                  }} />
                  {/* Era badge */}
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 8, letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: s.color,
                    background: 'rgba(1,2,1,0.8)',
                    border: `1px solid ${s.color}60`,
                    padding: '4px 10px',
                    backdropFilter: 'blur(8px)',
                  }}>{s.era}</div>
                </div>

                <div className="p-6">
                  <div className="w-full h-1 mb-4 rounded-none" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                  <p className="font-mono text-[9px] tracking-[3px] uppercase mb-1" style={{ color: s.color }}>Series {s.id} — {s.era}</p>
                  <h3 className="font-display text-xl tracking-widest text-[var(--text)] mb-2">{s.title}</h3>
                  <div className="flex gap-4 font-mono text-[9px] text-[var(--text-muted)] tracking-widest mb-5 pb-4 border-b border-[var(--border)]">
                    <span>{s.years}</span><span>·</span><span>{s.eps} eps</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Villains section */}
        <div id="villains">
          <motion.p className="section-label"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >Rogues Gallery</motion.p>
          <motion.h2
            className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)] mb-12"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            THE <span style={{ color: '#CC2200', textShadow: '0 0 20px rgba(204,34,0,0.5)' }}>VILLAINS</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VILLAINS.map((vl, i) => (
              <motion.div key={vl.id}
                className="villain-card opacity-0 panel p-6 group cursor-none hover:border-[#CC2200]/30 transition-all"
                whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center glass overflow-hidden" style={{ borderColor: vl.color + '40' }}>
                    <img src={vl.img} alt={vl.name} style={{ width: 40, height: 40, objectFit: 'contain', filter: `drop-shadow(0 0 8px ${vl.color}60)` }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-sm tracking-widest text-[var(--text)]">{vl.name}</h3>
                    <p className="font-mono text-[9px] tracking-[2px] uppercase mt-0.5" style={{ color: vl.color }}>{vl.title}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{vl.desc}</p>
                <div className="mt-4 h-px bg-gradient-to-r from-[var(--border)] via-[#CC2200]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
