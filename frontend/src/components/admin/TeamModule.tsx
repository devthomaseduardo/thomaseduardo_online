import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, Activity, Users, Shield, ShieldAlert } from "lucide-react";
import { useAdminData } from "./useAdminData";
import { TableSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const EMPTY = { name: "", email: "", role: "Editor", permissions: ["read"], active: true };

export function TeamModule() {
  const { team, loading, mutate } = useAdminData();
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
      const url = isEdit ? `${API}/team-members/${form.id}` : `${API}/team-members`;
      const method = isEdit ? "PUT" : "POST";
      const payload = { ...form };
      if (typeof payload.permissions === 'string') {
        payload.permissions = payload.permissions.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      const r = await fetch(url, { method, headers: hdrs(), body: JSON.stringify(payload) });
      
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }
      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao salvar membro da equipe.");
      }

      setModal(null); mutate('team'); showToast(isEdit ? "Membro atualizado." : "Membro adicionado.");
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir membro da equipe?")) return;
    setSaving(true);
    try {
      const r = await fetch(`${API}/team-members/${id}`, { method: "DELETE", headers: hdrs() });
      if (r.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }
      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Erro ao remover membro da equipe.");
      }
      mutate('team'); showToast("Membro removido.");
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const filtered = team.filter((m: any) => m.name?.toLowerCase().includes(search.toLowerCase()) || m.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-24 right-8 z-[9999] bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold shadow-[0_8px_30px_rgba(255,255,255,0.15)] flex items-center gap-3 border border-white/20">
            <Activity className="w-4 h-4 animate-pulse" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Personnel Center</h1>
          <p className="text-zinc-500 text-sm font-medium">Coordinate access vectors and operational roles.</p>
        </div>
        <button onClick={() => { setForm({ ...EMPTY }); setModal("create"); }}
          className="cursor-pointer bg-white text-black font-extrabold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 stroke-[3]" /> Onboard Personnel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Operatives", val: team.length, icon: Users, color: "text-white", glow: "white" },
          { label: "Active Vectors", val: team.filter((m: any) => m.active).length, icon: Shield, color: "text-emerald-400", glow: "emerald" },
          { label: "Suspended", val: team.filter((m: any) => !m.active).length, icon: ShieldAlert, color: "text-rose-400", glow: "rose" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or alias..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <Users className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">No personnel detected in current sector.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Individual Identity", "Operational Role", "Permission Matrix", "Vector Status", "Operations"].map(h => (
                    <th key={h} className="px-6 py-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((m: any) => (
                  <tr key={m.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                    <td className="px-6 py-6">
                      <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">{m.name}</p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5 tracking-tighter">{m.email}</p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-[11px] font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase tracking-widest">{m.role}</span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-2">
                        {m.permissions?.map((p: string) => (
                          <span key={p} className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-500 border border-white/5 group-hover:text-white group-hover:border-white/10 transition-colors">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/5 shadow-sm ${m.active ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border-rose-400/20'}`}>
                        {m.active ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => { setForm({ ...m, permissions: m.permissions?.join(', ') || '' }); setModal("edit"); }} className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all">Modify</button>
                        <button onClick={() => remove(m.id)} className="cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all" disabled={saving}>Wipe</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={modal !== null} onClose={() => setModal(null)} title={modal === "create" ? "Initialize Operative" : "Personnel Configuration"} description="Manage access vectors and operational role definitions." maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5">
            {modal === "edit" ? <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition-all">TERMINATE ACCESS</button> : <div/>}
            <div className="flex gap-4">
              <button onClick={() => setModal(null)} className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">Discard</button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50">{saving ? "Synchronizing..." : "Commit Vector"}</button>
            </div>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Full Name / Identity</label>
              <input type="text" value={form.name ?? ""} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: John Doe" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Corporate Liaison Email</label>
              <input type="email" value={form.email ?? ""} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="liaison@company.com" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Operational Role</label>
              <input type="text" value={form.role ?? ""} onChange={e => setForm((f: any) => ({ ...f, role: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: Senior Architect" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Permission Matrix (CSV)</label>
              <input type="text" value={form.permissions ?? ""} onChange={e => setForm((f: any) => ({ ...f, permissions: e.target.value }))} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" placeholder="read, write, admin" />
            </div>
            <label className="flex items-center gap-3 text-xs font-bold text-zinc-400 cursor-pointer group/active mt-2">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" checked={form.active} onChange={e => setForm((f: any) => ({ ...f, active: e.target.checked }))} className="peer appearance-none w-5 h-5 border border-white/10 rounded-md bg-white/5 checked:bg-white checked:border-white transition-all cursor-pointer" />
                <CheckCircle className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className="group-hover/active:text-white transition-colors uppercase tracking-widest">Vector Active</span>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
