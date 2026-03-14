import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import Contact from "../components/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "React", level: 92, color: "#61DAFB" },
  { name: "GSAP", level: 88, color: "#39FF14" },
  { name: "CSS / SCSS", level: 90, color: "#FF69B4" },
  { name: "Node.js", level: 78, color: "#68A063" },
  { name: "Three.js", level: 70, color: "#00BFFF" },
  { name: "Figma", level: 85, color: "#F24E1E" },
];

const TIMELINE = [
  { year: "2019", title: "Started Coding", desc: "Fell in love with frontend development and never looked back." },
  { year: "2020", title: "First Project", desc: "Built my first full-stack app and deployed it to production." },
  { year: "2021", title: "React Mastery", desc: "Went deep on React, GSAP animations and interactive UI." },
  { year: "2022", title: "Design Systems", desc: "Started building design systems and component libraries." },
  { year: "2023", title: "Open Source", desc: "Contributing to open source and building in public." },
  { year: "2024", title: "Going Further", desc: "Exploring 3D web, WebGL and advanced animation techniques." },
];

const STATS = [
  { label: "Projects", value: "20+" },
  { label: "Experience", value: "5yr" },
  { label: "Clients", value: "12+" },
  { label: "Coffee/day", value: "∞" },
];

const SERVICES = [
  { icon: "⬡", title: "UI Development", desc: "Pixel-perfect interfaces with smooth animations and interactions." },
  { icon: "⬡", title: "Motion Design", desc: "GSAP & Framer Motion powered experiences that breathe life." },
  { icon: "⬡", title: "3D Web", desc: "Three.js and WebGL scenes that push browser boundaries." },
  { icon: "⬡", title: "Design Systems", desc: "Scalable component libraries built for teams." },
];

const ROLES = ["Frontend Developer", "UI Architect", "Motion Designer", "Creative Coder", "WebGL Explorer"];

// ── Magnetic Button ─────────────────────────────────────────────────────────
function MagneticButton({ children, style, href, target, rel }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * 0.45);
    y.set(dy * 0.45);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ ...style, x: sx, y: sy, display: "inline-block", textDecoration: "none" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.a>
  );
}

// ── Cycling Role Text ────────────────────────────────────────────────────────
function CyclingRoles() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 350);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 32,
        borderLeft: "2px solid #39FF14",
        paddingLeft: 16,
        height: 28,
        overflow: "hidden",
      }}
    >
      {/* dot indicator */}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#39FF14",
          boxShadow: "0 0 8px #39FF14",
          flexShrink: 0,
          display: "inline-block",
        }}
      />

      <motion.span
        key={index}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 13,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "rgba(57,255,20,0.75)",
          whiteSpace: "nowrap",
        }}
      >
        {ROLES[index]}
      </motion.span>

      {/* step dots */}
      {/* <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
        {ROLES.map((_, i) => (
          <span key={i} style={{
            width: i === index ? 12 : 4,
            height: 4,
            borderRadius: 2,
            background: i === index ? '#39FF14' : 'rgba(57,255,20,0.2)',
            boxShadow: i === index ? '0 0 6px #39FF14' : 'none',
            transition: 'all 0.35s ease',
            display: 'inline-block',
          }} />
        ))}
      </div> */}
    </div>
  );
}

