import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowUpRight } from 'react-icons/fi'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/gaikwadrohith',
    icon: FiGithub,
    color: '#ffffff',
    desc: 'See my code',
    handle: '@gaikwadrohith',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gaikwad-rohith',
    icon: FiLinkedin,
    color: '#0A66C2',
    desc: 'Connect with me',
    handle: 'gaikwad-rohith',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/rohittt._gaikwad',
    icon: FiInstagram,
    color: '#E1306C',
    desc: 'Follow me',
    handle: '@rohittt._gaikwad',
  },
  {
    label: 'Email',
    href: 'mailto:rohitrajg9881@gmail.com',
    icon: FiMail,
    color: '#39FF14',
    desc: 'Send a message',
    handle: 'rohitrajg9881@gmail.com',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(57,255,20,0.05) 0%, transparent 70%)' }}
    >
      {/* Hex dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(57,255,20,0.04) 1px,transparent 0)', backgroundSize: '30px 30px' }} />
      {/* Scan lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(57,255,20,0.008) 3px,rgba(57,255,20,0.008) 4px)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p className="section-label"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >Omnitrix Signal</motion.p>

          <motion.h2
            className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)] mb-6"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            GET IN <span className="text-[var(--green)] text-glow">TOUCH</span>
          </motion.h2>

          <motion.p
            className="font-mono text-sm text-[var(--text-muted)] tracking-widest max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          >
            Omnitrix locked on your signal. Whether it's a project, collab, or just a fan theory — transmission lines are open.
          </motion.p>
        </div>

        {/* Main content — two columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-start">

          {/* Left — Omnitrix pulse + status */}
          <motion.div
            className="panel p-10 text-center relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#39FF14,transparent)', opacity: 0.4 }} />

            {/* Pulse rings */}
            <div className="flex justify-center mb-8" style={{ position: 'relative', height: 120 }}>
              {[1,1.6,2.2].map((s, i) => (
                <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 80, height: 80, marginLeft: -40, marginTop: -40, borderRadius: '50%', border: '1px solid rgba(57,255,20,0.3)', animation: `contactPulse 2.4s ease-out ${i * 0.6}s infinite` }} />
              ))}
              <div style={{ position: 'relative', zIndex: 2, width: 80, height: 80, margin: '20px auto 0', borderRadius: '50%', background: 'rgba(57,255,20,0.08)', border: '2px solid rgba(57,255,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(57,255,20,0.2)' }}>
                <svg width="40" height="40" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#39FF14" strokeWidth="2"/>
                  <ellipse cx="50" cy="50" rx="20" ry="28" fill="none" stroke="#39FF14" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="10" fill="#39FF14" opacity="0.9"/>
                  <circle cx="50" cy="50" r="5" fill="#050805"/>
                </svg>
              </div>
            </div>

            <p className="font-display text-lg tracking-widest text-[var(--text)] mb-2">Rohit Gaikwad</p>
            <p className="font-mono text-[10px] tracking-[4px] uppercase text-[var(--text-muted)] mb-6">Frontend Developer · Motion Designer</p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6"
              style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.25)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#39FF14', boxShadow: '0 0 6px #39FF14', display: 'inline-block', animation: 'blink 1.5s ease-in-out infinite' }} />
              <span className="font-mono text-[9px] tracking-[3px] uppercase text-[var(--green)]">Available for work</span>
            </div>

            <a href="mailto:rohitrajg9881@gmail.com"
              className="flex items-center justify-center gap-2 w-full py-3 font-mono text-[10px] tracking-[3px] uppercase transition-all"
              style={{ background: '#39FF14', color: '#010201', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)', textDecoration: 'none', boxShadow: '0 0 20px rgba(57,255,20,0.3)' }}
            >
              <FiMail size={13} /> Send Message
            </a>
          </motion.div>

          {/* Right — Social links */}
          <div className="space-y-3">
            {LINKS.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="panel p-5 flex items-center gap-4 group cursor-none transition-all"
                  style={{ textDecoration: 'none' }}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
                  whileHover={{ x: 4 }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                    style={{ background: link.color + '12', border: `1px solid ${link.color}30`, color: link.color }}>
                    <Icon size={20} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-xs tracking-widest text-[var(--text)] group-hover:text-[var(--green)] transition-colors mb-0.5">{link.label}</p>
                    <p className="font-mono text-[9px] tracking-[2px] text-[var(--text-muted)] truncate">{link.handle}</p>
                  </div>

                  {/* Arrow */}
                  <FiArrowUpRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--green)] transition-colors flex-shrink-0" />

                  {/* Hover line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--green)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ position: 'absolute' }} />
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-mono text-[9px] tracking-[4px] uppercase text-[var(--text-muted)]">© 2024 · Ben 10 Universe · Fan Project</p>
          <p className="font-mono text-[9px] tracking-[4px] uppercase text-[var(--text-muted)]">Built with React + GSAP + ❤</p>
        </motion.div>
      </div>

      <style>{`
        @keyframes contactPulse {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0;   }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
