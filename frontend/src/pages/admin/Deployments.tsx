import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Terminal, CheckCircle, XCircle, Clock } from 'lucide-react';

const mockDeploys = [
  { id: '1', project: 'Acme Corp ERP', environment: 'Production', version: 'v2.4.1', status: 'Success', time: '10 min ago', commit: 'Fix auth bug' },
  { id: '2', project: 'LogisTech App', environment: 'Staging', version: 'v1.1.0-rc2', status: 'In Progress', time: '1 hour ago', commit: 'Update UI components' },
  { id: '3', project: 'Indústria BR Portal', environment: 'Production', version: 'v3.0.0', status: 'Failed', time: '4 hours ago', commit: 'Migrate DB to v3' },
  { id: '4', project: 'Retail Plus', environment: 'Development', version: 'v0.9.5', status: 'Success', time: 'Yesterday', commit: 'Add payment gateway' },
];

export function Deployments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Deployments</h1>
          <p className="text-zinc-500 text-sm">Histórico de entregas, builds e ambientes.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Novo Deploy
        </button>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar deploys..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A] transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Projeto</th>
                <th className="p-4 font-medium">Ambiente</th>
                <th className="p-4 font-medium">Versão</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Commit</th>
                <th className="p-4 font-medium text-right">Tempo</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockDeploys.map(d => (
                <tr key={d.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 font-medium text-zinc-200 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    {d.project}
                  </td>
                  <td className="p-4">
                    <span className="text-zinc-400 bg-[#1A1A1A] px-2 py-1 rounded text-xs">
                      {d.environment}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-300 font-mono text-xs">{d.version}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {d.status === 'Success' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : 
                       d.status === 'Failed' ? <XCircle className="w-4 h-4 text-red-500" /> : 
                       <Clock className="w-4 h-4 text-blue-500 animate-pulse" />}
                      <span className={`text-xs font-medium ${d.status === 'Success' ? 'text-emerald-500' : d.status === 'Failed' ? 'text-red-500' : 'text-blue-500'}`}>
                        {d.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400 truncate max-w-[200px]">{d.commit}</td>
                  <td className="p-4 text-zinc-500 text-right text-xs">{d.time}</td>
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
