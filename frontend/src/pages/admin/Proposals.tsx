import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileText } from 'lucide-react';

const mockProposals = [
  { id: 'PROP-001', date: '2026-06-01', client: 'TechCorp', title: 'Desenvolvimento ERP Customizado', value: 85000, status: 'Sent' },
  { id: 'PROP-002', date: '2026-05-28', client: 'Global Retail', title: 'Plataforma E-commerce Headless', value: 120000, status: 'Accepted' },
  { id: 'PROP-003', date: '2026-05-25', client: 'StartUp Alpha', title: 'MVP SaaS B2B', value: 45000, status: 'Negotiating' },
  { id: 'PROP-004', date: '2026-05-20', client: 'Legacy Indust', title: 'Migração de Sistema Legado', value: 60000, status: 'Rejected' },
];

export function Proposals() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Propostas</h1>
          <p className="text-zinc-500 text-sm">Gestão de propostas comerciais enviadas e fechamentos.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Nova Proposta
        </button>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar propostas..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A]">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Data</th>
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Título da Proposta</th>
                <th className="p-4 font-medium text-right">Valor</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockProposals.map(p => (
                <tr key={p.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-mono text-xs text-zinc-500">{p.id}</td>
                  <td className="p-4 text-zinc-400">{p.date}</td>
                  <td className="p-4 font-medium text-zinc-200">{p.client}</td>
                  <td className="p-4 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-zinc-500" />
                      {p.title}
                    </div>
                  </td>
                  <td className="p-4 text-zinc-200 text-right font-medium">R$ {(p.value / 1000).toFixed(1)}k</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider 
                      ${p.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' : 
                        p.status === 'Sent' ? 'bg-blue-500/10 text-blue-500' : 
                        p.status === 'Negotiating' ? 'bg-amber-500/10 text-amber-500' : 
                        'bg-red-500/10 text-red-500'}`}>
                      {p.status}
                    </span>
                  </td>
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
