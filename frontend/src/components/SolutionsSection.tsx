import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Zap, LayoutDashboard, Code2, Check, ArrowRight, ChevronDown, Activity
} from 'lucide-react';
import { useLang } from '../contexts/LangContext';

const SMOOTH_TRANSITION = { type: "spring", stiffness: 40, damping: 20 };
const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" }
};

const SOLUTION_ICONS = [LayoutDashboard, Zap, Laptop, Code2];

export function SolutionsSection() {
  const { t } = useLang();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const SOLUTIONS = t.solutions.items.map((item, index) => ({
    ...item,
    icon: SOLUTION_ICONS[index] || Code2
  }));

  return (
    <section id="solucoes" className="relative z-20 py-16 md:py-24 px-4 md:px-12 bg-[#050505] overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          {...FADE_UP}
          transition={SMOOTH_TRANSITION}
          className="mb-12 md:mb-20 text-left relative"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-[0.2em] uppercase">{t.solutions.eyebrow}</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent hidden md:block" />
          </div>
          
          <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-bold text-white tracking-tighter mb-6 max-w-4xl leading-[1.0]">
            {t.solutions.h2}
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl font-light">
            {t.solutions.desc}
          </p>
        </motion.div>

        {/* Grid de Módulos Operacionais */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-start">
            {SOLUTIONS.map((solution, index) => (
              <motion.div
                key={`solution-${index}`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                {...FADE_UP}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col group w-full mt-4 md:mt-8 cursor-pointer select-none"
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
                <div className={`w-[120px] md:w-[140px] h-8 md:h-10 border-t border-l border-r rounded-t-xl flex items-center px-4 md:px-5 relative z-10 transition-all duration-500 ${
                  expandedIndex === index 
                    ? 'bg-emerald-500/10 border-emerald-500/40 backdrop-blur-xl' 
                    : 'bg-neutral-900/80 border-white/10 backdrop-blur-md group-hover:border-emerald-500/30'
                }`}>
                  <span className={`text-[9px] md:text-[10px] font-mono font-bold transition-colors tracking-widest uppercase truncate ${
                    expandedIndex === index ? 'text-emerald-500' : 'text-white/40 group-hover:text-emerald-500'
                  }`}>
                    Module_0{index + 1}
                  </span>
                  <div className={`absolute -bottom-[1px] left-0 w-full h-[2px] z-20 transition-colors ${
                    expandedIndex === index ? 'bg-emerald-500/5' : 'bg-neutral-900/80'
                  }`} />
                </div>

                {/* Folder Body */}
                <div className={`backdrop-blur-md border rounded-b-2xl rounded-tr-2xl p-6 relative z-10 transition-all duration-500 flex-1 flex flex-col shadow-2xl ${
                  expandedIndex === index 
                    ? 'bg-emerald-500/[0.03] border-emerald-500/40 shadow-emerald-500/5' 
                    : 'bg-neutral-900/80 border-white/10 group-hover:border-emerald-500/30 group-hover:bg-neutral-800/80'
                }`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                      expandedIndex === index 
                        ? 'bg-emerald-500/20 border-emerald-500/50' 
                        : 'bg-white/[0.02] border-white/[0.05] group-hover:bg-emerald-500/5 group-hover:border-emerald-500/10'
                    }`}>
                      <solution.icon className={`w-6 h-6 transition-colors duration-300 ${
                        expandedIndex === index ? 'text-emerald-400' : 'text-white/40 group-hover:text-emerald-500'
                      }`} />
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-white/20 group-hover:text-emerald-500/50 transition-all duration-500 ${expandedIndex === index ? 'rotate-180 text-emerald-500' : ''}`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${expandedIndex === index ? 'text-white/70' : 'text-white/50'}`}>
                    {solution.desc}
                  </p>

                  <AnimatePresence initial={false}>
                    {expandedIndex === index ? (
                      <motion.div
                        key={`content-${index}`}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-col gap-3 mb-8 pt-4 border-t border-emerald-500/10">
                          {solution.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-emerald-500" />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div 
                          className="mt-auto pt-6 border-t border-white/5 group-hover:border-emerald-500/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a 
                            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de saber mais sobre " + solution.title.toLowerCase())}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[10px] font-bold font-mono tracking-widest uppercase text-emerald-500/60 hover:text-emerald-400 transition-colors"
                          >
                            {t.solutions.learnMore} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
