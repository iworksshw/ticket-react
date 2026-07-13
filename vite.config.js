import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/ticket-react/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 주입 설정은 완전히 지우고, 향후 Dart Sass 3.0 로드맵에 맞춘 silence 설정만 깔끔하게 남겨둡니다.
        silenceDeprecations: ['import'],
      },
    },
  },
  
});