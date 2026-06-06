import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Search, Activity, Target, UserPlus, Star } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_COLOR: Record<string, string> = {
  new: "text-[#009EE3] bg-[#009EE3]/10 border-[#009EE3]/20",
  qualified: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  meeting: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  proposal: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  won: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  lost: "text-white/30 bg-white/5 border-white/10",
};

const EMPTY = { 
  name: "", email: "", phone: "", source: "site", status: "new", notes: ""
};

export function LeadsModule() {
  const { leads, loading, mutate } = useAdminData();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = () => { setForm({ ...EMPTY }); setModal("create"); };
  const openEdit = (l: any) => { setForm({ ...l }); setModal("edit"); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API}/leads/${form.id}` : `${API}/leads`;
      const method = isEdit ? "PUT" : "POST";
      const body = { ...form };
      
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(body) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar lead.");
      }
      
      setModal(null); mutate('leads'); showToast(isEdit ? "Lead atualizado." : "Lead cadastrado.");
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir lead? Esta ação é irreversível.")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/leads/${id}`, { method: "DELETE", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao excluir lead.");
      }

      mutate('leads'); showToast("Lead removido.");
      setModal(null);
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const convertToClient = async (lead: any) => {
    const password = prompt("Defina uma senha de acesso inicial para o novo cliente:", "123456");
    if (!password) return; // Cancelou
    
    setSaving(true);
    try {
      const r = await fetch(`${API}/leads/${lead.id}/convert`, { 
        method: "POST", 
        headers: hdrs(),
        body: JSON.stringify({
          clientName: lead.name,
          clientEmail: lead.email || `contato_${Date.now()}@exemplo.com`,
          password
        })
      });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao converter lead.");
      }

      mutate(); // Reload everything since clients list changed too
      showToast("Lead convertido em Cliente!");
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const filtered = leads.filter((l: any) =>
    l.name?.toLowerCase().includes(search.toLowerCase()) || 
    l.email?.toLowerCase().includes(search.toLowerCase())
  );

  const wonCount = leads.filter((l: any) => l.status === 'won').length;
  const activeCount = leads.filter((l: any) => l.status !== 'won' && l.status !== 'lost').length;

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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Leads</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Pipeline comercial e contatos</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/5">
          <Plus className="w-4 h-4" /> Novo Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total de Leads", val: leads.length, icon: Target, color: "text-white" },
          { label: "Pipeline Ativo", val: activeCount, icon: UserPlus, color: "text-[#009EE3]" },
          { label: "Convertidos (Won)", val: wonCount, icon: Star, color: "text-emerald-400" },
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
              placeholder="Buscar lead..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Target className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhum lead encontrado.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Nome", "Contato", "Origem", "Fase do Funil", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((l: any) => (
                  <tr key={l.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/70">
                          {l.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/90">{l.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-white/50">{l.email}</p>
                      <p className="text-[10px] font-mono text-white/30">{l.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/50 capitalize">{l.source}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${STATUS_COLOR[l.status] ?? STATUS_COLOR.new}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {l.status !== 'won' && (
                          <button onClick={() => convertToClient(l)} className="cursor-pointer px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg text-xs font-medium text-emerald-400 transition-colors">
                            Converter
                          </button>
                        )}
                        <button onClick={() => openEdit(l)} className="cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">
                          Editar
                        </button>
                        <button onClick={() => remove(l.id)} className="cursor-pointer px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors" disabled={saving}>
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
        title={modal === "create" ? "Novo Lead" : "Editar Lead"}
        description="Gestão de contatos comerciais."
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/[0.06]">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-xs text-rose-400 hover:text-rose-300 font-mono transition-colors">REMOVER LEAD</button>
            ) : <div/>}
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5 transition-colors">
                Cancelar
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar Lead"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Nome / Empresa</label>
              <input type="text" value={form.name ?? ""} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">E-mail</label>
                <input type="email" value={form.email ?? ""} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Telefone</label>
                <input type="text" value={form.phone ?? ""} onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Status / Fase</label>
                <select value={form.status ?? "new"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                  <option value="new">Novo (Lead)</option>
                  <option value="qualified">Qualificado</option>
                  <option value="meeting">Reunião Agendada</option>
                  <option value="proposal">Proposta Enviada</option>
                  <option value="won">Ganho (Cliente)</option>
                  <option value="lost">Perdido</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Origem</label>
                <select value={form.source ?? "site"} onChange={e => setForm((f: any) => ({ ...f, source: e.target.value }))}
                  className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                  <option value="site">Site / Orgânico</option>
                  <option value="ads">Anúncios (Ads)</option>
                  <option value="referral">Indicação</option>
                  <option value="outbound">Outbound</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Anotações</label>
              <textarea value={form.notes ?? ""} onChange={e => setForm((f: any) => ({ ...f, notes: e.target.value }))}
                rows={3} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white/70 text-sm outline-none focus:border-white/20 transition-colors resize-none" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
