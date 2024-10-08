import styles from './DropdownPullup-v2.module.css'

import type { ReactNode, CSSProperties, Dispatch } from 'react'

// 最大下拉距离
const DISTANCE_Y_MAX_LIMIT = 100
// 最小下拉距离
const DISTANCE_Y_MIN_LIMIT = 70
// icon 在哪个下拉距离开始缩放
const DISTANCE_Y_SCALE_LIMIT = 20
// icon 最小缩放
const SCALE_MIN = 0.5

// 手指开始的位置
let startY = 0,
  startX = 0,
  // 手指移动距离
  endY = 0,
  endX = 0,
  // 保存计算完成后的距离
  distanceY = 0,
  distanceX = 0,
  // 是否可以下拉
  loadLock = false,
  // 记录content滚动距离
  viewScrollTop = 0,
  scale = SCALE_MIN

function start(e: TouchEvent) {
  if (viewScrollTop > 0 || loadLock) {
    return
  }
  startY = e.touches[0].clientY
  startX = e.touches[0].clientX
}

export interface DropdownState {
  status: 0 | 1 | 2 | 3 // 0 下拉中  1 到达最小距离 可以刷新  2 刷新中  3 !== 0 开启蒙层
  text: string
  pullupShow: boolean
  pullupIconShow: boolean
}

export interface Props {
  children: ReactNode
  // 无限下拉
  InfiniteDropdown?: boolean
  // 下拉刷新回调
  onDropdown: (fn: Dispatch<DropdownState>) => void | Promise<void>
  // 触底加载回调
  onPullup?: (fn: Dispatch<DropdownState>) => void | Promise<void>
  // 初始化时是否显示下拉刷新
  isMountDropdown?: boolean
}

export const DropdownPullupv2: FC<Props> = props => {
  const { onPullup, onDropdown, children, InfiniteDropdown = false, isMountDropdown = false } = props

  const dropdownPullupViewRef = useRef<HTMLDivElement | null>(null)

  const [style, setStyle] = useState({
    '--zai-translateY': '0px',
    '--zai-loader-scale': SCALE_MIN,
  })

  const [dropdown, setDropdown] = useState<DropdownState>({
    status: 0,
    text: '加载中...',
    pullupShow: false,
    pullupIconShow: true,
  })

  const pullupRecover = (value?: DropdownState) => {
    setStyle({
      '--zai-translateY': '0px',
      '--zai-loader-scale': SCALE_MIN,
    })
    setDropdown({ status: 0, text: '加载中...', pullupShow: false, pullupIconShow: true, ...value })
  }

  function contentScroll(e: any) {
    console.log(viewScrollTop)

    const { scrollHeight, clientHeight, scrollTop } = e.target
    viewScrollTop = scrollTop
    if (clientHeight + scrollTop >= scrollHeight) {
      if (onPullup) {
        setDropdown(v => ({ ...v, status: 3 }))
        onPullup(pullupRecover)
      }
    }
  }

  function move(e: TouchEvent) {
    if (viewScrollTop > 0) return
    endY = e.touches[0].clientY
    endX = e.touches[0].clientX
    if (loadLock) return
    //判断手指是否在Y轴上移动
    if (endY - startY < 0) return

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

    if (distanceY >= DISTANCE_Y_MAX_LIMIT) {
      if (dropdown.status !== 1) {
        setDropdown(v => ({ ...v, status: 1 }))
      }

      if (!InfiniteDropdown) {
        distanceY = DISTANCE_Y_MAX_LIMIT
      }
    }

    if (distanceY > DISTANCE_Y_SCALE_LIMIT) {
      scale = (distanceY - DISTANCE_Y_SCALE_LIMIT) / (DISTANCE_Y_MIN_LIMIT - DISTANCE_Y_SCALE_LIMIT)
      scale = Math.min(scale, 1) // 确保缩放比例不超过1
      scale = scale < SCALE_MIN ? SCALE_MIN : scale
    }

    setStyle({
      '--zai-translateY': distanceY + 'px',
      '--zai-loader-scale': scale,
    })
  }

  function endRecover() {
    // 保存计算完成后的距离
    distanceY = 0
    distanceX = 0
    // 是否可以下拉
    loadLock = false
    scale = SCALE_MIN
    setDropdown(v => ({ ...v, status: 0, pullupShow: true }))
    setStyle({ '--zai-translateY': '0px', '--zai-loader-scale': scale })
  }

  function end() {
    if (viewScrollTop > 0 || loadLock || endY - startY < 0) return
    if (distanceY < DISTANCE_Y_MIN_LIMIT) {
      endRecover()
    } else {
      loadLock = true
      setDropdown(v => ({ ...v, status: 2 }))
      setStyle(v => ({ ...v, '--zai-translateY': DISTANCE_Y_MIN_LIMIT + 'px', '--zai-loader-scale': scale }))

      if (onDropdown) {
        onDropdown(endRecover)
      }
    }
  }

  function addEventListener() {
    const dom = dropdownPullupViewRef.current
    if (dom) {
      // 不能使用 addEventListener 绑定scroll事件，会导致你传入的回调函数会被记忆，
      // 然后导致回调函中访问不到 useState 更新后的值
      //   dom.addEventListener('scroll', contentScroll, { passive: false })
      dom.addEventListener('touchstart', start, { passive: false })
      dom.addEventListener('touchmove', move, { passive: false })
      dom.addEventListener('touchend', end, { passive: false })
    }
    return () => {
      if (dom) {
        // dom.removeEventListener('scroll', contentScroll)
        dom.removeEventListener('touchstart', start)
        dom.removeEventListener('touchmove', move)
        dom.removeEventListener('touchend', end)
      }
    }
  }

  useLayoutEffect(() => {
    return addEventListener()
  }, [])

  useEffect(() => {
    if (isMountDropdown) {
      loadLock = false
      endY = 10
      startY = 1
      distanceY = DISTANCE_Y_MIN_LIMIT
      scale = 1
      setStyle({
        '--zai-translateY': distanceY + 'px',
        '--zai-loader-scale': scale,
      })
      setDropdown(v => ({ ...v, status: 2 }))
      onDropdown(endRecover)
    }
  }, [])

  return (
    <>
      <div
        className={`${styles.DropdownPullupView} ${dropdown.status !== 0 && styles.spincontainer}`}
        style={style as CSSProperties}
      >
        <div className={styles.Dropdown}>
          <div className={styles.DropdownIconView}>
            <i
              className={`${styles.loader}  ${dropdown.status === 2 && styles.loaderAnimation}`}
              style={{
                transform: `scale(var(--zai-loader-scale))`,
              }}
            />
          </div>
        </div>
        <div
          ref={dropdownPullupViewRef}
          id="dropdown-pullup"
          className={`${styles.content}`}
          onScroll={contentScroll}
        >
          {children}
          {dropdown.pullupShow && (
            <div className={styles.Hitbottom}>
              <div className={styles.DropdownIconView}>
                <i
                  className={`${styles.loader} ${styles.loaderAnimation}`}
                  style={{
                    display: dropdown.pullupIconShow ? 'block' : 'none',
                  }}
                />
                {dropdown.text}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
