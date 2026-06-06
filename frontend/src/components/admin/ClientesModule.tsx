import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Edit2, Trash2, Users, Search, MoreVertical, Shield, Mail, Lock, Activity } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_COLOR: Record<string, string> = {
  new: "text-[#009EE3] bg-[#009EE3]/10",
  active: "text-emerald-400 bg-emerald-400/10",
  inactive: "text-white/30 bg-white/5",
  blocked: "text-rose-400 bg-rose-400/10",
};

const EMPTY = { name: "", email: "", cnpj: "", clientType: "new", password: "", phone: "", obs: "" };

export function ClientesModule() {
  const { clients, loading, mutate: load } = useAdminData();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = () => { setForm(EMPTY); setModal("create"); };
  const openEdit = (c: any) => { setForm({ ...c, password: "" }); setModal("edit"); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === "edit";
      const url = isEdit ? `${API}/clients/${form.id}` : `${API}/clients`;
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit
        ? { name: form.name, email: form.email, cnpj: form.cnpj, clientType: form.clientType, phone: form.phone, obs: form.obs }
        : form;
      
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(body) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar cliente.");
      }

      setModal(null); 
      load('clients'); 
      showToast(isEdit ? "Cliente atualizado." : "Cliente criado.");
    } catch (e: any) { 
      showToast(e.message); 
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir definitivamente este cliente do ecossistema? Esta ação é irreversível.")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/clients/${id}`, { method: "DELETE", headers: hdrs() });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao excluir cliente.");
      }

      load('clients'); 
      showToast("Cliente removido do sistema.");
      setModal(null);
    } catch (e: any) {
      showToast(e.message);
    }
    setSaving(false);
  };

  const filtered = clients.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = clients.filter(c => c.clientType === 'active').length;
  const newCount = clients.filter(c => c.clientType === 'new').length;

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-24 right-8 z-[9999] bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold shadow-[0_8px_30px_rgba(255,255,255,0.15)] flex items-center gap-3 border border-white/20">
            <Activity className="w-4 h-4 animate-pulse" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & KPIs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Client Directory</h1>
          <p className="text-zinc-500 text-sm font-medium">Manage operational access and client profiles.</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-extrabold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 stroke-[3]" /> Register New Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Accounts", val: clients.length, icon: Users, color: "text-white", glow: "white" },
          { label: "Active Ops", val: activeCount, icon: Activity, color: "text-emerald-400", glow: "emerald" },
          { label: "In Onboarding", val: newCount, icon: Shield, color: "text-blue-400", glow: "blue" },
        ].map((k, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:shadow-2xl">
            <div>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">{k.label}</p>
              <p className={`text-3xl font-extrabold tracking-tight ${k.color}`}>{k.val}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center relative`}>
              <k.icon className={`w-5 h-5 ${k.color} relative z-10`} />
              <div className={`absolute inset-0 bg-${k.glow}-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabela Bento Box */}
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden flex flex-col hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
        {/* Toolbar */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center gap-6 bg-white/[0.01]">
          <div className="flex-1 relative max-w-sm w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Filter by name or domain..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
            {search && (
              <button onClick={() => setSearch("")}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <Users className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">No accounts matched your criteria.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Account Name", "Contact Matrix", "Lifecycle Status", "Security", "Operations"].map(h => (
                    <th key={h} className="px-6 py-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map(c => (
                  <tr key={c.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform">
                          {c.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">{c.name}</p>
                          {c.cnpj && <p className="text-[10px] text-zinc-500 font-mono mt-0.5 tracking-tighter">{c.cnpj}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          <Mail className="w-3.5 h-3.5 text-blue-400/70" /> {c.email}
                        </div>
                        {c.phone && <span className="text-[10px] font-mono text-zinc-500 tracking-tight">{c.phone}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/5 shadow-sm ${STATUS_COLOR[c.clientType] ?? STATUS_COLOR.new}`}>
                        {c.clientType === "new" ? "Onboarding" : c.clientType === "active" ? "Operational" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 group-hover:text-emerald-400 transition-all">
                        <Lock className="w-3.5 h-3.5 text-emerald-500/50 group-hover:text-emerald-500" /> ACTIVE ACCESS
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => openEdit(c)} className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all">
                          Edit
                        </button>
                        <button onClick={() => remove(c.id)} className="cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all"
                          title="Remover Cliente" disabled={saving}>
                          Wipe
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

      {/* Novo Modal Inteligente */}
      <Modal
        isOpen={modal !== null}
        onClose={() => setModal(null)}
        title={modal === "create" ? "Register Partner" : "Account Configuration"}
        description={modal === "create" ? "Initialize a new environment in the ecosystem." : "Manage corporate data, security and internal notes."}
        maxWidth="xl"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition-all">TERMINATE ACCOUNT</button>
            ) : <div/>}
            <div className="flex gap-4">
              <button onClick={() => setModal(null)} className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                Discard
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50">
                {saving ? "Processing..." : modal === "create" ? "Grant Access" : "Commit Changes"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Company / Entity Name</label>
              <input type="text" value={form.name ?? ""} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: Antigravity Systems" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Tax ID / Document</label>
              <input type="text" value={form.cnpj ?? ""} onChange={e => setForm((f: any) => ({ ...f, cnpj: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] font-mono transition-all" placeholder="00.000.000/0000-00" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Primary Liaison Email</label>
              <input type="email" value={form.email ?? ""} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="liaison@company.com" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Direct Communication (WhatsApp)</label>
              <input type="text" value={form.phone ?? ""} onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" placeholder="+55 11 90000-0000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Lifecycle Stage</label>
              <select value={form.clientType} onChange={e => setForm((f: any) => ({ ...f, clientType: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                <option value="new">Operational Onboarding</option>
                <option value="active">Full Production</option>
                <option value="inactive">Project Suspended</option>
                <option value="blocked">Access Revoked</option>
              </select>
            </div>
            {modal === "create" && (
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-emerald-400/50 uppercase tracking-[0.2em] flex items-center gap-2"><Lock className="w-3 h-3"/> Initial Master Password</label>
                <input type="password" value={form.password ?? ""} onChange={e => setForm((f: any) => ({ ...f, password: e.target.value }))}
                  className="w-full bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl px-5 py-4 text-emerald-400 text-sm outline-none focus:border-emerald-500/30 transition-all font-mono" placeholder="Set secure portal key..." />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Operational Intelligence (Internal Only)</label>
            <textarea value={form.obs ?? ""} onChange={e => setForm((f: any) => ({ ...f, obs: e.target.value }))}
              rows={4} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-zinc-300 text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all resize-none" placeholder="Business notes, specific agreements, strategic links..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
