import styles from './wol.module.css'

import { ConfigProvider, App, Layout, theme, Form } from 'antd'
import { useStore } from '@/store'
import { useToggle } from 'ahooks'
import { createRequest } from '@/utlis/http'
import dayjs from 'dayjs'

const { VITE_GLOB_WOL_API_URL, VITE_GLOB_WOL_API_URL_PREFIX } = import.meta.env
const http = createRequest(VITE_GLOB_WOL_API_URL + VITE_GLOB_WOL_API_URL_PREFIX)

const WinConfig = () => {
  const { message: messageApi, notification: notificationApi, modal: modalApi } = App.useApp()
  window.$message = messageApi
  window.$notification = notificationApi
  window.$modal = modalApi
  return <></>
}

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
        window.$message.error('网络错误')
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
      window.$message.warning({
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
        return Promise.reject('查询错误')
      })
    if (response.code === 1) {
      return response.data
    }
    return '无消息'
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
        window.$message.error('网络错误')
        item.loading = false
        setitems([...items])
        return Promise.reject(err)
      })
    if (response.code === 1) {
      item.msgs.push('等待消息')
      setitems([...items])
      // 判断上一个请求是否结束
      window.$timeClear = false
      window.$time = setInterval(async () => {
        // 没有结束 retrun
        if (window.$timeClear) {
          return
        }
        // 进入到说明可以开始请求 设置限制
        window.$timeClear = true
        const msgs = await getWolAppSend(wssid, item.uuid).catch(err => {
          item.msgs.push(err)
          setitems([...items])
          clearInterval(window.$time)
        })
        if (Array.isArray(msgs)) {
          const msg = msgs.at(-1)
          item.msgs.push(`收到消息：${msg.data} ${dayjs(msg.date).format('YYYY-MM-DD HH:mm:ss')}`)
        } else {
          item.msgs.push(msgs)
        }
        item.loading = false
        setitems([...items])
        clearInterval(window.$time)
        // 结束
        window.$timeClear = false
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
        window.$message.error('网络错误')
        item.msgs.push('网络错误')
        setitems([...items])
        return Promise.reject(err)
      })
    if (response.code === 1) {
      item.msgs.push('等待消息')
      setitems([...items])
      // 判断上一个请求是否结束
      window.$timeClear = false
      window.$time = setInterval(async () => {
        // 没有结束 retrun
        if (window.$timeClear) {
          return
        }
        // 进入到说明可以开始请求 设置限制
        window.$timeClear = true
        const msgs = await getWolAppSend(wssid, item.uuid).catch(err => {
          item.msgs.push(err)
          setitems([...items])
          clearInterval(window.$time)
        })
        if (Array.isArray(msgs)) {
          const msg = msgs.at(-1)
          item.msgs.push(`收到测试消息：${msg.data} ${dayjs(msg.date).format('YYYY-MM-DD HH:mm:ss')}`)
        } else {
          item.msgs.push(msgs)
        }
        setitems([...items])
        clearInterval(window.$time)
        // 结束
        window.$timeClear = false
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
            <div className='mt-20'>

            </div>
          </Layout>
        </App>
      </ConfigProvider>
    </>
  )
}