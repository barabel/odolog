import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import iconSpritePlugin from './plugins/vite-plugin-icon-sprite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    iconSpritePlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
