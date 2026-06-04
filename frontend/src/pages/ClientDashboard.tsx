import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutGrid, FileText, CreditCard, FolderOpen, Zap, BarChart2,
  LogOut, CheckCircle2, Circle, Clock, ArrowUpRight, ChevronRight,
  Server, GitBranch, Globe, Activity, Shield, Download, UploadCloud,
  Check, Hourglass, AlertCircle, Bell, Search, Command
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavId = "overview" | "contracts" | "payments" | "files" | "deployments" | "analytics";

interface NavItem { id: NavId; label: string; icon: React.ElementType; }

const NAV: NavItem[] = [
  { id: "overview",     label: "Projetos",     icon: LayoutGrid },
  { id: "contracts",    label: "Contratos",    icon: FileText   },
  { id: "payments",     label: "Pagamentos",   icon: CreditCard },
  { id: "files",        label: "Arquivos",     icon: FolderOpen },
  { id: "deployments",  label: "Deployments",  icon: Zap        },
  { id: "analytics",    label: "Analytics",    icon: BarChart2  },
];

const ACTIVITY = [
  { time: "Agora",    msg: "Deploy frontend publicado em produção",     type: "deploy"   },
  { time: "2h atrás", msg: "Arquivo logo-final.svg recebido",           type: "file"     },
  { time: "5h atrás", msg: "Pagamento da parcela 2/3 confirmado",       type: "payment"  },
  { time: "Ontem",    msg: "Revisão de design aprovada pelo cliente",   type: "check"    },
  { time: "2 dias",   msg: "Repositório privado criado no GitHub",      type: "git"      },
  { time: "3 dias",   msg: "Contrato assinado digitalmente",            type: "contract" },
];

const TIMELINE = [
  { id: "kickoff",  label: "Kickoff",      status: "done"   },
  { id: "design",   label: "Design & UX",  status: "done"   },
  { id: "dev",      label: "Development",  status: "active" },
  { id: "review",   label: "Review",       status: "pending"},
  { id: "launch",   label: "Launch",       status: "pending"},
];

