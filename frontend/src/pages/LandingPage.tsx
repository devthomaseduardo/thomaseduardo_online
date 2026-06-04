import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, ExternalLink, Github, Linkedin, Mail, 
  BarChart3, Zap, Layers, Code2, Users, LayoutGrid, CheckCircle2,
  Workflow, Database, LineChart
} from "lucide-react";
import adminHero from "../assets/admin-hero.png";
import brutalistLogo from "../assets/brutalist-logo.png";
import { RotatingText } from "../components/RotatingText";

/* ─── DATA ─────────────────────────────────────────────── */
const BENEFITS = [
  { label: "Projetos Entregues", value: "+18", icon: LayoutGrid },
  { label: "Código Proprietário", value: "100%", icon: Code2 },
  { label: "Tarefas Manuais", value: "-90%", icon: Zap },
  { label: "Retenção de Clientes", value: "+", icon: Users },
];

const SERVICES = [
  { 
    title: "Organização Operacional", 
    desc: "Centralização de dados e fluxos de trabalho. Criação de centros de comando para gerenciar sua empresa inteira em um só lugar.",
    icon: Database 
  },
  { 
    title: "Automação", 
    desc: "Substituição de processos manuais e repetitivos por integrações inteligentes, liberando sua equipe para trabalho estratégico.",
    icon: Workflow 
  },
  { 
    title: "Escalabilidade", 
    desc: "Arquiteturas robustas projetadas para suportar o crescimento da base de clientes sem aumento linear de custo ou complexidade.",
    icon: LineChart 
  },
];

const OTHER_PROJECTS = [
  { name: "Homma Design", desc: "Plataforma de gestão de escritórios de arquitetura." },
  { name: "Portal Nexio", desc: "Sistema de onboarding e gestão de parceiros B2B." },
  { name: "Paper Contracts", desc: "Automação de contratos e assinaturas digitais." },
  { name: "Guardian", desc: "Monitoramento de infraestrutura e alertas em tempo real." },
];

const PROCESS = [
  { num: "01", title: "Diagnóstico", desc: "Mapeamento dos gargalos." },
  { num: "02", title: "Arquitetura", desc: "Desenho da solução técnica." },
  { num: "03", title: "Desenvolvimento", desc: "Código e integrações." },
  { num: "04", title: "Implantação", desc: "Rollout controlado." },
  { num: "05", title: "Escala", desc: "Manutenção e evolução." },
];

const TESTIMONIALS = [
  { text: "A automação do nosso onboarding reduziu o tempo de entrada de clientes de dias para minutos. A previsibilidade que ganhamos foi essencial para o nosso crescimento este ano.", name: "Marcelo Souza", role: "Diretor de Operações", company: "Nexio Corporate" },
  { text: "Precisávamos de um sistema que conversasse com nosso ERP legado e ao mesmo tempo oferecesse uma interface moderna para nossos vendedores. A entrega foi impecável.", name: "Carla Ferraz", role: "Head de Inovação", company: "Homma Design" },
  { text: "O nível de engenharia e a preocupação com a arquitetura do projeto nos deu segurança para escalar nossa operação sem medo de o sistema sair do ar.", name: "Rodrigo Alcantara", role: "CEO", company: "Paper Contracts" },
];

