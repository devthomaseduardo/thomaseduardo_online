import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Search, Activity, FileSignature, CheckCircle, Clock } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';
import { useToast } from '@/contexts/ToastContext';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_COLOR: Record<string, string> = {
  rascunho: "text-white/30 bg-white/5 border-white/10",
  enviado: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  assinado: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  cancelado: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const EMPTY = { titulo: "", status: "rascunho", versao: "1.0", fileUrl: "", projectId: "", visivelCliente: false };

export function ContractsModule() {
  const { showToast } = useToast();
  const { contracts, projects, loading, mutate } = useAdminData();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API}/projects/${form.projectId}/contracts/${form.id}` : `${API}/projects/${form.projectId}/contracts`;
      const method = isEdit ? "PUT" : "POST";
      
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(form) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar contrato.");
      }

      setModal(null); mutate('contracts'); showToast(isEdit ? "Contrato atualizado." : "Contrato criado.");
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir contrato?")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/contracts/${id}`, { method: "DELETE", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao excluir contrato.");
      }

      mutate('contracts'); showToast("Contrato removido.");
      setModal(null);
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const filtered = contracts.filter((c: any) => c.titulo?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Contratos</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Documentação legal</p>
        </div>
        <button onClick={() => { setForm({ ...EMPTY, projectId: projects[0]?.id || "" }); setModal("create"); }}
          className="cursor-pointer bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/5">
          <Plus className="w-4 h-4" /> Novo Contrato
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total de Contratos", val: contracts.length, icon: FileSignature, color: "text-white" },
          { label: "Aguardando Assinatura", val: contracts.filter((c: any) => c.status === 'enviado').length, icon: Clock, color: "text-amber-400" },
          { label: "Assinados", val: contracts.filter((c: any) => c.status === 'assinado').length, icon: CheckCircle, color: "text-emerald-400" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <FileSignature className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhum contrato encontrado.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Título", "Projeto", "Status", "Visibilidade", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((c: any) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white/90">{c.titulo}</p>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5">v{c.versao}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/50">{projects.find((p: any) => p.id === c.projectId)?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${STATUS_COLOR[c.status] ?? STATUS_COLOR.rascunho}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/50">{c.visivelCliente ? "Visível" : "Interno"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setForm({ ...c }); setModal("edit"); }} className="cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">Editar</button>
                        <button onClick={() => remove(c.id)} className="cursor-pointer px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors" disabled={saving}>Remover</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={modal !== null} onClose={() => setModal(null)} title={modal === "create" ? "Novo Contrato" : "Editar Contrato"} description="Gestão de documentos legais." maxWidth="md"
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
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Título do Contrato</label>
              <input type="text" value={form.titulo ?? ""} onChange={e => setForm((f: any) => ({ ...f, titulo: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Status</label>
                <select value={form.status ?? "rascunho"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                  <option value="rascunho">Rascunho</option>
                  <option value="enviado">Enviado</option>
                  <option value="assinado">Assinado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Versão</label>
                <input type="text" value={form.versao ?? "1.0"} onChange={e => setForm((f: any) => ({ ...f, versao: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Projeto Referente</label>
              <select value={form.projectId ?? ""} onChange={e => setForm((f: any) => ({ ...f, projectId: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                <option value="" disabled>Selecione um projeto</option>
                {projects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer mt-2">
              <input type="checkbox" checked={form.visivelCliente} onChange={e => setForm((f: any) => ({ ...f, visivelCliente: e.target.checked }))} className="rounded border-white/20 bg-transparent text-emerald-500 focus:ring-emerald-500" />
              Visível no portal do cliente
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
