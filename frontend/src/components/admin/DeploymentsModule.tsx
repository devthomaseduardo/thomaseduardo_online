import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, Activity, Server, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

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
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

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
    } catch (e: any) { showToast(e.message); }
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
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const filtered = deploys.filter((d: any) => d.url?.toLowerCase().includes(search.toLowerCase()) || d.provider?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-8">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-[9999] bg-[#0B0B0B] border border-white/10 px-5 py-3 rounded-xl text-sm text-white shadow-2xl flex items-center gap-3">
            <Activity className="w-4 h-4 text-[#009EE3]" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Deployments</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Infraestrutura e Lançamentos</p>
        </div>
        <button onClick={() => { setForm({ ...EMPTY, projectId: projects[0]?.id || "" }); setModal("create"); }}
          className="cursor-pointer bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/5">
          <Plus className="w-4 h-4" /> Registrar Deploy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Registros", val: deploys.length, icon: Server, color: "text-white" },
          { label: "Em Progresso", val: deploys.filter((d: any) => d.status === 'building').length, icon: Clock, color: "text-blue-400" },
          { label: "Falhas", val: deploys.filter((d: any) => d.status === 'failed').length, icon: AlertTriangle, color: "text-rose-400" },
        ].map((k, i) => (
          <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between group">
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por URL ou provedor..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Server className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhum deploy registrado.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Ambiente / URL", "Projeto", "Provedor / Branch", "Status", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((d: any) => (
                  <tr key={d.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white/90 uppercase text-[10px] tracking-wider mb-1">{d.ambiente}</p>
                      {d.url && <a href={d.url} target="_blank" rel="noreferrer" className="text-xs text-[#009EE3] hover:underline font-mono">{d.url}</a>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/50">{projects.find((p: any) => p.id === d.projectId)?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-white/70">{d.provider}</p>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5">{d.branch} {d.commitHash ? `(${d.commitHash.slice(0,7)})` : ""}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${STATUS_COLOR[d.status] ?? STATUS_COLOR.pending}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setForm({ ...d }); setModal("edit"); }} className="cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">Editar</button>
                        <button onClick={() => remove(d.id)} className="cursor-pointer px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors" disabled={saving}>Remover</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={modal !== null} onClose={() => setModal(null)} title={modal === "create" ? "Registrar Deploy" : "Editar Deploy"} description="Gestão de lançamentos." maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/[0.06]">
            {modal === "edit" ? <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-xs text-rose-400 hover:text-rose-300 font-mono transition-colors">REMOVER</button> : <div/>}
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5 transition-colors">Cancelar</button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50">{saving ? "Salvando..." : "Salvar"}</button>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Ambiente</label>
                <select value={form.ambiente ?? "production"} onChange={e => setForm((f: any) => ({ ...f, ambiente: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="preview">Preview</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Status</label>
                <select value={form.status ?? "success"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                  <option value="pending">Pending</option>
                  <option value="building">Building</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">URL</label>
              <input type="url" value={form.url ?? ""} onChange={e => setForm((f: any) => ({ ...f, url: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" placeholder="https://" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Provedor</label>
                <input type="text" value={form.provider ?? ""} onChange={e => setForm((f: any) => ({ ...f, provider: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="Vercel, AWS..." />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Branch</label>
                <input type="text" value={form.branch ?? ""} onChange={e => setForm((f: any) => ({ ...f, branch: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Projeto Referente</label>
              <select value={form.projectId ?? ""} onChange={e => setForm((f: any) => ({ ...f, projectId: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                <option value="" disabled>Selecione um projeto</option>
                {projects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
