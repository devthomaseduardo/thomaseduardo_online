import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { handleSmoothScroll } from "../utils/scroll";
import { HERO_FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";
import heroWeb from "../assets/hero-web.webp";
import thomasHero from "../assets/thomas-hero.png";
import { AnimatedEmoji } from "./AnimatedEmoji";
import { RotatingText } from "./RotatingText";

const Hero = () => {
  const { t } = useLang();

  return (
    <section className="relative z-20 min-h-[85vh] lg:min-h-screen flex items-center justify-center py-20 overflow-hidden bg-[#060606]">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <img src={heroWeb} alt="Visualização técnica de arquitetura de software premium" className="absolute right-0 top-0 w-[85%] md:w-3/4 h-full object-cover object-center md:object-left opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] from-40% via-[#060606]/90 via-60% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/40 via-transparent to-[#060606]" />
        {/* vertical light beam */}
        <div className="absolute right-1/4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center mt-16 lg:mt-0">
        
        {/* Typography Column (Left) */}
        <div className="w-full col-span-1 lg:col-span-6 flex flex-col items-start justify-center text-left order-1">
          <motion.h1 
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
            className="text-[clamp(2.75rem,12vw,5.5rem)] font-bold tracking-tighter leading-[0.85] text-white pb-6 text-left mt-4 lg:mt-0"
          >
            {t.hero.h1a} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t.hero.h1b}</span>
          </motion.h1>

          <motion.div
            {...HERO_FADE_UP}
            className="mb-8 w-full max-w-full"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-2 py-1.5 pr-4 sm:px-2 sm:py-2 sm:pr-6 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] shadow-[0_0_30px_rgba(16,185,129,0.03)] hover:bg-white/[0.04] transition-all duration-300 w-fit max-w-[90vw] overflow-hidden">
              <img 
                src="/avatar.webp" 
                alt="Thomas" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover grayscale opacity-80 shrink-0"
              />
              <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold text-white/70 tracking-[0.1em] sm:tracking-[0.2em] uppercase leading-none truncate">
                <RotatingText />
                <AnimatedEmoji name="waving_hand" className="w-3 h-3 sm:w-4 sm:h-4 origin-bottom-right hover:animate-wave shrink-0" />
              </span>
            </div>
          </motion.div>



          <motion.p
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.2 }}
            className="text-white/50 text-base sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl mt-2"
          >
            {t.hero.desc}
          </motion.p>

          {/* Mobile Image (appears between text and buttons) */}
          <motion.div 
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.25 }}
            className="w-full max-w-[500px] mt-10 lg:hidden flex items-center justify-center relative order-2"
          >
            <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full" />
            <motion.img 
              src={thomasHero} 
              alt="Thomas Eduardo" 
              className="w-full h-auto object-contain rounded-2xl relative z-10 drop-shadow-2xl"
              style={{ 
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
              }}
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-start gap-2 mt-6 lg:mt-8 w-full order-3"
          >
            <a
              href="#casos"
              onClick={(e) => handleSmoothScroll(e as any, "#casos")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white hover:scale-[1.02] active:scale-95 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
            >
              {t.hero.ctaProjects}
            </a>
            <a
              href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de estruturar um projeto e resolver meus gargalos.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] group w-full sm:w-auto"
            >
              <AnimatedEmoji name="rocket" className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
              <span>{t.hero.ctaContact}</span>
            </a>
          </motion.div>
        </div>

        {/* Image Column (Right - Desktop Only) */}
        <div className="hidden lg:flex col-span-6 relative items-center justify-end order-2">
          <motion.div 
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.4 }}
            className="w-full max-w-[900px] relative translate-x-4 lg:translate-x-8"
          >
            <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full" />
            <motion.img 
              src={thomasHero} 
              alt="Thomas Eduardo" 
              className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
              style={{ 
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
