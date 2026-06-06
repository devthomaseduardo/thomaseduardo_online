import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Search, Activity, Mail, CheckCircle } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';
import { useToast } from '@/contexts/ToastContext';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

export function MessagesModule() {
  const { messages, clients, projects, loading, mutate } = useAdminData();
  const { showToast } = useToast();
  const [modal, setModal] = useState<"view" | null>(null);
  const [form, setForm] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const markRead = async (id: string, current: boolean) => {
    try {
      setSaving(true);
      const r = await fetch(`${API}/messages/${id}`, { method: "PUT", headers: hdrs(), body: JSON.stringify({ read: !current }) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }
      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao atualizar mensagem.");
      }

      mutate('messages');
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir mensagem?")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/messages/${id}`, { method: "DELETE", headers: hdrs() });
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }
      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao apagar mensagem.");
      }
      mutate('messages'); setModal(null); showToast("Mensagem removida.");
    } catch (e: any) { showToast(e.message, 'error'); }
    setSaving(false);
  };

  const filtered = messages.filter((m: any) => m.content?.toLowerCase().includes(search.toLowerCase()) || m.senderName?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Feed de Inteligência</h1>
          <p className="text-zinc-500 text-sm font-medium">Monitore comunicações do ecossistema e sinais de suporte.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Transmissões Totais", val: messages.length, icon: MessageSquare, color: "text-white", glow: "white" },
          { label: "Sinais Não Lidos", val: messages.filter((m: any) => !m.read).length, icon: Mail, color: "text-amber-400", glow: "amber" },
          { label: "Processados", val: messages.filter((m: any) => m.read).length, icon: CheckCircle, color: "text-emerald-400", glow: "emerald" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar no buffer de comunicação..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <MessageSquare className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">Nenhum sinal encontrado no buffer de inteligência.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Originador", "Referência de Entidade", "Conteúdo do Sinal", "Status", "Operações"].map(h => (
                    <th key={h} className="px-6 py-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((m: any) => (
                  <tr key={m.id} className={`group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer ${!m.read ? 'bg-white/[0.01]' : ''}`}>
                    <td className="px-6 py-6">
                      <p className={`font-bold transition-colors ${!m.read ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{m.senderName}</p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-tighter">{m.senderType}</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        {m.projectId && <p className="text-[11px] font-bold text-blue-400/70 group-hover:text-blue-400 transition-colors">PROJ: {projects.find((p:any)=>p.id===m.projectId)?.name || '?'}</p>}
                        {m.clientId && <p className="text-[11px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">CLI: {clients.find((c:any)=>c.id===m.clientId)?.name || '?'}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-6 max-w-xs">
                      <p className={`text-sm transition-colors ${!m.read ? 'text-zinc-200 font-medium' : 'text-zinc-500 group-hover:text-zinc-400'} truncate`}>{m.content}</p>
                    </td>
                    <td className="px-6 py-6">
                      <button disabled={saving} onClick={() => markRead(m.id, m.read)} className={`cursor-pointer text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border transition-all ${m.read ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]'}`}>
                        {m.read ? "Processado" : "Pendente"}
                      </button>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => { setForm({ ...m }); setModal("view"); if(!m.read) markRead(m.id, false); }} className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all">Interceptar</button>
                        <button onClick={() => remove(m.id)} className="cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all" disabled={saving}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={modal === "view"} onClose={() => setModal(null)} title="Sinal Interceptado" description={`Origem: ${form?.senderName}`} maxWidth="md"
        footer={
          <div className="flex items-center justify-end w-full pt-6 border-t border-white/5">
            <button onClick={() => setModal(null)} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95">Descartar</button>
          </div>
        }
      >
        {form && (
          <div className="space-y-8 py-4">
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 shadow-inner relative overflow-hidden group/msg">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />
              <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed relative z-10 italic">"{form.content}"</p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Marcador Temporal</p>
                <p className="text-xs text-white font-mono">{new Date(form.createdAt).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Fonte da Entidade</p>
                <p className="text-xs text-white font-mono truncate">
                  {form.projectId ? `PROJ: ${projects.find((p:any)=>p.id===form.projectId)?.name || form.projectId}` : 
                   form.clientId ? `CLI: ${clients.find((c:any)=>c.id===form.clientId)?.name || form.clientId}` : 
                   'Transmissão Direta'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
