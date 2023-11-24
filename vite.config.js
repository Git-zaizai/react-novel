import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import AntdResolver from 'unplugin-auto-import-antd'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      resolvers: [AntdResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 1300
  }
})
