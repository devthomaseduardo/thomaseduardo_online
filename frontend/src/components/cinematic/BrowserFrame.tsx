import React from "react";

type BrowserFrameProps = {
  title: string;
  src?: string;
  videoSrc?: string;
  poster?: string;
  alt?: string;
  className?: string;
};

export function BrowserFrame({ title, src, videoSrc, poster, alt, className = "" }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-[1.5rem] border border-[#272727] bg-[#111111] shadow-[0_40px_120px_rgba(0,0,0,0.65)] ${className}`}>
      <div className="flex h-11 items-center gap-2 border-b border-[#272727] bg-[#171717]/80 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F5F1E8]/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]/70" />
        <span className="ml-3 min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.24em] text-[#78716C]">
          {title}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-[#090909]">
        {videoSrc ? (
          <video
            aria-label={alt ?? title}
            autoPlay
            className="h-full w-full object-cover opacity-80"
            loop
            muted
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            alt={alt ?? title}
            className="h-full w-full object-cover"
            loading="lazy"
            src={src}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(249,115,22,0.08),transparent_32%),linear-gradient(180deg,transparent,rgba(9,9,9,0.32))]" />
      </div>
    </div>
  );
}
