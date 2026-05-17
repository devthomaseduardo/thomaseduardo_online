import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLang } from '../contexts/LangContext';
import { FADE_UP } from '../constants/animations';
import TextReveal from './TextReveal';

export const TrajectorySection = () => {
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
