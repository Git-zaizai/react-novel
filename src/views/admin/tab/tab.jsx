import styles from './tab.module.css'

import { Form, Input, Checkbox, Button } from 'antd'
import { randomHexColor } from '@/utlis/themeColor'
import ViewCard from '@/components/ViewCard'
import CuIcon from '@/components/cuIcon'
import Transition from '@/components/Transition'
import { useToggle, useMount } from 'ahooks'
import { useState, useEffect } from 'react'
import http from '@/utlis/http'

function RecordtypeCard() {
  const [isDelBut, { toggle, setLeft, setRight }] = useToggle()
  const [checkboxs, setCheckoxs] = useState([])
  const [removeTab, setRemoveTab] = useState([])
  const [val, setval] = useState('')

  useMount(() => {
    http
      .get('/json-get', { ph: 'Recordtype.json' })
      .then(res =>
        setCheckoxs(
          res.map(v => {
            return { checked: false, tab: v, color: randomHexColor() }
          })
        )
      )
      .catch(() => {
        window.$message.error('获取便签失败')
      })
  })

  const onChange = (checkedValues, index) => {
    checkedValues.checked = !checkedValues.checked
    checkboxs[index] = checkedValues
    if (checkedValues.checked) {
      removeTab.push(checkedValues)
      setRemoveTab(removeTab)
    } else {
      const findindex = removeTab.findIndex(fv => fv.tab === checkedValues.tab)
      removeTab.splice(findindex, 1)
      setRemoveTab(removeTab)
      setTimeout(() => console.log(removeTab), 1000)
    }
    setCheckoxs([...checkboxs])
  }

  useEffect(() => {
    if (removeTab.length > 0 && !isDelBut) {
      setRight()
    } else if (removeTab.length === 0) {
      setLeft()
    }
  }, [removeTab.length])

  const addTab = async () => {
    await http
      .post('/json-set', {
        ph: 'Recordtype.json',
        data: removeTab
      })
      .catch(e => {
        window.$message.error('添加标签失败')
        return Promise.reject(e)
      })
    setCheckoxs([...checkboxs, val])
  }

  const removeTabClick = async () => {
    const modalRes = await window.$modal.confirm({
      okText: '删除',
      okType: 'danger',
      maskClosable: true,
      centered: true,
      cancelText: '取消',
      title: '删除记录类型',
      content: '是否将（删除）'
    })
    if (!modalRes) return
    const removes = checkboxs.filter(v => {
      const findIndex = removeTab.findIndex(fv => fv.tab === v.tab)
      if (findIndex === -1) {
        return v
      }
    })
    await http
      .post('/json-set', {
        ph: 'Recordtype.json',
        data: removes.map(mv => mv.tab)
      })
      .catch(e => {
        window.$message.error(e)
        return Promise.reject(e)
      })
    setRemoveTab([])
    setCheckoxs(removes)
  }

  return (
    <ViewCard
      title={
        <div className='flex'>
          <CuIcon
            icon='ticket'
            size='22'
            color='var(--primary-color)'
            className='mr-10'
          />
          <h4 className='wax-100 singe-line'>记录类型</h4>
        </div>
      }
    >
      {checkboxs.length ? (
        <Space size={[0, 8]} wrap className='mt-10'>
          {checkboxs.map((item, index) => (
            <Checkbox
              onChange={() => onChange(item, index)}
              checked={item.checked}
              key={item.tab}
            >
              <Tag color={item.color}>{item.tab}</Tag>
            </Checkbox>
          ))}
        </Space>
      ) : (
        <div className='flex-fdc-aic-juc w-100'>
          <CuIcon icon='home' color='var(--primary-color)' size='24' />
        </div>
      )}
      <Form.Item className={styles.addForm + ' w-100 mb-20'} labelAlign='right'>
        <Space.Compact className='w-100'>
          <Input placeholder='类型名' onChange={e => setval(e.target.value)} />
          <Button
            type='primary'
            icon={<CuIcon icon='add' size={16} />}
            onClick={addTab}
          >
            提交
          </Button>
        </Space.Compact>
      </Form.Item>

      <Transition show={isDelBut}>
        {isDelBut ? (
          <Button
            danger
            type='primary'
            block
            className='mt-10'
            onClick={removeTabClick}
          >
            <CuIcon icon='delete' size={16} />
          </Button>
        ) : (
          <></>
        )}
      </Transition>
    </ViewCard>
  )
}

