import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Search, Activity, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_COLOR: Record<string, string> = {
  pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  paid: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  partial: "text-[#009EE3] bg-[#009EE3]/10 border-[#009EE3]/20",
  canceled: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  overdue: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

const EMPTY = { 
  description: "", amount: 0, status: "pending", type: "service", 
  valorPago: 0, projectId: ""
};

export function FinancialModule() {
  const { invoices, projects, loading, mutate } = useAdminData();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = () => { setForm({ ...EMPTY, projectId: projects[0]?.id || "" }); setModal("create"); };
  const openEdit = (i: any) => { setForm({ ...i }); setModal("edit"); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API}/invoices/${form.id}` : `${API}/projects/${form.projectId}/invoices`;
      const method = isEdit ? "PUT" : "POST";
      const body = { 
        ...form, 
        amount: Number(form.amount), 
        valorPago: Number(form.valorPago),
        vencimento: form.vencimento ? new Date(form.vencimento).toISOString() : undefined 
      };
      
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(body) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar fatura.");
      }
      
      setModal(null); mutate('invoices'); showToast(isEdit ? "Fatura atualizada." : "Fatura criada.");
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir fatura? Esta ação é irreversível.")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/invoices/${id}`, { method: "DELETE", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao excluir fatura.");
      }

      mutate('invoices'); showToast("Fatura removida.");
      setModal(null);
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const registerPayment = async (inv: any) => {
    if (!confirm(`Confirmar recebimento integral de R$ ${inv.amount.toLocaleString('pt-BR')}?`)) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/projects/${inv.projectId}/invoices/${inv.id}/pay`, {
        method: "POST",
        headers: hdrs(),
        body: JSON.stringify({ valor: inv.amount, metodo: "Pix" })
      });

      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao registrar pagamento.");
      }

      mutate('invoices');
      showToast("Pagamento registrado com sucesso!");
    } catch (e: any) {
      showToast(e.message);
    }
    setSaving(false);
  };

  const filtered = invoices.filter((i: any) =>
    i.description?.toLowerCase().includes(search.toLowerCase()) ||
    projects.find((p: any) => p.id === i.projectId)?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = invoices.filter((i: any) => i.status === 'paid').reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
  const pendingRevenue = invoices.filter((i: any) => i.status !== 'paid' && i.status !== 'canceled').reduce((acc: number, curr: any) => acc + ((curr.amount || 0) - (curr.valorPago || 0)), 0);

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-[9999] bg-[#0B0B0B] border border-white/10 px-5 py-3 rounded-xl text-sm text-white shadow-2xl flex items-center gap-3">
            <Activity className="w-4 h-4 text-[#009EE3]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Financeiro</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Faturamento e pagamentos</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/5">
          <Plus className="w-4 h-4" /> Nova Fatura
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Receita Confirmada", val: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue), icon: ArrowUpRight, color: "text-emerald-400" },
          { label: "A Receber", val: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pendingRevenue), icon: ArrowDownRight, color: "text-amber-400" },
          { label: "Total de Faturas", val: invoices.length, icon: DollarSign, color: "text-white" },
        ].map((k, i) => (
          <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between group hover:border-white/[0.15] transition-colors">
            <div>
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">{k.label}</p>
              <p className={`text-2xl font-bold tracking-tight ${k.color}`}>{k.val}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <k.icon className="w-4 h-4 text-white/40" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/[0.06] flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/[0.01]">
          <div className="flex-1 relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar fatura..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <CreditCard className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhuma fatura encontrada.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Descrição", "Valor", "Projeto", "Status", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((inv: any) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-white/50" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/90">{inv.description}</p>
                          <p className="text-[10px] text-white/40 font-mono mt-0.5 uppercase">{inv.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/50">{projects.find((p: any) => p.id === inv.projectId)?.name || 'Desconhecido'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${STATUS_COLOR[inv.status] ?? STATUS_COLOR.pending}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {inv.status !== 'paid' && (
                          <button onClick={() => registerPayment(inv)} className="cursor-pointer px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg text-xs font-medium text-emerald-400 transition-colors">
                            Pagar
                          </button>
                        )}
                        <button onClick={() => openEdit(inv)} className="cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">
                          Editar
                        </button>
                        <button onClick={() => remove(inv.id)} className="cursor-pointer px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors" disabled={saving}>
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={modal !== null}
        onClose={() => setModal(null)}
        title={modal === "create" ? "Nova Fatura" : "Editar Fatura"}
        description="Cobranças e faturamentos de projetos."
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/[0.06]">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-xs text-rose-400 hover:text-rose-300 font-mono transition-colors">REMOVER FATURA</button>
            ) : <div/>}
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5 transition-colors">
                Cancelar
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar Fatura"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Descrição</label>
              <input type="text" value={form.description ?? ""} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Valor Total (R$)</label>
                <input type="number" step="0.01" value={form.amount ?? 0} onChange={e => setForm((f: any) => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Status</label>
                <select value={form.status ?? "pending"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                  <option value="partial">Parcial</option>
                  <option value="overdue">Em Atraso</option>
                  <option value="canceled">Cancelada</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Projeto Referente</label>
              <select value={form.projectId ?? ""} onChange={e => setForm((f: any) => ({ ...f, projectId: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                <option value="" disabled>Selecione um projeto</option>
                {projects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Data de Vencimento</label>
              <input type="date" value={form.vencimento ? new Date(form.vencimento).toISOString().split('T')[0] : ""} onChange={e => setForm((f: any) => ({ ...f, vencimento: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
