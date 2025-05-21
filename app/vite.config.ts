import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from './src/api/core/env'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: env.getRequired("SERVER_PORT", "number")
  },
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     "@mui/material": "@mui/joy"
  //   }
  // }
})
