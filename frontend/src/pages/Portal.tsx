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

const steps = [
  { n: "01", title: "Briefing & Organização", desc: "Entendimento do projeto, objetivos, referências e estrutura inicial do escopo.", emoji: "folder" },
  { n: "02", title: "Materiais & Conteúdo", desc: "Envio de logos, imagens, textos, referências e acessos importantes.", emoji: "laptop" },
  { n: "03", title: "Desenvolvimento & Aprovação", desc: "Criação, acompanhamento, revisões e validações do projeto em tempo real.", emoji: "gear" },
  { n: "04", title: "Entrega & Infraestrutura", desc: "Deploy, domínio, repositórios, arquivos finais e documentação técnica.", emoji: "rocket" },
];

const modules = [
  { icon: FileText, label: "Contratos" },
  { icon: CreditCard, label: "Pagamentos" },
  { icon: BarChart3, label: "Saldo" },
  { icon: FileText, label: "Notas Fiscais" },
  { icon: Layers, label: "Progresso" },
  { icon: CheckCircle2, label: "Timeline" },
  { icon: Package, label: "Arquivos ZIP" },
  { icon: Upload, label: "Uploads" },
  { icon: Server, label: "Deploys" },
  { icon: GitBranch, label: "Repositórios" },
  { icon: Tag, label: "Meta Ads" },
  { icon: BarChart2, label: "Google Ads" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Globe, label: "GTM" },
  { icon: Search, label: "Search Console" },
  { icon: Shield, label: "Domínio & Host" },
];

const accordions = [
  { title: "Identidade Visual", items: ["Logo em vetor (SVG/AI)", "Paleta de cores", "Tipografia / fontes", "Referências visuais"] },
  { title: "Conteúdo", items: ["Textos institucionais", "Imagens e fotos", "Vídeos e mídias", "Copywriting"] },
  { title: "Acessos Técnicos", items: ["Painel do domínio", "Hospedagem (cPanel / FTP)", "Meta Business Manager", "Google Analytics / Tag Manager"] },
  { title: "Arquivos Extras", items: ["Google Drive compartilhado", "Documentos e PDFs", "Briefings anteriores", "Referências adicionais"] },
];

const PIX_KEY = "devthomaseduardo@gmail.com";

