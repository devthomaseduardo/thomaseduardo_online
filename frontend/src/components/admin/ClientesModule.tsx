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
      if (!r.ok) throw new Error((await r.json()).error);
      setModal(null); load(); showToast(isEdit ? "Cliente atualizado." : "Cliente criado.");
    } catch (e: any) { showToast(e.message); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Excluir definitivamente este cliente do ecossistema? Esta ação é irreversível.")) return;
    await fetch(`${API}/clients/${id}`, { method: "DELETE", headers: hdrs() });
    load(); showToast("Cliente removido do sistema.");
  };

  const filtered = clients.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = clients.filter(c => c.clientType === 'active').length;
  const newCount = clients.filter(c => c.clientType === 'new').length;

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

      {/* Header & KPIs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Base de Clientes</h1>
          <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Gestão de acessos e perfis</p>
        </div>
        <button onClick={openCreate}
          className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total de Clientes", val: clients.length, icon: Users, color: "text-white" },
          { label: "Clientes Ativos", val: activeCount, icon: Activity, color: "text-emerald-400" },
          { label: "Onboarding (Novos)", val: newCount, icon: Shield, color: "text-[#009EE3]" },
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

      {/* Tabela Bento Box */}
      <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/[0.06] flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/[0.01]">
          <div className="flex-1 relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou e-mail..."
              className="w-full bg-[#050505] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-white/20 transition-colors" />
          </div>
          <button onClick={() => setSearch("")} disabled={!search}
            className="h-10 px-4 rounded-lg border border-white/[0.08] text-[10px] uppercase tracking-[0.18em] font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-white/70 hover:text-white hover:border-white/20 bg-white/5 hover:bg-white/10">
            Limpar
          </button>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={5} /></div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Users className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Nenhum cliente encontrado.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#050505]">
                  {["Cliente", "Contato", "Status", "Segurança", "Ações"].map(h => (
                    <th key={h} className="text-left text-[10px] font-mono text-white/30 uppercase tracking-widest px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/70">
                          {c.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/90">{c.name}</p>
                          {c.cnpj && <p className="text-[10px] text-white/40 font-mono mt-0.5">{c.cnpj}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                          <Mail className="w-3 h-3" /> {c.email}
                        </div>
                        {c.phone && <span className="text-[10px] font-mono text-white/30">{c.phone}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-md border border-white/5 ${STATUS_COLOR[c.clientType] ?? STATUS_COLOR.new}`}>
                        {c.clientType === "new" ? "Em Onboarding" : c.clientType === "active" ? "Operando" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Lock className="w-3.5 h-3.5 text-emerald-400" /> Acesso Ativo
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(c)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white/70 transition-colors">
                          Editar
                        </button>
                        <button onClick={() => remove(c.id)} className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-xs font-medium text-rose-200 hover:text-white transition-colors"
                          title="Excluir cliente" aria-label="Excluir cliente">
                          Excluir
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
        title={modal === "create" ? "Adicionar Cliente" : "Configurações do Cliente"}
        description={modal === "create" ? "Libere um novo ambiente no ecossistema." : "Gerencie dados, segurança e observações."}
        maxWidth="xl"
        footer={
          <div className="flex items-center justify-between w-full">
            {modal === "edit" ? (
               <button type="button" onClick={() => remove(form.id)} className="text-xs text-rose-400 hover:text-rose-300 font-mono">REMOVER CLIENTE</button>
            ) : <div/>}
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5 transition-colors">
                Cancelar
              </button>
              <button onClick={save} disabled={saving} className="px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50">
                {saving ? "Processando..." : modal === "create" ? "Gerar Acesso" : "Salvar Alterações"}
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Nome da Empresa / Cliente</label>
              <input type="text" value={form.name ?? ""} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="Ex: Sleep House" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">CNPJ / Documento</label>
              <input type="text" value={form.cnpj ?? ""} onChange={e => setForm((f: any) => ({ ...f, cnpj: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 font-mono transition-colors" placeholder="00.000.000/0000-00" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">E-mail Principal</label>
              <input type="email" value={form.email ?? ""} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="contato@empresa.com" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Telefone / WhatsApp</label>
              <input type="text" value={form.phone ?? ""} onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" placeholder="+55 11 90000-0000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
            <div>
              <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Status de Operação</label>
              <select value={form.clientType} onChange={e => setForm((f: any) => ({ ...f, clientType: e.target.value }))}
                className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors">
                <option value="new">Em Onboarding</option>
                <option value="active">Operando Ativamente</option>
                <option value="inactive">Contrato Pausado</option>
                <option value="blocked">Acesso Bloqueado</option>
              </select>
            </div>
            {modal === "create" && (
              <div>
                <label className="block text-[10px] font-mono text-emerald-400/50 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Lock className="w-3 h-3"/> Senha de Acesso Inicial</label>
                <input type="password" value={form.password ?? ""} onChange={e => setForm((f: any) => ({ ...f, password: e.target.value }))}
                  className="w-full bg-[#050505] border border-emerald-400/20 rounded-xl px-4 py-3 text-emerald-400 text-sm outline-none focus:border-emerald-400/50 transition-colors font-mono" placeholder="Definir senha do portal..." />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Notas Internas (Ocultas do cliente)</label>
            <textarea value={form.obs ?? ""} onChange={e => setForm((f: any) => ({ ...f, obs: e.target.value }))}
              rows={3} className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white/70 text-sm outline-none focus:border-white/20 transition-colors resize-none" placeholder="Anotações comerciais, acordos específicos, links..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
