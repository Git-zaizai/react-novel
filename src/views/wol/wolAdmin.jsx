import styles from './wol.module.css'

import CheckJson from './Check-json'
import SelectCurrent from './select-current'

import { WOLHTTP } from './api'
import { useStore } from '@/store'

const plainOptions = ['wsMap', 'wsMessageMap', 'wsPingMap']

export default () => {
  const { userStore } = useStore()
  const [openjson, { toggle: setopenjson }] = useToggle(false)
  const [opentoupdate, setopentoupdate] = useState('')

  async function createAllFile() {
    if (!userStore.admin) {
      return
    }
    const res = await WOLHTTP.get('/createLog').catch(err => {
      window.$message.error('网络错误')
      return Promise.reject(err)
    })
    let log_path = res.data.log_path.split('/json/').pop()
    setopentoupdate(log_path)
    window.$message.success('创建成功，打开文件')
    setTimeout(() => {
      setopenjson()
    }, 1000)
  }

  const [checkedList, setCheckedList] = useState([])

  async function bindModalOpen() {
    if (checkedList.length === 0) {
      window.$message.warning('请选择要释放的map')
      return
    }
    let confirmed = await window.$modal.confirm({
      title: '请确认',
      content: '是否确认释放  ' + checkedList.join(','),
      centered: true,
    })

    if (confirmed) {
      if (checkedList.includes('wsMap')) {
        confirmed = await window.$modal.confirm({
          title: '再次确认',
          centered: true,
          content: '其中包含 wsMap 请确认是否继续',
        })
        if (!confirmed) {
          window.$message.warning('请仔细查看')
          setCheckedList(plainOptions.slice(1))
          return
        }
      }
      confirmed = await window.$modal.confirm({
        title: '再次确认',
        content: '是否确认释放  ' + checkedList.join(','),
        centered: true,
      })
      if (confirmed) {
        try {
          const response = await WOLHTTP.post('/freedMap', {
            mapkey: checkedList,
          })
          if (response.code === 1) {
            setCheckedList([])
            window.$message.success('释放 ' + response.data.join(',') + ' 成功')
          }
        } catch {
          window.$message.error('网络错误')
          setCheckedList([])
        }
      }
    }
  }

  /*   let token = localStorage.getItem('token')
  if (!token || !userStore.admin) {
    return
  }
 */
  return (
    <div className={styles.wola}>
      <Button
        onClick={createAllFile}
        block
      >
        创建所有文件
      </Button>
      <div className="mt-10">
        <Checkbox.Group
          options={plainOptions}
          value={checkedList}
          onChange={setCheckedList}
        />
        <Button
          className="mt-10"
          onClick={bindModalOpen}
          block
        >
          确认释放
        </Button>
      </div>
      <div className="mt-5">
        {/* <Button
          onClick={() => {
            setopentoupdate('')
            setopenjson()
          }}
          block
        >
          查看json
        </Button> */}
        <Button
          block
          onClick={setopenjson}
        >
          查看当前数据
        </Button>
      </div>

      {/* <CheckJson
        open={openjson}
        onClose={setopenjson}
        opentoupdate={opentoupdate}
      /> */}
      <SelectCurrent
        open={openjson}
        onClose={setopenjson}
      />
    </div>
  )
}
