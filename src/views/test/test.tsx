import styles from './test.module.css'
import './css.css'
import type { ReactNode, Dispatch } from 'react'

// 最大上拉距离
const DISTANCE_Y_MAX_LIMIT = 70
// 最小上拉距离
const DISTANCE_Y_MIN_LIMIT = 40

let startY = 0,
  startX = 0,
  endY = 0,
  endX = 0,
  distanceY = 0,
  distanceX = 0,
  loadLock = false,
  viewScrollTop = 0,
  viewScrollHeight = 0

function start(e: TouchEvent) {
  if (viewScrollTop > 0) {
    return
  }
  if (loadLock) {
    return
  }
  startY = e.touches[0].clientY
  startX = e.touches[0].clientX
}

// 节流
function throttle(fn: (...argn: any[]) => void, delay: number = 200, isImmediate = true): (...argn: any[]) => void {
  // isImmediate 为 true 时使用前缘节流，首次触发会立即执行，为 false 时使用延迟节流，首次触发不会立即执行
  let last = Date.now()
  return function (this: any) {
    let now = Date.now()
    if (isImmediate) {
      fn.apply(this, arguments as any)
      isImmediate = false
      last = now
    }
    if (now - last >= delay) {
      fn.apply(this, arguments as any)
      last = now
    }
  }
}

interface Props {
  children?: ReactNode
  onEnd: <T>(fn: Dispatch<T>) => void | Promise<void>
  onScrollThrottle: <T>(fn: Dispatch<T>) => void | Promise<void>
}

export default (props: Props) => {
  const viewRef = useRef<HTMLDivElement | null>(null)
  const [loaderName, setloaderName] = useState('')
  const [distance, setdistance] = useState(0)
  const [isloaderBottom, setisloaderBottom] = useState(true)

  function move(e: TouchEvent) {
    if (viewScrollTop > 0) {
      return
    }
    endY = e.touches[0].clientY
    endX = e.touches[0].clientX
    if (loadLock) {
      return
    }
    if (endY - startY < 0) {
      return
    }

    distanceY = endY - startY
    distanceX = endX - startX
    const deg = Math.atan(Math.abs(distanceX) / distanceY) * (180 / Math.PI)
    if (deg > DISTANCE_Y_MIN_LIMIT) {
      ;[startY, startX] = [endY, endX]
      return
    }
    let percent = (100 - distanceY * 0.5) / 100
    percent = Math.max(0.5, percent)
    distanceY = distanceY * percent
    if (distanceY > DISTANCE_Y_MAX_LIMIT) {
      distanceY = DISTANCE_Y_MAX_LIMIT
    }
    setdistance(distanceY)
  }

  const endCallback = () => {
    loadLock = false
    setloaderName('')
    distanceY = 0
    setdistance(0)
  }
  function end() {
    if (viewScrollTop > 0) {
      return
    }
    if (loadLock) {
      return
    }
    if (endY - startY < 0) {
      return
    }
    if (distanceY < DISTANCE_Y_MAX_LIMIT) {
      setloaderName('')
      setdistance(0)
      return
    }
    loadLock = true
    setloaderName('loading-animation')
    if (props.onEnd) {
      props.onEnd(endCallback)
    } else {
      setTimeout(() => {
        loadLock = false
        setloaderName('')
        distanceY = 0
        setdistance(0)
      }, 1000)
    }
  }

  function addTouchEvent() {
    if (viewRef.current) {
      viewRef.current.addEventListener('touchstart', start, { passive: false })
      viewRef.current.addEventListener('touchmove', move, { passive: false })
      viewRef.current.addEventListener('touchend', end, { passive: false })
      viewScrollHeight = viewRef.current.scrollHeight
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.removeEventListener('touchstart', start)
        viewRef.current.removeEventListener('touchmove', move)
        viewRef.current.removeEventListener('touchend', end)
      }
    }
  }

  useLayoutEffect(() => {
    return addTouchEvent()
  }, [])

  const scrollThrottle = throttle(function () {
    props.onScrollThrottle && props.onScrollThrottle(setisloaderBottom)
  })

  function viewScroll(e: any) {
    const { scrollHeight, clientHeight, scrollTop } = e.target
    viewScrollTop = scrollTop
    if (clientHeight + scrollTop >= scrollHeight - 100) {
      scrollThrottle()
    }
  }

  return (
    <>
      <div
        ref={viewRef}
        className={styles.view}
        onScroll={viewScroll}
        style={{ '--zai-translateY': distance + 'px' } as React.CSSProperties}
      >
        <div className={styles.loaderBox}>
          <div className={styles.loader + ' ' + loaderName}></div>
        </div>
        <div className={styles.content}>{props.children}</div>
        {props.children && isloaderBottom && (
          <div className={styles.loaderBottomBox}>
            <i className={styles.loaderBottom}></i>
            <span>加载中...</span>
          </div>
        )}
      </div>
    </>
  )
}
