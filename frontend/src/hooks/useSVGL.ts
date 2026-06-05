import { useState, useEffect } from 'react';

export interface SVGLThemeOptions {
  dark: string;
  light: string;
}

export interface SVGLItem {
  id: number;
  title: string;
  category: string | string[];
  route: string | SVGLThemeOptions;
  url: string;
  wordmark?: string | SVGLThemeOptions;
  brandUrl?: string;
}

export const useSVGL = () => {
  const getIcon = (name: string): string => {
    // Map of technology names to their SimpleIcons slugs
    const iconMap: Record<string, string> = {
      "next.js": "nextdotjs",
      "react": "react",
      "node.js": "nodedotjs",
      "prisma": "prisma",
      "postgresql": "postgresql",
      "docker": "docker",
      "aws": "amazonaws",
      "vercel": "vercel",
      "tailwindcss": "tailwindcss",
      "framer motion": "framer",
      "tanstack router": "reactrouter",
      "typescript": "typescript",
      "stripe": "stripe",
      "canvas api": "html5",
      "websockets": "socketdotio",
      "performance": "lighthouse",
      "seo": "google",
      "ai integration": "openai"
    };

    const slug = iconMap[name.toLowerCase()] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Using SimpleIcons CDN with white color for dark theme compatibility
    return `https://cdn.simpleicons.org/${slug}/white`;
  };

  return { svgs: [], loading: false, getIcon };
};
