import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid, FolderOpen, CreditCard, MessageSquare, Layers,
  Shield, Check, ArrowRight, ArrowLeft, QrCode, Copy,
  Clock, Package, Zap, Lock, Star, ChevronRight
} from "lucide-react";
import { API_URL } from "../config";
import { RotatingText } from "../components/RotatingText";
import fundoBg from "../assets/payment-hero.webp";

// ─── Types ───────────────────────────────────────────────────────────────────
type Method = "pix" | "card";
type NavId  = "dashboard" | "projetos" | "materiais" | "pagamentos" | "mensagens";

// ─── Nav ─────────────────────────────────────────────────────────────────────
const NAV: { id: NavId; label: string; icon: React.ElementType }[] = [
  { id: "dashboard",  label: "Dashboard",  icon: LayoutGrid   },
  { id: "projetos",   label: "Projetos",   icon: Layers       },
  { id: "materiais",  label: "Materiais",  icon: FolderOpen   },
  { id: "pagamentos", label: "Pagamentos", icon: CreditCard   },
  { id: "mensagens",  label: "Mensagens",  icon: MessageSquare},
];

const SIDEBAR_BLOCKS = [
  {
    icon: Shield,
    title: "Ambiente Seguro",
    desc: "Utilizamos plataformas e protocolos seguros para proteger seus dados e transações.",
  },
  {
    icon: Star,
    title: "Processo Transparente",
    desc: "Você sabe exatamente o que está contratando, os prazos e o que será entregue.",
  },
  {
    icon: Zap,
    title: "Início Imediato",
    desc: "Após a confirmação do pagamento, agendamos o kickoff e iniciamos o projeto.",
  },
  {
    icon: Lock,
    title: "Suporte Dedicado",
    desc: "Acompanhamento durante toda a execução do projeto.",
  },
];

const STEPS = [
  { num: "01", label: "Briefing",   done: true  },
  { num: "02", label: "Materiais",  done: true  },
  { num: "03", label: "Pagamento",  done: false, active: true  },
  { num: "04", label: "Kickoff",    done: false, active: false },
];

const POST_TIMELINE = [
  { icon: Check,   label: "Pagamento Confirmado" },
  { icon: Clock,   label: "Kickoff Agendado"     },
  { icon: Layers,  label: "Desenvolvimento"      },
  { icon: Package, label: "Entrega"              },
];

const PIX_KEY = "devthomaseduardo@gmail.com";

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ amount, projectData }: { amount: number, projectData?: any }) => (
  <aside className="w-[300px] shrink-0 border-r border-white/[0.05] flex flex-col h-screen sticky top-0 bg-[#060606] overflow-y-auto hidden xl:flex">
    {/* Logo */}
    <div className="h-16 flex items-center gap-3 px-7 border-b border-white/[0.05] shrink-0">
      <div className="w-7 h-7 flex items-center justify-center shrink-0">
        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      <div>
        <span className="block text-[13px] font-semibold tracking-tight"><RotatingText /></span>
        <span className="block text-[10px] font-mono text-white/25 uppercase tracking-wider">Portal do Cliente</span>
      </div>
    </div>

    {/* Title block */}
    <div className="px-7 pt-8 pb-6 shrink-0 border-b border-white/[0.05]">
      <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/20 block mb-1">Pagamento</span>
      <span className="text-[22px] font-bold tracking-tight leading-tight block">Confirmação e Início</span>
      <span className="text-[12px] text-white/30 block mt-3 leading-relaxed">
        Para iniciarmos o desenvolvimento do seu projeto, confirme os dados e realize o pagamento.
      </span>
    </div>

    {/* Info blocks */}
    <div className="px-5 py-6 space-y-2 flex-1">
      {SIDEBAR_BLOCKS.map((b, i) => (
        <motion.div
          key={i}
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
      ))}
    </div>

    {/* Investment summary */}
    <div className="mx-5 mb-6 p-5 border border-white/[0.07] bg-[#0a0a0a] rounded-xl">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 block mb-3">Total a Liquidar</span>
      <span className="text-[36px] font-bold tracking-tighter leading-none block">
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
      </span>
      <span className="text-[11px] text-white/25 mt-2 block font-mono">
        {projectData?.paymentTerms || "Ambiente Seguro"}
      </span>
    </div>
  </aside>
);

