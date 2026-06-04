import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "motion/react";
import { 
  ArrowRight, CheckCircle2, ChevronRight, Lock, Play, Pause,
  FileText, UploadCloud, CreditCard, LayoutTemplate, Code2, CheckSquare,
  Globe, Package, Download, Terminal, Zap, Shield, HelpCircle, User, BarChart3
} from "lucide-react";

/* ─── DADOS ────────────────────────────────────────── */

const stepsData = [
  {
    num: "01",
    tag: "Entendimento",
    title: "Primeiro, entendemos o que precisa ser construído.",
    text: "Antes de falar em layout ou código, organizamos o objetivo do projeto, público, referências, funcionalidades e prioridades.",
    icon: HelpCircle
  },
  {
    num: "02",
    tag: "Proposta",
    title: "Depois, transformamos a ideia em uma proposta clara.",
    text: "Você recebe uma visão objetiva do escopo, investimento, prazo, etapas e entregáveis.",
    icon: FileText
  },
  {
    num: "03",
    tag: "Materiais",
    title: "Com a proposta aprovada, reunimos os materiais.",
    text: "Logos, textos, imagens, vídeos, referências, acessos e arquivos importantes ficam organizados em uma área própria.",
    icon: UploadCloud
  },
  {
    num: "04",
    tag: "Pagamento",
    title: "Tudo financeiro fica transparente.",
    text: "Você acompanha entrada, saldo, parcelas, serviços adicionais, PIX, Mercado Pago e notas fiscais quando necessário.",
    icon: CreditCard
  },
  {
    num: "05",
    tag: "Design",
    title: "Criamos a estrutura visual com foco em clareza e conversão.",
    text: "O projeto ganha direção visual, hierarquia, responsividade e experiência pensada para o usuário final.",
    icon: LayoutTemplate
  },
  {
    num: "06",
    tag: "Desenvolvimento",
    title: "Depois, tudo é transformado em código real.",
    text: "O projeto é desenvolvido com performance, responsividade, SEO, integrações, deploy e boas práticas técnicas.",
    icon: Code2
  },
  {
    num: "07",
    tag: "Portal do Cliente",
    title: "Você acompanha o projeto em uma área privada.",
    text: "No portal, ficam contratos, pagamentos, materiais, arquivos, repositórios, deploys, tags, analytics e histórico do projeto.",
    icon: Lock
  },
  {
    num: "08",
    tag: "Revisão",
    title: "Revisamos, ajustamos e validamos antes da publicação.",
    text: "O cliente pode solicitar ajustes, conferir detalhes e aprovar a entrega com clareza.",
    icon: CheckSquare
  },
  {
    num: "09",
    tag: "Publicação",
    title: "Com tudo aprovado, o projeto vai ao ar.",
    text: "Configuramos domínio, hospedagem, deploy, analytics, tags, SEO técnico e estrutura final.",
    icon: Globe
  },
  {
    num: "10",
    tag: "Entrega Final",
    title: "Você recebe tudo organizado.",
    text: "O projeto é entregue com arquivos finais, ZIP, repositório, documentação, acessos e estrutura pronta para continuidade.",
    icon: Package
  }
];

const services = [
  {
    id: "landing",
    name: "Landing Page",
    tag: "Para campanhas, captação, autoridade e conversão.",
    desc: "Página de alta conversão para lançar produtos ou captar leads.",
    price: "a partir de R$ 800",
    turnaround: "7–14 dias",
    features: ["Design UI/UX premium", "Responsividade", "SEO técnico", "Analytics", "Deploy"]
  },
  {
    id: "site",
    name: "Website Completo",
    tag: "Para presença institucional e estrutura de marca.",
    desc: "Site institucional completo com múltiplas páginas e CMS.",
    price: "a partir de R$ 1.500",
    turnaround: "21–30 dias",
    features: ["Múltiplas páginas", "CMS para edição", "Blog", "Formulários", "Infraestrutura"]
  },
  {
    id: "app",
    name: "Sistema / Web App",
    tag: "Para operação, áreas privadas e funcionalidades sob medida.",
    desc: "Sistemas web customizados com banco de dados e autenticação.",
    price: "sob consulta",
    turnaround: "30–90 dias",
    features: ["Backend completo", "Banco de dados", "Autenticação", "APIs", "Escalabilidade"]
  }
];

