import { LazyImport, Layout } from '../content'

export default [
  {
    path: '/admin/tab',
    element: Layout,
    meta: {
      footerText: '标签'
    },
    children: [
      {
        index: true,
        element: LazyImport(() => import('@/views/admin/tab'))
      }
    ]
  }
]
