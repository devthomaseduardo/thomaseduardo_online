import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, User, Mail } from 'lucide-react';

const mockLeads = [
  { id: '1', name: 'Carlos Mendes', company: 'NovaTech', status: 'Hot', source: 'Website', date: 'Hoje, 14:30' },
  { id: '2', name: 'Ana Silva', company: 'Silva Advogados', status: 'Warm', source: 'Referral', date: 'Ontem, 09:15' },
  { id: '3', name: 'Roberto Carlos', company: 'RC Eng', status: 'Cold', source: 'LinkedIn', date: '15 Mai 2026' },
  { id: '4', name: 'Julia Costa', company: 'Costa & Cia', status: 'Hot', source: 'Website', date: '12 Mai 2026' },
];

export function Leads() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Leads</h1>
          <p className="text-zinc-500 text-sm">Gestão de contatos comerciais e oportunidades.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Novo Lead
        </button>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar leads..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A] transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">Empresa</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Origem</th>
                <th className="p-4 font-medium text-right">Data</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockLeads.map(l => (
                <tr key={l.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-medium text-zinc-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <User className="w-4 h-4 text-zinc-400" />
                    </div>
                    {l.name}
                  </td>
                  <td className="p-4 text-zinc-400">{l.company}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${l.status === 'Hot' ? 'bg-red-500/10 text-red-500' : l.status === 'Warm' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400 text-xs">{l.source}</td>
                  <td className="p-4 text-zinc-500 text-right text-xs">{l.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Mail className="w-4 h-4 hover:text-white cursor-pointer" />
                      <MoreHorizontal className="w-5 h-5 hover:text-white cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
