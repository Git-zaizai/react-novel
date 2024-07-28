import styles from './wol-json-view.module.css'

import { CloseOutlined } from '@ant-design/icons'
import ReactJson from 'react-json-view'
import { useToggle } from 'ahooks'
import dayjs from 'dayjs'

export default ({ WINAPI, http, open, data, onClose, title }) => {
  const [srcData, setSrcData] = useState(data ?? null)
  const [jsonFiles, setJsonfiles] = useState([])
  const [atitle, setAtitle] = useState(title ?? '')
  const [isReactJsonOpen, { toggle: toggleReactJson }] = useToggle(false)

  useEffect(() => {
    if (data) {
      setSrcData(data)
      setAtitle(title)
    }
    getjsons()
  }, [open])

  async function getjsons() {
    try {
      const res = await http.get('/json-list')
      setJsonfiles(
        res.map(mv => {
          if (mv.name.includes('all_')) {
            mv.namef = 'all_' + dayjs(mv.mtime).format('YYYY-MM-DD HH:mm:ss')
          }else{
            mv.namef = mv.name
          }
          return mv
        })
      )
    } catch {
      WINAPI.$message.error('获取json失败')
    }
  }

  async function getjson(ph, name) {
    try {
      const res = await http.get('/json-get', { ph: name })
      setSrcData(res)
      setAtitle(name)
      toggleReactJson()
    } catch (error) {
      WINAPI.$message.error('获取json失败')
    }
  }

  function CloseOut() {
    if (jsonFiles.length > 0) {
      const find = jsonFiles.findIndex(fv => fv.name === atitle)
      if (find > -1) {
        toggleReactJson()
        setAtitle('')
        return
      }
    }
    onClose && onClose()
  }

  if (open) {
    return null
  }

  return (
    <>
      <div className={styles.view}>
        <div className={styles.viewHeader}>
          <h2>{atitle}</h2>
          <CloseOutlined onClick={CloseOut} style={{ fontSize: '28px' }} />
        </div>
        <div className={styles.jsonfiles}>
          {jsonFiles.map((item, index) => (
            <div key={index} className={styles.jsonfilesitem} onClick={() => getjson(item.path, item.name)}>
              <h3>{item.namef}</h3>
            </div>
          ))}
        </div>
        {isReactJsonOpen && (
          <div className={styles.jsonview}>
            <ReactJson theme={'threezerotwofour'} src={srcData} />
          </div>
        )}
      </div>
    </>
  )
}
