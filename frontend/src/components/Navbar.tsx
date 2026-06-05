import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import { handleSmoothScroll } from "../utils/scroll";
import { RotatingText } from "./RotatingText";
import { useActiveSection } from "../hooks/useActiveSection";
import { AnimatedEmoji } from "./AnimatedEmoji";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { label: t.nav.about, id: "sobre" },
    { label: t.nav.methodology, id: "metodologia" },
    { label: t.nav.cases, id: "cases" },
    { label: t.nav.lab, id: "lab" },
  ];

  const activeSection = useActiveSection(navLinks.map(l => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[999] flex items-center h-[64px] px-6 md:px-12 transition-all duration-300 ease-in-out"
        style={{
          background: scrolled ? "rgba(10, 10, 10, 0.65)" : "transparent",
          backdropFilter: scrolled ? "blur(12px) saturate(190%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px) saturate(190%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <a
          href="/"
          onClick={(e) => { 
            if (isHome) {
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: "smooth" }); 
            }
          }}
          className="flex items-center gap-2.5 shrink-0 select-none"
        >
          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F5F7", letterSpacing: "-0.01em" }}>
            <RotatingText />
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {isHome && navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleSmoothScroll(e, `#${link.id}`)}
              style={{ 
                fontSize: 13, 
                color: activeSection === link.id ? "#10b981" : "#F5F5F7",
                background: activeSection === link.id ? "rgba(16, 185, 129, 0.1)" : "transparent"
              }}
              className={`px-3 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap ${activeSection === link.id ? 'opacity-100 font-medium' : 'opacity-80 hover:opacity-100 hover:bg-white/5'}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {isHome && (
            <>
              <button
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-semibold transition-all duration-200"
            style={{ color: "rgba(245,245,247,0.6)", background: "rgba(255,255,255,0.06)" }}
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>


          <a
            href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de iniciar um projeto.")}`}
            className="hidden sm:flex items-center gap-2 transition-all duration-200 group"
            style={{
              fontSize: 13,
              color: "#F5F5F7",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "7px 16px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            <AnimatedEmoji name="rocket" className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
            {t.nav.cta}
          </a>
          </>
          )}

          {isHome && (
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
          )}
        </div>
      </nav>

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex flex-col items-center gap-6 mt-12 w-full px-6"
            >
              <a
                href={`/r?to=${encodeURIComponent("https://wa.me/5511977070209?text=Olá Thomas, gostaria de iniciar um projeto.")}`}
                className="w-full flex items-center justify-center gap-2 group"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#F5F5F7",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  padding: "10px 28px",
                }}
              >
                <AnimatedEmoji name="rocket" className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
                {t.nav.cta}
              </a>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLang(lang === "pt" ? "en" : "pt")}
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "rgba(245,245,247,0.4)" }}
                >
                  {lang === "pt" ? "English" : "Português"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
