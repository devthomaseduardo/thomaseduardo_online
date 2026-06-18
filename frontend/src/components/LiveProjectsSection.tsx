import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../data/projects.json';
import { useLang } from '../contexts/LangContext';

export function LiveProjectsSection() {
  const { t } = useLang();
  
  const liveProjects = projectsData
    .filter(p => p.link && !p.link.includes('github.com'))
    .slice(0, 4);

  if (liveProjects.length === 0) return null;

  return (
    <section className="py-32 bg-[#060606] relative">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-4 block">
            Produção Ativa
          </span>
          <h2 className="text-6xl font-bold text-white tracking-tighter">
            {t.projects.clientHeader}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="group relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a] hover:border-white/10 transition-all duration-500"
            >
              <img 
                src={project.image || '/sistemas-web.png'} 
                alt={project.title}
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606] to-transparent p-12 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-white tracking-tighter mb-2">{project.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed max-w-sm">{project.descricao}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-6 h-6" />
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
