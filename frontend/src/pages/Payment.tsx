import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  LayoutGrid, FolderOpen, CreditCard, MessageSquare, Layers,
  Shield, Check, ArrowRight, ArrowLeft, QrCode, Copy,
  Clock, Package, Zap, Lock, Star, ChevronRight, CheckCircle2, AlertCircle, AlertTriangle, X
} from "lucide-react";
import { API_URL } from "../config";
import { RotatingText } from "../components/RotatingText";
import fundoBg from "../assets/linux-lab.svg";

// ─── Types ───────────────────────────────────────────────────────────────────
type Method = "pix" | "card";
type NavId  = "dashboard" | "projetos" | "materiais" | "pagamentos" | "mensagens";

// ─── Constants ───────────────────────────────────────────────────────────────
const PIX_KEY = "devthomaseduardo@gmail.com";

const NAV: { id: NavId; label: string; icon: React.ElementType }[] = [
  { id: "dashboard",  label: "Dashboard",  icon: LayoutGrid   },
  { id: "projetos",   label: "Projetos",   icon: Layers       },
  { id: "materiais",  label: "Materiais",  icon: FolderOpen   },
  { id: "pagamentos", label: "Pagamentos", icon: CreditCard   },
  { id: "mensagens",  label: "Mensagens",  icon: MessageSquare},
];

const STEPS = [
  { num: "01", label: "Briefing",   done: true  },
  { num: "02", label: "Materiais",  done: true  },
  { num: "03", label: "Pagamento",  done: false },
  { num: "04", label: "Execução",   done: false },
];

// ─── Components ─────────────────────────────────────────────────────────────

const SidebarInfo = ({ b, i }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.08 }}
    className="flex gap-3 p-3 rounded-xl border border-transparent hover:border-white/[0.07] hover:bg-white/[0.02] transition-all"
  >
    <div className="w-7 h-7 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center shrink-0 mt-0.5">
      <b.icon className="w-3.5 h-3.5 text-white/35" />
    </div>
    <div>
      <span className="block text-[12px] font-semibold text-white/70 mb-0.5">{b.title}</span>
      <span className="block text-[11px] text-white/25 leading-relaxed">{b.desc}</span>
    </div>
  </motion.div>
);

