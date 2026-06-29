import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import thomasAbout from "../assets/thomas-about.png";
import heroWeb from "../assets/linux-lab.svg";

export default function GlobalBackground() {
  const [activeBg, setActiveBg] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const aboutEl = document.getElementById("sobre");
      const projectsEl = document.getElementById("projetos") || document.getElementById("projects"); // Fallback IDs

      let newBg = null;

      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        if (rect.top < vh * 0.6 && rect.bottom > 0) {
          newBg = heroWeb;
        } else if (aboutEl) {
          const aboutRect = aboutEl.getBoundingClientRect();
          if (aboutRect.top < vh * 0.8 && aboutRect.bottom > 0) {
            newBg = thomasAbout;
          }
        }
      } else if (aboutEl) {
        const aboutRect = aboutEl.getBoundingClientRect();
        if (aboutRect.top < vh * 0.8 && aboutRect.bottom > 0) {
          newBg = thomasAbout;
        }
      }

      // Hide background when at the very top (Hero section)
      if (scrollY < vh * 0.3) {
        newBg = null;
      }

      setActiveBg(newBg);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none">
      <AnimatePresence>
        {activeBg && (
          <motion.div
            key={activeBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }} // Low opacity to keep text readable
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeBg}
              alt="Global Background"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