export default function Portal() {
  const navigate = useNavigate();
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [activePayment, setActivePayment] = useState<"pix" | "card">("pix");
  const [copied, setCopied] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

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
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-bold tracking-tight"><RotatingText /></span>
        </a>
        <a href="#login" className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30">
          <Lock className="w-3 h-3" /> Área do Cliente
        </a>
      </nav>

      <main className="pt-28">

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex items-center px-8 max-w-7xl mx-auto">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#009EE3]/[0.04] blur-[140px] rounded-full" />
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.35em] text-white/30 border border-white/[0.08] rounded-full px-4 py-2 mb-10">
              Portal Privado
            </span>
            <h1 className="text-[clamp(48px,6vw,88px)] font-bold tracking-[-0.04em] leading-[1.03] mb-8">
              Tudo do seu projeto<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/25">em um só lugar.</span>
              <AnimatedEmoji name="sparkles" className="inline-block w-[clamp(32px,4vw,56px)] h-[clamp(32px,4vw,56px)] ml-4 -mt-4 align-middle" />
            </h1>
            <p className="text-white/45 text-xl font-light max-w-2xl leading-relaxed mb-12">
              Uma área criada para organizar materiais, pagamentos, contratos, arquivos e toda a estrutura técnica do seu projeto com clareza e previsibilidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#login" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Acessar área do cliente <AnimatedEmoji name="rocket" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </a>
              <a href="#como-funciona" className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/30 font-medium text-sm rounded-xl transition-all">
                Entender como funciona
              </a>
              <Link to="/material" className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/30 font-medium text-sm rounded-xl transition-all">
                Onboarding
              </Link>
              <Link to="/payment" className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/30 font-medium text-sm rounded-xl transition-all">
                Pagamento
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section id="como-funciona" className="px-8 py-32 max-w-7xl mx-auto">
          <div className="mb-16 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-5">Como funciona</span>
              <h2 className="text-5xl font-bold tracking-tight">Do briefing ao deploy.</h2>
            </div>
            <div className="hidden md:flex w-20 h-20 items-center justify-center opacity-60">
              <img src="/logo.png" alt="T3RN Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative mt-6">
                <div className="absolute -top-6 left-0 w-24 h-6 bg-[#0B0B0B] rounded-t-xl" />
                <div className="bg-[#0B0B0B] rounded-2xl rounded-tl-none p-8 h-full hover:bg-[#0F0F0F] transition-all group">
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
        <section className="px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-5">Área privada</span>
              <h2 className="text-5xl font-bold tracking-tight">O que você acessa.</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {modules.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="relative mt-4">
                  <div className="absolute -top-4 left-0 w-[50%] max-w-[60px] h-4 bg-[#0B0B0B] rounded-t-lg" />
                  <div className="bg-[#0B0B0B] p-6 rounded-xl rounded-tl-none flex flex-col items-center justify-center gap-3 hover:bg-[#0F0F0F] transition-colors group h-full">
                    <m.icon className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                    <span className="text-[11px] text-white/40 text-center font-medium group-hover:text-white/70 transition-colors">{m.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MATERIAIS ── */}
        <section className="px-8 py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-5">Onboarding</span>
              <h2 className="text-5xl font-bold tracking-tight mb-6">O que você precisa ter.</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">Não se preocupe se não tiver tudo — organizamos junto durante o onboarding.</p>
            </div>
            <div className="space-y-2">
              {accordions.map((a, i) => {
                const open = openAcc === i;
                return (
                  <div key={a.title} className={`rounded-xl overflow-hidden transition-all ${open ? "bg-[#0F0F0F]" : "bg-[#0B0B0B] hover:bg-[#0F0F0F]"}`}>
                    <button onClick={() => setOpenAcc(open ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left">
                      <span className="font-semibold">{a.title}</span>
                      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-4 h-4 text-white/40" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <div className="px-6 pb-6 grid grid-cols-2 gap-2">
                            {a.items.map(item => (
                              <div key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                                <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
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
        <section className="px-8 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-5">Financeiro</span>
              <h2 className="text-5xl font-bold tracking-tight mb-4 flex items-center justify-center gap-4">
                Formas de pagamento. <AnimatedEmoji name="money_bag" className="w-12 h-12" />
              </h2>
              <p className="text-white/40 text-lg font-light">50% no início + 50% na entrega. Simples e transparente.</p>
            </div>
            <div className="flex gap-2 justify-center mb-10">
              {[{ id: "pix", label: "PIX" }, { id: "card", label: "Cartão / Link" }].map(t => (
                <button key={t.id} onClick={() => setActivePayment(t.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${activePayment === t.id ? "bg-white text-black" : "text-white/50 bg-transparent hover:bg-[#0B0B0B] hover:text-white"}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activePayment === "pix" && (
                <motion.div key="pix" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="relative mt-6">
                  <div className="absolute -top-6 left-0 w-32 h-6 bg-[#0B0B0B] rounded-t-xl" />
                  <div className="bg-[#0B0B0B] rounded-2xl rounded-tl-none p-8">
                    <div className="flex flex-col sm:flex-row gap-8 items-center">
                      <div className="w-36 h-36 bg-black/40 rounded-2xl flex items-center justify-center shrink-0">
                        <QrCode className="w-16 h-16 text-white/20" />
                      </div>
                      <div className="flex-1 w-full">
                        <p className="text-white/40 text-sm mb-4">Chave PIX — pagamento instantâneo, sem taxas adicionais.</p>
                        <div className="flex items-center gap-2 bg-black/40 rounded-xl p-2">
                          <input readOnly value={PIX_KEY} className="bg-transparent text-white font-mono text-sm px-3 py-2 w-full outline-none" />
                          <button onClick={copyPix} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copiado" : "Copiar"}
                          </button>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400/70">
                          <Zap className="w-3.5 h-3.5" /> Confirmação instantânea após o pagamento
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
                  <div className="bg-[#0B0B0B] rounded-2xl rounded-tl-none p-8 text-center space-y-4">
                    <CreditCard className="w-12 h-12 text-white/20 mx-auto" />
                    <p className="text-white/50 text-sm max-w-md mx-auto">O link de pagamento seguro é gerado após a aprovação do escopo e enviado por e-mail ou diretamente no seu portal.</p>
                    <div className="inline-flex items-center gap-2 bg-black/40 rounded-full px-4 py-2 text-xs font-mono text-white/30">
                      <Shield className="w-3.5 h-3.5" /> Checkout via Mercado Pago
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── LOGIN ── */}
        <section id="login" className="px-8 py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 block mb-5">Acesso restrito</span>
              <h2 className="text-5xl font-bold tracking-tight mb-6 flex flex-wrap items-center gap-4">
                Área privada <AnimatedEmoji name="locked" className="w-10 h-10 lg:w-12 lg:h-12" /><br className="hidden lg:block"/> do cliente.
              </h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">Acesse pagamentos, contratos, arquivos, materiais, deploys e informações técnicas do seu projeto.</p>
            </div>
            <div className="relative mt-6">
              <div className="absolute -top-6 left-0 w-40 h-6 bg-[#0B0B0B] rounded-t-xl" />
              <div className="bg-[#0B0B0B] rounded-3xl rounded-tl-none p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Acesso Seguro</h3>
                    <p className="text-white/30 text-xs">Credenciais enviadas por e-mail</p>
                  </div>
                </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">CNPJ, CPF ou e-mail</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Seu identificador" required
                      className="w-full bg-black/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 outline-none focus:bg-white/[0.05] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">Chave de acesso</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" required
                      className="w-full bg-black/40 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-white/20 outline-none focus:bg-white/[0.05] transition-all" />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {loginError && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-red-400 text-sm bg-red-500/[0.08] rounded-xl px-4 py-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> {loginError}
                    </motion.div>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={loginLoading}
                  className="group relative w-full py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden flex items-center justify-center disabled:opacity-60 mt-2">
                  <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    {loginLoading
                      ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Verificando...</>
                      : <>Acessar Projeto <ArrowRight className="w-4 h-4" /></>}
                  </span>
                </button>
              </form>
              </div>
            </div>
          </div>
        </section>

        {activeTab === "configuracoes" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 pb-32">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Configurações</h2>
              <p className="text-sm text-white/40 max-w-xl">Gerencie as preferências da sua conta e configurações do sistema.</p>
            </div>
            <div className="flex flex-col gap-2 max-w-xs">
              {["Perfil", "Segurança", "Notificações", "Aparência", "Faturamento", "API Keys"].map((item) => (
                <button key={item} className="w-full flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-white/10 hover:bg-white/[0.02] transition-colors text-left group">
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{item}</span>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.05] px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-sm mb-1"><RotatingText /></p>
            <p className="text-white/30 text-xs">Desenvolvedor Frontend & Full Stack</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/30">
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
