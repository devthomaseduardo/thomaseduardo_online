import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ArrowRight, User, UploadCloud, CreditCard, FileText, Eye, EyeOff, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: UploadCloud,
    label: "01",
    title: "Materiais",
    desc: "Envie logos, imagens, textos e arquivos. Tudo centralizado, organizado por projeto."
  },
  {
    icon: CreditCard,
    label: "02",
    title: "Financeiro",
    desc: "Pagamentos, saldo, invoices e notas fiscais acessíveis quando precisar."
  },
  {
    icon: FileText,
    label: "03",
    title: "Infraestrutura",
    desc: "Repositórios, deploys, domínios, Meta Ads, Analytics e dados técnicos."
  }
];

const WORDS = ["privado.", "exclusivo.", "seu."];

const ClientPortalLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const navigate = useNavigate();

  // Rotating headline word
  useEffect(() => {
    const t = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Animated ticker
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 60);
    return () => clearInterval(t);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Credenciais inválidas");
      localStorage.setItem("clientToken", data.token);
      localStorage.setItem("clientId", data.client.id);
      navigate("/portal/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden flex flex-col">

      {/* ── TOP NAV ── */}
      <nav className="relative z-30 flex items-center justify-between px-8 py-6 border-b border-white/[0.04]">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-black" />
          </div>
          <span className="text-sm font-bold tracking-tight">Thomas Eduardo</span>
        </a>
        <div className="flex items-center gap-2 text-[11px] font-mono text-white/25 uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
          Portal de Acesso
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* ── LEFT: Editorial ── */}
        <div className="hidden lg:flex w-[55%] flex-col justify-between p-16 xl:p-20 relative overflow-hidden border-r border-white/[0.04]">

          {/* Background texture */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#009EE3]/[0.04] blur-[160px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/[0.02] blur-[100px]" />
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          </div>

          {/* Top: headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 pt-8"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/25 mb-10">
              Área restrita / Clientes ativos
            </p>
            <h1 className="text-[clamp(48px,4.5vw,72px)] font-bold tracking-[-0.04em] leading-[1.05] mb-2">
              Seu espaço
            </h1>
            <div className="h-[clamp(52px,5vw,80px)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={wordIdx}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
                  className="text-[clamp(48px,4.5vw,72px)] font-bold tracking-[-0.04em] leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/30"
                >
                  {WORDS[wordIdx]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p className="text-white/40 text-lg font-light mt-8 max-w-md leading-relaxed">
              Acompanhe o progresso, acesse documentos e gerencie tudo do seu projeto em tempo real.
            </p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10 space-y-px"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="group flex items-center gap-6 p-6 rounded-2xl hover:bg-white/[0.03] transition-all duration-500 border border-transparent hover:border-white/[0.07] cursor-default"
              >
                <div className="flex items-center gap-5 flex-1">
                  <span className="text-[10px] font-mono text-white/20 tracking-widest w-5">{f.label}</span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] transition-colors">
                    <f.icon className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/80 text-sm mb-0.5">{f.title}</h3>
                    <p className="text-white/35 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-1 transition-all shrink-0" />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom ticker */}
          <div className="relative z-10 overflow-hidden mt-12">
            <div className="flex gap-12 text-[10px] font-mono text-white/10 uppercase tracking-[0.2em] whitespace-nowrap">
              {Array(4).fill(null).map((_, i) => (
                <span key={i}>Projetos · Contratos · Financeiro · Repositórios · Analytics · Infraestrutura</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex-1 flex items-center justify-center p-6 relative">
          {/* Mobile glow */}
          <div className="absolute inset-0 lg:hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#009EE3]/[0.07] blur-[120px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-[400px] relative z-10"
          >
            {/* Mobile headline */}
            <div className="lg:hidden text-center mb-10">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Portal do Cliente</p>
              <h1 className="text-4xl font-bold tracking-tight">Área Privada</h1>
            </div>

            {/* Lock icon */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <Lock className="w-5 h-5 text-white/50" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-1 text-center lg:text-left">Acesse seu projeto</h2>
            <p className="text-white/40 text-sm mb-10 text-center lg:text-left">Use seu CNPJ, CPF ou e-mail + chave de acesso.</p>

            <form onSubmit={handleLogin} className="space-y-4">

              {/* Identifier */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/35 uppercase tracking-[0.2em]">
                  Identificador
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="CNPJ, CPF ou e-mail"
                    required
                    autoFocus
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/35 uppercase tracking-[0.2em]">
                  Chave de Acesso
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="••••••••••"
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-500/[0.08] border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity mt-2"
              >
                <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Verificando...
                    </span>
                  ) : (
                    <>Acessar Projeto <ArrowRight className="w-4 h-4" /></>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 pt-8 border-t border-white/[0.06] flex flex-col gap-3">
              <p className="text-[11px] text-white/25 text-center font-mono uppercase tracking-widest">
                Não tem acesso?
              </p>
              <a
                href="/proposta"
                className="group flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors py-2"
              >
                Ver proposta comercial
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/"
                className="group flex items-center justify-center gap-2 text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                ← Voltar ao portfólio
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalLogin;
