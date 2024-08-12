import { useStore } from '@/store'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import { Input, Checkbox } from 'antd'
import Transition from '@/components/Transition'
import { useRequest, useToggle } from 'ahooks'
import CuIcon from '@/components/cuIcon'
import { useAsyncEffect, useLocalStorageState } from 'ahooks'
import http from '@/utlis/http'
import { useState } from 'react'
import { exportJsonFile, isMobile } from '@/utlis'
import { useViewDataStore } from '@/store/viewdata'

const CheckboxGroup = Checkbox.Group

export default () => {
  const { store, setValueStore, setUserStore } = useStore()
  const [token, setToken] = useLocalStorageState('token')
  const [isLogin, { toggle }] = useToggle(true)
  const [pwd, setPwd] = useState('')
  const { runAsync } = useRequest(data => http.post('/secretkey', { pwd: data }), {
    manual: true
  })
  const { clearNovel } = useViewDataStore()

  useAsyncEffect(async () => {
    if (token) {
      await http.post('/verify').catch(e => {
        setToken()
        return Promise.reject(e)
      })
      setPwd('token')
      toggle()
    }
  }, [])

  // 选中的checke
  const [checkedList, setCheckedList] = useState(Object.keys(localStorage))
  // chechke 配置
  const [checkd, setCheckd] = useState({
    plainOptions: checkedList,
    checkAll: !!checkedList.length
  })

  async function login() {
    try {
      if (!pwd) {
        window.$message.error('请输入秘钥')
        return
      }
      const result = await runAsync(pwd)
      setToken(result)
      setCheckedList(Object.keys(localStorage))
      setCheckd(v => ({ ...v, plainOptions: Object.keys(localStorage) }))
      setUserStore({ admin: true })
      toggle()
      window.$message.success('获取秘钥成功')
    } catch (error) {
      window.$message.error('获取秘钥失败')
    }
  }

  // 清除秘钥
  function removeToken() {
    setToken()
    setPwd('')
    setCheckedList(['token'])
    const locals = Object.keys(localStorage)
    setCheckd({
      plainOptions: locals,
      checkAll: locals.length ? true : false
    })
    setCheckedList(locals)
    setUserStore({ admin: false })
    clearNovel()
    toggle()
  }

  const onChange = list => {
    setCheckedList(list)
    setCheckd(v => ({
      ...v,
      checkAll: list > 0 && list < checkd.plainOptions.length
    }))
  }

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? checkd.plainOptions : [])
    setCheckd({
      plainOptions: checkd.plainOptions,
      checkAll: e.target.checked
    })
  }

  function removeLocal() {
    checkedList.forEach(key => {
      localStorage.removeItem(key)
    })
    const locals = Object.keys(localStorage)
    setCheckd({
      plainOptions: locals,
      checkAll: true
    })
    setCheckedList(locals)
    setPwd('')
    setUserStore({ admin: false })
    toggle(false)
    clearNovel()
  }

  async function exportSql() {
    try {
      const response = await http.get('/mong/novel')
      exportJsonFile(response)
    } catch {
      window.$message.error('获取数据库数据失败！')
    }
  }

  function exportLocal() {}

  return (
    <Drawer
      title='设置'
      placement='left'
      open={store.isSettingTwo}
      onClose={() => setValueStore({ isSettingTwo: !store.isSettingTwo })}
      width={isMobile() ? '80vw' : '20vw'}
    >
      <div className='flex-fdc h-100'>
        <Input.Password
          size='large'
          allowClear
          placeholder='秘钥'
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <Transition show={isLogin}>
          {isLogin ? (
            <Button type='primary' className='mt-10' block onClick={login}>
              获取秘钥
            </Button>
          ) : (
            <Button type='primary' className='mt-10' block danger onClick={removeToken}>
              清除秘钥
            </Button>
          )}
        </Transition>

        <Space direction='vertical' size='middle' className='mt-20' style={{ display: 'flex' }}>
          <Button block type='dashed' icon={<CuIcon icon='down' />} onClick={exportSql}>
            导出数据库表
          </Button>
          <Button block type='dashed' icon={<CuIcon icon='down' />} onClick={exportLocal}>
            导出本地数据
          </Button>
        </Space>

        <div style={{ marginTop: 'auto' }}>
          <div>
            <Checkbox onChange={onCheckAllChange} checked={checkd.checkAll}>
              选择所有
            </Checkbox>
          </div>
          <CheckboxGroup className='mt-20' options={checkd.plainOptions} value={checkedList} onChange={onChange} />
          <Button className='mt-20' block type='primary' danger icon={<CuIcon icon='delete' />} onClick={removeLocal}>
            删除本地数据
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
