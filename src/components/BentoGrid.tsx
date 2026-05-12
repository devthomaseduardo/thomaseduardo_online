import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";
import { IconStrategy, IconExecution, IconScale } from "./Icons";

const BentoGrid = () => {
  const { t } = useLang();

  return (
    <section id="metodologia" className="relative py-16 px-6 bg-(--pg-bg) overflow-hidden">
      <div className="max-w-full mx-auto relative z-10 px-6 md:px-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] rounded-full blur-[160px] pointer-events-none" />

        <motion.div 
          {...FADE_UP}
          className="mb-10 relative z-10"
        >
          <span className="label-caps mb-4 block">{t.bento.eyebrow}</span>
          <h2 className="text-3xl md:text-6xl font-bold mb-4 tracking-tighter leading-[1.1] py-2 text-white">
            <TextReveal>{t.bento.h2a}</TextReveal> <br />
            <TextReveal delay={0.2}>{t.bento.h2b}</TextReveal>{" "}
            <span className="text-white/50">
              <TextReveal delay={0.4}>{t.bento.h2c}</TextReveal>
            </span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>
            {t.bento.desc}
          </p>
        </motion.div>
    
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 relative z-10">
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-8 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col justify-between group transition-all hover:bg-white/[0.02] hover:border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <IconStrategy className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{t.bento.card1Title}</h3>
              <p className="text-lg leading-relaxed max-w-xl" style={{ color: '#A1A1A6' }}>
                {t.bento.card1Desc}
              </p>
            </div>
            <div className="mt-8 flex gap-4 text-sm font-medium font-mono text-white/30 uppercase tracking-widest relative z-10">
              {t.bento.tags.map(tag => (
                <span key={tag} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/40" /> {tag}
                </span>
              ))}
            </div>
          </motion.div>
    
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-4 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col group overflow-hidden relative transition-all hover:bg-white/[0.02] hover:border-white/5 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <IconExecution className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{t.bento.card2Title}</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>
                {t.bento.card2Desc}
              </p>
            </div>
          </motion.div>
    
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-5 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col group transition-all hover:bg-white/[0.02] hover:border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <IconScale className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{t.bento.card3Title}</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>
                {t.bento.card3Desc}
              </p>
            </div>
          </motion.div>
    
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-7 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col justify-center group transition-all hover:bg-white/[0.02] hover:border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{t.bento.card4Title}</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>
                {t.bento.card4Desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
