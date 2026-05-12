import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { handleSmoothScroll } from "../utils/scroll";
import { FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";

const Hero = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-dot-mesh opacity-10 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 50%)',
          backgroundSize: '100% 100%',
          animation: 'mesh-shift 20s infinite linear'
        }}
      />
      
      <div className="container-apple relative z-10 text-center flex flex-col items-center justify-center">
        <motion.div
          {...FADE_UP}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-xs font-mono font-medium text-white/70 tracking-widest uppercase">
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.h1 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
          className="display-xl pb-2"
        >
          {t.hero.h1a} <br />
          <span className="text-gradient italic">{t.hero.h1b}</span>
        </motion.h1>

        <motion.p
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.2 }}
          className="body-text-white max-w-2xl mx-auto mt-6 text-lg sm:text-xl text-white/60"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <a
            href="#cases"
            onClick={(e) => handleSmoothScroll(e, "#cases")}
            className="btn-primary w-full sm:w-auto"
          >
            {t.hero.ctaProjects}
          </a>
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de uma consultoria.")}`}
            className="btn-secondary w-full sm:w-auto"
          >
            {t.hero.ctaContact}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
