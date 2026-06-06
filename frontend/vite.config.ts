import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const rootDir = path.resolve(__dirname, '../');
  const env = loadEnv(mode, rootDir, '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      headers: {
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://platform.linkedin.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
          "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com",
          "img-src 'self' data: blob: https:",
          "connect-src 'self' http://localhost:3002 ws://localhost:* https://www.google-analytics.com https://analytics.google.com https://api.fontshare.com",
          "frame-src 'self' https://www.googletagmanager.com",
          "worker-src 'self' blob:",
        ].join('; '),
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    build: {
      // Warn when a chunk exceeds 500 KiB
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React runtime — most stable, cached longest
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // Animation libraries — lazy when possible
            'vendor-motion': ['motion'],
            'vendor-anime': ['animejs'],
            // Icons — tree-shakeable but still its own chunk
            'vendor-lucide': ['lucide-react'],
            // Gemini AI SDK — large, only needed in specific pages
            'vendor-genai': ['@google/genai'],
          },
        },
      },
    },
  };
});
