import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import { ProjectScene } from "./ProjectScene";
import { Skiper40 } from "../ui/skiper-ui/skiper40";

const WHATSAPP_URL = "https://wa.me/5511977070209?text=Ol%C3%A1%20Thomas%2C%20vi%20seu%20portf%C3%B3lio%20e%20quero%20conversar%20sobre%20um%20projeto.";

const projectScenes = [
  {
    name: "Auth JWT RBAC",
    description: "Fluxo de autenticação com token, rotas protegidas e permissões para áreas administrativas.",
    stack: ["Node.js", "JWT", "RBAC", "React"],
    href: "#contato",
    visual: { title: "auth-flow.local", mode: "terminal" as const },
  },
  {
    name: "API Node.js em Servidor Linux",
    description: "API publicada em ambiente Linux com endpoints organizados, processo monitorado e banco de dados.",
    stack: ["Node.js", "Linux", "PostgreSQL", "Docker"],
    href: "#contato",
    visual: { title: "server-status.thomas", mode: "terminal" as const },
    reverse: true,
  },
  {
    name: "PropostaLink",
    description: "Propostas comerciais com link público, estrutura clara e CTA direto para aprovação.",
    stack: ["React", "TypeScript", "Vite"],
    href: "/proposta",
    visual: {
      title: "proposta-link.preview",
      image: "/projetos/screencapture-paper-contracts-vercel-app-2026-06-18-21_26_40.webp",
    },
  },
  {
    name: "ApplyPilot",
    description: "Dashboard para acompanhar candidaturas, etapas e oportunidades sem depender de planilhas soltas.",
    stack: ["React", "Node.js", "Dashboard"],
    href: "#contato",
    visual: {
      title: "applypilot.dashboard",
      video: "/videohome.mp4",
      poster: "/og.webp",
    },
    reverse: true,
  },
  {
    name: "Sleep House",
    description: "Landing page comercial com presença visual, navegação simples e foco em produtos reais.",
    stack: ["React", "Tailwind", "SEO"],
    href: "https://www.sleephouseloja.com.br/galeria",
    visual: { title: "sleephouse.preview", image: "/projetos/sleephouse-tablest.webp" },
  },
  {
    name: "Homma Design",
    description: "Página visual para marca de design, com composição editorial e apresentação clara do serviço.",
    stack: ["React", "Responsive UI", "Landing Page"],
    href: "#contato",
    visual: { title: "homma-design.preview", image: "/projetos/homma-desktop.webp" },
    reverse: true,
  },
];

const technologies = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker", "Linux", "Vercel", "JWT"];

const timeline = [
  ["01", "Entendimento", "Mapeio o problema, fluxo atual e o que precisa sair do manual."],
  ["02", "Protótipo", "Organizo telas, navegação e comportamento antes de fechar a execução."],
  ["03", "Desenvolvimento", "Construo front-end, API, autenticação, banco e integrações necessárias."],
  ["04", "Deploy", "Publico, reviso responsividade, ajusto ambiente e deixo o projeto utilizável."],
];

