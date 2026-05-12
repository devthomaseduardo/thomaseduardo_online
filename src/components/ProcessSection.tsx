import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, FADE_UP_VARIANT, SMOOTH_TRANSITION } from '../constants/animations';
import TextReveal from './TextReveal';

export const ProcessSection = () => {
  const { t } = useLang();
  return (
    <section id="metodologia" className="py-16 overflow-hidden">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <motion.div {...FADE_UP} className="mb-10 text-center">
          <span className="text-white/40 font-mono text-[10px] uppercase font-medium tracking-[0.4em] mb-4 block">{t.process.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] py-2 text-white">
            <TextReveal>{t.process.h2a}</TextReveal> <span className="text-white/50"><TextReveal delay={0.2}>{t.process.h2b}</TextReveal></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.process.steps.map((item, i) => (
            <motion.div 
              key={item.step}
              variants={FADE_UP_VARIANT}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...SMOOTH_TRANSITION, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative group"
            >
              <span className="text-3xl font-display font-black text-white/5 block mb-4 group-hover:text-white/20 transition-colors">{item.step}</span>
              <h3 className="text-xl font-semibold mb-4 text-white tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
