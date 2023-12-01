/// <reference types="vite/client" />

declare interface Window {
  $message: typeof import('antd')['message']
  $notification: typeof import('antd')['notification']
  $modal: typeof import('antd')['Modal']
}

interface ImportMetaEnv {
  readonly VITE_GLOB_API_URL: string //API 接口地址
  readonly VITE_GLOB_API_URL_PREFIX: string // 接口前缀
  readonly VITE_GLOB_IMG_URL: string // 图片前缀地址
  readonly VITE_GLOB_ROUTER_PREFIX: string // 路由前缀
  readonly VITE_BASE_URL: string //项目 base
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
