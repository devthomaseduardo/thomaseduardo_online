import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
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
