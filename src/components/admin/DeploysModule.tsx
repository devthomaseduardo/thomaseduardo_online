import React, { useState } from "react";
import { Rocket, Server, Activity, ExternalLink, ShieldCheck, Plus, Search, GitBranch, Terminal, RefreshCw, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { DeployTerminalLoader, TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";

const API = "/api/v2";
const hdrs = () => ({ "Content-Type": "application/json", "x-admin-key": localStorage.getItem("adminAuth") ?? "" });

export function DeploysModule() {
  const { projects: data, loading, mutate: load } = useAdminData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ projectId: "", environment: "production", url: "" });

  const allDeploys = data.flatMap(p => (p.deploys ?? []).map((d: any) => ({ ...d, project: p })))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  let filtered = allDeploys.filter(d => {
    if (filter === 'prod') return d.environment?.toLowerCase() === 'production' || d.environment?.toLowerCase() === 'produção';
    if (filter === 'staging') return d.environment?.toLowerCase() === 'staging' || d.environment?.toLowerCase() === 'homologação';
    return true;
  });

  if (search) {
    filtered = filtered.filter(d => 
      d.project?.name?.toLowerCase().includes(search.toLowerCase()) || 
      d.environment?.toLowerCase().includes(search.toLowerCase())
    );
  }

  const handleCreate = async () => {
    if (!form.projectId) return;
    try {
      await fetch(`${API}/projects/${form.projectId}/deploys`, {
        method: "POST", headers: hdrs(), body: JSON.stringify({ ...form, status: "Building..." })
      });
      setModalOpen(false);
      setForm({ projectId: "", environment: "production", url: "" });
      load();
    } catch {}
  };

  const latestDeploy = allDeploys[0];

  return (
    <div className="w-full py-10 px-6 md:px-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">DevOps & Deploy</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Controle de Ambientes e Builds</p>
        </div>
        <button onClick={() => setModalOpen(true)}
          className="bg-[#009EE3] text-white text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-[#009EE3]/90 transition-colors shrink-0">
          <Rocket className="w-4 h-4" /> Trigger Deploy
        </button>
      </div>

      {/* KPIs Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Uptime Global", val: "99.9%", icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Total Builds", val: allDeploys.length, icon: Activity, color: "text-[#009EE3]" },
          { label: "Ambientes Ativos", val: new Set(allDeploys.map(d => d.environment)).size, icon: Server, color: "text-white" },
        ].map((k, i) => (
          <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between group hover:border-white/[0.15] transition-colors">
            <div>
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">{k.label}</p>
              <p className={`text-2xl font-bold tracking-tight ${k.color}`}>{k.val}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <k.icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tabela de Deploys (Col-span-2) */}
        <div className="lg:col-span-2 bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.01]">
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {[
                { id: 'all', label: 'Todos os Builds' },
                { id: 'prod', label: 'Production' },
                { id: 'staging', label: 'Staging' },
              ].map(t => (
                <button key={t.id} onClick={() => setFilter(t.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono tracking-widest uppercase transition-colors shrink-0 ${
                    filter === t.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar projeto..."
                className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
            </div>
          </div>

          {/* List */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6">
                <DeployTerminalLoader />
                <div className="mt-6"><TableSkeleton rows={3} /></div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-24 text-center">
                <Rocket className="w-8 h-8 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">Nenhum deploy encontrado.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-[#050505]">
                    {["Projeto", "Ambiente", "Status", "Timestamp", ""].map(h => (
                      <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map(d => {
                    const isProd = d.environment?.toLowerCase() === 'production' || d.environment?.toLowerCase() === 'produção';
                    const isBuilding = d.status?.toLowerCase().includes('build') || d.status?.toLowerCase().includes('progresso');
                    return (
                      <tr key={d.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors flex items-center gap-2">
                            <GitBranch className="w-3.5 h-3.5 text-white/20" /> {d.project?.name}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${isProd ? 'border-purple-500/20 text-purple-400 bg-purple-500/10' : 'border-[#009EE3]/20 text-[#009EE3] bg-[#009EE3]/10'}`}>
                            {d.environment || "Staging"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-md flex items-center w-fit gap-2 border ${
                            isBuilding ? 'border-amber-400/20 text-amber-400 bg-amber-400/10' : 
                            'border-emerald-400/20 text-emerald-400 bg-emerald-400/10'
                          }`}>
                            {isBuilding ? <RefreshCw className="w-3 h-3 animate-spin" /> : <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                            {d.status || "Ready"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-mono text-white/40 flex items-center gap-1.5 mt-1">
                          <Clock className="w-3 h-3" /> {new Date(d.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {d.url && (
                            <a href={d.url} target="_blank" rel="noreferrer" className="inline-flex text-white/30 hover:text-white transition-colors p-1.5 bg-white/5 rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Live Terminal (Col-span-1) */}
        <div className="space-y-6">
          <div className="bg-[#050505] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col min-h-[400px]">
            <div className="p-3 bg-[#0B0B0B] border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white/40" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Build Logs</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="p-4 flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed space-y-2 text-white/60 custom-scrollbar">
              {latestDeploy ? (
                <>
                  <p className="text-[#009EE3]">[{new Date(latestDeploy.createdAt).toLocaleTimeString()}] Inicializando build environment para {latestDeploy.project?.name}...</p>
                  <p>Cloning repository from master branch...</p>
                  <p>Installing dependencies (npm install)...</p>
                  <p className="text-white/30">added 342 packages, and audited 343 packages in 12s</p>
                  <p>Building production assets...</p>
                  <p className="text-white/30">✓ Compiled successfully</p>
                  <p>Deploying to {latestDeploy.environment} edge network...</p>
                  <p className="text-emerald-400">[{new Date(latestDeploy.createdAt).toLocaleTimeString()}] DEPLOY SUCCESSFUL</p>
                  <p className="text-white/30">URL: {latestDeploy.url || "https://preview.app.com"}</p>
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-emerald-400/50 animate-pulse">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Aguardando novos eventos...
                  </div>
                </>
              ) : (
                <p className="text-white/30 italic">Aguardando eventos de build...</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Modal Trigger Deploy */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Trigger Manual de Deploy" maxWidth="md"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5">Cancelar</button>
            <button onClick={handleCreate} className="px-6 py-2 bg-[#009EE3] text-white rounded-lg text-sm font-semibold hover:bg-[#009EE3]/90 flex items-center gap-2">
              <Rocket className="w-4 h-4" /> Start Build
            </button>
          </div>
        }>
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Projeto Alvo</label>
            <select value={form.projectId} onChange={e => setForm(f => ({ ...f, projectId: e.target.value }))}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer">
              <option value="">Selecionar projeto...</option>
              {data.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Ambiente (Environment)</label>
            <select value={form.environment} onChange={e => setForm(f => ({ ...f, environment: e.target.value }))}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer">
              <option value="production">Production</option>
              <option value="staging">Staging / Homologação</option>
              <option value="development">Development</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Preview URL (Opcional)</label>
            <input type="text" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="Ex: https://meu-app.vercel.app" />
          </div>
        </div>
      </Modal>

    </div>
  );
}
