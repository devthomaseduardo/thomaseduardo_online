import React from 'react';
import { useLang } from '../contexts/LangContext';

export const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="pt-32 pb-16 bg-pg-bg overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-32">
          <h2 className="text-[clamp(32px,5vw,64px)] font-medium tracking-tighter leading-[1.1] text-white max-w-3xl">
            {(t.footer as any).h2}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{t.footer.nav}</span>
            <div className="flex flex-col gap-4">
              <a href="https://linkedin.com/in/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-lg font-light text-white/70 hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-lg font-light text-white/70 hover:text-white transition-colors">GitHub</a>
              <a href="mailto:devthomaseduardo@gmail.com" className="text-lg font-light text-white/70 hover:text-white transition-colors">Email</a>
            </div>
          </div>
          
          <div className="flex flex-col justify-between items-start md:items-end text-left md:text-right h-full">
            <p className="text-xl md:text-2xl font-light text-white/50 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <span className="text-xs font-mono text-white/20 mt-16 md:mt-0 block uppercase tracking-widest">
              {t.footer.copy}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
