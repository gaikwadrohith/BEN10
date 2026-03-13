import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn       = (...i) => twMerge(clsx(i))
export const clamp    = (v, min, max) => Math.min(Math.max(v, min), max)
export const lerp     = (a, b, t) => a + (b - a) * t
export const debounce = (fn, ms = 100) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms) } }
export const rand     = (min, max) => Math.random() * (max - min) + min
export const padNum   = (n, len = 2) => String(n).padStart(len, '0')
