import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function copyPublicPlugin() {
  return {
    name: 'copy-public-safe',
    apply: 'build' as const,
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const distDir = path.resolve(__dirname, 'dist');
      const entries = fs.readdirSync(publicDir);
      for (const entry of entries) {
        try {
          const src = path.join(publicDir, entry);
          const dest = path.join(distDir, entry);
          fs.copyFileSync(src, dest);
        } catch {
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    copyPublicDir: false,
  },
});
