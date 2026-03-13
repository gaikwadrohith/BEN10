import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ALIENS = [
  { file: "alien1.png", name: "Fourarms" },
  { file: "alien2.png", name: "Cannonbolt" },
  { file: "alien3.png", name: "Wildvine" },
  { file: "alien4.png", name: "Heatblast" },
  { file: "alien5.png", name: "Diamondhead" },
  { file: "alien6.png", name: "XLR8" },
  { file: "alien7.png", name: "Stinkfly" },
  { file: "alien8.png", name: "Upgrade" },
  { file: "alien9.png", name: "Ghostfreak" },
  { file: "alien10.png", name: "Ripjaws" },
  { file: "alien11.png", name: "Wildmutt" },
  { file: "alien12.png", name: "Greymatter" },
];

const TOTAL = ALIENS.length;
const RADIUS = 220;

// ── EASY SIZE CONTROLS ──────────────────
const WATCH_START_SCALE = 3;
const WATCH_END_SCALE = 2;
const WATCH_WIDTH = 400;
const SYMBOL_WIDTH_START = 80;
const SYMBOL_WIDTH_END = 80; 
// ────────────────────────────────────────

export default function Gallery() {
  const sectionRef = useRef(null);
  const watchWrapRef = useRef(null);
  const symbolImgRef = useRef(null);
  const alienRefs = useRef([]);
  const labelRefs = useRef([]);
  const orbitSvgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const glowRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const scrollDirRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);
  const orbitActive = useRef(false);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const [hoveredAlien, setHoveredAlien] = useState(null);

  function placeAliens(masterAngle) {
    ALIENS.forEach((_, i) => {
      const el = alienRefs.current[i];
      const lbl = labelRefs.current[i];
      if (!el) return;
      const angle = masterAngle + (i / TOTAL) * 360;
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * RADIUS;
      const y = Math.sin(rad) * RADIUS;
      gsap.set(el, { x, y });
      if (lbl) gsap.set(lbl, { x, y: y + 46 });
    });
  }

  // Omnitrix cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
    };

    let ringRaf;
    function animateRing() {
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.12;
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y });
      ringRaf = requestAnimationFrame(animateRing);
    }
    ringRaf = requestAnimationFrame(animateRing);

    const onEnter = () => gsap.to([cursor, ring], { scale: 1.6, duration: 0.3 });
    const onLeave = () => gsap.to([cursor, ring], { scale: 1, duration: 0.3 });

    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(ringRaf);
    };
  }, []);

  useEffect(() => {
    gsap.set(watchWrapRef.current, { scale: WATCH_START_SCALE, opacity: 1 });
    gsap.set(alienRefs.current, { opacity: 0, scale: 0 });
    gsap.set(labelRefs.current, { opacity: 0 });
    gsap.set(orbitSvgRef.current, { opacity: 0 });
    gsap.set(titleRef.current, { opacity: 0, y: 30 });
    gsap.set(subtitleRef.current, { opacity: 0 });
    gsap.set(glowRef.current, { scale: 0.3, opacity: 0 });
    gsap.set(".watch-img", { opacity: 1 });
    gsap.set(symbolImgRef.current, { opacity: 0, width: SYMBOL_WIDTH_START });

    placeAliens(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2400",
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      },
    });

    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.15 }, 0);
    tl.to(subtitleRef.current, { opacity: 1, duration: 0.1 }, 0.08);
    tl.to(watchWrapRef.current, { scale: WATCH_END_SCALE, duration: 0.5, ease: "power3.inOut" }, 0.05);
    tl.to(".watch-img", { opacity: 0, duration: 0.12 }, 0.55);
    tl.to(symbolImgRef.current, { opacity: 1, width: SYMBOL_WIDTH_END, duration: 0.2, ease: "back.out(1.5)" }, 0.57);
    tl.to(glowRef.current, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.5)" }, 0.6);
    tl.to(orbitSvgRef.current, { opacity: 1, duration: 0.15 }, 0.63);

    ALIENS.forEach((_, i) => {
      tl.to(
        alienRefs.current[i],
        {
          opacity: 1,
          scale: 1,
          duration: 0.12,
          ease: "back.out(2.5)",
        },
        0.65 + i * 0.024,
      );
    });

    labelRefs.current.forEach((el, i) => {
      tl.to(el, { opacity: 1, duration: 0.08 }, 0.92 + i * 0.008);
    });

    const onScroll = () => {
      const cy = window.scrollY;
      const dy = cy - lastScrollY.current;
      lastScrollY.current = cy;
      if (Math.abs(dy) < 1) return;
      scrollDirRef.current = dy > 0 ? 1 : -1;
      velocityRef.current = Math.min(Math.abs(dy) * 0.2, 3);
      if (progressRef.current > 0.45 && !orbitActive.current) {
        orbitActive.current = true;
        runOrbit();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      stopOrbit();
    };
  }, []);

  function runOrbit() {
    if (rafRef.current) return;
    function tick() {
      velocityRef.current *= 0.93;
      angleRef.current += scrollDirRef.current * velocityRef.current;
      placeAliens(angleRef.current);
      if (velocityRef.current > 0.04) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        orbitActive.current = false;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopOrbit() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  const onHover = (i, enter) => {
    setHoveredAlien(enter ? i : null);
    gsap.to(alienRefs.current[i], {
      scale: enter ? 1.35 : 1,
      duration: 0.3,
      ease: "back.out(2)",
      overwrite: "auto",
    });
  };

  const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
    left: `${8 + ((i * 5.2) % 84)}%`,
    bottom: `${5 + ((i * 6) % 35)}%`,
    delay: `${(i * 0.3) % 3.5}s`,
    size: 2 + (i % 3),
    dur: `${2.5 + (i % 3) * 0.8}s`,
  }));

  return (
    <>
      {/* ── Omnitrix Cursor ── */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          marginLeft: -7,
          marginTop: -7,
          borderRadius: "50%",
          background: "#39FF14",
          boxShadow: "0 0 10px #39FF14, 0 0 20px rgba(57,255,20,0.6)",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "screen",
        }}
      >
        {/* Omnitrix X symbol */}
        <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: "absolute", top: 0, left: 0 }}>
          <line x1="2" y1="2" x2="12" y2="12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="2" x2="2" y2="12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div
        ref={cursorRingRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          borderRadius: "50%",
          border: "1.5px solid rgba(57,255,20,0.7)",
          boxShadow: "0 0 8px rgba(57,255,20,0.3)",
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />

      <section
        ref={sectionRef}
        id="gallery"
        style={{
          height: "100vh",
          background: "radial-gradient(ellipse at 50% 55%, #0a1f0a 0%, #040904 55%, #010201 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          cursor: "none",
        }}
      >
        {/* Hex dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: "radial-gradient(circle at 1px 1px,rgba(57,255,20,0.06) 1px,transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Scan lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(57,255,20,0.015) 3px,rgba(57,255,20,0.015) 4px)",
          }}
        />

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "#39FF14",
              boxShadow: "0 0 5px #39FF14, 0 0 10px rgba(57,255,20,0.4)",
              opacity: 0.35,
              animation: `floatUp ${p.dur} ease-in ${p.delay} infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Title */}
        <div ref={titleRef} style={{ position: "absolute", top: 52, textAlign: "center", zIndex: 20 }}>
          <p
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: 10,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#39FF14",
              marginBottom: 6,
              textShadow: "0 0 10px #39FF14",
            }}
          >
            — Omnitrix Interface —
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: "clamp(20px,3.5vw,48px)",
              color: "#fff",
              letterSpacing: 6,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            ALIEN <span style={{ color: "#39FF14", textShadow: "0 0 18px #39FF14, 0 0 40px rgba(57,255,20,0.4)" }}>SELECTOR</span>
          </h2>
        </div>

        <div ref={subtitleRef} style={{ position: "absolute", top: 144, textAlign: "center", zIndex: 20 }}>
          <p
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: 9,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(57,255,20,0.38)",
              margin: 0,
            }}
          >
            Scroll ↓ clockwise · Scroll ↑ anti-clockwise · Hover to inspect
          </p>
        </div>

        {/* Orbit stage */}
        <div
          style={{
            position: "relative",
            width: 560,
            height: 560,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Glow */}
          <div
            ref={glowRef}
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(57,255,20,0.18) 0%, transparent 70%)",
              boxShadow: "0 0 100px rgba(57,255,20,0.15)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Orbit ring SVG */}
          <svg ref={orbitSvgRef} style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} viewBox="0 0 560 560">
            <circle cx="280" cy="280" r={RADIUS} fill="none" stroke="rgba(57,255,20,0.18)" strokeWidth="1" strokeDasharray="5 8" />
            <circle cx="280" cy="280" r={RADIUS + 12} fill="none" stroke="rgba(57,255,20,0.06)" strokeWidth="1" />
            {ALIENS.map((_, i) => {
              const a = (i / TOTAL) * 2 * Math.PI;
              return (
                <line
                  key={i}
                  x1={280 + Math.cos(a) * RADIUS}
                  y1={280 + Math.sin(a) * RADIUS}
                  x2={280 + Math.cos(a) * (RADIUS + 10)}
                  y2={280 + Math.sin(a) * (RADIUS + 10)}
                  stroke="rgba(57,255,20,0.35)"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>

          {/* Watch wrapper */}
          <div
            ref={watchWrapRef}
            style={{
              position: "relative",
              zIndex: 5,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            {[130, 180].map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: s,
                  height: s,
                  borderRadius: "50%",
                  border: `${i === 0 ? 2 : 1}px solid rgba(57,255,20,${i === 0 ? 0.35 : 0.15})`,
                  transform: "translate(-50%,-50%)",
                  animation: `pulse1 2.4s ease-out ${i * 0.8}s infinite`,
                  pointerEvents: "none",
                }}
              />
            ))}

            <img
              src="/images/aliens/watch.png"
              alt="Omnitrix"
              className="watch-img"
              style={{
                width: WATCH_WIDTH,
                height: "auto",
                display: "block",
                filter: "drop-shadow(0 0 28px rgba(57,255,20,0.8)) drop-shadow(0 0 70px rgba(57,255,20,0.35))",
              }}
            />

            <img
              ref={symbolImgRef}
              src="/images/aliens/symbol.png"
              alt="Omnitrix Symbol"
              className="symbol-img"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: SYMBOL_WIDTH_START,
                height: "auto",
                opacity: 0,
                borderRadius: "22%",
                WebkitMaskImage: "radial-gradient(ellipse 85% 90% at center, black 60%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 85% 90% at center, black 60%, transparent 100%)",
                filter: "drop-shadow(0 0 40px rgba(57,255,20,1)) drop-shadow(0 0 100px rgba(57,255,20,0.6))",
              }}
            />
          </div>

          {/* Aliens */}
          {ALIENS.map((alien, i) => (
            <div key={alien.name} style={{ position: "absolute", top: "50%", left: "50%", zIndex: 10 }}>
              <div
                ref={(el) => (alienRefs.current[i] = el)}
                onMouseEnter={() => onHover(i, true)}
                onMouseLeave={() => onHover(i, false)}
                style={{
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, rgba(4,9,4,0.85) 68%, rgba(4,9,4,0.98) 100%)",
                  border: hoveredAlien === i ? "2px solid #39FF14" : "1.5px solid rgba(57,255,20,0.4)",
                  boxShadow: hoveredAlien === i ? "0 0 22px rgba(57,255,20,0.65), inset 0 0 16px rgba(57,255,20,0.15)" : "0 0 12px rgba(57,255,20,0.18)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "none",
                  pointerEvents: "all",
                  transition: "border 0.3s, box-shadow 0.3s",
                  willChange: "transform",
                }}
              >
                <img
                  src={`/images/aliens/${alien.file}`}
                  alt={alien.name}
                  style={{
                    width: 52,
                    height: 52,
                    objectFit: "contain",
                    WebkitMaskImage: "radial-gradient(circle at center, black 48%, transparent 72%)",
                    maskImage: "radial-gradient(circle at center, black 48%, transparent 72%)",
                    filter: "drop-shadow(0 0 5px rgba(57,255,20,0.5))",
                  }}
                />
              </div>
              <div
                ref={(el) => (labelRefs.current[i] = el)}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, 0)",
                  textAlign: "center",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  willChange: "transform",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Orbitron',monospace",
                    fontSize: 7,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#39FF14",
                    textShadow: "0 0 6px #39FF14",
                    margin: 0,
                  }}
                >
                  {alien.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredAlien !== null && (
          <div
            style={{
              position: "absolute",
              bottom: 72,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(4,10,4,0.94)",
              border: "1px solid rgba(57,255,20,0.45)",
              padding: "9px 22px",
              backdropFilter: "blur(14px)",
              textAlign: "center",
              zIndex: 30,
              boxShadow: "0 0 24px rgba(57,255,20,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#39FF14",
                textShadow: "0 0 10px #39FF14",
                margin: 0,
              }}
            >
              {ALIENS[hoveredAlien].name}
            </p>
            <p
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: 9,
                letterSpacing: 3,
                color: "rgba(57,255,20,0.45)",
                margin: "3px 0 0",
                textTransform: "uppercase",
              }}
            >
              Omnitrix Form Active
            </p>
          </div>
        )}

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            zIndex: 20,
          }}
        >
          <p
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: 9,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "rgba(57,255,20,0.3)",
              margin: 0,
            }}
          >
            Scroll to activate
          </p>
          <div
            style={{
              width: 1,
              height: 28,
              background: "linear-gradient(to bottom, rgba(57,255,20,0.5), transparent)",
              animation: "blinkLine 1.5s ease-in-out infinite",
            }}
          />
        </div>

        <style>{`
          * { cursor: none !important; }
          @keyframes pulse1 {
            0%   { transform:translate(-50%,-50%) scale(1);   opacity:0.65; }
            100% { transform:translate(-50%,-50%) scale(2.6); opacity:0;    }
          }
          @keyframes floatUp {
            0%   { transform:translateY(0);      opacity:0.45; }
            80%  { opacity:0.25; }
            100% { transform:translateY(-170px); opacity:0;    }
          }
          @keyframes blinkLine {
            0%,100% { opacity:0.25; }
            50%     { opacity:1;    }
          }
        `}</style>
      </section>
    </>
  );
}
