import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Search, Activity, Briefcase, Globe, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';
import { useToast } from '@/contexts/ToastContext';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_COLOR: Record<string, string> = {
  briefing: "text-[#009EE3] bg-[#009EE3]/10",
  design: "text-purple-400 bg-purple-400/10",
  development: "text-amber-400 bg-amber-400/10",
  completed: "text-emerald-400 bg-emerald-400/10",
  paused: "text-white/30 bg-white/5",
};

const EMPTY = { 
  name: "", clientId: "", phase: "Briefing", financial: "pending", 
  value: 0, status: "briefing", progresso: 0, tipo: "website", 
  descricao: "", proximaAcao: "", seo: false, analytics: false, support: false, ads: false 
};

export function ProjectsModule() {
  const { projects, clients, loading, mutate } = useAdminData();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  const openCreate = () => { setForm({ ...EMPTY, clientId: clients[0]?.id || "" }); setModal("create"); };
  const openEdit = (p: any) => { setForm({ ...p }); setModal("edit"); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API}/projects/${form.id}` : `${API}/projects`;
      const method = isEdit ? "PUT" : "POST";
      const body = { ...form, value: Number(form.value), progresso: Number(form.progresso) };
      
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(body) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar projeto.");
      }
      
      setModal(null); 
      mutate('projects'); 
      showToast(isEdit ? "Projeto atualizado." : "Projeto criado.");
    } catch (e: any) { 
      showToast(e.message, 'error'); 
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir projeto? Esta ação é irreversível e apagará tarefas e documentos associados.")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/projects/${id}`, { method: "DELETE", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao excluir projeto.");
      }

      mutate('projects'); 
      showToast("Projeto removido.");
      setModal(null);
    } catch (e: any) {
      showToast(e.message, 'error');
    }
    setSaving(false);
  };

  const filtered = projects.filter((p: any) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = projects.filter((p: any) => p.status !== 'completed' && p.status !== 'paused').length;

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Pipeline de Projetos</h1>
          <p className="text-zinc-500 text-sm font-medium">Coordene as fases de entrega e execução técnica.</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-extrabold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 stroke-[3]" /> Iniciar Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Mandatos Ativos", val: projects.length, icon: Briefcase, color: "text-white", glow: "white" },
          { label: "Em Desenvolvimento", val: activeCount, icon: Activity, color: "text-emerald-400", glow: "emerald" },
          { label: "Publicados & Live", val: projects.length - activeCount, icon: ShieldCheck, color: "text-blue-400", glow: "blue" },
        ].map((k, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:shadow-2xl">
            <div>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">{k.label}</p>
              <p className={`text-3xl font-extrabold tracking-tight ${k.color}`}>{k.val}</p>
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
              placeholder="Buscar pelo nome do projeto..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <Briefcase className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">Nenhum projeto encontrado no buffer atual.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Entidade Técnica", "Fase de Execução", "Status Operacional", "Cliente Associado", "Operações"].map(h => (
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
                          <Globe className="w-4 h-4 text-white/60" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">{p.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-tighter">{p.tipo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-2 w-full max-w-[180px]">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                          <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{p.phase}</span>
                          <span className="text-white font-mono">{p.progresso}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                          <div className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.4)]" style={{ width: `${p.progresso}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/5 shadow-sm ${STATUS_COLOR[p.status] ?? STATUS_COLOR.briefing}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">{clients.find((c: any) => c.id === p.clientId)?.name || 'Unassigned'}</span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
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
        title={modal === "create" ? "Inicializar Ativo Técnico" : "Configuração da Entidade"}
        description="Defina os parâmetros operacionais principais para este projeto."
        maxWidth="xl"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition-all">ENCERRAR PROJETO</button>
            ) : <div/>}
            <div className="flex gap-4">
              <button onClick={() => setModal(null)} className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                Descartar
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50">
                {saving ? "Sincronizando..." : modal === "create" ? "Implantar Pipeline" : "Confirmar Alterações"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Identificador da Solução</label>
              <input type="text" value={form.name ?? ""} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: Neural Engine V1" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Valor do Projeto (BRL)</label>
              <input type="number" value={form.value ?? 0} onChange={e => setForm((f: any) => ({ ...f, value: Number(e.target.value) }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-1 space-y-2">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Conta Associada</label>
            <select value={form.clientId ?? ""} onChange={e => setForm((f: any) => ({ ...f, clientId: e.target.value }))}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
              <option value="" disabled>Selecione a entidade do cliente...</option>
              {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Status Operacional</label>
              <select value={form.status ?? "briefing"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                <option value="briefing">Briefing</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="completed">Completed</option>
                <option value="paused">Suspended</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Marco Ativo</label>
              <input type="text" value={form.phase ?? ""} onChange={e => setForm((f: any) => ({ ...f, phase: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: Teste Alpha" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Conclusão (%)</label>
              <input type="number" min="0" max="100" value={form.progresso ?? 0} onChange={e => setForm((f: any) => ({ ...f, progresso: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" />
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Módulos de Serviço Ativos</label>
            <div className="flex flex-wrap gap-6">
              {['seo', 'analytics', 'support', 'ads'].map((mod) => (
                <label key={mod} className="flex items-center gap-3 text-xs font-bold text-zinc-400 cursor-pointer group/mod">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" checked={form[mod]} onChange={e => setForm((f: any) => ({ ...f, [mod]: e.target.checked }))} className="peer appearance-none w-5 h-5 border border-white/10 rounded-md bg-white/5 checked:bg-white checked:border-white transition-all cursor-pointer" />
                    <CheckCircle2 className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="group-hover/mod:text-white transition-colors">{mod.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
