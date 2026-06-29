import React from "react";

import { cn } from "@/lib/utils";

type LinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const heroLinks = [
  { label: "Portal do Cliente/Admin", href: "/portal", meta: "produto real" },
  { label: "API Node.js em Linux", href: "#projetos", meta: "backend" },
  { label: "Auth JWT RBAC", href: "#projetos", meta: "seguranca" },
];

const baseLink =
  "group relative inline-flex items-center text-left text-[#F5F1E8] transition-colors duration-300 motion-reduce:transition-none";

const arrow = (
  <svg
    aria-hidden="true"
    className="ml-[0.45em] size-[0.58em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
    fill="none"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
    />
  </svg>
);

const Link000 = ({ children, href, className }: LinkProps) => (
  <a
    className={cn(
      baseLink,
      "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-[#F97316] before:transition-transform before:duration-300 before:content-[''] hover:text-[#F97316] hover:before:origin-left hover:before:scale-x-100",
      className,
    )}
    href={href}
  >
    {children}
  </a>
);

const Link001 = ({ children, href, className }: LinkProps) => (
  <a
    className={cn(
      baseLink,
      "before:pointer-events-none before:absolute before:left-0 before:top-[1.55em] before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-[#F97316] before:transition-transform before:duration-300 before:content-[''] hover:text-[#F97316] hover:before:origin-left hover:before:scale-x-100",
      className,
    )}
    href={href}
  >
    {children}
    {arrow}
  </a>
);

const Link002 = ({ children, href, className }: LinkProps) => (
  <a
    className={cn(
      baseLink,
      "before:pointer-events-none before:absolute before:left-0 before:top-[1.55em] before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#F97316] before:transition-transform before:duration-300 before:content-[''] hover:text-[#F97316] hover:before:origin-right hover:before:scale-x-100",
      className,
    )}
    href={href}
  >
    {children}
    {arrow}
  </a>
);

const Link003 = ({ children, href, className }: LinkProps) => (
  <a
    className={cn(
      baseLink,
      "before:pointer-events-none before:absolute before:left-0 before:top-[1.55em] before:h-px before:w-full before:origin-center before:scale-x-0 before:bg-[#F97316] before:transition-transform before:duration-300 before:content-[''] hover:text-[#F97316] hover:before:scale-x-100",
      className,
    )}
    href={href}
  >
    {children}
    {arrow}
  </a>
);

const Link004 = ({ children, href, className }: LinkProps) => (
  <a
    className={cn(
      baseLink,
      "px-2 before:pointer-events-none before:absolute before:left-0 before:z-[-1] before:h-0 before:w-full before:origin-center before:scale-x-100 before:bg-[#F97316] before:transition-all before:duration-300 before:content-[''] hover:text-[#090909] hover:before:h-[1.45em] md:before:bottom-0",
      className,
    )}
    href={href}
  >
    {children}
    {arrow}
  </a>
);

const Link005 = ({ children, href, className }: LinkProps) => (
  <a
    className={cn(
      baseLink,
      "px-2 before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-[#F97316] before:transition-transform before:duration-300 before:content-[''] hover:text-[#090909] hover:before:scale-x-100",
      className,
    )}
    href={href}
  >
    {children}
    {arrow}
  </a>
);

const linkVariants = [Link001, Link002, Link003];

const Skiper40 = ({ className }: { className?: string }) => {
  return (
    <aside
      aria-label="Projetos em destaque"
      className={cn(
        "rounded-2xl border border-[#272727] bg-[#111111]/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-md",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#272727] pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#F97316]">
          cenas reais
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
      </div>

      <div className="space-y-3">
        {heroLinks.map((item, index) => {
          const AnimatedLink = linkVariants[index] ?? Link001;
          return (
            <div key={item.label} className="flex items-baseline justify-between gap-4">
              <AnimatedLink
                className="z-10 max-w-[15rem] font-mono text-[11px] uppercase tracking-[0.12em]"
                href={item.href}
              >
                {item.label}
              </AnimatedLink>
              <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[#78716C] sm:inline">
                {item.meta}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export { Link000, Link001, Link002, Link003, Link004, Link005, Skiper40 };
