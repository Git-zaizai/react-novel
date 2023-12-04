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
import { useCallback } from 'react'

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
  if (!tablist?.length) {
    return
  }
  return tablist.map((_, i) => (
    <Tag
      color={randomHexColor()}
      key={i}
      className='mt-10 mb-10'
    >
      {randomHexColor()}
    </Tag>
  ))
}

const TabsMemo = memo(Tabs)

const items = [
  {
    key: '1',
    label: <h4 className='text-align'>修改</h4>
  },
  {
    key: '2',
    label: <h4 className='text-align'>删除</h4>
  }
]

function NovelItem({ data, onDelNovel, onUpdataNovel }) {
  const dropClick = useCallback(({ key }) => {
    console.log(key)
    if (key === '1') {
      onUpdataNovel(data)
    } else {
      onDelNovel(data)
    }
  }, [])

  return (
    <Card
      className={styles.cardindex}
      bordered={false}
      hoverable
      title={
        <div className='flex'>
          <Dropdown
            menu={{ items, onClick: dropClick }}
            placement='bottomLeft'
            arrow={{ pointAtCenter: true }}
          >
            <CuIcon
              icon='hot'
              size='22'
              color='var(--primary-color)'
              className='mr-10'
            />
          </Dropdown>
          <h4 className={styles.cardtitle + ' singe-line'}>
            啊实打实大萨达萨达啊撒大声地asdasd
          </h4>
        </div>
      }
      // extra={<h4>第1035-205789章</h4>}
    >
      <h4>链接：</h4>
      <Space
        size={[14, 7]}
        wrap
        className='mt-10'
      >
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <Button
              type='dashed'
              className={styles.cardbut}
              key={i}
              icon={
                <LinkTwo
                  theme='outline'
                  size='15'
                />
              }
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
        <TabsMemo tablist={[1, 2, 3, 4]} />
      </div>
      <Introduction txt='' />
    </Card>
  )
}

export default () => {
  const { store, setValueStore, setNovelStore } = useStore()
  console.log('view index')
  const { data, loading, run, runAsync } = useRequest(
    () => http.get('/curd-mongo/find/novel', { many: true }),
    {
      manual: true
    }
  )
  useMount(() => {
    runAsync().then((res) => {
      console.log(res)
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

  const onUpdataNovel = () => {
    setValueStore({ isAddDrawer: !store.isAddDrawer })
    setNovelStore((v) => ({ ...v, action: 'updata' }))
  }

  return (
    <>
      <CardSkeletons show={loading}>
        <div className={styles.view}>
          {Array.from({ length: 5 }).map((_, i) => (
            <NovelItem
              key={i}
              onDelNovel={onDel}
              onUpdataNovel={onUpdataNovel}
            />
          ))}
        </div>
      </CardSkeletons>
    </>
  )
}
