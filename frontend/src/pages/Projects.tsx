import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, LayoutGrid, Cpu, Globe } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectSection";
import projectsData from "../data/projects.json";
import { FADE_UP } from "../constants/animations";
import { useSVGL } from "../hooks/useSVGL";

const ProjectsPage = () => {
  const { lang, t } = useLang();
  const { getIcon } = useSVGL();

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

  const allProjects = projects.filter(p => !HOMEPAGE_PROJECTS.includes(p.id)).sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  const frontendProjects = allProjects.filter(p => p.category === "infra");
  const backendProjects = allProjects.filter(p => p.category === "operational");

  return (
    <div className="min-h-screen bg-(--pg-bg) text-(--pg-text) transition-colors duration-500 overflow-x-hidden">
      <Navbar />
      
      <main className="section-padding px-4 sm:px-6 max-w-6xl mx-auto pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Back Link */}
        <motion.div {...FADE_UP} className="mb-8 md:mb-10">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.projects.backToHome}
          </a>
        </motion.div>

        {/* Page Header */}
        <motion.div {...FADE_UP} className="mb-16">
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-6">
            {t.projects.pageEyebrow}
          </span>
          <h1 className="text-[clamp(36px,6vw,80px)] font-bold tracking-tighter leading-[1] text-white mb-6 uppercase">
            {t.projects.pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed">
            {t.projects.pageDesc}
          </p>
        </motion.div>

        {/* Frontend Projects */}
        <div className="mb-24 md:mb-32">
          <h2 className="text-[12px] md:text-sm font-mono text-emerald-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-3 font-semibold px-4 md:px-0">
            {t.projects.catFrontend}
          </h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 md:gap-16 pb-12 no-scrollbar px-4 md:px-0">
            {frontendProjects.map((project) => (
              <div key={project.id} className="w-[90vw] md:w-[85vw] lg:w-[1000px] shrink-0 snap-center flex items-center">
                {project.image || project.image_mobile ? (
                  <ProjectCard 
                    project={project} 
                    lang={lang} 
                    t={t} 
                    FADE_UP={FADE_UP} 
                  />
                ) : (
                  <motion.div
                    {...FADE_UP}
                    className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm group hover:border-white/10 transition-all duration-500 w-full"
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
                        {project.technologies.map(tech => {
                          const iconUrl = getIcon(tech);
                          return (
                            <span key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono text-white/60 uppercase tracking-widest backdrop-blur-md">
                              {iconUrl && (
                                <img src={iconUrl} alt={tech} className="w-3.5 h-3.5 object-contain" loading="lazy" />
                              )}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Backend Projects */}
        <div className="mb-24 md:mb-32">
          <h2 className="text-[12px] md:text-sm font-mono text-emerald-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-3 font-semibold px-4 md:px-0">
            {t.projects.catBackend}
          </h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 md:gap-16 pb-12 no-scrollbar px-4 md:px-0">
            {backendProjects.map((project) => (
              <div key={project.id} className="w-[90vw] md:w-[85vw] lg:w-[1000px] shrink-0 snap-center flex items-center">
                {project.image || project.image_mobile ? (
                  <ProjectCard 
                    project={project} 
                    lang={lang} 
                    t={t} 
                    FADE_UP={FADE_UP} 
                  />
                ) : (
                  <motion.div
                    {...FADE_UP}
                    className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm group hover:border-white/10 transition-all duration-500 w-full"
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
                        {project.technologies.map(tech => {
                          const iconUrl = getIcon(tech);
                          return (
                            <span key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono text-white/60 uppercase tracking-widest backdrop-blur-md">
                              {iconUrl && (
                                <img src={iconUrl} alt={tech} className="w-3.5 h-3.5 object-contain" loading="lazy" />
                              )}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
