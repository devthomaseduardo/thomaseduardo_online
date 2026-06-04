import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid, FolderOpen, CreditCard, MessageSquare, Layers,
  Shield, Check, ArrowRight, ArrowLeft, QrCode, Copy,
  Clock, Package, Zap, Lock, Star
} from "lucide-react";
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

const PIX_KEY = "th.eduardo210@gmail.com";

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ amount, projectData }: { amount: number, projectData?: any }) => (
  <aside className="w-[300px] shrink-0 border-r border-white/[0.05] flex flex-col h-screen sticky top-0 bg-[#060606] overflow-y-auto">
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
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 block mb-3">Investimento Total</span>
      <span className="text-[36px] font-bold tracking-tighter leading-none block">
        R$ {amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>
      <span className="text-[11px] text-white/25 mt-2 block font-mono">
        {projectData?.paymentTerms || "Pagamento sob consulta"}
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
  <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="px-6 py-6 space-y-4">
    {[
      { label: "Número do cartão", placeholder: "0000 0000 0000 0000" },
      { label: "Nome no cartão",   placeholder: "Como está no cartão"  },
    ].map(f => (
      <div key={f.label}>
        <label className="block text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-2">{f.label}</label>
        <input placeholder={f.placeholder} className="w-full bg-[#0c0c0c] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors" />
      </div>
    ))}
    <div className="grid grid-cols-2 gap-4">
      {[{ label: "Validade", placeholder: "MM / AA" }, { label: "CVV", placeholder: "•••" }].map(f => (
        <div key={f.label}>
          <label className="block text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 mb-2">{f.label}</label>
          <input placeholder={f.placeholder} className="w-full bg-[#0c0c0c] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors" />
        </div>
      ))}
    </div>
    <p className="text-center text-[10px] font-mono text-white/20 flex items-center justify-center gap-1.5 pt-2">
      <Shield className="w-3 h-3" />Visa · Mastercard · Elo · Amex — SSL encriptado
    </p>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("pix");
  const [projectData, setProjectData] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("clientToken");
    if (!token) return;

    fetch("/api/clients/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar cliente");
        return res.json();
      })
      .then((data) => {
        const project = data.projects?.[0];
        if (project) {
          setProjectData(project);
        }
      })
      .catch(() => {
        localStorage.removeItem("clientToken");
        localStorage.removeItem("clientId");
      });
  }, []);

  const amount = projectData ? (projectData.invoices?.find((i: any) => i.status === 'pending')?.amount || projectData.value) : 0;

  const handleConfirmPayment = async () => {
    setStatusMessage(null);
    if (!projectData?.id) {
      setStatusMessage("Acesse o portal para vincular o pagamento ao seu projeto.");
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch("/api/payments/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectData.id,
          amount: amount,
          description: method === "pix" ? "Pagamento via PIX" : "Pagamento via cartão",
          type: "service",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha ao registrar pagamento.");
      setStatusMessage(`Pagamento registrado com sucesso. Invoice ID: ${data.invoiceId}`);
    } catch (error: any) {
      setStatusMessage(error?.message || "Erro inesperado ao processar pagamento.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-[#e0e0e0] font-sans flex overflow-hidden">

      <Sidebar amount={amount} projectData={projectData} />

      {/* ══ MAIN ════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top Nav */}
        <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-8 bg-[#060606] sticky top-0 z-40 shrink-0">
          <nav className="flex items-center gap-1">
            {NAV.map(item => {
              const Icon = item.icon;
              const isActive = item.id === "pagamentos";
              return (
                <button key={item.id} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all ${isActive ? "bg-white/[0.07] text-white font-medium" : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"}`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-white/25"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">CL</div>
        </header>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] border-b border-white/[0.05] min-h-[300px]">
          <div className="px-10 py-14 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-white/25 border border-white/[0.07] px-3 py-1.5 rounded-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Onboarding
              </span>
              <h1 className="text-[clamp(34px,4vw,64px)] font-bold tracking-tighter leading-[1.0] mb-5">
                Vamos iniciar<br />sua operação.
              </h1>
              <p className="text-[15px] text-white/35 max-w-lg leading-relaxed">
                Confira o resumo do projeto e escolha a melhor forma de pagamento para dar início ao desenvolvimento.
              </p>
            </motion.div>
          </div>
          {/* BG image panel */}
          <div className="border-l border-white/[0.05] relative overflow-hidden hidden lg:block">
            <img src={fundoBg} alt="Fundo" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060606] to-transparent" />
          </div>
        </section>

        {/* ── PROGRESS TIMELINE ─────────────────────────────────────────── */}
        <section className="px-10 py-8 border-b border-white/[0.05]">
          <div className="flex items-center gap-0">
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
          {/* Progress bar */}
          <div className="mt-5 flex items-center gap-4">
            <div className="w-64 h-[2px] bg-white/[0.05] rounded-full overflow-hidden relative">
              <motion.div className="absolute inset-y-0 left-0 bg-white rounded-full" initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ duration: 1.2, ease: "easeOut" }} />
            </div>
            <span className="text-[10px] font-mono text-white/20">Etapa 3 de 4</span>
          </div>
        </section>

        {/* ── CONTENT GRID ──────────────────────────────────────────────── */}
        <div className="px-10 py-10 grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-10 items-start">

          {/* LEFT: Project summary + Post-payment timeline */}
          <div className="space-y-6">

            {/* Project Summary */}
            <div className="border border-white/[0.07] bg-[#0a0a0a] rounded-2xl overflow-hidden">
              <div className="px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Resumo do Projeto</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-lg uppercase tracking-widest">Aprovado</span>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {[
                  { label: "Projeto",           value: "Sleep House Campinas"     },
                  { label: "Tipo",              value: "Site Institucional Premium" },
                  { label: "Prazo estimado",    value: "30 a 45 dias"             },
                  { label: "Entregáveis",       value: "Site completo + CMS"       },
                  { label: "Suporte pós-entrega", value: "30 dias"               },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between px-7 py-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/25">{row.label}</span>
                    <span className="text-[13px] font-medium text-white/80">{row.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-7 py-5 bg-white/[0.02]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/25">Investimento</span>
                  <span className="text-[24px] font-bold tracking-tighter">R$ {amount.toLocaleString("pt-BR")}</span>
                </div>
              </div>
            </div>

            {/* Post-payment timeline */}
            <div className="border border-white/[0.07] bg-[#0a0a0a] rounded-2xl overflow-hidden">
              <div className="px-7 py-5 border-b border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">O que acontece depois</span>
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

          {/* RIGHT: Payment methods */}
          <div className="space-y-4">
            {/* Method selector */}
            <div className="flex gap-3">
              {([
                { id: "pix",  label: "PIX",     icon: QrCode,      desc: "Aprovação imediata e início rápido." },
                { id: "card", label: "Cartão",  icon: CreditCard,  desc: "Pagamento seguro via Stripe."        },
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

            {/* Panel */}
            <div className="border border-white/[0.07] bg-[#0a0a0a] rounded-2xl overflow-hidden">
              {/* Amount header */}
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 block mb-1">Total a pagar</span>
                  <span className="text-[32px] font-bold tracking-tighter leading-none">R$ {amount.toLocaleString("pt-BR")}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-lg uppercase tracking-widest">{projectData?.paymentTerms || "Pagamento único"}</span>
              </div>

              <AnimatePresence mode="wait">
                {method === "pix"  && <PanelPix  />}
                {method === "card" && <PanelCard />}
              </AnimatePresence>

              {/* CTA */}
              <div className="px-6 pb-6 pt-2">
                <button
                onClick={handleConfirmPayment}
                disabled={processing}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 text-black font-bold text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-200 group mt-4"
              >
                {processing ? "Processando..." : method === "pix" ? "Já realizei o pagamento" : "Pagar com Cartão"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              {statusMessage && (
                <p className="mt-4 text-[13px] text-white/60">{statusMessage}</p>
              )}
            </div>
          </div>

            {/* Trust banner */}
            <div className="flex items-center gap-4 px-5 py-4 border border-white/[0.06] bg-[#0a0a0a] rounded-xl">
              <Shield className="w-5 h-5 text-white/20 shrink-0" />
              <div>
                <span className="block text-[12px] font-semibold text-white/60">Segurança e Confiança</span>
                <span className="block text-[11px] text-white/25 mt-0.5">Todos os dados protegidos com criptografia de ponta a ponta.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ACTIONS ────────────────────────────────────────────── */}
        <div className="px-10 pb-12 flex items-center justify-between border-t border-white/[0.05] pt-8 mt-2">
          <button
            onClick={() => navigate("/material")}
            className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/25 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />Voltar para Materiais
          </button>
          <button
            onClick={handleConfirmPayment}
            disabled={processing}
            className="flex items-center gap-3 bg-white hover:bg-neutral-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 text-black font-bold text-[11px] uppercase tracking-[0.2em] px-7 py-3.5 rounded-xl transition-all duration-200 group"
          >
            {processing ? "Processando..." : "Confirmar Pagamento"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