function TabCard() {
  const [isDelBut, { toggle, setLeft, setRight }] = useToggle()
  const [checkboxs, setCheckoxs] = useState([])
  const [removeTab, setRemoveTab] = useState([])
  const [val, setval] = useState('')

  useMount(() => {
    http
      .get('/json-get', { ph: 'tabs.json' })
      .then(res =>
        setCheckoxs(
          res.map(v => {
            return { checked: false, tab: v, color: randomHexColor() }
          })
        )
      )
      .catch(() => {
        window.$message.error('获取便签失败')
      })
  })

  const onChange = (checkedValues, index) => {
    checkedValues.checked = !checkedValues.checked
    checkboxs[index] = checkedValues
    if (checkedValues.checked) {
      removeTab.push(checkedValues)
      setRemoveTab(removeTab)
    } else {
      const findindex = removeTab.findIndex(fv => fv.tab === checkedValues.tab)
      removeTab.splice(findindex, 1)
      setRemoveTab(removeTab)
      setTimeout(() => console.log(removeTab), 1000)
    }
    setCheckoxs([...checkboxs])
  }

  useEffect(() => {
    if (removeTab.length > 0 && !isDelBut) {
      setRight()
    } else if (removeTab.length === 0) {
      setLeft()
    }
  }, [removeTab.length])

  const addTab = async () => {
    await http
      .post('/json-set', {
        ph: 'tabs.json',
        data: removeTab
      })
      .catch(e => {
        window.$message.error('添加标签失败')
        return Promise.reject(e)
      })
    setCheckoxs([...checkboxs, val])
  }

  const removeTabClick = async () => {
    const modalRes = await window.$modal.confirm({
      okText: '删除',
      okType: 'danger',
      maskClosable: true,
      centered: true,
      cancelText: '取消',
      title: '删除记录类型',
      content: '是否将（删除）'
    })
    if (!modalRes) return
    const removes = checkboxs.filter(v => {
      const findIndex = removeTab.findIndex(fv => fv.tab === v.tab)
      if (findIndex === -1) {
        return v
      }
    })
    await http
      .post('/json-set', {
        ph: 'tabs.json',
        data: removes.map(mv => mv.tab)
      })
      .catch(e => {
        window.$message.error(e)
        return Promise.reject(e)
      })
    setRemoveTab([])
    setCheckoxs(removes)
  }

  return (
    <ViewCard
      title={
        <div className='flex'>
          <CuIcon
            icon='tag'
            size='22'
            color='var(--primary-color)'
            className='mr-10'
          />
          <h4 className='wax-100 singe-line'>标签</h4>
        </div>
      }
    >
      {checkboxs.length ? (
        <Space size={[0, 8]} wrap className='mt-10'>
          {checkboxs.map((item, index) => (
            <Checkbox
              onChange={() => onChange(item, index)}
              checked={item.checked}
              key={item.tab}
            >
              <Tag color={item.color}>{item.tab}</Tag>
            </Checkbox>
          ))}
        </Space>
      ) : (
        <div className='flex-fdc-aic-juc w-100'>
          <CuIcon icon='home' color='var(--primary-color)' size='24' />
        </div>
      )}
      <Form.Item className={styles.addForm + ' w-100 mb-20'} labelAlign='right'>
        <Space.Compact className='w-100'>
          <Input placeholder='标签名' onChange={e => setval(e.target.value)} />
          <Button
            type='primary'
            icon={<CuIcon icon='add' size={16} />}
            onClick={addTab}
          >
            提交
          </Button>
        </Space.Compact>
      </Form.Item>

      <Transition show={isDelBut}>
        {isDelBut ? (
          <Button
            danger
            type='primary'
            block
            className='mt-10'
            onClick={removeTabClick}
          >
            <CuIcon icon='delete' size={16} />
          </Button>
        ) : (
          <></>
        )}
      </Transition>
    </ViewCard>
  )
}

const { Search } = Input

export default () => {
  const [list, setList] = useState([])

  return (
    <>
      <div className={styles.view}>
        <RecordtypeCard />
        <TabCard />

        <ViewCard
          title={
            <div className='flex'>
              <CuIcon
                icon='form'
                size='22'
                color='var(--primary-color)'
                className='mr-10'
              />
              <h4 className='wax-100 singe-line'>申请的便签</h4>
            </div>
          }
        >
          {list.length ? (
            <div>
              <h4>
                <Tag color={randomHexColor()}>标签</Tag>
                &ensp;说明：&ensp;啊点开链接啊哈索拉卡等哈拉卡萨较大好啦卡机等哈拉卡你打了吗你只需没拿先擦v下MV补习，美女些，丑男女
              </h4>
              <Search className='mt-10' placeholder='内容' enterButton='回复' />
              <Button danger type='primary' block className='mt-10'>
                <CuIcon icon='delete' size={16} />
              </Button>
            </div>
          ) : (
            <div className='flex-fdc-aic-juc w-100'>
              <CuIcon icon='home' color='var(--primary-color)' size='24' />
            </div>
          )}
        </ViewCard>
      </div>
    </>
  )
}
