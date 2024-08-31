import { redirect } from 'react-router-dom'
import { LazyImport, LayoutDefault, RouterView } from './content'
import adminRoutes from './admin/index'

export const commonRoutes = [
  {
    path: '*',
    loader: () => redirect('/404'),
  },
  {
    path: '/404',
    element: <RouterView />,
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/common/404')),
      },
    ],
  },
  {
    path: '/icon',
    element: LayoutDefault,
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/cuicons')),
      },
    ],
  },
  {
    path: '/test',
    element: LayoutDefault,
    children: [
      {
        element: <RouterView />,
        children: [
          {
            index: true,
            element: LazyImport(() => import('@/views/test')),
          },
        ],
      },
    ],
  },
]

export const mainRoutes = [
  {
    path: '/',
    element: LayoutDefault,
    children: [
      {
        element: <RouterView />,
        children: [
          {
            index: true,
            element: LazyImport(() => import('@/views/index')),
          },
          {
            path: 'search',
            element: LazyImport(() => import('@/views/search')),
          },
          {
            path: 'circle',
            element: LazyImport(() => import('@/views/circle')),
          },
        ],
      },
    ],
  },
  {
    path: '/wol',
    element: <RouterView />,
    children: [
      {
        index: true,
        handle: {
          title: 'wol远程唤醒',
        },
        element: LazyImport(() => import('@/views/wol')),
      },
    ],
  },
]

export default [...commonRoutes, ...mainRoutes, ...adminRoutes]
