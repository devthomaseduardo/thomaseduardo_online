import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAdminFetch } from '../../components/admin/useAdminFetch';

export function Financial() {
  const { data: invoices, loading, error } = useAdminFetch<any[]>('/invoices');
  const rows = Array.isArray(invoices) ? invoices : [];
  const totalRevenue = rows.reduce((sum, invoice) => sum + (invoice.amount ?? 0), 0);
  const paidRevenue = rows.reduce((sum, invoice) => sum + ((invoice.status === 'paid' || invoice.status === 'paid') ? (invoice.amount ?? 0) : 0), 0);
  const pendingRevenue = rows.reduce((sum, invoice) => sum + ((invoice.status !== 'paid') ? (invoice.amount ?? 0) : 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Financeiro</h1>
          <p className="text-zinc-500 text-sm">Fluxo de caixa, recebimentos e despesas da operação.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          <Plus className="w-4 h-4" /> Nova Transação
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-lg">
          <p className="text-zinc-500 text-sm font-medium mb-1">Saldo Atual</p>
          <h3 className="text-2xl font-bold text-white">R$ {Math.max(0, paidRevenue).toLocaleString('pt-BR')}</h3>
        </div>
        <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-lg">
          <p className="text-zinc-500 text-sm font-medium mb-1">Receitas (Total)</p>
          <h3 className="text-2xl font-bold text-emerald-500">R$ {totalRevenue.toLocaleString('pt-BR')}</h3>
        </div>
        <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-lg">
          <p className="text-zinc-500 text-sm font-medium mb-1">A Receber</p>
          <h3 className="text-2xl font-bold text-red-500">R$ {pendingRevenue.toLocaleString('pt-BR')}</h3>
        </div>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar transações..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A] transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        {loading && <div className="p-4 text-sm text-zinc-400">Carregando transações...</div>}
        {error && <div className="p-4 text-sm text-red-500">Erro ao carregar transações: {error}</div>}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Data</th>
                <th className="p-4 font-medium">Descrição</th>
                <th className="p-4 font-medium">Projeto</th>
                <th className="p-4 font-medium text-right">Valor</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((invoice) => {
                const date = invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString('pt-BR') : '-';
                const value = invoice.amount != null ? `R$ ${invoice.amount.toLocaleString('pt-BR')}` : '-';
                const status = invoice.status === 'paid' ? 'Pago' : invoice.status === 'partial' ? 'Parcial' : 'Pendente';
                return (
                  <tr key={invoice.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                    <td className="p-4 text-zinc-400">{date}</td>
                    <td className="p-4 font-medium text-zinc-200">{invoice.description}</td>
                    <td className="p-4 text-zinc-400">{invoice.project?.name ?? '-'}</td>
                    <td className={`p-4 text-right font-medium ${invoice.amount >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>{value}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${status === 'Pago' ? 'bg-emerald-500/10 text-emerald-500' : status === 'Parcial' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 hover:text-white cursor-pointer"><MoreHorizontal className="w-5 h-5" /></td>
                  </tr>
                );
              })}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-sm text-zinc-500 text-center">Nenhuma transação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
