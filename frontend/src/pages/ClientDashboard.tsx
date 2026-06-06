import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutGrid, FileText, CreditCard, FolderOpen, Zap, BarChart2,
  LogOut, CheckCircle2, Circle, Clock, ArrowUpRight, ChevronRight,
  Server, GitBranch, Globe, Activity, Shield, Download, UploadCloud,
  Check, Hourglass, AlertCircle, Bell, Search, Command, Settings, MessageSquare,
  X, DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { useToast } from "../contexts/ToastContext";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavId = "overview" | "contracts" | "payments" | "files" | "deployments" | "analytics" | "support" | "settings";

interface NavItem { id: NavId; label: string; icon: React.ElementType; }

const NAV: NavItem[] = [
  { id: "overview",     label: "Projetos",     icon: LayoutGrid },
  { id: "contracts",    label: "Contratos",    icon: FileText   },
  { id: "payments",     label: "Pagamentos",   icon: CreditCard },
  { id: "files",        label: "Arquivos",     icon: FolderOpen },
  { id: "support",      label: "Suporte",      icon: MessageSquare },
  { id: "deployments",  label: "Deployments",  icon: Zap        },
  { id: "analytics",    label: "Analytics",    icon: BarChart2  },
  { id: "settings",     label: "Configurações",icon: Settings   },
];

// Dynamic data logic is now handled in the components

// ─── Subcomponents ────────────────────────────────────────────────────────────
const StatusDot = ({ status }: { status: string }) => {
  const cls = status === "done" ? "bg-emerald-500" : status === "active" ? "bg-blue-500 animate-pulse" : "bg-white/10";
  return <span className={`w-2 h-2 rounded-full shrink-0 ${cls}`} />;
};

