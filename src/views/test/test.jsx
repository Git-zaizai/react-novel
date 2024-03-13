import styles from './test.module.css'
import './css.css'

const list = Array.from({ length: 100 }).map(() => {
  return Math.floor(Math.random() * 16777216).toString(16)
})

const DISTANCE_Y_MAX_LIMIT = 150,
  DISTANCE_Y_MIN_LIMIT = 80
const DEG_LIMIT = 40

let startY = 0,
  startX = 0,
  endY = 0,
  endX = 0,
  distanceY = 0,
  distanceX = 0,
  loadLock = false,
  viewScrollTop = 0
export default () => {
  const viewRef = useRef()
  const [loaderName, setloaderName] = useState('')
  const [distance, setdistance] = useState(0)

  function start(e) {
    if (viewScrollTop > 0) {
      return
    }
    if (loadLock) {
      return
    }
    startY = e.touches[0].clientY
    startX = e.touches[0].clientX
  }

  function move(e) {
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
    if (deg > DEG_LIMIT) {
      ;[startY, startX] = [endY, endX]
      return
    }
    let percent = (100 - distanceY * 0.5) / 100
    percent = Math.max(0.5, percent)
    distanceY = distanceY * percent
    if (distanceY > DISTANCE_Y_MIN_LIMIT) {
      distanceY = DISTANCE_Y_MIN_LIMIT
    }
    console.log('🚀 ~ move ~ distanceY:', distanceY)
    setdistance(distanceY)
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
    if (distanceY < DISTANCE_Y_MIN_LIMIT) {
      setloaderName('')
      setdistance(0)
      return
    }
    loadLock = true
    setloaderName('loading-animation')
    setTimeout(() => {
      loadLock = false
      setloaderName('')
      distanceY = 0
      setdistance(0)
    }, 1000)
  }
  function addTouchEvent() {
    viewRef.current.addEventListener('touchstart', start, { passive: false })
    viewRef.current.addEventListener('touchmove', move, { passive: false })
    viewRef.current.addEventListener('touchend', end, { passive: false })
    console.log('viewRef.current', viewRef.current)
    return () => {
      console.log('viewRef.current', viewRef.current)
      viewRef.current.removeEventListener('touchstart', start)
      viewRef.current.removeEventListener('touchmove', move)
      viewRef.current.removeEventListener('touchend', end)
    }
  }
  
  useLayoutEffect(() => {
    viewRef.current.addEventListener('touchstart', start, { passive: false })
    viewRef.current.addEventListener('touchmove', move, { passive: false })
    viewRef.current.addEventListener('touchend', end, { passive: false })
    console.log('viewRef.current', viewRef.current)
    return () => {
      console.log(loaderName, distance)
      console.log('viewRef.current', viewRef)
      viewRef.current.removeEventListener('touchstart', start)
      viewRef.current.removeEventListener('touchmove', move)
      viewRef.current.removeEventListener('touchend', end)
    }
  }, [])

  function viewScroll(e) {
    viewScrollTop = e.target.scrollTop
  }

  const [state, setState] = useState(list)
  function addst() {
    let ss = [Math.floor(Math.random() * 16777216).toString(16), ...state]
    console.log(ss.length, viewRef)
    setState(ss)
  }
  return (
    <>
      <button style={{ position: 'fixed', top: '50vh', left: '50vw', zIndex: 10 }} onClick={addst}>
        啊撒大声地
      </button>
      <div ref={viewRef} className={styles.view} onScroll={viewScroll}>
        <div className={styles.loaderBox} style={{ transform: `translateY(${distance}px` }}>
          <div className={styles.loader + ' ' + loaderName}></div>
        </div>
        {state.map(v => {
          return <div key={v}>{v}</div>
        })}
      </div>
    </>
  )
}
