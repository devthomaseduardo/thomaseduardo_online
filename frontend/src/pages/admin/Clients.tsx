import React from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { useAdminFetch } from '../../components/admin/useAdminFetch';

export function Clients() {
  const { data: clients, loading, error } = useAdminFetch<any[]>('/clients');
  const rows = Array.isArray(clients) ? clients : [];

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

        {loading && <div className="p-4 text-sm text-zinc-400">Carregando clientes...</div>}
        {error && <div className="p-4 text-sm text-red-500">Erro ao carregar clientes: {error}</div>}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Empresa</th>
                <th className="p-4 font-medium">Contato Principal</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Projetos</th>
                <th className="p-4 font-medium text-right">MRR</th>
                <th className="p-4 font-medium text-right">LTV</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((client) => {
                const projectCount = Array.isArray(client.projects) ? client.projects.length : 0;
                const activeProjects = Array.isArray(client.projects)
                  ? client.projects.filter((project: any) => project.status !== 'cancelado').length
                  : 0;
                const ltv = Array.isArray(client.projects)
                  ? client.projects.reduce((sum: number, project: any) => sum + (project.value ?? 0), 0)
                  : 0;
                const status = projectCount > 0 ? 'Active' : 'Inactive';

                return (
                  <tr key={client.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                    <td className="p-4 font-medium text-zinc-200">{client.name || client.company}</td>
                    <td className="p-4 text-zinc-400">{client.email || '-'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-400 text-right">{activeProjects}</td>
                    <td className="p-4 text-emerald-500 text-right font-medium">-</td>
                    <td className="p-4 text-zinc-200 text-right font-medium">R$ {Math.round(ltv).toLocaleString('pt-BR')}</td>
                    <td className="p-4 text-zinc-500 hover:text-white cursor-pointer"><MoreHorizontal className="w-5 h-5" /></td>
                  </tr>
                );
              })}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-sm text-zinc-500 text-center">Nenhum cliente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
