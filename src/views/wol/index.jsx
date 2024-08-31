import styles from './wol.module.css'

import HeaderNavigate from '@/components/HeaderNavigate'
import WolAdmin from './wolAdmin'

import { WOLHTTP, getWolAppSend } from './api'
import dayjs from 'dayjs'

export default () => {
  let wssid_list = localStorage.getItem('wssid_list')
  if (wssid_list) {
    wssid_list = JSON.parse(wssid_list)
  }

  const [formRef] = Form.useForm()
  const rulesID = ({ getFieldValue }) => ({
    async validator(_, value) {
      if (!value) {
        return Promise.reject(new Error('请输入id'))
      }
    },
  })
  const [isloading, { toggle }] = useToggle()
  const [items, setitems] = useState([])
  const [testsendValue, setTestsendValue] = useState('')

  const [wssid, setWssid] = useState('空')

  async function onFinish() {
    toggle()
    const formdata = await formRef.validateFields()

    const response = await WOLHTTP.get('/wssidlist', {
      wssid: formdata.wssid,
    }).catch(err => {
      toggle()
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
          buttype: 'primary',
        }
      })
      localStorage.setItem(
        'wssid_list',
        JSON.stringify({
          wssid: response.data.wssid,
        })
      )
      setitems(list)
    } else {
      window.$message.warning({
        content: response.msg + '，没有查询到',
        duration: 5,
      })
      setitems([])
    }
    setTimeout(() => {
      toggle()
    }, 1000)
  }

  const binditemClick = async (item, index) => {
    item.loading = true
    item.msgs.push('通讯中...')
    setitems([...items])
    let response = await WOLHTTP.post(`/send-wol?wssid=${wssid}`, {
      wssid: wssid,
      uuid: item.uuid,
    }).catch(err => {
      window.$message.error('网络错误')
      item.loading = false
      setitems([...items])
      return Promise.reject(err)
    })
    if (response.code === 1) {
      item.msgs.push('等待app回复...')
      setitems([...items])
      const result = await getWolAppSend(wssid, item.uuid)
      item.msgs.push(result)
      item.loading = false
      setitems([...items])
    }
  }

  const testSend = async (item, index) => {
    item.msgs.push('通讯中...')
    setitems([...items])
    let response = await WOLHTTP.post(`/send-app?wssid=${wssid}`, {
      wssid: wssid,
      uuid: item.uuid,
      message: {
        data: testsendValue,
      },
    }).catch(err => {
      item.msgs.push('网络错误')
      setitems([...items])
      return Promise.reject(err)
    })
    if (response.code === 1) {
      item.msgs.push('等待app回复...')
      setitems([...items])
      const result = await getWolAppSend(wssid, item.uuid)
      item.msgs.push(result)
      item.loading = false
      setitems([...items])
    }
  }

  async function getPower(item) {
    const res = await WOLHTTP.get('/createLog', {
      isfile: 1,
    }).catch(err => {
      window.$message.error('网络错误')
      return Promise.reject(err)
    })
    const { wsPingMap } = res.data
    if (wsPingMap.length === 0) {
      item.msgs.push('暂无电量记录')
      setitems([...items])
      return
    }

    const wsPing = wsPingMap.find(wspingitem => wspingitem.uuid === item.uuid)
    if (wsPing.times.length === 0) {
      item.msgs.push('暂无电量记录')
      setitems([...items])
      return
    }

    let wsPingItems = wsPing.times.reverse()
    wsPingItems = wsPingItems.find(fv => fv.type === 'client')
    let date = wsPingItems ? wsPingItems.date : new Date()
    item.msgs.push(`手机电量：${wsPingItems?.clientmessage.level ?? '无'}  ${dayjs(date).format('YYYY-MM-DD HH:mm:ss')}`)
    setitems([...items])
  }

  async function deleteuuid(item, index) {
    try {
      const confirmed = await window.$modal.confirm({
        title: '确认',
        centered: true,
        content: '是否释放当前链接？手机可能无法连接！',
      })

      if (!confirmed) {
        return
      }

      const res = await WOLHTTP.post('/delete-uuid', {
        wssid: wssid,
        uuid: item.uuid,
      })
      if (res.code === 1) {
        items.splice(index, 1)
        setitems([...items])
        window.$message.success(res.msg)
      } else {
        window.$message.error(res.msg)
      }
    } catch (error) {
      window.$message.error('网络错误')
      console.log(error)
    }
  }

  useMount(() => {
    if (wssid_list?.wssid) {
      onFinish()
    }
  })

  return (
    <>
      <div>
        <HeaderNavigate />
        <div className={styles.wolLayout}>
          <Form
            form={formRef}
            onFinish={onFinish}
            initialValues={{
              wssid: wssid_list?.wssid ?? '',
            }}
          >
            <Form.Item
              name="wssid"
              label="id：（最好使用英文和数字组合，自己记得就好）"
              rules={[rulesID]}
              validateTrigger="onBlur"
            >
              <Input
                placeholder="id"
                allowClear
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isloading}
            >
              查询
            </Button>
          </Form>

          <div className="mt-10">
            <h1>id：{wssid_list?.wssid ?? '空'}</h1>
            {items.length > 0 &&
              items.map((item, index) => (
                <div
                  className={styles.items}
                  key={item.uuid}
                >
                  <h3>uuid：{item.uuid}</h3>
                  <Button
                    type={item.buttype}
                    block
                    danger
                    className="mt-10"
                    loading={item.loading}
                    onClick={() => binditemClick(item, index)}
                  >
                    唤醒
                  </Button>
                  <div className="flex-ai-c mt-10">
                    <Input
                      placeholder="随便写-测试看看在线不"
                      allowClear
                      onChange={e => setTestsendValue(e.target.value)}
                    />
                    <Button
                      type="primary"
                      onClick={() => testSend(item, index)}
                    >
                      测试wolapp通讯
                    </Button>
                  </div>
                  <div className={styles.gnbuts}>
                    <Button
                      type="primary"
                      onClick={() => getPower(item, index)}
                    >
                      查看手机电量
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => deleteuuid(item, index)}
                    >
                      释放当前链接
                    </Button>
                  </div>
                  <div className="mt-10">{item.msgs.length > 0 && item.msgs.map((msg, index) => <p key={index}>{msg}</p>)}</div>
                </div>
              ))}
          </div>
          <WolAdmin />
        </div>
      </div>
    </>
  )
}
