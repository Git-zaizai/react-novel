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
  }
]

import adminRoute from './admin/index'

export const routes = [...tabsRoutes, ...adminRoute]

export const router = createHashRouter(routes, {
  basename: import.meta.env.VITE_GLOB_ROUTER_PREFIX ?? '/'
})

export default function Router() {
  return <RouterProvider router={router} />
}
