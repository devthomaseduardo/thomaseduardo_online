import React from 'react';
import { motion } from 'motion/react';
import { Database, Server, AppWindow } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import TextReveal from './TextReveal';
import { AnimatedEmoji } from './AnimatedEmoji';
export const ProcessSection = () => {
  const { t } = useLang();
  const TAB_CONTENT = (t.process as any).steps;

  return (
    <section id="processo" className="relative py-16 md:py-24 px-4 md:px-12 bg-pg-bg overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <motion.div {...FADE_UP} className="mb-8 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex-1">
            <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">{t.process.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white">
              <TextReveal>{t.process.h2a}</TextReveal> <br className="hidden sm:block" />
              <span className="text-white/40"><TextReveal delay={0.2}>{t.process.h2b}</TextReveal></span>
            </h2>
          </div>

          {/* Graphical Element */}
          <div className="hidden lg:flex flex-1 justify-center items-center py-4">
            <div className="relative w-full max-w-sm h-24 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,208,132,0.1)] relative z-10">
                  <Database className="w-5 h-5 text-white/50" />
              </div>
              
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 via-white/40 to-white/60 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '300%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent" 
                  />
              </div>
              
              <div className="w-16 h-16 rounded-xl bg-neutral-950 border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] z-20 relative">
                  <Server className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 border border-white/20 rounded-xl animate-pulse" />
              </div>
              
              <div className="h-[1px] flex-1 bg-gradient-to-l from-white/10 via-white/40 to-white/60 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: '300%' }}
                    animate={{ x: '-100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-transparent via-white to-transparent" 
                  />
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] relative z-10">
                  <AppWindow className="w-5 h-5 text-white/50" />
              </div>
            </div>
          </div>
          <div className="hidden md:block pb-2">
            <a
              href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre a minha operação.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
            >
              <AnimatedEmoji name="rocket" className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
            <span>{t.process.cta}</span>
            </a>
          </div>
        </motion.div>

        {/* Edge-to-edge mobile carousel wrapper with negative margins */}
        <div className="mt-4 md:mt-16 flex md:grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-12 w-[calc(100%+2rem)] -mx-4 px-4 md:w-full md:mx-0 md:px-0 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 no-scrollbar scroll-px-4">
          {TAB_CONTENT.map((tab: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col group w-[80vw] min-w-[80vw] shrink-0 md:min-w-0 md:w-auto snap-start mt-12"
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
              <div className="w-[120px] md:w-[140px] h-8 md:h-10 bg-neutral-900/80 backdrop-blur-md border-t border-l border-r border-white/10 rounded-t-xl flex items-center px-4 md:px-5 relative z-10 transition-colors group-hover:border-white/20 group-hover:bg-neutral-800/80">
                <span className="text-[9px] md:text-[10px] font-mono font-bold text-white/40 group-hover:text-white/80 transition-colors tracking-widest uppercase">
                  {t.process.phase} {tab.step}
                </span>
                {/* The bridge to mask the body's top border */}
                <div className="absolute -bottom-[1px] left-0 w-full h-[2px] bg-neutral-900/80 backdrop-blur-md group-hover:bg-neutral-800/80 transition-colors z-20" />
              </div>
              
              {/* Folder Body */}
              <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-b-2xl rounded-tr-2xl p-5 md:p-6 relative z-10 group-hover:border-white/20 transition-colors min-h-[180px] flex-1 flex flex-col shadow-2xl group-hover:bg-neutral-800/80">
                <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white mb-2 md:mb-4 mt-1 md:mt-2">
                  {tab.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light text-sm md:text-lg">
                  {tab.desc}
                </p>
                
                {/* Watermark Number */}
                <span className="absolute bottom-4 right-6 text-5xl md:text-7xl font-mono font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none select-none">
                  {tab.step}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile WhatsApp CTA */}
        <motion.div
          {...FADE_UP}
          className="mt-8 flex justify-start md:hidden"
        >
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre a minha operação.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full gap-3 px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
          >
            <AnimatedEmoji name="rocket" className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
            <span>{t.process.mobileCta}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
