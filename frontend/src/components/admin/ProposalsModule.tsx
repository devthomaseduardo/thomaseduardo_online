import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Search, Activity, FileText, Send, CheckCircle } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';
import { useToast } from '@/contexts/ToastContext';

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
  const { showToast } = useToast();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

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
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar proposta.");
      }
      
      setModal(null); mutate('proposals'); showToast(isEdit ? "Proposta atualizada." : "Proposta criada.");
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir proposta? Esta ação é irreversível.")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/proposals/${id}`, { method: "DELETE", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao excluir proposta.");
      }

      mutate('proposals'); showToast("Proposta removida.");
      setModal(null);
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const convertToProject = async (id: string) => {
    if (!confirm("Converter esta proposta em um novo projeto? Isso mudará o status da proposta para Aprovada.")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/proposals/${id}/convert`, { method: "POST", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao converter proposta.");
      }

      mutate(); // Reload all data to refresh projects and proposals
      showToast("Proposta convertida em projeto!");
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const filtered = proposals.filter((p: any) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const approvedCount = proposals.filter((p: any) => p.status === 'approved').length;
  const sentCount = proposals.filter((p: any) => p.status === 'sent').length;

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Propostas</h1>
          <p className="text-zinc-500 text-sm font-medium">Redija e envie compromissos comerciais.</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-extrabold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 stroke-[3]" /> Gerar Nova Proposta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Transmissões Totais", val: proposals.length, icon: FileText, color: "text-white", glow: "white" },
          { label: "Aguardando Aprovação", val: sentCount, icon: Send, color: "text-blue-400", glow: "blue" },
          { label: "Conversões de Sucesso", val: approvedCount, icon: CheckCircle, color: "text-emerald-400", glow: "emerald" },
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
              placeholder="Buscar por título da proposta..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <FileText className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">Nenhuma proposta encontrada no cofre atual.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Título do Compromisso", "Valor da Proposta", "Cliente Associado", "Status do Ciclo", "Operações"].map(h => (
                    <th key={h} className="px-6 py-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((p: any) => (
                  <tr key={p.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText className="w-4 h-4 text-white/60" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">{p.title}</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-tighter">Iteração v{p.version}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="font-bold text-white tracking-tight">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">{clients.find((c: any) => c.id === p.clientId)?.name || 'Unassigned'}</span>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/5 shadow-sm ${STATUS_COLOR[p.status] ?? STATUS_COLOR.draft}`}>
                        {p.status === 'draft' ? 'Rascunho' : p.status === 'sent' ? 'Enviada' : p.status === 'approved' ? 'Aprovada' : 'Recusada'}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {(p.status === 'draft' || p.status === 'sent') && (
                          <button onClick={() => convertToProject(p.id)} className="cursor-pointer px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-all">
                            Executar
                          </button>
                        )}
                        <button onClick={() => openEdit(p)} className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all">
                          Editar
                        </button>
                        <button onClick={() => remove(p.id)} className="cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all" disabled={saving}>
                          Excluir
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
        title={modal === "create" ? "Inicializar Compromisso" : "Configuração de Rascunho"}
        description="Configure valores comerciais e parâmetros de compromisso."
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition-all">ENCERRAR RASCUNHO</button>
            ) : <div/>}
            <div className="flex gap-4">
              <button onClick={() => setModal(null)} className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                Descartar
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50">
                {saving ? "Sincronizando..." : modal === "create" ? "Emitir Proposta" : "Confirmar Alterações"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Título do Compromisso</label>
              <input type="text" value={form.title ?? ""} onChange={e => setForm((f: any) => ({ ...f, title: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: Implementação de IA Estratégica" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Valor Proposto (BRL)</label>
                <input type="number" step="0.01" value={form.amount ?? 0} onChange={e => setForm((f: any) => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status do Ciclo</label>
                <select value={form.status ?? "draft"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                  <option value="draft">Rascunho Inicial</option>
                  <option value="sent">Enviada</option>
                  <option value="approved">Aprovada</option>
                  <option value="rejected">Recusada</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Conta de Destino</label>
              <select value={form.clientId ?? ""} onChange={e => setForm((f: any) => ({ ...f, clientId: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                <option value="" disabled>Selecione a entidade parceira...</option>
                {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">URI de Aprovação (Opcional)</label>
              <input type="text" value={form.approvalLink ?? ""} onChange={e => setForm((f: any) => ({ ...f, approvalLink: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" placeholder="https://..." />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
