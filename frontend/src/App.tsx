import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LangProvider } from "./contexts/LangContext";

// ─── Above-the-fold: loaded eagerly for instant FCP ─────────────────────────
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FloatingSocial from "./components/FloatingSocial";

// ─── Below-the-fold: lazy-loaded as user scrolls ────────────────────────────
const AboutSection       = lazy(() => import("./components/AboutSection"));
const SocialProof        = lazy(() => import("./components/SocialProof"));
const BentoGrid          = lazy(() => import("./components/BentoGrid"));
const ProjectSection     = lazy(() => import("./components/ProjectSection").then(m => ({ default: m.ProjectSection })));
const EngineeringLab      = lazy(() => import("./components/EngineeringLab").then(m => ({ default: m.EngineeringLab })));
const ProcessSection     = lazy(() => import("./components/ProcessSection").then(m => ({ default: m.ProcessSection })));
const ContactSection     = lazy(() => import("./components/ContactSection").then(m => ({ default: m.ContactSection })));
const Footer             = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));

// ─── Pages: only downloaded when routes are visited ─────────────────────────
const LinkBio  = lazy(() => import("./pages/LinkBio"));
const Redirect = lazy(() => import("./pages/RedirectPage"));
const Shop     = lazy(() => import("./pages/Shop"));
const Projects = lazy(() => import("./pages/Projects"));
const Material = lazy(() => import("./pages/Material"));
const Payment = lazy(() => import("./pages/Payment"));

const Portal = lazy(() => import("./pages/Portal"));
const ClientDashboard = lazy(() => import("./pages/ClientDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Proposta = lazy(() => import("./pages/Proposta"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ProjectMaterials = lazy(() => import("./pages/ProjectMaterials"));

// Minimal suspense fallback — invisible div to avoid layout shift
const PageFallback = () => (
  <div style={{ minHeight: "100vh", background: "#050505" }} aria-hidden="true" />
);

const Home = () => {
  return (
    <div className="min-h-screen bg-(--pg-bg) text-(--pg-text) transition-colors duration-500 overflow-x-hidden">
      <Navbar />
      <FloatingSocial />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <AboutSection />
          <SocialProof />
          <BentoGrid />
          <ProjectSection />
          <EngineeringLab />
          <ProcessSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <LangProvider>
      <Router>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/links"    element={<LinkBio />} />
            <Route path="/r"        element={<Redirect />} />
            <Route path="/shop"     element={<Shop />} />

            <Route path="/cases"    element={<Projects />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/material"  element={<Material />} />
            <Route path="/payment"   element={<Payment />} />
            <Route path="/portal"   element={<Portal />} />
            <Route path="/portal/dashboard" element={<ClientDashboard />} />

            <Route path="/proposta" element={<Proposta />} />
            <Route path="/admin"    element={<AdminDashboard />} />
            <Route path="/landing"  element={<LandingPage />} />
            <Route path="/materials" element={<ProjectMaterials />} />
          </Routes>
        </Suspense>
      </Router>
    </LangProvider>
  );
}

export default App;
