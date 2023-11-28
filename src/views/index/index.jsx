import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import { Avatar, Card, Skeleton, Switch, Flex } from 'antd'
import CuIcon from '@/components/cuIcon'
import { CardSkeletons } from '@/components/cardSkeleton'

import styles from './index.module.css'
import { useEffect } from 'react'

const { Meta } = Card
const App = () => {
  const [loading, setLoading] = useState(true)
  const onChange = checked => {
    setLoading(!checked)
  }

  const arr = Array.from({ length: 5 }).map(v => {
    return (
      <Button type='primary' className={styles.cardbut} key={v}>
        复制链接
      </Button>
    )
  })

  return (
    <>
      <Button
        onClick={() => {
          console.log(loading)
          setLoading(!loading)
        }}
        key='askjdh'
      >
        爱的速递
      </Button>
      <CardSkeletons show={loading}>
        <div className={styles.view}>
          <Card
            bordered={false}
            title={
              <div className='flex'>
                <CuIcon icon='hot' size='22' />
                <h4 className={styles.cardtitle + ' singe-line'}>
                  啊实打实大萨达萨达啊撒大声地
                </h4>
              </div>
            }
            extra={<h4>第1035-205789章</h4>}
          >
            <div className={styles.cardbody + ' flex'}>{arr}</div>
            <div className={'flex ' + styles.cardtab}>
              <h4>标签：</h4>
              <Tag>green</Tag>
              <Tag>green</Tag>
              <Tag>green</Tag>
              <Tag>green</Tag>
              <Tag>green</Tag>
              <Tag>green</Tag>
              <Tag>green</Tag>
              <Tag>green</Tag>
              <Tag>green</Tag>
            </div>
            <div className={styles.carppeizhu}>
              阿什利等哈蓝思科技等哈立卡手机哈打蜡卡手机哈阿什利等哈蓝思科技等哈立卡手机哈打蜡卡手机哈阿什利等哈蓝思科技等哈立卡手机哈打蜡卡手机哈
            </div>
          </Card>
        </div>
      </CardSkeletons>
    </>
  )
}
export default App
