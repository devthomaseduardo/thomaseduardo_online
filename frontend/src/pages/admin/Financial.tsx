import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const mockTransactions = [
  { id: 'TRX-001', date: '2026-06-03', description: 'Fatura Mensal - Manutenção', category: 'Recorrente', type: 'income', amount: 5000, status: 'Paid' },
  { id: 'TRX-002', date: '2026-06-02', description: 'AWS Hosting', category: 'Infraestrutura', type: 'expense', amount: -1200, status: 'Paid' },
  { id: 'TRX-003', date: '2026-06-01', description: 'Kickoff Projeto App Logística', category: 'Projeto', type: 'income', amount: 15000, status: 'Pending' },
  { id: 'TRX-004', date: '2026-05-28', description: 'Licença Software', category: 'Ferramentas', type: 'expense', amount: -450, status: 'Paid' },
];

export function Financial() {
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

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-lg">
          <p className="text-zinc-500 text-sm font-medium mb-1">Saldo Atual</p>
          <h3 className="text-2xl font-bold text-white">R$ 145.200,00</h3>
        </div>
        <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-lg">
          <p className="text-zinc-500 text-sm font-medium mb-1">Receitas (Mês)</p>
          <h3 className="text-2xl font-bold text-emerald-500">R$ 48.000,00</h3>
        </div>
        <div className="bg-[#0B0B0B] border border-[#222] p-5 rounded-lg">
          <p className="text-zinc-500 text-sm font-medium mb-1">Despesas (Mês)</p>
          <h3 className="text-2xl font-bold text-red-500">R$ 12.450,00</h3>
        </div>
      </div>

      <div className="bg-[#0B0B0B] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#222] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Buscar transações..." className="w-full bg-[#111] border border-[#222] rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-md text-sm font-medium text-zinc-300 hover:bg-[#1A1A1A]">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] text-xs text-zinc-500 bg-[#080808]">
                <th className="p-4 font-medium">Data</th>
                <th className="p-4 font-medium">Descrição</th>
                <th className="p-4 font-medium">Categoria</th>
                <th className="p-4 font-medium text-right">Valor</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockTransactions.map(t => (
                <tr key={t.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="p-4 text-zinc-400">{t.date}</td>
                  <td className="p-4 font-medium text-zinc-200">
                    <div className="flex items-center gap-2">
                      {t.type === 'income' ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                      {t.description}
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400">{t.category}</td>
                  <td className={`p-4 text-right font-medium ${t.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+' : ''} R$ {Math.abs(t.amount).toLocaleString('pt-BR')}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider 
                      ${t.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {t.status}
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
