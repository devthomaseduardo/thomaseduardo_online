import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import projectsData from '../data/projects.json';

export const ProjectSection = () => {
  const { t, lang } = useLang();
  
  const projects = projectsData.map(p => ({
    ...p,
    description: lang === "pt" ? p.description_pt : p.description_en,
    problem: lang === "pt" ? p.problem_pt : p.problem_en,
    solution: lang === "pt" ? p.solution_pt : p.solution_en,
    result: lang === "pt" ? p.result_pt : p.result_en,
  }));

  return (
    <section id="cases" className="py-12 md:py-20 px-6 md:px-12 max-w-full mx-auto overflow-hidden bg-(--pg-bg)">
      <motion.div 
        {...FADE_UP}
        className="mb-10"
      >
        <span className="label-caps mb-4 block">{t.projects.eyebrow}</span>
        <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter leading-[1.1] py-2">
          {t.projects.h2a} <br/>
          <span className="text-white/50">{t.projects.h2b}</span>
        </h2>
        <p className="text-xl max-w-3xl font-medium" style={{ color: '#A1A1A6' }}>
          {lang === "pt" 
            ? "Cada projeto é tratado como um produto. Engenharia de resultados focada em UI/UX, performance e impacto no faturamento." 
            : "Each project is treated as a product. Results engineering focused on UI/UX, performance, and revenue impact."}
        </p>
      </motion.div>

      <div className="flex flex-col lg:space-y-16 space-y-8">
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-8 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide gap-6 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              {...FADE_UP}
              className={`flex-none w-[85vw] lg:w-auto snap-center grid lg:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
            >
              <div className={`space-y-6 lg:space-y-8 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className="text-white/40 font-mono font-medium">0{index + 1}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#6E6E73' }}>
                    {project.technologies[0]} + {project.technologies[1]}
                  </span>
                </div>
                
                <div className="flex flex-col gap-4">
                  {project.clientLogo && (
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center overflow-hidden">
                      <img src={project.clientLogo} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-sm md:text-lg leading-relaxed font-medium" style={{ color: '#A1A1A6' }}>
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 lg:py-8 border-y border-white/5">
                  <div>
                    <span className="block text-[8px] lg:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">{t.projects.problem}</span>
                    <p className="text-[10px] lg:text-sm text-white/50 leading-relaxed">"{project.problem}"</p>
                  </div>
                  <div>
                    <span className="block text-[8px] lg:text-[10px] font-mono text-white/60 uppercase tracking-widest mb-2">{t.projects.result}</span>
                    <p className="text-[10px] lg:text-sm text-white font-semibold tracking-tight">{project.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border border-white/5 bg-white/[0.02] text-[8px] lg:text-[10px] font-mono text-white tracking-widest uppercase">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-8">
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`/r?to=${encodeURIComponent(`https://wa.me/5511977070209?text=Olá Thomas, vi o case ${project.title} e gostaria de algo similar.`)}`}
                    className="inline-flex items-center gap-3 text-white/60 font-semibold uppercase tracking-widest group text-[10px] lg:text-xs hover:text-white transition-colors"
                  >
                    {lang === "pt" ? "SOLICITAR DIAGNÓSTICO" : "REQUEST DIAGNOSIS"}
                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-2 transition-transform" />
                  </motion.a>

                  {project.link && project.link !== "#" && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white/[0.03] border border-white/5 text-white font-bold uppercase tracking-widest text-[8px] lg:text-[10px] hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                      {t.projects.btnSite}
                    </motion.a>
                  )}
                </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 group bg-white/[0.02] ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--pg-bg)]/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
