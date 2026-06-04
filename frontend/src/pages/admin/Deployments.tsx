import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Terminal, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAdminFetch } from '../../components/admin/useAdminFetch';

export function Deployments() {
  const { data: deploys, loading, error } = useAdminFetch<any[]>('/deploys');
  const rows = Array.isArray(deploys) ? deploys : [];

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

        {loading && <div className="p-4 text-sm text-zinc-400">Carregando deploys...</div>}
        {error && <div className="p-4 text-sm text-red-500">Erro ao carregar deploys: {error}</div>}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Projeto</th>
                <th className="p-4 font-medium">Ambiente</th>
                <th className="p-4 font-medium">Branch</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Commit</th>
                <th className="p-4 font-medium text-right">Data</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((deploy) => {
                const status = deploy.status ?? 'pending';
                return (
                  <tr key={deploy.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                    <td className="p-4 font-medium text-zinc-200 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-zinc-500" />
                      {deploy.project?.name ?? 'Projeto'}
                    </td>
                    <td className="p-4">
                      <span className="text-zinc-400 bg-[#1A1A1A] px-2 py-1 rounded text-xs">{deploy.ambiente ?? deploy.environment ?? 'production'}</span>
                    </td>
                    <td className="p-4 text-zinc-300 font-mono text-xs">{deploy.branch ?? '-'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {status === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : status === 'failed' ? <XCircle className="w-4 h-4 text-red-500" /> : <Clock className="w-4 h-4 text-blue-500 animate-pulse" />}
                        <span className={`text-xs font-medium ${status === 'success' ? 'text-emerald-500' : status === 'failed' ? 'text-red-500' : 'text-blue-500'}`}>
                          {status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400 truncate max-w-[200px]">{deploy.commitHash ?? deploy.commit ?? '-'}</td>
                    <td className="p-4 text-zinc-500 text-right text-xs">{deploy.createdAt ? new Date(deploy.createdAt).toLocaleDateString('pt-BR') : '-'}</td>
                    <td className="p-4 text-zinc-500 hover:text-white cursor-pointer"><MoreHorizontal className="w-5 h-5" /></td>
                  </tr>
                );
              })}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-sm text-zinc-500 text-center">Nenhum deploy encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
