import styles from './wol.module.css'

import { ConfigProvider, App, Layout, theme, Form, Checkbox, Modal } from 'antd'
import { useStore } from '@/store'
import { useToggle } from 'ahooks'
import httpd, { createRequest } from '@/utlis/http'
import dayjs from 'dayjs'

import WolJsonView from './wol-json-view'

const { VITE_GLOB_WOL_API_URL, VITE_GLOB_WOL_API_URL_PREFIX } = import.meta.env
const http = createRequest(VITE_GLOB_WOL_API_URL + VITE_GLOB_WOL_API_URL_PREFIX)

const WINAPI = {
  $message: null
}

const WinConfig = () => {
  const { message: messageApi } = App.useApp()
  WINAPI.$message = messageApi
  return <></>
}

function WolAdmin() {
  let token = localStorage.getItem('token')
  /* if (!token) {
    return null
  } */

  const [modal, contextHolder] = Modal.useModal()
  const [openjson, { toggle: setopenjson }] = useToggle(true)
  const [dataJson, setdataJson] = useState(null)

  async function createAllFile() {
    await httpd.post('/verify').catch(e => {
      return Promise.reject(e)
    })
    const res = await http.get('/createLog').catch(err => {
      WINAPI.$message.error('网络错误')
      return Promise.reject(err)
    })
    setopenjson()
    setdataJson(res.data)
    WINAPI.$message.success('创建成功')
    console.log(res)
  }

  const plainOptions = ['wsMap', 'wsMessageMap', 'wsPingMap']
  const [checkedList, setCheckedList] = useState([])
  const [modelOpen, { toggle: setModelOpen }] = useToggle()
  const [confirmLoading, { toggle: setConfirmLoading }] = useToggle()

  function CheckboxChange(checkedValues) {
    setCheckedList(checkedValues)
  }
  function bindModalOpen() {
    checkedList.length > 0 && setModelOpen()
    window.$wolTime1 && clearTimeout(window.$wolTime1)
    window.$wolTime1 = setTimeout(() => {
      setConfirmLoading()
    }, 5000)
  }
  async function bindfreedMap() {
    let confirmed
    if (checkedList.includes('wsMap')) {
      confirmed = await modal.confirm({
        title: '再次确认',
        centered: true,
        content: '其中包含 wsMap 请确认是否继续'
      })
      if (!confirmed) {
        setModelOpen()
        setCheckedList([])
        WINAPI.$message.warning('请仔细查看')
      }
    }
    try {
      const response = await http.post('/freedMap', {
        mapkey: checkedList
      })
      if (response.code === 1) {
        setModelOpen()
        setCheckedList([])
        WINAPI.$message.success('释放' + response.data.join(','))
      }
    } catch {
      WINAPI.$message.error('网络错误')
      setModelOpen()
      setCheckedList([])
    }
  }

  return (
    <>
      <div className={styles.wola}>
        <Button onClick={createAllFile}>创建所有文件</Button>
        <div className='mt-10'>
          <Checkbox.Group options={plainOptions} value={checkedList} onChange={CheckboxChange} />
          <Button className='mt-10' onClick={bindModalOpen}>
            确认释放
          </Button>
        </div>
        <div className='mt-5'>
          <Button onClick={setopenjson}>查看json</Button>
        </div>
        <Modal
          open={modelOpen}
          onOk={bindfreedMap}
          onCancel={setModelOpen}
          centered
          confirmLoading={confirmLoading}
          title='请确认销毁'
        >
          请确认： {checkedList.join('，')}
        </Modal>
        <div>
          <WolJsonView open={openjson} WINAPI={WINAPI} http={http} onClose={setopenjson} data={dataJson} />
        </div>
        {contextHolder}
      </div>
    </>
  )
}

const Template = {}

