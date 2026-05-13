import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations';
import projectsData from '../data/projects.json';

export const ProjectSection = () => {
  const { t, lang } = useLang();
  
  const projects = projectsData.map(p => ({
    ...p,
    metric_sub: lang === "pt" ? (p as any).metric_sub_pt : (p as any).metric_sub_en,
    description: lang === "pt" ? p.description_pt : p.description_en,
  }));

  return (
    <section id="cases" className="section-padding px-6 max-w-5xl mx-auto overflow-hidden bg-pg-bg">
      <motion.div 
        {...FADE_UP}
        className="mb-16"
      >
        <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">
          {t.projects.eyebrow}
        </span>
        <h2 className="text-[clamp(32px,5vw,80px)] font-medium tracking-tighter leading-[1.1] text-white">
          {t.projects.h2a} <br className="hidden sm:block" />
          <span className="text-white/40">{t.projects.h2b}</span>
        </h2>
      </motion.div>

      {/* Tier 01: Sistemas Operacionais */}
      <div className="mb-32">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-16 block border-b border-white/5 pb-4">
          {t.projects.catOperational}
        </span>
        <div className="flex flex-col space-y-24 md:space-y-32">
          {projects.filter(p => (p as any).category === 'operational').map((project, index) => (
            <motion.div
              key={project.id}
              {...FADE_UP}
              className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center group"
            >
              {/* The Metric & Content (Left/Top) */}
              <div className="lg:col-span-5 flex flex-col items-start order-2 lg:order-1">
                <div className="mb-8">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4 block">
                    {project.title}
                  </span>
                  <h3 className="text-[clamp(60px,8vw,120px)] font-bold tracking-tighter leading-[0.9] text-white">
                    {project.metric}
                  </h3>
                  <p className="text-xl md:text-2xl font-light text-white/50 mt-4 tracking-tight">
                    {project.metric_sub}
                  </p>
                </div>

                <div className="w-full mb-10">
                  <p className="text-lg text-white/70 leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-8">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-none border border-white/10 bg-white/[0.02] text-[10px] font-mono text-white/60 uppercase tracking-widest backdrop-blur-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-6 mt-2 pt-8 border-t border-white/5 w-full">
                  {(project as any).link && (
                    <a
                      href={(project as any).link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-white/70 transition-colors uppercase tracking-widest"
                    >
                      {t.projects.btnSite}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={`/r?to=${encodeURIComponent(`https://wa.me/5511977070209?text=Olá Thomas, vi o case ${project.title} e gostaria de entender como aplicar isso na minha operação.`)}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    {lang === "pt" ? "Discutir Operação" : "Discuss Operation"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* The Visuals (Right/Bottom) */}
              <div className="lg:col-span-7 w-full relative order-1 lg:order-2 mb-8 lg:mb-0">
                <div className="w-full aspect-[4/3] md:aspect-[16/10] rounded-none overflow-hidden bg-white/[0.02] border border-white/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-pg-bg via-transparent to-transparent opacity-50 z-10 pointer-events-none" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tier 02: Infraestrutura Comercial */}
      <div className="mb-32">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-16 block border-b border-white/5 pb-4">
          {t.projects.catInfra}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {projects.filter(p => (p as any).category === 'infra').map((project) => (
            <motion.div
              key={project.id}
              {...FADE_UP}
              className="p-8 md:p-10 bg-pg-bg flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6 block">
                  {project.title}
                </span>
                <p className="text-xl text-white/70 leading-relaxed font-light mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
