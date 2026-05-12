import React from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import TextReveal from './TextReveal';
import { WhatsAppIcon } from './Icons';

export const ContactSection = () => {
  const { t, lang } = useLang();
  return (
    <section id="contato" className="py-16 px-6 relative overflow-hidden bg-(--pg-bg)">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        {...FADE_UP}
        className="max-w-full mx-auto text-center relative z-10 px-6 md:px-12"
      >
        <span className="text-white/40 font-mono text-[10px] uppercase font-medium tracking-[0.5em] mb-8 block">{t.contact.eyebrow}</span>
        <h2 className="text-3xl sm:text-5xl md:text-[clamp(3.5rem,8vw,5.5rem)] font-bold mb-12 tracking-tighter leading-[1] py-4 text-white">
          <TextReveal>{t.contact.h2a}</TextReveal> <br className="md:hidden" />
          <span className="text-white/60"><TextReveal delay={0.3}>{t.contact.h2b + " " + (t.contact.h2c || "")}</TextReveal></span>
        </h2>
        
        <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed font-medium" style={{ color: '#A1A1A6' }}>
          {t.contact.desc} <br className="hidden md:block"/>
          <span className="text-white italic">{lang === "pt" ? "Garanta sua vaga no roadmap de 2026." : "Secure your spot on the 2026 roadmap."}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de reservar um horário para diagnóstico do meu projeto.")}`}
            target="_blank"
            className="btn-primary flex items-center justify-center gap-5 px-10 py-8 rounded-3xl font-bold uppercase tracking-widest shadow-2xl shadow-white/10 group"
          >
            <WhatsAppIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            {t.contact.btnWhatsapp}
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:devthomaseduardo@gmail.com" 
            className="btn-secondary flex items-center justify-center gap-5 px-10 py-8 rounded-3xl font-black uppercase italic tracking-widest backdrop-blur-md"
          >
            <Mail className="w-8 h-8" />
            {t.contact.btnEmail}
          </motion.a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase font-black tracking-[0.3em] text-white/20">
          <a href="https://linkedin.com/in/devthomaseduardo" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/devthomaseduardo" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>SÃO PAULO / BR</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
