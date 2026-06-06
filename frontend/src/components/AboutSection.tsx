import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { FADE_UP } from "../constants/animations";
import thomasAbout from "../assets/thomas-about.png";
import { useSVGL } from "../hooks/useSVGL";

const AboutSection = () => {
  const { t } = useLang();
  const { getIcon } = useSVGL();
  const sectionRef = useRef<HTMLElement>(null);

  // Use global scroll so it starts moving as soon as the user scrolls down the hero
  const { scrollY } = useScroll();

  // Smooth parallax for mobile image - less aggressive
  const mobileImageY = useTransform(scrollY, [0, 500], [-100, 0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Desktop image animations
  const desktopImageOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const desktopImageY = useTransform(scrollYProgress, [0.2, 0.9], [200, -20]);

  // Animated balloons
  const b1Opacity = useTransform(scrollYProgress, [0.0, 0.2], [0, 1]);
  const b1Scale = useTransform(scrollYProgress, [0.0, 0.2], [0.5, 1]);
  
  const b2Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const b2Scale = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1]);
  
  const b3Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const b3Scale = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]);
  
  const b4Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const b4Scale = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1]);

  return (
    <section ref={sectionRef} id="sobre" className="relative py-12 md:py-24 lg:py-32 w-full flex items-center justify-center bg-pg-bg text-white overflow-hidden z-10">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* MOBILE IMAGE (Parallax at the top) */}
          <motion.div 
            style={{ y: mobileImageY }}
            className="block lg:hidden w-full flex justify-center order-first pointer-events-none -mb-8 relative z-0"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[400px]">
              <img 
                src={thomasAbout} 
                alt="Thomas Eduardo" 
                className="w-full h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] scale-110 origin-bottom" 
                style={{ 
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              />
              
              {/* Balão 1 */}
              <motion.div
                style={{ opacity: b1Opacity, scale: b1Scale }}
                className="absolute top-[20%] -left-2 sm:-left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-1.5 px-3 shadow-xl"
              >
                <div className="text-white font-bold text-xs tracking-tight">+{new Date().getFullYear() - 2023} anos</div>
                <div className="text-emerald-400/80 text-[7px] uppercase tracking-widest font-mono mt-[1px]">Experiência</div>
              </motion.div>

              {/* Balão 2 */}
              <motion.div
                style={{ opacity: b2Opacity, scale: b2Scale }}
                className="absolute top-[40%] -right-2 sm:-right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-1.5 px-3 shadow-xl text-right"
              >
                <div className="text-white font-bold text-xs tracking-tight">+18</div>
                <div className="text-emerald-400/80 text-[7px] uppercase tracking-widest font-mono mt-[1px]">{t.hero.stats.projects}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* LEFT COLUMN: Text & CTA */}
          <motion.div {...FADE_UP} className="relative z-10 lg:col-span-4 flex flex-col items-start">
            <span className="text-[10px] font-mono font-medium text-white/40 tracking-[0.25em] uppercase mb-6 border border-white/10 px-4 py-1.5 rounded-full bg-white/[0.02]">
              {t.about.eyebrow}
            </span>
            
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-bold mb-6 tracking-tighter leading-[1.05]">
              {t.about.h2a} <br className="hidden lg:block" />
              <span className="text-emerald-500">{t.about.h2b.split(' ')[0]} {t.about.h2b.split(' ')[1]}</span> {t.about.h2b.split(' ').slice(2).join(' ')}
            </h2>
            
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-light mb-6">
              {t.about.p1}
            </p>
          </motion.div>

          {/* DESKTOP IMAGE */}
          <div className="hidden lg:flex lg:col-span-5 relative justify-center items-center pointer-events-none overflow-visible">
            <motion.div style={{ y: desktopImageY, opacity: desktopImageOpacity }} className="w-full max-w-[650px] z-[-1]">
              <img 
                src={thomasAbout} 
                alt="Thomas Eduardo" 
                className="w-full h-auto scale-125 origin-center drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]" 
                style={{ 
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Stats & Tech Stack */}
          <div className="lg:col-span-3 flex flex-col gap-10 lg:pl-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {[
                { value: `+${new Date().getFullYear() - 2023} anos`, label: "Experiência" },
                { value: "+18", label: "Projetos Entregues" },
                { value: "100%", label: "Proprietário" },
                { value: "12+", label: "Parceiros" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-center items-start hover:bg-white/[0.04] transition-all group"
                >
                  <span className="text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-emerald-400 transition-colors">{stat.value}</span>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-none">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="pt-2 border-t border-white/[0.04]">
              <span className="text-[9px] font-mono font-bold text-white/20 tracking-[0.3em] uppercase mb-6 block">
                {t.about.certifications}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Vercel"
                ].map((tech, i) => {
                  const iconUrl = getIcon(tech);
                  return (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md text-[10px] font-mono text-white/50 hover:text-white hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all cursor-default"
                    >
                      {iconUrl && (
                        <img src={iconUrl} alt={tech} className="w-3 h-3 object-contain opacity-60" loading="lazy" />
                      )}
                      <span>{tech}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
