import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UsersRound, Plus, Search, Trash2, PenLine, X, Shield, Mail, UserCheck, UserX } from "lucide-react";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const ROLES: Record<string, { label: string; color: string }> = {
  admin:   { label: 'Admin',     color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  editor:  { label: 'Editor',    color: 'text-[#009EE3] bg-[#009EE3]/10 border-[#009EE3]/20' },
  viewer:  { label: 'Visualizador', color: 'text-white/50 bg-white/5 border-white/10' },
  dev:     { label: 'Developer', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  designer:{ label: 'Designer',  color: 'text-pink-400 bg-pink-400/10 border-pink-400/20' },
};

const EMPTY = { name: '', email: '', role: 'editor', active: true };

export function EquipeModule() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/team-members`, { headers: hdrs() });
      if (r.ok) setTeam(await r.json());
    } finally { setLoading(false); }
  };

  React.useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === 'edit';
      const url = isEdit ? `${API}/team-members/${form.id}` : `${API}/team-members`;
      const r = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: hdrs(), body: JSON.stringify(form) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(null); load(); showToast(isEdit ? 'Membro atualizado.' : 'Membro adicionado.');
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const toggleActive = async (member: any) => {
    await fetch(`${API}/team-members/${member.id}`, { method: 'PUT', headers: hdrs(), body: JSON.stringify({ active: !member.active }) });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Remover este membro da equipe?')) return;
    await fetch(`${API}/team-members/${id}`, { method: 'DELETE', headers: hdrs() });
    load(); showToast('Membro removido.');
  };

  const filtered = team.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-8">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-[9999] bg-[#0B0B0B] border border-white/10 px-5 py-3 rounded-xl text-sm text-white shadow-2xl flex items-center gap-3">
            <UsersRound className="w-4 h-4 text-[#009EE3]" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Equipe T3RN</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Acesso e Permissões</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setModal('create'); }} className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" /> Adicionar Membro
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', val: team.length, color: 'text-white' },
          { label: 'Ativos', val: team.filter(m => m.active).length, color: 'text-emerald-400' },
          { label: 'Admins', val: team.filter(m => m.role === 'admin').length, color: 'text-amber-400' },
          { label: 'Inativos', val: team.filter(m => !m.active).length, color: 'text-white/30' },
        ].map((k, i) => (
          <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">{k.label}</p>
            <p className={`text-2xl font-bold tracking-tight ${k.color}`}>{k.val}</p>
          </div>
        ))}
      </div>

      {/* Busca */}
      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] bg-white/[0.01]">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar membro..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors cursor-text" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/20 font-mono text-xs animate-pulse">Carregando equipe...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <UsersRound className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">Nenhum membro encontrado.</p>
            <button onClick={() => { setForm(EMPTY); setModal('create'); }} className="mt-4 text-xs text-[#009EE3] hover:underline cursor-pointer">+ Adicionar primeiro membro</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
            {filtered.map(member => {
              const conf = ROLES[member.role ?? 'viewer'] ?? ROLES.viewer;
              const initials = (member.name ?? '??').substring(0, 2).toUpperCase();
              return (
                <motion.div key={member.id} layout className={`bg-[#050505] border rounded-2xl p-5 group transition-all ${member.active ? 'border-white/[0.08] hover:border-white/[0.15]' : 'border-white/[0.04] opacity-60'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold text-white/60">
                        {initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-white">{member.name}</p>
                          {member.role === 'admin' && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <p className="text-xs text-white/40">{member.email}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-1 ${member.active ? 'bg-emerald-400' : 'bg-white/20'}`} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${conf.color}`}>{conf.label}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toggleActive(member)} title={member.active ? 'Desativar' : 'Ativar'}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${member.active ? 'bg-white/5 hover:bg-amber-400/10' : 'bg-emerald-400/10 hover:bg-emerald-400/20'}`}>
                        {member.active ? <UserX className="w-3.5 h-3.5 text-white/40" /> : <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                      <button onClick={() => { setForm({ ...member }); setModal('edit'); }}
                        className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"><PenLine className="w-3.5 h-3.5 text-white/50" /></button>
                      <button onClick={() => remove(member.id)}
                        className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center hover:bg-rose-500/20 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{modal === 'create' ? 'Novo Membro' : 'Editar Membro'}</h2>
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={save} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Nome *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                    className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">E-mail *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                    className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Função</label>
                  <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-pointer">
                    {Object.entries(ROLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <label className="text-sm text-white/60">Membro ativo</label>
                  <button type="button" onClick={() => setForm({ ...form, active: !form.active })}
                    className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative ${form.active ? 'bg-emerald-500' : 'bg-white/10'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.active ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border border-white/[0.08] text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors cursor-pointer">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 cursor-pointer">
                    {saving ? 'Salvando...' : modal === 'create' ? 'Adicionar' : 'Salvar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
