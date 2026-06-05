import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations';
import projectsData from '../data/projects.json';
import { useSVGL } from '../hooks/useSVGL';
import { DeviceMockup } from './DeviceMockup';
import { AnimatedEmoji } from './AnimatedEmoji';

export const ProjectCard = ({ project, lang, t, FADE_UP }: any) => {
  const { getIcon } = useSVGL();
  const [showDetails, setShowDetails] = React.useState(false);

  const isLiveLink = project.link && !project.link.includes('github.com');

  return (
    <motion.div
      {...FADE_UP}
      className="grid lg:grid-cols-12 gap-4 md:gap-8 lg:gap-16 items-center group"
    >
      {/* The Metric & Content (Left/Top) */}
      <div className="lg:col-span-4 flex flex-col justify-start items-start order-2 lg:order-1 h-fit">
        <div className="mb-2 md:mb-5">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-3 font-semibold">
            {project.category === 'operational' 
              ? (lang === "pt" ? "SISTEMA OPERACIONAL" : "OPERATIONAL SYSTEM")
              : (lang === "pt" ? "SITES & LANDING PAGES" : "SITES & LANDING PAGES")}
            
            {project.publishedAt && new Date(project.publishedAt).getTime() > new Date().getTime() - 30 * 24 * 60 * 60 * 1000 && (
              <span className="bg-blue-500/10 text-blue-400 text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-widest">
                {lang === "pt" ? "Novo" : "New"}
              </span>
            )}
          </span>
          <div className="flex items-center gap-4 mb-2 md:mb-3">
            <img 
              src={project.client_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=000&color=fff&bold=true&format=svg`} 
              alt={`${project.title} logo`} 
              className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-lg bg-white/5 p-2 border border-white/10 shrink-0" 
              onError={(e) => {
                // Se a logo do clearbit ou original falhar, usa o fallback
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=000&color=fff&bold=true&format=svg`;
              }}
            />
            <h3 className="text-2xl md:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
              {project.title}
            </h3>
          </div>
          <p className="hidden md:block text-lg text-white/50 font-light leading-relaxed tracking-tight">
            {project.metric_sub}
          </p>
        </div>

        <div className="w-full">
          <p className="text-sm md:text-[15px] text-white/70 leading-relaxed font-light mb-3">
            {project.description}
          </p>

          {/* Action Links and CTAs */}
          <div className="flex flex-col items-start gap-4 mb-4 w-full">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`relative group inline-flex items-center gap-3 text-[10px] font-mono transition-all duration-300 uppercase tracking-widest cursor-pointer border-b pb-1 ${
                showDetails ? 'border-white text-white' : 'border-white/20 text-white/50 hover:text-white hover:border-white/50'
              }`}
            >
              {lang === "pt" 
                ? (showDetails ? "Recolher Detalhes" : "Detalhes do Projeto") 
                : (showDetails ? "Hide Details" : "Project Details")}
              <AnimatedEmoji 
                name={showDetails ? "pointing_up" : "pointing_right"} 
                className="w-5 h-5" 
              />
            </button>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-start gap-3 w-full mt-2">
              <a
                href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de estruturar um projeto.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex justify-center w-full md:w-auto items-center gap-3 px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
              >
                <AnimatedEmoji name="rocket" className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
                <span>Discutir Projeto</span>
              </a>
              <a
                href="/cases"
                className="relative inline-flex justify-center w-full md:w-auto items-center gap-3 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 hover:scale-[1.02] active:scale-95 text-[10px] font-mono font-bold tracking-widest text-white uppercase transition-all duration-300 shadow-xl group border border-white/10 hover:border-white/20"
              >
                <span>{lang === 'pt' ? 'Explorar Todos os Cases' : 'Explore All Cases'}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Collapsible Details Drawer */}
          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 16, marginBottom: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 md:space-y-5 overflow-hidden"
              >
                {/* Challenge (Desafio) */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block">
                    {lang === "pt" ? "O Desafio" : "The Challenge"}
                  </span>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {lang === "pt" ? project.challenge_pt : project.challenge_en}
                  </p>
                </div>

                {/* Impact (Resultado) */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-emerald-400/40 uppercase tracking-widest block font-medium">
                    {lang === "pt" ? "Impacto no Negócio" : "Business Impact"}
                  </span>
                  <p className="text-sm text-emerald-400/80 font-light leading-relaxed">
                    {lang === "pt" ? project.impact_pt : project.impact_en}
                  </p>
                </div>

                {/* Key Features (Destaques) */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block">
                    {lang === "pt" ? "Destaques do Sistema" : "Key Highlights"}
                  </span>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {((lang === "pt" ? project.features_pt : project.features_en) || []).map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-white/60 font-light">
                        <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* The Visuals (Right/Bottom) */}
      <div className="lg:col-span-8 w-full relative order-1 lg:order-2 mb-4 lg:mb-0 flex flex-col items-center justify-center mt-2 md:mt-4">
        
        {/* Floating Acessar ao Vivo Button */}
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute w-[calc(100%-2rem)] md:w-auto justify-center z-50 bottom-4 md:bottom-4 left-1/2 -translate-x-1/2 inline-flex flex-row flex-nowrap whitespace-nowrap items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 hover:bg-white text-[9px] md:text-[10px] font-mono font-bold tracking-widest uppercase text-white hover:text-black transition-colors duration-300 group shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            <span>{lang === 'pt' ? 'Acessar ao Vivo' : 'Live Preview'}</span>
            <AnimatedEmoji name="eyes" className="w-5 h-5 md:w-[25px] md:h-[25px] group-hover:scale-110 transition-transform shrink-0" />
          </motion.a>
        )}

        <div className="relative w-full flex flex-col md:block items-center justify-center select-none mt-2 md:mt-6 lg:mt-4">
          <DeviceMockup 
            desktopImg={project.image}
            tabletImg={project.image}
            mobileImg={project.image_mobile || project.image}
            altText={project.title}
            iframeUrl={isLiveLink ? project.link : undefined}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectSection = () => {
  const { t, lang } = useLang();

  const [activeIndex, setActiveIndex] = useState(0);

  const projects = projectsData.map(p => ({
    ...p,
    metric_sub: lang === 'pt' ? (p as any).metric_sub_pt : (p as any).metric_sub_en,
    description: lang === 'pt' ? p.description_pt : p.description_en,
  }));

  const featuredProjects = projects
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

  return (
    <section id="casos" className="relative py-16 md:py-24 w-full overflow-hidden bg-(--pg-bg)">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
        <motion.div
          {...FADE_UP}
          className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
        <div>
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-2 md:mb-4">
            {t.projects.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white">
            {t.projects.h2a} <br className="hidden sm:block" />
            <span className="text-white/40">{t.projects.h2b}</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 pb-0 md:pb-2 mt-8 md:mt-0">
          {/* Carousel Navigation Capsule */}
          <div className="flex items-center gap-0 p-[2px] rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)] border border-white/5">
            <button
              onClick={() => setActiveIndex(prev => prev === 0 ? featuredProjects.length - 1 : prev - 1)}
              className="relative group w-8 h-5 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
              aria-label="Previous Project"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2.5 h-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <div className="flex items-center justify-center px-1.5 font-mono text-[9px] tracking-[0.2em] text-white/30 h-5 select-none">
              <span className="text-white font-medium">{(activeIndex + 1).toString().padStart(2, '0')}</span>
              <span className="mx-0.5 opacity-40">/</span>
              <span>{featuredProjects.length.toString().padStart(2, '0')}</span>
            </div>

            <button
              onClick={() => setActiveIndex(prev => prev === featuredProjects.length - 1 ? 0 : prev + 1)}
              className="relative group w-8 h-5 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
              aria-label="Next Project"
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2.5 h-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Client Projects Carousel */}
      <div className="mb-10 md:mb-20 mt-16 md:mt-0">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4 md:mb-1 block pb-0">
          {lang === 'pt' ? 'Projetos de Clientes' : 'Client Projects'}
        </span>
        <div className="flex flex-col space-y-8">
          {featuredProjects.length > 0 && (
            <>
              <ProjectCard project={featuredProjects[activeIndex]} lang={lang} t={t} FADE_UP={FADE_UP} />
            </>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};
export default ProjectSection;