export default function AboutPage() {
  const [photoError, setPhotoError] = useState(false);
  const nameRef = useRef(null);
  const tagRef = useRef(null);
  const bioRef = useRef(null);
  const imgRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const skillsRef = useRef([]);
  const timelineRef = useRef([]);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem("about-loaded")) {
      sessionStorage.setItem("about-loaded", "true");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        gsap.set([nameRef.current, tagRef.current, bioRef.current, ctaRef.current, statsRef.current], { opacity: 0, y: 40 });
        gsap.set(imgRef.current, { opacity: 0, scale: 0.85 });

        const tl = gsap.timeline({ delay: 0.1 });
        tl.to(nameRef.current, { opacity: 1, y: 0, duration: 1, ease: "power4.out" })
          .to(tagRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .to(bioRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .to(statsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
          .to(imgRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, "-=1.4");

        skillsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: 0, x: -30 });
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            onEnter: () => {
              gsap.to(el, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.07, ease: "power3.out" });
              const bar = el.querySelector(".skill-fill");
              if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.8, delay: i * 0.07 + 0.15, ease: "power3.out", transformOrigin: "left" });
            },
            once: true,
          });
        });

        timelineRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: 0, x: i % 2 === 0 ? -40 : 40 });
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.6, delay: i * 0.04, ease: "power3.out" }),
            once: true,
          });
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'Exo 2', sans-serif", overflowX: "hidden" }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(120px,14vw,160px) clamp(20px,5vw,80px) 80px",
          position: "relative",
          gap: "clamp(40px,6vw,80px)",
          maxWidth: 1200,
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle at 1px 1px,rgba(57,255,20,0.04) 1px,transparent 0)", backgroundSize: "30px 30px" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(57,255,20,0.01) 3px,rgba(57,255,20,0.01) 4px)",
          }}
        />

        <div style={{ flex: 1, minWidth: 280, position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "#39FF14", marginBottom: 16, textShadow: "0 0 10px #39FF14" }}>
            // Bio.init()
          </p>

          <h1
            ref={nameRef}
            style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(36px,6vw,88px)", lineHeight: 0.95, letterSpacing: 2, textTransform: "uppercase", color: "var(--text)", marginBottom: 24 }}
          >
            GAIKWAD
            <br />
            <span style={{ color: "#39FF14", textShadow: "0 0 30px #39FF14, 0 0 60px rgba(57,255,20,0.3)" }}>ROHIT</span>
          </h1>

          {/* ── Cycling roles ── */}
          <div ref={tagRef}>
            <CyclingRoles />
          </div>

          <p ref={bioRef} style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, lineHeight: 1.8, color: "var(--text-muted)", maxWidth: 520, marginBottom: 32 }}>
            I build immersive web experiences that blur the line between design and code. Passionate about motion, interaction, and pushing what's possible in the browser. Currently obsessed with
            GSAP, React and creative frontend development.
          </p>

          {/* Stats */}
          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40, maxWidth: 400 }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "20px 24px",
                  border: "1px solid rgba(57,255,20,0.15)",
                  background: "rgba(57,255,20,0.03)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#39FF14,transparent)", opacity: 0.5 }} />
                <div style={{ color: "#39FF14", opacity: 0.7 }}>
                  {s.label === "Projects" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.5">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                      <path d="M7 8h4M7 11h8" />
                    </svg>
                  )}
                  {s.label === "Experience" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  )}
                  {s.label === "Clients" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.5">
                      <circle cx="9" cy="7" r="3" />
                      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
                    </svg>
                  )}
                  {s.label === "Coffee/day" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.5">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                      <line x1="6" y1="1" x2="6" y2="4" />
                      <line x1="10" y1="1" x2="10" y2="4" />
                      <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                  )}
                </div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(20px,2.5vw,28px)", color: "#39FF14", textShadow: "0 0 20px #39FF14", letterSpacing: 2, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Magnetic Buttons ── */}
          <div ref={ctaRef} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <MagneticButton
              href="mailto:you@email.com"
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: 10,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#010201",
                background: "#39FF14",
                padding: "14px 32px",
                boxShadow: "0 0 20px rgba(57,255,20,0.4)",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                cursor: "none",
              }}
            >
              Hire Me
            </MagneticButton>

            <MagneticButton
              href="#timeline"
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: 10,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#39FF14",
                border: "1px solid rgba(57,255,20,0.4)",
                padding: "14px 32px",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                cursor: "none",
              }}
            >
              My Journey
            </MagneticButton>

            <MagneticButton
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: 10,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "var(--text-muted)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "14px 32px",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                cursor: "none",
              }}
            >
              GitHub
            </MagneticButton>
          </div>
        </div>

        {/* Photo */}
        <div ref={imgRef} style={{ flexShrink: 0, width: "clamp(240px,28vw,320px)", height: "clamp(280px,33vw,380px)", position: "relative", zIndex: 2 }}>
          <div style={{ position: "absolute", top: -8, left: -8, right: 8, bottom: 8, border: "1px solid rgba(57,255,20,0.2)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 8, left: 8, right: -8, bottom: -8, border: "1px solid rgba(57,255,20,0.08)", pointerEvents: "none" }} />
          {[
            { top: 0, left: 0 },
            { top: 0, right: 0 },
            { bottom: 0, left: 0 },
            { bottom: 0, right: 0 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                width: 20,
                height: 20,
                borderTop: pos.bottom === undefined ? "2px solid #39FF14" : "none",
                borderBottom: pos.top === undefined ? "2px solid #39FF14" : "none",
                borderLeft: pos.right === undefined ? "2px solid #39FF14" : "none",
                borderRight: pos.left === undefined ? "2px solid #39FF14" : "none",
              }}
            />
          ))}
          {photoError ? (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0a1f0a,#030803)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "rgba(57,255,20,0.3)" }}>Your Photo</span>
            </div>
          ) : (
            <img
              src="/images/about/photo.png"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) contrast(1.1)", display: "block" }}
              onError={() => setPhotoError(true)}
            />
          )}
          <div style={{ position: "absolute", bottom: -16, right: -16, background: "#39FF14", padding: "10px 16px", clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#010201", fontWeight: 700 }}>Available ✓</span>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        style={{
          padding: "clamp(60px,8vw,80px) clamp(20px,5vw,80px)",
          background: "rgba(57,255,20,0.02)",
          borderTop: "1px solid rgba(57,255,20,0.06)",
          borderBottom: "1px solid rgba(57,255,20,0.06)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "#39FF14", marginBottom: 8, textShadow: "0 0 10px #39FF14" }}>
            // Services.list()
          </p>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(24px,4vw,52px)", color: "var(--text)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 48 }}>What I Do</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{ padding: "28px 24px", border: "1px solid rgba(57,255,20,0.12)", background: "rgba(57,255,20,0.03)", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#39FF14,transparent)", opacity: 0.4 }} />
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 24, color: "#39FF14", marginBottom: 16, textShadow: "0 0 10px #39FF14" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "var(--text)", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, lineHeight: 1.7, color: "var(--text-muted)", margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section style={{ padding: "clamp(60px,8vw,80px) clamp(20px,5vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "#39FF14", marginBottom: 8, textShadow: "0 0 10px #39FF14" }}>
          // Skills.load()
        </p>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(24px,4vw,52px)", color: "var(--text)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 56 }}>Arsenal</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "32px 60px" }}>
          {SKILLS.map((skill, i) => (
            <div key={skill.name} ref={(el) => (skillsRef.current[i] = el)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "var(--text)" }}>{skill.name}</span>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 2, color: skill.color }}>{skill.level}%</span>
              </div>
              <div style={{ height: 2, background: "rgba(57,255,20,0.08)", position: "relative", overflow: "hidden" }}>
                <div
                  className="skill-fill"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg,${skill.color},${skill.color}80)`,
                    boxShadow: `0 0 8px ${skill.color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section id="timeline" style={{ padding: "clamp(60px,8vw,80px) clamp(20px,5vw,80px) 120px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "#39FF14", marginBottom: 8, textShadow: "0 0 10px #39FF14" }}>
          // Timeline.render()
        </p>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(24px,4vw,52px)", color: "var(--text)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 64 }}>Journey</h2>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 180,
            bottom: 80,
            width: 1,
            background: "linear-gradient(to bottom,rgba(57,255,20,0.4),rgba(57,255,20,0.05))",
            transform: "translateX(-50%)",
          }}
        />
        <div style={{ position: "relative" }}>
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              ref={(el) => (timelineRef.current[i] = el)}
              style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end", marginBottom: 48, paddingLeft: i % 2 === 0 ? 0 : "50%", paddingRight: i % 2 === 0 ? "50%" : 0 }}
            >
              <div
                style={{
                  width: "calc(100% - 48px)",
                  padding: "24px 28px",
                  background: "rgba(57,255,20,0.03)",
                  border: "1px solid rgba(57,255,20,0.12)",
                  position: "relative",
                  marginLeft: i % 2 === 0 ? 0 : 48,
                  marginRight: i % 2 === 0 ? 48 : 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    [i % 2 === 0 ? "right" : "left"]: -52,
                    transform: "translateY(-50%)",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#39FF14",
                    boxShadow: "0 0 12px #39FF14, 0 0 24px rgba(57,255,20,0.4)",
                  }}
                />
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#39FF14", display: "block", marginBottom: 6 }}>
                  {item.year}
                </span>
                <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: "var(--text)", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, lineHeight: 1.7, color: "var(--text-muted)", margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`html { scroll-behavior: smooth; }`}</style>
      <Contact />
    </div>
  );
}
