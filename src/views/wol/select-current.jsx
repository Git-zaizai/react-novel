import styles from './wol.module.css'

import { CloseOutlined } from '@ant-design/icons'
import ReactJson from 'react-json-view'
import { WOLHTTP } from './api'
import dayjs from 'dayjs'

export default ({ open, onClose }) => {
  const [srcData, setSrcData] = useState(null)
  const [isReactJsonOpen, { toggle: toggleReactJson }] = useToggle(false)

  useEffect(() => {
    getCurrentData()
  }, [open])

  async function getCurrentData() {
    const res = await WOLHTTP.get('/createLog', {
      isfile: true,
    }).catch(err => {
      window.$message.error('网络错误')
      return Promise.reject(err)
    })
    setSrcData(res.data)
    isReactJsonOpen === false && toggleReactJson()
  }

  const CloseOut = () => {
    toggleReactJson()
    onClose && onClose()
  }

  if (!open) {
    return
  }
  return (
    <div className={styles.checkjson}>
      <div className={styles.viewHeader}>
        <CloseOutlined
          onClick={CloseOut}
          style={{ fontSize: '28px' }}
        />
      </div>
      <div className={styles.jsonview}>
        {isReactJsonOpen && (
          <ReactJson
            theme={'threezerotwofour'}
            src={srcData}
          />
        )}
      </div>
    </div>
  )
}