const METRICS = [
  { label: "Projetos Ativos",   value: "3",    sub: "+1 este mês",      color: "#fff"        },
  { label: "Tarefas Pendentes", value: "7",    sub: "2 com prazo hoje",  color: "#f59e0b"     },
  { label: "Faturas",           value: "R$12k", sub: "2/3 pagas",        color: "#10b981"     },
  { label: "Deploy Status",     value: "Live",  sub: "99.9% uptime",     color: "#3b82f6"     },
];

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
const PanelOverview = ({ projects }: { projects: any[] }) => (
  <div className="space-y-10">
    {/* Metrics */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {METRICS.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-3 hover:border-white/[0.12] transition-colors"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">{m.label}</span>
          <span className="text-2xl font-semibold tracking-tight" style={{ color: m.color }}>{m.value}</span>
          <span className="text-[11px] text-white/30">{m.sub}</span>
        </motion.div>
      ))}
    </div>

    {/* Timeline */}
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 block mb-6">Timeline do Projeto</span>
      <div className="flex items-center gap-0 overflow-x-auto">
        {TIMELINE.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2 min-w-[90px]">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                step.status === "done"    ? "border-emerald-500 bg-emerald-500/10" :
                step.status === "active" ? "border-blue-500   bg-blue-500/10 ring-2 ring-blue-500/20" :
                                           "border-white/10   bg-white/[0.02]"
              }`}>
                {step.status === "done"   ? <Check   className="w-3.5 h-3.5 text-emerald-400" /> :
                 step.status === "active" ? <Hourglass className="w-3.5 h-3.5 text-blue-400" /> :
                                            <Circle  className="w-2 h-2 text-white/10 fill-current" />}
              </div>
              <span className={`text-[10px] font-mono text-center whitespace-nowrap ${
                step.status === "done" ? "text-white/40" : step.status === "active" ? "text-white" : "text-white/20"
              }`}>{step.label}</span>
            </div>
            {i < TIMELINE.length - 1 && (
              <div className={`h-[1px] flex-1 mx-1 ${i < TIMELINE.findIndex(s => s.status === "active") ? "bg-emerald-500/40" : "bg-white/[0.06]"}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* Projects grid */}
    <div>
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 block mb-4">Projetos Ativos</span>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {(projects.length > 0 ? projects : [
          { id: 1, name: "Portal Operacional", phase: "Development" },
          { id: 2, name: "Landing Page",       phase: "Review"      },
        ]).map((p: any) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.01 }}
            className="bg-[#0c0c0c] border border-white/[0.06] hover:border-white/[0.14] rounded-2xl p-6 cursor-pointer group transition-all"
          >
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-semibold text-base tracking-tight">{p.name}</h3>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/30 border border-white/[0.08] px-2 py-1 rounded-lg">{p.phase}</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/[0.05] pt-4">
              <span className="flex items-center gap-1.5 text-xs text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operação Ativa
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const PanelDeployments = () => (
  <div className="space-y-4">
    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 block mb-6">Infraestrutura Operacional</span>
    {[
      { label: "Domínio",           value: "thomaseduardo.online", status: "Conectado",  icon: Globe,     color: "emerald" },
      { label: "Deploy",            value: "Vercel Pro",           status: "Live",       icon: Zap,       color: "emerald" },
      { label: "Repositório",       value: "GitHub Privado",       status: "Seguro",     icon: GitBranch, color: "blue"    },
      { label: "Google Analytics",  value: "GA4 Integrado",        status: "Coletando",  icon: Activity,  color: "emerald" },
      { label: "Meta Pixel",        value: "Pixel Ativo",          status: "Ativo",      icon: Shield,    color: "emerald" },
      { label: "Servidor",          value: "99.9% Uptime",         status: "Estável",    icon: Server,    color: "emerald" },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.06 }}
        className="flex items-center justify-between px-5 py-4 bg-[#0c0c0c] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <item.icon className="w-3.5 h-3.5 text-white/40" />
          </div>
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-white/25">{item.label}</span>
            <span className="text-sm font-medium text-white/80">{item.value}</span>
          </div>
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-lg ${
          item.color === "emerald" ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20" :
                                     "text-blue-400   bg-blue-400/10   border border-blue-400/20"
        }`}>{item.status}</span>
      </motion.div>
    ))}
  </div>
);

const PanelFiles = () => (
  <div className="space-y-6">
    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/[0.08] hover:border-white/20 rounded-2xl cursor-pointer group transition-colors">
      <UploadCloud className="w-7 h-7 text-white/20 group-hover:text-white/50 mb-2 transition-colors" />
      <span className="text-sm text-white/50">Solte seus arquivos aqui</span>
      <span className="text-[11px] text-white/25 mt-1">Logo, fotos, textos, referências</span>
      <input type="file" multiple className="hidden" />
    </label>
    <div className="space-y-2">
      {["logo-final.svg","referencias.pdf","fotos-produto.zip","brief-aprovado.docx"].map((f, i) => (
        <div key={i} className="flex items-center justify-between px-4 py-3 bg-[#0c0c0c] border border-white/[0.06] rounded-xl group hover:border-white/[0.12] transition-colors">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
            <span className="text-sm text-white/60">{f}</span>
          </div>
          <Download className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors cursor-pointer" />
        </div>
      ))}
    </div>
  </div>
);

const PanelPlaceholder = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/[0.06] rounded-2xl">
    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">{label}</span>
    <span className="text-white/10 text-xs mt-2">Em breve</span>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ClientDashboard() {
  const navigate  = useNavigate();
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
    fetch("/api/clients/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { setClient(d); setLoading(false); })
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
    overview:    <PanelOverview projects={projects} />,
    deployments: <PanelDeployments />,
    files:       <PanelFiles />,
    contracts:   <PanelPlaceholder label="Contratos" />,
    payments:    <PanelPlaceholder label="Pagamentos" />,
    analytics:   <PanelPlaceholder label="Analytics" />,
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#e8e8e8] font-sans flex">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className="w-[220px] shrink-0 border-r border-white/[0.05] flex flex-col sticky top-0 h-screen bg-[#060606]">
        {/* Logo */}
        <div className="px-5 h-14 flex items-center border-b border-white/[0.05]">
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
        <div className="px-3 pb-4 border-t border-white/[0.05] pt-4">
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
        <header className="h-14 border-b border-white/[0.05] flex items-center justify-between px-8 bg-[#060606] sticky top-0 z-40">
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
          <aside className="w-[260px] shrink-0 border-l border-white/[0.05] overflow-y-auto p-5 hidden xl:block">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25 block mb-5">Atividade Recente</span>
            <div className="space-y-4">
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 items-start"
                >
                  <ActivityIcon type={a.type} />
                  <div>
                    <p className="text-[12px] text-white/60 leading-snug">{a.msg}</p>
                    <span className="text-[10px] text-white/20 font-mono mt-1 block">{a.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
