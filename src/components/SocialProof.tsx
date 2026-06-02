import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import { FADE_UP } from "../constants/animations";

const SocialProof = () => {
  const { t } = useLang();
  
  const logos = [
    { name: "Casa Lellit", url: "/clientes/casalellit.jpg" },
    { name: "Yázigi", url: "/clientes/yazigi.png" },
    { name: "Bras Service", url: "/clientes/brasservice.jpg" },
    { name: "Sleep House", url: "/clientes/sleephouse.png" },
    { name: "Hazzap", url: "/clientes/hazzap.jpg" },
  ];
  
  return (
    <section className="section-padding bg-pg-bg overflow-hidden">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto text-center">
        <motion.span 
          {...FADE_UP}
          className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-16"
        >
          {t.socialProof.eyebrow}
        </motion.span>
        
        <motion.div 
          {...FADE_UP}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {logos.map((logo, i) => (
            <div key={i} className="relative group flex flex-col items-center">
              {/* Logo Circle */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/10 flex shrink-0 items-center justify-center hover:border-white/20 transition-all duration-300 hover:scale-105">
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Tooltip */}
              <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg whitespace-nowrap">
                  <span className="text-[10px] font-mono font-semibold text-white tracking-widest uppercase">{logo.name}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
