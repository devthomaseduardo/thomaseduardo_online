import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, CheckCircle2, Activity, Clock, AlertTriangle, LayoutTemplate, Search, ChevronRight } from 'lucide-react';
import { useAdminData } from "./useAdminData";
import { ProjectDrawer } from './ProjectDrawer';
import { TableSkeleton } from './Loaders';
import { Modal } from '../ui/Modal';
import { API_URL } from '@/config';

const API = `${API_URL}/api/v2`;
const hdrs = () => ({ 'Content-Type': 'application/json', 'x-admin-key': localStorage.getItem('adminAuth') ?? '' });

const STATUS_MAP: Record<string, { label: string, color: string, border: string }> = {
  'briefing': { label: 'Briefing', color: 'text-white/70 bg-white/5', border: 'border-white/10' },
  'aguardando_material': { label: 'Materiais', color: 'text-amber-400 bg-amber-400/10', border: 'border-amber-400/20' },
  'em_design': { label: 'Design', color: 'text-purple-400 bg-purple-400/10', border: 'border-purple-400/20' },
  'em_desenvolvimento': { label: 'Dev', color: 'text-[#009EE3] bg-[#009EE3]/10', border: 'border-[#009EE3]/20' },
  'em_revisao': { label: 'Revisão', color: 'text-yellow-400 bg-yellow-400/10', border: 'border-yellow-400/20' },
  'deploy': { label: 'Deploy', color: 'text-blue-400 bg-blue-400/10', border: 'border-blue-400/20' },
  'concluido': { label: 'Concluído', color: 'text-emerald-400 bg-emerald-400/10', border: 'border-emerald-400/20' },
};

const normalizeStatusKey = (p: any) => {
  const s = p.status || p.phase || 'briefing';
  const mapping: any = {
    'Briefing': 'briefing', 'Aguardando Sinal': 'briefing', 'Onboarding': 'briefing',
    'Em Revisão': 'em_revisao', 'Em Desenvolvimento': 'em_desenvolvimento',
    'Concluído': 'concluido', 'Pago': 'concluido',
  };
  return mapping[s] || s;
};

