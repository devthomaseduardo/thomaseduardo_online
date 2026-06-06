import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LangProvider } from "./contexts/LangContext";
import { ClientProtectedRoute } from "./components/ClientProtectedRoute";

// ─── Above-the-fold: loaded eagerly for instant FCP ─────────────────────────
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FloatingSocial from "./components/FloatingSocial";

// ─── Below-the-fold: lazy-loaded as user scrolls ────────────────────────────
const AboutSection       = lazy(() => import("./components/AboutSection"));
const BentoGrid          = lazy(() => import("./components/BentoGrid"));
const ProjectSection     = lazy(() => import("./components/ProjectSection").then(m => ({ default: m.ProjectSection })));
const SolutionsSection    = lazy(() => import("./components/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
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
const AdminLayout = lazy(() => import("./components/admin/layout/AdminLayout").then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const AdminProjects = lazy(() => import("./pages/admin/Projects").then(m => ({ default: m.Projects })));
const AdminClients = lazy(() => import("./pages/admin/Clients").then(m => ({ default: m.Clients })));
const AdminProposals = lazy(() => import("./pages/admin/Proposals").then(m => ({ default: m.Proposals })));
const AdminFinancial = lazy(() => import("./pages/admin/Financial").then(m => ({ default: m.Financial })));
const AdminContracts = lazy(() => import("./pages/admin/Contracts").then(m => ({ default: m.Contracts })));
const AdminDeployments = lazy(() => import("./pages/admin/Deployments").then(m => ({ default: m.Deployments })));
const AdminLeads = lazy(() => import("./pages/admin/Leads").then(m => ({ default: m.Leads })));
const AdminMessages = lazy(() => import("./pages/admin/Messages").then(m => ({ default: m.Messages })));
const AdminTeam = lazy(() => import("./pages/admin/Team").then(m => ({ default: m.Team })));
const AdminSettings = lazy(() => import("./pages/admin/Settings").then(m => ({ default: m.Settings })));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin").then(m => ({ default: m.AdminLogin })));
const Proposta = lazy(() => import("./pages/Proposta"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ProjectMaterials = lazy(() => import("./pages/ProjectMaterials"));

// Minimal suspense fallback — invisible div to avoid layout shift
const PageFallback = () => (
  <div style={{ minHeight: "100vh", background: "#050505" }} aria-hidden="true" />
);

const Home = () => {
  return (
    <div className="min-h-screen bg-(--pg-bg) text-(--pg-text) transition-colors duration-500 overflow-x-hidden relative">
      <Navbar />
      <FloatingSocial />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={null}>
          <AboutSection />
          <SolutionsSection />
          <BentoGrid />
          <ProcessSection />
          <ProjectSection />
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
            <Route path="/portal"   element={<Portal />} />
            <Route path="/proposta" element={<Proposta />} />
            <Route path="/landing"  element={<LandingPage />} />

            {/* Rotas Protegidas do Cliente */}
            <Route path="/projetos" element={<ClientProtectedRoute><Projects /></ClientProtectedRoute>} />
            <Route path="/material"  element={<ClientProtectedRoute><Material /></ClientProtectedRoute>} />
            <Route path="/payment"   element={<ClientProtectedRoute><Payment /></ClientProtectedRoute>} />
            <Route path="/portal/dashboard" element={<ClientProtectedRoute><ClientDashboard /></ClientProtectedRoute>} />
            <Route path="/materials" element={<ClientProtectedRoute><ProjectMaterials /></ClientProtectedRoute>} />

            {/* Rotas de Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="proposals" element={<AdminProposals />} />
              <Route path="financial" element={<AdminFinancial />} />
              <Route path="contracts" element={<AdminContracts />} />
              <Route path="deployments" element={<AdminDeployments />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </LangProvider>
  );
}

export default App;
