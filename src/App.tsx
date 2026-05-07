/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, animate, AnimatePresence } from "motion/react";
import { 
  Code2, 
  LineChart, 
  Zap, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  MessageSquare,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Store,
  Truck,
  FileText,
  ArrowUpRight
} from "lucide-react";
import React, { useState, useEffect } from "react";

import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LinkBio from "./pages/LinkBio";
import RedirectPage from "./pages/RedirectPage";

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  problem: string;
  solution: string;
  result: string;
  image: string;
  clientLogo?: string;
  link?: string;
}

// Constants & Helpers
const CUBIC_BEZIER = [0.4, 0, 0.2, 1];

const SMOOTH_TRANSITION = {
  duration: 0.8,
  ease: CUBIC_BEZIER,
};

const FADE_UP_VARIANT = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: SMOOTH_TRANSITION
  },
};

const FADE_UP = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" },
  variants: FADE_UP_VARIANT,
};

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
  e.preventDefault();
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const offset = 80; // Height of the fixed navbar
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    
    animate(window.scrollY, targetPosition, {
      duration: SMOOTH_TRANSITION.duration,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  }
};

// --- Components ---
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const IconProduct = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 6V18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
  </svg>
);

const IconStrategy = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15L12 9M12 9L15 12M12 9L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 3V5M12 19V21M3 12H5M19 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" opacity="0.3" />
  </svg>
);

const IconExecution = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" className="opacity-10" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 6L21 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    <path d="M7 18L3 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

const IconScale = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 7L13 15L9 11L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7H21V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 7V17H13" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
  </svg>
);

const IconSaaS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2V22" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2" />
  </svg>
);

const IconEcom = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="18" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

const IconFintech = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 14H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 6V18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
  </svg>
);

const IconPerformance = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 12L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 7V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const IconCodePremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    <rect x="11" y="2" width="2" height="2" fill="currentColor" opacity="0.2" />
    <rect x="11" y="20" width="2" height="2" fill="currentColor" opacity="0.2" />
  </svg>
);

const IconGrowth = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// END PREMIUM CUSTOM ICONS