export const ProjectsKanban = () => {
  const { projects, clients, loading, mutate: load } = useAdminData();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newModal, setNewModal] = useState(false);
  const [form, setForm] = useState({ name: '', clientId: '', tipo: 'website', value: '', proximaAcao: '', dataEntregaPrevista: '' });
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const kpis = {
    ativos: projects.filter(p => normalizeStatusKey(p) !== 'concluido').length,
    aguardando: projects.filter(p => normalizeStatusKey(p) === 'aguardando_material').length,
    atrasados: projects.filter(p => p.dataEntregaPrevista && new Date(p.dataEntregaPrevista) < new Date() && normalizeStatusKey(p) !== 'concluido').length,
  };

  const handleCreate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await fetch(`${API}/projects`, { method: 'POST', headers: hdrs(), body: JSON.stringify({ ...form, value: parseFloat(form.value) || 0 }) });
      setNewModal(false); setForm({ name: '', clientId: '', tipo: 'website', value: '', proximaAcao: '', dataEntregaPrevista: '' });
      load();
    } catch { } finally { setSaving(false); }
  };

  let filteredProjects = projects.filter(p => {
    const s = normalizeStatusKey(p);
    if (filter === 'active') return s !== 'concluido';
    if (filter === 'completed') return s === 'concluido';
    if (filter === 'delayed') return p.dataEntregaPrevista && new Date(p.dataEntregaPrevista) < new Date() && s !== 'concluido';
    return true;
  });

  if (search) {
    filteredProjects = filteredProjects.filter(p => 
      p.name?.toLowerCase().includes(search.toLowerCase()) || 
      p.client?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-8 xl:px-12 space-y-8">
      {/* Header & KPIs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Mesa de Operações</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Gestão de Projetos</p>
        </div>
        <button onClick={() => setNewModal(true)}
          className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Projetos Ativos", val: kpis.ativos, icon: Activity, color: "text-[#009EE3]" },
          { label: "Aguardando Cliente", val: kpis.aguardando, icon: Clock, color: "text-amber-400" },
          { label: "Atrasados", val: kpis.atrasados, icon: AlertTriangle, color: "text-rose-400" },
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

      {/* Table Section */}
      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.01]">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'active', label: 'Em Andamento' },
              { id: 'delayed', label: 'Atrasados' },
              { id: 'completed', label: 'Concluídos' },
            ].map(t => (
              <button key={t.id} onClick={() => setFilter(t.id)}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-widest uppercase transition-colors ${
                  filter === t.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar projeto..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={6} /></div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-24 text-center">
              <LayoutTemplate className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhum projeto encontrado nesta visualização.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Projeto & Cliente", "Status Atual", "Próxima Ação", "Financeiro", "Prazo"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredProjects.map(p => {
                  const sKey = normalizeStatusKey(p);
                  const statusInfo = STATUS_MAP[sKey] ?? STATUS_MAP['briefing'];
                  const totalV = p.invoices?.reduce((s: number, i: any) => s + (i.amount ?? 0), 0) ?? 0;
                  const totalP = p.invoices?.reduce((s: number, i: any) => s + (i.valorPago ?? 0), 0) ?? 0;
                  const pct = totalV > 0 ? Math.round((totalP / totalV) * 100) : 0;
                  const atrasado = p.dataEntregaPrevista && new Date(p.dataEntregaPrevista) < new Date() && sKey !== 'concluido';

                  return (
                    <tr key={p.id} onClick={() => setSelectedId(p.id)} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{p.name}</span>
                          <span className="text-[11px] text-white/40 mt-0.5">{p.client?.name ?? 'Sem cliente'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border ${statusInfo.border} ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-[200px]">
                        {p.proximaAcao ? (
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#009EE3]" />
                            <span className="text-xs text-[#009EE3]/80 truncate">{p.proximaAcao}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-white/20 italic">Definir ação...</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[10px] font-mono text-white/50">{pct}% Pago</span>
                            {pct === 100 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                          </div>
                          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-emerald-400' : 'bg-white/20'}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs font-mono ${atrasado ? 'text-rose-400' : 'text-white/60'}`}>
                            {p.dataEntregaPrevista ? new Date(p.dataEntregaPrevista).toLocaleDateString('pt-BR') : 'Sem prazo'}
                          </span>
                          {atrasado && <span className="text-[9px] text-rose-500/70 font-semibold uppercase">Atrasado</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-white/20 group-hover:text-white/60 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selectedId && (
          <ProjectDrawer projectId={selectedId} onClose={() => { setSelectedId(null); load(); }} />
        )}
      </AnimatePresence>

      {/* Modal Novo Projeto */}
      <Modal
        isOpen={newModal}
        onClose={() => setNewModal(false)}
        title="Novo Projeto"
        description="Inicie um novo projeto e anexe a um cliente existente."
        maxWidth="xl"
        footer={
          <div className="flex items-center justify-end w-full gap-3">
            <button onClick={() => setNewModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5 transition-colors">
              Cancelar
            </button>
            <button onClick={handleCreate} disabled={saving} className="px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50">
              {saving ? "Iniciando..." : "Criar Projeto"}
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Nome da Solução</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="Ex: App Financeiro V2" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Cliente Atrelado</label>
              <select required value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                <option value="">Selecionar conta...</option>
                {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Valor do Contrato (R$)</label>
              <input type="number" required value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 font-mono transition-colors" placeholder="25000" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Prazo Estimado (Deadline)</label>
              <input type="date" value={form.dataEntregaPrevista} onChange={e => setForm(f => ({ ...f, dataEntregaPrevista: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Ação Imediata (Next Step)</label>
            <input type="text" value={form.proximaAcao} onChange={e => setForm(f => ({ ...f, proximaAcao: e.target.value }))}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-[#009EE3] text-sm outline-none focus:border-[#009EE3]/50 transition-colors" placeholder="Ex: Solicitar acessos da AWS" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
