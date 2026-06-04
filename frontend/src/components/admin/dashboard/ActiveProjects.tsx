import React from 'react';
import { Project } from '../../../types/admin';

export function ActiveProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
      <div className="p-5 border-b border-[#222] flex justify-between items-center">
        <h3 className="font-semibold text-white">Projetos Ativos</h3>
        <button className="text-xs text-zinc-400 hover:text-white transition-colors">Ver todos</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#222] text-xs text-zinc-500">
              <th className="p-4 font-medium">Projeto</th>
              <th className="p-4 font-medium">Cliente</th>
              <th className="p-4 font-medium">Progresso</th>
              <th className="p-4 font-medium">Prazo</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                <td className="p-4">
                  <span className="font-medium text-zinc-200">{project.name}</span>
                </td>
                <td className="p-4 text-zinc-400">{project.client}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 max-w-[100px]">
                      <div 
                        className="bg-white h-1.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-zinc-500">{project.progress}%</span>
                  </div>
                </td>
                <td className="p-4 text-zinc-400">{new Date(project.deadline).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
