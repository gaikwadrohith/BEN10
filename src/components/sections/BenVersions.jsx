import { motion } from 'framer-motion'
import { useGSAP } from '@/components/animations/useGSAP'
import { fadeUpOnScroll } from '@/components/animations/scrollAnimations'

const VERSIONS = [
  { label: 'Ben 10',         years: '2005–2008', age: 'Age 10',  note: 'Classic era — the original hero'   },
  { label: 'Alien Force',    years: '2008–2010', age: 'Age 15',  note: 'Teen era — darker and more serious' },
  { label: 'Ultimate Alien', years: '2010–2012', age: 'Age 16',  note: 'Revealed identity to the world'    },
  { label: 'Omniverse',      years: '2012–2014', age: 'Age 16+', note: 'Partners with Rook in Bellwood'    },
  { label: 'Ben 10 Reboot',  years: '2016–2021', age: 'Age 10',  note: 'New generation, same heart'        },
]

export default function BenVersions() {
  const scopeRef = useGSAP(() => {
    fadeUpOnScroll('.bv-text', { stagger: 0.1 })
  }, [])

  return (
    <section ref={scopeRef} id="ben-versions" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.p className="section-label"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >Through the Years</motion.p>
        <motion.h2
          className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)] mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
        >
          ALL VERSIONS <span className="text-[var(--green)] text-glow">OF BEN</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Group photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
          >
            {/* Decorative frame corners */}
            {[
              { top: 0, left: 0,   borderTop: '2px solid #39FF14', borderLeft: '2px solid #39FF14'   },
              { top: 0, right: 0,  borderTop: '2px solid #39FF14', borderRight: '2px solid #39FF14'  },
              { bottom: 0, left: 0,  borderBottom: '2px solid #39FF14', borderLeft: '2px solid #39FF14'  },
              { bottom: 0, right: 0, borderBottom: '2px solid #39FF14', borderRight: '2px solid #39FF14' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: 24, height: 24, zIndex: 2, ...s }} />
            ))}

            {/* Glow behind image */}
            <div className="absolute inset-0 bg-[var(--green)]/5 blur-[60px] pointer-events-none" />

            {/* The group photo */}
            <div className="relative border border-[var(--border)] overflow-hidden"
              style={{ background: 'rgba(4,10,4,0.6)' }}
            >
              <img
                src="/images/bens-group.png"
                alt="All versions of Ben Tennyson"
                style={{
                  width: '100%',
                  display: 'block',
                  objectFit: 'cover',
                  filter: 'contrast(1.05) saturate(1.1)',
                }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML += `
                    <div style="
                      height:320px;display:flex;align-items:center;justify-content:center;
                      font-family:'Orbitron',monospace;font-size:10px;letter-spacing:4px;
                      text-transform:uppercase;color:rgba(57,255,20,0.3);text-align:center;padding:40px;
                    ">Add bens-group.png to<br/>public/images/</div>`
                }}
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3"
                style={{ background: 'linear-gradient(to top, rgba(1,2,1,0.95), transparent)' }}
              >
                <p className="font-mono text-[9px] tracking-[4px] uppercase text-[var(--green)] text-glow">
                  Ben Tennyson — All Forms
                </p>
              </div>
            </div>
          </motion.div>

          {/* Version list */}
          <div className="space-y-3">
            {VERSIONS.map((v, i) => (
              <motion.div
                key={v.label}
                className="bv-text opacity-0 panel p-5 group hover:border-[var(--green)]/30 transition-all"
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[3px]">0{i+1}</span>
                    <h3 className="font-display text-sm tracking-[3px] text-[var(--text)] group-hover:text-[var(--green)] transition-colors">
                      {v.label}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] text-[var(--green)] tracking-[2px]">{v.age}</span>
                </div>
                <div className="pl-7 flex items-center justify-between">
                  <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-[2px]">{v.note}</p>
                  <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-[2px]">{v.years}</span>
                </div>
                <div className="mt-3 h-px bg-[var(--green)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_4px_var(--green)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
