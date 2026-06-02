import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/devthomaseduardo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/devthomaseduardo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/devthomaseduardo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

const FloatingSocial = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-[990] hidden md:flex flex-col items-center gap-1"
        >
          {/* Vertical line above */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/10 mb-1" />

          {/* Icon buttons */}
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="group relative w-8 h-8 flex items-center justify-center rounded-full text-white/30 hover:text-white/90 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] hover:scale-110"
            >
              {social.icon}
              {/* Tooltip */}
              <span className="absolute right-10 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 pointer-events-none">
                <span className="text-[9px] font-mono font-semibold text-white/50 tracking-widest uppercase whitespace-nowrap bg-white/5 border border-white/10 backdrop-blur-md px-2 py-1 rounded-full">
                  {social.label}
                </span>
              </span>
            </a>
          ))}

          {/* Vertical line below */}
          <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent mt-1" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSocial;
