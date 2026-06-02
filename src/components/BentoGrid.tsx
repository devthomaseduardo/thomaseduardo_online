import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";

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
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
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
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>Quero Evoluir</span>
            </a>
          </div>
        </motion.div>
    
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 w-full">
          {TAB_CONTENT.map((tab: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col group"
            >
              {/* Folder Tab */}
              <div className="w-[140px] h-10 bg-neutral-900/80 backdrop-blur-md border-t border-l border-r border-white/10 rounded-t-xl flex items-center px-5 relative z-10 transition-colors group-hover:border-white/20 group-hover:bg-neutral-800/80">
                <span className="text-[10px] font-mono font-bold text-white/40 group-hover:text-emerald-400 transition-colors tracking-widest uppercase">
                  Gargalo 0{index + 1}
                </span>
                {/* The bridge to mask the body's top border */}
                <div className="absolute -bottom-[1px] left-0 w-full h-[2px] bg-neutral-900/80 backdrop-blur-md group-hover:bg-neutral-800/80 transition-colors z-20" />
              </div>
              
              {/* Folder Body */}
              <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-b-2xl rounded-tr-2xl p-6 relative z-0 group-hover:border-white/20 transition-colors min-h-[180px] flex flex-col shadow-2xl group-hover:bg-neutral-800/80">
                {/* Subtle top accent line on the right side of the tab */}
                <div className="absolute top-0 right-0 w-[calc(100%-140px)] h-[1px] bg-gradient-to-r from-transparent to-white/10 group-hover:to-emerald-400/50 transition-colors duration-500 rounded-tr-2xl" />
                
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4 mt-2">
                  {tab.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light text-base md:text-lg">
                  {tab.desc}
                </p>
                
                {/* Watermark Number */}
                <span className="absolute bottom-4 right-6 text-7xl font-mono font-bold text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none select-none">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile WhatsApp CTA */}
        <motion.div
          {...FADE_UP}
          className="mt-16 flex justify-start md:hidden"
        >
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre a minha operação.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 active:scale-95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>Falar Comigo</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
