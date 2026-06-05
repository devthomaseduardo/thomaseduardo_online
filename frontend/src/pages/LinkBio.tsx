import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Linkedin,
  ArrowUpRight,
  Instagram
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";
import { RotatingText } from "../components/RotatingText";
import { AnimatedEmoji } from "../components/AnimatedEmoji";
import thomasAbout from "../assets/thomas-about.png";

const SPEECH_TEXTS = [
  "Pronto para escalar seu produto? 🚀",
  "Foco em conversão e performance ⚡️",
  "Criando experiências digitais premium ✨",
  "Bora construir algo incrível? 💡",
  "Código limpo, design impecável 💻"
];

const SpeechText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SPEECH_TEXTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[180px] sm:w-[240px] min-h-[20px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-xs sm:text-sm font-medium text-white/90 tracking-tight"
        >
          {SPEECH_TEXTS[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const LinkBio = () => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        window.location.href = "/";
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const LINKS = [
    {
      href: "https://wa.me/5511977070209",
      label: "Começar um Projeto",
      sub: "Diagnóstico gratuito",
      icon: <AnimatedEmoji name="pointing_right" className="w-5 h-5 shrink-0" />,
      primary: true
    },
    {
      href: "/",
      label: "Site Oficial",
      sub: "thomaseduardo.online",
      icon: <Globe className="w-5 h-5" />
    },
    {
      href: "https://linkedin.com/in/devthomaseduardo",
      label: "LinkedIn",
      sub: "Perfil profissional",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      href: "https://instagram.com/devthomaseduardo",
      label: "Instagram",
      sub: "@devthomaseduardo",
      icon: <Instagram className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-pg-bg text-white py-20 px-6 selection:bg-white/10">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          {...FADE_UP}
          className="flex flex-col items-start mb-12"
        >
          <div className="flex items-center gap-5 mb-6">
            {/* Image */}
            <div className="w-20 h-20 rounded-xl overflow-hidden p-1 relative group shrink-0 self-start">
              <div className="absolute inset-0 bg-white/5 blur-2xl opacity-30" />
              <img 
                src={thomasAbout} 
                alt="Thomas Eduardo"
                className="w-full h-full object-cover relative z-10 rounded-lg" 
              />
            </div>
            
            {/* Right Side: Name & Bubble */}
            <div className="flex flex-col items-start">
              <h1 className="text-3xl font-medium tracking-tighter leading-none mb-1 mt-1">
                Thomas Nascimento
              </h1>

              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15, 
                  delay: 0.4 
                }}
                className="relative bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl rounded-tl-sm backdrop-blur-md"
              >
                <SpeechText />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="space-y-2">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              {...FADE_UP}
              transition={{ ...SMOOTH_TRANSITION, delay: 0.1 + (i * 0.05) }}
              href={link.href}
              target={link.href.startsWith('http') ? "_blank" : undefined}
              className={`
                group flex items-center justify-between p-6 transition-all duration-300 rounded-xl
                ${link.primary 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-white/[0.02] hover:bg-white/[0.04]'}
              `}
            >
              <div className="flex items-center gap-5">
                <div className={`
                  flex h-10 w-10 items-center justify-center transition-colors rounded-lg
                  ${link.primary ? 'text-black' : 'text-white/30 group-hover:text-white'}
                `}>
                  {link.icon}
                </div>
                <div>
                  <span className={`block font-medium text-base tracking-tight ${link.primary ? 'text-black' : 'text-white'}`}>
                    {link.label}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${link.primary ? 'text-black/60' : 'text-white/30'}`}>
                    {link.sub}
                  </span>
                </div>
              </div>
              <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${link.primary ? 'text-black/40' : 'text-white/20'}`} />
            </motion.a>
          ))}

          {/* Special Cards Removed */}
        </div>

        {/* Footer */}
        <motion.div 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.7 }}
          className="mt-24 pt-12"
        >
          <p className="text-pg-muted text-[10px] uppercase tracking-[0.4em] font-mono">
            Thomas Nascimento | © 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkBio;
