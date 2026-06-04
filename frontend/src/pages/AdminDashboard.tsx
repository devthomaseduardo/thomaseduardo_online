import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, Users, Briefcase, DollarSign, FileText,
  UploadCloud, Rocket, BarChart3, Settings, LogOut, Eye, EyeOff,
  ChevronRight, X, Plus, Bell, Command, Search, Activity, Clock, CheckCircle2, Menu
} from "lucide-react";
import { ProjectsKanban } from "../components/admin/ProjectsKanban";
import { ClientesModule } from "../components/admin/ClientesModule";
import { FinanceiroModule } from "../components/admin/FinanceiroModule";
import { ContratosModule } from "../components/admin/ContratosModule";
import { UploadsModule } from "../components/admin/UploadsModule";
import { DeploysModule } from "../components/admin/DeploysModule";
import { AnalyticsModule } from "../components/admin/AnalyticsModule";
import { ConfiguracoesModule } from "../components/admin/ConfiguracoesModule";
import { PageLoader } from "../components/admin/Loaders";
import { LogoTE } from "../components/Icons";

const API = "";
// Admin token key — stores JWT, NEVER the password
const TOKEN_KEY = "adminToken";

const hdrs = (t?: string) => ({
  "Content-Type": "application/json",
  ...(t ? { "Authorization": `Bearer ${t}` } : {}),
});

