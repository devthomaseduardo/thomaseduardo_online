import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Shield, Download, Plus, Search, Eye, PenTool, CheckCircle2, AlertTriangle, FileSignature, UploadCloud, Folder } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";

const API = "/api/v2";
const hdrs = () => ({ "Content-Type": "application/json", "x-admin-key": localStorage.getItem("adminAuth") ?? "" });

export function ContratosModule() {
  const { projects: data, loading, mutate: load } = useAdminData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ projectId: "", title: "", status: "draft", url: "" });

  const allContracts = data.flatMap(p => (p.contracts ?? []).map((c: any) => ({ ...c, project: p })))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const kpis = {
    total: allContracts.length,
    assinados: allContracts.filter(c => c.status === 'assinado' || c.status === 'signed').length,
    pendentes: allContracts.filter(c => c.status === 'pendente' || c.status === 'draft').length,
  };

  let filtered = allContracts.filter(c => {
    if (filter === 'signed') return c.status === 'assinado' || c.status === 'signed';
    if (filter === 'pending') return c.status === 'pendente' || c.status === 'draft';
    return true;
  });

  if (search) {
    filtered = filtered.filter(c => 
      c.title?.toLowerCase().includes(search.toLowerCase()) || 
      c.project?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  const handleCreate = async () => {
    if (!form.projectId || !form.title) return;
    try {
      await fetch(`${API}/projects/${form.projectId}/contracts`, {
        method: "POST", headers: hdrs(), body: JSON.stringify(form)
      });
      setModalOpen(false);
      setForm({ projectId: "", title: "", status: "draft", url: "" });
      load();
    } catch {}
  };

  return (
    <div className="w-full py-10 px-6 md:px-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Cofre Jurídico</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Gestão de Contratos e Documentos</p>
        </div>
        <button onClick={() => setModalOpen(true)}
          className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Novo Contrato
        </button>
      </div>

      {/* KPIs Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Documentos Ativos", val: kpis.total, icon: FileText, color: "text-white" },
          { label: "Assinaturas Pendentes", val: kpis.pendentes, icon: AlertTriangle, color: "text-amber-400" },
          { label: "Contratos Assinados", val: kpis.assinados, icon: CheckCircle2, color: "text-emerald-400" },
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

      {/* Main Grid: 2/3 Table, 1/3 Templates Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tabela de Contratos (Col-span-2) */}
        <div className="lg:col-span-2 bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.01]">
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'pending', label: 'Pendentes' },
                { id: 'signed', label: 'Assinados' },
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
                placeholder="Buscar documento..."
                className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
            </div>
          </div>

          {/* List */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6"><TableSkeleton rows={5} /></div>
            ) : filtered.length === 0 ? (
              <div className="py-24 text-center">
                <FileSignature className="w-8 h-8 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">Nenhum contrato encontrado nesta visualização.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-[#050505]">
                    {["Documento", "Projeto & Cliente", "Status", ""].map(h => (
                      <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map(c => {
                    const isSigned = c.status === 'assinado' || c.status === 'signed';
                    return (
                      <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${isSigned ? 'bg-emerald-400/10' : 'bg-white/5'}`}>
                              <FileText className={`w-4 h-4 ${isSigned ? 'text-emerald-400' : 'text-white/40'}`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{c.title}</p>
                              <p className="text-[10px] font-mono text-white/30 mt-0.5">Gerado: {new Date(c.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-white/70">{c.project?.name}</p>
                          <p className="text-[10px] font-mono text-white/30 mt-0.5">{c.project?.client?.name ?? 'Conta'}</p>
                        </td>
                        <td className="px-6 py-4">
                          {isSigned ? (
                            <span className="text-[10px] font-mono uppercase px-2 py-1 rounded-md border border-emerald-400/20 text-emerald-400 bg-emerald-400/10">Assinado</span>
                          ) : (
                            <span className="text-[10px] font-mono uppercase px-2 py-1 rounded-md border border-amber-400/20 text-amber-400 bg-amber-400/10">Pendente</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-white/30 hover:text-white transition-colors p-1.5 bg-white/5 rounded-lg"><Eye className="w-4 h-4" /></button>
                            <button className="text-white/30 hover:text-[#009EE3] transition-colors p-1.5 bg-white/5 rounded-lg"><PenTool className="w-4 h-4" /></button>
                            <button className="text-white/30 hover:text-emerald-400 transition-colors p-1.5 bg-white/5 rounded-lg"><Download className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Drive & Templates (Col-span-1) */}
        <div className="space-y-6">
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2"><Folder className="w-4 h-4" /> Templates Base</h3>
            <div className="space-y-3">
              {[
                { name: "Prestação de Serviços DEV", ext: "DOCX" },
                { name: "SLA - Manutenção Mensal", ext: "PDF" },
                { name: "NDA Confidencialidade", ext: "DOCX" },
                { name: "Termo de Encerramento", ext: "PDF" },
              ].map((tmpl, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-white/[0.04] rounded-xl hover:border-white/10 hover:bg-white/[0.02] transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#050505] border border-white/[0.06] flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/80 group-hover:text-white">{tmpl.name}</p>
                      <p className="text-[9px] font-mono text-white/30">{tmpl.ext}</p>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-white/20 group-hover:text-white" />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 border border-white/[0.06] border-dashed rounded-xl text-xs font-mono text-white/40 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
              <UploadCloud className="w-4 h-4" /> Fazer Upload de Template
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#009EE3]/10 to-transparent border border-[#009EE3]/20 rounded-2xl p-6">
            <Shield className="w-6 h-6 text-[#009EE3] mb-3" />
            <h3 className="text-sm font-bold text-white mb-2">Conformidade Jurídica</h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">Mantenha todos os contratos atualizados e garanta que todas as faturas possuam seu respectivo lastro contratual assinado.</p>
            <button className="text-[10px] font-mono uppercase tracking-widest text-[#009EE3] hover:underline">Verificar Compliance →</button>
          </div>
        </div>

      </div>

      {/* Modal Novo Contrato */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Gerar Contrato" maxWidth="md"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5">Cancelar</button>
            <button onClick={handleCreate} className="px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90">Emitir Contrato</button>
          </div>
        }>
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Projeto Vinculado</label>
            <select value={form.projectId} onChange={e => setForm(f => ({ ...f, projectId: e.target.value }))}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer">
              <option value="">Selecionar projeto...</option>
              {data.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Título do Documento</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="Ex: Prestação de Serviços V2" />
          </div>
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Status Inicial</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer">
              <option value="draft">Rascunho (Em Análise)</option>
              <option value="pendente">Pendente de Assinatura</option>
              <option value="assinado">Assinado</option>
            </select>
          </div>
        </div>
      </Modal>

    </div>
  );
}
