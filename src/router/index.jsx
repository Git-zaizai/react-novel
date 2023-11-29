import { createRef, lazy, Suspense } from 'react'
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

export const routes = [
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Index />,
        nodeRef: createRef()
      }
    ]
  },
  {
    path: '/icon',
    element: <Layouts />,
    children: [
      {
        path: 'Cuicons',
        element: LazyImport(() => import('@/views/cuicons')),
        nodeRef: createRef()
      }
    ]
  },
  {
    path: '/test-view',
    element: <Layouts />,
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