/* ─── COMPONENTS ───────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-8 transition-all duration-300 ${scrolled ? "bg-[#060606]/95 backdrop-blur-md border-b border-white/[0.06]" : ""}`}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-[14px] font-bold tracking-tight text-white">THOMAS EDUARDO</span>
        <div className="hidden md:flex items-center gap-8">
          {["Projetos", "Processo", "Depoimentos"].map(l => (
            <a key={l} href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <a href="#contato" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-none hover:bg-white/90 transition-all">
          Agendar Conversa
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-8 min-h-[90vh] flex items-center">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }} className="max-w-xl">
          <h1 className="text-[clamp(48px,6vw,80px)] font-bold tracking-tighter leading-[1.05] mb-6 text-white">
            Software que escala operações.
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/60 mb-10 leading-relaxed font-light">
            Desenvolvimento de sistemas, automações e plataformas privadas para empresas que precisam crescer com previsibilidade.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#contato" className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 bg-white text-black font-semibold text-[14px] rounded-none hover:bg-white/90 transition-all">
              Agendar Conversa <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#projetos" className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 border border-white/[0.15] text-white font-medium text-[14px] rounded-none hover:bg-white/5 hover:border-white/30 transition-all">
              Ver Projetos
            </a>
          </div>
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.2 }} className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 border border-white/5 shadow-2xl overflow-hidden flex flex-col items-center justify-center bg-[#080808]">
            <img src={brutalistLogo} alt="Massive 3D Monolithic Logo" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            {/* Subtle gradient overlay to blend into the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-transparent to-transparent opacity-50" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="px-8 py-16 border-y border-white/[0.08] bg-[#030303]">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {BENEFITS.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div key={i} initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }} className="flex flex-col items-start gap-3">
              <Icon className="w-6 h-6 text-white/40" />
              <div>
                <span className="block text-[32px] font-bold text-white tracking-tighter leading-none mb-1">{b.value}</span>
                <span className="block text-[13px] text-white/50">{b.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="px-8 py-32">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold tracking-tighter leading-[1.1] mb-6">
            A maioria dos sistemas<br />
            <span className="text-white/40">cria complexidade.</span>
          </h2>
          <p className="text-[16px] text-white/60 leading-relaxed max-w-lg mb-8 font-light">
            Grande parte dos negócios sofre com ferramentas genéricas e desconectadas. O resultado é dados perdidos, retrabalho constante e a equipe gastando mais tempo gerenciando planilhas do que executando o trabalho real. A operação trava em vez de escalar.
          </p>
        </motion.div>

        {/* Minimal Diagram */}
        <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="relative h-[400px] border border-white/[0.08] bg-[#080808] p-8 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 border border-red-500/30 bg-red-500/5 flex flex-col items-center justify-center gap-2">
              <span className="text-[10px] text-red-400 font-mono">ERP Legado</span>
            </div>
            <div className="w-16 h-px bg-red-500/30 border-t border-dashed border-red-500/50" />
            <div className="w-24 h-24 border border-white/20 bg-white/5 flex flex-col items-center justify-center gap-2">
              <span className="text-[10px] text-white/60 font-mono">Planilhas</span>
            </div>
            <div className="w-16 h-px bg-red-500/30 border-t border-dashed border-red-500/50" />
            <div className="w-24 h-24 border border-white/20 bg-white/5 flex flex-col items-center justify-center gap-2">
              <span className="text-[10px] text-white/60 font-mono">WhatsApp</span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-4 py-2 bg-black border border-white/10 shadow-xl font-mono text-[11px] text-white/80">Processos Desconectados</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="px-8 py-32 bg-[#030303] border-t border-white/[0.05]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[40px] font-bold tracking-tighter">O que eu faço</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }} className="p-8 border border-white/[0.08] bg-[#080808] hover:bg-[#0a0a0a] transition-colors">
                <Icon className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />
                <h3 className="text-[20px] font-semibold mb-4 tracking-tight">{s.title}</h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-light">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedCase() {
  return (
    <section id="projetos" className="px-8 py-32">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-16 flex items-center justify-between">
          <h2 className="text-[40px] font-bold tracking-tighter">Projeto Destaque</h2>
          <span className="text-[13px] font-mono text-white/40">Case de Sucesso</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mockups */}
          <div className="lg:col-span-7 relative h-[500px]">
            {/* Desktop */}
            <div className="absolute top-0 left-0 w-4/5 h-[400px] border border-white/10 bg-[#111] shadow-2xl flex flex-col">
              <div className="h-8 border-b border-white/10 flex items-center px-4 bg-black/50">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 mr-1.5" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 mr-1.5" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 relative">
                <img src={adminHero} className="w-full h-full object-cover opacity-60 grayscale" alt="Desktop Mockup" />
              </div>
            </div>
            {/* Mobile */}
            <div className="absolute bottom-0 right-0 w-[240px] h-[450px] border-4 border-[#222] bg-black shadow-2xl flex flex-col">
              <div className="h-6 flex justify-center pt-2">
                <div className="w-16 h-1.5 bg-[#222] rounded-full" />
              </div>
              <div className="flex-1 relative overflow-hidden bg-[#111] border-t border-white/10">
                <img src={adminHero} className="w-full h-full object-cover opacity-50 grayscale" alt="Mobile Mockup" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 lg:pl-10">
            <h3 className="text-[48px] font-bold tracking-tighter leading-none mb-6">Sleep House</h3>
            <p className="text-[16px] text-white/60 mb-8 leading-relaxed font-light">
              Sistema digital completo e arquitetura operacional projetada para unificar o estoque, gerenciar fluxo de vendas e oferecer um front-end de alta performance para a rede de franquias. O resultado foi um showroom robusto com integração nativa ao ecossistema existente.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["React", "Node.js", "PostgreSQL", "Tailwind"].map(t => (
                <span key={t} className="px-3 py-1 border border-white/[0.15] text-[12px] text-white/60 font-mono">{t}</span>
              ))}
            </div>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-all">
              Ver Case Completo <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function OtherProjects() {
  return (
    <section className="px-8 py-24 bg-[#030303] border-t border-white/[0.05]">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-[32px] font-bold tracking-tighter mb-12">Outros Projetos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {OTHER_PROJECTS.map((p, i) => (
            <div key={i} className="p-8 border border-white/[0.08] bg-[#080808] hover:border-white/[0.2] transition-colors group cursor-pointer flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="text-[24px] font-bold tracking-tight mb-3 text-white group-hover:text-white/80 transition-colors">{p.name}</h3>
                <p className="text-[15px] text-white/50 font-light max-w-sm">{p.desc}</p>
              </div>
              <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="px-8 py-32 border-t border-white/[0.05]">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-[40px] font-bold tracking-tighter mb-16 text-center">Processo Estruturado</h2>
        
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          <div className="absolute top-[28px] left-[10%] right-[10%] h-px bg-white/[0.1]" />
          {PROCESS.map((p, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#060606] border border-white/20 rounded-full flex items-center justify-center text-[16px] font-mono font-bold mb-6">
                {p.num}
              </div>
              <h3 className="text-[18px] font-semibold mb-2">{p.title}</h3>
              <p className="text-[14px] text-white/50 font-light px-2">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="flex flex-col gap-8 lg:hidden">
          {PROCESS.map((p, i) => (
            <div key={i} className="flex gap-6 items-start border-l border-white/10 pl-6 relative">
              <div className="absolute -left-[18px] top-0 w-9 h-9 bg-[#060606] border border-white/20 rounded-full flex items-center justify-center text-[12px] font-mono font-bold">
                {p.num}
              </div>
              <div>
                <h3 className="text-[18px] font-semibold mb-1 mt-1">{p.title}</h3>
                <p className="text-[14px] text-white/50 font-light">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-8 py-32 bg-[#030303] border-t border-white/[0.05]">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-[40px] font-bold tracking-tighter mb-16">O que dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }} className="p-8 border border-white/[0.08] bg-[#080808] flex flex-col justify-between">
              <p className="text-[15px] text-white/70 leading-relaxed font-light mb-10">"{t.text}"</p>
              <div>
                <h4 className="text-[16px] font-semibold text-white">{t.name}</h4>
                <p className="text-[13px] text-white/40">{t.role} · {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contato" className="px-8 py-40 border-t border-white/[0.05]">
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="text-[clamp(40px,5vw,72px)] font-bold tracking-tighter leading-[1.05] mb-10">
            Vamos falar sobre sua operação?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://cal.com" target="_blank" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold text-[14px] rounded-none hover:bg-white/90 transition-all">
              Agendar Conversa
            </a>
            <a href="mailto:contato@thomaseduardo.dev" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-white/[0.15] text-white font-medium text-[14px] rounded-none hover:bg-white/5 transition-all">
              Enviar E-mail
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-8 py-12 border-t border-white/[0.08] bg-[#030303]">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-[14px] font-bold tracking-tight text-white">THOMAS EDUARDO</span>
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">GitHub</a>
          <a href="mailto:contato@thomaseduardo.dev" className="text-[13px] text-white/50 hover:text-white transition-colors">E-mail</a>
        </div>
        
        <span className="text-[12px] font-mono text-white/30">
          © {new Date().getFullYear()} <RotatingText />. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}

/* ─── PAGE ─────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060606] text-white font-sans overflow-x-hidden selection:bg-white/20 selection:text-white">
      <Nav />
      <Hero />
      <Benefits />
      <Problem />
      <Services />
      <FeaturedCase />
      <OtherProjects />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
