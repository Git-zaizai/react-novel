import { lazy, Suspense } from 'react'
export const LazyImport = (fn) => {
  const LazyComponent = lazy(fn)
  return (
    <Suspense>
      <LazyComponent />
    </Suspense>
  )
}

export const Layout = LazyImport(() => import('@/layouts/index'))
