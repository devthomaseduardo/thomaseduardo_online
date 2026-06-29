import React from 'react';
import { useLang } from '../contexts/LangContext';

export const Footer = () => {
  const { t, lang } = useLang();
  return (
    <footer className="pb-16 pt-24 bg-[#090909] overflow-hidden border-t border-[#272727]">
      <div className="w-full max-w-7xl px-6 mx-auto flex flex-col items-center justify-center text-center">

        {/* Big Statement */}
        <a href="mailto:devthomaseduardo@gmail.com" className="block group mb-20 w-full">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[7vw] font-bold tracking-tighter leading-[1.0] text-[#F5F1E8] group-hover:text-[#F97316] transition-colors duration-500 break-all px-4 inline-block">
            {(t.footer as any).h2}
          </h2>
        </a>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 w-full pt-12 border-t border-[#272727]">
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://linkedin.com/in/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#78716C] hover:text-[#F97316] transition-colors uppercase tracking-widest">LinkedIn</a>
            <a href="https://github.com/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#78716C] hover:text-[#F97316] transition-colors uppercase tracking-widest">GitHub</a>
            <a href="https://instagram.com/devthomaseduardo" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#78716C] hover:text-[#F97316] transition-colors uppercase tracking-widest">Instagram</a>
            <a href="mailto:devthomaseduardo@gmail.com" className="text-xs font-mono text-[#78716C] hover:text-[#F97316] transition-colors uppercase tracking-widest">Email</a>
          </div>
          <span className="text-[10px] font-mono text-[#78716C] uppercase tracking-widest whitespace-nowrap">
            {t.footer.copy}
          </span>
        </div>

      </div>
    </footer>
  );
};
