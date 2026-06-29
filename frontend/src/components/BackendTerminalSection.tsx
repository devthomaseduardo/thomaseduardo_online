import React, { useState } from 'react';
import { motion } from 'motion/react';
import projectsData from '../data/projects.json';

// Filtrar apenas projetos do backend ou com categoria 'infra'
const backendProjects = projectsData.filter(
  p => p.category === 'infra' || p.title.toLowerCase().includes('backend')
);

export function BackendTerminalSection() {
  const [selectedProject, setSelectedProject] = useState(backendProjects[0]);

  return (
    <section className="py-24 bg-[#050505] text-[#FAFAFA] font-mono">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-8">
          Sistemas que <span className="text-white/40">reduzem gargalos.</span>
        </h2>
        
        {/* Terminal Window */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
          
          {/* Sidebar - Project List */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-4">
            <div className="text-white/30 text-[10px] uppercase tracking-widest mb-4">~/projects/backend/list</div>
            <div className="space-y-2">
              {backendProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    selectedProject.id === p.id 
                      ? 'bg-white/10 text-white font-bold' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {`> ${p.title.toLowerCase().replace(/ /g, '_')}`}
                </button>
              ))}
            </div>
          </div>

          {/* Main Area - Project Details */}
          <div className="flex-1 p-6 md:p-10 bg-black">
            <div className="text-white/50 text-[10px] uppercase tracking-widest mb-6">
              ~/projects/backend/{selectedProject.id}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white uppercase">{selectedProject.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{selectedProject.descricao}</p>
              
              <div className="border border-white/5 p-4 rounded bg-white/5">
                <div className="text-[10px] text-zinc-500 mb-2 uppercase">Tecnologias</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tecnologias.map(t => (
                    <span key={t} className="text-[#A1A1AA] text-xs">[{t}]</span>
                  ))}
                </div>
              </div>

              <a 
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-black bg-[#FAFAFA] hover:bg-white px-4 py-2 text-xs font-bold uppercase transition-colors"
              >
                Executar_Projeto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
