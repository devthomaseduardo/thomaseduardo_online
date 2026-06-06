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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Equipe</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Acessos e Permissões</p>
        </div>
        <button onClick={() => { setForm({ ...EMPTY }); setModal("create"); }}
          className="cursor-pointer bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/5">
          <Plus className="w-4 h-4" /> Novo Membro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Membros Totais", val: team.length, icon: Users, color: "text-white" },
          { label: "Ativos", val: team.filter((m: any) => m.active).length, icon: Shield, color: "text-emerald-400" },
          { label: "Inativos", val: team.filter((m: any) => !m.active).length, icon: ShieldAlert, color: "text-rose-400" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar nome ou email..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Users className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhum membro encontrado.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Nome / Email", "Cargo", "Permissões", "Status", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((m: any) => (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white/90">{m.name}</p>
                      <p className="text-[10px] text-white/40 mt-0.5">{m.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/70">{m.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {m.permissions?.map((p: string) => (
                          <span key={p} className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${m.active ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border-rose-400/20'}`}>
                        {m.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setForm({ ...m, permissions: m.permissions?.join(', ') || '' }); setModal("edit"); }} className="cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">Editar</button>
                        <button onClick={() => remove(m.id)} className="cursor-pointer px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors" disabled={saving}>Remover</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={modal !== null} onClose={() => setModal(null)} title={modal === "create" ? "Novo Membro" : "Editar Membro"} description="Gestão de acesso da equipe." maxWidth="md"
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
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Nome</label>
              <input type="text" value={form.name ?? ""} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Email</label>
              <input type="email" value={form.email ?? ""} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Cargo</label>
              <input type="text" value={form.role ?? ""} onChange={e => setForm((f: any) => ({ ...f, role: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Permissões (separadas por vírgula)</label>
              <input type="text" value={form.permissions ?? ""} onChange={e => setForm((f: any) => ({ ...f, permissions: e.target.value }))} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" placeholder="read, write, admin" />
            </div>
            <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer mt-2">
              <input type="checkbox" checked={form.active} onChange={e => setForm((f: any) => ({ ...f, active: e.target.checked }))} className="rounded border-white/20 bg-transparent text-emerald-500 focus:ring-emerald-500" />
              Usuário ativo
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
