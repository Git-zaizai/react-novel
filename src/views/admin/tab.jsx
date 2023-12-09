import styles from './tab.module.css'

import { Form, Input } from 'antd'
import { randomHexColor } from '@/utlis/themeColor'
import ViewCard from '@/components/ViewCard'
import CuIcon from '@/components/cuIcon'
import Transition from '@/components/Transition'
import { useToggle, useMount } from 'ahooks'
import { useState } from 'react'
import http from '@/utlis/http'
import { useEffect } from 'react'

export default () => {
  const [isDelBut, { toggle }] = useToggle()
  const [checkboxs, setCheckoxs] = useState([])
  const [removeTab, setRemoveTab] = useState([])
  const [val, setval] = useState('')

  useMount(() => {
    http
      .get('/json-get', { ph: 'tabs.json' })
      .then((res) => setCheckoxs(res))
      .catch(() => {
        window.$message.error('获取便签失败')
      })
  })

  const onChange = (checkedValues) => {
    setRemoveTab([...removeTab, checkedValues])
  }

  useEffect(() => {
    if (removeTab.length > 0 && !isDelBut) {
      toggle()
    }
  }, [removeTab.length])

  const addTab = async () => {
    await http
      .post('/json-set', {
        ph: 'tabs.json',
        data: removeTab
      })
      .catch((e) => {
        window.$message.error('添加标签失败')
        return Promise.reject(e)
      })
    setCheckoxs([...checkboxs, val])
  }

  const removeTabClick =async ()=>{
    const modalRes = await window.$modal.confirm({
      okText: '删除',
      okType: 'danger',
      maskClosable: true,
      centered: true,
      cancelText: '取消',
      title: '删除记录类型',
      content: '是否将（删除）'
    })
    if(!modalRes){
      setRemoveTab([])
      setCheckoxs([])
    }
  }

  return (
    <>
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
        <Space
          size={[0, 8]}
          wrap
          className='mt-10'
        >
          {checkboxs.map((v) => (
            <Checkbox
              onChange={() => onChange(v)}
              key={v}
            >
              <Tag color={randomHexColor()}>{v}</Tag>
            </Checkbox>
          ))}
        </Space>
        <Form.Item
          className={styles.addForm + ' w-100 mb-20'}
          labelAlign='right'
        >
          <Space.Compact className='w-100'>
            <Input
              placeholder='标签名'
              onChange={(e) => setval(e.target.value)}
            />
            <Button
              type='primary'
              icon={
                <CuIcon
                  icon='add'
                  size={16}
                />
              }
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
              <CuIcon
                icon='delete'
                size={16}
              />
            </Button>
          ) : (
            <></>
          )}
        </Transition>
      </ViewCard>
      {/* <div className={styles.view}>
        <div></div>
      </div> */}
    </>
  )
}
