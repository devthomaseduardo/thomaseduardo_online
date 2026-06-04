import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileText, Download } from 'lucide-react';

const mockContracts = [
  { id: '1', client: 'Acme Corp', title: 'Desenvolvimento ERP', status: 'Active', value: 120000, startDate: '2025-01-10', endDate: '2026-01-10' },
  { id: '2', client: 'LogisTech', title: 'Manutenção App', status: 'Pending Signature', value: 45000, startDate: '2025-03-01', endDate: '2026-03-01' },
  { id: '3', client: 'Indústria BR', title: 'Consultoria Cloud', status: 'Expired', value: 30000, startDate: '2024-05-15', endDate: '2025-05-15' },
  { id: '4', client: 'Retail Plus', title: 'E-commerce B2C', status: 'Active', value: 85000, startDate: '2025-02-20', endDate: '2026-02-20' },
];

export function Contracts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Contratos</h1>
          <p className="text-zinc-500 text-sm">Gestão de contratos ativos, assinaturas e renovações.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Novo Contrato
        </button>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar contratos..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A] transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Contrato</th>
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Início</th>
                <th className="p-4 font-medium">Vencimento</th>
                <th className="p-4 font-medium text-right">Valor Total</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockContracts.map(c => (
                <tr key={c.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-medium text-zinc-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-zinc-500" />
                    {c.title}
                  </td>
                  <td className="p-4 text-zinc-400">{c.client}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : c.status === 'Pending Signature' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400">{c.startDate}</td>
                  <td className="p-4 text-zinc-400">{c.endDate}</td>
                  <td className="p-4 text-zinc-200 text-right font-medium">R$ {(c.value / 1000).toFixed(1)}k</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Download className="w-4 h-4 hover:text-white cursor-pointer" />
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
