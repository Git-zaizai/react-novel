import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layouts from '@/layouts/index'
import Cuicons from '@/views/cuicons'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
  },
  {
    path: '/icon',
    element: <Layouts />,
    children: [
      {
        path: 'Cuicons',
        element: <Cuicons />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
