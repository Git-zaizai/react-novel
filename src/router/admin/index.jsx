import { LazyImport, LayoutDefault, RouterView } from '../content'

export const adminRoute = [
  {
    index: true,
    handle: {
      icon: 'tag',
      footerText: '',
    },
    element: LazyImport(() => import('@/views/admin/tab/tab')),
  },
]

export default [
  {
    path: '/admin',
    element: LayoutDefault,
    children: [
      {
        element: <RouterView />,
        children: adminRoute,
      },
    ],
  },
]
