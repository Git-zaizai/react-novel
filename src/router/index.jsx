import { memo } from 'react'
import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom'
import { LazyImport, Layout } from './content'

export const tabsRoutes = [
  {
    path: '/',
    element: Layout,
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/index'))
      }
      /*  {
        index: true,
        element: LazyImport(() => import('@/views/test/index'))
      } */
    ]
  },
  {
    path: '/search',
    element: Layout,
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/search'))
      }
    ]
  },
  {
    path: '/circle',
    element: Layout,
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/circle'))
      }
    ]
  },
  {
    path: '/icon',
    element: Layout,
    children: [
      {
        path: 'Cuicons',
        element: LazyImport(() => import('@/views/cuicons'))
      }
    ]
  },
  {
    path: '/wol',
    handle: {
      title: 'wol'
    },
    element: LazyImport(() => import('@/views/wol/wol'))
  }
]

import adminRoute from './admin/index'

export const routes = [...tabsRoutes, ...adminRoute]

const { VITE_GLOB_ROUTER_FN } = import.meta.env
let router = null
if (VITE_GLOB_ROUTER_FN && VITE_GLOB_ROUTER_FN === 'BrowserRouter') {
  router = createBrowserRouter(routes, {
    basename: import.meta.env.BASE_URL ?? '/'
  })
} else {
  router = createHashRouter(routes, {
    basename: import.meta.env.BASE_URL ?? '/'
  })
}

export default function Router() {
  return <RouterProvider router={router} />
}
