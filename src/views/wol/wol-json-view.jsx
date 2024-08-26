import styles from './wol-json-view.module.css'

import { CloseOutlined } from '@ant-design/icons'
import ReactJson from 'react-json-view'
import { useToggle } from 'ahooks'
import dayjs from 'dayjs'
import { Button, Checkbox } from 'antd'

export default ({ WINAPI, http, open, data, onClose, title }) => {
  const [srcData, setSrcData] = useState(data ?? null)
  const [jsonFiles, setJsonfiles] = useState([])
  const [atitle, setAtitle] = useState(title ?? '')
  const [isReactJsonOpen, { toggle: toggleReactJson }] = useToggle(false)
  const fileInputRef = useRef(null)
  const [isDelete, { set: setDelete }] = useToggle(true)

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
        res.reverse().map(mv => {
          if (mv.name.includes('all_')) {
            mv.namef = 'all_' + dayjs(mv.mtime).format('YYYY-MM-DD HH:mm:ss')
          } else {
            mv.namef = mv.name
          }
          mv.checked = false
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
        await http.post('/json-set', {
          ph,
          data
        })
        await getjsons()
        WINAPI.$message.success('上传成功')
      } catch (error) {
        console.log(error)

        WINAPI.$message.error('上传失败')
      }
    }
    reader.readAsText(file)
  }

  function CheckboxChange(e) {
    jsonFiles[e.target.value].checked = !jsonFiles[e.target.value].checked
    if (jsonFiles[e.target.value].checked) {
      setDelete(false)
    } else {
      setDelete(!jsonFiles.some(sv => sv.checked))
    }
    setJsonfiles([].concat(jsonFiles))
  }

  function chongzhi() {
    jsonFiles.forEach(item => {
      item.checked = false
    })
    setDelete(true)
    setJsonfiles([].concat(jsonFiles))
  }

  async function deleteJsonFlile() {
    chongzhi()
    WINAPI.$message.warning('暂时不支持删除')
  }

  if (open) {
    return null
  }

  return (
    <>
      <div className={styles.view}>
        <div className={styles.viewHeader}>
          {atitle !== '' ? (
            <h2>{atitle}</h2>
          ) : (
            <div>
              <Button type='primary' onClick={() => fileInputRef.current.click()}>
                上传
              </Button>
              <input ref={fileInputRef} type='file' hidden onChange={changeFile} />
              <Button className='ml-10' type='primary' danger disabled={isDelete} onClick={deleteJsonFlile}>
                删除
              </Button>
              <Button className='ml-10' type='primary' disabled={isDelete} onClick={chongzhi}>
                重置
              </Button>
            </div>
          )}
          <CloseOutlined onClick={CloseOut} style={{ fontSize: '28px' }} />
        </div>
        <div className={styles.jsonfiles}>
          {jsonFiles.map((item, index) => (
            <div key={index} className={styles.jsonfilesitem + ' flex'}>
              <Checkbox className='ml-10 mr-20' checked={item.checked} value={index} onChange={CheckboxChange} />
              <h3 onClick={() => getjson(item.path, item.name)}>{item.namef}</h3>
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
