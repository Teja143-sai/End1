import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    port: 3000,
    open: true,
    // This handles client-side routing
    historyApiFallback: true,
  },
  build: {
    // This ensures the build outputs index.html in the root
    outDir: 'dist',
    // This ensures the assets are referenced correctly in the HTML
    assetsDir: 'assets',
    // This enables code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase'],
        },
      },
    },
  },
  // This ensures that the base path is correctly set for client-side routing
  base: '/',
});
