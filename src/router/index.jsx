import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from '../views/index/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
