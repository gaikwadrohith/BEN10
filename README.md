# Ben 10 Universe — Vite + React

> Omnitrix Editorial × Sci-Fi Alien Tech. Deep black/green, neon lime glow, scan-line panels, hex-grid textures.

## Quick Start

```bash
npm install
npm run dev
```

→ **http://localhost:5173**

---

## Tech Stack

| Library | Purpose |
|---|---|
| React 18 + Vite 5 | Framework + build |
| TailwindCSS 3 | Styling |
| GSAP 3 + ScrollTrigger | Advanced animations |
| Lenis 1.1 | Buttery smooth scroll |
| Framer Motion 11 | React animations |
| React Icons 5 | Icons |
| React Router DOM 6 | Routing + code splitting |
| clsx + tailwind-merge | Class utilities |

---

## Folder Structure

```
src/
├── components/
│   ├── ui/           → Button (magnetic + angular), Navbar, Footer
│   ├── animations/   → useGSAP.js, scrollAnimations.js
│   └── sections/     → Hero, About, Features, Gallery, Testimonials, Contact
├── data/             → ben10.js (all alien data, series, villains, stats)
├── hooks/            → useLenis, useCursor (Omnitrix cursor), useDarkMode
├── layouts/          → MainLayout (cursor + progress + Lenis + Navbar)
├── pages/            → Home, NotFound
├── styles/           → globals.css
└── utils/            → helpers.js
```

---

## Features Checklist

| Feature | Implementation |
|---|---|
| Omnitrix cursor | Lime-green glowing dot + ring in `useCursor.js` |
| Word-by-word reveal | Framer Motion `rotateX` stagger in `Hero.jsx` |
| Floating Omnitrix watch | Custom SVG watch with alien icons in `Hero.jsx` |
| Original 10 explorer | Interactive sidebar → stat bars, abilities, lore in `Features.jsx` |
| Horizontal alien gallery | GSAP ScrollTrigger pin — all 20 aliens scroll horizontally |
| Alien Database search | Filter by name/species + category tabs — 20 aliens |
| Alien detail modal | Click any alien for full stats, abilities, animated stat bars |
| Series timeline | All 5 series with selectable detail panel in `Testimonials.jsx` |
| Villains grid | 6 iconic villains with hover glow in `Testimonials.jsx` |
| Scanline panels | CSS `::after` on `.scanlines` class throughout |
| Hex-grid backgrounds | Dot-grid CSS pattern via `.hex-bg` |
| Corner brackets | `.bracketed` class for sci-fi panel framing |
| Magnetic buttons | Angular clip-path buttons + `useMagneticButton()` elastic GSAP |
| Smooth scroll | Lenis → GSAP ticker sync |
| Scroll progress | GSAP scaleX on `#scroll-progress` — green glow |
| Dark/light toggle | `useDarkMode.js` with `localStorage` |
| Code splitting | `lazy()` + `Suspense` with Omnitrix spinner loader |

---

## Image Prompts — Total: 12

Generate with **Leonardo.ai** (free) → model: **Leonardo Diffusion XL** or **Midjourney v6**

---

### 1️⃣ Hero Background
**Location:** `public/images/hero/hero-bg.webp`
```
epic sci-fi alien landscape, Ben 10 inspired, glowing green energy Omnitrix watch floating,
dark night sky, alien planets in background, cinematic dramatic lighting, neon green accents,
hex grid patterns, ultra detailed, 4K wide angle, no text
```

---

### 2️⃣ About / Omnitrix Close-up
**Location:** `public/images/hero/omnitrix-closeup.webp`
```
extreme close-up of a futuristic alien DNA watch device, glowing green hourglass symbol,
dark metallic wristband, cinematic macro photography, neon green light glow,
sci-fi tech aesthetic, 4K detail, black background
```

---

### 3️⃣ Alien Landscape — Pyros (Heatblast's world)
**Location:** `public/images/aliens/pyros.webp`
```
alien volcanic planet surface, rivers of lava, magma geysers, dark sky with two moons,
cinematic sci-fi, orange red dramatic lighting, no characters, epic scale, 4K
```

---

### 4️⃣ Alien Landscape — Kinet (XLR8's world)
**Location:** `public/images/aliens/kinet.webp`
```
alien high-speed desert planet, electric blue lightning storms, speed blur landscape,
dark sky, cinematic sci-fi environment art, neon blue atmosphere, no characters
```

---

### 5️⃣ Alien Landscape — Galvan Prime (Grey Matter's world)
**Location:** `public/images/aliens/galvan.webp`
```
alien intellectual civilization cityscape, glowing tech towers, blue-silver architecture,
advanced alien city at night, cinematic sci-fi concept art, no characters, 4K
```

---

### 6️⃣ Gallery Card BG 1 — Fire/Energy
**Location:** `public/images/gallery/bg-fire.webp`
```
abstract fiery alien energy explosion, dark background, orange-red plasma tendrils,
cinematic digital art, no characters, 16:9, 4K
```

---

### 7️⃣ Gallery Card BG 2 — Speed/Electric
**Location:** `public/images/gallery/bg-speed.webp`
```
abstract electric speed blur trail, dark background, neon blue lightning streaks,
motion blur energy art, cinematic, no characters, 4K
```

---

### 8️⃣ Gallery Card BG 3 — Crystal/Diamond
**Location:** `public/images/gallery/bg-crystal.webp`
```
abstract crystalline fractal structure, cyan and white glowing diamonds,
dark background, macro sci-fi render, cinematic, no characters, 4K
```

---

### 9️⃣ Gallery Card BG 4 — Ghost/Psychic
**Location:** `public/images/gallery/bg-ghost.webp`
```
abstract ghostly alien energy, translucent purple ethereal wisps, dark void background,
cinematic supernatural sci-fi art, no characters, 4K
```

---

### 🔟 Series Banner — Classic (2005)
**Location:** `public/images/ui/series-classic.webp`
```
summer road trip through American desert, green energy Omnitrix glow, sunset cinematic,
adventure nostalgia, cartoon-inspired realistic render, wide panoramic, no characters, 4K
```

---

### 1️⃣1️⃣ Series Banner — Alien Force
**Location:** `public/images/ui/series-alienforce.webp`
```
futuristic alien warship fleet over Earth, invasion threat, cinematic space art,
blue-grey tone, Highbreed alien tech aesthetic, no characters, wide angle, 4K
```

---

### 1️⃣2️⃣ Villain — Vilgax Portrait BG
**Location:** `public/images/ui/vilgax-bg.webp`
```
epic alien warlord throne room background, dark red and black, glowing alien technology,
intimidating galactic throne, cinematic sci-fi, no characters, 4K
```

---

## Replacing Placeholder Icons

All alien icons currently use emoji. To replace with artwork, in each alien object in `src/data/ben10.js`, update the `icon` field or add an `img` field and update components to use `<img>` tags.

---

## Production Build

```bash
npm run build
npm run preview
```

Deploy `dist/` to **Netlify**, **Vercel**, or any static host.

---

*Fan project. Not affiliated with Cartoon Network, Man of Action, or Warner Bros.*
