import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations';
import projectsData from '../data/projects.json';

export const ProjectCard = ({ project, lang, t, FADE_UP }: any) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const phoneRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [phoneWidth, setPhoneWidth] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!phoneRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setPhoneWidth(entry.contentRect.width);
      }
    });
    observer.observe(phoneRef.current);
    return () => observer.disconnect();
  }, []);

  const isLiveLink = project.link && !project.link.includes('github.com');

  return (
    <motion.div
      {...FADE_UP}
      className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center group"
    >
      {/* The Metric & Content (Left/Top) */}
      <div className="lg:col-span-4 flex flex-col items-start order-2 lg:order-1">
        <div className="mb-8">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] mb-3 block font-semibold">
            {project.category === 'operational' 
              ? (lang === "pt" ? "SISTEMA OPERACIONAL" : "OPERATIONAL SYSTEM")
              : (lang === "pt" ? "SITES & LANDING PAGES" : "SITES & LANDING PAGES")}
          </span>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 uppercase leading-tight">
            {project.title}
          </h3>
          <p className="text-lg text-white/50 font-light leading-relaxed tracking-tight">
            {project.metric_sub}
          </p>
        </div>

        <div className="w-full mb-10">
          <p className="text-lg text-white/70 leading-relaxed font-light">
            {project.description}
          </p>

          {/* Collapsible Details Drawer */}
          <div className="overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                height: showDetails ? 'auto' : 0,
                opacity: showDetails ? 1 : 0,
                marginTop: showDetails ? 24 : 0,
                marginBottom: showDetails ? 12 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 pt-6 border-t border-white/5"
            >
              {/* Challenge (Desafio) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">
                  {lang === "pt" ? "O Desafio" : "The Challenge"}
                </span>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {lang === "pt" ? project.challenge_pt : project.challenge_en}
                </p>
              </div>

              {/* Impact (Resultado) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-400/40 uppercase tracking-widest block font-medium">
                  {lang === "pt" ? "Impacto no Negócio" : "Business Impact"}
                </span>
                <p className="text-sm text-emerald-400/80 font-light leading-relaxed">
                  {lang === "pt" ? project.impact_pt : project.impact_en}
                </p>
              </div>

              {/* Key Features (Destaques) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">
                  {lang === "pt" ? "Destaques do Sistema" : "Key Highlights"}
                </span>
                <ul className="grid grid-cols-1 gap-2">
                  {((lang === "pt" ? project.features_pt : project.features_en) || []).map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-white/60 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono text-white/60 uppercase tracking-widest backdrop-blur-md">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-6 mt-2 pt-8 border-t border-white/5 w-full">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-white/70 transition-colors uppercase tracking-widest"
            >
              {t.projects.btnSite}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`inline-flex items-center gap-2 text-xs font-mono transition-colors uppercase tracking-widest cursor-pointer ${
              showDetails ? 'text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            {lang === "pt" 
              ? (showDetails ? "Recolher Detalhes" : "Detalhes do Projeto") 
              : (showDetails ? "Hide Details" : "Project Details")}
            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showDetails ? 'rotate-90 text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* The Visuals (Right/Bottom) - Dual Mockups (Notebook & iPhone) with Live Scroll-on-Hover or Interactive Iframes */}
      <div className="lg:col-span-8 w-full relative order-1 lg:order-2 mb-12 lg:mb-0 flex items-center justify-center">
        <div className="relative w-full aspect-[16/11.5] sm:aspect-[16/11] lg:aspect-[16/10] flex items-center justify-start p-4 md:p-6 overflow-visible select-none">
          {/* Blinking Live Indicator */}
          <div className="absolute top-2 left-2 md:top-4 md:left-4 z-30 flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-white/10 backdrop-blur-md rounded-full shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              {isLiveLink 
                ? (lang === "pt" ? "INTERATIVO / AO VIVO" : "INTERACTIVE / LIVE")
                : (lang === "pt" ? "PROJETO AO VIVO" : "LIVE OPERATION")}
            </span>
          </div>

          {/* 1. NOTEBOOK (MacBook-style CSS Mockup) - occupies progressive safe widths */}
          <div className="w-[82%] sm:w-[84%] lg:w-[86%] relative transition-all duration-500 group-hover:translate-x-[-1%] group-hover:scale-[1.01]">
            {/* MacBook Top Bezel */}
            <div className="w-full bg-neutral-900 border-[8px] md:border-[12px] border-neutral-950 rounded-t-2xl shadow-2xl relative overflow-hidden flex flex-col justify-start">
              {/* Web Camera dot */}
              <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-800 rounded-full z-30" />
              
              {/* Browser Window Header Chrome */}
              <div className="w-full h-5 md:h-7 bg-neutral-900/90 border-b border-neutral-950/80 flex items-center justify-between px-3 md:px-4 select-none shrink-0 z-20 relative pt-1 md:pt-1.5">
                {/* 3 macOS Traffic Light Dots */}
                <div className="flex gap-1 md:gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                </div>
                {/* URL Address Bar */}
                <div className="w-[60%] h-3.5 md:h-4.5 bg-black/40 rounded border border-white/5 flex items-center justify-center px-2">
                  <span className="text-[6px] md:text-[8px] font-mono text-white/30 truncate tracking-tight">
                    {project.link ? (project.link as string).replace(/^https?:\/\//, '').replace(/\/$/, '') : 'localhost:3000'}
                  </span>
                </div>
                <div className="w-8" />
              </div>

              {/* Screen Viewport */}
              <div ref={containerRef} className="w-full aspect-[16/10] bg-neutral-950 overflow-hidden relative">
                {isLiveLink ? (
                  <iframe 
                    src={project.link} 
                    title={`${project.title} Live Desktop View`}
                    className="absolute top-0 left-0 border-none bg-neutral-950 opacity-90 group-hover:opacity-100 transition-opacity duration-300 origin-top-left pointer-events-none lg:group-hover:pointer-events-auto"
                    style={{
                      width: '1280px',
                      height: '800px',
                      transform: `scale(${containerWidth ? containerWidth / 1280 : 1})`,
                    }}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                ) : (
                  <img 
                    src={project.image} 
                    alt={`${project.title} Desktop View`}
                    className="w-full h-auto absolute top-0 left-0 opacity-85 group-hover:opacity-100 transition-transform duration-[6000ms] ease-in-out group-hover:-translate-y-[60%]"
                  />
                )}
                {/* Glass Reflections overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/[0.08] pointer-events-none z-10 animate-pulse duration-[3000ms]" />
              </div>
            </div>
            {/* MacBook Keyboard Base */}
            <div className="h-2 md:h-3 bg-neutral-800 rounded-b-xl relative w-[104%] left-[-2%] shadow-lg border-t border-neutral-700/30">
              {/* Trackpad opening indentation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-24 h-1 bg-neutral-900 rounded-b-md" />
            </div>
          </div>

          {/* 2. IPHONE (iPhone-style CSS Mockup) - overlays MacBook safely inside progressive bounds */}
          {project.image_mobile && (
            <div className="absolute right-0 bottom-1 sm:right-1 sm:bottom-2 lg:right-2 lg:bottom-3 w-[24%] sm:w-[25%] lg:w-[26%] aspect-[9/19.5] z-20 transition-all duration-500 group-hover:translate-y-[-2%] group-hover:scale-[1.03]">
              {/* Outer Frame with bezel */}
              <div className="w-full h-full bg-neutral-950 border-[3px] sm:border-[5px] lg:border-[6px] border-neutral-900 rounded-[14px] sm:rounded-[22px] lg:rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
                {/* Dynamic Island Notch */}
                <div className="absolute top-1 sm:top-1.5 lg:top-2 left-1/2 -translate-x-1/2 w-[30%] h-1 sm:h-1.5 lg:h-2 bg-black rounded-full z-20" />
                
                {/* Viewport Screen */}
                <div ref={phoneRef} className="w-full h-full overflow-hidden bg-neutral-900 relative rounded-[10px] sm:rounded-[18px] lg:rounded-[26px]">
                  {isLiveLink ? (
                    <iframe 
                      src={project.link} 
                      title={`${project.title} Live Mobile View`}
                      className="absolute top-0 left-0 border-none bg-neutral-950 opacity-90 group-hover:opacity-100 transition-opacity duration-300 origin-top-left pointer-events-none lg:group-hover:pointer-events-auto"
                      style={{
                        width: '375px',
                        height: '812px',
                        transform: `scale(${phoneWidth ? phoneWidth / 375 : 1})`,
                      }}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  ) : (
                    <img 
                      src={project.image_mobile} 
                      alt={`${project.title} Mobile View`}
                      className="w-full h-auto absolute top-0 left-0 opacity-85 group-hover:opacity-100 transition-transform duration-[6000ms] ease-in-out group-hover:-translate-y-[70%]"
                    />
                  )}
                  {/* Glass Reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.06] pointer-events-none z-10" />
                  
                  {/* iOS Home Indicator Bar */}
                  <div className="absolute bottom-1 md:bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-0.5 md:h-1 bg-white/40 rounded-full z-20" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectSection = () => {
  const { t, lang } = useLang();
  
  const HOMEPAGE_PROJECTS = ['nexio-os', 'core-events', 'guardia', 'painel-beneficios'];
  
  const projects = projectsData.map(p => ({
    ...p,
    metric_sub: lang === "pt" ? (p as any).metric_sub_pt : (p as any).metric_sub_en,
    description: lang === "pt" ? p.description_pt : p.description_en,
  }));

  const featuredProjects = projects.filter(p => HOMEPAGE_PROJECTS.includes(p.id));

  return (
    <section id="cases" className="section-padding px-6 max-w-6xl mx-auto overflow-hidden bg-pg-bg">
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

      {/* Featured Systems Grid */}
      <div className="mb-20">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-16 block border-b border-white/5 pb-4">
          {t.projects.catOperational}
        </span>
        <div className="flex flex-col space-y-24 md:space-y-32">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} t={t} FADE_UP={FADE_UP} />
          ))}
        </div>
      </div>

      {/* Immersive CTA to Explore All Cases */}
      <motion.div 
        {...FADE_UP}
        className="flex flex-col items-center justify-center pt-12 pb-8 border-t border-white/5 text-center"
      >
        <h3 className="text-xl md:text-2xl font-light text-white/80 max-w-lg mb-6 tracking-tight">
          {lang === "pt" 
            ? "Quer ver todo o ecossistema de sistemas e landing pages?" 
            : "Want to see the entire ecosystem of business apps & sites?"}
        </h3>
        <a
          href="/cases"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 hover:scale-105 active:scale-95 text-xs font-mono font-bold tracking-widest text-white uppercase transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.05)] group"
        >
          <span>{lang === "pt" ? "Explorar Todos os Cases" : "Explore All Cases"}</span>
          <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};
