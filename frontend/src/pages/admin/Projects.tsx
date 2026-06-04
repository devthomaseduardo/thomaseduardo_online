import React from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { useAdminFetch } from '../../components/admin/useAdminFetch';

export function Projects() {
  const { data: projects, loading, error } = useAdminFetch<any[]>('/projects');
  const rows = Array.isArray(projects) ? projects : [];

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

        {loading && <div className="p-4 text-sm text-zinc-400">Carregando projetos...</div>}
        {error && <div className="p-4 text-sm text-red-500">Erro ao carregar projetos: {error}</div>}

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
              {rows.map((project) => {
                const status = project.status || project.phase || 'Ativo';
                const progress = project.progresso ?? project.progress ?? 0;
                const deadline = project.dataEntregaPrevista
                  ? new Date(project.dataEntregaPrevista).toLocaleDateString('pt-BR')
                  : project.deadline || '-';
                return (
                  <tr key={project.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                    <td className="p-4 font-medium text-zinc-200">{project.name}</td>
                    <td className="p-4 text-zinc-400">{project.client?.name ?? project.client}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${status === 'Active' || status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : status === 'Completed' || status === 'concluido' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-zinc-800 rounded-full h-1.5 max-w-[80px]">
                          <div className="bg-white h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-xs text-zinc-500">{progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400">{deadline}</td>
                    <td className="p-4 text-zinc-200 text-right font-medium">{project.value ? `R$ ${project.value.toLocaleString('pt-BR')}` : '-'}</td>
                    <td className="p-4 text-zinc-500 hover:text-white cursor-pointer"><MoreHorizontal className="w-5 h-5" /></td>
                  </tr>
                );
              })}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-sm text-zinc-500 text-center">Nenhum projeto encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
