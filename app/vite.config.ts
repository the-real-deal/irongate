import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import env from './src/common/env'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   host: "0.0.0.0",
  //   port: env.getRequired("APP_PORT", "number"),
  //   strictPort: true,
  // },
  plugins: [
    react(),
  ],
})
