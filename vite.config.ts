// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // всё, что идёт на /api/* будет проксироваться на свой бэкенд
      '/api': {
        target: 'http://193.29.224.111:8080',
        changeOrigin: true,
        secure: false,
        // если хотите убрать префикс /api, раскомментируйте строку ниже
        // rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
