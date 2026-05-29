import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, LayoutGrid, Cpu, Globe } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectSection";
import projectsData from "../data/projects.json";
import { FADE_UP } from "../constants/animations";

const ProjectsPage = () => {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState<"all" | "operational" | "infra">("all");

  // Same IDs featured on the home page — exclude here to avoid duplication
  const HOMEPAGE_PROJECTS = ['sleep-house', 'lp-yazigi', 'bras-service-ass', 'hazap-vendas'];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = projectsData.map(p => ({
    ...p,
    metric_sub: lang === "pt" ? (p as any).metric_sub_pt : (p as any).metric_sub_en,
    description: lang === "pt" ? p.description_pt : p.description_en,
  }));

  const filteredProjects = projects.filter(p => {
    if (HOMEPAGE_PROJECTS.includes(p.id)) return false;
    if (activeTab === "all") return true;
    return p.category === activeTab;
  }).sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-(--pg-bg) text-(--pg-text) transition-colors duration-500 overflow-x-hidden">
      <Navbar />
      
      <main className="section-padding px-6 max-w-6xl mx-auto pt-32 pb-24">
        {/* Back Link */}
        <motion.div {...FADE_UP} className="mb-10">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {lang === "pt" ? "Voltar ao Início" : "Back to Home"}
          </a>
        </motion.div>

        {/* Page Header */}
        <motion.div {...FADE_UP} className="mb-16">
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-6">
            {lang === "pt" ? "Portfólio de Cases" : "Case Portfolio"}
          </span>
          <h1 className="text-[clamp(36px,6vw,80px)] font-bold tracking-tighter leading-[1] text-white mb-6 uppercase">
            {lang === "pt" ? "Sistemas & Páginas" : "Systems & Pages"}
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed">
            {lang === "pt" 
              ? "Confira todos os sistemas completos, automações e landing pages de alta conversão desenvolvidos para simplificar operações e gerar vendas reais."
              : "Explore the full suite of operational tools, custom dashboards, and high-performance pages designed to eliminate waste and accelerate business growth."}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          {...FADE_UP} 
          className="flex overflow-x-auto no-scrollbar flex-nowrap md:flex-wrap gap-2 mb-20 p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl w-max max-w-full backdrop-blur-md"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0 ${
              activeTab === "all"
                ? "bg-white text-black font-bold shadow-lg"
                : "text-white/55 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {lang === "pt" ? "Todos os Cases" : "All Cases"}
          </button>
          
          <button
            onClick={() => setActiveTab("operational")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0 ${
              activeTab === "operational"
                ? "bg-white text-black font-bold shadow-lg"
                : "text-white/55 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            {lang === "pt" ? "Sistemas e Ferramentas" : "Sistemas & Ferramentas"}
          </button>
          
          <button
            onClick={() => setActiveTab("infra")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer shrink-0 ${
              activeTab === "infra"
                ? "bg-white text-black font-bold shadow-lg"
                : "text-white/55 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "pt" ? "Sites e Landing Pages" : "Sites & Landing Pages"}
          </button>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col space-y-32 md:space-y-40">
          {filteredProjects.map((project) => {
            // Render regular dual-mockup card for items that have visual mockups available
            if (project.image || project.image_mobile) {
              return (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  lang={lang} 
                  t={t} 
                  FADE_UP={FADE_UP} 
                />
              );
            }
            
            // Fallback render for general cards (like infra-comercial)
            return (
              <motion.div
                key={project.id}
                {...FADE_UP}
                className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm group hover:border-white/10 transition-all duration-500"
              >
                <div className="max-w-2xl">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6 block">
                    {project.title}
                  </span>
                  <h3 className="text-3xl font-bold tracking-tight text-white mb-6 uppercase">
                    {project.title}
                  </h3>
                  <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
