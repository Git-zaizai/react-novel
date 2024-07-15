import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import AntdResolver from 'unplugin-auto-import-antd'

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())

  return {
    plugins: [
      react(),
      AutoImport({
        imports: ['react', 'react-router-dom', 'ahooks'],
        dts: true,
        resolvers: [AntdResolver()]
      })
    ],
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 1300,
      proxy: {
        '/gadgets-server': {
          target: 'http://127.0.0.1:4399',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/gadgets-server/, '')
        }
      }
    },
    build: {
      outDir: viteEnv.VITE_BUILD_OUTDIR ? viteEnv.VITE_BUILD_OUTDIR : 'dist'
    }
  }
})
