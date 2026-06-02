import React from 'react';
import { useLang } from '../contexts/LangContext';

export const Footer = () => {
  const { t, lang } = useLang();
  return (
    <footer className="pb-10 pt-16 bg-pg-bg overflow-hidden">
      <div className="w-full px-6 md:px-16 lg:px-24 mx-auto">

        {/* Big Statement */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.0] text-white mb-12">
          {(t.footer as any).h2}
        </h2>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8">
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://linkedin.com/in/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">LinkedIn</a>
            <a href="https://github.com/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">GitHub</a>
            <a href="https://instagram.com/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">Instagram</a>
            <a href="mailto:devthomaseduardo@gmail.com" className="text-xs font-mono text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest">Email</a>
          </div>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap">
            {t.footer.copy}
          </span>
        </div>

      </div>
    </footer>
  );
};
