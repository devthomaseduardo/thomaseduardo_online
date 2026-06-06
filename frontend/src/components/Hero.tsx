import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { handleSmoothScroll } from "../utils/scroll";
import { HERO_FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";
import heroWeb from "../assets/hero-web.webp";
import thomasHero from "../assets/thomas-hero.png";
import { AnimatedEmoji } from "./AnimatedEmoji";

const getGreetingText = (lang: string) => {
  const hour = new Date().getHours();
  if (lang === 'pt') {
    if (hour >= 5 && hour < 12) return 'Olá, bom dia, eu sou o Thomas';
    if (hour >= 12 && hour < 18) return 'Olá, boa tarde, eu sou o Thomas';
    if (hour >= 18 && hour < 24) return 'Olá, boa noite, eu sou o Thomas';
    return 'Olá, vai dormir, eu sou o Thomas';
  } else {
    if (hour >= 5 && hour < 12) return 'Hi, good morning, I am Thomas';
    if (hour >= 12 && hour < 18) return 'Hi, good afternoon, I am Thomas';
    if (hour >= 18 && hour < 24) return 'Hi, good evening, I am Thomas';
    return 'Hi, go to sleep, I am Thomas';
  }
};

const Hero = () => {
  const { t, lang } = useLang();
  const [greeting, setGreeting] = useState(() => getGreetingText(lang));

  useEffect(() => {
    setGreeting(getGreetingText(lang));
    
    const interval = setInterval(() => {
      setGreeting(getGreetingText(lang));
    }, 60000);
    return () => clearInterval(interval);
  }, [lang]);

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

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-12 lg:mt-0">
        
        {/* Typography Column (Left) */}
        <div className="w-full col-span-1 lg:col-span-6 flex flex-col items-start justify-center text-left order-1">
          <motion.h1 
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
            className="text-[clamp(2.5rem,10vw,5.5rem)] font-bold tracking-tighter leading-[0.9] text-white pb-6 text-left mt-8 lg:mt-0"
          >
            {t.hero.h1a} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t.hero.h1b}</span>
          </motion.h1>

          <motion.div
            {...HERO_FADE_UP}
            className="mb-8 w-full max-w-full"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-1.5 py-1.5 pr-4 sm:px-2 sm:py-2 sm:pr-6 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] shadow-[0_0_30px_rgba(16,185,129,0.03)] hover:bg-white/[0.04] transition-all duration-300 w-fit max-w-full overflow-hidden">
              <img 
                src="/avatar.webp" 
                alt="Thomas" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover grayscale opacity-80 shrink-0"
              />
              <span className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono font-bold text-white/70 tracking-[0.1em] sm:tracking-[0.2em] uppercase leading-none">
                {greeting}
                <AnimatedEmoji name="waving_hand" className="w-3 h-3 sm:w-4 sm:h-4 origin-bottom-right hover:animate-wave shrink-0" />
              </span>
            </div>
          </motion.div>



          <motion.p
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.2 }}
            className="text-white/50 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl mt-2"
          >
            {t.hero.desc}
          </motion.p>

          {/* Mobile Image (appears between text and buttons) */}
          <motion.div 
            {...HERO_FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.25 }}
            className="w-full max-w-[500px] mt-10 lg:hidden flex items-center justify-center relative order-2 scale-110"
          >
            <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full" />
            <motion.img 
              src={thomasHero} 
              alt="Thomas Eduardo" 
              className="w-full h-auto object-contain rounded-2xl relative z-10"
              animate={{ y: [0, -15, 0], scale: [1.05, 1.12, 1.05] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
            className="w-full max-w-[900px] relative scale-125 translate-x-4 lg:translate-x-8"
          >
            <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full" />
            <motion.img 
              src={thomasHero} 
              alt="Thomas Eduardo" 
              className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.05)]"
              animate={{ y: [0, -25, 0], scale: [1.05, 1.15, 1.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
