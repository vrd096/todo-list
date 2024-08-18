import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-report.html', // Имя получаемого файла
      open: true, // Автоматически открыть отчет после сборки
      gzipSize: true, // Добавляет информацию о размере gzip
      brotliSize: true, // Добавляет информацию о размере brotli
      sourcemap: true, // Включить карты исходного кода для более детальной информации
    }),
  ],
  build: {
    rollupOptions: {
      external: [], // Убедитесь, что Firebase модули не включены в external
      output: {
        manualChunks(id) {
          // Разбиваем по node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Разбиваем по страницам, предполагая, что структуры типа /src/pages/*
          // Это разбивает страницы на индивидуальные чанки
          if (id.includes('/src/pages/')) {
            const directories = id.split('/');
            const name = directories[directories.length - 2];
            return `page-${name}`;
          }

          // Разбиваем Firebase модули
          if (id.includes('firebase/app')) {
            return 'firebase-app';
          }
          if (id.includes('firebase/auth')) {
            return 'firebase-auth';
          }
          if (id.includes('firebase/firestore')) {
            return 'firebase-firestore';
          }

          // Можно добавить другие условия или оставить этот блок, если не хотите явной разбивки
        },
      },
    },
  },
});
