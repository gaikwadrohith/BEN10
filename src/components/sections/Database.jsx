import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiZap, FiStar } from "react-icons/fi";
import { useGSAP } from "@/components/animations/useGSAP";
import { fadeUpOnScroll } from "@/components/animations/scrollAnimations";
import { ORIGINAL_10, MORE_ALIENS, CATEGORY_COLORS, SERIES_COLORS } from "@/data/ben10";

const ALL_ALIENS = [...ORIGINAL_10, ...MORE_ALIENS];

const CATEGORIES = ["All", "Fire", "Speed", "Strength", "Tech", "Ghost", "Flight", "Crystal", "Aquatic", "Plant", "Sonic", "Energy", "Electric", "Ice", "Gravity", "Time"];
const SERIES = ["All Series", "Original Series", "Alien Force", "Ultimate Alien", "Omniverse"];

// ── Stat bar ────────────────────────────────────────────────────────────────
function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[9px] tracking-[2px] uppercase text-[var(--text-muted)] mb-1">
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-0.5 bg-[var(--border)] overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 6px ${color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
function AlienModal({ alien, onClose }) {
  const color = alien.color;
  const seriesColor = SERIES_COLORS[alien.series] || color;
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ maxWidth: 520, border: `1px solid ${color}30`, background: "rgba(5,8,5,0.95)" }}
        initial={{ scale: 0.88, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 40, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* top glow bar */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

        {/* corner brackets */}
        {[
          { top: 0, left: 0, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
          { top: 0, right: 0, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
          { bottom: 0, left: 0, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
          { bottom: 0, right: 0, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 16, height: 16, zIndex: 3, ...s }} />
        ))}

        {/* ambient bg glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 60% 50% at 70% 30%, ${color}0A, transparent 70%)` }} />

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] cursor-none"
          style={{ border: `1px solid ${color}20` }}
        >
          <FiX size={12} />
        </button>

        <div className="p-8 relative z-[1]">
          {/* top: image + header side by side */}
          <div className="flex gap-6 mb-6">
            {/* image */}
            <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 110, height: 110 }}>
              {imgErr ? (
                <div className="w-full h-full flex items-center justify-center font-mono text-[8px] tracking-widest uppercase" style={{ border: `1px solid ${color}20`, color: `${color}40` }}>
                  No Image
                </div>
              ) : (
                <motion.img
                  src={alien.img}
                  alt={alien.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", filter: `drop-shadow(0 0 20px ${color}60)` }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  onError={() => setImgErr(true)}
                />
              )}
            </div>

            {/* header info */}
            <div className="flex-1 min-w-0">
              {/* series badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[8px] tracking-[3px] uppercase px-2 py-0.5" style={{ color: seriesColor, border: `1px solid ${seriesColor}30`, background: `${seriesColor}10` }}>
                  {alien.series}
                </span>
              </div>

              <p className="font-mono text-[9px] tracking-[4px] uppercase mb-1" style={{ color: `${color}80` }}>
                {alien.species}
              </p>
              <h3 className="font-display leading-none tracking-widest mb-1" style={{ fontSize: "clamp(18px,3vw,28px)", color, textShadow: `0 0 20px ${color}50` }}>
                {alien.name.toUpperCase()}
              </h3>
              {alien.homeworld && (
                <p className="font-mono text-[9px] tracking-[3px] uppercase" style={{ color: "var(--text-muted)" }}>
                  ⬡ {alien.homeworld}
                </p>
              )}

              {/* category badge */}
              <div className="mt-3">
                <span className="font-mono text-[8px] tracking-[2px] uppercase px-2 py-1" style={{ color, border: `1px solid ${color}25`, background: `${color}10` }}>
                  {alien.category}
                </span>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />

          {/* description */}
          {alien.desc && <p className="font-mono text-[10px] leading-relaxed text-[var(--text-muted)] mb-5 tracking-wide">{alien.desc}</p>}

          {/* abilities */}
          {alien.abilities && (
            <div className="mb-5">
              <p className="font-mono text-[8px] tracking-[4px] uppercase mb-2.5" style={{ color: `${color}70` }}>
                // Abilities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {alien.abilities.map((a) => (
                  <span key={a} className="px-2 py-1 font-mono text-[8px] tracking-[1px] uppercase" style={{ background: `${color}0D`, color, border: `1px solid ${color}25` }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* stat bars */}
          <div className="space-y-3">
            <p className="font-mono text-[8px] tracking-[4px] uppercase mb-3" style={{ color: `${color}70` }}>
              // Stats
            </p>
            <StatBar label="Power" value={alien.power} color={color} />
            <StatBar label="Speed" value={alien.speed || 50} color={color} />
            <StatBar label="Strength" value={alien.strength} color={color} />
          </div>
        </div>

        {/* bottom status bar */}
        <div className="flex items-center justify-between px-8 py-3" style={{ borderTop: `1px solid ${color}15`, background: `${color}05` }}>
          <span className="font-mono text-[7px] tracking-[4px] uppercase" style={{ color: `${color}40` }}>
            // Omnitrix DNA · {alien.id}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
            <span className="font-mono text-[7px] tracking-[3px] uppercase" style={{ color: `${color}60` }}>
              Unlocked
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Alien Card ───────────────────────────────────────────────────────────────
function AlienCard({ alien, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const color = alien.color;

  return (
    <motion.button
      onClick={onClick}
      className="db-card panel p-4 text-center group cursor-none relative overflow-hidden"
      style={{ border: `1px solid var(--border)` }}
      whileHover={{ y: -5, scale: 1.03, borderColor: `${color}40` }}
      transition={{ duration: 0.25 }}
    >
      {/* top accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${color}08, transparent 70%)` }}
      />

      {/* image */}
      <div className="mb-2.5 flex justify-center items-center h-12 relative z-[1]">
        {imgErr ? (
          <div className="w-10 h-10 flex items-center justify-center font-mono text-[6px] tracking-widest uppercase" style={{ border: `1px solid ${color}20`, color: `${color}40` }}>
            N/A
          </div>
        ) : (
          <motion.img
            src={alien.img}
            alt={alien.name}
            className="w-10 h-10 object-contain"
            style={{ filter: `drop-shadow(0 0 0px ${color}00)` }}
            whileHover={{ filter: `drop-shadow(0 0 10px ${color}90)`, scale: 1.15 }}
            transition={{ duration: 0.3 }}
            onError={() => setImgErr(true)}
          />
        )}
      </div>

      {/* name */}
      <p className="font-display text-[10px] tracking-widest text-[var(--text)] group-hover:text-[var(--green)] transition-colors truncate relative z-[1]" style={{ lineHeight: 1.3 }}>
        {alien.name}
      </p>

      {/* species */}
      <p className="font-mono text-[7px] text-[var(--text-muted)] tracking-widest mt-0.5 truncate relative z-[1]">{alien.species}</p>

      {/* category badge */}
      <div className="mt-2 relative z-[1]">
        <span
          className="inline-block font-mono text-[7px] px-1.5 py-0.5 tracking-widest"
          style={{ color: CATEGORY_COLORS[alien.category] || color, background: `${CATEGORY_COLORS[alien.category] || color}15` }}
        >
          {alien.category}
        </span>
      </div>

      {/* series dot */}
      <div className="mt-1.5 flex justify-center relative z-[1]">
        <div className="w-1 h-1 rounded-full" style={{ background: SERIES_COLORS[alien.series] || "#39FF14", opacity: 0.5 }} title={alien.series} />
      </div>
    </motion.button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Database() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [series, setSeries] = useState("All Series");
  const [selected, setSelected] = useState(null);
  const [showCats, setShowCats] = useState(false);

  const scopeRef = useGSAP(() => {
    fadeUpOnScroll(".db-card", { stagger: 0.03 });
  }, []);

  const filtered = useMemo(() => {
    return ALL_ALIENS.filter((a) => {
      const q = query.toLowerCase();
      const matchQ = a.name.toLowerCase().includes(q) || a.species.toLowerCase().includes(q) || (a.homeworld || "").toLowerCase().includes(q) || (a.category || "").toLowerCase().includes(q);
      const matchC = category === "All" || a.category === category;
      const matchS = series === "All Series" || a.series === series;
      return matchQ && matchC && matchS;
    });
  }, [query, category, series]);

  return (
    <>
      <AnimatePresence>{selected && <AlienModal alien={selected} onClose={() => setSelected(null)} />}</AnimatePresence>

      <section ref={scopeRef} id="database" className="py-32 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* ── Header ── */}
          <div className="mb-12">
            <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              Omnitrix Database
            </motion.p>
            <motion.h2
              className="font-display text-[clamp(32px,6vw,76px)] leading-[0.9] tracking-wide text-[var(--text)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              ALIEN <span className="text-[var(--green)] text-glow">ROSTER</span>
            </motion.h2>

            {/* series legend */}
            <motion.div className="flex flex-wrap gap-4 mt-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
              {Object.entries(SERIES_COLORS).map(([s, c]) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 4px ${c}` }} />
                  <span className="font-mono text-[8px] tracking-[2px] uppercase" style={{ color: `${c}80` }}>
                    {s}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Search bar ── */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--green)]" size={13} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search alien, species, homeworld..."
                className="w-full glass border-[var(--border)] focus:border-[var(--green)]/40 bg-transparent pl-10 pr-10 py-3 font-mono text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none tracking-widest transition-all"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] cursor-none">
                  <FiX size={11} />
                </button>
              )}
            </div>

            {/* series filter */}
            <div className="flex gap-1.5 flex-wrap">
              {SERIES.map((s) => {
                const sc = s === "All Series" ? "#39FF14" : SERIES_COLORS[s] || "#39FF14";
                return (
                  <button
                    key={s}
                    onClick={() => setSeries(s)}
                    className="px-3 py-2 font-mono text-[8px] tracking-[2px] uppercase transition-all cursor-none whitespace-nowrap"
                    style={
                      series === s
                        ? { background: sc, color: "#000", clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)" }
                        : { border: `1px solid ${sc}20`, color: `${sc}60`, clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)" }
                    }
                  >
                    {s === "All Series" ? "All" : s.replace(" Series", "").replace("Ultimate Alien", "Ult. Alien")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Category filter ── */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-2.5 py-1.5 font-mono text-[8px] tracking-[2px] uppercase transition-all cursor-none"
                  style={
                    category === cat
                      ? {
                          background: CATEGORY_COLORS[cat] || "#39FF14",
                          color: "#000",
                          clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
                        }
                      : {
                          border: `1px solid ${CATEGORY_COLORS[cat] || "#39FF14"}20`,
                          color: `${CATEGORY_COLORS[cat] || "#39FF14"}55`,
                          clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Count ── */}
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-[3px] uppercase">
              {filtered.length} alien{filtered.length !== 1 ? "s" : ""} found
              {(category !== "All" || series !== "All Series" || query) && (
                <button
                  onClick={() => {
                    setCategory("All");
                    setSeries("All Series");
                    setQuery("");
                  }}
                  className="ml-4 text-[var(--green)] hover:opacity-70 cursor-none"
                >
                  — clear filters
                </button>
              )}
            </p>
            <p className="font-mono text-[8px] text-[var(--text-muted)] tracking-[2px] uppercase hidden sm:block">Click to inspect</p>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((alien) => (
              <AlienCard key={alien.id} alien={alien} onClick={() => setSelected(alien)} />
            ))}
          </div>

          {/* ── Empty state ── */}
          {filtered.length === 0 && (
            <motion.div className="text-center py-24" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex justify-center mb-6 opacity-20">
                <svg width="60" height="60" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#39FF14" strokeWidth="2" />
                  <ellipse cx="50" cy="50" rx="20" ry="28" fill="none" stroke="#39FF14" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="8" fill="#39FF14" opacity="0.6" />
                  <circle cx="50" cy="50" r="4" fill="#050805" />
                </svg>
              </div>
              <p className="font-display text-xl text-[var(--text-muted)] tracking-widest mb-2">No aliens found</p>
              <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest">Try a different search or filter</p>
            </motion.div>
          )}

          {/* ── Total count footer ── */}
          <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" style={{ boxShadow: "0 0 8px #39FF14" }} />
              <span className="font-mono text-[9px] tracking-[4px] uppercase text-[var(--text-muted)]">Omnitrix · {ALL_ALIENS.length} DNA Samples Catalogued</span>
            </div>
            <div className="flex gap-6">
              {Object.entries(SERIES_COLORS).map(([s, c]) => {
                const count = ALL_ALIENS.filter((a) => a.series === s).length;
                return (
                  <div key={s} className="text-center">
                    <div className="font-mono text-[11px] tracking-widest" style={{ color: c }}>
                      {count}
                    </div>
                    <div className="font-mono text-[7px] tracking-widest uppercase" style={{ color: `${c}50` }}>
                      {s.replace(" Series", "").replace("Ultimate Alien", "UA")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}