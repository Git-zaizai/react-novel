import styles from './wol.module.css'

import { CloseOutlined } from '@ant-design/icons'
import ReactJson from 'react-json-view'

import { WOLHTTP } from './api'
import dayjs from 'dayjs'

export default ({ open, opentoupdate, onClose }) => {
  const [jsonFiles, setJsonfiles] = useState([])

  const [srcData, setSrcData] = useState(null)
  const [headertitle, setheadertitle] = useState('')
  const [isReactJsonOpen, { toggle: toggleReactJson }] = useToggle(false)

  const fileInputRef = useRef(null)
  const isDeleteButdisabled = !jsonFiles.some(sv => sv.checked)

  useAsyncEffect(async () => {
    if (!open) return
    let jsonlist = await getjsons()
    if (opentoupdate) {
      const jsonfileitem = jsonlist.find(fv => fv.name === opentoupdate)
      if (jsonfileitem) {
        await getjson(jsonfileitem)
      }
    }
  }, [open])

  function CloseOut() {
    if (headertitle !== '') {
      setheadertitle('')
      toggleReactJson()
      return
    }
    onClose && onClose()
  }

  async function getjsons() {
    try {
      const res = await WOLHTTP.get('/json-list')
      let list = res.reverse().map(mv => {
        if (mv.name.includes('all_')) {
          mv.namef = 'all_' + dayjs(mv.mtime).format('YYYY-MM-DD HH:mm:ss')
        } else {
          mv.namef = mv.name
        }
        mv.checked = false
        return mv
      })
      setJsonfiles(list)
      return list
    } catch {
      window.$message.error('获取json失败')
    }
  }

  async function getjson({ name, namef }) {
    try {
      const res = await WOLHTTP.get('/json-get', { ph: name })
      setSrcData(res)
      setheadertitle(namef)
      toggleReactJson()
    } catch (error) {
      window.$message.error('获取json失败')
    }
  }

  function changeFile(e) {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    let reader = new FileReader()
    reader.onload = async function (e) {
      try {
        let data = JSON.parse(e.target.result)
        console.log(jsonFiles.some(sv => sv.name === file.name))

        let ph = jsonFiles.some(sv => sv.name === file.name) ? file.name + Date.now() : file.name
        await WOLHTTP.post('/json-set', {
          ph,
          data,
        })
        await getjsons()
        window.$message.success('上传成功')
      } catch (error) {
        console.log(error)

        window.$message.error('上传失败')
      }
    }
    reader.readAsText(file)
  }

  function CheckboxChange(e) {
    jsonFiles[e.target.value].checked = !jsonFiles[e.target.value].checked
    setJsonfiles([].concat(jsonFiles))
  }

  function chongzhi() {
    jsonFiles.forEach(item => {
      item.checked = false
    })
    setJsonfiles([].concat(jsonFiles))
  }

  async function deleteJsonFlile() {
    const names = jsonFiles.filter(sv => sv.checked).map(mv => mv.name)
    try {
      await WOLHTTP.post('/rm-json', { names })
      await getjsons()
      window.$message.success('删除成功')
    } catch (error) {
      console.log(error)
      window.$message.error('删除失败')
    }
  }

  if (!open) {
    return
  }

  return (
    <div className={styles.checkjson}>
      <div className={styles.viewHeader}>
        {headertitle !== '' ? (
          <h2>{headertitle}</h2>
        ) : (
          <div>
            <Button
              type="primary"
              onClick={() => fileInputRef.current.click()}
            >
              上传
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={changeFile}
            />
            <Button
              className="ml-10"
              type="primary"
              danger
              disabled={isDeleteButdisabled}
              onClick={deleteJsonFlile}
            >
              删除
            </Button>
            <Button
              className="ml-10"
              type="primary"
              disabled={isDeleteButdisabled}
              onClick={chongzhi}
            >
              重置
            </Button>
          </div>
        )}
        <CloseOutlined
          onClick={CloseOut}
          style={{ fontSize: '28px' }}
        />
      </div>
      <div className={styles.jsonfiles}>
        {jsonFiles.map((item, index) => (
          <div
            key={index}
            className={styles.jsonfilesitem + ' flex'}
          >
            <Checkbox
              className="ml-10 mr-20"
              checked={item.checked}
              value={index}
              onChange={CheckboxChange}
            />
            <h3
              style={{ flex: '1' }}
              onClick={() => getjson(item)}
            >
              {item.namef}
            </h3>
          </div>
        ))}
      </div>
      {isReactJsonOpen && (
        <div className={styles.jsonview}>
          <ReactJson
            theme={'threezerotwofour'}
            src={srcData}
          />
        </div>
      )}
    </div>
  )
}
