import CuIcon from '@/components/cuIcon'
import { CardSkeletons } from '@/components/cardSkeleton'
import { LinkTwo } from '@icon-park/react'
import { randomHexColor } from '@/utlis/themeColor'
import { Space } from 'antd'
import { useStore } from '@/store'
import { memo } from 'react'
import http from '@/utlis/http'
import { useRequest, useMount } from 'ahooks'

import styles from './index.module.css'

function Introduction({ txt }) {
  const [isText, { toggle }] = useToggle('nowrap', 'normal')
  if (!txt) {
    return
  }
  return (
    <div
      onClick={toggle}
      style={{ whiteSpace: isText }}
      className={styles.carppeizhu + ' singe-line mt-15'}
    >
      {txt}
    </div>
  )
}

function Tabs({ tablist }) {
  // tablist = [1, 2, 3, 4, 5]
  if (!tablist?.length) {
    return
  }
  return tablist.map((_, i) => (
    <Tag color={randomHexColor()} key={i} className='mt-10 mb-10'>
      {randomHexColor()}
    </Tag>
  ))
}

const TabsMemo = memo(Tabs)
function NovelItem({ data, onDelNovel }) {
  return (
    <Card
      className={styles.cardindex}
      bordered={false}
      hoverable
      title={
        <div className='flex'>
          <CuIcon
            icon='hot'
            size='22'
            color='var(--primary-color)'
            className='mr-10'
            onClick={() => onDelNovel && onDelNovel(data)}
          />
          <h4 className={styles.cardtitle + ' singe-line'}>
            啊实打实大萨达萨达啊撒大声地asdasd
          </h4>
        </div>
      }
      extra={<h4>第1035-205789章</h4>}
    >
      <h4>链接：</h4>
      <Space size={[14, 7]} wrap className='mt-10'>
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <Button
              type='dashed'
              className={styles.cardbut}
              key={i}
              icon={<LinkTwo theme='outline' size='15' />}
              onClick={() => {
                window.$message.success('复制链接')
              }}
            >
              复制 {'i =' + i}
            </Button>
          )
        })}
      </Space>
      <div className='mt-5'>
        <h4>标签：</h4>
        <TabsMemo />
      </div>
      <Introduction txt='' />
    </Card>
  )
}

export default () => {
  const { store } = useStore()

  const { data, loading, runAsync } = useRequest(() => http.get('/show-dbs'), {
    manual: true
  })
  useMount(() => {
    runAsync().then(() => {
      window.$message.success('请求')
    })
  })

  const onDel = async () => {
    const modalRes = await window.$modal.confirm({
      okText: '删除',
      okType: 'danger',
      maskClosable: true,
      centered: true,
      cancelText: '取消',
      title: '删除小说',
      content: '是否将（删除）'
    })
  }

  return (
    <>
      <CardSkeletons show={loading}>
        <div className={styles.view}>
          {Array.from({ length: 30 }).map((_, i) => (
            <NovelItem key={i} />
          ))}
        </div>
      </CardSkeletons>
    </>
  )
}
