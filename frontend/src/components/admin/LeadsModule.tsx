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

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Lead Intelligence</h1>
          <p className="text-zinc-500 text-sm font-medium">Coordinate commercial pipeline and acquisition funnel.</p>
        </div>
        <button onClick={openCreate}
          className="cursor-pointer bg-white text-black font-extrabold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4 stroke-[3]" /> Register New Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Acquisition Buffer", val: leads.length, icon: Target, color: "text-white", glow: "white" },
          { label: "Active Pipeline", val: activeCount, icon: UserPlus, color: "text-blue-400", glow: "blue" },
          { label: "Conversion (Won)", val: wonCount, icon: Star, color: "text-emerald-400", glow: "emerald" },
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
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-11 pr-4 py-2.5 text-sm text-white outline-none focus:bg-white/[0.06] focus:border-white/10 focus:ring-4 focus:ring-white/[0.02] transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <Target className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-zinc-500 text-sm font-medium">No leads found in the pipeline.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                  {["Individual / Entity", "Contact Matrix", "Origin", "Funnel Stage", "Operations"].map(h => (
                    <th key={h} className="px-6 py-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((l: any) => (
                  <tr key={l.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform">
                          {l.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">{l.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{l.email}</p>
                        <p className="text-[10px] font-mono text-zinc-500">{l.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors capitalize">{l.source}</span>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-white/5 shadow-sm ${STATUS_COLOR[l.status] ?? STATUS_COLOR.new}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {l.status !== 'won' && (
                          <button onClick={() => convertToClient(l)} className="cursor-pointer px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-all">
                            Convert
                          </button>
                        )}
                        <button onClick={() => openEdit(l)} className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-all">
                          Edit
                        </button>
                        <button onClick={() => remove(l.id)} className="cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all" disabled={saving}>
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

      <Modal
        isOpen={modal !== null}
        onClose={() => setModal(null)}
        title={modal === "create" ? "Initialize Prospect" : "Prospect Intelligence"}
        description="Manage commercial liaison data and funnel positioning."
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full pt-6 border-t border-white/5">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="cursor-pointer text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition-all">TERMINATE PROSPECT</button>
            ) : <div/>}
            <div className="flex gap-4">
              <button onClick={() => setModal(null)} className="cursor-pointer px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                Discard
              </button>
              <button onClick={save} disabled={saving} className="cursor-pointer px-8 py-2.5 bg-white text-black rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50">
                {saving ? "Synchronizing..." : modal === "create" ? "Buffer Prospect" : "Commit Changes"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-8 py-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Contact / Entity Identity</label>
              <input type="text" value={form.name ?? ""} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="Ex: Nexus Corp" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Communication Matrix (Email)</label>
                <input type="email" value={form.email ?? ""} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all" placeholder="liaison@nexus.com" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Direct Line (WhatsApp)</label>
                <input type="text" value={form.phone ?? ""} onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all font-mono" placeholder="+55 11 90000-0000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Funnel Positioning</label>
                <select value={form.status ?? "new"} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                  <option value="new">Initial Lead</option>
                  <option value="qualified">Qualified Asset</option>
                  <option value="meeting">Briefing Scheduled</option>
                  <option value="proposal">Draft Transmitted</option>
                  <option value="won">Conversion Successful</option>
                  <option value="lost">Lost Opportunity</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Acquisition Origin</label>
                <select value={form.source ?? "site"} onChange={e => setForm((f: any) => ({ ...f, source: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer">
                  <option value="site">Organic / Inbound</option>
                  <option value="ads">Paid Acquisition (Ads)</option>
                  <option value="referral">Network Endorsement</option>
                  <option value="outbound">Active Outreach</option>
                  <option value="other">Other Channels</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Liaison Intelligence (Notes)</label>
              <textarea value={form.notes ?? ""} onChange={e => setForm((f: any) => ({ ...f, notes: e.target.value }))}
                rows={4} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-zinc-300 text-sm outline-none focus:border-white/10 focus:bg-white/[0.05] transition-all resize-none" placeholder="Strategic observations, intent signals, historical context..." />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
