/**
 * 参考资料：
 *
 * https://juejin.cn/post/7340836136208859174?searchId=2024031217175341580085457EEFA1DEB3#heading-9
 *
 */

import styles from './DropdownPullup.module.css'
import type { ReactNode, Dispatch } from 'react'
import { isMobile } from '@/utlis'

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

interface PullupState {
  show: boolean
  text: string
  iconShow: boolean
  opacity: 0 | 1
}

interface DropdownState {
  className: (typeof styles)['dropdown-icon-rotate180']
  status: 1 | 2 | 3
  text: string
  opacity: 0 | 1
}

interface Props {
  headerPosition?: ReactNode
  children?: ReactNode
  // 下拉刷新回调
  onEnd: (fn: () => void) => void | Promise<void>
  // 触底加载回调
  onPullup: (fn: Dispatch<PullupState>) => void | Promise<void>
  InfiniteDropdown?: boolean // 无限下拉
  isMount?: boolean
}

export type PullRefreshProps = Props

const DropdownPullup = ({
  headerPosition = null,
  children,
  onEnd,
  onPullup,
  InfiniteDropdown = true,
  isMount = true
}: Props) => {
  const dropdownPullupViewRef = useRef<HTMLDivElement | null>(null)

  const [style, setStyle] = useState({
    '--zai-translateY': '0px',
    '--overflow': 'scroll'
  })

  const [dropdown, setDropdown] = useState<DropdownState>({
    text: '下拉刷新',
    status: 1,
    className: '',
    opacity: 0
  })

  const [pullup, setPullup] = useState<PullupState>({
    text: '加载中...',
    show: false,
    iconShow: true,
    opacity: 0
  })

  const pullupCallback = (value?: PullupState) => {
    setPullup({
      text: '加载中...',
      show: true,
      iconShow: true,
      opacity: 0,
      ...value
    })
    setStyle({ '--overflow': 'scroll', '--zai-translateY': '0px' })
  }

  function scroll(e: any) {
    const { scrollHeight, clientHeight, scrollTop } = e.target
    viewScrollTop = scrollTop
    if (clientHeight + scrollTop + 20 >= scrollHeight) {
      if (onPullup) {
        setStyle((value: any) => ({ ...value, '--overflow': 'hidden' }))
        setPullup(value => ({ ...value, opacity: 1 }))
        onPullup(pullupCallback)
      }
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
      if (dropdown.status !== 2) {
        setDropdown({
          className: styles['dropdown-icon-rotate180'],
          status: 2,
          text: '放手刷新',
          opacity: 1
        })
      }

      if (!InfiniteDropdown) {
        distanceY = DISTANCE_Y_MAX_LIMIT
      }
    }

    setDropdown(value => ({ ...value, opacity: 1 }))
    setStyle({ '--overflow': 'hidden', '--zai-translateY': distanceY + 'px' })
  }

  const endCallback = () => {
    loadLock = false
    distanceY = 0

    setStyle({ '--overflow': 'scroll', '--zai-translateY': '0px' })
    setDropdown({
      className: '',
      status: 1,
      text: '下拉刷新',
      opacity: 0
    })
    if (!pullup.show && typeof onPullup === 'function') {
      setPullup((value: any) => ({ ...value, show: true }))
    }
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
      distanceY = 0
      setDropdown(() => ({
        className: '',
        status: 1,
        text: '下拉刷新',
        opacity: 0
      }))
      setStyle(() => ({ '--overflow': 'scroll', '--zai-translateY': '0px' }))
    } else {
      loadLock = true
      setStyle((value: any) => {
        return { ...value, '--zai-translateY': DISTANCE_Y_MAX_LIMIT + 'px' }
      })
      setDropdown((value: any) => ({ ...value, status: 3 }))
      if (onEnd) {
        onEnd(endCallback)
      } else {
        setTimeout(() => {
          endCallback()
        }, 1000)
      }
    }
  }

  function addTouchEvent() {
    const dom = dropdownPullupViewRef.current
    if (dom) {
      dom.addEventListener('touchstart', start, { passive: false })
      dom.addEventListener('touchmove', move, { passive: false })
      dom.addEventListener('touchend', end, { passive: false })
    }
    return () => {
      if (dom) {
        dom.removeEventListener('touchstart', start)
        dom.removeEventListener('touchmove', move)
        dom.removeEventListener('touchend', end)
      }
    }
  }

  useEffect(() => {
    if (!isMount) {
      const dom = dropdownPullupViewRef.current
      if (typeof onPullup === 'function' && dom) {
        const { scrollHeight, clientHeight } = dom
        const show = scrollHeight <= clientHeight
        if (show) {
          setPullup((value: any) => ({ ...value, show }))
        }
      }
    }
  }, [children])

  useLayoutEffect(() => {
    if (isMount) {
      setStyle({ '--overflow': 'hidden', '--zai-translateY': DISTANCE_Y_MAX_LIMIT + 'px' })
      setDropdown((value: any) => ({ ...value, status: 3 }))
    }
    return addTouchEvent()
  }, [])

  useEffect(() => {
    if (isMount && onEnd) {
      onEnd(endCallback)
    }
  }, [])

  return (
    <>
      <div
        ref={dropdownPullupViewRef}
        id='dropdown-pullup'
        className={`${styles['dropdown-pullup']} ${!isMobile() && 'web-dropdown-pullup'}`}
        onScroll={scroll}
        style={style as React.CSSProperties}
      >
        {headerPosition}
        <div className={styles.loaderBox}>
          {dropdown.status !== 3 && (
            <div className={`${styles.textdisabled} flex-ai-c`} style={{ opacity: dropdown.opacity }}>
              <i className={`cuIcon-refresharrow ${styles['dropdown-icon']} ${dropdown.className}`} />
              <span>{dropdown.text}</span>
            </div>
          )}

          {dropdown.status === 3 && (
            <div className='flex-ai-c'>
              <i className={styles.loader}></i>
              <span className={styles.textdisabled + ' flex-ai-c ml-5'}>加载中...</span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          {children}
          {pullup.show && (
            <div className={styles.loaderBottomBox} style={{ opacity: pullup.opacity }}>
              {pullup.iconShow && <i className={styles.loader}></i>}
              <span className='ml-5'>{pullup.text}</span>
            </div>
          )}
          <div className={styles['footer-position']}></div>
        </div>
      </div>
    </>
  )
}

export default DropdownPullup
