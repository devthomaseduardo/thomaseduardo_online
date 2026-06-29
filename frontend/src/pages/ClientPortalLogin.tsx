import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Eye, EyeOff, Shield, MessageSquare, Lock } from "lucide-react";
import paymentBg from "../assets/linux-lab.svg";
import { RotatingText } from "../components/RotatingText";

export default function ClientPortalLogin() {
  const [showKey, setShowKey] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [key, setKey] = useState("");
  const [remember, setRemember] = useState(false);

  const formatCnpj = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 14);
    return d
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // auth logic placeholder
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#e0e0e0] font-sans flex overflow-hidden">

      {/* ══ LEFT — Login Panel ══════════════════════════════════════════════ */}
      <div className="flex flex-col w-full lg:w-[520px] xl:w-[560px] shrink-0 relative z-10 border-r border-white/[0.05]">

        {/* Top brand */}
        <div className="h-16 flex items-center gap-3 px-10 border-b border-white/[0.05] shrink-0">
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="block text-[13px] font-semibold tracking-tight leading-none"><RotatingText /></span>
            <span className="block text-[9px] font-mono text-white/25 uppercase tracking-wider mt-0.5">Desenvolvimento de Software</span>
          </div>
        </div>

        {/* Form body */}
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Section label */}
            <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 border border-white/[0.06] px-3 py-1.5 rounded-sm mb-10">
              <Lock className="w-2.5 h-2.5" />Acesso do Cliente
            </span>

            {/* Headline */}
            <h1 className="text-[clamp(32px,4vw,52px)] font-bold tracking-tighter leading-[1.0] mb-4">
              Acesse sua<br />operação.
            </h1>
            <p className="text-[13px] text-white/30 leading-relaxed mb-10 max-w-sm">
              Entre para acompanhar seus projetos, entregas e toda a evolução da sua operação.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* CNPJ */}
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-[0.22em] text-white/25 mb-2">
                  CNPJ da empresa
                </label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={e => setCnpj(formatCnpj(e.target.value))}
                  placeholder="00.000.000/0001-00"
                  autoComplete="organization"
                  className="w-full bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.14] focus:border-white/25 rounded-xl px-5 py-3.5 text-[14px] text-white placeholder:text-white/15 focus:outline-none transition-colors"
                />
              </div>

              {/* Access key */}
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-[0.22em] text-white/25 mb-2">
                  Chave de acesso
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full bg-[#0c0c0c] border border-white/[0.08] hover:border-white/[0.14] focus:border-white/25 rounded-xl px-5 py-3.5 text-[14px] text-white placeholder:text-white/15 focus:outline-none transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + forgot */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    onClick={() => setRemember(p => !p)}
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all cursor-pointer ${
                      remember ? "border-white/40 bg-white" : "border-white/[0.12] bg-transparent"
                    }`}
                  >
                    {remember && <span className="text-black text-[10px] font-bold leading-none">✓</span>}
                  </div>
                  <span className="text-[12px] text-white/30 group-hover:text-white/50 transition-colors select-none">Lembrar acesso</span>
                </label>
                <button type="button" className="text-[11px] font-mono text-white/20 hover:text-white/50 transition-colors uppercase tracking-wider">
                  Esqueci minha chave
                </button>
              </div>

              {/* Primary CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 active:scale-[0.98] text-black font-bold text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-200 group mt-2"
              >
                Entrar na minha conta
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-white/[0.07] hover:border-white/[0.15] text-white/30 hover:text-white/60 text-[11px] font-mono uppercase tracking-[0.18em] py-3.5 rounded-xl transition-all duration-200"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Falar com suporte
              </button>
            </form>
          </motion.div>
        </div>

        {/* Security notice */}
        <div className="px-10 pb-6 pt-4 border-t border-white/[0.05] shrink-0">
          <div className="flex items-start gap-3">
            <Shield className="w-3.5 h-3.5 text-white/15 mt-0.5 shrink-0" />
            <p className="text-[11px] text-white/20 leading-relaxed">
              Seus dados estão protegidos com criptografia de ponta a ponta e não são compartilhados.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="h-12 border-t border-white/[0.05] px-10 flex items-center justify-between shrink-0">
          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/15 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            Ambiente seguro
          </span>
          <span className="text-[9px] font-mono text-white/10">© <RotatingText /></span>
        </div>
      </div>

      {/* ══ RIGHT — Hero Image ══════════════════════════════════════════════ */}
      <div className="flex-1 relative overflow-hidden hidden lg:block">
        {/* Background image */}
        <img
          src={paymentBg}
          alt="Architecture"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Left edge vignette to blend with login panel */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060606] to-transparent" />

        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Floating content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-12 left-12 right-12"
        >
          <span className="block text-[9px] font-mono uppercase tracking-[0.3em] text-white/25 mb-3">Portal do Cliente</span>
          <p className="text-[clamp(20px,2vw,28px)] font-bold tracking-tight leading-tight text-white/70 max-w-sm">
            Sua operação digital centralizada em um único lugar.
          </p>
          <div className="flex items-center gap-6 mt-6">
            {["Projetos", "Materiais", "Pagamentos", "Entregas"].map((tag, i) => (
              <span key={i} className="text-[10px] font-mono uppercase tracking-widest text-white/20">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
