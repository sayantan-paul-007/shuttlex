import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-icons/fa']
    }
  },
  optimizeDeps: {
    include: ['./node_modules/react-icons/fa','./node_modules/react-icons/io']
  }
})
