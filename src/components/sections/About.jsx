import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@/components/animations/useGSAP'
import { fadeUpOnScroll, parallaxImage } from '@/components/animations/scrollAnimations'
import { STATS } from '@/data/ben10'

export default function About() {
  const imgRef  = useRef(null)
  const wrapRef = useRef(null)
  const scopeRef = useGSAP(() => {
    fadeUpOnScroll('.about-stat', { stagger: 0.12 })
    if (imgRef.current && wrapRef.current) parallaxImage(imgRef.current, wrapRef.current, 0.15)
  }, [])

  return (
    <section ref={scopeRef} id="about" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Visual — Ben versions group photo */}
          <motion.div ref={wrapRef}
            className="relative aspect-square max-w-lg bracketed"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
          >
            <div ref={imgRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <div className="w-full h-full panel scanlines p-4 flex flex-col gap-3 relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 flex-shrink-0">
                  <div>
                    <div className="font-display text-xs text-[var(--green)] tracking-[4px] uppercase text-glow">ALL VERSIONS</div>
                    <div className="font-mono text-[8px] text-[var(--text-muted)] tracking-[3px]">BEN 10 — THROUGH THE YEARS</div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-omnitrix-pulse" />
                    <div className="w-2 h-2 rounded-full bg-[#FFA500] opacity-60" />
                    <div className="w-2 h-2 rounded-full bg-[#CC2200] opacity-40" />
                  </div>
                </div>

                {/* Group photo of all Ben versions */}
                <div className="flex-1 relative overflow-hidden rounded-sm min-h-0">
                  <img
                    src="/images/bens-group.png"
                    alt="All versions of Ben Tennyson"
                    className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.2))' }}
                    onError={(e) => {
                      // Fallback: show omnitrix symbol if image missing
                      e.target.style.display = 'none'
                      e.target.parentElement.style.display = 'flex'
                      e.target.parentElement.style.alignItems = 'center'
                      e.target.parentElement.style.justifyContent = 'center'
                      e.target.parentElement.innerHTML = '<div style="font-family:Orbitron,monospace;font-size:120px;color:rgba(57,255,20,0.1);line-height:1;user-select:none;">⊗</div>'
                    }}
                  />
                  {/* Scan overlay */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(57,255,20,0.03) 50%, transparent 100%)' }} />
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[var(--border)] pt-3 flex justify-between items-center flex-shrink-0">
                  <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-[3px] uppercase">5 Series · 20 Years</span>
                  <span className="font-mono text-[8px] text-[var(--green)] tracking-[2px]">BEN TENNYSON ✓</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.p className="section-label"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >The Origin</motion.p>

            <motion.h2
              className="font-display text-[clamp(32px,5vw,64px)] leading-[0.9] tracking-wide text-[var(--text)] mb-8"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
            >
              ONE WATCH.<br /><span className="text-[var(--green)] text-glow">INFINITE</span><br />POWER.
            </motion.h2>

            <motion.p className="text-[var(--text-muted)] leading-relaxed mb-5 max-w-lg"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Omnitrix — the most powerful device in the universe — fell from space and latched onto the wrist of a 10-year-old boy named Ben Tennyson. Built by the genius Galvan scientist Azmuth, it contains the DNA of thousands of alien species.
            </motion.p>
            <motion.p className="text-[var(--text-muted)] leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            >
              What began as a summer road trip with Grandpa Max and cousin Gwen became a legacy spanning 20 years — five series, 334+ episodes, and a universe of alien heroes.
            </motion.p>

            {/* Stats — using img tags from data */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {STATS.map(({ label, value, img }) => (
                <div key={label} className="about-stat opacity-0 panel p-4 group hover:border-[var(--green)]/30 transition-all relative overflow-hidden">
                  <div className="mb-2 w-8 h-8 flex items-center justify-center">
                    <img
                      src={img} alt={label}
                      style={{ width: 28, height: 28, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(57,255,20,0.5))' }}
                    />
                  </div>
                  <div className="font-display text-2xl text-[var(--green)] text-glow">{value}</div>
                  <div className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-[3px] mt-1">{label}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--green)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_4px_var(--green)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
