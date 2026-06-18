import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Code2, LayoutGrid, Zap, Users, Database, Workflow, LineChart } from "lucide-react";

import brutalistLogo from "../assets/brutalist-logo.png";
import thomasAbout from "../assets/thomas-about.png";
import { RotatingText } from "../components/RotatingText";
import { BackendTerminalSection } from "../components/BackendTerminalSection";
import { LiveProjectStack } from "../components/LiveProjectStack";
import { ContactForm } from "../components/ContactForm";
import { useLang } from "../contexts/LangContext";

/* ─── COMPONENTS ───────────────────────────────────────── */

function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 md:px-12 transition-all duration-300 ${scrolled ? "apple-glass" : ""}`}>
      <div className="container-apple flex items-center justify-between">
        <span className="text-sm font-bold tracking-tight text-white uppercase">Thomas Eduardo</span>
        <div className="hidden lg:flex items-center gap-8">
          <a href="#projetos" className="body-text hover:text-white transition-colors">{t.landing.nav.projects}</a>
          <a href="#processo" className="body-text hover:text-white transition-colors">{t.landing.nav.process}</a>
        </div>
        <a href="#contato" className="btn-primary py-2 px-4">
          {t.landing.nav.cta}
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section className="pt-40 pb-24 px-6 md:px-12 flex items-center justify-center">
      <div className="container-apple grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
          <span className="label-caps mb-6 block text-emerald-500">Engenharia de Software & Produto</span>
          <h1 className="display-xl mb-8">
            {t.landing.hero.h1}
          </h1>
          <p className="body-text-white text-xl mb-10 max-w-lg">
            {t.landing.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="#contato" className="btn-primary">
              {t.landing.hero.cta1} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#projetos" className="btn-secondary">
              {t.landing.hero.cta2}
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.2 }} className="relative aspect-square max-w-[500px] mx-auto apple-card p-2">
            <img src={brutalistLogo} alt="Design de sistemas" className="w-full h-full object-cover rounded-[14px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-pg-bg to-transparent rounded-[14px]" />
        </motion.div>
        
      </div>
    </section>
  );
}

// ... (Outros componentes como Benefits, About, etc. seguindo o mesmo padrão de refatoração)

export default function Home() {
  return (
    <div className="min-h-screen bg-pg-bg text-pg-text font-sans selection:bg-white/10">
      <Nav />
      <Hero />
      <BackendTerminalSection />
      <ContactForm />
      <LiveProjectStack />
      {/* Adicionar Footer, etc. */}
    </div>
  );
}
