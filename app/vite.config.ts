import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = process.env.SERVER_PORT; 
if (!port) {
  throw new Error("SERVER_PORT is undefined")
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: parseInt(port)
  },
  plugins: [react()],
})