const ActivityIcon = ({ type }: { type: string }) => {
  const map: Record<string, [React.ElementType, string]> = {
    deploy:   [Zap,          "text-blue-400  bg-blue-400/10"],
    file:     [FolderOpen,   "text-amber-400 bg-amber-400/10"],
    payment:  [CreditCard,   "text-emerald-400 bg-emerald-400/10"],
    check:    [CheckCircle2, "text-white/60  bg-white/5"],
    git:      [GitBranch,    "text-purple-400 bg-purple-400/10"],
    contract: [FileText,     "text-white/60  bg-white/5"],
  };
  const [Icon, cls] = map[type] ?? [Activity, "text-white/40 bg-white/5"];
  return (
    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cls}`}>
      <Icon className="w-3.5 h-3.5" />
    </span>
  );
};

// ─── Panels ──────────────────────────────────────────────────────────────────
const PanelOverview = ({ clientData }: { clientData: any }) => {
  const projects = clientData.projects || [];
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const activeProjects = projects.filter((p: any) => p.status !== 'concluido' && p.phase !== 'concluido').length;
  const allTasks = projects.flatMap((p: any) => p.tasks || []);
  const pendingTasks = allTasks.filter((t: any) => t.status === 'pendente').length;
  const allInvoices = projects.flatMap((p: any) => p.invoices || []);
  const paidInvoices = allInvoices.filter((i: any) => i.status === 'paid').length;
  const pendingInvoicesAmount = allInvoices.filter((i: any) => i.status === 'pending' || i.status === 'partial').reduce((acc: number, cur: any) => acc + (cur.saldo || cur.amount), 0);
  const allDeploys = projects.flatMap((p: any) => p.deploys || []);
  const lastDeploy = allDeploys[0];

  const metrics = [
    { label: "Projetos Ativos",   value: activeProjects.toString(),    sub: "em andamento",      color: "#fff"        },
    { label: "Tarefas Pendentes", value: pendingTasks.toString(),    sub: "aguardando ação",  color: "#f59e0b"     },
    { label: "Faturas a Pagar",   value: `R$${pendingInvoicesAmount.toLocaleString('pt-BR')}`, sub: `${paidInvoices}/${allInvoices.length} pagas`,        color: "#10b981"     },
    { label: "Último Deploy",     value: lastDeploy ? (lastDeploy.status === 'success' ? 'Sucesso' : 'Falhou') : "N/A",  sub: "status atual",     color: "#3b82f6"     },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="relative mt-4"
          >
            <div className="absolute -top-4 left-0 w-16 h-4 bg-[#0c0c0c] rounded-t-lg" />
            <div className="bg-[#0c0c0c] rounded-2xl rounded-tl-none p-5 flex flex-col gap-3 hover:bg-[#0f0f0f] transition-colors h-full">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">{m.label}</span>
              <span className="text-2xl font-semibold tracking-tight" style={{ color: m.color }}>{m.value}</span>
              <span className="text-[11px] text-white/30">{m.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projects grid */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 block mb-4">Seus Projetos</span>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.length === 0 ? (
            <div className="text-white/40 text-sm">Nenhum projeto encontrado.</div>
          ) : projects.map((p: any) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedProject(p)}
              className="bg-[#0c0c0c] rounded-2xl rounded-tl-none p-6 cursor-pointer group transition-all relative mt-4 border border-transparent hover:border-white/10"
            >
              <div className="absolute -top-4 left-0 w-20 h-4 bg-[#0c0c0c] rounded-t-lg" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-semibold text-base tracking-tight mb-1">{p.name}</h3>
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{p.tipo || 'website'}</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30 border border-white/[0.08] px-2 py-1 rounded-lg bg-white/5">{p.status || p.phase}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-white/40">
                  <span>Progresso</span>
                  <span>{p.progresso || 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${p.progresso || 0}%` }}
                    className="h-full bg-blue-500" 
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-white/[0.03] mt-6">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                  <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'concluido' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} />
                  {p.status === 'concluido' ? 'Concluído' : 'Operação Ativa'}
                </span>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
                  Detalhes <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 md:p-6 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl h-full bg-[#080808] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-white/5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">{selectedProject.name}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">{selectedProject.status}</span>
                  </div>
                  <p className="text-sm text-white/40">Visão detalhada da execução técnica.</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                <section className="grid grid-cols-2 gap-4">
                   <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2">Entrega Prevista</p>
                      <p className="text-white font-medium">{selectedProject.dataEntregaPrevista ? new Date(selectedProject.dataEntregaPrevista).toLocaleDateString('pt-BR') : 'A definir'}</p>
                   </div>
                   <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2">Próximo Passo</p>
                      <p className="text-[#009EE3] font-bold">{selectedProject.proximaAcao || 'Em análise'}</p>
                   </div>
                </section>

                <section>
                   <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Checklist Operacional</h4>
                   <div className="space-y-2">
                      {selectedProject.tasks?.map((t: any) => (
                        <div key={t.id} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                          {t.isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-white/20" />}
                          <span className={`text-sm ${t.isCompleted ? 'text-white/30 line-through' : 'text-white/80'}`}>{t.title}</span>
                        </div>
                      ))}
                      {(!selectedProject.tasks || selectedProject.tasks.length === 0) && <p className="text-xs text-white/20 italic">Nenhuma tarefa listada ainda.</p>}
                   </div>
                </section>

                <section>
                   <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Clock className="w-3 h-3"/> Linha do Tempo</h4>
                   <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                      {selectedProject.timeline?.map((event: any, i: number) => (
                        <div key={i} className="relative pl-8">
                          <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-blue-500 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                          </div>
                          <p className="text-sm font-bold text-white/90">{event.titulo}</p>
                          <p className="text-xs text-white/40 mt-1 leading-relaxed">{event.descricao}</p>
                          <p className="text-[10px] font-mono text-white/20 mt-2">{new Date(event.createdAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                      ))}
                      {(!selectedProject.timeline || selectedProject.timeline.length === 0) && <p className="text-xs text-white/20 italic pl-8">Nenhum evento registrado.</p>}
                   </div>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PanelDeployments = ({ clientData }: { clientData: any }) => {
  const allDeploys = (clientData.projects || []).flatMap((p: any) => p.deploys || []);
  return (
    <div className="space-y-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 block mb-6">Infraestrutura Operacional</span>
      {allDeploys.length === 0 && <div className="text-white/40 text-sm">Nenhum deploy disponível.</div>}
      {allDeploys.map((item: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center justify-between px-5 py-4 bg-[#0c0c0c] rounded-2xl rounded-tl-none transition-colors relative mt-4"
        >
          <div className="absolute -top-3 left-0 w-16 h-3 bg-[#0c0c0c] rounded-t-lg" />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white/40" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-white/25">{item.ambiente || 'production'}</span>
              <span className="text-sm font-medium text-white/80">{item.url || 'URL não disponível'}</span>
            </div>
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-lg ${
            item.status === "success" ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20" :
                                       "text-blue-400   bg-blue-400/10   border border-blue-400/20"
          }`}>{item.status}</span>
        </motion.div>
      ))}
    </div>
  );
};

const PanelFiles = ({ clientData }: { clientData: any }) => {
  const allFiles = (clientData.projects || []).flatMap((p: any) => p.files || []);
  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-40 bg-[#0c0c0c] rounded-2xl rounded-tl-none cursor-pointer group transition-colors relative mt-4">
        <div className="absolute -top-4 left-0 w-24 h-4 bg-[#0c0c0c] rounded-t-lg" />
        <UploadCloud className="w-7 h-7 text-white/20 group-hover:text-white/50 mb-2 transition-colors" />
        <span className="text-sm text-white/50">Solte seus arquivos aqui</span>
        <span className="text-[11px] text-white/25 mt-1">Logo, fotos, textos, referências</span>
        <input type="file" multiple className="hidden" />
      </label>
      <div className="space-y-2">
        {allFiles.length === 0 && <div className="text-white/40 text-sm">Nenhum arquivo encontrado.</div>}
        {allFiles.map((f: any, i: number) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 bg-[#0c0c0c] rounded-2xl rounded-tl-none group transition-colors relative mt-3">
            <div className="absolute -top-3 left-0 w-12 h-3 bg-[#0c0c0c] rounded-t-lg" />
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
              <span className="text-sm text-white/60">{f.originalName || f.fileName}</span>
            </div>
            <a href={`${API_URL}${f.path}`} target="_blank" rel="noreferrer">
              <Download className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors cursor-pointer" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const PanelPayments = ({ clientData }: { clientData: any }) => {
  const navigate = useNavigate();
  const allInvoices = (clientData.projects || []).flatMap((p: any) => (p.invoices || []).map((i: any) => ({ ...i, projectName: p.name })));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 block">Extrato Financeiro</span>
      </div>
      
      {allInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 bg-[#0c0c0c] rounded-2xl border border-white/[0.03]">
          <CreditCard className="w-8 h-8 text-white/10 mb-3" />
          <span className="text-xs text-white/20">Nenhuma fatura pendente ou liquidada.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {allInvoices.map((inv: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-[#0c0c0c] border border-white/[0.05] hover:border-white/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/90">{inv.description}</h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{inv.projectName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm font-mono font-bold text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.amount)}
                  </p>
                  <p className={`text-[9px] font-bold uppercase tracking-tighter mt-0.5 ${
                    inv.status === 'paid' ? 'text-emerald-500' : 'text-amber-500'
                  }`}>
                    {inv.status === 'paid' ? 'Liquidado' : 'Aguardando Pagamento'}
                  </p>
                </div>
                
                {inv.status !== 'paid' && (
                  <button 
                    onClick={() => navigate(`/payment?invoiceId=${inv.id}`)}
                    className="px-5 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors"
                  >
                    Pagar Agora
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const PanelContracts = ({ clientData }: { clientData: any }) => {
  const allContracts = (clientData.projects || []).flatMap((p: any) => (p.contracts || []).filter((c:any) => c.visivelCliente).map((c: any) => ({ ...c, projectName: p.name })));

  return (
    <div className="space-y-6">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 block mb-2">Instrumentos Jurídicos</span>
      
      {allContracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 bg-[#0c0c0c] rounded-2xl border border-white/[0.03]">
          <Shield className="w-8 h-8 text-white/10 mb-3" />
          <span className="text-xs text-white/20">Nenhum contrato disponível para visualização.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allContracts.map((c: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0c0c0c] border border-white/[0.05] p-6 rounded-2xl flex flex-col justify-between h-full group hover:border-white/20 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white/40" />
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${
                  c.status === 'assinado' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-amber-400 border-amber-400/20 bg-amber-400/10'
                }`}>
                  {c.status}
                </span>
              </div>
              
              <div>
                <h4 className="text-base font-bold text-white/90 mb-1">{c.titulo}</h4>
                <p className="text-[11px] text-white/30">{c.projectName}</p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/[0.03] flex justify-between items-center">
                <span className="text-[10px] text-white/20 font-mono">v{c.versao}</span>
                <a href={c.fileUrl} target="_blank" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  Visualizar <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const PanelPlaceholder = ({ label, items = [] }: { label: string, items?: any[] }) => (
  <div className="flex flex-col space-y-4">
    <h2 className="text-xl font-semibold mb-4 text-white">{label}</h2>
    {items.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-64 bg-[#0c0c0c] rounded-2xl rounded-tl-none relative mt-4 border border-white/5">
        <div className="absolute -top-4 left-0 w-24 h-4 bg-[#0c0c0c] rounded-t-lg" />
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">Nenhum dado disponível</span>
      </div>
    ) : (
      <div className="space-y-2">
         {items.map((it, i) => (
             <div key={i} className="p-4 bg-[#0c0c0c] rounded-2xl rounded-tl-none text-sm relative mt-4 border border-white/5">
               <div className="absolute -top-3 left-0 w-16 h-3 bg-[#0c0c0c] rounded-t-lg" />
               <pre className="text-[10px] text-white/40 overflow-auto">{JSON.stringify(it, null, 2)}</pre>
             </div>
         ))}
      </div>
    )}
  </div>
);

const PanelSupport = ({ clientData }: { clientData: any }) => {
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const { showToast } = useToast();

  const send = async () => {
    if (!msg.trim()) return;
    const projectId = clientData.projects?.[0]?.id;
    if (!projectId) {
      showToast("Nenhum projeto ativo encontrado para vincular esta mensagem.", "warning");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/v2/projects/${projectId}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
        },
        body: JSON.stringify({
          senderType: 'client',
          senderName: clientData.name,
          content: msg,
          clientId: clientData.id
        })
      });
      if (!res.ok) throw new Error();
      showToast("Mensagem enviada para o time técnico.", "success");
      setMsg("");
    } catch {
      showToast("Falha ao transmitir sinal. Tente novamente.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Suporte & Comunicação</h2>
        <p className="text-sm text-white/40">Abra um chamado direto com nosso time de engenharia.</p>
      </div>

      <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-3xl p-8 space-y-6 relative mt-4">
        <div className="absolute -top-4 left-0 w-24 h-4 bg-[#0c0c0c] rounded-t-lg" />
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Descreva sua solicitação</label>
          <textarea 
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="Ex: Preciso atualizar os textos da home..."
            className="w-full h-40 bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-white text-sm outline-none focus:border-blue-500/50 transition-all resize-none"
          />
        </div>
        <button 
          onClick={send}
          disabled={sending || !msg.trim()}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {sending ? "Transmitindo..." : "Enviar Mensagem"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-400/50 uppercase tracking-widest">Tempo de Resposta</p>
            <p className="text-sm text-white font-medium">Média de 2 horas</p>
          </div>
        </div>
        <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-widest">Canal Seguro</p>
            <p className="text-sm text-white font-medium">Criptografia E2E</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PanelSettings = () => (
  <div className="space-y-6">
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight mb-2">Configurações</h2>
      <p className="text-sm text-white/40 max-w-xl">Gerencie as preferências da sua conta e configurações do sistema.</p>
    </div>
    <div className="flex flex-col gap-2 max-w-sm">
      {["Perfil", "Segurança", "Notificações", "Aparência", "Faturamento", "API Keys"].map((item) => (
        <button key={item} className="w-full flex items-center justify-between p-4 bg-[#0c0c0c] rounded-2xl rounded-tl-none transition-colors text-left group relative mt-3">
          <div className="absolute -top-3 left-0 w-16 h-3 bg-[#0c0c0c] rounded-t-lg" />
          <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{item}</span>
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
        </button>
      ))}
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ClientDashboard() {
  const navigate  = useNavigate();
  const { showToast } = useToast();
  const [active, setActive]     = useState<NavId>("overview");
  const [clientData, setClient] = useState<any>(null);
  const [loading, setLoading]   = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientId");
    navigate("/portal");
  };

  useEffect(() => {
    const token = localStorage.getItem("clientToken");
    if (!token) { navigate("/portal"); return; }
    fetch(`${API_URL}/api/clients/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { 
        setClient(d); 
        setLoading(false); 
        showToast(`Bem-vindo de volta!`, 'success');
      })
      .catch(() => { localStorage.removeItem("clientToken"); localStorage.removeItem("clientId"); navigate("/portal"); });
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/20 animate-pulse">Inicializando ambiente...</span>
    </div>
  );
  if (!clientData) return null;

  const projects = clientData.projects || [];
  const initials = clientData.name?.substring(0, 2).toUpperCase() ?? "TE";

  const panels: Record<NavId, React.ReactNode> = {
    overview:    <PanelOverview clientData={clientData} />,
    deployments: <PanelDeployments clientData={clientData} />,
    files:       <PanelFiles clientData={clientData} />,
    contracts:   <PanelContracts clientData={clientData} />,
    payments:    <PanelPayments clientData={clientData} />,
    support:     <PanelSupport clientData={clientData} />,
    analytics:   <PanelPlaceholder label="Analytics" items={(clientData.projects || []).flatMap((p:any) => p.integrations || [])} />,
    settings:    <PanelSettings />,
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#e8e8e8] font-sans flex">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className="w-[220px] shrink-0 flex flex-col sticky top-0 h-screen bg-[#060606]">
        {/* Logo */}
        <div className="px-5 h-14 flex items-center">
          <div className="w-6 h-6 flex items-center justify-center mr-3">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Portal</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] transition-all ${
                  isActive
                    ? "bg-white/[0.07] text-white font-medium"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-white/30"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-3 pb-4 pt-4">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white/70 shrink-0">{initials}</div>
            <div className="flex-1 min-w-0">
              <span className="block text-[12px] font-medium truncate">{clientData.name}</span>
              <span className="block text-[10px] text-white/25 font-mono">Cliente Ativo</span>
            </div>
            <button onClick={() => { localStorage.removeItem("clientToken"); navigate("/portal"); }}>
              <LogOut className="w-3.5 h-3.5 text-white/20 hover:text-white/60 transition-colors" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-8 bg-[#060606] sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-bold tracking-tight">
              {active === "overview" ? "Bem-vindo à sua operação." : NAV.find(n => n.id === active)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/30 hover:text-white/60 text-[12px] font-mono transition-colors">
              <Search className="w-3 h-3" />
              <span>Buscar</span>
              <span className="flex items-center gap-0.5 text-white/15"><Command className="w-2.5 h-2.5" />K</span>
            </button>
            <button className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white/60 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content + Activity */}
        <div className="flex flex-1 min-h-0">

          {/* Panel */}
          <main className="flex-1 overflow-y-auto p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {panels[active]}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Activity Feed */}
          <aside className="w-[260px] shrink-0 overflow-y-auto p-5 hidden xl:block">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 block mb-5">Atividade Recente</span>
            <div className="space-y-4">
              {clientData.projects?.flatMap((p: any) => p.timeline || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10).map((a: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 items-start"
                >
                  <ActivityIcon type={a.tipo} />
                  <div>
                    <p className="text-[12px] text-white/60 leading-snug">{a.descricao}</p>
                    <span className="text-[10px] text-white/20 font-mono mt-1 block">{new Date(a.createdAt).toLocaleString('pt-BR')}</span>
                  </div>
                </motion.div>
              ))}
              {(!clientData.projects || clientData.projects.flatMap((p: any) => p.timeline || []).length === 0) && (
                <div className="text-white/40 text-sm">Nenhuma atividade recente.</div>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