/* ─── COMPONENTES VISUAIS (MOCKUPS FAKES) ────────────── */

const StepVisual = ({ step }: { step: number }) => {
  return (
    <div className="w-full h-full bg-[#080808] border border-white/5 rounded-3xl overflow-hidden relative flex items-center justify-center p-8 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {step === 0 && (
        <div className="w-full max-w-sm space-y-4">
          <div className="h-4 w-1/3 bg-white/10 rounded" />
          <div className="h-10 w-full bg-white/5 border border-white/10 rounded-xl" />
          <div className="h-10 w-full bg-white/5 border border-white/10 rounded-xl" />
          <div className="h-24 w-full bg-white/5 border border-white/10 rounded-xl" />
          <div className="flex gap-2 items-center text-white/40 text-sm mt-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Público-alvo definido
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="w-full max-w-sm bg-black border border-white/10 rounded-2xl p-6 relative">
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full animate-pulse" />
          <div className="flex justify-between items-start mb-6">
            <div className="w-20 h-4 bg-white/20 rounded" />
            <div className="w-12 h-4 bg-white/10 rounded" />
          </div>
          <div className="space-y-3 mb-6">
            <div className="w-full h-2 bg-white/5 rounded" />
            <div className="w-4/5 h-2 bg-white/5 rounded" />
            <div className="w-full h-2 bg-white/5 rounded" />
          </div>
          <button className="w-full py-3 bg-white text-black font-bold text-sm rounded-lg">Aprovar Proposta</button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-sm border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <UploadCloud className="w-10 h-10 text-white/20 mb-4" />
          <p className="text-white/60 font-medium text-sm mb-1">Arraste seus arquivos</p>
          <p className="text-white/30 text-xs">Logos, fotos, textos e PDFs</p>
          <div className="mt-6 flex gap-2 w-full justify-center">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-blue-400/50" /></div>
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-emerald-400/50" /></div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-sm bg-black border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center"><CreditCard className="w-8 h-8 text-white/20" /></div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Entrada 50%</p>
              <p className="text-xl font-bold">R$ 400,00</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/40">Status</span>
            <span className="text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full font-medium">Pago</span>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="w-full max-w-sm bg-black border border-white/10 rounded-2xl overflow-hidden">
          <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="p-6 space-y-4">
            <div className="w-2/3 h-6 bg-white/10 rounded" />
            <div className="w-full h-32 bg-white/5 rounded-xl border border-white/5" />
            <div className="flex gap-4">
              <div className="flex-1 h-20 bg-white/5 rounded-xl" />
              <div className="flex-1 h-20 bg-white/5 rounded-xl" />
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="w-full max-w-sm bg-[#050505] border border-white/10 rounded-2xl overflow-hidden font-mono text-xs">
          <div className="h-8 border-b border-white/10 flex items-center px-4 text-white/30">src/app/page.tsx</div>
          <div className="p-6 space-y-2 text-white/50">
            <p><span className="text-blue-400">import</span> React <span className="text-blue-400">from</span> 'react';</p>
            <p className="mt-4"><span className="text-purple-400">export default function</span> <span className="text-yellow-400">App</span>() {'{'}</p>
            <p className="pl-4"><span className="text-blue-400">return</span> (</p>
            <p className="pl-8 text-white/30">{'<main className="min-h-screen">'}</p>
            <p className="pl-12 text-green-400/50">// Developing...</p>
            <p className="pl-8 text-white/30">{'</main>'}</p>
            <p className="pl-4">);</p>
            <p>{'}'}</p>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="w-full max-w-sm bg-black border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"><Lock className="w-4 h-4 text-blue-400" /></div>
            <span className="font-bold">Portal Privado</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[FileText, CreditCard, UploadCloud, Terminal].map((Icon, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-2 items-start">
                <Icon className="w-5 h-5 text-white/40" />
                <div className="w-12 h-2 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 7 && (
        <div className="w-full max-w-sm bg-black border border-white/10 rounded-2xl p-6">
          <div className="space-y-4 mb-6">
            {['Responsividade OK', 'Performance 100/100', 'SEO Configurado'].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-white/60">{t}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-lg transition-colors border border-white/10">Aprovar Entrega</button>
        </div>
      )}

      {step === 8 && (
        <div className="w-full max-w-sm text-center">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center mb-6">
            <Globe className="w-10 h-10 text-emerald-400" />
          </div>
          <p className="font-mono text-emerald-400 text-sm mb-2">DEPLOY SUCCESSFUL</p>
          <p className="text-white/40 text-xs">Projeto online e operando.</p>
        </div>
      )}

      {step === 9 && (
        <div className="w-full max-w-sm bg-black border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Package className="w-12 h-12 text-white/30 mb-6" />
          <h3 className="font-bold mb-2">Entrega Finalizada</h3>
          <p className="text-white/40 text-sm mb-6">Todos os arquivos empacotados e prontos.</p>
          <button className="w-full py-3 bg-white text-black font-bold text-sm rounded-lg flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Baixar Assets (.zip)
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── PÁGINA ───────────────────────────────────────── */

export default function PropostaStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(stepsData.length - 1, Math.floor(latest * stepsData.length));
    if (step !== activeStep) setActiveStep(step);
  });

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-[#050505] text-white selection:bg-white/20">
      
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-mono text-sm text-white/60 tracking-widest uppercase hover:text-white transition-colors">
          Thomas Eduardo
        </a>
        <a href="/portal" className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30">
          <Lock className="w-3.5 h-3.5" /> Área do Cliente
        </a>
      </nav>

      {/* ── 1. ABERTURA ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#009EE3]/[0.02] blur-[150px] rounded-full" />
        </div>
        
        <div className="max-w-4xl relative z-10 mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-8 border border-white/10 px-4 py-2 rounded-full">
              Proposta Digital
            </span>
            <h1 className="text-[clamp(40px,6vw,80px)] font-bold tracking-[-0.04em] leading-[1.05] mb-8">
              Do primeiro briefing<br />ao projeto publicado.
            </h1>
            <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Uma experiência organizada para transformar sua ideia em um site, sistema ou landing page funcional, visualmente refinada e pronta para operar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
              <a href="#narrativa" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Ver etapas do projeto <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a href="https://wa.me/5511999999999?text=Ol%C3%A1%20Thomas%2C%20quero%20come%C3%A7ar%20um%20projeto." target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-white transition-colors font-medium flex items-center gap-2 border border-transparent hover:border-white/10 px-6 py-4 rounded-xl">
                Começar agora
              </a>
            </div>
          </motion.div>

          {/* Cards inferiores */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Contrato digital", icon: Shield },
              { title: "Pagamento organizado", icon: CreditCard },
              { title: "Portal privado", icon: Lock },
              { title: "Entrega técnica", icon: Package }
            ].map((c, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                <c.icon className="w-5 h-5 text-white/30" />
                <span className="text-xs font-medium text-white/60">{c.title}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. STORYTELLING ANIMADO (STICKY) ── */}
      <section id="narrativa" ref={containerRef} className="relative" style={{ height: `${stepsData.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-[#050505]">
          
          {/* Progress Bar Header */}
          <div className="absolute top-20 left-0 w-full h-1 bg-white/5 z-20">
            <motion.div style={{ width: progressWidth }} className="h-full bg-gradient-to-r from-white/20 to-white/60" />
          </div>

          <div className="flex-1 flex items-center px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10 pt-20">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
              >
                
                {/* Texto */}
                <div className="flex-1 w-full space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
                    <span className="text-5xl md:text-6xl lg:text-8xl font-bold font-mono text-white/10 leading-none">{stepsData[activeStep].num}</span>
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 border border-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full whitespace-nowrap">
                      {stepsData[activeStep].tag}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                    {stepsData[activeStep].title}
                  </h2>
                  <p className="text-white/50 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl">
                    {stepsData[activeStep].text}
                  </p>
                </div>

                {/* Visual Fake Component */}
                <div className="w-full h-[250px] md:h-[350px] lg:flex-1 lg:h-[500px] shrink-0">
                  <StepVisual step={activeStep} />
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* ── 3. O QUE PODE SER CRIADO ── */}
      <section className="px-6 py-40 border-t border-white/5 relative bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-4">Serviços</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">O que podemos criar.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0A0A0A] border border-white/5 hover:border-white/15 rounded-3xl p-8 flex flex-col transition-all group"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4 block min-h-[28px]">{s.tag}</span>
                <h3 className="text-2xl font-bold mb-3">{s.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">{s.desc}</p>
                
                <div className="space-y-3 mb-8">
                  {s.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-1 h-1 rounded-full bg-white/20" /> {feat}
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-6 mt-auto">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Investimento inicial</span>
                      <span className="text-white font-bold">{s.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Prazo</span>
                      <span className="text-white/60 text-sm">{s.turnaround}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PORTAL PRIVADO PREVIEW ── */}
      <section className="px-6 py-40 border-t border-white/5 bg-[#030303] overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#009EE3]/5 to-transparent blur-3xl rounded-full" />
            <div className="aspect-[4/3] w-full bg-[#080808] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl relative z-10">
              {/* Fake Portal Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center"><div className="w-3 h-3 bg-black" /></div>
                  <div>
                    <div className="w-24 h-3 bg-white/20 rounded mb-1" />
                    <div className="w-16 h-2 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><User className="w-4 h-4 text-white/40" /></div>
              </div>
              {/* Fake Portal Content */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[FileText, CreditCard, UploadCloud, Terminal, BarChart3, Package].map((Icon, idx) => (
                  <div key={idx} className="bg-black/50 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 group hover:border-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-white/20 group-hover:text-white/40 transition-colors" />
                    <div className="w-12 h-1.5 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 block mb-4">Workspace</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Tudo centralizado no portal do cliente.</h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-10">
              Esqueça threads infinitas no e-mail ou mensagens perdidas. Toda a infraestrutura do seu projeto tem um endereço único e seguro.
            </p>
            <ul className="grid grid-cols-2 gap-4">
              {['Contratos', 'Pagamentos & Saldo', 'Upload de Materiais', 'Repositórios & Deploys', 'Analytics & GTM', 'Download ZIP', 'Notas Fiscais', 'Timeline Operacional'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-[#009EE3]/50" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. CTA FINAL ── */}
      <section className="py-40 px-6 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-[clamp(36px,5vw,64px)] font-bold tracking-tight mb-6 leading-tight">
            Pronto para transformar sua ideia em uma operação digital real?
          </h2>
          <p className="text-white/50 text-lg font-light mb-12 max-w-xl mx-auto">
            Envie sua ideia inicial e receba uma direção clara sobre escopo, prazo e investimento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%20Thomas%2C%20gostaria%20de%20falar%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-bold text-sm rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-[#009EE3] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Falar pelo WhatsApp <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a href="/portal" className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 font-medium text-sm rounded-xl transition-all">
              Acessar portal
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-12 bg-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-sm uppercase tracking-widest mb-1">Thomas Eduardo</p>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Desenvolvedor Frontend & Full Stack</p>
          </div>
          <div className="flex gap-6 text-[10px] font-mono uppercase tracking-widest text-white/30">
            <a href="https://github.com/thomaseduardo" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/thomaseduardo" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
