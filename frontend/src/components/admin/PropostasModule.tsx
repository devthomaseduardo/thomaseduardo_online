import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Plus, Search, Trash2, PenLine, Eye, X, ExternalLink, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

const STATUS_CONF: Record<string, { label: string; color: string }> = {
  draft:    { label: 'Rascunho',  color: 'text-white/50 bg-white/5 border-white/10' },
  sent:     { label: 'Enviada',   color: 'text-[#009EE3] bg-[#009EE3]/10 border-[#009EE3]/20' },
  viewed:   { label: 'Visualizada', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  accepted: { label: 'Aceita ✓',  color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  rejected: { label: 'Recusada',  color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
  expired:  { label: 'Expirada',  color: 'text-white/20 bg-white/5 border-white/10' },
};

const EMPTY = { title: '', clientName: '', amount: '', status: 'draft', url: '', notes: '' };

export function PropostasModule() {
  const [proposals, setProposals] = useState<any[]>([]);
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
      const r = await fetch(`${API}/proposals`, { headers: hdrs() });
      if (r.ok) setProposals(await r.json());
    } finally { setLoading(false); }
  };

  React.useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const isEdit = modal === 'edit';
      const body = { ...form, amount: Number(String(form.amount).replace(/\D/g, '')) || 0 };
      const url = isEdit ? `${API}/proposals/${form.id}` : `${API}/proposals`;
      const r = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: hdrs(), body: JSON.stringify(body) });
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(null); load(); showToast(isEdit ? 'Proposta atualizada.' : 'Proposta criada.');
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir esta proposta?')) return;
    await fetch(`${API}/proposals/${id}`, { method: 'DELETE', headers: hdrs() });
    load(); showToast('Proposta removida.');
  };

  const filtered = proposals.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) || p.clientName?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const totalAceitas = proposals.filter(p => p.status === 'accepted').reduce((s, p) => s + (p.amount ?? 0), 0);
  const totalPendentes = proposals.filter(p => ['sent', 'viewed'].includes(p.status ?? '')).reduce((s, p) => s + (p.amount ?? 0), 0);

  return (
    <div className="py-10 px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-8">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 right-6 z-[9999] bg-[#0B0B0B] border border-white/10 px-5 py-3 rounded-xl text-sm text-white shadow-2xl flex items-center gap-3">
            <FileText className="w-4 h-4 text-[#009EE3]" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Propostas Comerciais</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Pipeline de Fechamentos</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setModal('create'); }} className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" /> Nova Proposta
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', val: proposals.length, color: 'text-white' },
          { label: 'Aceitas', val: proposals.filter(p => p.status === 'accepted').length, color: 'text-emerald-400' },
          { label: 'Em aberto', val: proposals.filter(p => ['sent', 'viewed'].includes(p.status ?? '')).length, color: 'text-amber-400' },
          { label: 'Recusadas', val: proposals.filter(p => p.status === 'rejected').length, color: 'text-rose-400' },
        ].map((k, i) => (
          <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">{k.label}</p>
            <p className={`text-2xl font-bold tracking-tight ${k.color}`}>{k.val}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {[{ id: 'all', label: `Todas (${proposals.length})` }, ...Object.entries(STATUS_CONF).map(([k, v]) => ({ id: k, label: v.label }))].map(s => (
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar proposta ou cliente..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors cursor-text" />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/20 font-mono text-xs animate-pulse">Carregando propostas...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">Nenhuma proposta encontrada.</p>
            <button onClick={() => { setForm(EMPTY); setModal('create'); }} className="mt-4 text-xs text-[#009EE3] hover:underline cursor-pointer">+ Criar primeira proposta</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.06] text-[10px] text-white/30 font-mono uppercase tracking-widest bg-white/[0.01]">
                  <th className="px-5 py-3">Proposta</th>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Valor</th>
                  <th className="px-5 py-3">Data</th>
                  <th className="px-5 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(prop => {
                  const conf = STATUS_CONF[prop.status ?? 'draft'] ?? STATUS_CONF.draft;
                  return (
                    <tr key={prop.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-white/20" />
                          <p className="text-sm font-semibold text-white">{prop.title}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-white/50">{prop.clientName || prop.client?.name || '—'}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${conf.color}`}>{conf.label}</span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-sm text-white">
                        {prop.amount ? `R$ ${Number(prop.amount).toLocaleString('pt-BR')}` : '—'}
                      </td>
                      <td className="px-5 py-4 text-xs text-white/30 font-mono">
                        {prop.createdAt ? new Date(prop.createdAt).toLocaleDateString('pt-BR') : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          {prop.url && <a href={prop.url} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"><ExternalLink className="w-3.5 h-3.5 text-white/50" /></a>}
                          <button onClick={() => { setForm({ ...prop, amount: prop.amount ?? '' }); setModal('edit'); }} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"><PenLine className="w-3.5 h-3.5 text-white/50" /></button>
                          <button onClick={() => remove(prop.id)} className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center hover:bg-rose-500/20 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></button>
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

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{modal === 'create' ? 'Nova Proposta' : 'Editar Proposta'}</h2>
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={save} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Título *</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Cliente</label>
                    <input value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Valor (R$)</label>
                    <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
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
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">URL da Proposta</label>
                    <input type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
                      placeholder="https://..." className="w-full bg-[#050505] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/20 cursor-text" />
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
                    {saving ? 'Salvando...' : modal === 'create' ? 'Criar Proposta' : 'Salvar'}
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
