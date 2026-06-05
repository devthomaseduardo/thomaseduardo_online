import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import TextReveal from './TextReveal';
import { AnimatedEmoji } from './AnimatedEmoji';

export const ContactSection = () => {
  const { t } = useLang();
  return (
    <section id="contato" className="py-16 md:py-24 px-4 md:px-12 bg-pg-bg overflow-hidden">
      <motion.div 
        {...FADE_UP}
        className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center"
      >
        <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">{t.contact.eyebrow}</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tighter leading-[1.1] text-white max-w-4xl mx-auto">
          <TextReveal>{t.contact.h2a}</TextReveal> <br className="hidden md:block" />
          <span className="text-white/40"><TextReveal delay={0.2}>{t.contact.h2b}</TextReveal></span>
        </h2>
        
        <p className="text-xl md:text-3xl text-white/70 leading-relaxed font-light mb-12 max-w-2xl mx-auto">
          {t.contact.desc}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre um projeto.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-white/90 transition-colors rounded-lg"
          >
            <AnimatedEmoji name="rocket" className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
            {t.contact.btnWhatsapp}
          </a>
          
          <a 
            href="mailto:devthomaseduardo@gmail.com" 
            className="group flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-white/5 transition-colors rounded-lg"
          >
            <AnimatedEmoji name="handshake" className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
            {t.contact.btnEmail}
          </a>
        </div>
      </motion.div>
    </section>
  );
};
