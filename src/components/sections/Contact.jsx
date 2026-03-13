import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX, FiZap } from 'react-icons/fi'
import { useGSAP } from '@/components/animations/useGSAP'
import { fadeUpOnScroll } from '@/components/animations/scrollAnimations'
import { ORIGINAL_10, MORE_ALIENS, CATEGORY_COLORS } from '@/data/ben10'

const ALL_ALIENS = [...ORIGINAL_10, ...MORE_ALIENS]
const ALL_CATEGORIES = ['All', ...new Set(ALL_ALIENS.map(a => a.category))]

function AlienModal({ alien, onClose }) {
  const color = alien.color
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative panel max-w-md w-full p-8 scanlines bracketed overflow-hidden"
        style={{ borderColor: color + '40' }}
        initial={{ scale: 0.88, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text)] cursor-none"><FiX size={16} /></button>

        {/* Alien image replacing emoji */}
        <div className="flex justify-center mb-5">
          <motion.div
            animate={{ y: [0,-10,0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 30px ${color}60)` }}
          >
            <img
              src={alien.img}
              alt={alien.name}
              style={{ width: 120, height: 120, objectFit: 'contain' }}
            />
          </motion.div>
        </div>

        <p className="font-mono text-center text-[9px] tracking-[4px] uppercase mb-1" style={{ color }}>
          {alien.species}
        </p>
        <h3 className="font-display text-3xl text-center tracking-widest mb-5" style={{ color, textShadow: `0 0 20px ${color}60` }}>
          {alien.name.toUpperCase()}
        </h3>

        {alien.homeworld && (
          <div className="flex justify-between font-mono text-[9px] text-[var(--text-muted)] tracking-widest mb-5 pb-4 border-b border-[var(--border)]">
            <span>Homeworld</span><span style={{ color }}>{alien.homeworld}</span>
          </div>
        )}

        {alien.desc && <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{alien.desc}</p>}

        {alien.abilities && (
          <div className="mb-5">
            <p className="font-mono text-[9px] text-[var(--green)] tracking-[4px] uppercase mb-2">Abilities</p>
            <div className="flex flex-wrap gap-1.5">
              {alien.abilities.map(a => (
                <span key={a} className="px-2 py-1 font-mono text-[8px] tracking-[2px] uppercase"
                  style={{ background: color + '12', color, border: `1px solid ${color}30` }}>{a}</span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2.5">
          {[['Power',alien.power],['Speed',alien.speed||50],['Strength',alien.strength]].map(([k,v]) => (
            <div key={k}>
              <div className="flex justify-between font-mono text-[9px] tracking-[2px] uppercase text-[var(--text-muted)] mb-1">
                <span>{k}</span><span style={{ color }}>{v}</span>
              </div>
              <div className="h-1 bg-[var(--border)]">
                <motion.div className="h-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }}
                  initial={{ width: 0 }} animate={{ width: `${v}%` }}
                  transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Contact() {
  const [query,    setQuery]    = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const scopeRef = useGSAP(() => { fadeUpOnScroll('.db-card', { stagger: 0.04 }) }, [])

  const filtered = useMemo(() => {
    return ALL_ALIENS.filter(a => {
      const matchQ = a.name.toLowerCase().includes(query.toLowerCase()) || a.species.toLowerCase().includes(query.toLowerCase())
      const matchC = category === 'All' || a.category === category
      return matchQ && matchC
    })
  }, [query, category])

  return (
    <>
      <AnimatePresence>
        {selected && <AlienModal alien={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <section ref={scopeRef} id="database" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12">
            <motion.p className="section-label"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >Omnitrix Database</motion.p>
            <motion.h2
              className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)]"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
            >
              ALIEN <span className="text-[var(--green)] text-glow">ROSTER</span>
            </motion.h2>
          </div>

          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--green)]" size={14} />
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search alien or species..."
                className="w-full glass border-[var(--border)] focus:border-[var(--green)]/40 bg-transparent pl-10 pr-10 py-3 font-mono text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none tracking-widest transition-all"
              />
              {query && <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] cursor-none"><FiX size={12} /></button>}
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {['All','Fire','Speed','Strength','Tech','Ghost'].map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3 py-2 font-mono text-[9px] tracking-[2px] uppercase transition-all cursor-none
                    ${category === cat ? 'bg-[var(--green)] text-black' : 'glass text-[var(--text-muted)] hover:text-[var(--green)] hover:border-[var(--green)]/30'}`}
                  style={{ clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
                >{cat}</button>
              ))}
            </div>
          </div>

          <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-[3px] uppercase mb-6">
            {filtered.length} aliens found — click to inspect
          </p>

          {/* Alien grid — images replacing emojis */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((alien) => (
              <motion.button
                key={alien.id}
                onClick={() => setSelected(alien)}
                className="db-card opacity-0 panel p-4 text-center group cursor-none hover:border-[var(--green)]/20 transition-all"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="mb-2 flex justify-center items-center h-10"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={alien.img}
                    alt={alien.name}
                    style={{
                      width: 40, height: 40, objectFit: 'contain',
                      filter: `drop-shadow(0 0 0px ${alien.color}00)`,
                      transition: 'filter 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.filter = `drop-shadow(0 0 12px ${alien.color}80)`}
                    onMouseLeave={e => e.currentTarget.style.filter = `drop-shadow(0 0 0px ${alien.color}00)`}
                  />
                </motion.div>
                <p className="font-display text-[10px] tracking-widest text-[var(--text)] group-hover:text-[var(--green)] transition-colors truncate">{alien.name}</p>
                <p className="font-mono text-[8px] text-[var(--text-muted)] tracking-widest mt-0.5 truncate">{alien.species}</p>
                <span className="mt-2 inline-block font-mono text-[8px] px-1.5 py-0.5 tracking-widest"
                  style={{ color: CATEGORY_COLORS[alien.category] || alien.color, background: (CATEGORY_COLORS[alien.category] || alien.color) + '15' }}>
                  {alien.category}
                </span>
              </motion.button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              {/* Omnitrix SVG replacing emoji */}
              <div className="flex justify-center mb-4 opacity-30">
                <svg width="48" height="48" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#39FF14" strokeWidth="2"/>
                  <ellipse cx="50" cy="50" rx="20" ry="28" fill="none" stroke="#39FF14" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="8" fill="#39FF14" opacity="0.6"/>
                  <circle cx="50" cy="50" r="4" fill="#050805"/>
                </svg>
              </div>
              <p className="font-display text-xl text-[var(--text-muted)] tracking-widest">No aliens found</p>
              <p className="font-mono text-xs text-[var(--text-muted)] mt-2 tracking-widest">Try a different search or category</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
