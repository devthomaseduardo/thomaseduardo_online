import React from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

const mockProjects = [
  { id: '1', name: 'ERP Interno', client: 'Acme Corp', status: 'Active', progress: 75, deadline: '2026-07-15', value: 25000 },
  { id: '2', name: 'App de Logística', client: 'LogisTech', status: 'Active', progress: 30, deadline: '2026-08-30', value: 40000 },
  { id: '3', name: 'Portal B2B', client: 'Indústria BR', status: 'Completed', progress: 100, deadline: '2026-05-20', value: 15000 },
  { id: '4', name: 'E-commerce', client: 'Retail Plus', status: 'On Hold', progress: 45, deadline: '2026-09-10', value: 55000 },
];

export function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Projetos</h1>
          <p className="text-zinc-500 text-sm">Gerenciamento de projetos ativos, cronogramas e entregas.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Novo Projeto
        </button>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar projetos..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A] transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Nome do Projeto</th>
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Progresso</th>
                <th className="p-4 font-medium">Prazo</th>
                <th className="p-4 font-medium text-right">Valor</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockProjects.map(p => (
                <tr key={p.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-medium text-zinc-200">{p.name}</td>
                  <td className="p-4 text-zinc-400">{p.client}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : p.status === 'Completed' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-zinc-800 rounded-full h-1.5 max-w-[80px]">
                        <div className="bg-white h-1.5 rounded-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-zinc-500">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400">{p.deadline}</td>
                  <td className="p-4 text-zinc-200 text-right font-medium">R$ {(p.value / 1000).toFixed(1)}k</td>
                  <td className="p-4 text-zinc-500 hover:text-white cursor-pointer"><MoreHorizontal className="w-5 h-5" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
