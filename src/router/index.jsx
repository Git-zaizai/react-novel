import { memo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
    path: '/test-view',
    element: Layout,
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/test/test.view'))
      }
    ]
  }
]

import adminRoute from './admin/index'

export const routes = [...tabsRoutes, ...adminRoute]

export const router = createBrowserRouter(routes)

export default function Router() {
  return <RouterProvider router={router} />
}
