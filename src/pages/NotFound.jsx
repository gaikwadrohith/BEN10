import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center hex-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--green)]/[0.02] pointer-events-none" />
      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
      >
        <motion.div className="text-[120px] mb-4 select-none"
          animate={{ y: [0,-12,0], rotate: [-4,4,-4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 30px rgba(57,255,20,0.3))' }}
        >⊗</motion.div>
        <p className="font-mono text-[9px] text-[var(--green)] tracking-[5px] uppercase mb-3">Error 404 — Omnitrix Malfunction</p>
        <h1 className="font-display text-[clamp(60px,14vw,160px)] leading-none text-[var(--text)] tracking-widest mb-4 text-glow">
          GLITCH.
        </h1>
        <p className="text-[var(--text-muted)] mb-10 max-w-xs mx-auto leading-relaxed font-light">
          This page got lost in an alien dimension. Even the Omnitrix can't track it down.
        </p>
        <Button href="/" icon={<FiArrowLeft />}>Back to Base</Button>
      </motion.div>
    </div>
  )
}
