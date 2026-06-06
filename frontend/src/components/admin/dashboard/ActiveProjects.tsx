import React from 'react';
import { Project } from '../../../types/admin';

export function ActiveProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white tracking-tight">Active Pipeline</h3>
        <button className="text-[10px] text-zinc-500 hover:text-white font-bold uppercase tracking-widest transition-all">View All Projects</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              <th className="px-6 py-4">Project Entity</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Fulfillment</th>
              <th className="px-6 py-4">Target Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects.map((project) => (
              <tr key={project.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{project.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-0.5">{project.id}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400 text-xs font-medium group-hover:text-white group-hover:border-white/10 transition-all">
                    {project.client}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-[120px] bg-white/5 rounded-full h-2 relative overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white transition-colors">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-zinc-300 font-medium">{new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">On Schedule</span>
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
