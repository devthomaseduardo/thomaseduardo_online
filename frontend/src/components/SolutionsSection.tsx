import React from 'react';
import { motion } from 'motion/react';
import { 
  Laptop, Zap, LayoutDashboard, Code2, Check, ArrowRight 
} from 'lucide-react';

const SMOOTH_TRANSITION = { type: "spring", stiffness: 40, damping: 20 };
const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" }
};

const SOLUTIONS = [
  {
    id: 1,
    icon: LayoutDashboard,
    title: 'Sistema Operacional',
    desc: 'Centralize processos, equipe, clientes, estoque, financeiro e ordens de serviço em uma única plataforma.',
    features: ['Ordens de Serviço', 'CRM', 'Gestão Operacional', 'Financeiro', 'Estoque']
  },
  {
    id: 2,
    icon: Zap,
    title: 'Automações Inteligentes',
    desc: 'Automatize tarefas repetitivas, integrações, mensagens, notificações e fluxos internos.',
    features: ['WhatsApp', 'Telegram', 'E-mail', 'APIs', 'Workflows']
  },
  {
    id: 3,
    icon: Laptop,
    title: 'Plataformas Privadas',
    desc: 'Portais do cliente, áreas restritas, dashboards, pagamentos, contratos e arquivos.',
    features: ['Portal do Cliente', 'Área Restrita', 'Dashboards', 'Contratos', 'Pagamentos']
  },
  {
    id: 4,
    icon: Code2,
    title: 'Aplicações Web',
    desc: 'Landing pages, e-commerces, SaaS, portais e sistemas web performáticos.',
    features: ['SaaS', 'Landing Pages', 'E-commerce', 'Websites', 'Portais']
  }
];

export function SolutionsSection() {
  return (
    <section id="solucoes" className="relative z-20 py-16 md:py-24 px-4 md:px-12 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION }}
          className="mb-20 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-[0.2em] uppercase">SOLUÇÕES</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-6 max-w-3xl">
            Soluções que eliminam gargalos.
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl font-light">
            Sistemas, automações e plataformas privadas para organizar processos, reduzir trabalho manual e preparar empresas para crescer.
          </p>
        </motion.div>

        {/* Carousel on mobile, Grid on desktop */}
        <div className="w-[calc(100%+2rem)] -mx-4 md:w-full md:mx-0 overflow-x-auto pb-8 md:pb-0 no-scrollbar snap-x snap-mandatory">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0 min-w-max md:min-w-0">
            {SOLUTIONS.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col group w-[300px] md:w-auto shrink-0 snap-start mt-8"
              >
                {/* Background Layer 2 */}
                <div className="absolute inset-0 scale-[0.92] -translate-y-6 opacity-40 group-hover:-translate-y-8 group-hover:scale-[0.94] transition-all duration-500 z-0 flex flex-col">
                  <div className="w-[120px] md:w-[140px] h-8 md:h-10 bg-neutral-900/40 border-t border-l border-r border-white/5 rounded-t-xl relative z-10">
                    <div className="absolute -bottom-[1px] left-0 w-full h-[2px] bg-neutral-900 z-20" />
                  </div>
                  <div className="bg-neutral-900/40 border border-white/5 rounded-b-2xl rounded-tr-2xl flex-1 relative z-10" />
                </div>
                
                {/* Background Layer 1 */}
                <div className="absolute inset-0 scale-[0.96] -translate-y-3 opacity-60 group-hover:-translate-y-4 group-hover:scale-[0.98] transition-all duration-500 z-0 flex flex-col">
                  <div className="w-[120px] md:w-[140px] h-8 md:h-10 bg-neutral-900/60 border-t border-l border-r border-white/5 rounded-t-xl relative z-10">
                    <div className="absolute -bottom-[1px] left-0 w-full h-[2px] bg-neutral-900 z-20" />
                  </div>
                  <div className="bg-neutral-900/60 border border-white/5 rounded-b-2xl rounded-tr-2xl flex-1 relative z-10" />
                </div>

                {/* Folder Tab */}
                <div className="w-[120px] md:w-[140px] h-8 md:h-10 bg-neutral-900/80 backdrop-blur-md border-t border-l border-r border-white/10 rounded-t-xl flex items-center px-4 md:px-5 relative z-10 transition-colors group-hover:border-emerald-500/30 group-hover:bg-neutral-800/80">
                  <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/40 group-hover:text-emerald-500 transition-colors tracking-widest uppercase truncate">
                    0{index + 1}
                  </span>
                  {/* The bridge to mask the body's top border */}
                  <div className="absolute -bottom-[1px] left-0 w-full h-[2px] bg-neutral-900/80 backdrop-blur-md group-hover:bg-neutral-800/80 transition-colors z-20" />
                </div>

                {/* Folder Body */}
                <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-b-2xl rounded-tr-2xl p-6 relative z-10 group-hover:border-emerald-500/30 transition-colors flex-1 flex flex-col shadow-2xl group-hover:bg-neutral-800/80">
                  
                  {/* Subtle top glow effect inside card on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
                  
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-6 group-hover:bg-emerald-500/5 group-hover:border-emerald-500/10 transition-colors duration-300">
                    <solution.icon className="w-6 h-6 text-white/40 group-hover:text-emerald-500 transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-sm text-white/50 leading-relaxed mb-8">
                    {solution.desc}
                  </p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-emerald-500/10 transition-colors">
                    <a 
                      href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de saber mais sobre " + solution.title.toLowerCase())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase text-white/50 group-hover:text-emerald-500 transition-colors"
                    >
                      Saiba Mais <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