const LoadingScreen = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] }
      }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative w-full max-w-sm px-12">
        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-white font-black italic uppercase tracking-[0.4em] text-[10px] text-center">
              THOMAS_EDUARDO // 2026
            </h2>
          </motion.div>
        </div>
        
        <div className="relative h-[2px] bg-white/5 w-full mt-6 overflow-hidden rounded-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 bg-linear-to-r from-brand-blue via-brand-cyan to-brand-blue shadow-[0_0_20px_rgba(37,99,235,0.6)]"
          />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Optimizing_Core</span>
          <span className="text-[10px] font-mono text-brand-cyan tabular-nums font-bold tracking-widest">{Math.min(percent, 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`p-2 rounded-2xl border transition-all duration-500 flex items-center justify-between ${
          scrolled 
            ? "bg-black/60 border-white/10 backdrop-blur-xl shadow-2xl pl-6 pr-2" 
            : "bg-transparent border-transparent"
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-white tracking-tighter uppercase italic text-sm hidden sm:block">Thomas Eduardo</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Sobre', 'Metodologia', 'Cases', 'Contato'].map(item => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleSmoothScroll(e, `#${item.toLowerCase()}`)}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <a 
            href="/r"
            className={`px-6 py-3 rounded-xl bg-brand-blue text-white text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-brand-blue/20 hover:scale-105 transition-all ${
              scrolled ? "opacity-100" : "hidden sm:block"
            }`}
          >
            VAMOS CONVERSAR
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const AboutSection = () => (
  <section id="sobre" className="py-20 md:py-32 px-6 bg-[#0A0A0A] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-blue/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
    
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Video Column */}
      <motion.div 
        {...FADE_UP}
        className="relative order-2 lg:order-1 flex justify-center"
      >
        <div className="aspect-[9/16] w-full max-w-[420px] rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02] relative group shadow-2xl">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src="/about-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-black/60 backdrop-blur-xl">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex-1">
                <span className="block text-[9px] md:text-[10px] font-mono text-brand-blue uppercase tracking-widest mb-1 md:mb-2 italic">Status Atual</span>
                <span className="block text-base md:text-lg font-bold text-white uppercase italic leading-tight">Engenheiro Fullstack Senior & Product Leader</span>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-blue/20 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-brand-blue animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 md:w-32 h-24 md:h-32 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-32 md:w-40 h-32 md:h-40 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Text Column (Now on Right on Desktop) */}
      <motion.div {...FADE_UP} className="order-1 lg:order-2">
        <span className="text-brand-blue font-mono text-[10px] uppercase font-bold tracking-[0.4em] mb-6 block">Quem sou</span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 uppercase tracking-tighter italic leading-[1] py-2">
          Não apenas código. <br />
          <span className="text-gradient">Estratégia de produto.</span>
        </h2>
        <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
          <p>
            Minha jornada no desenvolvimento começou com a necessidade de resolver problemas reais. Rapidamente percebi que código por si só não gera valor, o que importa é como essa tecnologia transforma processos em lucro.
          </p>
          <p>
            Hoje, atuo como um parceiro estratégico para empresas e empreendedores que buscam elevar seu patamar digital. Desenvolvo sistemas que unem <span className="text-white font-bold italic">design impecável</span> com uma <span className="text-white font-bold italic">arquitetura técnica</span> preparada para escala.
          </p>
          <p>
            Meu foco é criar ativos digitais que trabalham por você, automatizando o que é repetitivo e potencializando o que é lucrativo.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section id="metodologia" className="py-32 bg-[#0A0A0A] overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div {...FADE_UP} className="mb-20 text-center">
        <span className="text-brand-cyan font-mono text-[10px] uppercase font-bold tracking-[0.4em] mb-6 block">Como eu trabalho</span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[1.1] py-2">Processo <span className="text-gradient">Alta Performance</span></h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { step: "01", title: "IMERSÃO", desc: "Entendimento profundo do seu modelo de negócio e gargalos." },
          { step: "02", title: "DESIGN", desc: "Arquitetura da experiência com foco em conversão e usabilidade." },
          { step: "03", title: "CODING", desc: "Desenvolvimento ágil com código limpo e tecnologias de ponta." },
          { step: "04", title: "POLIMENTO", desc: "Testes rigorosos e otimização de performance extrema." },
          { step: "05", title: "ESCALA", desc: "Deploy estratégico e monitoramento contínuo de resultados." }
        ].map((item, i) => (
          <motion.div 
            key={item.step}
            variants={FADE_UP_VARIANT}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...SMOOTH_TRANSITION, delay: i * 0.1 }}
            className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative group"
          >
            <span className="text-4xl font-display font-black text-white/5 block mb-6 group-hover:text-brand-blue/20 transition-colors">{item.step}</span>
            <h3 className="text-xl font-bold mb-4 text-white uppercase italic tracking-tight">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const DifferentiatorsSection = () => (
  <section className="py-32 px-6 bg-[#0A0A0A]">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
      {[
        { 
          title: "SaaS Expertise", 
          desc: "Especialista em softwares multi-tenant, dashboards administrativos e fluxos complexos.",
          icon: <IconSaaS className="w-8 h-8" />
        },
        { 
          title: "Performance Brutal", 
          desc: "Otimização focada em Core Web Vitals e Lighthouse 100 para máxima retenção.",
          icon: <IconPerformance className="w-8 h-8" />
        },
        { 
          title: "Visão de Produto", 
          desc: "Não apenas sigo tarefas, ajudo a refinar a estratégia de negócio do software.",
          icon: <IconProduct className="w-8 h-8" />
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          {...FADE_UP}
          className="p-10 rounded-[40px] border border-white/5 bg-linear-to-br from-white/[0.03] to-transparent hover:border-brand-blue/20 transition-all group"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-8 text-brand-blue group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white uppercase italic tracking-tight">{item.title}</h3>
          <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-6 overflow-hidden bg-[#0A0A0A]">
    {/* Advanced Background System - Sophisticated Aura */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[15%] -right-[5%] w-[100vw] h-[100vw] bg-brand-blue/5 rounded-full blur-[220px]" 
      />
      
      <div className="absolute inset-0 bg-dot-mesh opacity-[0.12] [mask-image:radial-gradient(circle_at_center,black_50%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
    </div>
    
    <div className="max-w-6xl mx-auto relative z-10 w-full text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.5 }
          }
        }}
      >
        <motion.div 
          variants={FADE_UP_VARIANT}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md mb-12"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/50 italic">
            Disponível para novos projetos / Q3 2026
          </span>
        </motion.div>

        <motion.h1 
          variants={FADE_UP_VARIANT}
          className="text-[10vw] md:text-[7.5rem] font-black leading-[1] tracking-[-0.07em] uppercase italic mb-10 py-4"
        >
          ENGENHARIA QUE <br />
          <span className="text-gradient drop-shadow-[0_0_30px_rgba(37,99,235,0.2)]">GERA LUCRO.</span>
        </motion.h1>

        <motion.p 
          variants={FADE_UP_VARIANT}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium tracking-tight"
        >
          Não apenas código. <span className="text-white font-bold italic">Estratégia de produto.</span> <br className="hidden md:block" />
          Transformo ideias em <span className="text-white font-bold italic">ativos digitais</span> que trabalham por você, unindo engenharia de alta performance com visão de negócio real.
        </motion.p>

        <motion.div 
          variants={FADE_UP_VARIANT}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a 
            whileHover={{ scale: 1.05, y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleSmoothScroll(e, '#cases')}
            href="#cases"
            className="w-full sm:w-auto px-12 py-6 rounded-2xl border border-white/10 bg-white/5 text-white font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-4 backdrop-blur-md group"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            VER PROJETOS
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05, y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, vi seu portfólio e gostaria de iniciar um diagnóstico para meu projeto.")}`}
            target="_blank"
            className="w-full sm:w-auto px-12 py-6 rounded-2xl border border-white/10 bg-white/5 text-white font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-4 backdrop-blur-md group"
          >
            ENTRAR EM CONTATO
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const GlobalStats = () => {
  const yearsExp = (() => {
    const start = new Date(2023, 7);
    const now = new Date();
    let diff = now.getFullYear() - start.getFullYear();
    if (now.getMonth() < start.getMonth()) diff--;
    return String(Math.max(1, diff)).padStart(2, '0') + "+";
  })();

  return (
    <section className="py-12 bg-[#0A0A0A] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Projetos Reais", val: "25+" },
            { label: "Tecnologias", val: "12+" },
            { label: "Anos Exp", val: yearsExp },
            { label: "Satisfação", val: "100%" }
          ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <span className="block text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-1">{stat.val}</span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] font-bold">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
};

const SocialProof = () => {
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
    <section className="py-24 bg-[#0A0A0A] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-brand-blue font-mono text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Social Proof</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none text-white">Marcas que <br/><span className="text-gradient">Confiam no Trabalho.</span></h2>
          </div>
          <p className="text-gray-500 text-[10px] max-w-xs font-mono uppercase tracking-widest leading-relaxed">
            Sistemas de alta performance e interfaces premium para empresas que buscam o próximo nível.
          </p>
        </div>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#0A0A0A] to-transparent z-10" />
        
        <div className="flex animate-marquee whitespace-nowrap py-12">
          {/* We repeat the logos twice for a seamless loop with translateX(-50%) */}
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-none flex items-center gap-6 px-12 md:px-20 group/logo">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-500 group-hover/logo:border-brand-blue/30 group-hover/logo:bg-brand-blue/10 shadow-2xl">
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="w-full h-full object-cover brightness-110 group-hover/logo:scale-110 transition-transform duration-500"
                  loading="eager"
                />
              </div>
              <span className="text-sm md:text-base font-bold text-white/40 group-hover/logo:text-white transition-colors uppercase tracking-widest font-display italic">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => (
  <section id="metodologia" className="relative py-24 px-6 bg-[#0A0A0A] overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[160px] pointer-events-none" />

      <motion.div 
        {...FADE_UP}
        className="mb-16 relative z-10"
      >
        <span className="text-brand-blue font-mono text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Metodologia</span>
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter italic leading-[1.1] py-2">Como transformo ideias <br />em ativos <span className="text-gradient">de alto valor</span></h2>
        <p className="text-gray-400 text-lg">Minha metodologia é baseada em três pilares fundamentais, focados em ROI e escalabilidade brutal.</p>
      </motion.div>
  
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 relative z-10">
        <motion.div 
          {...FADE_UP}
          whileHover={{ y: -5 }}
          className="md:col-span-6 lg:col-span-8 p-10 rounded-[32px] border border-white/5 bg-white/[0.02] flex flex-col justify-between group transition-all hover:bg-white/[0.04] hover:border-brand-blue/20 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
              <IconStrategy className="w-8 h-8 text-brand-blue" />
            </div>
            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight italic">Diagnóstico Técnico <br/>& Estratégico</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Identifico os gargalos reais do seu negócio antes da primeira linha de código. 
              Imersão profunda para garantir que o software resolva problemas de verdade e traga retorno financeiro direto.
            </p>
          </div>
          <div className="mt-12 flex gap-6 text-sm font-bold font-mono text-gray-600 uppercase tracking-widest relative z-10">
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-blue" /> Auditoria</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-blue" /> Planejamento</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-blue" /> ROI</span>
          </div>
        </motion.div>
  
        <motion.div 
          {...FADE_UP}
          whileHover={{ y: -5 }}
          className="md:col-span-6 lg:col-span-4 p-10 rounded-[32px] border border-white/5 bg-white/[0.02] flex flex-col group overflow-hidden relative transition-all hover:bg-white/[0.04] hover:border-brand-cyan/20 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-linear-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
              <IconExecution className="w-8 h-8 text-brand-cyan" />
            </div>
            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight italic">Execução <br/>Brutal</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Código limpo, testado e performático. Desenvolvimento ágil sem burocracia, focado em entregas de valor constante.
            </p>
          </div>
        </motion.div>
  
        <motion.div 
          {...FADE_UP}
          whileHover={{ y: -5 }}
          className="md:col-span-6 lg:col-span-5 p-10 rounded-[32px] border border-white/5 bg-white/[0.02] flex flex-col group transition-all hover:bg-white/[0.04] hover:border-yellow-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
              <IconScale className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight italic">Escala<br/> & Suporte</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Arquiteturas que suportam o crescimento explosivo. Suporte contínuo para garantir que seu ativo nunca pare de performar.
            </p>
          </div>
        </motion.div>
  
        <motion.div 
          {...FADE_UP}
          whileHover={{ y: -5 }}
          className="md:col-span-6 lg:col-span-7 p-10 rounded-[32px] border border-white/5 bg-linear-to-br from-brand-blue/10 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden group shadow-2xl backdrop-blur-xl"
        >
          <div className="max-w-md relative z-10">
            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight italic">Tecnologia <br/>de Ponta</h3>
            <p className="text-gray-400 text-lg">
              Utilizo as ferramentas mais sólidas para garantir longevidade e performance extrema ao seu produto digital.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-start md:justify-end max-w-full md:max-w-[280px] relative z-10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            {['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Stripe'].map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold font-mono text-white/50 uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ProjectSection = () => {
  const projects: Project[] = [
    {
      id: "reis-do-manto",
      title: "REIS DO MANTO",
      description: "E-commerce de alta performance para vestuário esportivo premium.",
      technologies: ["Next.js", "Stripe", "TailwindCSS"],
      problem: "Necessidade de um checkout ultra-rápido e interface que transmitisse exclusividade.",
      solution: "Arquitetura baseada em Next.js with otimização extrema de imagens e gateway Stripe.",
      result: "Aumento de 50% na taxa de conversão no primeiro mês.",
      image: "/projetos/Reis do Manto.png",
      clientLogo: "/clientes/reis-do-manto.png",
      link: "https://reisdomanto.com.br"
    },
    {
      id: "bras-service",
      title: "BRAS SERVICE",
      description: "Landing page de alta conversão para serviços de manutenção industrial.",
      technologies: ["React", "TailwindCSS", "Framer Motion"],
      problem: "Baixa taxa de conversão em leads qualificados no site antigo.",
      solution: "Copy focado em autoridade e design industrial agressivo.",
      result: "Aumento de 200% na geração de leads orgânicos.",
      image: "/projetos/Landing Page  Bras Service.png",
      clientLogo: "/clientes/brasservice.jpg",
      link: "https://brasservice.com.br"
    },
    {
      id: "barbearia-piloto",
      title: "BARBEARIA NO PILOTO AUTOMÁTICO",
      description: "SaaS completo para gestão e agendamento automático de barbearias.",
      technologies: ["Next.js", "Prisma", "PostgreSQL"],
      problem: "Dono da barbearia perdia 3h por dia gerenciando horários manualmente.",
      solution: "Sistema de agendamento self-service com confirmação via WhatsApp.",
      result: "Economia de 20h semanais e zero furos na agenda.",
      image: "/sistemas-web.png",
      link: "https://barbearia-no-piloto-automatico.vercel.app/"
    },
    {
      id: "hazap",
      title: "HAZAP",
      description: "Plataforma de gestão de contratos e workflow jurídico.",
      technologies: ["Next.js", "Node.js", "PostgreSQL"],
      problem: "Processos manuais lentos na gestão de contratos complexos.",
      solution: "Digitalização total do workflow with assinatura eletrônica integrada.",
      result: "Redução de 70% no tempo de fechamento de contratos.",
      image: "/projetos/Landing Page Hazap.png",
      clientLogo: "/clientes/hazzap.jpg",
      link: "https://hazap.com.br"
    },
    {
      id: "spinmove",
      title: "SPINMOVE",
      description: "E-commerce de moda urbana com experiência de compra fluida.",
      technologies: ["Next.js", "Stripe", "TailwindCSS"],
      problem: "Checkout complexo causava desistência de compra.",
      solution: "Simplificação radical do fluxo de compra (One-click checkout).",
      result: "Redução de 35% no abandono de carrinho.",
      image: "/projetos/Landing Page Spinmove.png",
      clientLogo: "/clientes/spinmove.jpg",
      link: "https://spinmove.com.br"
    },
    {
      id: "casa-lellit",
      title: "CASA LELLIT",
      description: "E-commerce premium de decoração e mobiliário.",
      technologies: ["Next.js", "Stripe", "TailwindCSS"],
      problem: "Necessidade de uma plataforma que suportasse alto volume de vendas com design de luxo.",
      solution: "Interface minimalista e checkout otimizado.",
      result: "Aumento de 40% nas vendas recorrentes.",
      image: "/projetos/site casa lellit.png",
      clientLogo: "/clientes/casalellit.jpg",
      link: "https://casalellit.com.br"
    },
    {
      id: "yazigi",
      title: "YÁZIGI SWISS PARK",
      description: "Portal educacional para unidade franqueada de escola de idiomas.",
      technologies: ["React", "Node.js", "MongoDB"],
      problem: "Falta de centralização de informações para alunos e responsáveis.",
      solution: "Área logada para acompanhamento de progresso pedagógico.",
      result: "Melhoria de 60% na satisfação dos pais e alunos.",
      image: "/projetos/Landing Page Yázigi Swiss Park.png",
      clientLogo: "/clientes/yazigi.png",
      link: "https://yazigiswisspark.com.br"
    },
    {
      id: "grund-zero",
      title: "GRUND ZERO",
      description: "Landing page tática para assessoria esportiva.",
      technologies: ["React", "Framer Motion", "TailwindCSS"],
      problem: "Necessidade de captar alunos de forma agressiva e direta.",
      solution: "Design escuro com foco em CTAs de alta visibilidade.",
      result: "Taxa de conversão de leads superior a 15%.",
      image: "/projetos/Landing Page Grund Zero.png",
      clientLogo: "/clientes/gz-team.png"
    }
  ];

  return (
    <section id="cases" className="py-16 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden bg-[#0A0A0A]">
      <motion.div 
        {...FADE_UP}
        className="mb-12"
      >
        <span className="text-brand-blue font-mono text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Portfolio</span>
        <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic leading-[1.1] py-2">Projetos que <br/><span className="text-gradient">Resolvem o Jogo.</span></h2>
        <p className="text-gray-400 text-xl max-w-3xl font-medium">Cada projeto é tratado como um produto. Foco total em UI/UX, performance e impacto no faturamento.</p>
      </motion.div>

      <div className="space-y-20 md:space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            {...FADE_UP}
            className={`grid lg:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
          >
            <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="flex items-center gap-4">
                <span className="text-brand-blue font-mono font-bold">0{index + 1}</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{project.technologies[0]} + {project.technologies[1]}</span>
              </div>
              
              <div className="flex flex-col gap-4 md:gap-6">
                {project.clientLogo && (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-brand-blue/30 transition-colors">
                    <img src={project.clientLogo} alt="Client" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                )}
                <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">{project.title}</h3>
              </div>
              
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-white/5">
                <div>
                  <span className="block text-[10px] font-mono text-brand-blue uppercase tracking-widest mb-3 italic">O Desafio</span>
                  <p className="text-sm text-gray-400 leading-relaxed italic">"{project.problem}"</p>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-brand-cyan uppercase tracking-widest mb-3 italic">O Resultado</span>
                  <p className="text-sm text-white font-bold tracking-tight">{project.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-mono text-white tracking-widest uppercase">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 mt-8">
                <motion.a
                  whileHover={{ x: 10 }}
                  href={`/r?to=${encodeURIComponent(`https://wa.me/5511977070209?text=Olá Thomas, vi o case ${project.title} e gostaria de algo similar.`)}`}
                  className="inline-flex items-center gap-4 text-brand-blue font-black uppercase italic tracking-widest group text-xs"
                >
                  SOLICITAR DIAGNÓSTICO SIMILAR
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </motion.a>

                {project.link && project.link !== "#" && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    VISITAR SITE
                  </motion.a>
                )}
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`relative aspect-[16/10] rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/10 group bg-white/5 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              
              {/* Overlapping small detail for premium feel */}
              <div className="absolute bottom-10 right-10 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">Case_Study</span>
                    <span className="block text-xs font-bold text-white uppercase tracking-widest">Full_Deployment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ExpertiseSection = () => (
  <section id="expertise" className="py-24 px-6 max-w-7xl mx-auto bg-[#0A0A0A]">
    <motion.div {...FADE_UP} className="mb-16">
      <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic leading-[1.1] py-2">Minha <span className="text-gradient">expertise</span></h2>
      <p className="text-gray-400">Soluções ponta-a-ponta focadas em conversão.</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          num: "01", 
          title: "SaaS & Dashboards", 
          icon: <IconSaaS className="w-8 h-8 text-brand-blue" />,
          desc: "Desenvolvimento de plataformas multi-tenant escaláveis com foco em automação de processos e gestão eficiente." 
        },
        { 
          num: "02", 
          title: "Sistemas de Pagamento", 
          icon: <IconFintech className="w-8 h-8 text-brand-cyan" />,
          desc: "Integração robusta com Stripe, Mercado Pago e Infinity Pay, garantindo segurança e transparência financeira." 
        },
        { 
          num: "03", 
          title: "Arquitetura Full Stack", 
          icon: <IconCodePremium className="w-8 h-8 text-yellow-500" />,
          desc: "APIs REST seguras com JWT e interfaces responsivas de alta performance em Next.js e AWS." 
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          {...FADE_UP}
          whileHover={{ y: -10 }}
          className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] transition-all hover:border-brand-blue/30"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-5xl font-display font-black text-white/10">{item.num}</span>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              {item.icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">{item.title}</h3>
          <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const TrajectorySection = () => (
  <section id="trajetoria" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden bg-[#0A0A0A]">
    <motion.div {...FADE_UP} className="mb-16 relative z-10">
      <span className="text-brand-blue font-mono text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Experiência</span>
      <h2 className="text-3xl md:text-[5rem] font-black mb-4 uppercase tracking-tighter italic leading-[1.1] py-2">Minha <span className="text-gradient">Jornada</span></h2>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-gray-400 text-lg">De operações críticas à engenharia de software de alta performance.</p>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      {[
        {
          year: "2023 / Atualmente",
          title: "Full Stack Engineer",
          company: "Thomas Eduardo (Freelance)",
          icon: <IconCodePremium className="w-5 h-5 text-brand-blue" />,
          desc: "Foco em SaaS e Fintech. Desenvolvi o 'Barbearia no Piloto Automático' e o 'Paper Contracts', focando em automação e ROI.",
          color: "hover:border-brand-blue/30 shadow-brand-blue/5",
          glow: "bg-brand-blue/10"
        },
        {
          year: "2023 / 2024",
          title: "Suporte & Gestão",
          company: "CCAA",
          icon: <IconStrategy className="w-5 h-5 text-brand-cyan" />,
          desc: "Gestão operacional de matrículas e fluxos administrativos. Onde refinei meu entendimento sobre processos de negócio e UX.",
          color: "hover:border-brand-cyan/30 shadow-brand-cyan/5",
          glow: "bg-brand-cyan/10"
        },
        {
          year: "2021 / 2023",
          title: "Operação & Vendas",
          company: "Lojas Renner",
          desc: "Trabalho em escala. Gestão de estoque e atendimento sob alta demanda em um dos maiores varejistas do país.",
          icon: <IconGrowth className="w-5 h-5 text-white/50" />,
          color: "hover:border-white/20 shadow-white/5",
          glow: "bg-white/5"
        },
        {
          year: "Anterior",
          title: "Logística & Fiscal",
          company: "MRB Express",
          desc: "Raízes na eficiência operacional. Controle de frotas e prazos críticos. A base da minha mentalidade de 'zero atraso'.",
          icon: <IconExecution className="w-5 h-5 text-white/50" />,
          color: "hover:border-white/20 shadow-white/5",
          glow: "bg-white/5"
        }
      ].map((item, i) => (
        <motion.div 
          key={i}
          {...FADE_UP}
          whileHover={{ y: -5 }}
          className={`relative p-8 rounded-[32px] border border-white/5 bg-white/[0.02] transition-all overflow-hidden group shadow-2xl backdrop-blur-sm ${item.color}`}
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {item.icon}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {item.year}
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight italic">{item.title}</h3>
            <span className="text-sm text-brand-cyan font-bold uppercase tracking-widest mb-4 block">{item.company}</span>
            <p className="text-gray-400 text-base leading-relaxed">
              {item.desc}
            </p>
          </div>
          {/* Subtle Background Glow on Hover */}
          <div className={`absolute -bottom-20 -right-20 w-40 h-40 ${item.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        </motion.div>
      ))}
    </div>
  </section>
);

const TechStackGrid = () => {
  const groups = [
    { 
      cat: "Frontend", 
      icon: <IconCodePremium className="w-6 h-6 text-brand-blue" />,
      sub: "Interfaces Premium & Performance",
      techs: [
        { name: "React", logo: "https://cdn.simpleicons.org/react/white" },
        { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
        { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/white" },
        { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/white" }
      ] 
    },
    { 
      cat: "Backend", 
      icon: <IconSaaS className="w-6 h-6 text-brand-cyan" />,
      sub: "Arquitetura & Escalabilidade",
      techs: [
        { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/white" },
        { name: "Express", logo: "https://cdn.simpleicons.org/express/white" },
        { name: "JWT", logo: "https://cdn.simpleicons.org/jsonwebtokens/white" },
        { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma/white" }
      ] 
    },
    { 
      cat: "Infra & DB", 
      icon: <IconPerformance className="w-6 h-6 text-yellow-500" />,
      sub: "Deploy & Cloud Computing",
      techs: [
        { name: "AWS", logo: "https://cdn.simpleicons.org/amazonwebservices/white" },
        { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/white" },
        { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/white" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/white" }
      ] 
    },
    { 
      cat: "Fintech", 
      icon: <IconFintech className="w-6 h-6 text-green-500" />,
      sub: "Checkout & Monetização",
      techs: [
        { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe/white" },
        { name: "Mercado Pago", logo: "https://cdn.simpleicons.org/mercadopago/white" },
        { name: "PayPal", logo: "https://cdn.simpleicons.org/paypal/white" },
        { name: "PagSeguro", logo: "https://cdn.simpleicons.org/pagseguro/white" }
      ] 
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div {...FADE_UP} className="mb-20">
          <span className="text-brand-blue font-mono text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Tech Stack</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter italic leading-[1.1] py-2">Arsenal <span className="text-gradient">Técnico</span></h2>
          <p className="text-gray-400 text-xl max-w-2xl font-medium italic">Ferramentas de ponta selecionadas para máxima performance e impacto nos negócios.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group, i) => (
            <motion.div 
              key={group.cat}
              {...FADE_UP}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 md:p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-blue/30 transition-all duration-500 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                    {group.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{group.cat}</h3>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">{group.sub}</p>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                  {group.techs.map((tech) => (
                    <div 
                      key={tech.name}
                      className="p-3 rounded-2xl border border-white/5 bg-black/40 flex items-center gap-3 hover:border-brand-blue/20 hover:bg-white/5 transition-all group/tech"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover/tech:border-brand-blue/30 transition-all overflow-hidden shrink-0">
                        <img 
                          src={tech.logo} 
                          alt="" 
                          className="w-4 h-4 opacity-50 group-hover/tech:opacity-100 group-hover/tech:scale-110 transition-all" 
                        />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 group-hover/tech:text-white transition-colors uppercase tracking-widest truncate">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Qual o prazo médio de entrega?", a: "Depende da complexidade, mas uma Landing Page de alta performance costuma levar de 7 a 15 dias, enquanto um SaaS completo pode levar de 30 a 90 dias." },
    { q: "Você faz integração com qualquer gateway?", a: "Sim, tenho vasta experiência com Mercado Pago, Stripe e gateways nacionais como Infinity Pay, garantindo checkout transparente." },
    { q: "O software é entregue pronto para escalar?", a: "Sim, utilizo tecnologias modernas como Next.js e Cloud (AWS/Vercel) para garantir que seu sistema suporte picos de tráfego sem lentidão." },
    { q: "Como funciona o suporte pós-entrega?", a: "Ofereço pacotes de manutenção mensal que garantem segurança, atualizações e suporte prioritário para o seu ativo digital." }
  ];

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto bg-[#0A0A0A]">
      <motion.div {...FADE_UP} className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-[1.1] py-2">Dúvidas <span className="text-gradient">Frequentes</span></h2>
      </motion.div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            {...FADE_UP}
            className="border-b border-white/5 overflow-hidden"
          >
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full py-6 flex items-center justify-between text-left group"
            >
              <span className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">{faq.q}</span>
              <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${open === i ? 'rotate-90' : ''}`} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


const Contact = () => {
  return (
    <section id="contato" className="py-32 px-6 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        {...FADE_UP}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <span className="text-brand-cyan font-mono text-[10px] uppercase font-bold tracking-[0.5em] mb-8 block italic">Let's build something real</span>
        <h2 className="text-3xl sm:text-5xl md:text-[clamp(3.5rem,8vw,5.5rem)] font-black mb-12 uppercase tracking-tighter leading-[1] italic py-4">
          VAMOS TRANSFORMAR <br className="md:hidden" />
          <span className="text-gradient drop-shadow-[0_0_40px_rgba(37,99,235,0.3)]">SUA IDEIA EM PRODUTO?</span>
        </h2>
        
        <p className="text-gray-400 text-xl md:text-2xl mb-20 max-w-2xl mx-auto leading-relaxed font-medium">
          Aceitando novos projetos e consultorias estratégicas. <br className="hidden md:block"/>
          <span className="text-white italic">Garanta sua vaga no roadmap de 2026.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de reservar um horário para diagnóstico do meu projeto.")}`}
            target="_blank"
            className="flex items-center justify-center gap-5 px-10 py-8 rounded-3xl bg-brand-blue text-white font-black uppercase italic tracking-widest hover:brightness-110 transition-all shadow-2xl shadow-brand-blue/30 group"
          >
            <WhatsAppIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            WHATSAPP DIRETO
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:devthomaseduardo@gmail.com" 
            className="flex items-center justify-center gap-5 px-10 py-8 rounded-3xl border border-white/10 bg-white/5 text-white font-black uppercase italic tracking-widest hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <Mail className="w-8 h-8" />
            ENVIAR E-MAIL
          </motion.a>
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-12 font-mono text-[10px] uppercase font-black tracking-[0.3em] text-white/20">
          <a href="https://linkedin.com/in/devthomaseduardo" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/devthomaseduardo" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>SÃO PAULO / BR</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => (
  <footer className="pt-32 pb-12 border-t border-white/5 bg-[#0A0A0A] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl shadow-brand-blue/20">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-black text-white tracking-tighter uppercase italic text-xl">thomaseduardo</span>
          </div>
          <p className="text-gray-500 text-lg max-w-sm leading-relaxed font-medium">
            Engenharia de software estratégica focada em performance, design e lucratividade.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.3em] font-mono italic opacity-50">Navegação</h4>
          <ul className="space-y-6">
            {['Sobre', 'Metodologia', 'Cases', 'Contato'].map(link => (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase()}`} 
                  onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase()}`)}
                  className="text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black italic block"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.3em] font-mono italic opacity-50">Contato</h4>
          <ul className="space-y-6">
            <li>
              <a href="mailto:devthomaseduardo@gmail.com" className="text-gray-500 hover:text-brand-cyan transition-colors font-mono text-sm tracking-tight">devthomaseduardo@gmail.com</a>
            </li>
            <li className="flex gap-6 pt-4 border-t border-white/5">
              <a href="https://github.com/devthomaseduardo" target="_blank" className="text-gray-600 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/devthomaseduardo" target="_blank" className="text-gray-600 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-700 text-[9px] font-mono uppercase tracking-[0.5em] font-bold">
        <span>© 2026 Thomas Eduardo. Premium Digital Assets.</span>
        <span className="flex items-center gap-2">
          <div className="text-brand-blue italic">Fullstack_Architect</div>
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          CODED_WITH_EXCELLENCE
        </span>
      </div>
    </div>
  </footer>
);

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-blue/30 overflow-x-hidden relative bg-[#0A0A0A]">
      {/* Global Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <Navbar />

      <main>
        <Hero />
        <GlobalStats />
        <SocialProof />
        <AboutSection />
        <BentoGrid />
        <ProcessSection />
        <ProjectSection />
        <ExpertiseSection />
        <DifferentiatorsSection />
        <TechStackGrid />
        <TrajectorySection />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<LinkBio />} />
        <Route path="/r" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}
