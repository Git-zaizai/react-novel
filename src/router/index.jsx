import { createRef } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layouts from '@/layouts'
import Cuicons from '@/views/cuicons'

import Index from '@/views/index'

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
        element: <Cuicons />,
        nodeRef: createRef()
      }
    ]
  }
]

export const router = createBrowserRouter(routes)

export default function Router() {
  return <RouterProvider router={router} />
}
