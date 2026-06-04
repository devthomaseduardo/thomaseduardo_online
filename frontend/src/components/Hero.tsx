import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { handleSmoothScroll } from "../utils/scroll";
import { HERO_FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";
import heroBg from "../assets/hero-web.webp";

const Hero = () => {
  const { t, lang } = useLang();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-28 md:py-36 px-6 overflow-hidden bg-pg-bg">
      {/* Background Image Setup */}
      <div 
        className="absolute inset-0 z-0 opacity-85"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient Overlays for Readability and Seamless Blending */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-pg-bg/40 to-pg-bg" />
      <div className="absolute inset-0 z-0 bg-black/30" />

      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10 flex flex-col items-center justify-center text-center mt-12">
        <motion.div
          {...HERO_FADE_UP}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-2 py-2 pr-6 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
            <img 
              src="/avatar.webp" 
              alt="Thomas" 
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/30"
            />
            <span className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-white/80 tracking-widest uppercase">
              {lang === 'pt' ? 'Olá, eu sou o Thomas' : 'Hi, I am Thomas'} 
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/People/Waving%20Hand.webp" alt="Waving Hand" className="w-5 h-5 inline-block origin-bottom-right hover:animate-wave" />
            </span>
          </div>
        </motion.div>

        <motion.h1 
          {...HERO_FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[1.0] text-white pb-6 text-center"
        >
          {t.hero.h1a} <br />
          {t.hero.h1b}
        </motion.h1>

        <motion.p
          {...HERO_FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.2 }}
          className="text-white/60 text-base md:text-2xl font-light leading-relaxed max-w-3xl mt-4"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          {...HERO_FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-6 mt-16 w-full sm:w-auto"
        >
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de estruturar um projeto e resolver meus gargalos.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 hover:scale-[1.02] active:scale-95 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] group w-full max-w-[320px] sm:w-auto sm:max-w-none"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>{t.hero.ctaContact}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
