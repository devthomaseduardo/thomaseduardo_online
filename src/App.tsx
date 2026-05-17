import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LangProvider } from "./contexts/LangContext";

// Components (Default Exports)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import GlobalStats from "./components/GlobalStats";
import SocialProof from "./components/SocialProof";
import BentoGrid from "./components/BentoGrid";
import ExpertiseSection from "./components/ExpertiseSection";
import TechStackGrid from "./components/TechStackGrid";

// Components (Named Exports)
import { ProjectSection } from "./components/ProjectSection";
import { TrajectorySection } from "./components/TrajectorySection";
import { ProcessSection } from "./components/ProcessSection";
import { DifferentiatorsSection } from "./components/DifferentiatorsSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { EngineeringLab } from "./components/EngineeringLab";
import { Footer } from "./components/Footer";

// Pages
import LinkBio from "./pages/LinkBio";
import Redirect from "./pages/RedirectPage";
import Shop from "./pages/Shop";
import Projects from "./pages/Projects";

const Home = () => {
  return (
    <div className="min-h-screen bg-(--pg-bg) text-(--pg-text) transition-colors duration-500 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SocialProof />
        <BentoGrid />
        <ProjectSection />
        <EngineeringLab />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LangProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<LinkBio />} />
          <Route path="/r" element={<Redirect />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cases" element={<Projects />} />
          <Route path="/projetos" element={<Projects />} />
        </Routes>
      </Router>
    </LangProvider>
  );
}

export default App;
