import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Globe } from 'lucide-react';
import projectsData from '../data/projects.json';
import { useLang } from '../contexts/LangContext';

export function LiveProjectsSection() {
  const { t } = useLang();
  
  // Filtra apenas projetos com link de produção (ignorando links do GitHub)
  const liveProjects = projectsData
    .filter(p => p.link && !p.link.includes('github.com'))
    .slice(0, 4); // Limita aos 4 principais para o layout de grid

  if (liveProjects.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative">
      {/* Efeito de luz de fundo suave */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Produção Ativa
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              {t.projects.clientHeader}
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {liveProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] hover:border-emerald-500/30 transition-all duration-500"
            >
              <img 
                src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'} 
                alt={project.title}
                className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-100 group-hover:opacity-60 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Globe className="w-3 h-3" /> Live Preview
                    </p>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <p className="text-[11px] text-white/40 mt-1 line-clamp-2 leading-relaxed max-w-[80%]">{project.descricao}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
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
