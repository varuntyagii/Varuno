import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.riv'],
  build: {
    chunkSizeWarningLimit: 1000,  // warning limit 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'gsap', 'react-router-dom'],
          lottie: ['lottie-web'],
          // Agar aur libraries ho to yahan add kar:
          // ui: ['framer-motion'],
          // three: ['three', '@react-three/fiber']
        }
      }
    }
  }
  // server: {port: 5173}  // ye comment mein hai, zaroorat nahi
})
