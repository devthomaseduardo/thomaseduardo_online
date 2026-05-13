import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP, FADE_UP_VARIANT, SMOOTH_TRANSITION } from '../constants/animations';
import TextReveal from './TextReveal';

export const ProcessSection = () => {
  const { t } = useLang();
  return (
    <section id="processo" className="section-padding bg-pg-bg overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div {...FADE_UP} className="mb-16">
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">{t.process.eyebrow}</span>
          <h2 className="text-[clamp(32px,5vw,80px)] font-medium tracking-tighter leading-[1.1] text-white">
            <TextReveal>{t.process.h2a}</TextReveal> <br className="hidden sm:block" />
            <span className="text-white/40"><TextReveal delay={0.2}>{t.process.h2b}</TextReveal></span>
          </h2>
        </motion.div>

        <div className="flex flex-col space-y-0">
          {t.process.steps.map((item, i) => (
            <motion.div 
              key={item.step}
              variants={FADE_UP_VARIANT}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...SMOOTH_TRANSITION, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-16 border-t border-white/5 pt-12 pb-12 md:pt-16 md:pb-16 group"
            >
              <span className="text-sm font-mono text-white/30 uppercase tracking-widest block">{item.step}</span>
              <div>
                <h3 className="text-3xl md:text-5xl font-medium mb-6 text-white tracking-tight">{item.title}</h3>
                <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
