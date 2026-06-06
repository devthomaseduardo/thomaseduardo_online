import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import TextReveal from './TextReveal';
import { AnimatedEmoji } from './AnimatedEmoji';
import { ContactForm } from './ContactForm';

export const ContactSection = () => {
  const { t } = useLang();
  return (
    <section id="contato" className="py-24 md:py-40 px-4 md:px-12 bg-pg-bg overflow-hidden border-t border-white/[0.05]">
      <motion.div 
        {...FADE_UP}
        className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
      >
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">{t.contact.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 tracking-tighter leading-[1.1] text-white">
            <TextReveal>{t.contact.h2a}</TextReveal> <br className="hidden md:block" />
            <span className="text-white/40"><TextReveal delay={0.2}>{t.contact.h2b}</TextReveal></span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-12 max-w-xl">
            {t.contact.desc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full">
            <a 
              href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre um projeto.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white/5 transition-colors rounded-xl"
            >
              <AnimatedEmoji name="rocket" className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
              WhatsApp
            </a>
            
            <a 
              href="mailto:devthomaseduardo@gmail.com" 
              className="group flex items-center justify-center gap-3 border border-white/10 text-white/60 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-colors rounded-xl"
            >
              <AnimatedEmoji name="handshake" className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
              E-mail Direto
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end w-full">
          <ContactForm />
        </div>
      </motion.div>
    </section>
  );
};
