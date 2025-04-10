import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
    host: true,
    strictPort: true,
    allowedHosts: ['localhost', '127.0.0.1', '.sohu.com'],
    hmr: {
      overlay: true
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true // 支持Less中的JavaScript表达式
      }
    }
  }
})
