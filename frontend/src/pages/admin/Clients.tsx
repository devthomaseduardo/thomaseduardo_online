import React from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

const mockClients = [
  { id: '1', company: 'Acme Corp', contact: 'John Doe', status: 'Active', ltv: 120000, mrr: 5000, activeProjects: 2 },
  { id: '2', company: 'LogisTech', contact: 'Jane Smith', status: 'Active', ltv: 85000, mrr: 3500, activeProjects: 1 },
  { id: '3', company: 'Indústria BR', contact: 'Carlos Silva', status: 'Inactive', ltv: 45000, mrr: 0, activeProjects: 0 },
];

export function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Clientes</h1>
          <p className="text-zinc-500 text-sm">CRM de clientes ativos, histórico e métricas financeiras.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Novo Cliente
        </button>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar clientes..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A]">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Empresa</th>
                <th className="p-4 font-medium">Contato Principal</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Projetos Ativos</th>
                <th className="p-4 font-medium text-right">MRR</th>
                <th className="p-4 font-medium text-right">LTV</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockClients.map(c => (
                <tr key={c.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-medium text-zinc-200">{c.company}</td>
                  <td className="p-4 text-zinc-400">{c.contact}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400 text-right">{c.activeProjects}</td>
                  <td className="p-4 text-emerald-500 text-right font-medium">R$ {(c.mrr / 1000).toFixed(1)}k</td>
                  <td className="p-4 text-zinc-200 text-right font-medium">R$ {(c.ltv / 1000).toFixed(1)}k</td>
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
