import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";

type ProjectSceneProps = {
  name: string;
  description: string;
  stack: string[];
  href: string;
  visual: {
    title: string;
    image?: string;
    video?: string;
    poster?: string;
    mode?: "browser" | "terminal" | "dashboard";
  };
  reverse?: boolean;
};

const terminalLines = [
  "thomas@linux:~/api$ systemctl status node-api",
  "GET /health 200 OK",
  "POST /auth/login 201 CREATED",
  "JWT verified • RBAC policy loaded",
  "deploy: nginx + pm2 + postgres",
];

function TerminalScene({ title }: { title: string }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#272727] bg-[#0b0b0b] shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
      <div className="flex h-11 items-center gap-2 border-b border-[#272727] bg-[#171717]/80 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F5F1E8]/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]/70" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#78716C]">{title}</span>
      </div>
      <div className="aspect-[16/10] p-6 font-mono text-xs sm:p-8">
        <div className="mb-8 grid grid-cols-3 gap-3">
          {["API", "AUTH", "DB"].map((item) => (
            <div key={item} className="rounded-xl border border-[#272727] bg-[#111111] p-4">
              <span className="block text-[10px] uppercase tracking-[0.24em] text-[#78716C]">{item}</span>
              <span className="mt-2 block text-[#22C55E]">online</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {terminalLines.map((line, index) => (
            <div key={line} className="flex gap-3 text-[#A8A29E]">
              <span className="text-[#F97316]">{String(index + 1).padStart(2, "0")}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectScene({ name, description, stack, href, visual, reverse = false }: ProjectSceneProps) {
  return (
    <motion.article
      className={`grid min-h-[78vh] items-center gap-10 py-20 lg:grid-cols-12 lg:gap-16 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-120px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="lg:col-span-4">
        <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.3em] text-[#F97316]">
          Project Scene
        </span>
        <h3 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-[#F5F1E8] sm:text-5xl">
          {name}
        </h3>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-[#A8A29E]">{description}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span key={tech} className="rounded-full border border-[rgba(249,115,22,0.22)] bg-[rgba(249,115,22,0.08)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F97316]">
              {tech}
            </span>
          ))}
        </div>
        <a
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#F5F1E8] transition-colors hover:text-[#F97316]"
          href={href}
        >
          Ver case <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="lg:col-span-8">
        {visual.mode === "terminal" ? (
          <TerminalScene title={visual.title} />
        ) : (
          <BrowserFrame
            alt={name}
            poster={visual.poster}
            src={visual.image}
            title={visual.title}
            videoSrc={visual.video}
          />
        )}
      </div>
    </motion.article>
  );
}
