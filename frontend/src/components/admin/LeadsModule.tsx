import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Plus, Search, Trash2, PenLine, Phone, Mail, User, Calendar, X, CheckCircle2, Flame, Thermometer, Snowflake } from "lucide-react";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_CONF: Record<string, { label: string; color: string; icon: any }> = {
  new:       { label: 'Novo',        color: 'text-[#009EE3] bg-[#009EE3]/10 border-[#009EE3]/20', icon: User },
  warm:      { label: 'Morno',       color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', icon: Thermometer },
  hot:       { label: 'Quente 🔥',   color: 'text-rose-400 bg-rose-400/10 border-rose-400/20',   icon: Flame },
  cold:      { label: 'Frio',        color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', icon: Snowflake },
  converted: { label: 'Convertido ✓',color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: CheckCircle2 },
  lost:      { label: 'Perdido',     color: 'text-white/20 bg-white/5 border-white/10',          icon: X },
};

const EMPTY = { name: '', email: '', phone: '', source: 'site', status: 'new', owner: '', notes: '' };

export function LeadsModule() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/leads`, { headers: hdrs() });
      if (r.ok) setLeads(await r.json());
    } finally { setLoading(false); }
  };

  React.useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === 'edit';
      const url = isEdit ? `${API}/leads/${form.id}` : `${API}/leads`;
      const r = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: hdrs(), body: JSON.stringify(form) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(null); load(); showToast(isEdit ? 'Lead atualizado.' : 'Lead criado.');
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir este lead?')) return;
    await fetch(`${API}/leads/${id}`, { method: 'DELETE', headers: hdrs() });
    load(); showToast('Lead removido.');
  };

  const filtered = leads.filter(l => {
    const matchSearch = l.name?.toLowerCase().includes(search.toLowerCase()) || l.email?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || l.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = Object.keys(STATUS_CONF).reduce((acc, k) => ({ ...acc, [k]: leads.filter(l => l.status === k).length }), {} as Record<string, number>);

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-[9999] bg-[#0B0B0B] border border-white/10 px-5 py-3 rounded-xl text-sm text-white shadow-2xl flex items-center gap-3">
            <Target className="w-4 h-4 text-[#009EE3]" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Pipeline de Leads</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">CRM Comercial · Prospecção</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setModal('create'); }} className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" /> Novo Lead
        </button>
      </div>

      {/* KPI Status Chips */}
      <div className="flex flex-wrap gap-2">
        {[{ id: 'all', label: `Todos (${leads.length})` }, ...Object.entries(STATUS_CONF).map(([k, v]) => ({ id: k, label: `${v.label} (${counts[k] ?? 0})` }))].map(s => (
          <button key={s.id} onClick={() => setFilter(s.id)}
            className={`px-4 py-2 rounded-lg text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${filter === s.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex gap-4 bg-white/[0.01]">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou e-mail..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors cursor-text" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/20 font-mono text-xs animate-pulse">Carregando pipeline...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Target className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">Nenhum lead encontrado.</p>
            <button onClick={() => { setForm(EMPTY); setModal('create'); }} className="mt-4 text-xs text-[#009EE3] hover:underline cursor-pointer">+ Criar primeiro lead</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.06] text-[10px] text-white/30 font-mono uppercase tracking-widest bg-white/[0.01]">
                  <th className="px-5 py-3">Nome / Contato</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Origem</th>
                  <th className="px-5 py-3">Responsável</th>
                  <th className="px-5 py-3">Atualizado</th>
                  <th className="px-5 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => {
                  const conf = STATUS_CONF[lead.status] ?? STATUS_CONF.new;
                  return (
                    <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-white">{lead.name}</p>
                        <p className="text-xs text-white/40">{lead.email ?? '—'}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${conf.color}`}>{conf.label}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-white/50 font-mono">{lead.source ?? '—'}</td>
                      <td className="px-5 py-4 text-sm text-white/50">{lead.owner ?? '—'}</td>
                      <td className="px-5 py-4 text-xs text-white/30 font-mono">{lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString('pt-BR') : '—'}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          {lead.email && <a href={`mailto:${lead.email}`} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"><Mail className="w-3.5 h-3.5 text-white/50" /></a>}
                          {lead.phone && <a href={`tel:${lead.phone}`} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"><Phone className="w-3.5 h-3.5 text-white/50" /></a>}
                          <button onClick={() => { setForm({ ...lead }); setModal('edit'); }} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"><PenLine className="w-3.5 h-3.5 text-white/50" /></button>
                          <button onClick={() => remove(lead.id)} className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center hover:bg-rose-500/20 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Criar/Editar */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{modal === 'create' ? 'Novo Lead' : 'Editar Lead'}</h2>
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={save} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Nome *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">E-mail</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Telefone</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-pointer">
                      {Object.entries(STATUS_CONF).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Origem</label>
                    <select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-pointer">
                      {['site', 'instagram', 'indicacao', 'linkedin', 'whatsapp', 'outro'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Responsável</label>
                    <input value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Observações</label>
                    <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 resize-none cursor-text" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border border-white/[0.08] text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors cursor-pointer">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 cursor-pointer">
                    {saving ? 'Salvando...' : modal === 'create' ? 'Criar Lead' : 'Salvar'}
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
