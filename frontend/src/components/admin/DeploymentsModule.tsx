import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, Activity, Server, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';
import { useToast } from '@/contexts/ToastContext';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_COLOR: Record<string, string> = {
  pending: "text-white/30 bg-white/5 border-white/10",
  building: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  success: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  failed: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const EMPTY = { ambiente: "production", url: "", provider: "Vercel", status: "success", branch: "main", commitHash: "", projectId: "" };

export function DeploymentsModule() {
  const { deploys, projects, loading, mutate } = useAdminData();
  const { showToast } = useToast();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API}/projects/${form.projectId}/deploys/${form.id}` : `${API}/projects/${form.projectId}/deploys`;
      const method = isEdit ? "PUT" : "POST";
      
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(form) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar deploy.");
      }

      setModal(null); mutate('deploys'); showToast(isEdit ? "Deploy atualizado." : "Deploy registrado.");
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir registro de deploy?")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/deploys/${id}`, { method: "DELETE", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao excluir deploy.");
      }

      mutate('deploys'); showToast("Registro removido.");
      setModal(null);
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const filtered = deploys.filter((d: any) => d.url?.toLowerCase().includes(search.toLowerCase()) || d.provider?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Deploys</h1>
          <p className="text-zinc-500 text-sm font-medium">Gerencie a orquestração técnica e ambientes ativos.</p>
        </div>
        <button onClick={() => { setForm({ ...EMPTY, projectId: projects[0]?.id || "" }); setModal("create"); }}
          className="cursor-pointer bg-white text-black font-extrabold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 stroke-[3]" /> Registrar Novo Deploy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total de Artefatos", val: deploys.length, icon: Server, color: "text-white", glow: "white" },
          { label: "Builds Ativos", val: deploys.filter((d: any) => d.status === 'building').length, icon: Clock, color: "text-blue-400", glow: "blue" },
          { label: "Falhas Críticas", val: deploys.filter((d: any) => d.status === 'failed').length, icon: AlertTriangle, color: "text-rose-400", glow: "rose" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filtrar por URL ou provedor..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <Server className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">Nenhum artefato de deploy indexado.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Ambiente / URL", "Entidade", "Provedor / Fonte", "Status", "Operações"].map(h => (
                    <th key={h} className="px-6 py-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((d: any) => (
                  <tr key={d.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                    <td className="px-6 py-6">
                      <p className="text-white font-extrabold uppercase text-[10px] tracking-widest mb-1">{d.ambiente}</p>
                      {d.url && <a href={d.url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 hover:underline font-mono transition-colors">{d.url}</a>}
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{projects.find((p: any) => p.id === d.projectId)?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-6">
                      <p className="font-bold text-zinc-300 group-hover:text-white transition-colors">{d.provider}</p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5 tracking-tighter">{d.branch} {d.commitHash ? `(${d.commitHash.slice(0,7)})` : ""}</p>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/5 shadow-sm ${STATUS_COLOR[d.status] ?? STATUS_COLOR.pending}`}>
                        {d.status === 'success' ? 'Sucesso' : d.status === 'failed' ? 'Falhou' : d.status === 'building' ? 'Construindo' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => { setForm({ ...d }); setModal("edit"); }} className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all">Editar</button>
                        <button onClick={() => remove(d.id)} className="cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all" disabled={saving}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={modal !== null} onClose={() => setModal(null)} title={modal === "create" ? "Inicializar Deploy" : "Configuração de Deploy"} description="Configure a orquestração técnica e parâmetros de ambiente." maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5">
            {modal === "edit" ? <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition-all">ENCERRAR ARTEFATO</button> : <div/>}
            <div className="flex gap-4">
              <button onClick={() => setModal(null)} className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">Descartar</button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50">{saving ? "Sincronizando..." : "Confirmar Deploy"}</button>
            </div>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Tipo de Ambiente</label>
                <select value={form.ambiente ?? "production"} onChange={e => setForm((f: any) => ({ ...f, ambiente: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                  <option value="production">Produção</option>
                  <option value="staging">Staging</option>
                  <option value="preview">Preview</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status do Deploy</label>
                <select value={form.status ?? "success"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                  <option value="pending">Pendente</option>
                  <option value="building">Construindo</option>
                  <option value="success">Sucesso</option>
                  <option value="failed">Falhou</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">URL de Produção</label>
              <input type="url" value={form.url ?? ""} onChange={e => setForm((f: any) => ({ ...f, url: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" placeholder="https://" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Provedor de Nuvem</label>
                <input type="text" value={form.provider ?? ""} onChange={e => setForm((f: any) => ({ ...f, provider: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Vercel, AWS..." />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Branch Ativa</label>
                <input type="text" value={form.branch ?? ""} onChange={e => setForm((f: any) => ({ ...f, branch: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Entidade Técnica Associada</label>
              <select value={form.projectId ?? ""} onChange={e => setForm((f: any) => ({ ...f, projectId: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                <option value="" disabled>Selecione a entidade do projeto...</option>
                {projects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
