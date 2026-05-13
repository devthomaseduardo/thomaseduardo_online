import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { handleSmoothScroll } from "../utils/scroll";
import { FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";

const Hero = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-28 md:py-36 px-6 overflow-hidden bg-pg-bg">
      <div className="container-apple relative z-10 flex flex-col items-start justify-center max-w-5xl">
        <motion.div
          {...FADE_UP}
          className="mb-8"
        >
          <span className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase">
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.h1 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
          className="text-[clamp(40px,7vw,110px)] font-medium tracking-tighter leading-[1.05] text-white pb-6"
        >
          {t.hero.h1a} <br className="hidden md:block" />
          {t.hero.h1b}
        </motion.h1>

        <motion.p
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.2 }}
          className="text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-3xl mt-4"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-16"
        >
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de conversar sobre a minha operação.")}`}
            className="btn-primary w-full sm:w-auto"
          >
            {t.hero.ctaContact}
          </a>
          <a
            href="#cases"
            onClick={(e) => handleSmoothScroll(e, "#cases")}
            className="btn-secondary w-full sm:w-auto !border-transparent hover:!bg-white/5 !text-white/70 hover:!text-white"
          >
            {t.hero.ctaProjects}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
