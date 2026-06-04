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

let cachedSVGL: SVGLItem[] | null = null;

export const useSVGL = () => {
  const [svgs, setSvgs] = useState<SVGLItem[]>(cachedSVGL || []);
  const [loading, setLoading] = useState<boolean>(!cachedSVGL);

  useEffect(() => {
    if (cachedSVGL) return;

    const fetchSVGs = async () => {
      try {
        const response = await fetch('https://api.svgl.app');
        if (!response.ok) throw new Error('Failed to fetch SVGL data');
        const data = await response.json();
        cachedSVGL = data;
        setSvgs(data);
      } catch (error) {
        console.error('Error fetching SVGL API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSVGs();
  }, []);

  const fallbackMap: Record<string, string> = {
    'react': 'https://svgl.app/library/react.svg',
    'tailwindcss': 'https://svgl.app/library/tailwindcss.svg',
    'framer motion': 'https://svgl.app/library/framer.svg',
    'tanstack router': 'https://svgl.app/library/react-query.svg', // TanStack generic
    'typescript': 'https://svgl.app/library/typescript.svg',
    'nodejs': 'https://svgl.app/library/nodejs.svg',
    'next.js': 'https://svgl.app/library/nextjs_icon_dark.svg',
    'vite': 'https://svgl.app/library/vite.svg',
  };

  const getIcon = (name: string): string | undefined => {
    const normalizedName = name.toLowerCase();
    
    // Check fallback map first
    if (fallbackMap[normalizedName]) {
      return fallbackMap[normalizedName];
    }

    if (!svgs.length) return undefined;
    
    // Exact match first
    let match = svgs.find(s => s.title.toLowerCase() === normalizedName);
    
    // Partial match if not found
    if (!match) {
      match = svgs.find(s => s.title.toLowerCase().includes(normalizedName) || normalizedName.includes(s.title.toLowerCase()));
    }

    if (match) {
      if (typeof match.route === 'string') {
        return match.route;
      } else if (match.route?.dark) {
        return match.route.dark; // default to dark theme for the portfolio
      } else if (match.route?.light) {
        return match.route.light;
      }
    }

    return undefined;
  };

  return { svgs, loading, getIcon };
};
