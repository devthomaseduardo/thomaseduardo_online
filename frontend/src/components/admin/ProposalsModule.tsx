import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Search, Activity, FileText, Send, CheckCircle } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_COLOR: Record<string, string> = {
  draft: "text-white/30 bg-white/5 border-white/10",
  sent: "text-[#009EE3] bg-[#009EE3]/10 border-[#009EE3]/20",
  approved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  rejected: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const EMPTY = { 
  title: "", description: "", status: "draft", stage: "draft", 
  amount: 0, version: 1, clientId: ""
};

export function ProposalsModule() {
  const { proposals, clients, loading, mutate } = useAdminData();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = () => { setForm({ ...EMPTY, clientId: clients[0]?.id || "" }); setModal("create"); };
  const openEdit = (p: any) => { setForm({ ...p }); setModal("edit"); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API}/proposals/${form.id}` : `${API}/proposals`;
      const method = isEdit ? "PUT" : "POST";
      const body = { ...form, amount: Number(form.amount), version: Number(form.version) };
      
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(body) });
      if (!r.ok) throw new Error((await r.json()).error);
      
      setModal(null); mutate('proposals'); showToast(isEdit ? "Proposta atualizada." : "Proposta criada.");
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir proposta? Esta ação é irreversível.")) return;
    await fetch(`${API}/proposals/${id}`, { method: "DELETE", headers: hdrs() });
    mutate('proposals'); showToast("Proposta removida.");
  };

  const filtered = proposals.filter((p: any) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const approvedCount = proposals.filter((p: any) => p.status === 'approved').length;
  const sentCount = proposals.filter((p: any) => p.status === 'sent').length;

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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Propostas</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Aprovações e orçamentos</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/5">
          <Plus className="w-4 h-4" /> Nova Proposta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Emitidas", val: proposals.length, icon: FileText, color: "text-white" },
          { label: "Aguardando Aprovação", val: sentCount, icon: Send, color: "text-[#009EE3]" },
          { label: "Aprovadas", val: approvedCount, icon: CheckCircle, color: "text-emerald-400" },
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
              placeholder="Buscar proposta..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <FileText className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhuma proposta encontrada.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Título", "Valor", "Cliente", "Status", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((p: any) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white/50" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/90">{p.title}</p>
                          <p className="text-[10px] text-white/40 font-mono mt-0.5">v{p.version}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/50">{clients.find((c: any) => c.id === p.clientId)?.name || 'Desconhecido'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${STATUS_COLOR[p.status] ?? STATUS_COLOR.draft}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(p)} className="cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">
                          Editar
                        </button>
                        <button onClick={() => remove(p.id)} className="cursor-pointer px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors" disabled={saving}>
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
        title={modal === "create" ? "Nova Proposta" : "Editar Proposta"}
        description="Gestão de orçamentos e propostas comerciais."
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/[0.06]">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-xs text-rose-400 hover:text-rose-300 font-mono transition-colors">REMOVER PROPOSTA</button>
            ) : <div/>}
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5 transition-colors">
                Cancelar
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar Proposta"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Título da Proposta</label>
              <input type="text" value={form.title ?? ""} onChange={e => setForm((f: any) => ({ ...f, title: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Valor Proposto (R$)</label>
                <input type="number" step="0.01" value={form.amount ?? 0} onChange={e => setForm((f: any) => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Status</label>
                <select value={form.status ?? "draft"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                  <option value="draft">Rascunho</option>
                  <option value="sent">Enviada</option>
                  <option value="approved">Aprovada</option>
                  <option value="rejected">Rejeitada</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Cliente Destino</label>
              <select value={form.clientId ?? ""} onChange={e => setForm((f: any) => ({ ...f, clientId: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                <option value="" disabled>Selecione um cliente</option>
                {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Link de Aprovação (Opcional)</label>
              <input type="text" value={form.approvalLink ?? ""} onChange={e => setForm((f: any) => ({ ...f, approvalLink: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
