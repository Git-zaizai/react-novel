import styles from './test.module.css'

const DISTANCE_Y_MAX_LIMIT = 150,
  DISTANCE_Y_MIN_LIMIT = 80
const DEG_LIMIT = 40

let startY = 0,
  startX = 0,
  endY = 0,
  endX = 0,
  distanceY = 0,
  distanceX = 0,
  loadLock = false
export default () => {
  const viewRef = useRef()
  const [loaderName, setloaderName] = useState('')
  const [distance, setdistance] = useState(0)

  function start(e) {
    if (loadLock) {
      return
    }
    startY = e.touches[0].clientY
    startX = e.touches[0].clientX
  }

  function move(e) {
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
    console.log("🚀 ~ move ~ percent:", percent)
    distanceY = distanceY * percent
    if (distanceY > DISTANCE_Y_MIN_LIMIT) {
      distanceY = DISTANCE_Y_MIN_LIMIT
    }
    setdistance(distanceY)
  }

  function end() {}
  function addTouchEvent() {
    viewRef.current.addEventListener('touchstart', start, { passive: false })
    viewRef.current.addEventListener('touchmove', move, { passive: false })
    viewRef.current.addEventListener('touchend', end, { passive: false })
  }
  useEffect(() => {
    addTouchEvent()
  })

  return (
    <>
      <div ref={viewRef} className={styles.view}>
        <div className={styles.loaderBox + ' ' + loaderName} style={{ transform: `translateY(${distance}px` }}>
          <div id={styles.loader}></div>
        </div>
      </div>
    </>
  )
}