export default () => {
  const { store } = useStore()
  const [formRef] = Form.useForm()
  const [isloading, { toggle }] = useToggle()

  const [wssid, setWssid] = useState('空')
  const [items, setitems] = useState([])
  const [testsendValue, setTestsendValue] = useState('')

  let wssid_list = localStorage.getItem('wssid_list')
  if (wssid_list) {
    wssid_list = JSON.parse(wssid_list)
    /* wssid_list.list = wssid_list.list.map(mv => {
      return {
        uuid: mv,
        loading: false,
        msgs: [],
        buttype: 'default'
      }
    }) */
  }

  useEffect(() => {
    if (wssid_list) {
      setWssid(wssid_list.wssid)
      onFinish()
    }
  }, [])

  const drawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)'
    }
  }

  const onFinish = async () => {
    toggle()
    const formdata = await formRef.validateFields()

    const response = await http
      .get('/wssidlist', {
        wssid: formdata.wssid
      })
      .catch(err => {
        toggle()
        WINAPI.$message.error('网络错误')
        return Promise.reject(err)
      })

    if (response.code === 1 && response.data) {
      setWssid(response.data.wssid)
      const list = response.data.list.map(mv => {
        return {
          uuid: mv,
          loading: false,
          msgs: [],
          buttype: 'primary'
        }
      })
      localStorage.setItem(
        'wssid_list',
        JSON.stringify({
          wssid: response.data.wssid
        })
      )
      setitems(list)
    } else {
      WINAPI.$message.warning({
        content: response.msg + '，没有查询到',
        duration: 5
      })
      setitems([])
    }
    setTimeout(() => {
      toggle()
    }, 1000)
  }

  const rulesID = ({ getFieldValue }) => ({
    async validator(_, value) {
      if (!value) {
        return Promise.reject(new Error('请输入id'))
      }
    }
  })

  function setHttpHeaderWssid() {
    const header = new Headers()
    header.append('wssid', wssid)
    let cookie = document.cookie
    if (!cookie.includes('wssid')) {
      let date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      let expires = '; expires=' + date.toUTCString()
      document.cookie = 'wssid' + '=' + (wssid || '') + expires + '; path=/'
    }
    return header
  }

  async function getWolAppSend(wssid, uuid) {
    const response = await http
      .get('/selcect-app-messages', {
        wssid: wssid,
        uuid: uuid
      })
      .catch(err => {
        console.log('/selcect-app-messages error:', err)
        return Promise.reject('网络错误')
      })
    if (response.code === 1) {
      return response.data
    }
    return 0
  }

  const binditemClick = async (item, index) => {
    item.loading = true
    item.msgs.push('通讯中...')
    setitems([...items])
    let response = await http
      .post(`/send-wol?wssid=${wssid}`, {
        wssid: wssid,
        uuid: item.uuid
      })
      .catch(err => {
        WINAPI.$message.error('网络错误')
        item.loading = false
        setitems([...items])
        return Promise.reject(err)
      })
    if (response.code === 1) {
      item.msgs.push('等待app回复...')
      setitems([...items])
      // 判断上一个请求是否结束
      window.$timeClear = false
      window.$timeNumber = 0
      window.$time = setInterval(async () => {
        // 没有结束 retrun
        if (window.$timeClear && window.$timeNumber > 20) {
          return
        }
        window.$timeNumber += 1
        // 进入到说明可以开始请求 设置限制
        window.$timeClear = true
        const msgs = await getWolAppSend(wssid, item.uuid).catch(err => {
          item.msgs.push(err)
          setitems([...items])
          clearInterval(window.$time)
          // 结束
          window.$timeClear = false
        })
        if (msgs !== 0) {
          const msg = msgs.at(-1)
          item.msgs.push(`收到消息：${msg.data} ${dayjs(msg.date).format('YYYY-MM-DD HH:mm:ss')}`)
          item.loading = false
          setitems([...items])
          clearInterval(window.$time)
          // 结束
          window.$timeClear = false
          window.$timeNumber = 0
        }
      }, 300)
    }
  }

  const testSend = async (item, index) => {
    item.msgs.push('通讯中...')
    setitems([...items])
    let response = await http
      .post(`/send-app?wssid=${wssid}`, {
        wssid: wssid,
        uuid: item.uuid,
        message: {
          data: testsendValue
        }
      })
      .catch(err => {
        item.msgs.push('网络错误')
        setitems([...items])
        return Promise.reject(err)
      })
    if (response.code === 1) {
      item.msgs.push('等待app回复...')
      setitems([...items])
      // 判断上一个请求是否结束
      window.$timeClear = false
      window.$timeNumber = 0
      window.$time = setInterval(async () => {
        // 没有结束 retrun
        if (window.$timeClear && window.$timeNumber > 20) {
          return
        }
        window.$timeNumber += 1
        // 进入到说明可以开始请求 设置限制
        window.$timeClear = true
        const msgs = await getWolAppSend(wssid, item.uuid).catch(err => {
          item.msgs.push(err)
          setitems([...items])
          clearInterval(window.$time)
          // 结束
          window.$timeClear = false
        })
        if (msgs !== 0) {
          const msg = msgs.at(-1)
          item.msgs.push(`收到消息：${msg.data} ${dayjs(msg.date).format('YYYY-MM-DD HH:mm:ss')}`)
          item.loading = false
          setitems([...items])
          clearInterval(window.$time)
          // 结束
          window.$timeClear = false
          window.$timeNumber = 0
        }
      }, 300)
    }
  }

  return (
    <>
      <ConfigProvider
        drawer={{
          styles: drawerStyles
        }}
        theme={{
          token: store.themeToken,
          algorithm: store.theme ? theme.defaultAlgorithm : theme.darkAlgorithm
        }}
      >
        <App message={{ top: 70 }}>
          <WinConfig />

          <Layout className={styles.wolLayout}>
            <Form
              form={formRef}
              onFinish={onFinish}
              initialValues={{
                wssid: wssid_list && wssid_list.wssid
              }}
            >
              <Form.Item
                name='wssid'
                label='id：（最好使用英文和数字组合，自己记得就好）'
                rules={[rulesID]}
                validateTrigger='onBlur'
              >
                <Input placeholder='id' />
              </Form.Item>
              <Button type='primary' htmlType='submit' block loading={isloading}>
                查询
              </Button>
            </Form>

            <div className='mt-20'>
              <h1>id：{wssid}</h1>
              {items.length > 0 &&
                items.map((item, index) => (
                  <div className={styles.items} key={item.uuid}>
                    <h3>uuid：{item.uuid}</h3>
                    <Button
                      type={item.buttype}
                      block
                      danger
                      className='mt-10'
                      loading={item.loading}
                      onClick={() => binditemClick(item, index)}
                    >
                      唤醒
                    </Button>
                    <Input
                      placeholder='随便写-测试看看在线不'
                      className='mt-20'
                      value={testsendValue}
                      onInput={e => setTestsendValue(e.target.value)}
                    />
                    <Button type='primary' block className='mt-10' onClick={() => testSend(item, index)}>
                      测试wolapp通讯
                    </Button>
                    <div className='mt-10'>
                      {item.msgs.length > 0 && item.msgs.map((msg, index) => <p key={index}>{msg}</p>)}
                    </div>
                  </div>
                ))}
            </div>
            <WolAdmin />
          </Layout>
        </App>
      </ConfigProvider>
    </>
  )
}
