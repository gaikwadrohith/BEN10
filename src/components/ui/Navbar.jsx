import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import { cn } from "@/utils/helpers";

const LINKS = [
  { label: "Aliens",   href: "#aliens"   },
  { label: "Series",   href: "#series"   },
  { label: "Gallery",  href: "#gallery"  },
  { label: "Villains", href: "#villains" },
  { label: "Database", href: "#database" },
];

function OmnitrixIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="#39FF14" strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="22" ry="30" fill="none" stroke="#39FF14" strokeWidth="1.5" />
      <ellipse cx="50" cy="50" rx="30" ry="22" fill="none" stroke="#39FF14" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="10" fill="#39FF14" opacity="0.9" />
      <circle cx="50" cy="50" r="5" fill="#050805" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [dark, setDark]         = useDarkMode();
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: href } });
    }
  };

  useEffect(() => {
    if (isHome && location.state?.scrollTo) {
      const hash = location.state.scrollTo;
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [isHome, location.state]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[900] transition-all duration-500",
          scrolled ? "glass py-3 mx-4 mt-3 border-b border-[var(--border)]" : "py-5 px-8 bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className={cn("flex items-center justify-between", scrolled ? "px-6" : "")}>
          <Link to="/" className="flex items-center gap-3 cursor-none group">
            <div className="animate-omnitrix-pulse"><OmnitrixIcon size={32} /></div>
            <div>
              <span className="font-display text-sm text-[var(--green)] tracking-[4px] uppercase text-glow">BEN 10</span>
              <span className="block font-mono text-[8px] text-[var(--text-muted)] tracking-[3px] uppercase">Omnitrix Database</span>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-0.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="px-4 py-2 text-[10px] font-mono tracking-[3px] uppercase text-[var(--text-muted)] hover:text-[var(--green)] transition-colors cursor-none relative group block"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[var(--green)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_4px_var(--green)]" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button onClick={() => setDark((d) => !d)} className="w-8 h-8 glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--green)] transition-colors cursor-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={dark ? "d" : "l"} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  {dark ? <BsSun size={14} /> : <BsMoon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Fixed: using React Router Link instead of <a href="/About"> */}
            <Link
              to="/about"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-[var(--green)] text-black text-[10px] font-mono tracking-[3px] uppercase font-bold hover:bg-[#5aff3a] transition-colors cursor-none shadow-[0_0_20px_rgba(57,255,20,0.3)]"
              style={{ clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}
            >
              ME...!!
            </Link>

            <button onClick={() => setOpen((o) => !o)} className="md:hidden w-9 h-9 glass flex items-center justify-center text-[var(--green)] cursor-none">
              {open ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[800] flex flex-col items-center justify-center hex-bg"
            style={{ background: "rgba(5,8,5,0.97)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-5xl font-display text-[var(--text)] py-4 hover:text-[var(--green)] transition-colors cursor-none tracking-widest text-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: LINKS.length * 0.07 }}>
              <Link to="/about" onClick={() => setOpen(false)} className="text-3xl font-display text-[var(--green)] py-4 cursor-none tracking-widest text-glow block mt-2">
                ABOUT ME
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
