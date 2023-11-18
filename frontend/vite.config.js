import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //to change server (optional)
    port: 3000,
    //becuase our API is on different domain (localhost:5000, while FE in 3000)
    //So when we make request to the backend, dont want to add 'http:localhost..'
    //So use proxy
    proxy: {
      '/api':{
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
