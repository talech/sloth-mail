import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // A relative base makes the build work at both username.github.io
  // and username.github.io/repository-name.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // GitHub Pages can cache index.html after replacing the previous
        // deployment. Stable bundle URLs keep that cached page loadable during
        // the transition instead of leaving it pointed at deleted hash files.
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
