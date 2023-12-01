import { lazy, Suspense, memo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const LazyImport = (fn) => {
  const LazyComponent = lazy(fn)
  return (
    <Suspense>
      <LazyComponent />
    </Suspense>
  )
}

const Layout = LazyImport(() => import('@/layouts/index'))

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
        element: LazyImport(() => import('@/views/test.view'))
      }
    ]
  }
]

export const routes = [...tabsRoutes]

export const router = createBrowserRouter(routes)

export default function Router() {
  return <RouterProvider router={router} />
}
