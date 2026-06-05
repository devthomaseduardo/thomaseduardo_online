import { motion } from "motion/react";
import { 
  Globe, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUpRight,
  Instagram,
  FileText
} from "lucide-react";
import React from "react";
import { FADE_UP, SMOOTH_TRANSITION } from "../constants/animations";
import { RotatingText } from "../components/RotatingText";
import { AnimatedEmoji } from "../components/AnimatedEmoji";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18.77a7.07 7.07 0 01-1.48 4.31c-1.41 1.76-3.8 2.58-5.99 2.11-2.43-.53-4.47-2.6-4.9-5.07a7.07 7.07 0 012.33-6.64c1.19-.89 2.68-1.29 4.16-1.15v4.11c-.72-.11-1.47.06-2.07.47a3.03 3.03 0 00-1.28 2.6c.11.96.79 1.83 1.71 2.11 1.09.33 2.37-.15 2.87-1.18.15-.3.21-.63.21-.96V.02z" />
  </svg>
);

const LinkBio = () => {
  const LINKS = [
    {
      href: "https://wa.me/5511977070209",
      label: "Diagnóstico Grátis",
      sub: "Vamos escalar seu produto",
      icon: <AnimatedEmoji name="rocket" className="w-5 h-5 shrink-0" />,
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
      href: "https://github.com/devthomaseduardo",
      label: "GitHub",
      sub: "Repositórios técnicos",
      icon: <Github className="w-5 h-5" />
    },
    {
      href: "https://instagram.com/devthomaseduardo",
      label: "Instagram",
      sub: "@devthomaseduardo",
      icon: <Instagram className="w-5 h-5" />
    },
    {
      href: "/cv-thomas.pdf",
      label: "Currículo",
      sub: "Download CV",
      icon: <FileText className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-pg-bg text-white py-20 px-6 selection:bg-white/10">
      <div className="max-w-md mx-auto">
        {/* Header - Now Left Aligned */}
        <motion.div 
          {...FADE_UP}
          className="flex flex-col items-start mb-16"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 p-1 mb-8 relative group">
            <div className="absolute inset-0 bg-white/5 blur-2xl opacity-30" />
            <img 
              src="/avatar-linkbio.png" 
              alt="Logo"
              className="w-full h-full object-cover relative z-10 grayscale rounded-lg" 
            />
          </div>
          
          <span className="text-[10px] font-mono text-pg-muted uppercase tracking-[0.3em] mb-4">
            Senior Fullstack Engineer
          </span>
          <h1 className="text-4xl font-medium tracking-tighter leading-none mb-4">
            <RotatingText />
          </h1>
          <p className="text-white/40 text-sm font-light max-w-xs leading-relaxed">
            Estrategista de software focado em impacto operacional e escala de produtos digitais.
          </p>
        </motion.div>

        {/* Links Grid */}
        <div className="space-y-4">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              {...FADE_UP}
              transition={{ ...SMOOTH_TRANSITION, delay: 0.1 + (i * 0.05) }}
              href={link.href}
              target={link.href.startsWith('http') ? "_blank" : undefined}
              className={`
                group flex items-center justify-between p-6 border transition-all duration-300 rounded-xl
                ${link.primary 
                  ? 'bg-white text-black border-white hover:bg-white/90' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'}
              `}
            >
              <div className="flex items-center gap-5">
                <div className={`
                  flex h-10 w-10 items-center justify-center border transition-colors rounded-lg
                  ${link.primary ? 'border-black/10 text-black' : 'border-white/5 text-white/30 group-hover:text-white group-hover:border-white/10'}
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

          {/* Special Cards */}



          <motion.div
            {...FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.5 }}
          >
            <a 
              href="https://www.tiktok.com/@devthomaseduardo" 
              target="_blank"
              className="group block p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="h-10 w-10 border border-white/5 flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-white/10 transition-all rounded-lg">
                    <TikTokIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-medium text-base tracking-tight text-white">Dicas no TikTok</span>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">@devthomaseduardo</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.7 }}
          className="mt-24 pt-12 border-t border-white/5"
        >
          <p className="text-pg-muted text-[10px] uppercase tracking-[0.4em] font-mono">
            <RotatingText /> © 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkBio;
