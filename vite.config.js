import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/doc-app/' : '/',
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});

