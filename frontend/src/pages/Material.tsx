import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  LayoutGrid, FolderOpen, CreditCard, MessageSquare,
  Upload, Check, Clock, Eye, Shield, ArrowRight, ArrowLeft,
  Palette, Image as ImageIcon, Type, Key, FileText, Layers,
  Zap, Lock, Star, ChevronRight, X, Info
} from "lucide-react";
import fundoBg from "../assets/linux-lab.svg";

import { RotatingText } from "../components/RotatingText";

// ─── Types ───────────────────────────────────────────────────────────────────
type Status = "pending" | "received" | "reviewing";
type NavId  = "dashboard" | "projetos" | "materiais" | "pagamentos" | "mensagens";

// ─── Data ────────────────────────────────────────────────────────────────────
const ITENS_NAVEGACAO: { id: NavId; label: string; icon: React.ElementType }[] = [
  { id: "dashboard",  label: "Dashboard",   icon: LayoutGrid   },
  { id: "projetos",   label: "Projetos",    icon: Layers       },
  { id: "materiais",  label: "Materiais",   icon: FolderOpen   },
  { id: "pagamentos", label: "Pagamentos",  icon: CreditCard   },
  { id: "mensagens",  label: "Mensagens",   icon: MessageSquare},
];

const SECOES_LATERAIS = [
  {
    icon: Palette,
    title: "Identidade Visual",
    desc: "Cores, tipografia e manual da marca definem a base visual do projeto.",
  },
  {
    icon: Zap,
    title: "Fluxo de Progresso",
    desc: "Quatro etapas lineares garantem clareza e controle total do processo.",
  },
  {
    icon: Layers,
    title: "Categorização de Materiais",
    desc: "Cada arquivo tem sua categoria e tipo definido para agilizar o desenvolvimento.",
  },
  {
    icon: Star,
    title: "Estados de Status",
    desc: "Recebido, Em análise e Pendente — visibilidade total do que foi entregue.",
  },
  {
    icon: Eye,
    title: "Experiência do Usuário",
    desc: "Interface construída para reduzir atrito e maximizar clareza operacional.",
  },
  {
    icon: Lock,
    title: "Confiança e Segurança",
    desc: "Todos os arquivos são tratados com sigilo e utilizados exclusivamente no projeto.",
  },
];

const ETAPAS = [
  { num: "01", label: "Briefing"  },
  { num: "02", label: "Materiais" },
  { num: "03", label: "Pagamento" },
  { num: "04", label: "Kickoff"   },
];

interface MatCard {
  id:       string;
  icon:     React.ElementType;
  title:    string;
  desc:     string;
  formats:  string;
  details:  string;
}

