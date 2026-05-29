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
    <section className="section-padding bg-pg-bg overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.span 
          {...FADE_UP}
          className="text-xs font-mono font-medium text-pg-muted tracking-widest uppercase block mb-16"
        >
          {t.socialProof.eyebrow}
        </motion.span>
        
        <div className="relative w-full flex overflow-hidden mask-edges opacity-90 transition-opacity duration-700">
          <div className="flex w-max animate-marquee gap-12 md:gap-24">
            {logos.concat(logos).concat(logos).map((logo, i) => (
              <div 
                key={i}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/5 flex shrink-0 items-center justify-center bg-white/[0.02]"
              >
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
