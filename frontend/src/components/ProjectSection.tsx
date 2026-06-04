import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations';
import projectsData from '../data/projects.json';
import { useSVGL } from '../hooks/useSVGL';
import { DeviceMockup } from './DeviceMockup';

export const ProjectCard = ({ project, lang, t, FADE_UP }: any) => {
  const { getIcon } = useSVGL();
  const [showDetails, setShowDetails] = React.useState(false);

  const isLiveLink = project.link && !project.link.includes('github.com');

  return (
    <motion.div
      {...FADE_UP}
      className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center group"
    >
      {/* The Metric & Content (Left/Top) */}
      <div className="lg:col-span-4 flex flex-col items-start order-2 lg:order-1">
        <div className="mb-4 md:mb-8">
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
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 uppercase leading-tight">
            {project.title}
          </h3>
          <p className="hidden md:block text-lg text-white/50 font-light leading-relaxed tracking-tight">
            {project.metric_sub}
          </p>
        </div>

        <div className="w-full mb-6 md:mb-10">
          <p className="text-sm md:text-lg text-white/70 leading-relaxed font-light">
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
              className="space-y-6 pt-6"
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
            {project.technologies.map((tech: string) => {
              const iconUrl = getIcon(tech);
              return (
                <span key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.05] text-[10px] font-mono text-white/80 uppercase tracking-widest backdrop-blur-md">
                  {iconUrl && (
                    <img src={iconUrl} alt={tech} className="w-3.5 h-3.5 object-contain" loading="lazy" />
                  )}
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-6 mt-4 pt-8 w-full">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white text-[10px] font-mono font-bold tracking-widest uppercase text-white hover:text-black transition-all duration-300 group"
            >
              <span>{lang === 'pt' ? 'Acessar ao Vivo' : 'Live Preview'}</span>
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/People/Eyes.webp" alt="Eyes" width="25" height="25" className="group-hover:scale-110 transition-transform" />
            </a>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`relative group inline-flex items-center gap-3 text-[10px] font-mono transition-all duration-300 uppercase tracking-widest cursor-pointer border-b pb-1 ${
              showDetails ? 'border-white text-white' : 'border-white/20 text-white/50 hover:text-white hover:border-white/50'
            }`}
          >
            {lang === "pt" 
              ? (showDetails ? "Recolher Detalhes" : "Detalhes do Projeto") 
              : (showDetails ? "Hide Details" : "Project Details")}
            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showDetails ? 'rotate-90 text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* The Visuals (Right/Bottom) */}
      <div className="lg:col-span-8 w-full relative order-1 lg:order-2 mb-12 lg:mb-0 flex flex-col items-center justify-center mt-8">
        
        <div className="relative w-full flex flex-col md:block items-center justify-center select-none mt-4 md:mt-10 lg:mt-6">
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

  // Client projects that exist in projects.json — same links as /cases page
  const HOMEPAGE_PROJECTS = ['sleep-house', 'lp-yazigi', 'bras-service-ass', 'hazap-vendas'];
  
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = projectsData.map(p => ({
    ...p,
    metric_sub: lang === 'pt' ? (p as any).metric_sub_pt : (p as any).metric_sub_en,
    description: lang === 'pt' ? p.description_pt : p.description_en,
  }));

  const featuredProjects = projects
    .filter(p => HOMEPAGE_PROJECTS.includes(p.id))
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

  return (
    <section id="casos" className="section-padding w-full px-6 md:px-16 lg:px-24 mx-auto overflow-hidden bg-pg-bg">
      <motion.div
        {...FADE_UP}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">
            {t.projects.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white">
            {t.projects.h2a} <br className="hidden sm:block" />
            <span className="text-white/40">{t.projects.h2b}</span>
          </h2>
        </div>
        <div className="pb-2">
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de estruturar um projeto.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>Discutir Projeto</span>
            
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/20 rounded-md text-[9px] font-mono text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 scale-95 group-hover:scale-100 shadow-xl hidden md:block">
              {lang === 'pt' ? 'Iniciar conversa no WhatsApp' : 'Start conversation on WhatsApp'}
            </div>
          </a>
        </div>
      </motion.div>

      {/* Client Projects Carousel */}
      <div className="mb-20">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-16 block pb-4">
          {lang === 'pt' ? 'Projetos de Clientes' : 'Client Projects'}
        </span>
        <div className="flex flex-col space-y-8">
          {featuredProjects.length > 0 && (
            <>
              <ProjectCard project={featuredProjects[activeIndex]} lang={lang} t={t} FADE_UP={FADE_UP} />
              
              {/* Controls & CTA Container */}
              <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-8 mt-8">
                
                {/* Carousel Navigation Capsule */}
                <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                  <button
                    onClick={() => setActiveIndex(prev => prev === 0 ? featuredProjects.length - 1 : prev - 1)}
                    className="relative group w-12 h-10 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
                    aria-label="Previous Project"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded-md text-[9px] font-mono text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 scale-95 group-hover:scale-100 shadow-lg hidden md:block">
                      {lang === 'pt' ? 'Projeto Anterior' : 'Previous Project'}
                    </div>
                  </button>
                  
                  <div className="flex items-center justify-center px-6 font-mono text-[11px] tracking-[0.2em] text-white/30 h-6 select-none">
                    <span className="text-white font-bold">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                    <span className="mx-2">/</span>
                    <span>{featuredProjects.length.toString().padStart(2, '0')}</span>
                  </div>

                  <button
                    onClick={() => setActiveIndex(prev => prev === featuredProjects.length - 1 ? 0 : prev + 1)}
                    className="relative group w-12 h-10 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
                    aria-label="Next Project"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded-md text-[9px] font-mono text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 scale-95 group-hover:scale-100 shadow-lg hidden md:block">
                      {lang === 'pt' ? 'Próximo Projeto' : 'Next Project'}
                    </div>
                  </button>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <a
                    href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de estruturar um projeto.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex justify-center w-full sm:w-auto items-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    <span>Discutir Projeto</span>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/20 rounded-md text-[9px] font-mono text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 scale-95 group-hover:scale-100 shadow-xl hidden md:block">
                      {lang === 'pt' ? 'Iniciar conversa no WhatsApp' : 'Start conversation on WhatsApp'}
                    </div>
                  </a>
                  <a
                    href="/cases"
                    className="relative inline-flex justify-center w-full sm:w-auto items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white hover:scale-105 active:scale-95 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white hover:text-black uppercase transition-all duration-300 shadow-xl group"
                  >
                    <span>{lang === 'pt' ? 'Explorar Todos os Cases' : 'Explore All Cases'}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-emerald-500/20 rounded-md text-[9px] font-mono text-emerald-400/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 scale-95 group-hover:scale-100 shadow-xl hidden md:block">
                      {lang === 'pt' ? 'Ver portfólio completo' : 'View complete portfolio'}
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default ProjectSection;