function CinematicHero() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#090909] px-6 py-28 md:px-12 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(249,115,22,0.08),transparent_34%),linear-gradient(120deg,#090909_0%,#090909_48%,rgba(17,17,17,0.72)_100%)]" />
      <div className="cinematic-noise absolute inset-0 opacity-[0.055]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-14rem)] max-w-[1500px] items-center gap-14 lg:grid-cols-12">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-6 inline-flex rounded-full border border-[#272727] bg-[#111111]/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#A8A29E]">
            Full Stack Developer • React • Next.js • Node.js
          </span>
          <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#F5F1E8]">
            Construo sistemas web que organizam processos reais.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#A8A29E]">
            Sou Thomas Eduardo, desenvolvedor Full Stack. Crio aplicações web, portais, dashboards, APIs e landing pages com foco em clareza, uso real e operação.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-4 text-sm font-semibold text-[#090909] transition-colors hover:bg-[#EA580C]" href="#projetos">
              Ver projetos <ArrowRight className="h-4 w-4" />
            </a>
            <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#272727] bg-[#111111] px-6 py-4 text-sm font-semibold text-[#F5F1E8] transition-colors hover:border-[#F97316]/40" href={WHATSAPP_URL} rel="noreferrer" target="_blank">
              Falar comigo <MessageCircle className="h-4 w-4" />
            </a>
            <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#272727] px-6 py-4 text-sm font-semibold text-[#A8A29E] transition-colors hover:text-[#F5F1E8]" href="/cv-thomas.pdf" download>
              Baixar CV <Download className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative lg:col-span-7"
          initial={{ opacity: 0, x: 28 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrowserFrame
            className="lg:translate-x-6"
            poster="/og.webp"
            title="portfolio-live.system"
            videoSrc="/videohome.mp4"
          />
          <Skiper40 className="mt-4 w-full lg:absolute lg:-bottom-8 lg:left-0 lg:mt-0 lg:w-[25rem]" />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  return (
    <section className="relative overflow-hidden bg-[#090909] px-6 py-24 md:px-12 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <BrowserFrame
            poster="/og.webp"
            title="portal-admin.dashboard"
            videoSrc="/about-video.mp4"
          />
        </motion.div>
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 28 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-120px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#F97316]">
            Projeto principal
          </span>
          <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-[#F5F1E8] md:text-6xl">
            Portal do Cliente/Admin
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#A8A29E]">
            Sistema administrativo para centralizar clientes, projetos, contratos, pagamentos e acompanhamento de operação.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "JWT"].map((tech) => (
              <span key={tech} className="rounded-full border border-[rgba(249,115,22,0.22)] bg-[rgba(249,115,22,0.08)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F97316]">
                {tech}
              </span>
            ))}
          </div>
          <a className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-4 text-sm font-semibold text-[#090909] transition-colors hover:bg-[#EA580C]" href="/portal">
            Ver case <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TechnicalStrip() {
  return (
    <section id="stack" className="border-y border-[#272727] bg-[#111111] px-6 py-6 md:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-7 gap-y-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#F97316]">Stack</span>
        {technologies.map((tech) => (
          <span key={tech} className="rounded-full border border-[#272727] bg-[#171717] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#A8A29E] transition-colors hover:border-[rgba(249,115,22,0.32)] hover:text-[#F97316]">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProcessTimeline() {
  return (
    <section className="bg-[#090909] px-6 py-24 md:px-12 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 max-w-2xl">
          <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#F97316]">Processo</span>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#F5F1E8] md:text-6xl">Da ideia ao deploy.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {timeline.map(([number, title, description]) => (
            <motion.div
              key={number}
              className="min-h-56 border-l border-[#272727] bg-[#111111]/40 p-6 transition-colors hover:border-l-[#F97316]"
              initial={{ opacity: 0, y: 22 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="font-mono text-xs text-[#F97316]">{number}</span>
              <h3 className="mt-8 text-2xl font-semibold text-[#F5F1E8]">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#A8A29E]">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutShort() {
  return (
    <section id="sobre" className="bg-[#090909] px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-[1500px] gap-8 border-y border-[#272727] py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F97316]">Sobre Thomas</span>
        </div>
        <p className="text-2xl leading-snug tracking-[-0.02em] text-[#F5F1E8] md:text-4xl lg:col-span-8">
          Sou Thomas Eduardo, desenvolvedor Full Stack em São Paulo e curso Engenharia de Software. Trabalho criando aplicações web, landing pages, portais, dashboards e sistemas administrativos. Meu foco é construir software limpo, funcional e direto para operações reais.
        </p>
      </div>
    </section>
  );
}

function CinematicContact() {
  return (
    <section id="contato" className="relative overflow-hidden bg-[#090909] px-6 py-28 md:px-12 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/70 to-transparent" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#F97316]/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1100px] text-center">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#F97316]">Contato</span>
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#F5F1E8]">
          Vamos construir algo real?
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#A8A29E]">
          Disponível para projetos web, sistemas internos, dashboards, landing pages e oportunidades como desenvolvedor Full Stack / Front-End.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-7 py-4 text-sm font-semibold text-[#090909] transition-colors hover:bg-[#EA580C]" href={WHATSAPP_URL} rel="noreferrer" target="_blank">
            Falar comigo <MessageCircle className="h-4 w-4" />
          </a>
          <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#272727] bg-[#111111] px-7 py-4 text-sm font-semibold text-[#F5F1E8]" href="#projetos">
            Ver projetos <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function CinematicHome() {
  return (
    <>
      <CinematicHero />
      <FeaturedProject />
      <section id="projetos" className="bg-[#090909] px-6 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          {projectScenes.map((project) => (
            <ProjectScene key={project.name} {...project} />
          ))}
        </div>
      </section>
      <TechnicalStrip />
      <ProcessTimeline />
      <AboutShort />
      <CinematicContact />
    </>
  );
}
