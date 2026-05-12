/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, useScroll, animate } from "motion/react";
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
  ArrowUpRight,
  Instagram,
  Sun,
  Moon
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LangProvider, useLang } from "./contexts/LangContext";

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
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: CUBIC_BEZIER }
  },
};

const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: CUBIC_BEZIER } },
};

const SLIDE_LEFT = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: CUBIC_BEZIER } },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const FADE_UP = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  variants: FADE_UP_VARIANT,
};

// Animated number counter
const AnimatedCounter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; },
    });
    return controls.stop;
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
};

// Magnetic hover wrapper
const Magnetic = ({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * strength);
    y.set((e.clientY - top - height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
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

// --- New Animation Components ---

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"]'));
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};

const TextReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const words = children.split(" ");
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } }
      }}
      className="inline-block"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] py-[1em] -my-[1em] leading-none">
          <motion.span
            variants={{
              hidden: { y: "115%" },
              visible: { y: 0, transition: { duration: 0.8, ease: CUBIC_BEZIER } }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// --- Components ---
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18.77a7.07 7.07 0 01-1.48 4.31c-1.41 1.76-3.8 2.58-5.99 2.11-2.43-.53-4.47-2.6-4.9-5.07a7.07 7.07 0 012.33-6.64c1.19-.89 2.68-1.29 4.16-1.15v4.11c-.72-.11-1.47.06-2.07.47a3.03 3.03 0 00-1.28 2.6c.11.96.79 1.83 1.71 2.11 1.09.33 2.37-.15 2.87-1.18.15-.3.21-.63.21-.96V.02z" />
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


const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      <p className="text-white/30 text-[11px] font-medium tracking-[0.3em] uppercase">Thomas Eduardo</p>
    </motion.div>
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { label: lang === "pt" ? "Trabalhos" : "Work", id: "cases" },
    { label: lang === "pt" ? "Serviços" : "Services", id: "expertise" },
    { label: lang === "pt" ? "Processo" : "Process", id: "metodologia" },
    { label: lang === "pt" ? "Arsenal" : "Arsenal", id: "arsenal" },
    { label: lang === "pt" ? "Jornada" : "Journey", id: "trajetoria" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[999] flex items-center h-[52px] px-5 md:px-8 transition-all duration-300 ease-in-out"
        style={{
          background: scrolled ? "rgba(0,0,0,0.72)" : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        {/* Logo / Name */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 shrink-0 select-none"
        >
          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F5F7", letterSpacing: "-0.01em" }}>
            Thomas Eduardo
          </span>
        </a>

        {/* Desktop Center Links */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleSmoothScroll(e, `#${link.id}`)}
              style={{ fontSize: 13, color: "#F5F5F7" }}
              className="px-3 py-1.5 opacity-80 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Lang toggle – small pill */}
          <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-semibold transition-all duration-200"
            style={{ color: "rgba(245,245,247,0.6)", background: "rgba(255,255,255,0.06)" }}
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
            style={{ color: "rgba(245,245,247,0.6)", background: "rgba(255,255,255,0.06)" }}
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* CTA Button */}
          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de iniciar um projeto.")}`}
            className="hidden sm:flex items-center transition-all duration-200"
            style={{
              fontSize: 13,
              color: "#F5F5F7",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 980,
              padding: "7px 16px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            {lang === "pt" ? "Vamos Conversar" : "Let's Talk"}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px]"
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-[1.5px] rounded-full"
              style={{ background: "#F5F5F7" }}
            />
            <motion.span
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="w-5 h-[1.5px] rounded-full"
              style={{ background: "#F5F5F7" }}
            />
            <motion.span
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-5 h-[1.5px] rounded-full"
              style={{ background: "#F5F5F7" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] flex flex-col items-center justify-center md:hidden"
            style={{ background: "#0A0A0A" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  href={`#${link.id}`}
                  onClick={(e) => { handleSmoothScroll(e, `#${link.id}`); setMobileMenuOpen(false); }}
                  style={{ fontSize: 32, fontWeight: 600, color: "#F5F5F7" }}
                  className="hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA + controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex flex-col items-center gap-6 mt-12"
            >
              <a
                href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de iniciar um projeto.")}`}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#F5F5F7",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 980,
                  padding: "10px 28px",
                }}
              >
                {lang === "pt" ? "Vamos Conversar" : "Let's Talk"}
              </a>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLang(lang === "pt" ? "en" : "pt")}
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "rgba(245,245,247,0.4)" }}
                >
                  {lang === "pt" ? "English" : "Português"}
                </button>
                <span style={{ color: "rgba(255,255,255,0.1)" }}>|</span>
                <button
                  onClick={toggleTheme}
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "rgba(245,245,247,0.4)" }}
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


const AboutSection = () => {
  const { t } = useLang();
  return (
    <section id="sobre" className="relative py-16 px-6 flex items-center justify-center overflow-hidden">
      <div className="max-w-full mx-auto relative z-10 w-full px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text Column */}
          <motion.div {...FADE_UP} className="max-w-2xl">
            <span className="text-white/30 font-mono text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">{t.about.eyebrow}</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight text-white">
              <TextReveal>{t.about.h2a}</TextReveal> <br />
              <TextReveal delay={0.2}>{t.about.h2b}</TextReveal>
            </h2>
            
            <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-tight font-medium">
              <p>{t.about.p1}</p>
              <p>
                {t.about.p2a} <span className="text-white font-bold italic underline decoration-white/20 underline-offset-8">{t.about.p2bold1}</span> {t.about.p2mid} <span className="text-white font-bold italic underline decoration-white/20 underline-offset-8">{t.about.p2bold2}</span> {t.about.p2end}
              </p>
              <p>{t.about.p3}</p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em]">Thomas Eduardo · {t.about.statusValue}</span>
            </div>
          </motion.div>

          {/* Certifications Column - NO BOXES */}
          <div className="lg:pt-12 space-y-12">
            <div>
              <span className="text-white/20 font-mono text-[10px] uppercase font-bold tracking-[0.5em] mb-6 block">{t.about.certifications}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {[
                  {
                    title: "AWS re/Start",
                    issuer: "Amazon Web Services",
                    logo: "https://logo.clearbit.com/aws.amazon.com",
                    initials: "AWS",
                  },
                  {
                    title: "Cybersecurity",
                    issuer: "Cisco Systems",
                    logo: "https://logo.clearbit.com/cisco.com",
                    initials: "CS",
                  },
                  {
                    title: "API REST Expert",
                    issuer: "Ada Tech",
                    logo: "https://logo.clearbit.com/ada.com.br",
                    initials: "AT",
                  },
                  {
                    title: "UX Essentials",
                    issuer: "FIAP",
                    logo: "https://logo.clearbit.com/fiap.com.br",
                    initials: "FI",
                  }
                ].map((cert, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:bg-white/[0.1] transition-all">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-full h-full object-contain transition-all duration-300"
                        style={{ filter: "grayscale(100%) brightness(1.5)" }}
                        onError={(e) => {
                          const target = e.currentTarget;
                          const fallback = document.createElement("span");
                          target.replaceWith(fallback);
                          fallback.textContent = cert.initials;
                          fallback.className = "text-[11px] font-bold text-white";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-tight">{cert.title}</h4>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono mt-1">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <span className="block text-5xl font-bold text-white mb-2 tracking-tighter italic">40+</span>
                <span className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">{t.stats.projects}</span>
              </div>
              <div>
                <span className="block text-5xl font-bold text-white mb-2 tracking-tighter italic">05+</span>
                <span className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">{t.stats.experience}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const ProcessSection = () => {
  const { t } = useLang();
  return (
    <section id="metodologia" className="py-16 overflow-hidden">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <motion.div {...FADE_UP} className="mb-10 text-center">
          <span className="text-white/40 font-mono text-[10px] uppercase font-medium tracking-[0.4em] mb-4 block">{t.process.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] py-2 text-white">
            <TextReveal>{t.process.h2a}</TextReveal> <span className="text-white/50"><TextReveal delay={0.2}>{t.process.h2b}</TextReveal></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.process.steps.map((item, i) => (
            <motion.div 
              key={item.step}
              variants={FADE_UP_VARIANT}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...SMOOTH_TRANSITION, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative group"
            >
              <span className="text-3xl font-display font-black text-white/5 block mb-4 group-hover:text-white/20 transition-colors">{item.step}</span>
              <h3 className="text-xl font-semibold mb-4 text-white tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DifferentiatorsSection = () => {
  const { t } = useLang();
  const icons = [<IconSaaS className="w-8 h-8" />, <IconPerformance className="w-8 h-8" />, <IconProduct className="w-8 h-8" />];
  
  return (
    <section className="py-16 px-6">
      <div className="max-w-full mx-auto px-6 md:px-12 grid lg:grid-cols-3 gap-8">
        {t.differentiators.items.map((item, i) => (
          <motion.div 
            key={i}
            {...FADE_UP}
            className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6 text-white/70 group-hover:scale-110 transition-transform">
              {icons[i]}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight">{item.title}</h3>
            <p className="text-white/50 text-base leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Hero = () => {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 500], [0, -120]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Parallax orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: orbY }}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-white/[0.025] rounded-full blur-[180px]"
        />
      </div>

      <div className="max-w-full mx-auto relative z-10 w-full text-center px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.25 } } }}
        >
          {/* Badge */}
          <motion.div
            variants={FADE_UP_VARIANT}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            />
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.2em]">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP_VARIANT}
            className="text-[10vw] md:text-[6rem] lg:text-[7rem] font-bold leading-[0.9] tracking-[-0.05em] mb-6 text-white uppercase italic"
          >
            <div className="overflow-visible py-2">
              <TextReveal>{t.hero.h1a}</TextReveal>
            </div>
            <motion.div
              className="text-white/80 italic overflow-visible py-2"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <TextReveal delay={0.4}>{t.hero.h1b}</TextReveal>
            </motion.div>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={FADE_UP_VARIANT}
            className="text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium" style={{ color: '#A1A1A6' }}
          >
            {t.hero.desc}
          </motion.p>

          {/* CTAs - Apple Style */}
          <motion.div variants={FADE_UP_VARIANT} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => handleSmoothScroll(e, '#cases')}
                href="#cases"
                className="btn-primary w-full sm:w-auto px-10 py-4 shadow-2xl flex items-center justify-center gap-2"
              >
                {t.hero.ctaProjects}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, vi seu portfólio e gostaria de iniciar um diagnóstico para meu projeto.")}`}
                target="_blank"
                className="btn-secondary w-full sm:w-auto px-10 py-4 backdrop-blur-xl flex items-center justify-center gap-2"
              >
                {t.hero.ctaContact}
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


const GlobalStats = () => {
  const { t } = useLang();

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: t.stats.projects, val: "25+" },
            { label: t.stats.technologies, val: "12+" },
            { label: t.stats.experience, val: "03+" },
            { label: t.stats.satisfaction, val: "100%" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="block text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-1">{stat.val}</span>
              <span className="label-caps block">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-tight text-white">
              <TextReveal>{t.socialProof.h2a}</TextReveal> <br/>
              <span className="text-white/50"><TextReveal delay={0.2}>{t.socialProof.h2b}</TextReveal></span>
            </h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[13px] max-w-xs font-mono uppercase tracking-widest leading-relaxed border-l border-white/10 pl-6" style={{ color: '#A1A1A6' }}
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
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden border border-white/[0.1] bg-white/[0.05] flex items-center justify-center grayscale group-hover/logo:grayscale-0 opacity-80 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-700 p-2">
                  <img 
                    src={logo.url} 
                    alt={logo.name} 
                    className="w-[60%] h-[60%] object-contain"
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

const BentoGrid = () => {
  const { t } = useLang();
  return (
    <section id="metodologia" className="relative py-16 px-6 bg-(--pg-bg) overflow-hidden">
      <div className="max-w-full mx-auto relative z-10 px-6 md:px-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] rounded-full blur-[160px] pointer-events-none" />

        <motion.div 
          {...FADE_UP}
          className="mb-10 relative z-10"
        >
          <span className="label-caps mb-4 block">{t.bento.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter leading-[1.1] py-2">
            <TextReveal>{t.bento.h2a}</TextReveal> <br />
            <TextReveal delay={0.2}>{t.bento.h2b}</TextReveal> <span className="text-white/50"><TextReveal delay={0.4}>{t.bento.h2c}</TextReveal></span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>{t.bento.desc}</p>
        </motion.div>
    
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 relative z-10">
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-8 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col justify-between group transition-all hover:bg-white/[0.02] hover:border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <IconStrategy className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{t.bento.card1Title}</h3>
              <p className="text-lg leading-relaxed max-w-xl" style={{ color: '#A1A1A6' }}>
                {t.bento.card1Desc}
              </p>
            </div>
            <div className="mt-8 flex gap-4 text-sm font-medium font-mono text-white/30 uppercase tracking-widest relative z-10">
              {t.bento.tags.map(tag => (
                <span key={tag} className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/40" /> {tag}</span>
              ))}
            </div>
          </motion.div>
    
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-4 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col group overflow-hidden relative transition-all hover:bg-white/[0.02] hover:border-white/5 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <IconExecution className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{t.bento.card2Title}</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>
                {t.bento.card2Desc}
              </p>
            </div>
          </motion.div>
    
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-5 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col group transition-all hover:bg-white/[0.02] hover:border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <IconScale className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">{t.bento.card3Title}</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>
                {t.bento.card3Desc}
              </p>
            </div>
          </motion.div>
    
          <motion.div 
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-7 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden group shadow-2xl backdrop-blur-xl"
          >
            <div className="max-w-md relative z-10">
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight italic">{t.bento.card4Title}</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#A1A1A6' }}>
                {t.bento.card4Desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-start md:justify-end max-w-full md:max-w-[280px] relative z-10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
              {['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Stripe'].map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[9px] font-bold font-mono text-white/50 uppercase tracking-widest"
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
};

const ProjectSection = () => {
  const { t, lang } = useLang();
  const projects: Project[] = [
    {
      id: "reis-do-manto",
      title: "REIS DO MANTO",
      description: lang === "pt" ? "E-commerce de alta performance para vestuário esportivo premium." : "High-performance e-commerce for premium sportswear.",
      technologies: ["Next.js", "Stripe", "TailwindCSS"],
      problem: lang === "pt" ? "Necessidade de um checkout ultra-rápido e interface que transmitisse exclusividade." : "Need for ultra-fast checkout and an interface conveying exclusivity.",
      solution: "Arquitetura baseada em Next.js with otimização extrema de imagens e gateway Stripe.",
      result: lang === "pt" ? "Aumento de 50% na taxa de conversão no primeiro mês." : "50% increase in conversion rate in the first month.",
      image: "/projetos/Reis do Manto.png",
      clientLogo: "/clientes/reis-do-manto.png",
      link: "https://reisdomanto.com.br"
    },
    {
      id: "bras-service",
      title: "BRAS SERVICE",
      description: lang === "pt" ? "Landing page de alta conversão para serviços de manutenção industrial." : "High-conversion landing page for industrial maintenance services.",
      technologies: ["React", "TailwindCSS", "Framer Motion"],
      problem: lang === "pt" ? "Baixa taxa de conversão em leads qualificados no site antigo." : "Low conversion rate of qualified leads on the old site.",
      solution: "Copy focado em autoridade e design industrial agressivo.",
      result: lang === "pt" ? "Aumento de 200% na geração de leads orgânicos." : "200% increase in organic lead generation.",
      image: "/projetos/Landing Page  Bras Service.png",
      clientLogo: "/clientes/brasservice.jpg",
      link: "https://brasservice.com.br"
    },
    {
      id: "barbearia-piloto",
      title: "BARBEARIA NO PILOTO AUTOMÁTICO",
      description: lang === "pt" ? "SaaS completo para gestão e agendamento automático de barbearias." : "Complete SaaS for automatic management and scheduling for barber shops.",
      technologies: ["Next.js", "Prisma", "PostgreSQL"],
      problem: lang === "pt" ? "Dono da barbearia perdia 3h por dia gerenciando horários manualmente." : "Barber shop owner lost 3h a day managing schedules manually.",
      solution: "Sistema de agendamento self-service com confirmação via WhatsApp.",
      result: lang === "pt" ? "Economia de 20h semanais e zero furos na agenda." : "Saving 20h weekly and zero schedule gaps.",
      image: "/sistemas-web.png",
      link: "https://barbearia-no-piloto-automatico.vercel.app/"
    },
    {
      id: "hazap",
      title: "HAZAP",
      description: lang === "pt" ? "Plataforma de gestão de contratos e workflow jurídico." : "Contract management and legal workflow platform.",
      technologies: ["Next.js", "Node.js", "PostgreSQL"],
      problem: lang === "pt" ? "Processos manuais lentos na gestão de contratos complexos." : "Slow manual processes in managing complex contracts.",
      solution: "Digitalização total do workflow with assinatura eletrônica integrada.",
      result: lang === "pt" ? "Redução de 70% no tempo de fechamento de contratos." : "70% reduction in contract closing time.",
      image: "/projetos/Landing Page Hazap.png",
      clientLogo: "/clientes/hazzap.jpg",
      link: "https://hazap.com.br"
    },
    {
      id: "spinmove",
      title: "SPINMOVE",
      description: lang === "pt" ? "E-commerce de moda urbana com experiência de compra fluida." : "Urban fashion e-commerce with a fluid shopping experience.",
      technologies: ["Next.js", "Stripe", "TailwindCSS"],
      problem: lang === "pt" ? "Checkout complexo causava desistência de compra." : "Complex checkout caused purchase abandonment.",
      solution: "Simplificação radical do fluxo de compra (One-click checkout).",
      result: lang === "pt" ? "Redução de 35% no abandono de carrinho." : "35% reduction in cart abandonment.",
      image: "/projetos/Landing Page Spinmove.png",
      clientLogo: "/clientes/spinmove.jpg",
      link: "https://spinmove.com.br"
    },
    {
      id: "casa-lellit",
      title: "CASA LELLIT",
      description: lang === "pt" ? "E-commerce premium de decoração e mobiliário." : "Premium home decor and furniture e-commerce.",
      technologies: ["Next.js", "Stripe", "TailwindCSS"],
      problem: lang === "pt" ? "Necessidade de uma plataforma que suportasse alto volume de vendas com design de luxo." : "Need for a platform supporting high sales volume with luxury design.",
      solution: "Interface minimalista e checkout otimizado.",
      result: lang === "pt" ? "Aumento de 40% nas vendas recorrentes." : "40% increase in recurring sales.",
      image: "/projetos/site casa lellit.png",
      clientLogo: "/clientes/casalellit.jpg",
      link: "https://casalellit.com.br"
    },
    {
      id: "yazigi",
      title: "YÁZIGI SWISS PARK",
      description: lang === "pt" ? "Portal educacional para unidade franqueada de escola de idiomas." : "Educational portal for a language school franchise unit.",
      technologies: ["React", "Node.js", "MongoDB"],
      problem: lang === "pt" ? "Falta de centralização de informações para alunos e responsáveis." : "Lack of centralized information for students and guardians.",
      solution: "Área logada para acompanhamento de progresso pedagógico.",
      result: lang === "pt" ? "Melhoria de 60% na satisfação dos pais e alunos." : "60% improvement in parent and student satisfaction.",
      image: "/projetos/Landing Page Yázigi Swiss Park.png",
      clientLogo: "/clientes/yazigi.png",
      link: "https://yazigiswisspark.com.br"
    },
    {
      id: "grund-zero",
      title: "GRUND ZERO",
      description: lang === "pt" ? "Landing page tática para assessoria esportiva." : "Tactical landing page for sports consultancy.",
      technologies: ["React", "Framer Motion", "TailwindCSS"],
      problem: lang === "pt" ? "Necessidade de captar alunos de forma agressiva e direta." : "Need to capture students aggressively and directly.",
      solution: "Design escuro com foco em CTAs de alta visibilidade.",
      result: lang === "pt" ? "Taxa de conversão de leads superior a 15%." : "Lead conversion rate exceeding 15%.",
      image: "/projetos/Landing Page Grund Zero.png",
    }
  ];

  return (
    <section id="cases" className="py-12 md:py-20 px-6 md:px-12 max-w-full mx-auto overflow-hidden bg-(--pg-bg)">
      <motion.div 
        {...FADE_UP}
        className="mb-10"
      >
        <span className="label-caps mb-4 block">{t.projects.eyebrow}</span>
        <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter leading-[1.1] py-2">{t.projects.h2a} <br/><span className="text-white/50">{t.projects.h2b}</span></h2>
        <p className="text-xl max-w-3xl font-medium" style={{ color: '#A1A1A6' }}>{lang === "pt" ? "Cada projeto é tratado como um produto. Engenharia de resultados focada em UI/UX, performance e impacto no faturamento." : "Each project is treated as a product. Results engineering focused on UI/UX, performance, and revenue impact."}</p>
      </motion.div>

      <div className="flex flex-col lg:space-y-16 space-y-8">
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-8 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide gap-6 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              {...FADE_UP}
              className={`flex-none w-[85vw] lg:w-auto snap-center grid lg:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
            >
              <div className={`space-y-6 lg:space-y-8 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className="text-white/40 font-mono font-medium">0{index + 1}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#6E6E73' }}>{project.technologies[0]} + {project.technologies[1]}</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  {project.clientLogo && (
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center overflow-hidden p-2">
                      <img src={project.clientLogo} alt="Client" className="w-full h-full object-contain" />
                    </div>
                  )}
                  <h3 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">{project.title}</h3>
                </div>
                
                <p className="text-sm md:text-lg leading-relaxed font-medium" style={{ color: '#A1A1A6' }}>
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 lg:py-8 border-y border-white/5">
                  <div>
                    <span className="block text-[8px] lg:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">{t.projects.problem}</span>
                    <p className="text-[10px] lg:text-sm text-white/50 leading-relaxed">"{project.problem}"</p>
                  </div>
                  <div>
                    <span className="block text-[8px] lg:text-[10px] font-mono text-white/60 uppercase tracking-widest mb-2">{t.projects.result}</span>
                    <p className="text-[10px] lg:text-sm text-white font-semibold tracking-tight">{project.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border border-white/5 bg-white/[0.02] text-[8px] lg:text-[10px] font-mono text-white tracking-widest uppercase">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-8">
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`/r?to=${encodeURIComponent(`https://wa.me/5511977070209?text=Olá Thomas, vi o case ${project.title} e gostaria de algo similar.`)}`}
                    className="inline-flex items-center gap-3 text-white/60 font-semibold uppercase tracking-widest group text-[10px] lg:text-xs hover:text-white transition-colors"
                  >
                    {lang === "pt" ? "SOLICITAR DIAGNÓSTICO" : "REQUEST DIAGNOSIS"}
                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-2 transition-transform" />
                  </motion.a>

                  {project.link && project.link !== "#" && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white/[0.03] border border-white/5 text-white font-bold uppercase tracking-widest text-[8px] lg:text-[10px] hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                      {t.projects.btnSite}
                    </motion.a>
                  )}
                </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 group bg-white/[0.02] ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--pg-bg)]/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  const { t, lang } = useLang();
  const expertiseItems = [
    { 
      num: "01", 
      title: "SaaS & Dashboards", 
      icon: <IconSaaS className="w-8 h-8 text-white/60" />,
      desc: lang === "pt" ? "Desenvolvimento de plataformas multi-tenant escaláveis com foco em automação de processos e gestão eficiente." : "Development of scalable multi-tenant platforms focused on process automation and efficient management."
    },
    { 
      num: "02", 
      title: lang === "pt" ? "Sistemas de Pagamento" : "Payment Systems", 
      icon: <IconFintech className="w-8 h-8 text-white/60" />,
      desc: lang === "pt" ? "Integração robusta com Stripe, Mercado Pago e Infinity Pay, garantindo segurança e transparência financeira." : "Robust integration with Stripe, Mercado Pago, and Infinity Pay, ensuring security and financial transparency."
    },
    { 
      num: "03", 
      title: lang === "pt" ? "Arquitetura Full Stack" : "Full Stack Architecture", 
      icon: <IconCodePremium className="w-8 h-8 text-white/60" />,
      desc: lang === "pt" ? "APIs REST seguras com JWT e interfaces responsivas de alta performance em Next.js e AWS." : "Secure REST APIs with JWT and high-performance responsive interfaces in Next.js and AWS."
    }
  ];

  return (
    <section id="expertise" className="py-16 px-6 md:px-12 max-w-full mx-auto bg-(--pg-bg)">
      <motion.div {...FADE_UP} className="mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter leading-tight py-2 text-white">
          <TextReveal>{t.expertise.h2a}</TextReveal> <span className="text-white/50"><TextReveal delay={0.2}>{t.expertise.h2b}</TextReveal></span>
        </h2>
        <p className="text-white/50">{lang === "pt" ? "Soluções ponta-a-ponta focadas em conversão." : "End-to-end solutions focused on conversion."}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertiseItems.map((item, i) => (
          <motion.div 
            key={i}
            {...FADE_UP}
            whileHover={{ y: -10 }}
            className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] transition-all hover:border-white/10 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-5xl font-display font-black text-white/5">{item.num}</span>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                {item.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">{item.title}</h3>
            <p className="text-base leading-relaxed" style={{ color: '#A1A1A6' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TrajectorySection = () => {
  const { t, lang } = useLang();
  const [logoErrors, setLogoErrors] = useState<Record<number, boolean>>({});
  const trajectoryItems = [
    {
      year: lang === "pt" ? "2023 / Atualmente" : "2023 / Present",
      title: "Full Stack Engineer",
      company: "Thomas Eduardo (Freelance)",
      companyLogo: "https://logo.clearbit.com/github.com",
      initials: "TE",
      desc: lang === "pt" ? "Foco em SaaS e Fintech. Desenvolvi o 'Barbearia no Piloto Automático' e o 'Paper Contracts', focando em automação e geração de valor." : "Focus on SaaS and Fintech. Developed 'Barber Shop on Autopilot' and 'Paper Contracts', focusing on automation and value generation.",
      color: "hover:border-white/10",
      glow: "bg-white/[0.02]"
    },
    {
      year: "2023 / 2024",
      title: lang === "pt" ? "Suporte & Gestão" : "Support & Management",
      company: "CCAA",
      companyLogo: "https://logo.clearbit.com/ccaa.com.br",
      initials: "CC",
      desc: lang === "pt" ? "Gestão operacional de matrículas e fluxos administrativos. Onde refinei meu entendimento sobre processos de negócio e UX." : "Operational management of enrollments and administrative workflows. Where I refined my understanding of business processes and UX.",
      color: "hover:border-white/10",
      glow: "bg-white/[0.02]"
    },
    {
      year: "2021 / 2023",
      title: lang === "pt" ? "Operação & Vendas" : "Operation & Sales",
      company: "Lojas Renner",
      companyLogo: "https://logo.clearbit.com/lojasrenner.com.br",
      initials: "LR",
      desc: lang === "pt" ? "Trabalho em escala. Gestão de estoque e atendimento sob alta demanda em um dos maiores varejistas do país." : "Work at scale. Inventory management and customer service under high demand in one of the country's largest retailers.",
      color: "hover:border-white/10",
      glow: "bg-white/[0.02]"
    },
    {
      year: lang === "pt" ? "Anterior" : "Previous",
      title: lang === "pt" ? "Logística & Fiscal" : "Logistics & Tax",
      company: "MRB Express",
      companyLogo: "https://logo.clearbit.com/mrbexpress.com.br",
      initials: "MR",
      desc: lang === "pt" ? "Raízes na eficiência operacional. Controle de frotas e prazos críticos. A base da minha mentalidade de 'zero atraso'." : "Roots in operational efficiency. Fleet control and critical deadlines. The foundation of my 'zero delay' mentality.",
      color: "hover:border-white/10",
      glow: "bg-white/[0.02]"
    }
  ];

  return (
    <section id="trajetoria" className="relative py-16 px-6 md:px-12 max-w-full mx-auto overflow-hidden bg-(--pg-bg)">
      <motion.div {...FADE_UP} className="mb-10 relative z-10">
        <span className="label-caps mb-4 block">{t.trajectory.eyebrow}</span>
        <h2 className="text-3xl md:text-[5rem] font-bold mb-4 tracking-tighter leading-[1.1] py-2 text-white">
          <TextReveal>{lang === "pt" ? "Minha" : "My"}</TextReveal> <span className="text-white/50"><TextReveal delay={0.2}>{lang === "pt" ? "Jornada" : "Journey"}</TextReveal></span>
        </h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <p className="text-lg" style={{ color: '#A1A1A6' }}>{lang === "pt" ? "De operações críticas à engenharia de software de alta performance." : "From critical operations to high-performance software engineering."}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {trajectoryItems.map((item, i) => (
          <motion.div 
            key={i}
            {...FADE_UP}
            whileHover={{ y: -5 }}
            className={`relative p-6 rounded-2xl border border-white/5 bg-white/[0.01] transition-all overflow-hidden group shadow-2xl backdrop-blur-sm ${item.color}`}
          >
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden p-1.5"
              >
                {logoErrors[i] ? (
                  <span className="text-[11px] font-bold text-white select-none">{item.initials}</span>
                ) : (
                  <img
                    src={item.companyLogo}
                    alt={item.company}
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{ filter: "grayscale(100%) brightness(1.5)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%) brightness(1.5)"; }}
                    onError={() => setLogoErrors(prev => ({ ...prev, [i]: true }))}
                  />
                )}
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-white/[0.02] px-3 py-1 rounded-full border border-white/5" style={{ color: '#6E6E73' }}>
                {item.year}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight italic">{item.title}</h3>
              <span className="text-sm text-white/50 font-medium uppercase tracking-widest mb-4 block">{item.company}</span>
              <p className="text-base leading-relaxed" style={{ color: '#A1A1A6' }}>
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
};

const TechStackGrid = () => {
  const { t, lang } = useLang();
  const groups = [
    { 
      cat: t.tech.groups.frontend.cat, 
      icon: <IconCodePremium className="w-6 h-6 text-white" />,
      sub: t.tech.groups.frontend.sub,
      desc: t.tech.groups.frontend.desc,
      techs: [
        { name: "React", logo: "https://cdn.simpleicons.org/react/white" },
        { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
        { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/white" },
        { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/white" }
      ],
      colSpan: "md:col-span-4"
    },
    { 
      cat: t.tech.groups.infra.cat, 
      icon: <IconPerformance className="w-6 h-6 text-white" />,
      sub: t.tech.groups.infra.sub,
      desc: t.tech.groups.infra.desc,
      techs: [
        { name: "AWS", logo: "https://cdn.simpleicons.org/amazonwebservices/white" },
        { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/white" },
        { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/white" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker/white" }
      ],
      colSpan: "md:col-span-2"
    },
    { 
      cat: t.tech.groups.backend.cat, 
      icon: <IconSaaS className="w-6 h-6 text-white" />,
      sub: t.tech.groups.backend.sub,
      desc: t.tech.groups.backend.desc,
      techs: [
        { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/white" },
        { name: "Express", logo: "https://cdn.simpleicons.org/express/white" },
        { name: "JWT", logo: "https://cdn.simpleicons.org/jsonwebtokens/white" },
        { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma/white" }
      ],
      colSpan: "md:col-span-3"
    },
    { 
      cat: t.tech.groups.solutions.cat, 
      icon: <IconFintech className="w-6 h-6 text-white" />,
      sub: t.tech.groups.solutions.sub,
      desc: t.tech.groups.solutions.desc,
      techs: [
        { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe/white" },
        { name: "Mercado Pago", logo: "https://cdn.simpleicons.org/mercadopago/white" },
        { name: "PayPal", logo: "https://cdn.simpleicons.org/paypal/white" },
        { name: "Resend", logo: "https://cdn.simpleicons.org/resend/white" }
      ],
      colSpan: "md:col-span-3"
    }
  ];

  return (
    <section id="arsenal" className="py-16 px-6 bg-(--pg-bg) relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-full mx-auto relative z-10 px-6 md:px-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div {...FADE_UP}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/40 font-mono text-[10px] uppercase font-bold tracking-[0.4em]">{t.tech.eyebrow}</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1] max-w-4xl text-white pb-4">
              <TextReveal>{t.tech.h1a}</TextReveal> <br />
              <span className="text-white/30 italic font-medium"><TextReveal delay={0.2}>{t.tech.h1b}</TextReveal></span>
            </h2>
          </motion.div>
          
          <motion.p 
            {...FADE_UP} 
            transition={{ delay: 0.3 }}
            className="text-white/40 text-lg max-w-sm font-medium border-l border-white/10 pl-6 py-2"
          >
            {lang === "pt" ? "Ferramentas selecionadas criteriosamente para entregar sistemas de classe mundial." : "Carefully selected tools to deliver world-class systems."}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {groups.map((group, i) => (
            <motion.div 
              key={group.cat}
              {...FADE_UP}
              transition={{ delay: i * 0.1 + 0.4 }}
              className={`group relative ${group.colSpan} p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-3xl hover:bg-white/[0.02] hover:border-white/5 transition-all duration-700 flex flex-col justify-between min-h-[360px] overflow-hidden`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-radial-at-tl from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/[0.04] transition-all duration-500 text-white/40 group-hover:text-white">
                    {group.icon}
                  </div>
                  <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] font-bold">Stack_{group.cat.slice(0,3).toUpperCase()}</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white tracking-tighter mb-2">{group.cat}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: '#6E6E73' }}>{group.sub}</p>
                  <p className="text-sm leading-relaxed max-w-[280px] font-medium group-hover:text-white/60 transition-colors duration-500" style={{ color: '#A1A1A6' }}>
                    {group.desc}
                  </p>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-2">
                {group.techs.map((tech) => (
                  <div 
                    key={tech.name}
                    className="group/item flex items-center gap-3 p-3 rounded-2xl bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.05] transition-all duration-300"
                  >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <img 
                        src={tech.logo} 
                        alt="" 
                        className="w-4 h-4 grayscale opacity-40 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500" 
                      />
                    </div>
                    <span className="text-[10px] font-mono group-hover/item:text-white uppercase tracking-widest transition-colors" style={{ color: '#6E6E73' }}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative bottom line */}
              <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = lang === "pt" ? [
    { q: "Qual o prazo médio de entrega?", a: "Depende da complexidade, mas uma Landing Page de alta performance costuma levar de 7 a 15 dias, enquanto um SaaS completo pode levar de 30 a 90 dias." },
    { q: "Você faz integração com qualquer gateway?", a: "Sim, tenho vasta experiência com Mercado Pago, Stripe e gateways nacionais como Infinity Pay, garantindo checkout transparente." },
    { q: "O software é entregue pronto para escalar?", a: "Sim, utilizo tecnologias modernas como Next.js e Cloud (AWS/Vercel) para garantir que seu sistema suporte picos de tráfego sem lentidão." },
    { q: "Como funciona o suporte pós-entrega?", a: "Ofereço pacotes de manutenção mensal que garantem segurança, atualizações e suporte prioritário para o seu ativo digital." }
  ] : [
    { q: "What is the average delivery time?", a: "It depends on complexity, but a high-performance Landing Page usually takes 7 to 15 days, while a full SaaS can take 30 to 90 days." },
    { q: "Do you integrate with any gateway?", a: "Yes, I have extensive experience with Mercado Pago, Stripe, and national gateways like Infinity Pay, ensuring transparent checkout." },
    { q: "Is the software delivered ready to scale?", a: "Yes, I use modern technologies like Next.js and Cloud (AWS/Vercel) to ensure your system handles traffic peaks without slowdowns." },
    { q: "How does post-delivery support work?", a: "I offer monthly maintenance packages that guarantee security, updates, and priority support for your digital asset." }
  ];

  return (
    <section className="py-16 px-6 md:px-12 max-w-full mx-auto bg-(--pg-bg)">
      <motion.div {...FADE_UP} className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] py-2 text-white">
          <TextReveal>{t.faq.h2a}</TextReveal> <span className="text-white/50"><TextReveal delay={0.2}>{t.faq.h2b}</TextReveal></span>
        </h2>
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
              <span className="text-lg font-semibold text-white group-hover:text-white/80 transition-colors">{faq.q}</span>
              <ChevronRight className={`w-5 h-5 transition-transform ${open === i ? 'rotate-90' : ''}`} style={{ color: '#6E6E73' }} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <p className="pb-6 leading-relaxed" style={{ color: '#A1A1A6' }}>{faq.a}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


const Contact = () => {
  const { t, lang } = useLang();
  return (
    <section id="contato" className="py-16 px-6 relative overflow-hidden bg-(--pg-bg)">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        {...FADE_UP}
        className="max-w-full mx-auto text-center relative z-10 px-6 md:px-12"
      >
        <span className="text-white/40 font-mono text-[10px] uppercase font-medium tracking-[0.5em] mb-8 block">{t.contact.eyebrow}</span>
        <h2 className="text-3xl sm:text-5xl md:text-[clamp(3.5rem,8vw,5.5rem)] font-bold mb-12 tracking-tighter leading-[1] py-4 text-white">
          <TextReveal>{t.contact.h2a}</TextReveal> <br className="md:hidden" />
          <span className="text-white/60"><TextReveal delay={0.3}>{t.contact.h2b + " " + (t.contact.h2c || "")}</TextReveal></span>
        </h2>
        
        <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed font-medium" style={{ color: '#A1A1A6' }}>
          {t.contact.desc} <br className="hidden md:block"/>
          <span className="text-white italic">{lang === "pt" ? "Garanta sua vaga no roadmap de 2026." : "Secure your spot on the 2026 roadmap."}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de reservar um horário para diagnóstico do meu projeto.")}`}
            target="_blank"
            className="btn-primary flex items-center justify-center gap-5 px-10 py-8 rounded-3xl font-bold uppercase tracking-widest shadow-2xl shadow-white/10 group"
          >
            <WhatsAppIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            {t.contact.btnWhatsapp}
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:devthomaseduardo@gmail.com" 
            className="btn-secondary flex items-center justify-center gap-5 px-10 py-8 rounded-3xl font-black uppercase italic tracking-widest backdrop-blur-md"
          >
            <Mail className="w-8 h-8" />
            {t.contact.btnEmail}
          </motion.a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase font-black tracking-[0.3em] text-white/20">
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

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-white tracking-tighter uppercase italic text-xl">thomaseduardo</span>
            </div>
            <p className="text-lg max-w-sm leading-relaxed font-medium" style={{ color: '#A1A1A6' }}>
              {t.footer.desc}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-4 text-xs uppercase tracking-[0.3em] font-mono italic opacity-50">{t.footer.nav}</h4>
            <ul className="space-y-4">
              {[
                { label: t.nav.about, id: "sobre" },
                { label: t.nav.methodology, id: "metodologia" },
                { label: t.nav.cases, id: "cases" },
                { label: t.nav.contact, id: "contato" }
              ].map(link => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    onClick={(e) => handleSmoothScroll(e, `#${link.id}`)}
                    className="hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black italic block" style={{ color: '#6E6E73' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-4 text-xs uppercase tracking-[0.3em] font-mono italic opacity-50">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:devthomaseduardo@gmail.com" className="text-white/40 hover:text-white transition-colors font-mono text-sm tracking-tight">devthomaseduardo@gmail.com</a>
              </li>
            <li className="flex gap-6 pt-4 border-t border-white/5">
              <a href="https://github.com/devthomaseduardo" target="_blank" className="hover:text-white transition-colors" style={{ color: '#6E6E73' }}>
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/devthomaseduardo" target="_blank" className="hover:text-white transition-colors" style={{ color: '#6E6E73' }}>
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@devthomaseduardo" target="_blank" className="hover:text-white transition-colors" style={{ color: '#6E6E73' }}>
                <TikTokIcon className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/devthomaseduardo" target="_blank" className="hover:text-white transition-colors" style={{ color: '#6E6E73' }}>
                <Instagram className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-[9px] font-mono uppercase tracking-[0.5em] font-bold">
        <span>© 2026 Thomas Eduardo. Premium Digital Assets.</span>
        <span className="flex items-center gap-2">
          <div className="text-white/40">Fullstack_Architect</div>
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          CODED_WITH_EXCELLENCE
        </span>
      </div>
    </div>
  </footer>
    );
};

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
    <div className="pg-root min-h-screen selection:bg-white/20 overflow-x-hidden relative">
      {/* Global Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <CustomCursor />
      
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
    <ThemeProvider>
      <LangProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/links" element={<LinkBio />} />
            <Route path="/r" element={<RedirectPage />} />
          </Routes>
        </Router>
      </LangProvider>
    </ThemeProvider>
  );
}
