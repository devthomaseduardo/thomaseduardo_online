import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useLang } from '../contexts/LangContext';
import { TikTokIcon } from './Icons';
import { handleSmoothScroll } from '../utils/scroll';

export const Footer = () => {
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
