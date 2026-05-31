import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, ChevronDown, ArrowRight, Lock,
  Zap, Shield, Clock, Star, Package, Globe,
  QrCode, CreditCard, Building, Copy, Check,
  MessageSquare, HelpCircle, Layers, BarChart3
} from "lucide-react";

/* ─── DADOS ────────────────────────────────────────── */

const services = [
  {
    id: "landing",
    tag: "Mais popular",
    name: "Landing Page",
    desc: "Uma página de alta conversão para captar leads, lançar produtos ou apresentar seu serviço com foco total em resultado.",
    deliverables: ["Design UI/UX premium", "Responsividade total", "SEO técnico", "Analytics integrado", "Deploy em produção"],
    price: "a partir de R$ 2.800",
    turnaround: "7–14 dias úteis",
    highlight: true
  },
  {
    id: "site",
    tag: "Institucional",
    name: "Website Completo",
    desc: "Site institucional completo: home, sobre, serviços, portfólio, blog e contato. Sua empresa no digital com identidade própria.",
    deliverables: ["Múltiplas páginas", "CMS para edição", "Blog integrado", "Formulários inteligentes", "Infraestrutura gerenciada"],
    price: "a partir de R$ 5.500",
    turnaround: "21–30 dias úteis",
    highlight: false
  },
  {
    id: "app",
    tag: "Sistemas",
    name: "Sistema / Web App",
    desc: "Plataformas, portais, dashboards, e-commerces e sistemas customizados com banco de dados, autenticação e integrações.",
    deliverables: ["Backend completo", "Banco de dados", "Autenticação", "APIs e integrações", "Escalável e seguro"],
    price: "sob consulta",
    turnaround: "30–90 dias úteis",
    highlight: false
  }
];

const process = [
  { num: "01", title: "Briefing & Proposta", desc: "Conversa inicial para entender o projeto. Em até 24h você recebe uma proposta detalhada com escopo e investimento." },
  { num: "02", title: "Contrato & Sinal", desc: "Assine o contrato digital e pague 50% do valor como sinal para iniciarmos o desenvolvimento imediatamente." },
  { num: "03", title: "Design & Aprovação", desc: "Criamos o protótipo navegável para sua aprovação. Você valida o visual antes de qualquer linha de código." },
  { num: "04", title: "Desenvolvimento", desc: "Desenvolvimento frontend e backend com atualizações semanais via portal. Você acompanha tudo em tempo real." },
  { num: "05", title: "Revisão & Deploy", desc: "Uma rodada de revisão final. Aprovado, publicamos em produção com toda a infraestrutura configurada." },
  { num: "06", title: "Entrega & Suporte", desc: "Você recebe todos os acessos, arquivos fonte em ZIP e repositório GitHub. Suporte garantido pós-entrega." }
];

const materials = [
  { icon: <Layers className="w-5 h-5" />, title: "Identidade Visual", desc: "Logo, cores, fontes e brand book (se tiver). Se não tiver, criamos do zero.", optional: false },
  { icon: <MessageSquare className="w-5 h-5" />, title: "Textos & Copywriting", desc: "Textos institucionais, descrições de serviços e qualquer copy existente. Se não tiver, desenvolvemos.", optional: false },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Fotos & Mídia", desc: "Fotos do negócio, equipe, produtos. Sem fotos? Usamos banco de imagens premium licenciado.", optional: true },
  { icon: <Globe className="w-5 h-5" />, title: "Domínio & Acessos", desc: "Se já tem domínio registrado, precisamos do acesso ao painel. Se não tiver, cuidamos disso.", optional: true }
];

const pixKey = "th.eduardo210@gmail.com";

/* ─── COMPONENTE ────────────────────────────────────── */

