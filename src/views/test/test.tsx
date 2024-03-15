import styles from './test.module.css'
import './css.css'
import type { ReactNode, Dispatch } from 'react'
import CuIcon from '@/components/cuIcon'
import { useDebounceFn, useThrottleFn } from 'ahooks'

// 最大上拉距离
const DISTANCE_Y_MAX_LIMIT = 70
// 最小上拉距离
const DISTANCE_Y_MIN_LIMIT = 40
// 拉下状态
enum PullStatus {
  dropdown = 1, // 下拉
  letgo = 2, // 放手
  loader = 3 // 加载中
}

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

interface Props {
  children?: ReactNode
  // 下拉刷新回调
  onEnd: <T>(fn: Dispatch<T>) => void | Promise<void>
  // 触底加载回调
  onScrollThrottle: (fn: Dispatch<boolean>) => void | Promise<void>
  InfiniteDropdown?: boolean  // 无限下拉
}

export type PullRefreshProps = Props

export default ({ children, onEnd, onScrollThrottle, InfiniteDropdown = true }: Props) => {
  const viewRef = useRef<HTMLDivElement | null>(null)
  const [loaderName, setloaderName] = useState('')
  const [distance, setdistance] = useState(0)
  const [pullStatus, setPullStatus] = useState(1)

  const [isloaderBottom, setisloaderBottom] = useState(true)
  const [dropdown, setDropdown] = useState('加载中...')

  const { run: scrollThrottle } = useThrottleFn(
    () => {
      onScrollThrottle && onScrollThrottle(setisloaderBottom)
    },
    { wait: 500 }
  )

  useEffect(() => {
    if (isloaderBottom) {
      setDropdown('加载中...')
    }else{
      setDropdown('没有更多了')
    }
  }, [isloaderBottom])

  function viewScroll(e: any) {
    const { scrollHeight, clientHeight, scrollTop } = e.target
    viewScrollTop = scrollTop
    if (clientHeight + scrollTop >= scrollHeight - 100) {
      scrollThrottle()
    }
  }

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
      setPullStatus(PullStatus.letgo)
      if (!InfiniteDropdown) {
        distanceY = DISTANCE_Y_MAX_LIMIT
      }
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
      setPullStatus(PullStatus.dropdown)
      return
    }
    setdistance(70)
    loadLock = true
    setPullStatus(PullStatus.loader)
    setloaderName('loading-animation')
    if (onEnd) {
      onEnd(endCallback)
    } else {
      setTimeout(() => {
        loadLock = false
        setloaderName('')
        distanceY = 0
        setdistance(0)
        setPullStatus(PullStatus.dropdown)
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

  return (
    <>
      <div
        ref={viewRef}
        className={styles.view}
        onScroll={viewScroll}
        style={{ '--zai-translateY': distance + 'px' } as React.CSSProperties}
      >
        <div className={styles.loaderBox}>
          {pullStatus === 1 && (
            <div className={styles.textdisabled + ' flex-ai-c'}>
              <CuIcon icon={'refresharrow'} size={25} />
              <span>下拉刷新</span>
            </div>
          )}

          {pullStatus === 2 && (
            <div className={styles.textdisabled + ' flex-ai-c'}>
              <CuIcon icon={'refresharrow'} size={25} className={styles.refresharrow180} />
              <span>放手刷新</span>
            </div>
          )}

          {pullStatus === 3 && (
            <div className='flex-ai-c'>
              <i className={styles.loader + ' ' + loaderName}></i>
              <span className={styles.textdisabled + ' flex-ai-c ml-5'}>加载中...</span>
            </div>
          )}
        </div>
        <div className={styles.content}>{children}</div>
        {children && (
          <div className={styles.loaderBottomBox}>
            {isloaderBottom && <i className={styles.loaderBottom}></i>}
            <span className={styles.textdisabled}>{dropdown}</span>
          </div>
        )}
      </div>
    </>
  )
}
