import * as path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@providers': path.resolve(__dirname, './src/providers/'),
      '@types': path.resolve(__dirname, './src/types.ts'),
      '@utils': path.resolve(__dirname, './src/utils/')
    }
  },
  base: '/Cloggers'
});