export default function Proposta() {
  const [activePayment, setActivePayment] = useState<"pix" | "card" | "wire">("pix");
  const [expandedMaterial, setExpandedMaterial] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-sm text-white/60 tracking-widest uppercase">Thomas Eduardo</span>
        <a
          href="/portal"
          className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30"
        >
          <Lock className="w-3.5 h-3.5" /> Portal do Cliente
        </a>
      </nav>

      <main className="pt-32 pb-40 px-6 max-w-6xl mx-auto space-y-40">

        {/* ── HERO ── */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-8 border border-white/10 px-4 py-2 rounded-full">
              Proposta Comercial
            </span>
            <h1 className="text-[clamp(42px,6vw,80px)] font-bold tracking-[-0.04em] leading-[1.05] mb-8">
              Desenvolvimento digital<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/30">de alto nível.</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Sites, sistemas e landing pages construídos com foco em performance, conversão e propriedade total do código. Tudo gerenciado em uma área privada só sua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1%20Thomas%2C%20vi%20sua%20proposta%20e%20quero%20iniciar%20um%20projeto."
                target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Iniciar Projeto <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a href="#servicos" className="text-white/40 text-sm hover:text-white transition-colors font-medium flex items-center gap-2">
                Ver serviços <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden"
          >
            {[
              { icon: <Shield className="w-4 h-4" />, label: "Contrato digital", sub: "garantia por escrito" },
              { icon: <CheckCircle2 className="w-4 h-4" />, label: "Código 100% seu", sub: "sem lock-in" },
              { icon: <Zap className="w-4 h-4" />, label: "Acompanhamento", sub: "portal privado" },
              { icon: <Star className="w-4 h-4" />, label: "Nota Fiscal", sub: "para empresas" },
            ].map((item, i) => (
              <div key={i} className="bg-[#0A0A0A] px-6 py-5 flex flex-col items-center text-center gap-2">
                <div className="text-white/40">{item.icon}</div>
                <span className="text-white/80 text-sm font-medium">{item.label}</span>
                <span className="text-white/30 text-[11px] font-mono uppercase tracking-wider">{item.sub}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── SERVIÇOS ── */}
        <section id="servicos">
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-4">Serviços</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">O que entregamos.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`relative rounded-3xl p-8 flex flex-col border transition-all group ${
                  s.highlight
                    ? "bg-white/5 border-white/20 shadow-xl shadow-white/5"
                    : "bg-[#0A0A0A] border-white/5 hover:border-white/15"
                }`}
              >
                {s.highlight && (
                  <span className="absolute -top-3 left-8 text-[10px] font-mono uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full">
                    {s.tag}
                  </span>
                )}
                {!s.highlight && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4 block">{s.tag}</span>
                )}
                <h3 className="text-2xl font-bold mb-3 mt-2">{s.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">{s.desc}</p>
                <div className="space-y-2 mb-8">
                  {s.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-green-500/70 shrink-0" /> {d}
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Investimento</span>
                      <span className="text-white font-bold text-lg">{s.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Prazo</span>
                      <span className="text-white/70 text-sm font-medium">{s.turnaround}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROCESSO ── */}
        <section>
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-4">Como funciona</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Do briefing ao deploy.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all"
              >
                <span className="text-[10px] font-mono text-white/20 tracking-widest mb-4 block">{step.num}</span>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── MATERIAIS ── */}
        <section>
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-4">O que você precisa ter</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Materiais necessários.</h2>
            <p className="text-white/50 mt-4 text-lg font-light">Não se preocupe se não tiver tudo — resolvemos junto.</p>
          </div>
          <div className="space-y-4">
            {materials.map((m, i) => {
              const isOpen = expandedMaterial === m.title;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? "bg-white/[0.04] border-white/15" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}
                >
                  <button
                    onClick={() => setExpandedMaterial(isOpen ? null : m.title)}
                    className="w-full text-left p-8 flex items-center justify-between gap-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                        {m.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{m.title}</h3>
                        {m.optional && (
                          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Opcional</span>
                        )}
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}
                      >
                        <div className="px-8 pb-8 space-y-4">
                          <p className="text-white/60 leading-relaxed">{m.desc}</p>
                          <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-4">
                            <HelpCircle className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                            <p className="text-white/40 text-sm">
                              Não tem? Sem problema — podemos criar, orientar ou substituir com recursos profissionais durante o projeto.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── PAGAMENTO ── */}
        <section>
          <div className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-4">Formas de pagamento</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Pague como preferir.</h2>
            <p className="text-white/50 mt-4 text-lg font-light">
              50% no início + 50% na entrega. Aceitamos PIX, cartão e transferência bancária.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Tab switcher */}
            <div className="flex p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl mb-8 w-fit">
              {[
                { id: "pix", label: "PIX", icon: <QrCode className="w-4 h-4" /> },
                { id: "card", label: "Cartão", icon: <CreditCard className="w-4 h-4" /> },
                { id: "wire", label: "Transferência", icon: <Building className="w-4 h-4" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePayment(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activePayment === tab.id ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* PIX */}
              {activePayment === "pix" && (
                <motion.div key="pix" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center gap-3 bg-[#009EE3]/10 border border-[#009EE3]/20 rounded-xl p-4">
                    <Zap className="w-5 h-5 text-[#009EE3] shrink-0" />
                    <p className="text-sm text-[#009EE3]/90"><strong>Sem taxas adicionais.</strong> Confirmação instantânea após o pagamento.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-40 h-40 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                      <QrCode className="w-16 h-16 text-white/20" />
                    </div>
                    <div className="w-full">
                      <label className="block text-[11px] font-mono text-white/40 mb-2 uppercase tracking-wider">Chave PIX (E-mail)</label>
                      <div className="flex bg-black/40 border border-white/10 rounded-xl p-2 items-center gap-2">
                        <input readOnly value={pixKey} className="bg-transparent text-white px-3 py-2 w-full outline-none font-mono text-sm" />
                        <button onClick={handleCopyPix} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors shrink-0">
                          {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedPix ? "Copiado" : "Copiar"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CARTÃO */}
              {activePayment === "card" && (
                <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <CreditCard className="w-5 h-5 text-yellow-500 shrink-0" />
                    <p className="text-sm text-yellow-500/90"><strong>Atenção às taxas:</strong> Cartão parcelado tem acréscimo das taxas da operadora (Mercado Pago), repassadas ao total.</p>
                  </div>
                  <div className="space-y-4 text-center">
                    <p className="text-white/60 text-sm">O link de pagamento seguro via Mercado Pago é gerado após a aprovação do escopo. Você receberá o link por e-mail e no seu portal.</p>
                    <div className="inline-flex items-center gap-3 text-white/40 text-xs font-mono border border-white/10 rounded-full px-4 py-2">
                      <Shield className="w-3.5 h-3.5" /> Checkout 100% seguro via Mercado Pago
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TRANSFERÊNCIA */}
              {activePayment === "wire" && (
                <motion.div key="wire" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                    <Clock className="w-5 h-5 text-white/60 shrink-0" />
                    <p className="text-sm text-white/60"><strong>Tempo de compensação:</strong> TED/DOC pode levar até 1 dia útil. Para urgência, recomendamos PIX.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["Banco", "Nubank (260)"],
                      ["Agência", "0001"],
                      ["Conta Corrente", "34220261-3"],
                      ["Favorecido", "Thomas Eduardo R. S."],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4">
                        <span className="text-[11px] font-mono text-white/30 uppercase tracking-wider block mb-1">{label}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── PORTAL CALLOUT ── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Lock className="w-8 h-8 text-white/50" />
            </div>
            <div className="flex-grow">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-3 block">Já é cliente?</span>
              <h3 className="text-3xl font-bold mb-3">Acesse seu portal privado.</h3>
              <p className="text-white/50 leading-relaxed max-w-lg">
                Clientes ativos têm acesso a uma área privada com contratos, repositórios, tracking de ads, notas fiscais, histórico de pagamentos e upload de arquivos.
              </p>
            </div>
            <a
              href="/portal"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden shrink-0 whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Entrar no Portal <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="text-center max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Package className="w-12 h-12 text-white/10 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Pronto para começar?</h2>
            <p className="text-white/50 text-lg font-light mb-10">
              Me manda uma mensagem com uma ideia geral do seu projeto. Em até 24h você recebe uma proposta detalhada sem compromisso.
            </p>
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%20Thomas%2C%20quero%20iniciar%20um%20projeto."
              target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-base rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Falar pelo WhatsApp <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            <p className="text-white/20 text-xs mt-6 font-mono">ou mande um e-mail para contato@thomaseduardo.com</p>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
