import React, { useState } from "react";
import { motion } from "motion/react";
import {
  LayoutGrid, FolderOpen, CreditCard, MessageSquare, Layers,
  ArrowRight, ArrowLeft, Check, Shield, Zap, TrendingUp,
  Clock, Package, Code2, Globe, Database, Cloud, ChevronRight
} from "lucide-react";
import paymentBg from "../assets/payment-hero.webp";

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",  label: "Dashboard",  icon: LayoutGrid    },
  { id: "projetos",   label: "Projetos",   icon: Layers        },
  { id: "materiais",  label: "Materiais",  icon: FolderOpen    },
  { id: "propostas",  label: "Propostas",  icon: CreditCard    },
  { id: "mensagens",  label: "Mensagens",  icon: MessageSquare },
];

const STEPS = [
  { num: "01", label: "O Problema"    },
  { num: "02", label: "A Oportunidade"},
  { num: "03", label: "A Solução"     },
  { num: "04", label: "Arquitetura"   },
  { num: "05", label: "Investimento"  },
  { num: "06", label: "Cronograma"    },
];

const PROBLEMS = [
  { icon: Clock,       title: "Tempo perdido",          desc: "Processos manuais consomem horas que deveriam ser investidas no crescimento." },
  { icon: TrendingUp,  title: "Falta de visibilidade",  desc: "Sem dados centralizados, as decisões são baseadas em intuição, não em métricas." },
  { icon: Zap,         title: "Escalabilidade limitada", desc: "Sistemas desconectados travam o crescimento quando ele mais importa." },
];

const OPPORTUNITIES = [
  { symbol: "+", label: "Produtividade",  desc: "Automação dos processos críticos libera equipe para tarefas estratégicas." },
  { symbol: "+", label: "Visibilidade",   desc: "Dashboard centralizado com métricas em tempo real para decisões precisas." },
  { symbol: "+", label: "Crescimento",    desc: "Infraestrutura escalável preparada para acompanhar sua operação." },
];

const CHECKLIST = [
  "Plataforma personalizada",
  "Design moderno e responsivo",
  "Automação de processos críticos",
  "Dashboard administrativo completo",
  "Integrações e APIs",
  "Segurança e performance",
  "Suporte e evolução contínua",
];

const ARCH = [
  { layer: "Frontend",  color: "text-sky-400",     items: ["React", "Next.js", "TypeScript"] },
  { layer: "Backend",   color: "text-violet-400",  items: ["Node.js", "Prisma", "PostgreSQL"] },
  { layer: "Cloud",     color: "text-emerald-400", items: ["AWS", "Vercel", "CI/CD"] },
];

