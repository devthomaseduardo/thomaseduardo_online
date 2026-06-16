import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Globe } from 'lucide-react';
import projectsData from '../data/projects.json';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations'; // Assumindo que estes estão definidos

export function AllProjectsShowcase() {
  const { t } = useLang();
  const [filter, setFilter] = useState<'all' | 'operational' | 'infra'>('all');

  const filteredProjects = useMemo(() => {
    if (filter === 'all') {
      return projectsData;
    }
    return projectsData.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...FADE_UP} transition={SMOOTH_TRANSITION} className="mb-16 text-center">
          <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-[0.3em] uppercase mb-4 inline-block">
            {t.projects.pageEyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            {t.projects.pageTitle}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {t.projects.pageDesc}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div {...FADE_UP} transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }} className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              filter === 'all' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('operational')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              filter === 'operational' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {t.projects.catOperational}
          </button>
          <button
            onClick={() => setFilter('infra')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              filter === 'infra' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {t.projects.catInfra}
          </button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link || '#'} // Fallback para projetos sem link direto
              target={project.link ? "_blank" : "_self"}
              rel={project.link ? "noopener noreferrer" : ""}
              {...FADE_UP}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] hover:border-emerald-500/30 transition-all duration-500"
            >
              <img 
                src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'} 
                alt={project.title}
                className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-100 group-hover:opacity-60 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    {project.link && !project.link.includes('github.com') && (
                      <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Live Production
                      </p>
                    )}
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-white/40 mt-1 line-clamp-2">{project.descricao}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}