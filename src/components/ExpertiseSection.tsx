import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";
import { IconProduct, IconStrategy, IconCodePremium } from "./Icons";

const ExpertiseSection = () => {
  const { t, lang } = useLang();

  const expertiseItems = [
    { 
      num: "01", 
      title: lang === "pt" ? "E-commerce & Landing Pages" : "E-commerce & Landing Pages", 
      icon: <IconProduct className="w-8 h-8 text-white/60" />,
      desc: lang === "pt" ? "Criação de lojas virtuais e landing pages de alta conversão integradas com os principais meios de pagamento." : "Creation of online stores and high-conversion landing pages integrated with major payment gateways."
    },
    { 
      num: "02", 
      title: lang === "pt" ? "Estratégia de Negócio" : "Business Strategy", 
      icon: <IconStrategy className="w-8 h-8 text-white/60" />,
      desc: lang === "pt" ? "Não apenas codifico, atuo no entendimento dos gargalos do seu negócio para entregar a solução técnica mais lucrativa." : "I don't just code; I work on understanding your business bottlenecks to deliver the most profitable technical solution."
    },
    { 
      num: "03", 
      title: lang === "pt" ? "Arquitetura Full Stack" : "Full Stack Architecture", 
      icon: <IconCodePremium className="w-8 h-8 text-white/60" />,
      desc: lang === "pt" ? "APIs REST seguras com JWT e interfaces responsivas de alta performance em Next.js e AWS." : "Secure REST APIs with JWT and high-performance responsive interfaces in Next.js and AWS."
    }
  ];

  return (
    <section id="expertise" className="relative py-10 px-6 md:px-12 max-w-full mx-auto bg-(--pg-bg)">
      <motion.div {...FADE_UP} className="mb-10">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tighter leading-tight py-2 text-white">
          <TextReveal>{t.expertise.h2a}</TextReveal>{" "}
          <span className="text-white/50">
            <TextReveal delay={0.2}>{t.expertise.h2b}</TextReveal>
          </span>
        </h2>
        <p className="text-white/50">
          {lang === "pt" ? "Soluções ponta-a-ponta focadas em conversão." : "End-to-end solutions focused on conversion."}
        </p>
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
            <p className="text-base leading-relaxed" style={{ color: '#A1A1A6' }}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