const MATERIAIS: MatCard[] = [
  {
    id: "briefing",  icon: FileText,   title: "Briefing do Projeto",
    desc: "Documento de escopo, objetivos e expectativas do projeto.",
    formats: "PDF · DOCX · TXT",
    details: "O briefing é a bússola do projeto. Nele, você descreve a visão da sua empresa, público-alvo, concorrentes de referência e os objetivos principais. Quanto mais detalhado for, mais preciso e assertivo será o resultado da interface final."
  },
  {
    id: "brand",     icon: Layers,     title: "Manual da Marca",
    desc: "Guia de identidade visual, paleta de cores e tipografia.",
    formats: "PDF · AI · Figma",
    details: "O manual contém as regras visuais da empresa. Ele nos diz quais códigos de cores institucionais usar, quais famílias tipográficas representam a marca e como aplicar o logo, mantendo a consistência visual em todas as páginas."
  },
  {
    id: "images",    icon: ImageIcon,  title: "Imagens e Fotos",
    desc: "Fotos institucionais, produtos ou referências visuais.",
    formats: "JPG · PNG · WebP",
    details: "Imagens reais da sua equipe, do escritório ou do seu produto geram conexão extrema com o usuário. Envie arquivos originais de alta qualidade; faremos a otimização técnica (conversão para WebP) e compressão focada em performance na web."
  },
  {
    id: "texts",     icon: Type,       title: "Textos e Conteúdo",
    desc: "Textos institucionais, descrições e conteúdo editorial.",
    formats: "DOCX · PDF · TXT",
    details: "O design atrai a atenção, mas é a copy (o texto) que converte. Precisamos dos seus textos institucionais, apresentação de diferenciais, depoimentos reais e descrições dos serviços para diagramar perfeitamente a sua nova interface."
  },
  {
    id: "access",    icon: Key,        title: "Acessos e Credenciais",
    desc: "Domínio, hospedagem, redes sociais ou painéis admin.",
    formats: "TXT · PDF · Planilha",
    details: "Para realizar o deploy seguro (colocar o site no ar) e integrar plataformas analíticas (como Google Analytics, Meta Pixel, sistemas de hospedagem e domínio), precisaremos de acessos técnicos. Recomendamos gerar credenciais de acesso como convidado."
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Status }) => {
  const cfg = {
    received:  { label: "Recebido",   cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25", Icon: Check  },
    reviewing: { label: "Em análise", cls: "text-amber-400  bg-amber-400/10  border-amber-400/25",  Icon: Eye    },
    pending:   { label: "Pendente",   cls: "text-white/25   bg-white/[0.04]  border-white/[0.08]",  Icon: Clock  },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.15em] border ${cfg.cls}`}>
      <cfg.Icon className="w-3 h-3" />{cfg.label}
    </span>
  );
};

// ─── Upload Card ──────────────────────────────────────────────────────────────
const UploadCard = ({
  card, status, onUpload,
}: { card: MatCard; status: Status; onUpload: (id: string) => void }) => {
  const [dragging, setDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = card.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex flex-col rounded-2xl border bg-[#0a0a0a] overflow-hidden transition-all duration-300 group ${
        dragging
          ? "border-white/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
          : status === "received"
          ? "border-emerald-500/20"
          : "border-white/[0.07] hover:border-white/[0.13]"
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); onUpload(card.id); }}
    >
      <input ref={inputRef} type="file" multiple className="hidden" onChange={() => onUpload(card.id)} />

      {/* Card header */}
      <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
            status === "received"
              ? "border-emerald-500/20 bg-emerald-500/10"
              : "border-white/[0.06] bg-white/[0.03]"
          }`}>
            <Icon className={`w-4 h-4 ${status === "received" ? "text-emerald-400" : "text-white/35"}`} />
          </div>
          <div>
            <span className="block text-[14px] font-semibold tracking-tight text-white">{card.title}</span>
            <span className="block text-[11px] text-white/30 mt-0.5 leading-relaxed">{card.desc}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <StatusBadge status={status} />
          <button 
            onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }} 
            className="flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-widest text-white/30 hover:text-white transition-colors mt-1 bg-white/[0.03] border border-white/5 hover:bg-white/[0.1] px-2 py-1 rounded"
          >
            <Info className="w-3 h-3" />
            {showInfo ? "Ocultar Detalhes" : "Saber Mais"}
          </button>
        </div>
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-4 overflow-hidden relative z-10"
          >
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-[12px] text-white/50 leading-relaxed shadow-inner">
              <span className="block font-semibold text-white/70 mb-1 flex items-center gap-2">
                <Info className="w-3.5 h-3.5" /> Por que precisamos disso?
              </span>
              {card.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop zone */}
      <div
        onClick={() => status !== "received" && inputRef.current?.click()}
        className={`mx-6 mb-6 flex-1 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-8 transition-all duration-300 relative z-10 ${
          status === "received"
            ? "border-emerald-500/15 bg-emerald-500/[0.03] cursor-default"
            : "border-white/[0.07] hover:border-white/20 cursor-pointer hover:bg-white/[0.02]"
        }`}
      >
        {status === "received" ? (
          <>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[12px] font-mono text-emerald-400/70 uppercase tracking-widest">Arquivo recebido</span>
          </>
        ) : (
          <>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
              dragging ? "border-white/30 bg-white/10" : "border-white/[0.08] bg-white/[0.03]"
            }`}>
              <Upload className="w-4 h-4 text-white/35" />
            </div>
            <div className="text-center">
              <span className="block text-[12px] text-white/40">Arraste e solte o arquivo aqui</span>
              <span className="block text-[11px] text-white/20 mt-0.5">ou clique para selecionar</span>
            </div>
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.15em]">{card.formats}</span>
          </>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MaterialPage() {
  const navigate = useNavigate();
  const [activeNav] = useState<NavId>("materiais");
  const [statuses, setStatuses] = useState<Record<string, Status>>({
    briefing: "received",
    brand:    "pending",
    images:   "pending",
    texts:    "pending",
    access:   "pending",
  });

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleUpload = (id: string) => setStatuses(p => ({ ...p, [id]: "reviewing" }));

  const received  = Object.values(statuses).filter(s => s === "received").length;
  const reviewing = Object.values(statuses).filter(s => s === "reviewing").length;
  const pending   = Object.values(statuses).filter(s => s === "pending").length;
  const progress  = Math.round((received / MATERIAIS.length) * 100);

  return (
    <div className="min-h-screen bg-[#060606] text-[#e0e0e0] font-sans flex overflow-hidden">

      {/* ══ LEFT SIDEBAR ════════════════════════════════════════════════════ */}
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

        {/* Design annotation */}
        <div className="px-7 pt-8 pb-4 shrink-0">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/20 block mb-1">Design da Página</span>
          <span className="text-[18px] font-bold tracking-tight leading-tight block">Página de Materiais</span>
          <span className="text-[11px] text-white/30 block mt-1">Onboarding do Projeto</span>
        </div>

        {/* Divider */}
        <div className="mx-7 border-t border-white/[0.05] mb-6" />

        {/* Sidebar sections */}
        <div className="px-5 space-y-1 flex-1">
          {SECOES_LATERAIS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex gap-3 p-3 rounded-xl border border-transparent hover:border-white/[0.07] hover:bg-white/[0.02] transition-all cursor-default"
            >
              <div className="w-7 h-7 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center shrink-0 mt-0.5">
                <s.icon className="w-3.5 h-3.5 text-white/35" />
              </div>
              <div>
                <span className="block text-[12px] font-semibold text-white/70 mb-0.5">{s.title}</span>
                <span className="block text-[11px] text-white/25 leading-relaxed">{s.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress summary */}
        <div className="mx-5 my-6 p-4 border border-white/[0.07] bg-[#0a0a0a] rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">Progresso</span>
            <span className="text-[13px] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-px bg-white/[0.06] relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <div className="flex gap-4 mt-3">
            {[
              { label: "Recebidos", val: received,  cls: "text-emerald-400" },
              { label: "Análise",   val: reviewing, cls: "text-amber-400"   },
              { label: "Pendente",  val: pending,   cls: "text-white/25"    },
            ].map(m => (
              <div key={m.label}>
                <span className={`block text-[15px] font-bold ${m.cls}`}>{m.val}</span>
                <span className="block text-[9px] font-mono uppercase tracking-wider text-white/20">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top navigation */}
        <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-8 bg-[#060606] sticky top-0 z-40 shrink-0">
          <nav className="flex items-center gap-1">
            {ITENS_NAVEGACAO.map(item => {
              const Icon = item.icon;
              const isActive = item.id === activeNav;
              return (
                <button
                  key={item.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all ${
                    isActive
                      ? "bg-white/[0.07] text-white font-medium"
                      : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-white/25"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">CL</div>
          </div>
        </header>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_340px] items-stretch min-h-[340px] border-b border-white/[0.05]">
          <div className="px-10 py-14 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-white/25 border border-white/[0.07] px-3 py-1.5 rounded-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Onboarding
              </span>
              <h1 className="text-[clamp(36px,4.5vw,68px)] font-bold tracking-tighter leading-[1.0] mb-5">
                Vamos estruturar<br />sua operação.
              </h1>
              <p className="text-[15px] text-white/35 max-w-lg leading-relaxed mb-4">
                Antes de iniciarmos o desenvolvimento, é fundamental reunir os artefatos visuais, as credenciais e o escopo exato do projeto. Nossa organização inicial é o que garante uma entrega sem atritos e de altíssima qualidade técnica.
              </p>
              <p className="text-[14px] text-white/25 max-w-lg leading-relaxed">
                Neste painel interativo, você pode fazer o upload seguro dos seus arquivos, monitorar o progresso dos recebimentos e entender exatamente a finalidade de cada documento clicando no botão <strong>Saber mais</strong> em cada material abaixo.
              </p>
            </motion.div>
          </div>

          {/* Background image panel */}
          <div className="border-l border-white/[0.05] relative overflow-hidden hidden lg:block">
            {/* Image */}
            <img
              src={fundoBg}
              alt="Fundo"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark overlay so left content stays readable */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Subtle vignette on the left edge to blend with main content */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060606] to-transparent" />
          </div>
        </section>

        {/* ── PROGRESS TIMELINE ─────────────────────────────────────────── */}
        <section className="px-10 py-8 border-b border-white/[0.05]">
          <div className="flex items-center gap-0 max-w-2xl">
            {ETAPAS.map((step, i) => {
              const isDone   = i < 1;
              const isActive = i === 1;
              return (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-3 min-w-max">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center border text-[10px] font-mono font-bold transition-all ${
                      isDone   ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" :
                      isActive ? "border-white/30 bg-white/[0.07] text-white" :
                                 "border-white/[0.07] text-white/20"
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span className={`text-[12px] font-medium ${
                      isActive ? "text-white" : isDone ? "text-white/35" : "text-white/20"
                    }`}>{step.label}</span>
                  </div>
                  {i < ETAPAS.length - 1 && (
                    <div className={`h-px w-12 md:w-20 mx-3 shrink-0 ${i < 1 ? "bg-emerald-500/20" : "bg-white/[0.05]"}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-6 flex items-center gap-4 max-w-2xl">
            <div className="flex-1 h-[2px] bg-white/[0.05] rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] font-mono text-white/25 shrink-0">{progress}% completo</span>
          </div>
        </section>

        {/* ── MATERIALS GRID ────────────────────────────────────────────── */}
        <section className="px-10 py-10 flex-1">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-[22px] font-bold tracking-tight mb-1">Materiais do Projeto</h2>
              <p className="text-[13px] text-white/30">Envie todos os materiais solicitados abaixo para que possamos iniciar o desenvolvimento.</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-white/25">
              <span>{received}/{MATERIAIS.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {MATERIAIS.map((card, i) => (
              <motion.div key={card.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <UploadCard card={card} status={statuses[card.id] as Status} onUpload={handleUpload} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SECURITY BANNER ───────────────────────────────────────────── */}
        <div className="mx-10 mb-8 flex items-center gap-5 px-7 py-5 border border-white/[0.06] rounded-2xl bg-[#0a0a0a]">
          <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white/30" />
          </div>
          <div>
            <span className="block text-[13px] font-semibold text-white/80 mb-0.5">Seus dados estão seguros</span>
            <span className="block text-[12px] text-white/30 leading-relaxed">
              Todas as informações e arquivos enviados são confidenciais e utilizados exclusivamente para o desenvolvimento do seu projeto.
            </span>
          </div>
        </div>

        {/* ── BOTTOM ACTIONS ────────────────────────────────────────────── */}
        <div className="px-10 pb-12 flex items-center justify-between">
          <button
            onClick={() => navigate("/portal/dashboard")}
            className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />Voltar ao Dashboard
          </button>
          <button
            onClick={() => navigate("/payment")}
            className="flex items-center gap-3 bg-white hover:bg-neutral-100 active:scale-[0.98] text-black font-bold text-[11px] uppercase tracking-[0.18em] px-7 py-3.5 rounded-xl transition-all duration-200 group"
          >
            Continuar para Pagamento
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
