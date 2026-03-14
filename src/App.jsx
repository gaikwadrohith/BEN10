import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainLayout from "@/layouts/MainLayout";

gsap.registerPlugin(ScrollTrigger);

const Home = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function Loader() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "var(--bg)" }}>
      <div style={{ width: 64, height: 64, border: "2px solid rgba(57,255,20,0.2)", borderTop: "2px solid #39FF14", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "rgba(57,255,20,0.5)" }}>Loading…</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function RouteWatcher() {
  const location = useLocation();

  useEffect(() => {
    // Clear about-loaded flag when leaving about page
    if (location.pathname !== "/about") {
      sessionStorage.removeItem("about-loaded");
    }
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <RouteWatcher />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}
