import styles from './test.module.css'
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

interface PullupState {
  show: boolean
  text: string
  iconShow: boolean
}

interface DropdownState {
  className: (typeof styles)['dropdown-icon-rotate180']
  status: 1 | 2 | 3
  text: string
}

interface Props {
  children?: ReactNode
  // 下拉刷新回调
  onEnd: <T>(fn: Dispatch<T>) => void | Promise<void>
  // 触底加载回调
  onPullup: (fn: Dispatch<PullupState>) => void | Promise<void>
  InfiniteDropdown?: boolean // 无限下拉
}

export type PullRefreshProps = Props

/**
 * 参考资料：
 *
 * https://juejin.cn/post/7340836136208859174?searchId=2024031217175341580085457EEFA1DEB3#heading-9
 *
 */
export default ({ children, onEnd, onPullup, InfiniteDropdown = true }: Props) => {
  const dropdownPullupViewRef = useRef<HTMLDivElement | null>(null)

  const [style, setStyle] = useState({
    '--zai-translateY': '0px',
    '--overflow': 'scroll'
  })

  const [dropdown, setDropdown] = useState<DropdownState>({
    text: '下拉刷新',
    status: 1,
    className: ''
  })

  const [pullup, setPullup] = useState<PullupState>({
    text: '加载中...',
    show: true,
    iconShow: true
  })

  const pullupCallback = (value?: PullupState) => {
    setStyle({ '--overflow': 'scroll', '--zai-translateY': '0px' })
    setPullup(
      value ?? {
        text: '加载中...',
        show: true,
        iconShow: true
      }
    )
  }
  function scroll(e: any) {
    const { scrollHeight, clientHeight, scrollTop } = e.target
    viewScrollTop = scrollTop
    if (clientHeight + scrollTop >= scrollHeight) {
      setStyle((value: any) => ({ ...value, '--overflow': 'hidden' }))
      if (onPullup) {
        onPullup(pullupCallback)
      } else {
        setTimeout(() => {
          pullupCallback()
        }, 1500)
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
          text: '放手刷新'
        })
      }

      if (!InfiniteDropdown) {
        distanceY = DISTANCE_Y_MAX_LIMIT
      }
    }

    setStyle({ '--overflow': 'hidden', '--zai-translateY': distanceY + 'px' })
  }

  const endCallback = () => {
    loadLock = false
    distanceY = 0

    setStyle({ '--overflow': 'scroll', '--zai-translateY': '0px' })
    setDropdown({
      className: '',
      status: 1,
      text: '下拉刷新'
    })
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
      setDropdown({
        className: '',
        status: 1,
        text: '下拉刷新'
      })
      return
    }
    loadLock = true
    setStyle((value: any) => {
      return { ...value, '--zai-translateY': '70px' }
    })
    setDropdown((value: any) => ({ ...value, status: 3 }))
    if (onEnd) {
      onEnd(endCallback)
    } else {
      setTimeout(() => {
        loadLock = false
        distanceY = 0

        setStyle({ '--overflow': 'scroll', '--zai-translateY': '0px' })
        setDropdown({
          className: '',
          status: 1,
          text: '下拉刷新'
        })
      }, 1000)
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
    const dom = dropdownPullupViewRef.current
    if (dom) {
      const { scrollHeight, clientHeight } = dom
      const show = scrollHeight <= clientHeight
      setPullup((value: any) => ({ ...value, show: !show }))
    }
  }, [children])

  useLayoutEffect(() => {
    return addTouchEvent()
  }, [])

  return (
    <>
      <div
        ref={dropdownPullupViewRef}
        className={styles['dropdown-pullup']}
        onScroll={scroll}
        style={style as React.CSSProperties}
      >
        <div className={styles.loaderBox}>
          {dropdown.status !== 3 && (
            <div className={styles.textdisabled + ' flex-ai-c'}>
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
        <div className={styles.content + ' flex-ai-c flex-wrap content-class'}>
          {children}
          {pullup.show && (
            <div className={styles.loaderBottomBox}>
              {pullup.iconShow && <i className={styles.loader}></i>}
              <span>{pullup.text}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
