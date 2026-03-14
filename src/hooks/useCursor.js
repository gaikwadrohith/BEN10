import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const angle = useRef(0);
  const particles = useRef([]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── pool of trail particles ──
    const POOL_SIZE = 10;
    const pool = Array.from({ length: POOL_SIZE }, () => {
      const p = document.createElement("div");
      p.className = "cursor-particle";
      p.style.cssText = "width:4px;height:4px;opacity:0;";
      document.body.appendChild(p);
      return p;
    });
    let poolIndex = 0;

    // ── mouse move ──
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { left: e.clientX, top: e.clientY });

      // spawn trail particle
      const p = pool[poolIndex % POOL_SIZE];
      poolIndex++;
      gsap.killTweensOf(p);
      gsap.set(p, { left: e.clientX, top: e.clientY, width: 4, height: 4, opacity: 0.6 });
      gsap.to(p, {
        left: e.clientX + (Math.random() - 0.5) * 12,
        top: e.clientY + (Math.random() - 0.5) * 12,
        width: 1,
        height: 1,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
      });
    };

    // ── ring follows with lag ──
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

      // slowly spin the ring
      angle.current += 0.4;
      gsap.set(ring, {
        left: pos.current.x,
        top: pos.current.y,
        rotate: angle.current,
      });

      raf.current = requestAnimationFrame(tick);
    };

    // ── click flash ──
    const onClick = () => {
      dot.classList.add("clicking");
      gsap.fromTo(
        dot,
        { scale: 1 },
        {
          scale: 1.6,
          duration: 0.12,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(dot, { scale: 1, duration: 0.25, ease: "elastic.out(1.2,0.5)", onComplete: () => dot.classList.remove("clicking") });
          },
        },
      );
      // ripple on ring
      gsap.fromTo(ring, { scale: 1, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => gsap.set(ring, { scale: 1, opacity: 1 }) });
    };

    // ── hover enter / leave ──
    const onEnter = () => {
      dot.classList.add("hovering");
      ring.classList.add("hovering");
      gsap.to(dot, { width: 24, height: 24, duration: 0.35, ease: "back.out(2)" });
      gsap.to(ring, { width: 72, height: 72, duration: 0.4, ease: "back.out(1.5)" });
    };
    const onLeave = () => {
      dot.classList.remove("hovering");
      ring.classList.remove("hovering");
      gsap.to(dot, { width: 18, height: 18, duration: 0.3, ease: "power3.out" });
      gsap.to(ring, { width: 48, height: 48, duration: 0.35, ease: "power3.out" });
    };

    // ── attach to all interactive elements ──
    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor], input, textarea, select, label").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    raf.current = requestAnimationFrame(tick);
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf.current);
      obs.disconnect();
      pool.forEach((p) => p.remove());
    };
  }, []);

  return { dotRef, ringRef };
}
