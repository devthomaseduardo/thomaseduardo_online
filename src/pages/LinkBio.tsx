import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  FileText, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUpRight,
  ShoppingBag,
  Zap,
  Instagram,
  X,
  ChevronRight,
  ChevronLeft,
  Truck
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SMOOTH_TRANSITION = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: SMOOTH_TRANSITION,
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18.77a7.07 7.07 0 01-1.48 4.31c-1.41 1.76-3.8 2.58-5.99 2.11-2.43-.53-4.47-2.6-4.9-5.07a7.07 7.07 0 012.33-6.64c1.19-.89 2.68-1.29 4.16-1.15v4.11c-.72-.11-1.47.06-2.07.47a3.03 3.03 0 00-1.28 2.6c.11.96.79 1.83 1.71 2.11 1.09.33 2.37-.15 2.87-1.18.15-.3.21-.63.21-.96V.02z" />
  </svg>
);

const SpotlightCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative group rounded-[32px] overflow-hidden ${className}`}>
    <div className="relative bg-[#0F0F0F] rounded-[31px] h-full w-full">
      {children}
    </div>
  </div>
);

const LinkBio = () => {
  const QUICK_LINKS = [
    {
      href: "/",
      icon: <Globe className="w-6 h-6" />,
      label: "Site Oficial",
      meta: "thomaseduardo.online",
      description: "Portfólio completo e serviços.",
      isFull: true
    },
    {
      href: "https://linkedin.com/in/devthomaseduardo",
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      meta: "Perfil profissional",
    },
    {
      href: "https://github.com/devthomaseduardo",
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      meta: "Repositórios",
    },
    {
      href: "https://instagram.com/devthomaseduardo",
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      meta: "@devthomaseduardo",
    },
    {
      href: "/cv-thomas.pdf",
      icon: <FileText className="w-6 h-6" />,
      label: "Currículo",
      meta: "CV online",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-8 px-6 selection:bg-brand-blue/30">
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #2563EB; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes mesh-shift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}} />

      <div className="fixed inset-0 bg-dot-mesh opacity-10 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #2563EB 0%, transparent 50%)',
          backgroundSize: '100% 100%',
          animation: 'mesh-shift 20s infinite linear'
        }}
      />
      
      <div className="max-w-xl mx-auto relative z-10">
        <motion.div 
          {...FADE_UP}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 rounded-full border-2 border-brand-blue p-1.5 mx-auto mb-4 relative group">
            <div className="absolute inset-0 rounded-full bg-brand-blue/30 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
             <img src="/avatar-linkbio.png" alt="Thomas Eduardo" className="w-full h-full rounded-full object-cover shadow-2xl relative z-10 border border-white/10" />
             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-blue rounded-full border-2 border-[#0A0A0A] flex items-center justify-center z-20">
               <Zap className="w-3 h-3 text-white fill-white" />
             </div>
          </div>
          <h1 className="text-4xl font-black uppercase italic mb-1 tracking-tighter">Thomas Eduardo</h1>
          <p className="text-brand-blue text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-1">Senior Fullstack Engineer</p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-[8px] font-bold uppercase tracking-widest">
            <Globe className="w-2.5 h-2.5" />
            <span>São Paulo, Brasil</span>
          </div>
        </motion.div>

        <div className="space-y-3 mb-10">
          <motion.a
            {...FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
            href="https://wa.me/5511977070209"
            target="_blank"
            className="group flex w-full items-center justify-between gap-4 rounded-[32px] border border-brand-blue/40 bg-linear-to-br from-brand-blue via-brand-blue/90 to-brand-cyan px-7 py-5 text-left shadow-2xl shadow-brand-blue/20 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 shadow-inner">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="block font-black text-lg text-white uppercase tracking-tight leading-none mb-1">Diagnóstico Grátis</span>
                <span className="text-[9px] text-white/80 uppercase font-bold tracking-widest">Vamos escalar seu produto</span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
          </motion.a>

          {/* Primary Site Link - Full Width */}
          {QUICK_LINKS.filter(l => l.isFull).map((link, i) => (
            <motion.a
              key={i}
              {...FADE_UP}
              transition={{ ...SMOOTH_TRANSITION, delay: 0.15 }}
              href={link.href}
              target="_blank"
              className="group flex w-full items-center justify-between gap-4 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-2xl px-7 py-5 text-left hover:border-brand-blue/40 hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/30 transition-all duration-300">
                  {link.icon}
                </div>
                <div>
                  <span className="block font-black text-lg text-white uppercase tracking-tight leading-none mb-1">{link.label}</span>
                  <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{link.meta}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-800 group-hover:text-brand-cyan transition-colors" />
            </motion.a>
          ))}

          {/* Social Links - 2x2 Grid for Balance */}
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.filter(l => !l.isFull).map((link, i) => (
              <motion.a
                key={i}
                {...FADE_UP}
                transition={{ ...SMOOTH_TRANSITION, delay: 0.2 + (i * 0.05) }}
                href={link.href}
                target="_blank"
                className="group flex flex-col p-5 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-2xl hover:border-brand-blue/40 hover:bg-white/[0.06] transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/30 transition-all duration-300">
                    {React.cloneElement(link.icon as React.ReactElement, { className: "w-5 h-5" })}
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-800 group-hover:text-brand-cyan transition-all" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white uppercase tracking-tight mb-0.5">{link.label}</span>
                  <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">{link.meta}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Shop CTA - Decoupled & Premium */}
          <motion.div
            {...FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.4 }}
            className="mt-4"
          >
            <Link 
              to="/shop" 
              className="group block p-1 rounded-[34px] bg-linear-to-br from-white/10 via-white/5 to-transparent hover:from-brand-blue/40 hover:via-brand-blue/10 transition-all duration-500 shadow-2xl"
            >
              <div className="bg-[#0F0F0F] rounded-[33px] p-6 flex items-center justify-between overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-blue opacity-0 group-hover:opacity-[0.03] transition-opacity" />
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-blue blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                    <div className="h-16 w-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center relative z-10 group-hover:border-brand-blue/50 transition-colors">
                      <ShoppingBag className="w-8 h-8 text-gray-400 group-hover:text-brand-blue transition-colors" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-blue">E-commerce</span>
                      <div className="w-1 h-1 rounded-full bg-brand-blue animate-pulse" />
                    </div>
                    <h4 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-1">Shop Seleção</h4>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Equipamentos de alta performance</p>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue transition-all">
                  <ArrowUpRight className="w-5 h-5 text-gray-800 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* TikTok Spotlight */}
          <motion.div
            {...FADE_UP}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.5 }}
            className="mt-3"
          >
            <SpotlightCard>
              <a 
                href="https://www.tiktok.com/@devthomaseduardo" 
                target="_blank"
                className="flex items-center gap-5 p-5 group/tiktok"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-blue blur-xl opacity-20 group-hover/tiktok:opacity-40 transition-opacity" />
                  <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center relative z-10 border border-white/5">
                    <TikTokIcon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">Conteúdo</span>
                  </div>
                  <h4 className="text-base font-black uppercase italic tracking-tighter leading-none mb-1">Dicas no TikTok</h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">@devthomaseduardo</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover/tiktok:text-brand-blue transition-colors" />
              </a>
            </SpotlightCard>
          </motion.div>
        </div>

        <motion.div 
          {...FADE_UP}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.8 }}
          className="mt-8 text-center pb-10"
        >
          <div className="w-10 h-1 bg-white/5 mx-auto mb-6 rounded-full" />
          <p className="text-gray-800 text-[8px] uppercase tracking-[0.5em] font-mono font-bold">
            Handcrafted by Thomas Eduardo © 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkBio;
