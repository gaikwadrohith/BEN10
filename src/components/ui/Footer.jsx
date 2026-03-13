import { FiGithub, FiTwitter, FiYoutube } from 'react-icons/fi'

const LINKS = {
  Universe:   ['All Aliens','Omnitrix','Timeline','Species'],
  Series:     ['Classic (2005)','Alien Force','Ultimate Alien','Omniverse'],
  Resources:  ['Fan Wiki','Episode Guide','Voice Cast','Merchandise'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg2)] pt-20 pb-10 overflow-hidden">
      {/* Giant omnitrix bg */}
      <div className="absolute -bottom-32 right-[-5%] w-[500px] h-[500px] rounded-full omnitrix-ring opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl text-[var(--green)] tracking-[4px] mb-1 text-glow">BEN 10</div>
            <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-[3px] uppercase mb-4">Omnitrix Database</div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-xs">
              The ultimate fan database for all things Ben 10. 70+ aliens, 5 series, one legendary Omnitrix.
            </p>
            <div className="flex gap-3">
              {[FiGithub, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--green)] transition-colors cursor-none"
                ><Icon size={14} /></a>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <h4 className="text-[9px] font-mono text-[var(--green)] uppercase tracking-[4px] mb-4">{col}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}><a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-none">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[var(--text-muted)]">© {new Date().getFullYear()} Ben 10 Universe. Fan Project — Not affiliated with Cartoon Network / Man of Action.</p>
          <p className="text-xs font-mono text-[var(--green)] text-glow">IT'S HERO TIME.</p>
        </div>
      </div>
    </footer>
  )
}