// ─── PIX Panel ───────────────────────────────────────────────────────────────
const PanelPix = () => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div key="pix" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
      {/* QR area */}
      <div className="flex flex-col items-center py-8 gap-4 border-b border-white/[0.05]">
        <div className="w-36 h-36 bg-white flex items-center justify-center rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <QrCode className="w-20 h-20 text-black" strokeWidth={1.2} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">Escaneie com seu banco</span>
      </div>
      {/* Key */}
      <div className="px-6 py-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 block mb-2">Chave PIX</span>
        <div className="flex items-center justify-between gap-4 bg-[#0a0a0a] border border-white/[0.07] rounded-xl px-4 py-3">
          <span className="text-sm text-white/60 font-mono truncate">{PIX_KEY}</span>
          <button onClick={copy} className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors shrink-0">
            {copied
              ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copiado</span></>
              : <><Copy className="w-3.5 h-3.5" />Copiar</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Card Panel ──────────────────────────────────────────────────────────────
const PanelCard = () => (
  <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="px-6 py-6 space-y-4 text-center">
    <div className="py-10">
      <CreditCard className="w-12 h-12 text-white/10 mx-auto mb-4" />
      <p className="text-sm text-white/60 mb-2">Checkout Mercado Pago</p>
      <p className="text-[11px] text-white/20 max-w-[200px] mx-auto">Você será redirecionado para o ambiente seguro do Mercado Pago para finalizar com cartão.</p>
    </div>
    <p className="text-center text-[10px] font-mono text-white/20 flex items-center justify-center gap-1.5 pt-2 border-t border-white/5">
      <Shield className="w-3 h-3" />Visa · Mastercard · Elo · Amex — SSL encriptado
    </p>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("pix");
  const [invoice, setInvoice] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("clientToken");
    if (!token) {
      navigate("/portal");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const invoiceId = params.get("invoiceId");

    if (!invoiceId) {
      navigate("/portal/dashboard");
      return;
    }

    fetch(`${API_URL}/api/v2/invoices/${invoiceId}`, { 
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(async (res) => {
        const text = await res.text();
        if (!text) throw new Error("Resposta vazia do servidor.");
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error("Resposta inválida do servidor (não é JSON).");
        }
        if (!res.ok) throw new Error(data.error || "Falha ao carregar fatura");
        return data;
      })
      .then((data) => {
        setInvoice(data);
      })
      .catch((err) => {
        setStatusMessage(err.message);
      });
  }, [navigate]);

  const amount = invoice?.saldo || invoice?.amount || 0;

  const handleConfirmPayment = async () => {
    setStatusMessage(null);
    if (!invoice?.id) return;

    if (method === "pix") {
      setStatusMessage("Por favor, realize o Pix para a chave acima e envie o comprovante no suporte.");
      return;
    }

    setProcessing(true);
    try {
      const token = localStorage.getItem("clientToken");
      const response = await fetch(`${API_URL}/api/v2/payments/intent`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });

      const text = await response.text();
      if (!text) throw new Error("Erro na comunicação com o provedor de pagamento.");
      
      const data = JSON.parse(text);
      if (!response.ok) throw new Error(data.error || "Falha ao gerar checkout.");

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("Checkout URL não encontrada.");
      }
    } catch (error: any) {
      setStatusMessage(error?.message || "Erro inesperado ao processar pagamento.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-[#e0e0e0] font-sans flex overflow-hidden">

      <Sidebar amount={amount} projectData={invoice?.project} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-8 bg-[#060606] sticky top-0 z-40 shrink-0">
          <nav className="flex items-center gap-1">
            {NAV.map(item => {
              const Icon = item.icon;
              const isActive = item.id === "pagamentos";
              return (
                <button key={item.id} onClick={() => navigate('/portal/dashboard')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all ${isActive ? "bg-white/[0.07] text-white font-medium" : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"}`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-white/25"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">{invoice?.project?.client?.name?.charAt(0) || 'CL'}</div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] border-b border-white/[0.05] min-h-[300px]">
          <div className="px-10 py-14 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-white/25 border border-white/[0.07] px-3 py-1.5 rounded-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Segurança Ativa
              </span>
              <h1 className="text-[clamp(34px,4vw,64px)] font-bold tracking-tighter leading-[1.0] mb-5">
                Checkout<br />de Engenharia.
              </h1>
              <p className="text-[15px] text-white/35 max-w-lg leading-relaxed">
                Realize a liquidação do faturamento de forma segura e imediata para prosseguirmos com a sua operação técnica.
              </p>
            </motion.div>
          </div>
          <div className="border-l border-white/[0.05] relative overflow-hidden hidden lg:block">
            <img src={fundoBg} alt="Fundo" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060606] to-transparent" />
          </div>
        </section>

        <section className="px-10 py-8 border-b border-white/[0.05]">
          <div className="flex items-center gap-0 overflow-x-auto pb-2 scrollbar-hide">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="flex items-center gap-3 min-w-max">
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center border text-[10px] font-mono font-bold ${
                    step.done   ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" :
                    step.active ? "border-white/30 bg-white/[0.07] text-white" :
                                  "border-white/[0.07] text-white/20"
                  }`}>
                    {step.done ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <span className={`text-[12px] font-medium ${step.active ? "text-white" : step.done ? "text-white/35" : "text-white/20"}`}>{step.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-12 md:w-20 mx-3 shrink-0 ${i < 2 ? "bg-emerald-500/20" : "bg-white/[0.05]"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="px-10 py-10 grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-10 items-start">
          <div className="space-y-6">
            <div className="border border-white/[0.07] bg-[#0a0a0a] rounded-2xl overflow-hidden">
              <div className="px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Resumo da Fatura</span>
                <span className={`text-[10px] font-mono border px-2.5 py-1 rounded-lg uppercase tracking-widest ${
                  invoice?.status === 'paid' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                }`}>
                  {invoice?.status === 'paid' ? 'Liquidado' : 'Pendente'}
                </span>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {[
                  { label: "Descrição",         value: invoice?.description || "Carregando..." },
                  { label: "Projeto",           value: invoice?.project?.name || "..."     },
                  { label: "Vencimento",        value: invoice?.vencimento ? new Date(invoice.vencimento).toLocaleDateString('pt-BR') : "A definir" },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between px-7 py-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/25">{row.label}</span>
                    <span className="text-[13px] font-medium text-white/80">{row.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-7 py-5 bg-white/[0.02]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/25">Valor Líquido</span>
                  <span className="text-[24px] font-bold tracking-tighter">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-white/[0.07] bg-[#0a0a0a] rounded-2xl overflow-hidden">
              <div className="px-7 py-5 border-b border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Próximas Etapas</span>
              </div>
              <div className="px-7 py-6">
                {POST_TIMELINE.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-sm flex items-center justify-center border shrink-0 ${
                          i === 0 ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/[0.08] bg-transparent"
                        }`}>
                          <Icon className={`w-3.5 h-3.5 ${i === 0 ? "text-emerald-400" : "text-white/25"}`} />
                        </div>
                        {i < POST_TIMELINE.length - 1 && <div className="w-px flex-1 bg-white/[0.05] my-1" />}
                      </div>
                      <div className="pb-5">
                        <span className={`block text-[13px] font-medium ${i === 0 ? "text-white" : "text-white/35"}`}>{step.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              {([
                { id: "pix",  label: "PIX",     icon: QrCode,      desc: "Aprovação imediata e início rápido." },
                { id: "card", label: "Cartão",  icon: CreditCard,  desc: "Crédito, Débito ou Parcelamento."     },
              ] as { id: Method; label: string; icon: React.ElementType; desc: string }[]).map(m => {
                const Icon = m.icon;
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex-1 flex flex-col items-start gap-2 p-5 rounded-2xl border transition-all duration-200 text-left ${
                      active
                        ? "border-white/25 bg-white/[0.05] shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                        : "border-white/[0.07] bg-[#0a0a0a] hover:border-white/[0.14]"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-white" : "text-white/30"}`} />
                    <span className={`text-[13px] font-semibold ${active ? "text-white" : "text-white/50"}`}>{m.label}</span>
                    <span className={`text-[11px] leading-relaxed ${active ? "text-white/40" : "text-white/20"}`}>{m.desc}</span>
                    {active && <div className="mt-1 w-6 h-[2px] bg-white rounded-full" />}
                  </button>
                );
              })}
            </div>

            <div className="border border-white/[0.07] bg-[#0a0a0a] rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 block mb-1">Total a liquidar</span>
                  <span className="text-[32px] font-bold tracking-tighter leading-none">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {method === "pix"  && <PanelPix  />}
                {method === "card" && <PanelCard />}
              </AnimatePresence>

              <div className="px-6 pb-6 pt-2">
                <button
                onClick={handleConfirmPayment}
                disabled={processing || invoice?.status === 'paid'}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 text-black font-bold text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-200 group mt-4"
              >
                {processing ? "Transmitindo sinal..." : invoice?.status === 'paid' ? "Fatura já Liquidada" : "Iniciar Pagamento Seguro"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              {statusMessage && (
                <div className={`mt-4 p-4 rounded-xl text-xs font-medium border ${
                  statusMessage.includes('confirmado') || statusMessage.includes('sucesso') ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-rose-500/5 text-rose-400 border-rose-500/10'
                }`}>
                  {statusMessage}
                </div>
              )}
            </div>
          </div>
          </div>
        </div>

        <div className="px-10 pb-12 flex items-center justify-between border-t border-white/[0.05] pt-8 mt-2">
          <button
            onClick={() => navigate("/portal/dashboard")}
            className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/25 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />Voltar para Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
