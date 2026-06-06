import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Search, Activity, Mail, CheckCircle } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

export function MessagesModule() {
  const { messages, clients, projects, loading, mutate } = useAdminData();
  const [modal, setModal] = useState<"view" | null>(null);
  const [form, setForm] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

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
    } catch (e: any) { showToast(e.message); }
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
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const filtered = messages.filter((m: any) => m.content?.toLowerCase().includes(search.toLowerCase()) || m.senderName?.toLowerCase().includes(search.toLowerCase()));

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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Mensagens</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Comunicações do Portal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total", val: messages.length, icon: MessageSquare, color: "text-white" },
          { label: "Não Lidas", val: messages.filter((m: any) => !m.read).length, icon: Mail, color: "text-amber-400" },
          { label: "Lidas", val: messages.filter((m: any) => m.read).length, icon: CheckCircle, color: "text-emerald-400" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar mensagens..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <MessageSquare className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhuma mensagem encontrada.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Remetente", "Referência", "Mensagem", "Status", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((m: any) => (
                  <tr key={m.id} className={`hover:bg-white/[0.02] transition-colors group ${!m.read ? 'bg-white/[0.02]' : ''}`}>
                    <td className="px-6 py-4">
                      <p className={`text-sm ${!m.read ? 'font-semibold text-white' : 'font-medium text-white/90'}`}>{m.senderName}</p>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5 uppercase">{m.senderType}</p>
                    </td>
                    <td className="px-6 py-4">
                      {m.projectId && <p className="text-xs text-white/50 mb-0.5">Proj: {projects.find((p:any)=>p.id===m.projectId)?.name || '?'}</p>}
                      {m.clientId && <p className="text-xs text-white/50">Cli: {clients.find((c:any)=>c.id===m.clientId)?.name || '?'}</p>}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-white/70 truncate">{m.content}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button disabled={saving} onClick={() => markRead(m.id, m.read)} className={`cursor-pointer text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${m.read ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>
                        {m.read ? "Lida" : "Não Lida"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setForm({ ...m }); setModal("view"); if(!m.read) markRead(m.id, false); }} className="cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">Ler</button>
                        <button onClick={() => remove(m.id)} className="cursor-pointer px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors" disabled={saving}>Apagar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={modal === "view"} onClose={() => setModal(null)} title="Mensagem" description={`De: ${form?.senderName}`} maxWidth="md"
        footer={
          <div className="flex items-center justify-end w-full pt-6 border-t border-white/[0.06]">
            <button onClick={() => setModal(null)} className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors">Fechar</button>
          </div>
        }
      >
        {form && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">{form.content}</p>
            </div>
            <div className="text-xs text-white/40 font-mono flex flex-col gap-1">
              <span>Data: {new Date(form.createdAt).toLocaleString('pt-BR')}</span>
              {form.projectId && <span>Projeto: {projects.find((p:any)=>p.id===form.projectId)?.name || form.projectId}</span>}
              {form.clientId && <span>Cliente: {clients.find((c:any)=>c.id===form.clientId)?.name || form.clientId}</span>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
