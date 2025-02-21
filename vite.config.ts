import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3333,
  },
  base: '/forza-open-telemetry/',
  build: {
    outDir: 'docs',
  }
})
