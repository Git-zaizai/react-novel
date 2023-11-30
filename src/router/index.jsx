import { createRef, lazy, Suspense, memo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layouts from '@/layouts'
import Index from '@/views/index'

const LazyImport = (fn) => {
  const LazyComponent = lazy(fn)
  return (
    <Suspense>
      <LazyComponent />
    </Suspense>
  )
}

const Layout = memo(Layouts)

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />
      }
    ]
  },
  {
    path: '/icon',
    element: <Layout />,
    children: [
      {
        path: 'Cuicons',
        element: LazyImport(() => import('@/views/cuicons'))
      }
    ]
  },
  {
    path: '/test-view',
    element: <Layout />,
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/test.view'))
      }
    ]
  }
]

export const router = createBrowserRouter(routes)

export default function Router() {
  return <RouterProvider router={router} />
}