const TIMELINE = [
  { week: "Semana 1",   label: "Descoberta e Planejamento" },
  { week: "Semana 2",   label: "Arquitetura"               },
  { week: "Semanas 3-4",label: "Desenvolvimento"           },
  { week: "Semana 5",   label: "Testes e QA"               },
  { week: "Semana 6",   label: "Entrega e Deploy"          },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ id, num, tag, headline, children }: {
  id: string; num: string; tag: string; headline: string; children: React.ReactNode;
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className="px-10 py-16 border-b border-white/[0.05]"
  >
    <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 mb-5">
      <span>{num}</span><span className="text-white/10">•</span><span>{tag}</span>
    </span>
    <h2 className="text-[clamp(26px,3.5vw,52px)] font-bold tracking-tighter leading-[1.05] mb-10">{headline}</h2>
    {children}
  </motion.section>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ active }: { active: string }) => (
  <aside className="w-[300px] shrink-0 border-r border-white/[0.05] flex flex-col h-screen sticky top-0 bg-[#060606] overflow-y-auto">
    <div className="h-16 flex items-center gap-3 px-7 border-b border-white/[0.05] shrink-0">
      <div className="w-7 h-7 bg-white flex items-center justify-center rounded-sm shrink-0">
        <span className="text-black text-[11px] font-black">TE</span>
      </div>
      <div>
        <span className="block text-[13px] font-semibold tracking-tight">Thomas Eduardo</span>
        <span className="block text-[10px] font-mono text-white/25 uppercase tracking-wider">Portal do Cliente</span>
      </div>
    </div>

    <div className="px-7 pt-8 pb-6 border-b border-white/[0.05] shrink-0">
      <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/20 block mb-1">Proposta Comercial</span>
      <h1 className="text-[22px] font-bold tracking-tight leading-tight">Sleep House Campinas</h1>
      <p className="text-[12px] text-white/30 mt-3 leading-relaxed">
        Uma solução digital completa para fortalecer sua presença online, automatizar processos e gerar mais resultados.
      </p>
    </div>

    <nav className="px-5 py-6 space-y-1 flex-1">
      <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/15 px-3 mb-3 block">Seções</span>
      {STEPS.map((s, i) => (
        <a
          key={s.num}
          href={`#s${s.num}`}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
            active === s.num
              ? "bg-white/[0.07] text-white"
              : "text-white/30 hover:text-white/60 hover:bg-white/[0.03]"
          }`}
        >
          <span className="text-[10px] font-mono text-white/20 w-5 shrink-0">{s.num}</span>
          <span className="text-[12px] font-medium">{s.label}</span>
          {active === s.num && <ChevronRight className="w-3 h-3 ml-auto text-white/30" />}
        </a>
      ))}
    </nav>

    <div className="mx-5 mb-6 p-5 border border-white/[0.07] bg-[#0a0a0a] rounded-xl">
      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 block mb-2">Proposta Personalizada</span>
      <p className="text-[11px] text-white/35 leading-relaxed">
        Esta proposta foi elaborada exclusivamente para atender às necessidades do seu negócio.
      </p>
    </div>
  </aside>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PropostaPage() {
  const [activeSection] = useState("01");

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-[#e0e0e0] font-sans flex overflow-hidden">
      <Sidebar active={activeSection} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top Nav */}
        <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-8 bg-[#060606] sticky top-0 z-40 shrink-0">
          <nav className="flex items-center gap-1">
            {NAV.map(item => {
              const Icon = item.icon;
              const isActive = item.id === "propostas";
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

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] border-b border-white/[0.05] min-h-[280px]">
          <div className="px-10 py-14 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-white/25 border border-white/[0.07] px-3 py-1.5 rounded-sm mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Proposta Comercial
              </span>
              <h2 className="text-[clamp(34px,4vw,60px)] font-bold tracking-tighter leading-[1.0] mb-4">
                Sua operação digital,<br />do zero ao ar.
              </h2>
              <p className="text-[14px] text-white/35 max-w-lg leading-relaxed">
                Uma plataforma personalizada que conecta pessoas, processos e dados — desenvolvida para escalar com o seu negócio.
              </p>
            </motion.div>
          </div>
          <div className="border-l border-white/[0.05] relative overflow-hidden hidden lg:block">
            <img src={paymentBg} alt="Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#060606] to-transparent" />
          </div>
        </section>

        {/* ── S01: O Problema ── */}
        <Section id="s01" num="01" tag="O Problema" headline="Seu negócio enfrenta gargalos que limitam o crescimento.">
          <p className="text-[14px] text-white/35 max-w-2xl leading-relaxed mb-10">
            Processos manuais, sistemas desconectados e ausência de automação geram perda de tempo, erros e oportunidades desperdiçadas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROBLEMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 border border-white/[0.07] bg-[#0a0a0a] rounded-xl hover:border-white/[0.14] transition-all">
                  <div className="w-8 h-8 border border-white/[0.08] bg-white/[0.03] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-white/40" />
                  </div>
                  <span className="block text-[13px] font-semibold mb-2">{p.title}</span>
                  <span className="block text-[12px] text-white/30 leading-relaxed">{p.desc}</span>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* ── S02: A Oportunidade ── */}
        <Section id="s02" num="02" tag="A Oportunidade" headline="Transformar desafios em vantagem competitiva.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OPPORTUNITIES.map((o, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-7 border border-white/[0.07] bg-[#0a0a0a] rounded-xl">
                <span className="text-[36px] font-bold text-white/10 leading-none block mb-3">{o.symbol}</span>
                <span className="block text-[15px] font-bold mb-2">{o.label}</span>
                <span className="block text-[12px] text-white/30 leading-relaxed">{o.desc}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── S03: A Solução ── */}
        <Section id="s03" num="03" tag="A Solução" headline="Um sistema completo, pensado para sua operação.">
          <p className="text-[14px] text-white/35 max-w-2xl leading-relaxed mb-10">
            Desenvolvimento de uma plataforma personalizada que conecta pessoas, processos e dados em um único ecossistema digital.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-sm border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-[13px] text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── S04: Arquitetura ── */}
        <Section id="s04" num="04" tag="Arquitetura" headline="Stack moderno e escalável.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARCH.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 border border-white/[0.07] bg-[#0a0a0a] rounded-xl">
                <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${a.color} block mb-4`}>{a.layer}</span>
                <div className="space-y-2">
                  {a.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      <span className="text-[13px] text-white/70 font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── S05: Investimento ── */}
        <Section id="s05" num="05" tag="Investimento" headline="Investimento do Projeto.">
          <div className="max-w-lg border border-white/[0.1] bg-[#0a0a0a] rounded-2xl overflow-hidden">
            <div className="px-8 py-8 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 block mb-3">Pagamento único</span>
              <span className="text-[56px] font-bold tracking-tighter leading-none block">R$ 4.900</span>
              <span className="text-white/25 font-mono text-sm mt-1 block">,00</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {[
                { icon: Package,  label: "Entrega completa",      desc: "Site + CMS + Treinamento"    },
                { icon: Shield,   label: "Suporte incluso",       desc: "30 dias após entrega"        },
                { icon: Code2,    label: "Tecnologia de ponta",   desc: "Escalável e segura"          },
                { icon: Check,    label: "Garantia de satisfação", desc: "Revisões incluídas"         },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-4 px-8 py-4">
                    <div className="w-7 h-7 border border-white/[0.07] bg-white/[0.03] rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-white/30" />
                    </div>
                    <div>
                      <span className="block text-[13px] font-medium text-white/70">{f.label}</span>
                      <span className="block text-[11px] text-white/25">{f.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ── S06: Cronograma ── */}
        <Section id="s06" num="06" tag="Cronograma" headline="Entrega em 6 semanas.">
          <div className="space-y-0 max-w-xl">
            {TIMELINE.map((t, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-sm flex items-center justify-center border shrink-0 ${
                    i === 0 ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/[0.08]"
                  }`}>
                    <span className="text-[9px] font-mono text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-white/[0.05] my-1" />}
                </div>
                <div className="pb-6">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/25 mb-0.5">{t.week}</span>
                  <span className="block text-[14px] font-medium text-white/70">{t.label}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA Final ── */}
        <section className="px-10 py-16 border-b border-white/[0.05]">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-2xl">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold tracking-tighter leading-[1.0] mb-4">
              Pronto para transformar<br />sua operação?
            </h2>
            <p className="text-[14px] text-white/35 mb-8 leading-relaxed">
              Vamos iniciar este projeto juntos. Aprove a proposta e agendaremos o kickoff imediatamente.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="flex items-center gap-3 bg-white hover:bg-neutral-100 active:scale-[0.98] text-black font-bold text-[11px] uppercase tracking-[0.2em] px-8 py-4 rounded-xl transition-all duration-200 group">
                Aprovar Proposta
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/30 border border-white/[0.08] hover:border-white/20 hover:text-white/60 px-8 py-4 rounded-xl transition-all">
                Agendar Reunião
              </button>
            </div>
          </motion.div>
        </section>

        {/* Bottom actions */}
        <div className="px-10 pb-12 flex items-center justify-between pt-8">
          <button className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/25 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />Voltar
          </button>
          <a href="/material" className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/25 hover:text-white transition-colors">
            Ir para Materiais<ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
