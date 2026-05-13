import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import TextReveal from './TextReveal';

export const ContactSection = () => {
  const { t } = useLang();
  return (
    <section id="contato" className="section-padding px-6 bg-pg-bg overflow-hidden border-t border-white/5">
      <motion.div 
        {...FADE_UP}
        className="max-w-5xl mx-auto px-6"
      >
        <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">{t.contact.eyebrow}</span>
        <h2 className="text-[clamp(32px,5vw,80px)] font-medium mb-8 tracking-tighter leading-[1.1] text-white max-w-4xl">
          <TextReveal>{t.contact.h2a}</TextReveal> <br className="hidden md:block" />
          <span className="text-white/40"><TextReveal delay={0.2}>{`${t.contact.h2b} ${t.contact.h2c || ""}`}</TextReveal></span>
        </h2>
        
        <p className="text-xl md:text-3xl text-white/70 leading-relaxed font-light mb-12 max-w-2xl">
          {t.contact.desc}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre um projeto.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white text-black px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            {t.contact.btnWhatsapp}
          </a>
          
          <a 
            href="mailto:devthomaseduardo@gmail.com" 
            className="flex items-center justify-center border border-white/20 text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
          >
            {t.contact.btnEmail}
          </a>
        </div>
      </motion.div>
    </section>
  );
};
