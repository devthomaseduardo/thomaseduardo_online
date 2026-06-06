import React from 'react';
import { Project } from '../../../types/admin';

export function ActiveProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <h3 className="font-bold text-white tracking-tight uppercase text-xs tracking-[0.2em]">Pipeline Ativo</h3>
        <button className="text-[10px] text-zinc-500 hover:text-white font-bold uppercase tracking-widest transition-all">Ver Projetos</button>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              <th className="px-6 py-5">Entidade Técnica</th>
              <th className="px-6 py-5">Cliente</th>
              <th className="px-6 py-5">Execução</th>
              <th className="px-6 py-5">Previsão</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects.map((project) => (
              <tr key={project.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{project.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1 uppercase opacity-50">{project.id.split('-')[0]}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-400 text-[10px] font-bold uppercase group-hover:text-white group-hover:border-white/10 transition-all">
                    {project.client}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-[100px] bg-white/5 rounded-full h-1.5 relative overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col">
                    <span className="text-zinc-300 font-medium">{new Date(project.deadline).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</span>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-1">No Prazo</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
