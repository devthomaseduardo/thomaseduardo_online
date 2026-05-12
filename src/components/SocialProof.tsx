import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";

const SocialProof = () => {
  const { t } = useLang();
  
  const logos = [
    { name: "Bras Service", url: "/clientes/brasservice.jpg" },
    { name: "Casa Lellit", url: "/clientes/casalellit.jpg" },
    { name: "Contabilidade Almeida", url: "/clientes/contabilidade-almeida.png" },
    { name: "FitFlow", url: "/clientes/fitflow.png" },
    { name: "GZ Team", url: "/clientes/gz-team.png" },
    { name: "Hazzap", url: "/clientes/hazzap.jpg" },
    { name: "Kell", url: "/clientes/kell.jpg" }
  ];
  
  return (
    <section className="py-12 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-full mx-auto px-6 md:px-12 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="label-caps mb-6 block"
            >
              {t.socialProof.eyebrow}
            </motion.span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter italic leading-tight text-white">
              <TextReveal>{t.socialProof.h2a}</TextReveal> <br/>
              <span className="text-white/50">
                <TextReveal delay={0.2}>{t.socialProof.h2b}</TextReveal>
              </span>
            </h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[13px] max-w-xs font-mono uppercase tracking-widest leading-relaxed border-l border-white/10 pl-6" 
            style={{ color: '#A1A1A6' }}
          >
            {t.socialProof.desc}
          </motion.p>
        </div>
      </div>
      
      <div className="relative flex overflow-x-hidden py-8">
        <div className="absolute inset-y-0 left-0 w-60 bg-linear-to-r from-[var(--pg-bg)] via-[var(--pg-bg)]/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-60 bg-linear-to-l from-[var(--pg-bg)] via-[var(--pg-bg)]/80 to-transparent z-10" />
        
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div 
              key={i} 
              className="flex-none flex items-center gap-6 px-8 md:px-14 group/logo"
            >
              <div className="relative">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/[0.1] bg-white/[0.05] flex items-center justify-center group-hover/logo:scale-110 transition-all duration-700">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] group-hover/logo:text-white/70 transition-colors">Client</span>
                <span className="text-base md:text-lg font-bold text-white/60 group-hover/logo:text-white transition-all duration-500 uppercase tracking-tighter">
                   {logo.name}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-full mx-auto px-6 md:px-12 mt-8">
        <div className="h-[1px] w-full bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  );
};

export default SocialProof;
