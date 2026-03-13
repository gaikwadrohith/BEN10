import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function fadeUpOnScroll(targets, opts = {}) {
  const els = typeof targets === 'string' ? document.querySelectorAll(targets) : [targets].flat()
  els.forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: opts.duration ?? 1, delay: (opts.stagger ?? 0.1) * i,
      ease: opts.ease ?? 'expo.out',
      scrollTrigger: { trigger: el, start: opts.start ?? 'top 88%', toggleActions: 'play none none reverse', ...opts.scrollTrigger },
    })
  })
}

export function parallaxImage(img, container, speed = 0.25) {
  gsap.fromTo(img, { yPercent: -10 * speed * 100 }, {
    yPercent: 10 * speed * 100, ease: 'none',
    scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true },
  })
}

export function horizontalScrollGallery(track, pin) {
  const getWidth = () => track.scrollWidth - window.innerWidth
  gsap.to(track, {
    x: () => -getWidth(), ease: 'none',
    scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${getWidth()}`, pin: true, scrub: 1.2, anticipatePin: 1, invalidateOnRefresh: true },
  })
}

export function staggerWords(container) {
  const words = container.querySelectorAll('.word'); if (!words.length) return
  gsap.fromTo(words, { opacity: 0, y: 40, rotateX: -50 }, {
    opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.07, ease: 'expo.out',
    scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none reverse' },
  })
}

export function scaleIn(el, delay = 0) {
  gsap.fromTo(el, { opacity: 0, scale: 0.88 }, {
    opacity: 1, scale: 1, duration: 1, delay, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
  })
}

export function killAll() { ScrollTrigger.getAll().forEach(t => t.kill()) }
