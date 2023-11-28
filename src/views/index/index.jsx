import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import { Avatar, Card, Skeleton, Switch } from 'antd'
import CuIcon from '@/components/cuIcon'

import styles from './index.module.css'

const { Meta } = Card
const App = () => {
  const [loading, setLoading] = useState(true)
  const onChange = (checked) => {
    setLoading(!checked)
  }

  const arr = Array.from({ length: 5 }).map(() => {
    return (
      <Button
        type='primary'
        size='small'
        className={styles.cardbut}
      >
        复制首链接
      </Button>
    )
  })

  return (
    <>
      <div className={styles.view}>
        <Card
          bordered={false}
          title={
            <div className='flex'>
              <CuIcon
                icon='hot'
                size='22'
              />
              <h4 className={styles.cardtitle + ' singe-line'}>
                啊实打实大萨达萨达啊撒大声地
              </h4>
            </div>
          }
          extra={<h4>第1035-205789章</h4>}
        >
          <div className={'flex ' + styles.cardtab}>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
            <Tag color='green'>green</Tag>
          </div>
          <div className={styles.cardbody + ' flex'}>{arr}</div>
        </Card>
      </div>
    </>
  )
}
export default App