const PaidState = ({ invoice, onBack }: { invoice: any, onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="max-w-2xl mx-auto py-20 px-8 text-center"
  >
    <div className="relative mb-10 inline-block">
       <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <CheckCircle2 className="w-12 h-12 text-emerald-400" strokeWidth={1.5} />
       </div>
       <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-4 bg-emerald-500/5 blur-2xl rounded-full -z-10"
       />
    </div>

    <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Pagamento Liquidado</h2>
    <p className="text-zinc-400 text-lg mb-12 max-w-md mx-auto">
      Tudo pronto! Seu investimento foi processado e sua operação técnica está em andamento.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
       <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-left">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Valor Total</span>
          <p className="text-xl font-bold text-white">R$ {invoice.amount.toLocaleString('pt-BR')}</p>
       </div>
       <div className="bg-emerald-500/[0.03] border border-emerald-500/10 p-6 rounded-2xl text-left">
          <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest block mb-1">Saldo Devedor</span>
          <p className="text-xl font-bold text-emerald-400">R$ 0,00</p>
       </div>
    </div>

    <div className="space-y-4">
       <button 
          onClick={onBack}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
       >
          <LayoutGrid className="w-4 h-4" /> Voltar ao Dashboard
       </button>
       <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">Comprovante enviado para {invoice.project.client.email}</p>
    </div>
  </motion.div>
);

const PendingState = ({ invoice, method, setMethod, processing, handlePay, statusMessage }: any) => {
  if (!invoice) return null;

  const amount = invoice?.saldo || invoice?.amount || 0;
  const paid = invoice?.valorPago || 0;
  const total = invoice?.amount || 0;

  return (
    <div className="px-10 py-10 grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-12 items-start">
      
      {/* Coluna Esquerda: Detalhamento */}
      <div className="space-y-8">
        <div className="border border-white/[0.07] bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/50 via-[#009EE3]/50 to-emerald-500/50" />
          
          <div className="px-8 py-6 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">Extrato de Faturamento</span>
              <h3 className="text-lg font-bold text-white/90 mt-1">{invoice?.description}</h3>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                invoice?.status === 'overdue' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
              }`}>
                {invoice?.status === 'overdue' ? 'Vencido' : 'Pendente'}
              </span>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Indicador de Pagamento Parcial */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs text-white/40 font-medium">Progresso de Liquidação</span>
                <span className="text-xs text-white/60 font-mono">{Math.round((paid/total)*100)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(paid/total)*100}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/30 uppercase">Total do Contrato</span>
                <p className="text-lg font-bold text-white/90">R$ {total.toLocaleString('pt-BR')}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/30 uppercase">Já Liquidado</span>
                <p className="text-lg font-bold text-emerald-400">R$ {paid.toLocaleString('pt-BR')}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400/50 uppercase">Saldo em Aberto</span>
                <p className="text-xl font-bold text-amber-400 underline decoration-amber-400/20 underline-offset-4">R$ {amount.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 bg-white/[0.01] border-t border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/30">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Vencimento: {invoice?.vencimento ? new Date(invoice.vencimento).toLocaleDateString('pt-BR') : 'A definir'}</span>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-tighter">Fatura: {invoice?.id?.split('-')[0]}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-[#009EE3]/10 text-[#009EE3] rounded-xl flex items-center justify-center">
                 <Zap className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-xs font-bold text-white/80">Início Imediato</p>
                 <p className="text-[11px] text-white/30">Após o reconhecimento, seu projeto avança para a próxima fase.</p>
              </div>
           </div>
           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
                 <Shield className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-xs font-bold text-white/80">Pagamento Blindado</p>
                 <p className="text-[11px] text-white/30">Processamento com criptografia SSL de 256 bits.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Coluna Direita: Checkout */}
      <div className="space-y-6">
        <div className="flex gap-3">
          {(["pix", "card"] as Method[]).map(m => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 p-5 rounded-2xl border transition-all text-left group ${
                method === m ? "bg-white/5 border-white/20 shadow-2xl" : "bg-[#0c0c0c] border-white/5 hover:border-white/10"
              }`}
            >
              {m === "pix" ? <QrCode className={`w-5 h-5 mb-2 ${method === m ? 'text-white' : 'text-white/20'}`} /> : <CreditCard className={`w-5 h-5 mb-2 ${method === m ? 'text-white' : 'text-white/20'}`} />}
              <p className={`text-sm font-bold uppercase tracking-widest ${method === m ? 'text-white' : 'text-white/40'}`}>{m === "pix" ? 'Pix' : 'Cartão'}</p>
              <p className="text-[10px] text-white/20 mt-1">{m === "pix" ? 'Confirmação na hora' : 'Crédito ou Débito'}</p>
            </button>
          ))}
        </div>

        <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5">
             <span className="text-[10px] font-mono uppercase text-white/30">Total a Liquidar</span>
             <p className="text-3xl font-bold text-white mt-1">R$ {amount.toLocaleString('pt-BR')}</p>
          </div>

          <AnimatePresence mode="wait">
             {method === 'pix' ? (
                <motion.div key="pix" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="p-8 text-center space-y-6">
                   <div className="w-40 h-40 bg-white p-4 rounded-2xl mx-auto shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                      <QrCode className="w-full h-full text-black" strokeWidth={1} />
                   </div>
                   <div className="space-y-2">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Chave PIX</span>
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4 group">
                         <span className="text-xs text-white/60 font-mono truncate">{PIX_KEY}</span>
                         <button onClick={() => { navigator.clipboard.writeText(PIX_KEY); }} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/20 hover:text-white"><Copy className="w-4 h-4"/></button>
                      </div>
                   </div>
                </motion.div>
             ) : (
                <motion.div key="card" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="p-12 text-center">
                   <CreditCard className="w-12 h-12 text-white/10 mx-auto mb-4" />
                   <p className="text-sm text-white/40">Checkout Mercado Pago seguro</p>
                   <p className="text-[10px] text-white/20 mt-2 font-mono">ACEITAMOS TODAS AS BANDEIRAS</p>
                </motion.div>
             )}
          </AnimatePresence>

          <div className="p-6 pt-0">
             <button 
                onClick={handlePay}
                disabled={processing}
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
             >
                {processing ? "Sincronizando..." : "Iniciar Pagamento Seguro"}
             </button>
             {statusMessage && (
               <div className={`mt-4 p-4 rounded-xl text-xs font-medium border text-center ${
                 statusMessage.includes('confirmado') ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-rose-500/5 text-rose-400 border-rose-400/10'
               }`}>
                 {statusMessage}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ amount, projectData }: any) => {
  const navigate = useNavigate();
  return (
    <aside className="w-full xl:w-[440px] bg-[#0A0A0A] border-b xl:border-b-0 xl:border-r border-white/5 flex flex-col shrink-0 overflow-hidden xl:h-screen sticky top-0 z-[70]">
      <div className="absolute inset-0 z-0">
        <img src={fundoBg} alt="Background" className="w-full h-full object-cover opacity-10 grayscale mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      </div>

      <div className="relative z-10 p-6 md:p-10 flex flex-col h-full">
        <button 
          onClick={() => navigate("/portal/dashboard")}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-12 md:mb-20"
        >
          <ArrowLeft className="w-3 h-3" /> Voltar ao Painel
        </button>

        <div className="mt-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-[0.2em] uppercase">Checkout Seguro</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-none mb-6">
            Finalize sua <br /> <span className="text-white/40">operação técnica.</span>
          </h2>
          
          <div className="space-y-4 md:space-y-6 pt-6 border-t border-white/5">
            <div className="flex justify-between items-end">
               <div>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">Total da Liquidação</p>
                  <p className="text-2xl md:text-4xl font-bold text-white tracking-tight">R$ {amount.toLocaleString('pt-BR')}</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.2em] mb-1">Status</p>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Aguardando</p>
               </div>
            </div>

            {projectData && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-[10px] font-mono text-white/20 uppercase mb-2">Projeto Vinculado</p>
                <p className="text-sm font-semibold text-white/90">{projectData.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="hidden xl:grid grid-cols-1 gap-2 mt-12">
          {[
            { icon: Shield, title: "Segurança", desc: "Processamento criptografado" },
            { icon: Zap, title: "Velocidade", desc: "Liberação em tempo real" }
          ].map((b, i) => (
            <SidebarInfo key={i} b={b} i={i} />
          ))}
        </div>
      </div>
    </aside>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("pix");
  const [invoice, setInvoice] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const amount = invoice?.saldo || invoice?.amount || 0;

  const loadInvoice = async () => {
    const token = localStorage.getItem("clientToken");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("invoiceId");

    if (!token || !id) { navigate("/portal"); return; }

    try {
      const res = await fetch(`${API_URL}/api/v2/invoices/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao carregar fatura");
      setInvoice(data);
    } catch (err: any) {
      setStatusMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadInvoice(); }, []);

  const handlePay = async () => {
    if (!invoice?.id) return;
    
    if (method === 'pix') {
       setStatusMessage("Pix copiado! Realize a transferência e nos envie o comprovante.");
       return;
    }

    setProcessing(true);
    try {
      const token = localStorage.getItem("clientToken");
      const res = await fetch(`${API_URL}/api/v2/payments/intent`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha ao gerar checkout.");
      if (data.init_point) window.location.href = data.init_point;
    } catch (error: any) {
      setStatusMessage(error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
     return (
        <div className="min-h-screen bg-[#060606] flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Validando Transação...</span>
           </div>
        </div>
     );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-2xl font-bold text-white tracking-tight">Falha na Operação</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {statusMessage || "Não foi possível recuperar os dados desta fatura. Certifique-se de que o link está correto ou entre em contato com o suporte."}
          </p>
          <button 
            onClick={() => navigate('/portal/dashboard')}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-200 transition-all"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-emerald-500/30 flex flex-col xl:flex-row">
      
      <Sidebar amount={amount} projectData={invoice?.project} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 sticky top-0 z-[60]">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <img src="/logo-preta-branca.png" alt="Logo" className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Checkout de Engenharia</h1>
              <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest hidden sm:block">Ambiente de Liquidação Seguro</p>
            </div>
          </div>
          <button onClick={() => navigate('/portal/dashboard')} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </header>

        <main className="max-w-[1400px] mx-auto w-full flex-1">
          
          {/* Breadcrumb / Progress */}
          <div className="px-6 md:px-10 pt-8 md:pt-12">
             <div className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {STEPS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                     <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold ${
                        s.done ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                        s.num === "03" ? 'bg-white/10 border-white/30 text-white' : 'border-white/5 text-white/20'
                     }`}>
                        {s.done ? <Check className="w-3.5 h-3.5" /> : s.num}
                     </div>
                     <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${s.num === "03" ? 'text-white' : 'text-white/20'}`}>{s.label}</span>
                     {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-white/5" />}
                  </div>
                ))}
             </div>
          </div>

          <AnimatePresence mode="wait">
            {invoice?.status === 'paid' ? (
              <PaidState invoice={invoice} onBack={() => navigate('/portal/dashboard')} />
            ) : (
              <PendingState 
                invoice={invoice} 
                method={method} 
                setMethod={setMethod} 
                processing={processing}
                handlePay={handlePay}
                statusMessage={statusMessage}
              />
            )}
          </AnimatePresence>

        </main>

        {/* Global Footer (Trust) */}
        <footer className="mt-12 md:mt-20 border-t border-white/5 px-6 md:px-10 py-12 bg-black/20">
           <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                 { icon: Shield, title: "Criptografia", desc: "Dados protegidos por SSL de nível bancário." },
                 { icon: Lock, title: "Privacidade", desc: "Suas informações nunca são compartilhadas." },
                 { icon: Star, title: "Autoridade", desc: "Soluções desenvolvidas com rigor técnico." },
                 { icon: Zap, title: "Performance", desc: "Reconhecimento de pagamento instantâneo." }
              ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                    <item.icon className="w-5 h-5 text-white/20 shrink-0" />
                    <div>
                       <h4 className="text-xs font-bold text-white/80 uppercase tracking-widest">{item.title}</h4>
                       <p className="text-[11px] text-white/30 leading-relaxed mt-1">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
           <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-white/10 font-mono uppercase tracking-[0.3em] text-center sm:text-left">Thomas Eduardo | Engenharia de Software</p>
              <p className="text-[10px] text-white/10 font-mono">© 2026</p>
           </div>
        </footer>

      </div>
    </div>
  );
}
