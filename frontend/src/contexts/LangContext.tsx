import React, { createContext, useContext, useState } from "react";

type Lang = "pt" | "en";

const translations = {
  pt: {
    meta: {
      title: "Thomas Eduardo | Arquiteto de Sistemas & Full Stack Developer",
      description: "Especialista em transformar gargalos operacionais em ativos de escala através de arquitetura de software premium, automações e ecossistemas privados.",
      keywords: "Arquiteto de Sistemas, Full Stack Developer, Node.js, React, Automação de Processos, Engenharia de Software, Performance Web, SaaS",
    },
    nav: {
      about: "Manifesto",
      methodology: "Framework",
      cases: "Cases",
      contact: "Direct",
      lab: "Lab",
      cta: "Iniciar Projeto",
    },
    hero: {
      badge: "ARQUITETO DE SISTEMAS • FULL STACK DEVELOPER",
      h1a: "Transformo gargalos",
      h1b: "em ativos de escala.",
      desc: "Desenvolvo arquiteturas de software, automações e ecossistemas privados para empresas que buscam previsibilidade e eficiência operacional absoluta.",
      ctaProjects: "EXPLORAR CASES",
      ctaContact: "INICIAR PROJETO",
      stats: {
        projects: "Projetos Entregues",
        code: "Código Proprietário",
        manual: "Processos Manuais",
        clients: "Clientes Atendidos",
      }
    },
    socialProof: {
      eyebrow: "Empresas que confiaram na operação",
      h2a: "Confiança",
      h2b: "Operacional.",
      desc: "Sistemas de alta performance suportando o crescimento de marcas de alto valor.",
    },
    about: {
      eyebrow: "Sobre",
      h2a: "Sistemas complexos",
      h2b: "exigem soluções simples.",
      p1: "Minha especialidade é arquitetar fluxos que eliminam a fricção operacional, substituindo processos manuais por código robusto, escalável e de baixa manutenção.",
      tags: ["Automação", "Performance", "Operação", "Escala"],
      certifications: "Legitimidade Técnica",
    },
    solutions: {
      eyebrow: "Soluções",
      h2: "Soluções que eliminam gargalos.",
      desc: "Engenharia de software focada em governança de dados, eliminação de fricção operacional e infraestrutura preparada para o crescimento exponencial.",
      learnMore: "Saiba Mais",
      items: [
        {
          title: "Sistema Operacional",
          desc: "Centralize processos, equipe, clientes, estoque, financeiro e ordens de serviço em uma única plataforma.",
          features: ["Ordens de Serviço", "CRM", "Gestão Operacional", "Financeiro", "Estoque"]
        },
        {
          title: "Automações Inteligentes",
          desc: "Automatize tarefas repetitivas, integrações, mensagens, notificações e fluxos internos.",
          features: ["WhatsApp", "Telegram", "E-mail", "APIs", "Workflows"]
        },
        {
          title: "Plataformas Privadas",
          desc: "Portais do cliente, áreas restritas, dashboards, pagamentos, contratos e arquivos.",
          features: ["Portal do Cliente", "Área Restrita", "Dashboards", "Contratos", "Pagamentos"]
        },
        {
          title: "Aplicações Web",
          desc: "Landing pages, e-commerces, SaaS, portais e sistemas web performáticos.",
          features: ["SaaS", "Landing Pages", "E-commerce", "Websites", "Portais"]
        }
      ]
    },
    bento: {
      eyebrow: "Dores Operacionais",
      h2a: "Sistemas de alta",
      h2b: "escala e previsibilidade",
      desc: "Desenho arquiteturas focadas em resolver gargalos específicos do seu negócio.",
      card1Title: "Centralização Total",
      card1Desc: "Dados e processos em um só lugar, sem burocracia desnecessária.",
      card2Title: "Conversão Máxima",
      card2Desc: "Checkouts ultra-rápidos projetados para não perder vendas.",
      card3Title: "Automação Pura",
      card3Desc: "Substitua tarefas repetitivas por fluxos que trabalham por você.",
      card4Title: "Infra de Elite",
      card4Desc: "Sistemas robustos que sustentam picos de tráfego sem oscilar.",
      tags: ["Operação", "Escala", "Retorno"],
      bottleneck: "Gargalo",
    },
    process: {
      eyebrow: "Maturidade",
      h2a: "Previsibilidade",
      h2b: "Institucional",
      cta: "Começar Agora",
      mobileCta: "Iniciar Estruturação",
      phase: "Fase",
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
      catOperational: "SISTEMA OPERACIONAL",
      catInfra: "SITES & LANDING PAGES",
      labTitle: "Engineering Lab",
      labDesc: "Repositório de arquiteturas, bots, experimentos técnicos e estudos de infraestrutura.",
      newBadge: "Novo",
      hideDetails: "Recolher Detalhes",
      showDetails: "Detalhes do Projeto",
      discussProject: "Discutir Projeto",
      exploreAll: "Explorar Todos os Cases",
      challenge: "O Desafio",
      impact: "Impacto no Negócio",
      highlights: "Destaques do Sistema",
      livePreview: "Acessar ao Vivo",
      clientHeader: "Projetos de Clientes",
      backToHome: "Voltar ao Início",
      pageEyebrow: "Portfólio de Cases",
      pageTitle: "Sistemas & Páginas",
      pageDesc: "Confira todos os sistemas completos, automações e landing pages de alta conversão desenvolvidos para simplificar operações e gerar vendas reais.",
      catFrontend: "Frontend & Páginas",
      catBackend: "Backend & Sistemas"
    },
    portal: {
      nav: "Área do Cliente",
      hero: {
        eyebrow: "Portal Privado",
        h1a: "Tudo do seu projeto",
        h1b: "em um só lugar.",
        desc: "Uma área criada para organizar materiais, pagamentos, contratos, arquivos e toda a estrutura técnica do seu projeto com clareza e previsibilidade.",
        ctaLogin: "Acessar área do cliente",
        ctaWork: "Entender como funciona",
      },
      howItWorks: {
        eyebrow: "Como funciona",
        title: "Do briefing ao deploy.",
        steps: [
          { n: "01", title: "Briefing & Organização", desc: "Entendimento do projeto, objetivos, referências e estrutura inicial do escopo.", emoji: "folder" },
          { n: "02", title: "Materiais & Conteúdo", desc: "Envio de imagens, textos, referências e acessos importantes.", emoji: "laptop" },
          { n: "03", title: "Desenvolvimento & Aprovação", desc: "Criação, acompanhamento, revisões e validações do projeto em tempo real.", emoji: "gear" },
          { n: "04", title: "Entrega & Infraestrutura", desc: "Deploy, domínio, repositórios, arquivos finais e documentação técnica.", emoji: "rocket" },
        ]
      },
      access: {
        eyebrow: "Área privada",
        title: "O que você acessa.",
        modules: {
          contracts: "Contratos",
          payments: "Pagamentos",
          balance: "Saldo",
          invoices: "Notas Fiscais",
          progress: "Progresso",
          timeline: "Timeline",
          files: "Arquivos ZIP",
          uploads: "Uploads",
          deploys: "Deploys",
          repos: "Repositórios",
          meta: "Meta Ads",
          google: "Google Ads",
          analytics: "Analytics",
          gtm: "GTM",
          search: "Search Console",
          domain: "Domínio & Host",
        }
      },
      onboarding: {
        eyebrow: "Onboarding",
        title: "O que você precisa ter.",
        desc: "Não se preocupe se não tiver tudo — organizamos junto durante o onboarding.",
        accordions: [
          { title: "Identidade Visual", items: ["Paleta de cores", "Tipografia / fontes", "Referências visuais"] },
          { title: "Conteúdo", items: ["Textos institucionais", "Imagens e fotos", "Vídeos e mídias", "Copywriting"] },
          { title: "Acessos Técnicos", items: ["Painel do domínio", "Hospedagem (cPanel / FTP)", "Meta Business Manager", "Google Analytics / Tag Manager"] },
          { title: "Arquivos Extras", items: ["Google Drive compartilhado", "Documentos e PDFs", "Briefings anteriores", "Referências adicionais"] },
        ]
      },
      financial: {
        eyebrow: "Financeiro",
        title: "Formas de pagamento.",
        desc: "50% no início + 50% na entrega. Simples e transparente.",
        pixDesc: "Chave PIX — pagamento instantâneo, sem taxas adicionais.",
        pixConfirm: "Confirmação instantânea após o pagamento",
        cardDesc: "O link de pagamento seguro é gerado após a aprovação do escopo e enviado por e-mail ou diretamente no seu portal.",
        mpBadge: "Checkout via Mercado Pago",
        copy: "Copiar",
        copied: "Copiado",
      },
      login: {
        eyebrow: "Acesso restrito",
        title: "Área privada do cliente.",
        desc: "Acesse pagamentos, contratos, arquivos, materiais, deploys e informações técnicas do seu projeto.",
        secure: "Acesso Seguro",
        sub: "Credenciais enviadas por e-mail",
        identifier: "CNPJ, CPF ou e-mail",
        password: "Chave de acesso",
        placeholderId: "Seu identificador",
        btn: "Acessar Projeto",
        verifying: "Verificando...",
      }
    },
    landing: {
      nav: {
        projects: "Projetos",
        process: "Processo",
        testimonials: "Depoimentos",
        cta: "Agendar Conversa",
        mobileCta: "Contato"
      },
      hero: {
        h1: "Transformo operações em vantagem competitiva.",
        desc: "Desenvolvimento de sistemas, automações e plataformas privadas para empresas que precisam crescer com previsibilidade.",
        cta1: "Agendar Conversa",
        cta2: "Ver Projetos"
      },
      benefits: {
        projects: "Projetos Entregues",
        code: "Código Proprietário",
        tasks: "Tarefas Manuais",
        retention: "Retenção de Clientes"
      },
      about: {
        h2: "Engenharia sob medida.",
        desc: "Desenvolvo soluções tecnológicas exclusivas para empresas que buscam escalar. Foco em arquitetura robusta, interfaces de alta performance e código sustentável a longo prazo."
      },
      problem: {
        h2: "A maioria dos sistemas cria complexidade.",
        desc: "Grande parte dos negócios sofre com ferramentas genéricas e desconectadas. O resultado é dados perdidos, retrabalho constante e a equipe gastando mais tempo gerenciando planilhas do que executando o trabalho real. A operação trava em vez de escalar.",
        diagram: "Processos Desconectados"
      },
      services: {
        title: "O que eu faço",
        items: [
          { 
            title: "Organização Operacional", 
            desc: "Centralização de dados e fluxos de trabalho. Criação de centros de comando para gerenciar sua empresa inteira em um só lugar."
          },
          { 
            title: "Automação", 
            desc: "Substituição de processos manuais e repetitivos por integrações inteligentes, liberando sua equipe para trabalho estratégico."
          },
          { 
            title: "Escalabilidade", 
            desc: "Arquiteturas robustas projetadas para suportar o crescimento da base de clientes sem aumento linear de custo ou complexidade."
          }
        ]
      },
      featured: {
        title: "Projeto Destaque",
        eyebrow: "Case de Sucesso",
        desc: "Sistema digital completo e arquitetura operacional projetada para unificar o estoque, gerenciar fluxo de vendas e oferecer um front-end de alta performance para a rede de franquias. O resultado foi um showroom robusto com integração nativa ao ecossistema existente.",
        cta: "Ver Case Completo"
      },
      otherProjects: {
        title: "Outros Projetos",
        items: [
          { name: "Homma Design", desc: "Plataforma de gestão de escritórios de arquitetura." },
          { name: "Portal Nexio", desc: "Sistema de onboarding e gestão de parceiros B2B." },
          { name: "Paper Contracts", desc: "Automação de contratos e assinaturas digitais." },
          { name: "Guardian", desc: "Monitoramento de infraestrutura e alertas em tempo real." }
        ]
      },
      process: {
        title: "Processo Estruturado",
        steps: [
          { title: "Diagnóstico", desc: "Mapeamento dos gargalos." },
          { title: "Arquitetura", desc: "Desenho da solução técnica." },
          { title: "Desenvolvimento", desc: "Código e integrações." },
          { title: "Implantação", desc: "Rollout controlado." },
          { title: "Escala", desc: "Manutenção e evolução." }
        ]
      },
      testimonials: {
        title: "O que dizem",
        items: [
          { text: "A automação do nosso onboarding reduziu o tempo de entrada de clientes de dias para minutos. A previsibilidade que ganhamos foi essencial para o nosso crescimento este ano.", name: "Marcelo Souza", role: "Diretor de Operações", company: "Nexio Corporate" },
          { text: "Precisávamos de um sistema que conversasse com nosso ERP legado e ao mesmo tempo oferecesse uma interface moderna para nossos vendedores. A entrega foi impecável.", name: "Carla Ferraz", role: "Head de Inovação", company: "Homma Design" },
          { text: "O nível de engenharia e a preocupação com a arquitetura do projeto nos deu segurança para escalar nossa operação sem medo de o sistema sair do ar.", name: "Rodrigo Alcantara", role: "CEO", company: "Paper Contracts" }
        ]
      },
      cta: {
        h2: "Vamos falar sobre sua operação?",
        desc: "Preencha o formulário e receba uma análise inicial da sua arquitetura digital em até 24 horas.",
        social: "+18 empresas já escaladas"
      }
    },
    contact: {
      eyebrow: "Contato",
      h2a: "Vamos estruturar",
      h2b: "a sua operação?",
      desc: "Software focado em destravar o crescimento do seu negócio.",
      btnWhatsapp: "WhatsApp",
      btnEmail: "E-mail Direto",
    },
    footer: {
      h2: "devthomaseduardo@gmail.com",
      desc: "Engenharia focada em eliminar fricção e acelerar o seu negócio.",
      nav: "Links Institucionais",
      contact: "Contato Direto",
      copy: "Thomas Eduardo. Premium Digital Assets.",
    },
    availability: {
      eyebrow: "Agenda",
      h2: "Disponibilidade",
      desc: "Agenda fechada para o mês vigente. Slots abertos exclusivamente para o próximo ciclo de produção.",
      available: "Disponível",
      unavailable: "Ocupado",
      cta: "Reservar Slot",
    },
  },
  en: {
    meta: {
      title: "Thomas Eduardo | Systems Architect & Full Stack Developer",
      description: "Specialist in transforming operational bottlenecks into scale assets through premium software architecture, automation, and private ecosystems.",
      keywords: "Systems Architect, Full Stack Developer, Node.js, React, Process Automation, Software Engineering, Web Performance, SaaS",
    },
    nav: {
      about: "Manifesto",
      methodology: "Framework",
      cases: "Cases",
      contact: "Direct",
      lab: "Lab",
      cta: "Start Project",
    },
    hero: {
      badge: "SYSTEMS ARCHITECT • FULL STACK DEVELOPER",
      h1a: "Architecting code",
      h1b: "built for scale.",
      desc: "I design high-performance software, intelligent automations, and private ecosystems for businesses aiming for absolute predictability and operational excellence.",
      ctaProjects: "EXPLORE CASES",
      ctaContact: "START PROJECT",
      stats: {
        projects: "Projects Delivered",
        code: "Proprietary Code",
        manual: "Manual Processes",
        clients: "Clients Served",
      }
    },
    socialProof: {
      eyebrow: "Companies that trusted the operation",
      h2a: "Operational",
      h2b: "Trust.",
      desc: "High-performance systems supporting the growth of high-value brands.",
    },
    about: {
      eyebrow: "About",
      h2a: "Complex systems",
      h2b: "demand simple solutions.",
      p1: "I specialize in architecting workflows that eliminate operational friction, replacing manual tasks with robust, scalable, and low-maintenance code.",
      tags: ["Automation", "Performance", "Operation", "Scale"],
      certifications: "Technical Legitimacy",
    },
    solutions: {
      eyebrow: "Solutions",
      h2: "Solutions that eliminate bottlenecks.",
      desc: "Software engineering focused on data governance, eliminating operational friction, and infrastructure built for exponential growth.",
      learnMore: "Learn More",
      items: [
        {
          title: "Operating System",
          desc: "Centralize processes, team, clients, stock, finance, and service orders in a single platform.",
          features: ["Service Orders", "CRM", "Operational Management", "Finance", "Stock"]
        },
        {
          title: "Intelligent Automations",
          desc: "Automate repetitive tasks, integrations, messages, notifications, and internal flows.",
          features: ["WhatsApp", "Telegram", "Email", "APIs", "Workflows"]
        },
        {
          title: "Private Platforms",
          desc: "Client portals, restricted areas, dashboards, payments, contracts, and files.",
          features: ["Client Portal", "Restricted Area", "Dashboards", "Contracts", "Payments"]
        },
        {
          title: "Web Applications",
          desc: "Landing pages, e-commerces, SaaS, portals, and high-performance web systems.",
          features: ["SaaS", "Landing Pages", "E-commerce", "Websites", "Portals"]
        }
      ]
    },
    bento: {
      eyebrow: "Operational Pains",
      h2a: "Systems of high",
      h2b: "scale and predictability",
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
      bottleneck: "Bottleneck",
    },
    process: {
      eyebrow: "Maturity",
      h2a: "Institutional",
      h2b: "Predictability",
      cta: "Start Now",
      mobileCta: "Start Structuring",
      phase: "Phase",
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
      catOperational: "OPERATIONAL SYSTEM",
      catInfra: "SITES & LANDING PAGES",
      labTitle: "Engineering Lab",
      labDesc: "Repository of architectures, bots, technical experiments, and infrastructure studies.",
      newBadge: "New",
      hideDetails: "Hide Details",
      showDetails: "Project Details",
      discussProject: "Discuss Project",
      exploreAll: "Explore All Cases",
      challenge: "The Challenge",
      impact: "Business Impact",
      highlights: "Key Highlights",
      livePreview: "Live Preview",
      clientHeader: "Client Projects",
      backToHome: "Back to Home",
      pageEyebrow: "Case Portfolio",
      pageTitle: "Systems & Pages",
      pageDesc: "Explore the full suite of operational tools, custom dashboards, and high-performance pages designed to eliminate waste and accelerate business growth.",
      catFrontend: "Frontend & Pages",
      catBackend: "Backend & Systems"
    },
    portal: {
      nav: "Client Area",
      hero: {
        eyebrow: "Private Portal",
        h1a: "Everything about your project",
        h1b: "in one place.",
        desc: "An area created to organize materials, payments, contracts, files, and all the technical structure of your project with clarity and predictability.",
        ctaLogin: "Access client area",
        ctaWork: "Understand how it works",
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "From briefing to deploy.",
        steps: [
          { n: "01", title: "Briefing & Organization", desc: "Understanding the project, objectives, references, and initial scope structure.", emoji: "folder" },
          { n: "02", title: "Materials & Content", desc: "Sending images, texts, references, and important access credentials.", emoji: "laptop" },
          { n: "03", title: "Development & Approval", desc: "Creation, monitoring, revisions, and project validations in real-time.", emoji: "gear" },
          { n: "04", title: "Delivery & Infrastructure", desc: "Deploy, domain, repositories, final files, and technical documentation.", emoji: "rocket" },
        ]
      },
      access: {
        eyebrow: "Private area",
        title: "What you access.",
        modules: {
          contracts: "Contracts",
          payments: "Payments",
          balance: "Balance",
          invoices: "Invoices",
          progress: "Progress",
          timeline: "Timeline",
          files: "ZIP Files",
          uploads: "Uploads",
          deploys: "Deploys",
          repos: "Repositories",
          meta: "Meta Ads",
          google: "Google Ads",
          analytics: "Analytics",
          gtm: "GTM",
          search: "Search Console",
          domain: "Domain & Host",
        }
      },
      onboarding: {
        eyebrow: "Onboarding",
        title: "What you need to have.",
        desc: "Don't worry if you don't have everything — we organize it together during onboarding.",
        accordions: [
          { title: "Visual Identity", items: ["Color palette", "Typography / fonts", "Visual references"] },
          { title: "Content", items: ["Institutional texts", "Images and photos", "Videos and media", "Copywriting"] },
          { title: "Technical Access", items: ["Domain panel", "Hosting (cPanel / FTP)", "Meta Business Manager", "Google Analytics / Tag Manager"] },
          { title: "Extra Files", items: ["Shared Google Drive", "Documents and PDFs", "Previous briefings", "Additional references"] },
        ]
      },
      financial: {
        eyebrow: "Financial",
        title: "Payment methods.",
        desc: "50% upfront + 50% on delivery. Simple and transparent.",
        pixDesc: "PIX Key — instant payment, no additional fees.",
        pixConfirm: "Instant confirmation after payment",
        cardDesc: "The secure payment link is generated after scope approval and sent by email or directly in your portal.",
        mpBadge: "Checkout via Mercado Pago",
        copy: "Copy",
        copied: "Copied",
      },
      login: {
        eyebrow: "Restricted access",
        title: "Private client area.",
        desc: "Access payments, contracts, files, materials, deploys, and technical information of your project.",
        secure: "Secure Access",
        sub: "Credentials sent by email",
        identifier: "CNPJ, CPF, or email",
        password: "Access key",
        placeholderId: "Your identifier",
        btn: "Access Project",
        verifying: "Verifying...",
      }
    },
    landing: {
      nav: {
        projects: "Projects",
        process: "Process",
        testimonials: "Testimonials",
        cta: "Schedule a Call",
        mobileCta: "Contact"
      },
      hero: {
        h1: "I turn operations into competitive advantage.",
        desc: "Development of systems, automations, and private platforms for companies that need to grow with predictability.",
        cta1: "Schedule a Call",
        cta2: "View Projects"
      },
      benefits: {
        projects: "Projects Delivered",
        code: "Proprietary Code",
        tasks: "Manual Tasks",
        retention: "Client Retention"
      },
      about: {
        h2: "Tailor-made engineering.",
        desc: "I develop exclusive technological solutions for companies seeking to scale. Focus on robust architecture, high-performance interfaces, and long-term sustainable code."
      },
      problem: {
        h2: "Most systems create complexity.",
        desc: "A large part of businesses suffer from generic and disconnected tools. The result is lost data, constant rework, and the team spending more time managing spreadsheets than executing real work. The operation stalls instead of scaling.",
        diagram: "Disconnected Processes"
      },
      services: {
        title: "What I do",
        items: [
          { 
            title: "Operational Organization", 
            desc: "Centralization of data and workflows. Creation of command centers to manage your entire company in one place."
          },
          { 
            title: "Automation", 
            desc: "Replacing manual and repetitive processes with intelligent integrations, freeing your team for strategic work."
          },
          { 
            title: "Scalability", 
            desc: "Robust architectures designed to support client base growth without linear increase in cost or complexity."
          }
        ]
      },
      featured: {
        title: "Featured Project",
        eyebrow: "Success Case",
        desc: "Complete digital system and operational architecture designed to unify inventory, manage sales flow, and offer a high-performance front-end for the franchise network. The result was a robust showroom with native integration into the existing ecosystem.",
        cta: "View Full Case"
      },
      otherProjects: {
        title: "Other Projects",
        items: [
          { name: "Homma Design", desc: "Management platform for architecture offices." },
          { name: "Nexio Portal", desc: "Onboarding system and management of B2B partners." },
          { name: "Paper Contracts", desc: "Automation of contracts and digital signatures." },
          { name: "Guardian", desc: "Infrastructure monitoring and real-time alerts." }
        ]
      },
      process: {
        title: "Structured Process",
        steps: [
          { title: "Diagnosis", desc: "Mapping bottlenecks." },
          { title: "Architecture", desc: "Designing technical solution." },
          { title: "Development", desc: "Code and integrations." },
          { title: "Deployment", desc: "Controlled rollout." },
          { title: "Scale", desc: "Maintenance and evolution." }
        ]
      },
      testimonials: {
        title: "What they say",
        items: [
          { text: "Automating our onboarding reduced client entry time from days to minutes. The predictability we gained was essential for our growth this year.", name: "Marcelo Souza", role: "Operations Director", company: "Nexio Corporate" },
          { text: "We needed a system that communicated with our legacy ERP and at the same time offered a modern interface for our salespeople. The delivery was impeccable.", name: "Carla Ferraz", role: "Head of Innovation", company: "Homma Design" },
          { text: "The engineering level and the concern for project architecture gave us security to scale our operation without fear of the system going down.", name: "Rodrigo Alcantara", role: "CEO", company: "Paper Contracts" }
        ]
      },
      cta: {
        h2: "Let's talk about your operation?",
        desc: "Fill out the form and receive an initial analysis of your digital architecture within 24 hours.",
        social: "+18 companies already scaled"
      }
    },
    contact: {
      eyebrow: "Contact",
      h2a: "Let's structure",
      h2b: "your operation?",
      desc: "Software focused on unlocking your business growth.",
      btnWhatsapp: "WhatsApp",
      btnEmail: "Direct Email",
    },
    footer: {
      h2: "devthomaseduardo@gmail.com",
      desc: "Engineering focused on eliminating friction and accelerating your business.",
      nav: "Institutional Links",
      contact: "Direct Contact",
      copy: "All rights reserved.",
    },
    availability: {
      eyebrow: "Schedule",
      h2: "Availability",
      desc: "Schedule closed for the current month. Slots exclusively open for the next production cycle.",
      available: "Available",
      unavailable: "Booked",
      cta: "Book Slot",
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
