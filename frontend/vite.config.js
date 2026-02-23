// vite.config.js full optimized version:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  build: {
    target: 'es2020',
    minify: 'terser', // Better minification
    terserOptions: {
      compress: {
        drop_console: true, // Production me console.log hata dega
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'gsap', 'react-router-dom'],
          lottie: ['lottie-web'],
          'ui-components': ['framer-motion', 'react-hot-toast']
        }
      }
    },
    // Cache busting
    assetsInlineLimit: 4096 // 4KB se chhoti images inline ho jayengi
  },
  server: {
    // Dev server fast karne ke liye
    fs: {
      strict: false
    }
  }
})
