import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Consolidated backend (stratroom-backend) — single app on 8085, context-path /api.
      // Migration is incremental: the login flow uses this; other modules still use the
      // per-service proxies below until they are migrated module by module.
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false
      },
      '/authservice': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false
      },
      '/db-service': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        secure: false
      },
      '/userservice': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        secure: false
      },
      '/scorecard-service': {
        target: 'http://localhost:8084',
        changeOrigin: true,
        secure: false
      },
      '/etl-service': {
        target: 'http://localhost:8086',
        changeOrigin: true,
        secure: false
      },
      '/stratroom': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
