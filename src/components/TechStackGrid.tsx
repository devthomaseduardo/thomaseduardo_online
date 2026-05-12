import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";
import TextReveal from "./TextReveal";
import { FADE_UP } from "../constants/animations";
import { IconCodePremium, IconPerformance, IconSaaS, IconFintech } from "./Icons";

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
        { name: "Pagar.me", logo: "https://cdn.simpleicons.org/pagar-me/white" },
        { name: "ASAAS", logo: "https://cdn.simpleicons.org/asaas/white" },
        { name: "Webhooks", logo: "https://cdn.simpleicons.org/webhook/white" }
      ],
      colSpan: "md:col-span-3"
    }
  ];

  return (
    <section id="arsenal" className="py-20 px-6 md:px-12 max-w-full mx-auto bg-(--pg-bg) relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <motion.div {...FADE_UP} className="mb-14 relative z-10">
        <span className="label-caps mb-4 block">{t.tech.eyebrow}</span>
        <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter leading-[1.1] py-2 text-white">
          <TextReveal>{t.tech.h1a}</TextReveal> <br />
          <span className="text-white/50">
            <TextReveal delay={0.2}>{t.tech.h1b}</TextReveal>
          </span>
        </h2>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: '#A1A1A6' }}>
          {lang === "pt"
            ? "Tecnologias de elite para produtos que não aceitam falhas. Performance extrema em cada camada da aplicação."
            : "Elite technologies for products that don't accept failure. Extreme performance in every layer of the application."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
        {groups.map((group, i) => (
          <motion.div
            key={group.cat}
            {...FADE_UP}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`${group.colSpan} p-8 rounded-3xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 group shadow-2xl backdrop-blur-xl relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:scale-110 group-hover:border-white/10 transition-all duration-500">
                {group.icon}
              </div>
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] font-bold">
                {group.cat}
              </span>
            </div>

            <div className="relative z-10 mb-8">
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors uppercase italic">
                {group.sub}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6E6E73' }}>
                {group.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 relative z-10">
              {group.techs.map((tech) => (
                <div 
                  key={tech.name}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 grayscale group-hover:grayscale-0"
                >
                  <img src={tech.logo} alt={tech.name} className="w-3.5 h-3.5 object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-bold font-mono text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-wider">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStackGrid;
