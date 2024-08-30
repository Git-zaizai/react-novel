import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom'
import routes from './routes'

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
