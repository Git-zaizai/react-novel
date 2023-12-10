import { LazyImport, Layout } from '../content'

export default [
  {
    path: '/admin/tab',
    element: Layout,
    meta: {
      footerText: '标签',
      icon:'tag'
    },
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/admin/tab/tab'))
      }
    ]
  }
]
