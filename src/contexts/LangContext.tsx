import React, { createContext, useContext, useState } from "react";

type Lang = "pt" | "en";

const translations = {
  pt: {
    nav: {
      about: "Filosofia",
      methodology: "Operação",
      cases: "Estudos",
      contact: "Contato",
      lab: "Lab",
      cta: "Entender Operação",
    },
    hero: {
      badge: "Engenharia de software para operações digitais",
      h1a: "SOFTWARE NÃO É CÓDIGO.",
      h1b: "É ALAVANCA DE CRESCIMENTO.",
      desc: "Uso tecnologia para remover gargalos operacionais e criar sistemas que ajudam empresas a venderem mais e perderem menos tempo.",
      ctaProjects: "VER IMPACTO",
      ctaContact: "RESOLVER GARGALOS",
    },
    socialProof: {
      eyebrow: "Empresas que confiaram na operação",
      h2a: "Confiança",
      h2b: "Operacional.",
      desc: "Sistemas de alta performance suportando o crescimento de marcas de alto valor.",
    },
    about: {
      eyebrow: "Sobre",
      h2a: "A maioria dos sistemas cria complexidade.",
      h2b: "Eu tento remover.",
      p1: "Uso software para organizar operações, eliminar tarefas repetitivas e reduzir gargalos que travam o crescimento.",
      p2a: "", p2bold1: "", p2mid: "", p2bold2: "", p2end: "", p3: "",
      tags: ["Automação", "Performance", "Operação", "Escala"],
      certifications: "Legitimidade Técnica",
    },
    bento: {
      eyebrow: "Dores Operacionais",
      h2a: "Sistemas de",
      h2b: "alta escala e",
      h2c: "previsibilidade",
      desc: "Desenho arquiteturas focadas em resolver gargalos específicos do seu negócio.",
      card1Title: "Organize sua operação",
      card1Desc: "Sistemas que centralizam dados sem criar complexidade e burocracia para a equipe.",
      card2Title: "Venda sem fricção",
      card2Desc: "Lojas e checkouts rápidos o suficiente para não perder vendas por conta de lentidão.",
      card3Title: "Elimine tarefas manuais",
      card3Desc: "Automações precisas que liberam sua equipe do trabalho repetitivo para focar em estratégia.",
      card4Title: "Pronto para escala",
      card4Desc: "Infraestrutura que não cai quando o seu negócio finalmente acelera.",
      tags: ["Operação", "Escala", "Retorno"],
    },
    process: {
      eyebrow: "Maturidade",
      h2a: "Previsibilidade",
      h2b: "Institucional",
      steps: [
        { step: "01", title: "Entendimento Operacional", desc: "Onde estão os gargalos e perdas de tempo." },
        { step: "02", title: "Estruturação do Sistema", desc: "Transformando processo manual em fluxo digital." },
        { step: "03", title: "Execução e Escala", desc: "Sistemas preparados para crescer sem travar." }
      ],
    },
    projects: {
      eyebrow: "Sistemas",
      h2a: "Sistemas que",
      h2b: "reduzem gargalos.",
      viewAll: "EXPLORAR CASES",
      btnSite: "VER SISTEMA",
      problem: "Gargalo",
      solution: "Resolução",
      result: "Métrica",
      catOperational: "Sistemas Operacionais",
      catInfra: "Infraestrutura Comercial",
      labTitle: "Engineering Lab",
      labDesc: "Repositório de arquiteturas, bots, experimentos técnicos e estudos de infraestrutura."
    },
    contact: {
      eyebrow: "Contato",
      h2a: "Vamos estruturar",
      h2b: "a sua",
      h2c: "operação?",
      desc: "Software focado em destravar o crescimento do seu negócio.",
      btnWhatsapp: "WHATSAPP DIRETO",
      btnEmail: "ENVIAR E-MAIL",
    },
    footer: {
      h2: "Seu software deve trabalhar para a sua operação.",
      desc: "Software não é código. É alavanca de crescimento.",
      nav: "Links Institucionais",
      contact: "Contato Direto",
      copy: "© 2026 Thomas Eduardo. Premium Digital Assets.",
    },
  },
  en: {
    nav: {
      about: "Philosophy",
      methodology: "Operation",
      cases: "Studies",
      contact: "Contact",
      lab: "Lab",
      cta: "Understand Operation",
    },
    hero: {
      badge: "Software engineering for digital operations",
      h1a: "SOFTWARE IS NOT CODE.",
      h1b: "IT'S A GROWTH LEVER.",
      desc: "I use technology to remove operational bottlenecks and build systems that help companies sell more and waste less time.",
      ctaProjects: "VIEW IMPACT",
      ctaContact: "SOLVE BOTTLENECKS",
    },
    socialProof: {
      eyebrow: "Companies that trusted the operation",
      h2a: "Operational",
      h2b: "Trust.",
      desc: "High-performance systems supporting the growth of high-value brands.",
    },
    about: {
      eyebrow: "About",
      h2a: "Most systems create complexity.",
      h2b: "I try to remove it.",
      p1: "I use software to organize operations, eliminate repetitive tasks, and reduce bottlenecks that stall growth.",
      p2a: "", p2bold1: "", p2mid: "", p2bold2: "", p2end: "", p3: "",
      tags: ["Automation", "Performance", "Operation", "Scale"],
      certifications: "Technical Legitimacy",
    },
    bento: {
      eyebrow: "Operational Pains",
      h2a: "Systems of",
      h2b: "high scale and",
      h2c: "predictability",
      desc: "I design architectures focused on solving specific bottlenecks in your business.",
      card1Title: "Organize your operation",
      card1Desc: "Systems that centralize data without creating complexity and bureaucracy for the team.",
      card2Title: "Sell without friction",
      card2Desc: "Stores and checkouts fast enough to not lose sales due to slowness.",
      card3Title: "Eliminate manual tasks",
      card3Desc: "Precise automations that free your team from repetitive work to focus on strategy.",
      card4Title: "Ready to scale",
      card4Desc: "Infrastructure that won't crash when your business finally accelerates.",
      tags: ["Operation", "Scale", "Return"],
    },
    process: {
      eyebrow: "Maturity",
      h2a: "Institutional",
      h2b: "Predictability",
      steps: [
        { step: "01", title: "Operational Understanding", desc: "Where the bottlenecks and time losses are." },
        { step: "02", title: "System Structuring", desc: "Transforming manual processes into digital flows." },
        { step: "03", title: "Execution and Scale", desc: "Systems built to grow without stalling." }
      ],
    },
    projects: {
      eyebrow: "Systems",
      h2a: "Systems that",
      h2b: "reduce bottlenecks.",
      viewAll: "EXPLORE CASES",
      btnSite: "VIEW SYSTEM",
      problem: "Bottleneck",
      solution: "Resolution",
      result: "Metric",
      catOperational: "Operational Systems",
      catInfra: "Commercial Infrastructure",
      labTitle: "Engineering Lab",
      labDesc: "Repository of architectures, bots, technical experiments, and infrastructure studies."
    },
    contact: {
      eyebrow: "Contact",
      h2a: "Let's structure",
      h2b: "your",
      h2c: "operation?",
      desc: "Software focused on unlocking your business growth.",
      btnWhatsapp: "WHATSAPP DIRECT",
      btnEmail: "SEND E-MAIL",
    },
    footer: {
      h2: "Your software should work for your operation.",
      desc: "Software is not code. It's a growth lever.",
      nav: "Institutional Links",
      contact: "Direct Contact",
      copy: "© 2026 Thomas Eduardo. Premium Digital Assets.",
    },
  }
};

type Translations = typeof translations.pt;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "pt",
  setLang: () => {},
  t: translations.pt,
});

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    return saved ?? "pt";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
