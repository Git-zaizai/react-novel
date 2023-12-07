import styles from './tab.module.css'

import { Form, Input } from 'antd'
import { randomHexColor } from '@/utlis/themeColor'
import ViewCard from '@/components/ViewCard'
import CuIcon from '@/components/cuIcon'
import Transition from '@/components/Transition'
import { useToggle, useMount } from 'ahooks'
import { useState } from 'react'
import http from '@/utlis/http'

export default () => {
  const [isDelBut, { toggle }] = useToggle()
  const [checkboxs, setCheckoxs] = useState([])

  useMount(() => {
    http
      .get('/getjson', { ph: 'tabs.json' })
      .then(res => setCheckoxs(res))
      .catch(() => {
        window.$message.error('获取便签失败')
      })
  })

  const onChange = checkedValues => {
    console.log('checked = ', checkedValues)
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
        <Space size={[0, 8]} wrap className='mt-10'>
          {checkboxs.map(v => (
            <Checkbox onChange={() => onChange(v)} key={v}>
              <Tag color={randomHexColor()}>{v}</Tag>
            </Checkbox>
          ))}
        </Space>
        <Form.Item
          className={styles.addForm + ' w-100 mb-20'}
          labelAlign='right'
        >
          <Space.Compact className='w-100'>
            <Input placeholder='标签名' />
            <Button type='primary' icon={<CuIcon icon='add' size={16} />}>
              提交
            </Button>
          </Space.Compact>
        </Form.Item>

        <Transition show={isDelBut}>
          {isDelBut ? (
            <Button danger type='primary' block className='mt-10'>
              <CuIcon icon='delete' size={16} />
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
