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
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-24 right-8 z-[9999] bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold shadow-[0_8px_30px_rgba(255,255,255,0.15)] flex items-center gap-3 border border-white/20">
            <Activity className="w-4 h-4 animate-pulse" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Financial Treasury</h1>
          <p className="text-zinc-500 text-sm font-medium">Monitor revenue flows and project invoicing.</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-extrabold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 stroke-[3]" /> Issue New Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Confirmed Revenue", val: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue), icon: ArrowUpRight, color: "text-emerald-400", glow: "emerald" },
          { label: "Accounts Receivable", val: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pendingRevenue), icon: ArrowDownRight, color: "text-amber-400", glow: "amber" },
          { label: "Total Ledger Entries", val: invoices.length, icon: DollarSign, color: "text-white", glow: "white" },
        ].map((k, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:shadow-2xl">
            <div>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">{k.label}</p>
              <p className={`text-2xl font-extrabold tracking-tight ${k.color}`}>{k.val}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center relative">
              <k.icon className={`w-5 h-5 ${k.color} relative z-10`} />
              <div className={`absolute inset-0 bg-${k.glow}-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/[0.01]">
          <div className="flex-1 relative max-w-sm w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by description or project..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <CreditCard className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">No ledger entries found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Asset / Description", "Net Amount", "Technical Entity", "Settlement Status", "Operations"].map(h => (
                    <th key={h} className="px-6 py-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((inv: any) => (
                  <tr key={inv.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <DollarSign className="w-4 h-4 text-white/60" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">{inv.description}</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-tighter">{inv.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="font-bold text-white tracking-tight">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">{projects.find((p: any) => p.id === inv.projectId)?.name || 'Unassigned'}</span>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/5 shadow-sm ${STATUS_COLOR[inv.status] ?? STATUS_COLOR.pending}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {inv.status !== 'paid' && (
                          <button onClick={() => registerPayment(inv)} className="cursor-pointer px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-all">
                            Settle
                          </button>
                        )}
                        <button onClick={() => openEdit(inv)} className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all">
                          Edit
                        </button>
                        <button onClick={() => remove(inv.id)} className="cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all" disabled={saving}>
                          Wipe
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
        title={modal === "create" ? "Initialize Invoice" : "Ledger Configuration"}
        description="Configure project billings and financial settlements."
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition-all">TERMINATE ENTRY</button>
            ) : <div/>}
            <div className="flex gap-4">
              <button onClick={() => setModal(null)} className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                Discard
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50">
                {saving ? "Synchronizing..." : modal === "create" ? "Issue Asset" : "Commit Changes"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Transaction Description</label>
              <input type="text" value={form.description ?? ""} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: Phase 1 - Neural Engine Architecture" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Asset Value (BRL)</label>
                <input type="number" step="0.01" value={form.amount ?? 0} onChange={e => setForm((f: any) => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Settlement Status</label>
                <select value={form.status ?? "pending"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                  <option value="pending">Pending</option>
                  <option value="paid">Settled</option>
                  <option value="partial">Partial</option>
                  <option value="overdue">Overdue</option>
                  <option value="canceled">Voided</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Technical Entity Referent</label>
              <select value={form.projectId ?? ""} onChange={e => setForm((f: any) => ({ ...f, projectId: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                <option value="" disabled>Select project entity...</option>
                {projects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Maturity Date (Deadline)</label>
              <input type="date" value={form.vencimento ? new Date(form.vencimento).toISOString().split('T')[0] : ""} onChange={e => setForm((f: any) => ({ ...f, vencimento: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
