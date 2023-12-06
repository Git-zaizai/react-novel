import CuIcon from '@/components/cuIcon'
import { CardSkeletons } from '@/components/cardSkeleton'
import { LinkTwo, TagOne } from '@icon-park/react'
import { randomHexColor } from '@/utlis/themeColor'
import { Space } from 'antd'
import { useStore } from '@/store'
import { memo, useCallback, useMemo } from 'react'
import http from '@/utlis/http'
import { useRequest, useToggle } from 'ahooks'
import { copyText } from '@/utlis'

import styles from './index.module.css'
import { useMount } from 'ahooks'

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
      <span style={{ color: 'var(--text-color-3)' }}>备注：</span>
      {txt}
    </div>
  )
}

function Tabs({ txt }) {
  return (
    txt && (
      <Tag color={randomHexColor()} className='mt-10 mb-10'>
        {txt}
      </Tag>
    )
  )
}

function CardExtra({ start, finish }) {
  if (!start && !finish) {
    return
  }
  return (
    <h4 className={styles.cardExtra + ' ml-10'}>
      第{start || '???'}-{finish || '???'}章
    </h4>
  )
}

const TabsMemo = memo(Tabs)

function LinkButton({ link }) {
  if (!link.urli) {
    return
  }
  return (
    <Button
      type='dashed'
      className={styles.cardbut}
      icon={<LinkTwo theme='outline' size='15' />}
      onClick={() => {
        copyText(link.urli, msg => window.$message.success(msg))
      }}
    >
      {link.linkName}
    </Button>
  )
}

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

function NovelItem({ data, onUpdataNovel, onDelNovel, index }) {
  const dropClick = useCallback(async ({ key }) => {
    if (key === '1') {
      onUpdataNovel(data)
    } else {
      const modalRes = await window.$modal.confirm({
        okText: '删除',
        okType: 'danger',
        maskClosable: true,
        centered: true,
        cancelText: '取消',
        title: '删除小说',
        content: '是否将（删除）'
      })
      if (modalRes) {
        const response = await http
          .post('/react/novel/update', {
            _id: data._id,
            isdel: 0
          })
          .catch(err => {
            window.$message.error('删除失败')
            return Promise.reject(err)
          })

        if (response) {
          onDelNovel(index, data)
          window.$message.success('删除成功')
        }
      }
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
          <h4
            className='wax-100 singe-line'
            onClick={() =>
              copyText(data.title, msg =>
                window.$message.success('复制成功')
              )
            }
          >
            {data.title}
          </h4>
        </div>
      }
      extra={<CardExtra start={data.start} finish={data.finish} />}
    >
      <h4 className='flex-ai-c'>
        <LinkTwo
          theme='outline'
          size='18'
          fill='var(--success-color)'
          className='mr-5'
        />
        链接：
      </h4>
      <Space size={[14, 7]} wrap className='mt-10'>
        <LinkButton link={{ linkName: '首链接', urli: data.link }} />
        <LinkButton link={{ linkName: '后续链接', urli: data.linkback }} />
        {data?.links &&
          data.links.map((v, i) => <LinkButton link={v} key={i} />)}
      </Space>
      <div className='mt-5'>
        <h4 className='flex-ai-c'>
          <TagOne
            theme='outline'
            size='18'
            fill='var(--success-color)'
            className='mr-5 el-transition-color'
          />
          标签：
        </h4>
        {Array.isArray(data?.tabs) &&
          data.tabs.map((v, i) => <TabsMemo txt={`Tab：${v}`} key={i} />)}
      </div>
      <Introduction txt={data.beizhu} />
    </Card>
  )
}

export default () => {
  console.log('index 路由页面')
  console.log('\n')
  const { store, setValueStore, setNovelStore, novelStore } = useStore()

  const { data = [], loading } = useRequest(
    () => http.post('/curd-mongo/find/novel', { ops: { many: true } }),
    {
      loadingDelay: 1000,
      onSuccess: resdata => {
        setNovelStore({ novelList: resdata })
      }
    }
  )

  /*const [loading, { toggle: loadingToggle }] = useToggle(true)

  async function initRequest() {
    const result = await http
      .post('/curd-mongo/find/novel', { ops: { many: true } })
      .catch((e) => {
        return Promise.reject(e)
      })
    setNovelStore({ novelList: result })
    setTimeout(() => loadingToggle(), 1500)
  }

  useMount(() => {
    initRequest()
  }) */

  const onUpdataNovel = useCallback(data => {
    setValueStore({ isAddDrawer: !store.isAddDrawer })
    setNovelStore({ action: 'updata', data })
  }, [])

  const onDelNovel = useCallback(index => {
    novelStore.novelList.splice(index, 1)
    setNovelStore({ novelList: [].concat(novelStore.novelList) })
  }, [])

  const novelItemEl = useMemo(() => {
    return novelStore.novelList.map(item => (
      <NovelItem
        key={item._id}
        data={item}
        onUpdataNovel={onUpdataNovel}
        onDelNovel={onDelNovel}
      />
    ))
  }, [novelStore.novelList])

  return (
    <>
      <CardSkeletons show={loading}>
        <div className={styles.view}>{novelItemEl}</div>
      </CardSkeletons>
    </>
  )
}
