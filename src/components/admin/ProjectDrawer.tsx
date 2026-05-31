import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, LayoutDashboard, Clock, CheckSquare, FileText, 
  DollarSign, Briefcase, Rocket, BarChart3, Plus, 
  Trash2, CheckCircle2, Circle, Eye, EyeOff, Activity, AlertTriangle
} from "lucide-react";
import { useProjectDrawer } from "./useProjectDrawer";
import { TimelineSkeleton } from "./Loaders";
import { Modal } from "../ui/Modal";

export function ProjectDrawer({ projectId, onClose }: { projectId: string; onClose: () => void }) {
  const { 
    tab, setTab, project, loading, toast, loadProject, updateProject,
    timeline, addTimelineEvent, deleteTimelineEvent, toggleTimelineVisibility,
    tasks, addTask, updateTask, deleteTask,
    invoices, addInvoice, registerPayment, deleteInvoice,
  } = useProjectDrawer(projectId, () => {}); // No need to refresh kanban for every internal change unless closed

  // Estados dos Modais Personalizados
  const [taskModal, setTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState("");
  
  const [timelineModal, setTimelineModal] = useState(false);
  const [timelineTitle, setTimelineTitle] = useState("");

  useEffect(() => { loadProject(projectId); }, [projectId, loadProject]);

  if (loading || !project) {
    return (
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-4xl bg-[#050505] border-l border-white/[0.06] z-50 shadow-2xl p-8 flex flex-col pt-16">
        <TimelineSkeleton />
      </motion.div>
    );
  }

  const totalFaturado = invoices?.reduce((s: number, i: any) => s + (i.amount ?? 0), 0) ?? 0;
  const totalPago = invoices?.reduce((s: number, i: any) => s + (i.valorPago ?? 0), 0) ?? 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full max-w-4xl bg-[#050505] border-l border-white/[0.06] z-50 shadow-2xl flex flex-col">
        
        {/* Header Fixo */}
        <header className="px-6 py-5 md:px-10 md:py-8 border-b border-white/[0.06] flex items-center justify-between shrink-0 bg-[#0A0A0A]">
          <div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">{project.name}</h2>
              <span className="px-2 py-0.5 rounded text-[9px] md:text-[10px] font-mono uppercase bg-white/5 text-white/50 border border-white/10">{project.client?.name}</span>
            </div>
            <p className="text-[10px] md:text-xs text-white/40 font-mono">ID: {project.id}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors shrink-0">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </header>

        {/* Content Scrollável */}
        <div className="flex-1 overflow-y-auto p-5 md:p-10 space-y-8 md:space-y-10 custom-scrollbar">
          
          {/* Sessão 1: Controle Operacional (Overview Bento) */}
          <section>
            <h3 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity className="w-3 h-3 md:w-4 md:h-4" /> Controle Operacional</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-5 md:p-6 flex flex-col">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">Progresso ({project.progresso ?? 0}%)</p>
                <div className="mt-auto h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#009EE3] to-blue-400 rounded-full" style={{ width: `${project.progresso ?? 0}%` }} />
                </div>
              </div>
              <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Status Atual</p>
                <select value={project.status ?? "briefing"} onChange={e => updateProject({ status: e.target.value })}
                  className="w-full bg-transparent text-lg font-semibold text-white outline-none cursor-pointer appearance-none border-b border-white/10 pb-1 focus:border-[#009EE3] transition-colors">
                  <option value="briefing" className="bg-[#050505]">Briefing / Onboarding</option>
                  <option value="aguardando_material" className="bg-[#050505]">Aguardando Material</option>
                  <option value="em_design" className="bg-[#050505]">Em Design</option>
                  <option value="em_desenvolvimento" className="bg-[#050505]">Em Desenvolvimento</option>
                  <option value="em_revisao" className="bg-[#050505]">Em Revisão</option>
                  <option value="concluido" className="bg-[#050505]">Concluído</option>
                </select>
              </div>
              <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Próxima Ação (Next Step)</p>
                <input type="text" value={project.proximaAcao ?? ""} onChange={e => updateProject({ proximaAcao: e.target.value })}
                  placeholder="Definir ação imediata..."
                  className="w-full bg-transparent text-sm text-[#009EE3] font-medium placeholder-white/20 outline-none border-b border-transparent focus:border-[#009EE3]/50 pb-1 transition-colors" />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* Coluna Esquerda: Tarefas & Financeiro */}
            <div className="space-y-8 md:space-y-10">
              
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><CheckSquare className="w-4 h-4" /> Checklist do Projeto</h3>
                  <button onClick={() => setTaskModal(true)} 
                    className="text-[10px] uppercase font-mono text-[#009EE3] hover:underline">
                    + Adicionar
                  </button>
                </div>
                <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.04]">
                  {tasks.length === 0 ? (
                    <div className="p-6 text-center text-white/20 text-xs font-mono">Sem tarefas pendentes.</div>
                  ) : (
                    tasks.map(t => (
                      <div key={t.id} className="group flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateTask(t.id, { isCompleted: !t.isCompleted })} className={t.isCompleted ? "text-emerald-400" : "text-white/20 hover:text-white/50"}>
                            {t.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                          </button>
                          <span className={`text-sm ${t.isCompleted ? "text-white/30 line-through" : "text-white/80"}`}>{t.title}</span>
                        </div>
                        <button onClick={() => deleteTask(t.id)} className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-opacity">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><DollarSign className="w-4 h-4" /> Resumo Financeiro</h3>
                  <button onClick={() => setInvoiceModal(true)} 
                    className="text-[10px] uppercase font-mono text-[#009EE3] hover:underline">
                    + Fatura
                  </button>
                </div>
                <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-[10px] font-mono text-white/30 uppercase">Faturado</p>
                      <p className="text-xl font-bold text-white">R$ {totalFaturado.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-emerald-400/50 uppercase">Recebido</p>
                      <p className="text-xl font-bold text-emerald-400">R$ {totalPago.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                  {invoices?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
                      {invoices.map((inv: any) => (
                        <div key={inv.id} className="group flex justify-between items-center text-xs">
                          <span className="text-white/50">{new Date(inv.dueDate || inv.createdAt).toLocaleDateString('pt-BR')}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-white/90 font-medium">R$ {inv.amount}</span>
                            {inv.status === 'paid' ? (
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">PAGO</span>
                            ) : (
                              <button onClick={() => registerPayment(inv.id, inv.amount, 'Pix')} className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 hover:bg-amber-400/20 transition-colors">PENDENTE</button>
                            )}
                            <button onClick={() => deleteInvoice(inv.id)} className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-opacity" title="Remover Fatura">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

            </div>

            {/* Coluna Direita: Timeline Operacional */}
            <section className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-5 md:p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h3 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3 md:w-4 md:h-4" /> Timeline</h3>
                <button onClick={() => setTimelineModal(true)} 
                  className="text-[10px] uppercase font-mono text-[#009EE3] hover:underline shrink-0">
                  + Registrar
                </button>
              </div>
              <div className="relative pl-6 space-y-6 flex-1 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/[0.06]">
                {timeline.map(ev => (
                  <div key={ev.id} className="relative group">
                    <div className="absolute left-[-29px] top-1.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-[#009EE3]" />
                    <div className="bg-[#050505] border border-white/[0.04] rounded-xl p-3 md:p-4 hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h4 className="text-[13px] md:text-sm font-medium text-white/90 leading-tight">{ev.title}</h4>
                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button onClick={() => toggleTimelineVisibility(ev)} className="text-white/30 hover:text-white" title="Visibilidade Cliente">
                            {ev.visivelCliente ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => deleteTimelineEvent(ev.id)} className="text-white/30 hover:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[9px] md:text-[10px] font-mono text-white/30">{new Date(ev.createdAt).toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                ))}
                {timeline.length === 0 && <p className="text-[10px] md:text-xs text-white/20 font-mono italic">Sem histórico registrado.</p>}
              </div>
            </section>
          </div>

        </div>

        {/* Toast Local Personalizado */}
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border backdrop-blur-xl z-[60] max-w-[90vw] md:max-w-md ${
              toast.type === "error" 
                ? "bg-rose-500/10 border-rose-500/20 text-rose-200" 
                : "bg-[#009EE3]/10 border-[#009EE3]/20 text-white/90"
            }`}>
            {toast.type === "error" ? <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#009EE3] shrink-0" />}
            <span className="text-xs md:text-sm font-medium tracking-wide">{toast.msg}</span>
          </motion.div>
        )}
        {/* Modais Secundários */}
        <Modal isOpen={taskModal} onClose={() => setTaskModal(false)} title="Nova Tarefa" maxWidth="sm"
          footer={
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => setTaskModal(false)} className="flex-1 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5">Cancelar</button>
              <button onClick={() => { if(taskTitle) { addTask({ title: taskTitle }); setTaskTitle(""); setTaskModal(false); } }} 
                className="flex-1 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90">Adicionar Tarefa</button>
            </div>
          }>
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Descrição da Tarefa</label>
            <input type="text" autoFocus value={taskTitle} onChange={e => setTaskTitle(e.target.value)} onKeyDown={e => { if(e.key === 'Enter' && taskTitle) { addTask({ title: taskTitle }); setTaskTitle(""); setTaskModal(false); } }}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="Ex: Configurar DNS..." />
          </div>
        </Modal>

        <Modal isOpen={invoiceModal} onClose={() => setInvoiceModal(false)} title="Nova Fatura" maxWidth="sm"
          footer={
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => setInvoiceModal(false)} className="flex-1 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5">Cancelar</button>
              <button onClick={() => { if(invoiceAmount) { addInvoice({ amount: parseFloat(invoiceAmount) }); setInvoiceAmount(""); setInvoiceModal(false); } }} 
                className="flex-1 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90">Gerar Fatura</button>
            </div>
          }>
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Valor da Fatura (R$)</label>
            <input type="number" autoFocus value={invoiceAmount} onChange={e => setInvoiceAmount(e.target.value)} onKeyDown={e => { if(e.key === 'Enter' && invoiceAmount) { addInvoice({ amount: parseFloat(invoiceAmount) }); setInvoiceAmount(""); setInvoiceModal(false); } }}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors font-mono" placeholder="Ex: 5000" />
          </div>
        </Modal>

        <Modal isOpen={timelineModal} onClose={() => setTimelineModal(false)} title="Registrar Evento" maxWidth="sm"
          footer={
            <div className="flex items-center gap-3 w-full">
              <button onClick={() => setTimelineModal(false)} className="flex-1 py-2 rounded-lg text-sm font-medium text-white/50 hover:bg-white/5">Cancelar</button>
              <button onClick={() => { if(timelineTitle) { addTimelineEvent({ title: timelineTitle, visivelCliente: true }); setTimelineTitle(""); setTimelineModal(false); } }} 
                className="flex-1 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-white/90">Salvar Registro</button>
            </div>
          }>
          <div>
            <label className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1.5">O que aconteceu?</label>
            <input type="text" autoFocus value={timelineTitle} onChange={e => setTimelineTitle(e.target.value)} onKeyDown={e => { if(e.key === 'Enter' && timelineTitle) { addTimelineEvent({ title: timelineTitle, visivelCliente: true }); setTimelineTitle(""); setTimelineModal(false); } }}
              className="w-full bg-[#050505] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 transition-colors" placeholder="Ex: Reunião de alinhamento concluída" />
          </div>
        </Modal>

      </motion.div>
    </>
  );
}
