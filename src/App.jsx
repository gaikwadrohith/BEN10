import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import MainLayout from '@/layouts/MainLayout'

gsap.registerPlugin(ScrollTrigger)

const Home      = lazy(() => import('@/pages/Home'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const NotFound  = lazy(() => import('@/pages/NotFound'))

function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5" style={{ background: 'var(--bg)' }}>
      <div className="relative w-20 h-20">
        <div className="w-20 h-20 omnitrix-ring animate-omnitrix-spin" />
        <div className="absolute inset-0 flex items-center justify-center font-display text-3xl text-[var(--green)]">⊗</div>
      </div>
      <p className="font-mono text-[9px] text-[var(--green)] tracking-[5px] uppercase animate-pulse">
        Initializing Omnitrix…
      </p>
    </div>
  )
}

// Page wrapper — fades in after mount, refreshes ScrollTrigger
function PageWrapper({ children }) {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
    // Give DOM time to paint, then refresh ScrollTrigger
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <PageWrapper key={location.pathname}>
        <Suspense fallback={<Loader />}>
          <Routes location={location}>
            <Route path="/"      element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*"      element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageWrapper>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </BrowserRouter>
  )
}
