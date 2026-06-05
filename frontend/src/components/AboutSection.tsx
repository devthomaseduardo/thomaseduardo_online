import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { ArrowRight } from "lucide-react";
import { FADE_UP } from "../constants/animations";
import thomasAbout from "../assets/thomas-about.png";
import { useSVGL } from "../hooks/useSVGL";

const AboutSection = () => {
  const { t } = useLang();
  const { getIcon } = useSVGL();
  const sectionRef = useRef<HTMLElement>(null);

  // Use global scroll so it starts moving as soon as the user scrolls down the hero
  const { scrollY } = useScroll();

  // Smooth parallax for desktop image
  const imageY = useTransform(scrollY, [0, 1000], [-50, 150]);
  const mobileImageY = useTransform(scrollY, [0, 400], [-250, 0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Animated balloons tied directly to scroll progress
  const b1Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const b1Scale = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]);
  
  const b2Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const b2Scale = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1]);
  
  const b3Opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const b3Scale = useTransform(scrollYProgress, [0.6, 0.8], [0.5, 1]);
  
  const b4Opacity = useTransform(scrollYProgress, [0.8, 1.0], [0, 1]);
  const b4Scale = useTransform(scrollYProgress, [0.8, 1.0], [0.5, 1]);

  return (
    <section ref={sectionRef} id="sobre" className="relative section-padding px-6 md:px-16 lg:px-24 mx-auto flex items-center justify-center bg-(--pg-bg) text-white z-10">
      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* MOBILE IMAGE (Parallax at the top) */}
          <motion.div 
            style={{ y: mobileImageY }}
            className="block lg:hidden w-full flex justify-center order-first pointer-events-none -mb-12 relative z-0"
          >
            <div className="relative w-full max-w-[380px] md:max-w-[450px]">
              <img 
                src={thomasAbout} 
                alt="Thomas Eduardo" 
                className="w-full h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] scale-110 origin-bottom" 
                style={{ 
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                }}
              />
              
              {/* Balão 1: Topo Esquerda */}
              <motion.div
                style={{ opacity: b1Opacity, scale: b1Scale }}
                className="absolute top-[28%] left-1 md:-left-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-1.5 px-2.5 shadow-xl"
              >
                <div className="text-white font-bold text-xs tracking-tight overflow-hidden whitespace-nowrap">
                  <span className="inline-block align-bottom">
                    +{new Date().getFullYear() - 2023} anos
                  </span>
                </div>
                <div className="text-emerald-400/80 text-[7px] uppercase tracking-widest font-mono mt-[1px]">Experiência</div>
              </motion.div>

              {/* Balão 2: Centro Direita */}
              <motion.div
                style={{ opacity: b2Opacity, scale: b2Scale }}
                className="absolute top-[48%] right-1 md:-right-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-1.5 px-2.5 shadow-xl text-right"
              >
                <div className="text-white font-bold text-xs tracking-tight overflow-hidden whitespace-nowrap flex justify-end">
                  <span className="inline-block align-bottom">
                    +18
                  </span>
                </div>
                <div className="text-emerald-400/80 text-[7px] uppercase tracking-widest font-mono mt-[1px]">Projetos</div>
              </motion.div>

              {/* Balão 3: Base Esquerda */}
              <motion.div
                style={{ opacity: b3Opacity, scale: b3Scale }}
                className="absolute bottom-[22%] left-2 md:left-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-1.5 px-2.5 shadow-xl"
              >
                <div className="text-white font-bold text-xs tracking-tight overflow-hidden whitespace-nowrap">
                  <span className="inline-block align-bottom">
                    100%
                  </span>
                </div>
                <div className="text-emerald-400/80 text-[7px] uppercase tracking-widest font-mono mt-[1px]">Proprietário</div>
              </motion.div>

              {/* Balão 4: Base Direita */}
              <motion.div
                style={{ opacity: b4Opacity, scale: b4Scale }}
                className="absolute bottom-[8%] right-2 md:right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-1.5 px-2.5 shadow-xl text-right"
              >
                <div className="text-white font-bold text-xs tracking-tight overflow-hidden whitespace-nowrap flex justify-end">
                  <span className="inline-block align-bottom">
                    12+
                  </span>
                </div>
                <div className="text-emerald-400/80 text-[7px] uppercase tracking-widest font-mono mt-[1px]">Clientes</div>
              </motion.div>
            </div>
          </motion.div>

          {/* LEFT COLUMN: Text & CTA */}
          <motion.div {...FADE_UP} className="relative z-10 lg:col-span-4 flex flex-col items-start lg:pt-10">
            <span className="text-[10px] font-mono font-medium text-white/40 tracking-[0.2em] uppercase mb-4 border border-white/10 px-3 py-1 rounded-full">
              Sobre
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tighter leading-[1.1]">
              A maioria dos sistemas cria complexidade. <br className="hidden lg:block" />
              <span className="text-emerald-500">Eu construo</span> sistemas para removê-la.
            </h2>
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light mb-2">
              Desenvolvo plataformas, automações e operações digitais que transformam processos manuais em sistemas escaláveis.
            </p>
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light mb-6">
              Meu foco não é apenas escrever código. É criar previsibilidade, eficiência e crescimento através da tecnologia.
            </p>

            <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-emerald-400 hover:text-black transition-colors duration-500 overflow-hidden">
              <span className="relative z-10">Minha Jornada</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* DESKTOP IMAGE (Parallax) */}
          <div className="hidden lg:flex lg:col-span-5 relative justify-center items-center pointer-events-none overflow-visible">
            {/* Smooth parallax without aggressive absolute positioning */}
            <motion.div style={{ y: imageY }} className="w-full max-w-[700px] z-[-1] opacity-100">
              <img 
                src={thomasAbout} 
                alt="Thomas Eduardo" 
                className="w-full h-auto scale-150 origin-center drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)]" 
                style={{ 
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Stats & Tech Stack */}
          <div className="lg:col-span-3 flex flex-col gap-8 lg:gap-12 lg:pl-4">
            
            {/* Stats Cards (Desktop Only - Mobile is around image) */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: `+${new Date().getFullYear() - 2023} anos`, label: "Experiência" },
                { value: "+18", label: "Projetos Entregues" },
                { value: "100%", label: "Código Proprietário" },
                { value: "12+", label: "Clientes Atendidos" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-center items-start hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-2xl font-bold text-white mb-1 tracking-tight">{stat.value}</span>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <span className="text-[10px] font-mono font-medium text-white/30 tracking-[0.2em] uppercase mb-6 block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js", "React", "Node.js", "Prisma", 
                  "PostgreSQL", "Docker", "AWS", "Vercel"
                ].map((tech, i) => {
                  const iconUrl = getIcon(tech);
                  return (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 backdrop-blur-md text-[11px] font-mono text-white/70 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all cursor-default"
                    >
                      {iconUrl && (
                        <img src={iconUrl} alt={tech} className="w-3.5 h-3.5 object-contain" loading="lazy" />
                      )}
                      <span>{tech}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Trusted Companies */}
            <div className="pt-2">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[
                    "sleephouse.png", 
                    "yazigi.webp", 
                    "fitflow.webp", 
                    "casalellit.webp", 
                    "reis-do-manto.webp",
                    "brasservice.webp",
                    "contabilidade-almeida.webp",
                    "kell.webp"
                  ].map((filename, i) => (
                    <motion.div
                      key={filename}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="w-10 h-10 rounded-full border-2 border-[#050505] bg-white overflow-hidden flex justify-center items-center relative hover:z-20 transition-all hover:scale-110"
                      style={{ zIndex: 10 - i }}
                    >
                      <img src={`/clientes/${filename}`} alt="Cliente" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110" />
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="ml-4 text-[11px] font-mono text-white/40 leading-tight"
                >
                  Marcas que <br />já confiam
                </motion.div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
