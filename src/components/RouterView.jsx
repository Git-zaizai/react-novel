import Nprogress from '@/components/Nprogress'
import Transition from './Transition'
import { useMatch, useMatches } from 'react-router-dom'

const RouterView = () => {
  logComponents('RouterView')

  const [isAnimating, { toggle: setIsAnimating }] = useToggle(false)
  const currentOutlet = useOutlet()
  const location = useLocation()
  const matches = useMatches()

  useEffect(() => {
    const route = matches.at(-1)
    let is = route.handle?.Transition ?? true
    if (is) {
      /*   setIsAnimating()
      setTimeout(() => {
        setIsAnimating()
      }, 300) */
    }
  }, [location.key])

  return (
    <>
      <Nprogress
        isAnimating={isAnimating}
        key={location.key}
      />
      <Transition
        show={location.key}
        onEnter={setIsAnimating}
        onEntered={setIsAnimating}
      >
        {currentOutlet}
        {/* 不能使用，因为会导致组件不会更新，动画失效 */}
        {/* <Outlet /> */}
      </Transition>
    </>
  )
}

export default RouterView
