import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, Lock, ChevronDown, Copy, Check,
  FileText, CreditCard, BarChart3, Globe, Upload,
  GitBranch, Shield, Zap, Package, Layers, BarChart2,
  Search, Server, Tag, CheckCircle2, QrCode, User, Eye, EyeOff,
  Settings as SettingsIcon, ChevronRight
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";
import { RotatingText } from "../components/RotatingText";
import { AnimatedEmoji } from "../components/AnimatedEmoji";
import { useLang } from "../contexts/LangContext";

const PIX_KEY = "devthomaseduardo@gmail.com";

const MODULE_ICONS: Record<string, React.ElementType> = {
  contracts: FileText,
  payments: CreditCard,
  balance: BarChart3,
  invoices: FileText,
  progress: Layers,
  timeline: CheckCircle2,
  files: Package,
  uploads: Upload,
  deploys: Server,
  repos: GitBranch,
  meta: Tag,
  google: BarChart2,
  analytics: BarChart3,
  gtm: Globe,
  search: Search,
  domain: Shield,
};

export default function Portal() {
  const navigate = useNavigate();
  const { t } = useLang();
  const p = t.portal;
  
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [activePayment, setActivePayment] = useState<"pix" | "card">("pix");
  const [copied, setCopied] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Credenciais inválidas");
      localStorage.setItem("clientToken", data.token);
      localStorage.setItem("clientId", data.client.id);
      navigate("/portal/dashboard");
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-white/20 selection:text-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl px-4 md:px-8 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-bold tracking-tight hidden sm:block"><RotatingText /></span>
        </a>
        <a href="#login" className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30">
          <Lock className="w-3 h-3" /> {p.nav}
        </a>
      </nav>

      <main className="pt-24 md:pt-28">

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex items-center px-6 md:px-8 max-w-7xl mx-auto">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#009EE3]/[0.04] blur-[140px] rounded-full" />
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.35em] text-white/30 border border-white/[0.08] rounded-full px-4 py-2 mb-8 md:mb-10">
              {p.hero.eyebrow}
            </span>
            <h1 className="text-[clamp(40px,6vw,88px)] font-bold tracking-[-0.04em] leading-[1.03] mb-8">
              {p.hero.h1a}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/25">{p.hero.h1b}</span>
              <AnimatedEmoji name="sparkles" className="inline-block w-[clamp(32px,4vw,56px)] h-[clamp(32px,4vw,56px)] ml-2 md:ml-4 -mt-2 md:-mt-4 align-middle" />
            </h1>
            <p className="text-white/45 text-base md:text-xl font-light max-w-2xl leading-relaxed mb-10 md:mb-12">
              {p.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="#login" className="group relative inline-flex justify-center items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden w-full sm:w-auto">
                <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  {p.hero.ctaLogin} <AnimatedEmoji name="rocket" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </a>
              <a href="#como-funciona" className="inline-flex justify-center items-center gap-2 px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/30 font-medium text-sm rounded-xl transition-all w-full sm:w-auto">
                {p.hero.ctaWork}
              </a>
            </div>
          </motion.div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section id="como-funciona" className="px-6 md:px-8 py-24 md:py-32 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-4 md:mb-5">{p.howItWorks.eyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{p.howItWorks.title}</h2>
            </div>
            <div className="hidden md:flex w-20 h-20 items-center justify-center opacity-60">
              <img src="/logo.png" alt="T3RN Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.howItWorks.steps.map((s: any, i: number) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative mt-6">
                <div className="absolute -top-6 left-0 w-24 h-6 bg-[#0B0B0B] rounded-t-xl" />
                <div className="bg-[#0B0B0B] rounded-2xl rounded-tl-none p-6 md:p-8 h-full hover:bg-[#0F0F0F] transition-all group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-white/20 tracking-widest block">{s.n}</span>
                    <AnimatedEmoji name={s.emoji as any} className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── O QUE O CLIENTE ACESSA ── */}
        <section className="px-6 md:px-8 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-16">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-4 md:mb-5">{p.access.eyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{p.access.title}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(p.access.modules).map(([key, label], i) => {
                const Icon = MODULE_ICONS[key] || FileText;
                return (
                  <motion.div key={key} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="relative mt-4">
                    <div className="absolute -top-4 left-0 w-[50%] max-w-[60px] h-4 bg-[#0B0B0B] rounded-t-lg" />
                    <div className="bg-[#0B0B0B] p-4 md:p-6 rounded-xl rounded-tl-none flex flex-col items-center justify-center gap-3 hover:bg-[#0F0F0F] transition-colors group h-full">
                      <Icon className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                      <span className="text-[10px] md:text-[11px] text-white/40 text-center font-medium group-hover:text-white/70 transition-colors">{label as string}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── MATERIAIS ── */}
        <section className="px-6 md:px-8 py-24 md:py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-4 md:mb-5">{p.onboarding.eyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{p.onboarding.title}</h2>
              <p className="text-white/40 text-base md:text-lg font-light leading-relaxed">{p.onboarding.desc}</p>
            </div>
            <div className="space-y-2">
              {p.onboarding.accordions.map((a: any, i: number) => {
                const open = openAcc === i;
                return (
                  <div key={a.title} className={`rounded-xl overflow-hidden transition-all ${open ? "bg-[#0F0F0F]" : "bg-[#0B0B0B] hover:bg-[#0F0F0F]"}`}>
                    <button onClick={() => setOpenAcc(open ? null : i)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                      <span className="font-semibold text-sm md:text-base">{a.title}</span>
                      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-4 h-4 text-white/40" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <div className="px-5 md:px-6 pb-5 md:pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-2">
                            {a.items.map((item: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-white/50">
                                <div className="w-1 h-1 rounded-full bg-white/20 shrink-0 mt-1.5" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PAGAMENTOS ── */}
        <section className="px-6 md:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 md:mb-16 text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-4 md:mb-5">{p.financial.eyebrow}</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                {p.financial.title} <AnimatedEmoji name="money_bag" className="w-10 h-10 md:w-12 md:h-12" />
              </h2>
              <p className="text-white/40 text-base md:text-lg font-light">{p.financial.desc}</p>
            </div>
            <div className="flex gap-2 justify-center mb-10 flex-wrap">
              {[{ id: "pix", label: "PIX" }, { id: "card", label: "Cartão / Link" }].map(t => (
                <button key={t.id} onClick={() => setActivePayment(t.id as any)}
                  className={`px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${activePayment === t.id ? "bg-white text-black" : "text-white/50 bg-transparent hover:bg-[#0B0B0B] hover:text-white"}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activePayment === "pix" && (
                <motion.div key="pix" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="relative mt-6 max-w-2xl mx-auto">
                  <div className="absolute -top-6 left-0 w-32 h-6 bg-[#0B0B0B] rounded-t-xl" />
                  <div className="bg-[#0B0B0B] rounded-2xl rounded-tl-none p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center">
                      <div className="w-32 h-32 md:w-36 md:h-36 bg-black/40 rounded-2xl flex items-center justify-center shrink-0">
                        <QrCode className="w-12 h-12 md:w-16 md:h-16 text-white/20" />
                      </div>
                      <div className="flex-1 w-full text-center sm:text-left">
                        <p className="text-white/40 text-xs md:text-sm mb-4">{p.financial.pixDesc}</p>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 bg-black/40 rounded-xl p-2">
                          <input readOnly value={PIX_KEY} className="bg-transparent text-white font-mono text-xs md:text-sm px-3 py-2 w-full outline-none text-center md:text-left" />
                          <button onClick={copyPix} className="bg-white text-black px-4 py-2 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shrink-0">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? p.financial.copied : p.financial.copy}
                          </button>
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row items-center justify-center sm:justify-start gap-2 text-xs text-emerald-400/70">
                          <Zap className="w-3.5 h-3.5 shrink-0" /> <span className="text-center sm:text-left">{p.financial.pixConfirm}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activePayment === "card" && (
                <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="relative mt-6 max-w-md mx-auto">
                  <div className="absolute -top-6 left-0 w-32 h-6 bg-[#0B0B0B] rounded-t-xl" />
                  <div className="bg-[#0B0B0B] rounded-2xl rounded-tl-none p-6 md:p-8 text-center space-y-4">
                    <CreditCard className="w-12 h-12 text-white/20 mx-auto" />
                    <p className="text-white/50 text-xs md:text-sm max-w-md mx-auto">{p.financial.cardDesc}</p>
                    <div className="inline-flex items-center gap-2 bg-black/40 rounded-full px-4 py-2 text-[10px] md:text-xs font-mono text-white/30">
                      <Shield className="w-3.5 h-3.5 shrink-0" /> {p.financial.mpBadge}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── LOGIN ── */}
        <section id="login" className="px-6 md:px-8 py-24 md:py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-4 md:mb-5">{p.login.eyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
                {p.login.title.split('.')[0]} <AnimatedEmoji name="locked" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" /><br className="hidden lg:block"/> {p.login.title.split('.')[1] ? p.login.title.split('.')[1] + '.' : ''}
              </h2>
              <p className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">{p.login.desc}</p>
            </div>
            <div className="relative mt-6 w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute -top-6 left-0 w-32 md:w-40 h-6 bg-[#0B0B0B] rounded-t-xl" />
              <div className="bg-[#0B0B0B] rounded-3xl rounded-tl-none p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{p.login.secure}</h3>
                    <p className="text-white/30 text-xs">{p.login.sub}</p>
                  </div>
                </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">{p.login.identifier}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder={p.login.placeholderId} required
                      className="w-full bg-black/40 rounded-xl pl-11 pr-4 py-3 md:py-3.5 text-sm text-white placeholder-white/20 outline-none focus:bg-white/[0.05] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">{p.login.password}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" required
                      className="w-full bg-black/40 rounded-xl pl-11 pr-12 py-3 md:py-3.5 text-sm text-white placeholder-white/20 outline-none focus:bg-white/[0.05] transition-all" />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {loginError && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-red-400 text-xs md:text-sm bg-red-500/[0.08] rounded-xl px-4 py-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> {loginError}
                    </motion.div>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={loginLoading}
                  className="group relative w-full py-3.5 md:py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden flex items-center justify-center disabled:opacity-60 mt-2">
                  <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    {loginLoading
                      ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> {p.login.verifying}</>
                      : <>{p.login.btn} <ArrowRight className="w-4 h-4" /></>}
                  </span>
                </button>
              </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] px-6 md:px-8 py-10 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-sm mb-1"><RotatingText /></p>
            <p className="text-white/30 text-xs">Desenvolvedor Frontend & Full Stack</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs text-white/30">
            {[
              { label: "Portfólio", href: "/" },
              { label: "GitHub", href: "https://github.com/thomaseduardo" },
              { label: "LinkedIn", href: "https://linkedin.com/in/thomaseduardo" },
              { label: "Contato", href: "mailto:contato@thomaseduardo.com" },
            ].map(l => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