// ─── Gate ───────────────────────────────────────────────────────────────────
function AdminGate({ onAuth }: { onAuth: (t: string) => void }) {
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr("");
    try {
      const r = await fetch(`${API}/api/admin/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Credencial incorreta.");
      // Store ONLY the JWT token, NEVER the password
      const jwt = data.token;
      localStorage.setItem(TOKEN_KEY, jwt);
      setPass(""); // clear password from memory immediately
      onAuth(jwt);
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 text-black">
            <LogoTE className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Acesso Restrito</h1>
          <p className="text-white/30 text-sm mt-2 font-mono">infraestrutura operacional privada</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pass} onChange={e => setPass(e.target.value)}
              placeholder="Chave de acesso"
              className="w-full bg-[#0B0B0B] border border-white/[0.06] rounded-xl px-4 py-4 text-white text-sm outline-none focus:border-white/20 transition-colors pr-12 font-mono"
            />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {err && <p className="text-red-400 text-xs font-mono">{err}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-white text-black font-semibold py-4 rounded-xl text-sm hover:bg-white/90 transition-colors disabled:opacity-40">
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Nav item ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "Overview",       icon: LayoutDashboard },
  { id: "Clientes",       icon: Users },
  { id: "Projetos",       icon: Briefcase },
  { id: "Financeiro",     icon: DollarSign },
  { id: "Contratos",      icon: FileText },
  { id: "Uploads",        icon: UploadCloud },
  { id: "Deploys",        icon: Rocket },
  { id: "Analytics",      icon: BarChart3 },
  { id: "Configurações",  icon: Settings },
];

// ─── Overview placeholder ────────────────────────────────────────────────────
function Overview({ token }: { token: string }) {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    fetch(`${API}/api/v2/dashboard`, { headers: hdrs(token) })
      .then(r => r.ok ? r.json() : null).then(setData).catch(() => {});
  }, [token]);

  const kpis = data?.kpis ?? [
    { label: "Projetos Ativos", value: "12", trend: "+2", good: true },
    { label: "A Receber (BRL)", value: "R$ 45.2k", trend: "Em dia", good: true },
    { label: "MRR", value: "R$ 12.8k", trend: "+15%", good: true },
    { label: "Clientes", value: "24", trend: "0", good: true },
  ];

  const quickActions = [
    { icon: Plus, label: "Novo Projeto", color: "text-[#009EE3]", bg: "bg-[#009EE3]/10" },
    { icon: DollarSign, label: "Nova Fatura", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { icon: FileText, label: "Gerar Contrato", color: "text-purple-400", bg: "bg-purple-400/10" },
    { icon: UploadCloud, label: "Upload de Arquivo", color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  const activities = [
    { title: "Deploy concluído", desc: "Sleep House (v2.1.0)", time: "Há 10 min", icon: CheckCircle2, color: "text-emerald-400" },
    { title: "Fatura paga", desc: "Cliente A - Ref 004", time: "Há 2 horas", icon: DollarSign, color: "text-emerald-400" },
    { title: "Backup do banco", desc: "Automático (PostgreSQL)", time: "Ontem 00:00", icon: Activity, color: "text-[#009EE3]" },
  ];

  const pipeline = data?.pipeline?.length > 0 ? data.pipeline : [
    { id: 1, client: "Sleep House", progress: "80%", status: "Frontend" },
    { id: 2, client: "Fintech App", progress: "35%", status: "Backend" },
    { id: 3, client: "Studio Design", progress: "10%", status: "UI/UX" },
  ];

  return (
    <div className="py-6 px-5 md:py-10 md:px-8 xl:px-12 w-full max-w-7xl mx-auto space-y-6 md:space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">Command Center</h1>
          <p className="text-white/40 text-xs md:text-sm font-mono uppercase tracking-widest">Sistemas operacionais online</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          SISTEMAS ONLINE
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button key={i} className="group relative overflow-hidden bg-[#0B0B0B] border border-white/[0.06] hover:border-white/[0.15] rounded-xl p-4 transition-all text-left">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <p className="text-sm font-medium text-white group-hover:text-white/90 transition-colors">{action.label}</p>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {kpis.map((k: any, i: number) => (
              <div key={i} className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden group hover:border-white/[0.15] transition-colors">
                <div className="absolute top-0 right-0 p-4">
                  <span className={`text-xs font-mono px-2 py-1 rounded-md ${k.good ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/10 text-white/50'}`}>
                    {k.trend}
                  </span>
                </div>
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">{k.label}</p>
                <p className="text-3xl font-bold text-white tracking-tight">{k.value}</p>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">Pipeline Ativo</h2>
              <button className="text-xs text-[#009EE3] hover:underline font-mono">VER TODOS</button>
            </div>
            <div className="space-y-5">
              {pipeline.map((p: any) => (
                <div key={p.id} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white/70 group-hover:bg-white/10 transition-colors">
                    {p.client?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-white/90 text-sm font-medium">{p.client}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">{p.status}</span>
                      </div>
                      <span className="text-white/40 font-mono text-xs">{p.progress}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#009EE3] to-blue-400 rounded-full transition-all duration-1000" style={{ width: p.progress ?? "0%" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Quick Stats / Health */}
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">Integrações & Infra</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-white/70">Vercel API</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-white/70">Database (Neon)</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">Stable</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-sm text-white/70">Stripe Sync</span>
                </div>
                <span className="text-xs font-mono text-amber-400">Syncing...</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-2xl p-6 flex-1 flex flex-col">
            <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Log Recente
            </h2>
            <div className="space-y-5 flex-1">
              {activities.map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${act.color} z-10 relative`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {i !== activities.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/[0.06] -z-0" />
                      )}
                    </div>
                    <div className="pt-1.5 pb-2">
                      <p className="text-sm font-medium text-white/90 leading-none mb-1">{act.title}</p>
                      <p className="text-xs text-white/40">{act.desc}</p>
                      <p className="text-[10px] text-white/30 font-mono mt-1.5">{act.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <button className="w-full mt-4 py-2 border border-white/[0.06] rounded-lg text-xs font-mono text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
              VER LOG COMPLETO
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Generic placeholder for unbuilt modules ─────────────────────────────────
function Placeholder({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="py-12 px-10 xl:px-16 w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">{title}</h1>
        <p className="text-white/30 text-sm">{desc}</p>
      </div>
      <div className="border border-white/[0.06] border-dashed rounded-2xl py-24 flex items-center justify-center text-white/20 text-sm font-mono">
        Em desenvolvimento
      </div>
    </div>
  );
}

// ─── Shell ───────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [token, setToken] = useState("");
  const [active, setActive] = useState("Overview");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (t: string) => {
    if (t === active) return;
    setMobileMenuOpen(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(t);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 400);
  };

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      // Basic JWT expiry check (decode without verifying signature — server still validates)
      try {
        const payload = JSON.parse(atob(t.split('.')[1]));
        if (payload.exp && payload.exp * 1000 > Date.now()) {
          setToken(t); setAuthed(true);
        } else {
          localStorage.removeItem(TOKEN_KEY); // expired
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY); // malformed
      }
    }
  }, []);

  const handleAuth = (t: string) => { setToken(t); setAuthed(true); };
  const logout = () => { localStorage.removeItem(TOKEN_KEY); setAuthed(false); setToken(""); };


  if (!authed) return <AdminGate onAuth={handleAuth} />;

  const renderContent = () => {
    switch (active) {
      case "Overview":    return <Overview token={token} />;
      case "Projetos":    return <ProjectsKanban />;
      case "Clientes":    return <ClientesModule />;
      case "Financeiro":  return <FinanceiroModule />;
      case "Contratos":   return <ContratosModule />;
      case "Uploads":     return <UploadsModule />;
      case "Deploys":     return <DeploysModule />;
      case "Analytics":   return <AnalyticsModule />;
      case "Configurações": return <ConfiguracoesModule />;
      default:            return <Overview token={token} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 md:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#050505] border-r border-white/[0.06] flex flex-col h-screen transition-transform duration-300 md:static md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="px-6 h-16 flex items-center justify-between border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-black">
              <LogoTE className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Thomas Eduardo</p>
              <p className="text-[10px] text-white/30 font-mono mt-0.5">Operacional</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-white/40 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
          {NAV.map(({ id, icon: Icon }) => (
            <button key={id} onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === id
                  ? "bg-white/[0.08] text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
              }`}>
              <Icon className="w-4 h-4 shrink-0" />
              {id}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-white/60 transition-colors">
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden">
        {isTransitioning && <PageLoader />}
        
        {/* Header Superior */}
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-4 md:px-8 shrink-0 relative z-10 bg-[#050505]/80 backdrop-blur-md gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white/40 hover:text-white p-1 -ml-1">
              <Menu className="w-6 h-6 shrink-0" />
            </button>
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <Search className="w-4 h-4 text-white/30 shrink-0" />
              <input type="text" placeholder="Buscar... (⌘K)" 
                className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full max-w-md truncate" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/40 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#009EE3] rounded-full border border-[#050505]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white">
              <LogoTE className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className={`flex-1 overflow-y-auto flex relative z-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="w-full flex">
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
