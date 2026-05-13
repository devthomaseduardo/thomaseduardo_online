import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import labData from '../data/lab.json';

export const EngineeringLab = () => {
  const { t, lang } = useLang();

  return (
    <section id="lab" className="section-padding px-6 bg-pg-bg border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          {...FADE_UP}
          className="mb-12"
        >
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">
            Level 03
          </span>
          <h2 className="text-[clamp(32px,5vw,60px)] font-medium tracking-tighter leading-[1.1] text-white mb-6">
            {t.projects.labTitle}
          </h2>
          <p className="text-lg text-white/40 max-w-xl font-light">
            {t.projects.labDesc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-medium text-white mb-4 tracking-tight group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow font-light">
                  {lang === 'pt' ? item.desc_pt : item.desc_en}
                </p>
                <div className="flex flex-wrap gap-3">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono text-white/30 uppercase tracking-widest px-2 py-1 bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
