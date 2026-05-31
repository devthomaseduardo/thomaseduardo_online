import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DollarSign, ArrowUpRight, ArrowDownRight, FileText, Download, Plus, CheckCircle2, Circle, Search, X } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";

const API = "/api/v2";
const hdrs = () => ({ "Content-Type": "application/json", "x-admin-key": localStorage.getItem("adminAuth") ?? "" });

export function FinanceiroModule() {
  const { projects: data, loading } = useAdminData();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  // Agrega todas as invoices de todos os projetos
  const allInvoices = data.flatMap(p => (p.invoices ?? []).map((i: any) => ({ ...i, project: p })))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalReceita = allInvoices.reduce((acc, i) => acc + (i.amount || 0), 0);
  const totalPago = allInvoices.reduce((acc, i) => acc + (i.valorPago || 0), 0);
  const pendente = totalReceita - totalPago;

  const filtered = allInvoices.filter(i => 
    i.description?.toLowerCase().includes(search.toLowerCase()) || 
    i.project?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full py-6 px-5 md:py-10 md:px-10 space-y-8 max-w-7xl mx-auto">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-50 bg-[#0B0B0B] border border-white/10 px-5 py-3 rounded-xl text-sm text-white shadow-2xl">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Financeiro</h1>
          <p className="text-white/30 text-sm">Controle bancário e de faturamento.</p>
        </div>
        <button onClick={() => setModal(true)} className="bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-white/90">
          <Plus className="w-4 h-4" /> Nova Cobrança
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Receita Bruta Total", val: `R$ ${totalReceita.toLocaleString('pt-BR', {minimumFractionDigits:2})}`, icon: DollarSign, color: "text-white" },
          { label: "Total Recebido", val: `R$ ${totalPago.toLocaleString('pt-BR', {minimumFractionDigits:2})}`, icon: ArrowUpRight, color: "text-emerald-400" },
          { label: "A Receber", val: `R$ ${pendente.toLocaleString('pt-BR', {minimumFractionDigits:2})}`, icon: ArrowDownRight, color: "text-orange-400" }
        ].map((k, i) => (
          <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/[0.02] rounded-full group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start mb-6 relative">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color} opacity-50`} />
            </div>
            <p className={`text-3xl font-bold tracking-tight relative ${k.color}`}>{k.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="font-semibold text-white">Transações e Faturas</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar fatura..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={4} />
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center border-t border-white/[0.06] border-dashed">
            <DollarSign className="w-8 h-8 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">Nenhuma movimentação financeira.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                {["Descrição / Projeto", "Valor", "Status", "Data", "Ações"].map(h => (
                  <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map(i => {
                const pago = i.status === "paid" || i.status === "Pago";
                return (
                  <tr key={i.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">{i.description}</p>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5">{i.project?.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      R$ {i.amount?.toLocaleString('pt-BR', {minimumFractionDigits:2})}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider ${
                        pago ? "bg-emerald-400/10 text-emerald-400" : "bg-orange-400/10 text-orange-400"
                      }`}>
                        {pago ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                        {pago ? "Pago" : "Pendente"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40">{new Date(i.createdAt).toLocaleDateString("pt-BR")}</td>
                    <td className="px-6 py-4">
                      <button className="text-white/30 hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs font-mono">
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
              className="bg-[#0B0B0B] border border-white/[0.08] rounded-2xl p-8 w-full max-w-md relative">
              <button onClick={() => setModal(false)} className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white mb-2">Nova Fatura</h2>
              <p className="text-sm text-white/40 mb-6">Emissão avulsa de cobrança.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Projeto Vinculado</label>
                  <select className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20">
                    <option value="">Selecione...</option>
                    {data.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Descrição</label>
                  <input type="text" placeholder="Ex: Manutenção Mensal" className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Valor (R$)</label>
                  <input type="number" placeholder="0.00" className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20" />
                </div>
                <button type="button" onClick={() => { setModal(false); showToast("Gerando Fatura (simulado)..."); }}
                  className="w-full bg-white text-black font-semibold py-3.5 rounded-xl text-sm hover:bg-white/90 transition-colors mt-2">
                  Gerar Cobrança
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
