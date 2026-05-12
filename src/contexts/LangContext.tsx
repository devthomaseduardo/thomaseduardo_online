import React, { createContext, useContext, useState } from "react";

type Lang = "pt" | "en";

const translations = {
  pt: {
    nav: {
      about: "Sobre",
      methodology: "Metodologia",
      cases: "Cases",
      contact: "Contato",
      cta: "Vamos Conversar",
    },
    hero: {
      badge: "Disponível para novos projetos · Q3 2026",
      h1a: "DO CÓDIGO",
      h1b: "À ENTREGA DE VALOR.",
      desc: "Não apenas código. Estratégia de produto. Transformo ideias em ativos digitais que trabalham por você, unindo engenharia de alta performance com visão de negócio real.",
      ctaProjects: "VER PROJETOS",
      ctaContact: "ENTRAR EM CONTATO",
    },
    stats: {
      projects: "Projetos Reais",
      technologies: "Tecnologias",
      experience: "Anos no Mercado",
      satisfaction: "Satisfação",
    },
    socialProof: {
      eyebrow: "Social Proof",
      h2a: "Marcas que",
      h2b: "Confiam no Trabalho.",
      desc: "Sistemas de alta performance e interfaces premium para empresas que buscam o próximo nível.",
    },
    about: {
      eyebrow: "Quem sou",
      h2a: "Não apenas código.",
      h2b: "Estratégia de produto.",
      p1: "Minha jornada no desenvolvimento começou com a necessidade de resolver problemas reais. Rapidamente percebi que código por si só não gera valor, o que importa é como essa tecnologia transforma processos em lucro.",
      p2a: "Hoje, atuo como um parceiro estratégico para empresas e empreendedores que buscam elevar seu patamar digital. Desenvolvo sistemas que unem",
      p2bold1: "design impecável",
      p2mid: "com uma",
      p2bold2: "arquitetura técnica",
      p2end: "preparada para escala.",
      p3: "Meu foco é criar ativos digitais que trabalham por você, automatizando o que é repetitivo e potencializando o que é lucrativo.",
      certifications: "Certificações",
      statusLabel: "Status Atual",
      statusValue: "Engenheiro Fullstack Senior & Product Leader",
    },
    bento: {
      eyebrow: "Metodologia",
      h2a: "Como transformo ideias",
      h2b: "em ativos",
      h2c: "de alto valor",
      desc: "Minha metodologia é baseada em três pilares fundamentais, focados em escala e lucratividade sustentável.",
      card1Title: "Diagnóstico Técnico & Estratégico",
      card1Desc: "Identifico os gargalos reais do seu negócio antes da primeira linha de código. Imersão profunda para garantir que o software resolva problemas de verdade e traga retorno financeiro direto.",
      card2Title: "Execução Brutal",
      card2Desc: "Código limpo, testado e performático. Desenvolvimento ágil sem burocracia, focado em entregas de valor constante.",
      card3Title: "Escala & Suporte",
      card3Desc: "Arquiteturas que suportam o crescimento explosivo. Suporte contínuo para garantir que seu ativo nunca pare de performar.",
      card4Title: "Tecnologia de Ponta",
      card4Desc: "Utilizo as ferramentas mais sólidas para garantir longevidade e performance extrema ao seu produto digital.",
      tags: ["Auditoria", "Planejamento", "Resultados"],
    },
    process: {
      eyebrow: "Como eu trabalho",
      h2a: "Processo",
      h2b: "Alta Performance",
      steps: [
        { step: "01", title: "IMERSÃO", desc: "Entendimento profundo do seu modelo de negócio e gargalos." },
        { step: "02", title: "DESIGN", desc: "Arquitetura da experiência com foco em conversão e usabilidade." },
        { step: "03", title: "CODING", desc: "Desenvolvimento ágil com código limpo e tecnologias de ponta." },
        { step: "04", title: "POLIMENTO", desc: "Testes rigorosos e otimização de performance extrema." },
        { step: "05", title: "ESCALA", desc: "Deploy estratégico e monitoramento contínuo de resultados." },
      ],
    },
    projects: {
      eyebrow: "Portfólio",
      h2a: "Cases",
      h2b: "Reais.",
      viewAll: "VER TODOS OS CASES",
      btnSite: "VER SITE",
      problem: "O Problema",
      solution: "A Solução",
      result: "O Resultado",
    },
    expertise: {
      eyebrow: "Stack Técnica",
      h2a: "Domínio",
      h2b: "Técnico.",
    },
    differentiators: {
      items: [
        { title: "SaaS Expertise", desc: "Especialista em softwares multi-tenant, dashboards administrativos e fluxos complexos." },
        { title: "Performance Brutal", desc: "Otimização focada em Core Web Vitals e Lighthouse 100 para máxima retenção." },
        { title: "Visão de Produto", desc: "Não apenas sigo tarefas, ajudo a refinar a estratégia de negócio do software." },
      ],
    },
    tech: {
      eyebrow: "Stack Técnica",
      h1a: "Arsenal",
      h1b: "Técnico.",
      groups: {
        frontend: {
          cat: "Frontend",
          sub: "Interfaces de Alto Impacto",
          desc: "Especialista em criar interfaces que unem design premium com performance técnica extrema."
        },
        infra: {
          cat: "Infra & DB",
          sub: "Cloud & Performance",
          desc: "Infraestrutura resiliente e bancos de dados otimizados para escala global."
        },
        backend: {
          cat: "Backend",
          sub: "Arquiteturas Escaláveis",
          desc: "Construção de APIs robustas e sistemas distribuídos de alta disponibilidade."
        },
        solutions: {
          cat: "Soluções",
          sub: "Pagamentos & Integrações",
          desc: "Integração nativa com os principais gateways de pagamento e serviços de terceiro."
        }
      }
    },
    trajectory: {
      eyebrow: "Trajetória",
      h2: "Onde Estou Agora.",
    },
    faq: {
      eyebrow: "FAQ",
      h2a: "Perguntas",
      h2b: "Frequentes.",
    },
    contact: {
      eyebrow: "Trabalhe Comigo",
      h2a: "Pronto para",
      h2b: "Transformar",
      h2c: "seu Negócio?",
      desc: "Agenda uma conversa e descubra como posso entregar um produto digital que gera resultado real, do design ao código.",
      btnWhatsapp: "WHATSAPP DIRETO",
      btnEmail: "ENVIAR E-MAIL",
    },
    footer: {
      desc: "Engenharia de software estratégica focada em performance, design e lucratividade.",
      nav: "Navegação",
      contact: "Contato",
      copy: "© 2026 Thomas Eduardo. Premium Digital Assets.",
    },
  },
  en: {
    nav: {
      about: "About",
      methodology: "Methodology",
      cases: "Cases",
      contact: "Contact",
      cta: "Let's Talk",
    },
    hero: {
      badge: "Available for new projects · Q3 2026",
      h1a: "FROM CODE",
      h1b: "TO VALUE DELIVERY.",
      desc: "Not just code. Product strategy. I transform ideas into digital assets that work for you, combining high-performance engineering with real business vision.",
      ctaProjects: "VIEW PROJECTS",
      ctaContact: "GET IN TOUCH",
    },
    stats: {
      projects: "Real Projects",
      technologies: "Technologies",
      experience: "Years in Market",
      satisfaction: "Satisfaction",
    },
    socialProof: {
      eyebrow: "Social Proof",
      h2a: "Brands that",
      h2b: "Trust the Work.",
      desc: "High-performance systems and premium interfaces for companies seeking the next level.",
    },
    about: {
      eyebrow: "Who I am",
      h2a: "Not just code.",
      h2b: "Product strategy.",
      p1: "My development journey began with the need to solve real problems. I quickly realized that code alone doesn't generate value — what matters is how technology transforms processes into profit.",
      p2a: "Today, I work as a strategic partner for businesses and entrepreneurs looking to elevate their digital presence. I build systems that unite",
      p2bold1: "impeccable design",
      p2mid: "with a",
      p2bold2: "technical architecture",
      p2end: "built for scale.",
      p3: "My focus is creating digital assets that work for you, automating what's repetitive and amplifying what's profitable.",
      certifications: "Certifications",
      statusLabel: "Current Status",
      statusValue: "Senior Fullstack Engineer & Product Leader",
    },
    bento: {
      eyebrow: "Methodology",
      h2a: "How I transform ideas",
      h2b: "into",
      h2c: "high-value assets",
      desc: "My methodology is based on three fundamental pillars, focused on scale and sustainable profitability.",
      card1Title: "Technical & Strategic Diagnosis",
      card1Desc: "I identify the real bottlenecks in your business before the first line of code. Deep immersion to ensure the software solves real problems and brings direct financial return.",
      card2Title: "Brutal Execution",
      card2Desc: "Clean, tested, and high-performance code. Agile development without bureaucracy, focused on constant value delivery.",
      card3Title: "Scale & Support",
      card3Desc: "Architectures that support explosive growth. Continuous support to ensure your asset never stops performing.",
      card4Title: "Cutting-Edge Technology",
      card4Desc: "I use the most solid tools to guarantee longevity and extreme performance for your digital product.",
      tags: ["Audit", "Planning", "Results"],
    },
    process: {
      eyebrow: "How I work",
      h2a: "High",
      h2b: "Performance Process",
      steps: [
        { step: "01", title: "IMMERSION", desc: "Deep understanding of your business model and bottlenecks." },
        { step: "02", title: "DESIGN", desc: "Experience architecture focused on conversion and usability." },
        { step: "03", title: "CODING", desc: "Agile development with clean code and cutting-edge technologies." },
        { step: "04", title: "POLISH", desc: "Rigorous testing and extreme performance optimization." },
        { step: "05", title: "SCALE", desc: "Strategic deployment and continuous results monitoring." },
      ],
    },
    projects: {
      eyebrow: "Portfolio",
      h2a: "Real",
      h2b: "Cases.",
      viewAll: "VIEW ALL CASES",
      btnSite: "VIEW SITE",
      problem: "The Problem",
      solution: "The Solution",
      result: "The Result",
    },
    expertise: {
      eyebrow: "Tech Stack",
      h2a: "Technical",
      h2b: "Mastery.",
    },
    differentiators: {
      items: [
        { title: "SaaS Expertise", desc: "Specialist in multi-tenant software, admin dashboards, and complex workflows." },
        { title: "Brutal Performance", desc: "Optimization focused on Core Web Vitals and Lighthouse 100 for maximum retention." },
        { title: "Product Vision", desc: "I don't just follow tasks, I help refine the software's business strategy." },
      ],
    },
    tech: {
      eyebrow: "Tech Stack",
      h1a: "Technical",
      h1b: "Arsenal.",
      groups: {
        frontend: {
          cat: "Frontend",
          sub: "High-Impact Interfaces",
          desc: "Specialist in creating interfaces that blend premium design with extreme technical performance."
        },
        infra: {
          cat: "Infra & DB",
          sub: "Cloud & Performance",
          desc: "Resilient infrastructure and databases optimized for global scale."
        },
        backend: {
          cat: "Backend",
          sub: "Scalable Architectures",
          desc: "Building robust APIs and high-availability distributed systems."
        },
        solutions: {
          cat: "Solutions",
          sub: "Payments & Integrations",
          desc: "Native integration with major payment gateways and third-party services."
        }
      }
    },
    trajectory: {
      eyebrow: "Trajectory",
      h2: "Where I Am Now.",
    },
    faq: {
      eyebrow: "FAQ",
      h2a: "Frequently Asked",
      h2b: "Questions.",
    },
    contact: {
      eyebrow: "Work With Me",
      h2a: "Ready to",
      h2b: "Transform",
      h2c: "your Business?",
      desc: "Schedule a conversation and discover how I can deliver a digital product that generates real results, from design to code.",
      btnWhatsapp: "WHATSAPP DIRECT",
      btnEmail: "SEND E-MAIL",
    },
    footer: {
      desc: "Strategic software engineering focused on performance, design, and profitability.",
      nav: "Navigation",
      contact: "Contact",
      copy: "© 2026 Thomas Eduardo. Premium Digital Assets.",
    },
  },
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
