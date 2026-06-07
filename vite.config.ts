import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // A relative base makes the build work at both username.github.io
  // and username.github.io/repository-name.
  base: './',
  plugins: [react(), tailwindcss()],
});
