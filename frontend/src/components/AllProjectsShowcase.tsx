import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, ChevronRight, ArrowUpRight } from 'lucide-react';
import projectsData from '../data/projects.json';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations';
import { DeviceMockup } from './DeviceMockup';
import { AnimatedEmoji } from './AnimatedEmoji';

const TerminalHeader = ({ title }: { title: string }) => (
  <div className="bg-[#0f0f0f] border-b border-white/5 p-4 flex items-center justify-between">
    <div className="flex gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
    </div>
    <span className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-[0.2em]">{title}</span>
    <div className="w-10" />
  </div>
);

export function AllProjectsShowcase() {
  const { t } = useLang();
  const [selectedId, setSelectedId] = useState(projectsData[0].id);
  const [filter, setFilter] = useState<string>('all');
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projectsData;
    return projectsData.filter(p => p.category === filter);
  }, [filter]);

  const activeProject = useMemo(() => 
    projectsData.find(p => p.id === selectedId) || projectsData[0]
  , [selectedId]);

  return (
    <section className="min-h-screen py-32 bg-[#060606] relative overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Project Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div {...FADE_UP}>
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-4 block">System_Repository</span>
              <h1 className="text-5xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
                Portfólio <br /><span className="text-white/20">de Cases</span>
              </h1>
            </motion.div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <TerminalHeader title="root/projects/list" />
              
              <div className="p-2 flex gap-1 border-b border-white/5">
                {['all', 'operational', 'infra'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`flex-1 px-4 py-3 rounded-2xl text-[9px] font-mono uppercase tracking-widest transition-all ${
                      filter === cat ? 'bg-white/[0.05] text-emerald-400' : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {cat === 'all' ? 'Todos' : cat === 'operational' ? 'Sistemas' : 'Páginas'}
                  </button>
                ))}
              </div>

              <div className="max-h-[500px] overflow-y-auto p-2">
                {filteredProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                      selectedId === p.id 
                        ? 'bg-white/[0.03]' 
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <span className="text-[10px] font-mono text-white/10">0{idx + 1}</span>
                      <h3 className={`text-sm font-bold tracking-tight uppercase ${selectedId === p.id ? 'text-white' : 'text-white/50'}`}>{p.title}</h3>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-colors ${selectedId === p.id ? 'text-white' : 'text-white/10'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Output */}
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl min-h-[600px] flex flex-col">
            <TerminalHeader title={`active_process/${activeProject.id}.bin`} />
            
            <div className="flex-1 p-12">
              <AnimatePresence mode="wait">
                {!isBooting ? (
                  <motion.div 
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="grid lg:grid-cols-2 gap-12"
                  >
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-4">{activeProject.title}</h2>
                        <p className="text-base text-white/50 leading-relaxed font-light">{activeProject.descricao}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                          Performance: <span className="text-emerald-400 font-bold">{activeProject.metric}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {activeProject.recursos?.map((r: string) => (
                          <span key={r} className="px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-[10px] text-white/40 font-mono">#{r.toLowerCase()}</span>
                        ))}
                      </div>

                      {activeProject.link && (
                        <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-xl transition-all">
                          {t.projects.livePreview} <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="w-full">
                       <DeviceMockup 
                          desktopImg={activeProject.image}
                          mobileImg={activeProject.image}
                          altText={activeProject.title}
                       />
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <Cpu className="w-8 h-8 text-white/10 animate-spin" />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}