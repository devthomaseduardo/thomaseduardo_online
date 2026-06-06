import React, { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { 
  X, Mail, Phone, Lock, Briefcase, FileText, 
  DollarSign, Activity, ChevronRight, ExternalLink, 
  Shield, CheckCircle2, Clock, Zap
} from "lucide-react";
import { API_URL } from '@/config';
import { getAdminHeaders } from '@/lib/adminAuth';
import { useToast } from '@/contexts/ToastContext';
import { TimelineSkeleton } from "./Loaders";

const API = `${API_URL}/api/v2`;
const hdrs = () => getAdminHeaders();

interface ClientDrawerProps {
  clientId: string;
  onClose: () => void;
  onRefresh: () => void;
}

export function ClientDrawer({ clientId, onClose, onRefresh }: ClientDrawerProps) {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/clients/${clientId}`, { headers: hdrs() });
      if (!r.ok) throw new Error("Erro ao carregar dados do cliente.");
      const data = await r.json();
      setClient(data);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [clientId, showToast]);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading || !client) {
    return (
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-4xl bg-[#050505] border-l border-white/[0.06] z-50 shadow-2xl p-8 flex flex-col pt-16">
        <TimelineSkeleton />
      </motion.div>
    );
  }

  const totalProjetos = client.projects?.length || 0;
  const totalFaturado = client.projects?.reduce((acc: number, p: any) => 
    acc + (p.invoices?.reduce((s: number, i: any) => s + (i.amount || 0), 0) || 0), 0
  ) || 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-4xl bg-[#050505] border-l border-white/[0.06] z-50 shadow-2xl flex flex-col">
        
        <header className="px-10 py-8 border-b border-white/[0.06] flex items-start justify-between bg-[#0A0A0A] shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">{client.name}</h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                client.clientType === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-[#009EE3]/10 text-[#009EE3] border-[#009EE3]/20'
              }`}>
                {client.clientType === 'active' ? 'Operacional' : 'Onboarding'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-white/40 text-xs font-mono">
               <span className="flex items-center gap-1.5"><Mail className="w-3 h-3"/> {client.email}</span>
               {client.phone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3"/> {client.phone}</span>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
          
          {/* Dashboard Rápido do Cliente */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Ativos em Carteira</p>
              <p className="text-2xl font-bold text-white">{totalProjetos} <span className="text-sm font-normal text-white/20">projetos</span></p>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">LTV (Volume Total)</p>
              <p className="text-2xl font-bold text-emerald-400">R$ {totalFaturado.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Engajamento</p>
              <p className="text-2xl font-bold text-[#009EE3]">{client.proposals?.length || 0} <span className="text-sm font-normal text-white/20">propostas</span></p>
            </div>
          </section>

          {/* Processo do Ecossistema */}
          <section className="space-y-6">
             <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> Fluxo do Ecossistema Digital
             </h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Projetos Ativos */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white/90 uppercase tracking-tight flex items-center gap-2">
                         <Briefcase className="w-4 h-4 text-blue-400" /> Projetos
                      </h4>
                      <button className="text-[10px] uppercase font-mono text-blue-400 hover:underline">+ Novo</button>
                   </div>
                   <div className="space-y-3">
                      {client.projects?.map((p: any) => (
                        <div key={p.id} className="bg-[#0B0B0B] border border-white/[0.06] p-4 rounded-xl hover:border-white/20 transition-all group">
                           <div className="flex justify-between items-start mb-3">
                              <p className="font-bold text-sm text-white/90">{p.name}</p>
                              <span className="text-[9px] font-mono uppercase bg-white/5 px-1.5 py-0.5 rounded text-white/40">{p.status}</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: `${p.progresso}%` }} />
                           </div>
                        </div>
                      ))}
                      {totalProjetos === 0 && <p className="text-xs text-white/20 italic">Nenhum projeto iniciado.</p>}
                   </div>
                </div>

                {/* Propostas e Orçamentos */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white/90 uppercase tracking-tight flex items-center gap-2">
                         <FileText className="w-4 h-4 text-purple-400" /> Propostas
                      </h4>
                      <button className="text-[10px] uppercase font-mono text-purple-400 hover:underline">+ Gerar</button>
                   </div>
                   <div className="space-y-3">
                      {client.proposals?.map((pr: any) => (
                        <div key={pr.id} className="bg-[#0B0B0B] border border-white/[0.06] p-4 rounded-xl flex items-center justify-between">
                           <div>
                              <p className="text-sm font-bold text-white/80">{pr.title}</p>
                              <p className="text-[10px] text-white/30 font-mono mt-1">R$ {pr.amount.toLocaleString('pt-BR')}</p>
                           </div>
                           <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                              pr.status === 'approved' ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'
                           }`}>{pr.status}</span>
                        </div>
                      ))}
                      {client.proposals?.length === 0 && <p className="text-xs text-white/20 italic">Sem propostas pendentes.</p>}
                   </div>
                </div>

             </div>
          </section>

          {/* Financeiro Consolidado */}
          <section className="space-y-6">
             <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                   <DollarSign className="w-4 h-4" /> Tesouraria Individual
                </h3>
             </div>
             <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-3xl overflow-hidden divide-y divide-white/[0.04]">
                {client.projects?.flatMap((p: any) => p.invoices || []).map((inv: any) => (
                  <div key={inv.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                           inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                           <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-white/90">{inv.description}</p>
                           <p className="text-[10px] text-white/30 font-mono uppercase mt-0.5">{new Date(inv.createdAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-white">R$ {inv.amount.toLocaleString('pt-BR')}</p>
                        <p className={`text-[9px] font-bold uppercase mt-1 ${
                           inv.status === 'paid' ? 'text-emerald-500' : 'text-amber-500'
                        }`}>{inv.status === 'paid' ? 'Liquidado' : 'Pendente'}</p>
                     </div>
                  </div>
                ))}
                {client.projects?.every((p:any) => !p.invoices?.length) && (
                   <div className="p-10 text-center text-white/20 text-xs font-mono">Sem faturamento registrado para esta conta.</div>
                )}
             </div>
          </section>

          {/* Mensagens e Logs */}
          <section className="space-y-6 pb-20">
             <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-4 h-4" /> Comunicações de Segurança
             </h3>
             <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-3xl p-8 space-y-6">
                {client.messages?.map((m: any) => (
                  <div key={m.id} className="border-l-2 border-blue-500/30 pl-6 py-2">
                     <p className="text-sm text-white/80 leading-relaxed">{m.content}</p>
                     <p className="text-[10px] text-white/20 font-mono mt-2">{new Date(m.createdAt).toLocaleString('pt-BR')}</p>
                  </div>
                ))}
                {client.messages?.length === 0 && <p className="text-xs text-white/20 italic">Sem registros de comunicação direta.</p>}
             </div>
          </section>

        </div>

      </motion.div>
    </>
  );
}
