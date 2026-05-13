import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";

const ServicesSection = () => {
  const { t } = useLang();

  return (
    <section id="metodologia" className="relative section-padding px-6 bg-pg-bg overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 px-6">
        <motion.div 
          {...FADE_UP}
          className="mb-16"
        >
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-8">
            {t.bento.eyebrow}
          </span>
          <h2 className="text-[clamp(32px,5vw,80px)] font-medium mb-8 tracking-tighter leading-[1.1] text-white">
            <TextReveal>{t.bento.h2a}</TextReveal> <br className="hidden sm:block" />
            <span className="text-white/40"><TextReveal delay={0.2}>{t.bento.h2b}</TextReveal></span> <br className="hidden sm:block" />
            <span className="text-white/20"><TextReveal delay={0.4}>{t.bento.h2c}</TextReveal></span>
          </h2>
          <p className="text-xl md:text-3xl text-white/70 leading-relaxed font-light max-w-2xl">
            {t.bento.desc}
          </p>
        </motion.div>
    
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {[
            { title: t.bento.card1Title, desc: t.bento.card1Desc },
            { title: t.bento.card2Title, desc: t.bento.card2Desc },
            { title: t.bento.card3Title, desc: t.bento.card3Desc },
            { title: t.bento.card4Title, desc: t.bento.card4Desc }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative p-7 lg:p-9 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="absolute -top-32 -right-32 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none group-hover:bg-white/[0.04] transition-colors duration-700" />
              
              <div className="relative z-10">
                <span className="text-white/20 font-mono text-xs uppercase font-medium tracking-[0.2em] mb-6 block">
                  0{i + 1}
                </span>
                <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-white mb-6">
                  {card.title}
                </h3>
                <p className="text-white/50 leading-relaxed font-light text-lg">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
