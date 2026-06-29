import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { handleSmoothScroll } from "../utils/scroll";
import { HERO_FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";
import heroWeb from "../assets/linux-lab.svg";
import thomasHero from "../assets/thomas-hero.png";
import { AnimatedEmoji } from "./AnimatedEmoji";
import { RotatingText } from "./RotatingText";

const Hero = () => {
  const { t } = useLang();

  return (
    <section className="relative z-20 min-h-[80vh] flex items-center py-24 lg:py-32 overflow-hidden bg-[#060606]">
      {/* Refined Background Setup */}
      <div className="absolute inset-0 z-0">
        <img src={heroWeb} alt="Visualização técnica de arquitetura de software premium" className="absolute right-0 top-0 w-[80%] h-full object-cover object-center opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/20 to-[#060606]" />
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Typography Column (Left) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start justify-center text-left">
          <motion.div
            {...HERO_FADE_UP}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
              <img 
                src="/avatar.webp" 
                alt="Thomas" 
                className="w-6 h-6 rounded-full object-cover grayscale opacity-90"
              />
              <span className="flex items-center gap-2 text-[10px] font-mono font-bold text-white/60 tracking-[0.2em] uppercase">
                <RotatingText />
                <AnimatedEmoji name="waving_hand" className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

          <motion.h1 
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.15 }}
            className="text-[clamp(3rem,8vw,6rem)] font-bold tracking-tighter leading-[0.9] text-white pb-8"
          >
            Sistemas inteligentes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">para escalar seu negócio.</span>
          </motion.h1>

          <motion.p
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.25 }}
            className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10"
          >
            {t.hero.desc}
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#casos"
              onClick={(e) => handleSmoothScroll(e as any, "#casos")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white/80 hover:text-white text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
            >
              {t.hero.ctaProjects}
            </a>
            <a
              href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de estruturar um projeto e resolver meus gargalos.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] group"
            >
              <AnimatedEmoji name="rocket" className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>{t.hero.ctaContact}</span>
            </a>
          </motion.div>
        </div>

        {/* Image Column (Right - Desktop) */}
        <div className="hidden lg:flex col-span-5 relative items-center justify-end">
          <motion.div 
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.45 }}
            className="relative w-full max-w-[500px]"
          >
            <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full" />
            <motion.img 
              src={thomasHero} 
              alt="Thomas Eduardo" 
              className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
              style={{ 
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
