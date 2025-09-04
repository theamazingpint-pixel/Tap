import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: true,           
    port: 5173,
    strictPort: true,
  
    allowedHosts: [
      '7dc64c98dfda.ngrok-free.app', 
      '.ngrok-free.app'              
    ],
    proxy: {
     
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      }
    },
    
    hmr: {
      host: '7dc64c98dfda.ngrok-free.app', 
      protocol: 'wss',
      clientPort: 443
    }
  }
})
