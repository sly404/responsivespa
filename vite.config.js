import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    hmr: {
      overlay: true
    }
  }
})
