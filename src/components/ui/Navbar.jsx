import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import { cn } from "@/utils/helpers";

const LINKS = [
  { label: "Aliens", href: "#aliens" },
  { label: "Series", href: "#series" },
  { label: "Gallery", href: "#gallery" },
  { label: "Villains", href: "#villains" },
  { label: "Database", href: "#database" },
];

function OmnitrixIcon({ size = 36 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justiFfyContent: "center" }}>
      {/* Outer rotating conic ring */}
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, #39FF14, transparent 40%, #39FF14 60%, transparent 80%, #39FF14)",
          animation: "omniSpin 3s linear infinite",
          opacity: 0.85,
          clipPath: "circle(50%)",
        }}
      />
      {/* Pulse glow ring */}
      <div
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: "50%",
          boxShadow: "0 0 8px 2px rgba(57,255,20,0.4), 0 0 16px 4px rgba(57,255,20,0.15)",
          animation: "omniPulse 2s ease-in-out infinite",
          clipPath: "circle(50%)",
        }}
      />
      {/* Mask to clip the conic gradient into a ring */}
      <div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: "radial-gradient(circle, transparent 42%, rgba(5,8,5,1) 43%, rgba(5,8,5,1) 48%, transparent 49%)",
          pointerEvents: "none",
          clipPath: "circle(50%)",
        }}
      />
      {/* PNG image */}
      <img
        src="/images/omnitrix/omnitrix-logo.png"
        alt="Omnitrix"
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: "50%",
          position: "relative",
          zIndex: 1,
          clipPath: "circle(50%)",
        }}
      />
      <style>{`
        @keyframes omniSpin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes omniPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

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
        navigate(location.pathname, { replace: true, state: {} });
      }, 300);
    }
  }, [isHome, location.state, navigate, location.pathname]);

  return (
    <>
      <motion.header
        className={cn("fixed top-0 left-0 right-0 z-[900] transition-all duration-500", scrolled ? "glass py-3 mx-4 mt-3 border-b border-[var(--border)]" : "py-5 px-8 bg-transparent")}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className={cn("flex items-center justify-between", scrolled ? "px-6" : "")}>
          <Link to="/" className="flex items-center gap-3 group">
            <OmnitrixIcon size={32} />
            <div>
              <span className="font-display text-sm text-[var(--green)] tracking-[4px] uppercase">BEN 10</span>
              <span className="block font-mono text-[8px] text-[var(--text-muted)] tracking-[3px] uppercase">Omnitrix Database</span>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-0.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  to="/"
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="px-4 py-2 text-[10px] font-mono tracking-[3px] uppercase text-[var(--text-muted)] hover:text-[var(--green)] transition-colors relative group block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button onClick={() => setDark((d) => !d)} className="w-8 h-8 glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--green)] transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={dark ? "d" : "l"} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  {dark ? <BsSun size={14} /> : <BsMoon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Link
              to="/about"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[10px] font-mono tracking-[3px] uppercase font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: "transparent",
                color: "#39FF14",
                border: "1px solid #39FF14",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                boxShadow: "0 0 10px rgba(57,255,20,0.3), inset 0 0 10px rgba(57,255,20,0.05)",
                letterSpacing: "4px",
                textShadow: "0 0 8px #39FF14",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#39FF14";
                e.currentTarget.style.color = "#010201";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(57,255,20,0.6), inset 0 0 20px rgba(57,255,20,0.1)";
                e.currentTarget.style.textShadow = "none";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#39FF14";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(57,255,20,0.3), inset 0 0 10px rgba(57,255,20,0.05)";
                e.currentTarget.style.textShadow = "0 0 8px #39FF14";
              }}
            >
              FAN.ME
            </Link>

            <button onClick={() => setOpen((o) => !o)} className="md:hidden w-9 h-9 glass flex items-center justify-center text-[var(--green)]">
              {open ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[800] flex flex-col items-center justify-center"
            style={{ background: "rgba(5,8,5,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {LINKS.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link to="/" onClick={(e) => handleNavClick(e, l.href)} className="text-5xl font-display text-[var(--text)] py-4 hover:text-[var(--green)] transition-colors block">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/about" onClick={() => setOpen(false)} className="text-3xl font-display text-[var(--green)] py-4 block mt-2">
              ABOUT ME
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
