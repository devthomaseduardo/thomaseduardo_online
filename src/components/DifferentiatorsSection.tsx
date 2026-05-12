import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import { IconSaaS, IconPerformance, IconProduct } from './Icons';

export const DifferentiatorsSection = () => {
  const { t } = useLang();
  const icons = [<IconSaaS className="w-8 h-8" />, <IconPerformance className="w-8 h-8" />, <IconProduct className="w-8 h-8" />];
  
  return (
    <section className="py-16 px-6">
      <div className="max-w-full mx-auto px-6 md:px-12 grid lg:grid-cols-3 gap-8">
        {t.differentiators.items.map((item, i) => (
          <motion.div 
            key={i}
            {...FADE_UP}
            className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6 text-white/70 group-hover:scale-110 transition-transform">
              {icons[i]}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">{item.title}</h3>
            <p className="text-white/50 text-base leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
