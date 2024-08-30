import { lazy, Suspense } from 'react'

export const LazyImport = fn => {
  const LazyComponent = lazy(fn)
  return (
    <Suspense>
      <LazyComponent />
    </Suspense>
  )
}

export { default as RouterView } from '@/components/RouterView'

export const LayoutDefault = LazyImport(() => import('@/layouts/LayoutDefault'))
