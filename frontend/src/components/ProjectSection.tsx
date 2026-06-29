import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import projectsData from '../data/projects.json';
import { DeviceMockup } from './DeviceMockup';
import { AnimatedEmoji } from './AnimatedEmoji';

const TerminalMockup = ({ project }: { project: any }) => (
  <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-mono text-[10px] md:text-xs">
    <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
      </div>
      <span className="text-white/20 uppercase tracking-widest ml-2">bash — {project.id}.sh</span>
    </div>
    <div className="p-8 space-y-4 text-left">
      <div className="text-white">➜ <span className="text-zinc-400">~/projects</span> <span className="text-white/40">cat {project.title.toLowerCase().replace(/\s+/g, '_')}.json</span></div>
      <div className="pl-4 border-l border-white/5 space-y-2 text-white/60">
        <div>"category": "{project.category}",</div>
        <div>"stack": ["{project.tecnologias?.join('", "')}"],</div>
      </div>
    </div>
  </div>
);

export const ProjectCard = ({ project, t }: any) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div {...FADE_UP} className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-[0.3em] mb-4 block">
            {project.category === 'operational' ? t.projects.catOperational : t.projects.catInfra}
          </span>
          <h3 className="text-5xl font-bold tracking-tighter text-white uppercase leading-none mb-6">
            {project.title}
          </h3>
          <p className="text-lg text-white/50 font-light leading-relaxed">
            {project.descricao}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-all"
          >
            {showDetails ? t.projects.hideDetails : t.projects.showDetails}
          </button>
          
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de estruturar um projeto.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white text-black font-bold uppercase text-[10px] tracking-widest transition-all hover:bg-neutral-100"
          >
            {t.projects.discussProject}
          </a>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5 pt-8"
            >
              <div className="text-xs text-white/40 font-light leading-relaxed">
                {project.descricao}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full">
        {project.link && !project.link.includes('github.com') ? (
          <DeviceMockup
            desktopImg={project.image}
            mobileImg={project.image_mobile || project.image}
            altText={project.title}
          />
        ) : (
          <TerminalMockup project={project} />
        )}
      </div>
    </motion.div>
  );
};

export const ProjectSection = () => {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredProjects = projectsData;

  return (
    <section id="casos" className="py-32 bg-[#060606] relative">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-20">
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-4 block">{t.projects.eyebrow}</span>
            <h2 className="text-6xl font-bold tracking-tighter text-white">{t.projects.clientHeader}</h2>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => setActiveIndex(prev => prev === 0 ? featuredProjects.length - 1 : prev - 1)} className="p-4 rounded-full bg-white/[0.03] border border-white/5 text-white/50 hover:text-white">
              <ArrowRight className="rotate-180" />
            </button>
            <button onClick={() => setActiveIndex(prev => prev === featuredProjects.length - 1 ? 0 : prev + 1)} className="p-4 rounded-full bg-white/[0.03] border border-white/5 text-white/50 hover:text-white">
              <ArrowRight />
            </button>
          </div>
        </div>

        <ProjectCard project={featuredProjects[activeIndex]} t={t} />
      </div>
    </section>
  );
};

export default ProjectSection;
