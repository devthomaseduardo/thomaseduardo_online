import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Globe, Terminal, Cpu, Layout, HardDrive, Code2, ArrowRight, ExternalLink } from 'lucide-react';
import projectsData from '../data/projects.json';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, SMOOTH_TRANSITION } from '../constants/animations';
import { DeviceMockup } from './DeviceMockup';
import { AnimatedEmoji } from './AnimatedEmoji';

const TerminalHeader = ({ title }: { title: string }) => (
  <div className="bg-[#0f0f0f] border border-white/10 rounded-t-2xl p-4 flex items-center justify-between">
    <div className="flex gap-2">
      <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
      <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
      <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
    </div>
    <div className="flex items-center gap-3">
      <Terminal className="w-3.5 h-3.5 text-white/20" />
      <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.3em]">{title}</span>
    </div>
    <div className="w-12" />
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
    if (filter === 'all') {
      return projectsData;
    }
    return projectsData.filter(p => p.category === filter);
  }, [filter]);

  const activeProject = useMemo(() => 
    projectsData.find(p => p.id === selectedId) || projectsData[0]
  , [selectedId]);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Project Navigation Console */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div {...FADE_UP} className="mb-4">
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.4em] mb-4 block">System_Repository</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
                Portfólio <br /><span className="text-white/30">de Cases</span>
              </h1>
            </motion.div>

            <div className="flex-1 flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <TerminalHeader title="root/projects/list" />
              
              <div className="p-4 flex gap-2 border-b border-white/5 bg-white/[0.02]">
                {['all', 'operational', 'infra'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest transition-all ${
                      filter === cat ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-white/40 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'Todos' : cat === 'operational' ? 'Sistemas' : 'Páginas'}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar max-h-[500px]">
                {filteredProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group mb-1 ${
                      selectedId === p.id 
                        ? 'bg-emerald-500/10 border border-emerald-500/20' 
                        : 'hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <span className="text-[10px] font-mono text-white/10 group-hover:text-emerald-500/40">0{idx + 1}</span>
                      <div>
                        <h3 className={`text-sm font-bold tracking-tight uppercase ${selectedId === p.id ? 'text-emerald-400' : 'text-white/60'}`}>{p.title}</h3>
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mt-0.5">{p.metric}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedId === p.id ? 'text-emerald-500 translate-x-1' : 'text-white/10'}`} />
                  </button>
                ))}
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-tighter">System_Status: Stable</span>
                </div>
                <span className="text-[9px] font-mono text-white/20">{filteredProjects.length} Objects Loaded</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Output Center */}
          <div className="lg:col-span-8 flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            <TerminalHeader title={`active_process/${activeProject.id}.bin`} />
            
            <div className="flex-1 relative flex flex-col lg:flex-row p-6 md:p-10 gap-10">
              <AnimatePresence mode="wait">
                {!isBooting ? (
                  <motion.div 
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center"
                  >
                    {/* Project Data Column */}
                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                      <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase mb-4">{activeProject.title}</h2>
                        <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">{activeProject.descricao}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-2">Categoria</span>
                          <span className="text-xs text-white/70 font-bold uppercase">{activeProject.category}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-2">Performance</span>
                          <span className="text-xs text-emerald-400 font-bold uppercase">{activeProject.metric}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block">Recursos Ativos</span>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.recursos?.map((r: string) => (
                            <span key={r} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono italic">#{r.replace(/\s+/g, '_').toLowerCase()}</span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        {activeProject.link && (
                          <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
                            {t.projects.livePreview} <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                        <a href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, vi o projeto " + activeProject.title + " e gostaria de algo similar.")}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 text-white font-bold uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all">
                          Discutir Projeto <AnimatedEmoji name="rocket" className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Mockup Column */}
                    <div className="lg:col-span-7 w-full order-1 lg:order-2">
                       <DeviceMockup 
                          desktopImg={activeProject.image}
                          mobileImg={activeProject.image}
                          altText={activeProject.title}
                       />
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                       <Cpu className="w-8 h-8 text-emerald-500 animate-spin" />
                       <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest animate-pulse">Initializing_Interface...</span>
                    </div>
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