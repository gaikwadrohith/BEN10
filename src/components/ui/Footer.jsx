import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NAV_LINKS = {
  Universe:  [
    { label: 'All Aliens', href: '#database' },
    { label: 'Omnitrix',   href: '#gallery'  },
    { label: 'Timeline',   href: '#ben-versions' },
    { label: 'Species',    href: '#database' },
  ],
  Series: [
    { label: 'Classic (2005)', href: '#series' },
    { label: 'Alien Force',    href: '#series' },
    { label: 'Ultimate Alien', href: '#series' },
    { label: 'Omniverse',      href: '#series' },
  ],
  Resources: [
    { label: 'Fan Wiki',       href: 'https://ben10.fandom.com', external: true },
    { label: 'Episode Guide',  href: 'https://ben10.fandom.com/wiki/Episode_Guide', external: true },
    { label: 'Voice Cast',     href: 'https://ben10.fandom.com/wiki/Voice_Cast', external: true },
    { label: 'About Me',       href: '/about', route: true },
  ],
}

const SOCIALS = [
  { icon: FiGithub,    href: 'https://github.com/gaikwadrohith',              label: 'GitHub'    },
  { icon: FiLinkedin,  href: 'https://linkedin.com/in/gaikwad-rohith',         label: 'LinkedIn'  },
  { icon: FiInstagram, href: 'https://instagram.com/rohittt._gaikwad',         label: 'Instagram' },
  { icon: FiMail,      href: 'mailto:rohitrajg9881@gmail.com',                 label: 'Email'     },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg2)] pt-20 pb-10 overflow-hidden">
      {/* Giant omnitrix bg glow */}
      <div className="absolute -bottom-32 right-[-5%] w-[500px] h-[500px] rounded-full omnitrix-ring opacity-[0.04] pointer-events-none" />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(57,255,20,0.03) 1px,transparent 0)', backgroundSize: '28px 28px' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <svg width="28" height="28" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#39FF14" strokeWidth="2"/>
                <ellipse cx="50" cy="50" rx="20" ry="28" fill="none" stroke="#39FF14" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="10" fill="#39FF14" opacity="0.9"/>
                <circle cx="50" cy="50" r="5" fill="#050805"/>
              </svg>
              <div>
                <div className="font-display text-xl text-[var(--green)] tracking-[4px] text-glow">BEN 10</div>
                <div className="font-mono text-[8px] text-[var(--text-muted)] tracking-[3px] uppercase">Omnitrix Database</div>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-xs">
              The ultimate fan database for all things Ben 10. 70+ aliens, 5 series, one legendary Omnitrix.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mb-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  title={label}
                  className="w-9 h-9 glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--green)] hover:border-[var(--green)]/30 transition-all cursor-none"
                ><Icon size={14} /></a>
              ))}
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5"
              style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.2)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#39FF14', boxShadow: '0 0 5px #39FF14', display: 'inline-block', animation: 'footerBlink 1.5s ease-in-out infinite' }} />
              <span className="font-mono text-[8px] tracking-[3px] uppercase text-[var(--green)]">Available for work</span>
            </div>
          </div>

          {/* Nav cols */}
          {Object.entries(NAV_LINKS).map(([col, items]) => (
            <div key={col}>
              <h4 className="text-[9px] font-mono text-[var(--green)] uppercase tracking-[4px] mb-5">{col}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.label}>
                    {item.route ? (
                      <Link to={item.href}
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--green)] transition-colors cursor-none flex items-center gap-1 group"
                      >
                        {item.label}
                        <FiArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <a href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--green)] transition-colors cursor-none flex items-center gap-1 group"
                      >
                        {item.label}
                        {item.external && <FiArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[var(--text-muted)]">
            © {new Date().getFullYear()} Ben 10 Universe. Fan Project — Not affiliated with Cartoon Network / Man of Action.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:rohitrajg9881@gmail.com"
              className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--green)] transition-colors cursor-none">
              rohitrajg9881@gmail.com
            </a>
            <button onClick={scrollToTop}
              className="text-xs font-mono text-[var(--green)] text-glow cursor-none hover:opacity-70 transition-opacity flex items-center gap-1">
              IT'S HERO TIME ↑
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes footerBlink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.3; }
        }
      `}</style>
    </footer>
  )
}
