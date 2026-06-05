import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";
import { AnimatedEmoji } from "./AnimatedEmoji";

const ServicesSection = () => {
  const { t } = useLang();
  const TAB_CONTENT = [
    { title: t.bento.card1Title, desc: t.bento.card1Desc },
    { title: t.bento.card2Title, desc: t.bento.card2Desc },
    { title: t.bento.card3Title, desc: t.bento.card3Desc },
    { title: t.bento.card4Title, desc: t.bento.card4Desc }
  ];

  return (
    <section id="metodologia" className="relative section-padding px-6 bg-pg-bg overflow-hidden">
      
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto relative z-10">
        <motion.div 
          {...FADE_UP}
          className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">
              {t.bento.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tighter leading-[1.1] text-white">
              <TextReveal>{t.bento.h2a}</TextReveal> <br className="hidden sm:block" />
              <span className="text-white/40"><TextReveal delay={0.2}>{t.bento.h2b}</TextReveal></span>
            </h2>
            <p className="text-xl md:text-3xl text-white/70 leading-relaxed font-light max-w-2xl">
              {t.bento.desc}
            </p>
          </div>
          <div className="hidden md:block pb-2">
            <a
              href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre a minha operação.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
            >
              <AnimatedEmoji name="rocket" className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
              <span>Quero Evoluir</span>
            </a>
          </div>
        </motion.div>
    
        {/* Edge-to-edge mobile carousel wrapper with negative margins */}
        <div className="mt-4 md:mt-16 flex md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-12 w-[calc(100%+3rem)] -mx-6 px-6 md:w-full md:mx-0 md:px-0 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 no-scrollbar scroll-px-6">
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
                  Gargalo 0{index + 1}
                </span>
                {/* The bridge to mask the body's top border */}
                <div className="absolute -bottom-[1px] left-0 w-full h-[2px] bg-neutral-900/80 backdrop-blur-md group-hover:bg-neutral-800/80 transition-colors z-20" />
              </div>
              
              {/* Folder Body */}
              <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-b-2xl rounded-tr-2xl p-5 md:p-6 relative z-10 group-hover:border-white/20 transition-colors flex-1 flex flex-col shadow-2xl group-hover:bg-neutral-800/80">
                
                <h3 className="text-lg md:text-2xl font-bold tracking-tight text-white mb-2 md:mb-4 mt-1 md:mt-2">
                  {tab.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light text-sm md:text-lg">
                  {tab.desc}
                </p>
                
                {/* Watermark Number */}
                <span className="absolute bottom-4 right-6 text-5xl md:text-7xl font-mono font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none select-none">
                  0{index + 1}
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
            <span>Falar Comigo</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

