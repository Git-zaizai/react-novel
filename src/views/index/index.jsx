import CuIcon from '@/components/cuIcon'
import { CardSkeletons } from '@/components/cardSkeleton'
import { LinkTwo } from '@icon-park/react'
import { randomHexColor } from '@/utlis/themeColor'
import { Space, Input } from 'antd'
import { useStore } from '@/store'

import styles from './index.module.css'
import { memo } from 'react'

const { Search } = Input

function Introduction({ txt }) {
  const [isText, { toggle }] = useToggle('nowrap', 'normal')
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
  tablist = [1, 2, 3, 4, 5]
  return tablist.map((_, i) => (
    <Tag color={randomHexColor()} key={i} className='mt-10 mb-10'>
      {randomHexColor()}
    </Tag>
  ))
}

const TabsMemo = memo(Tabs)

export default () => {
  const { store } = useStore()
  const [loading, setLoading] = useState(true)
  const onChange = checked => {
    setLoading(!checked)
  }

  const arr = Array.from({ length: 3 }).map((_, i) => {
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
  })

  useEffect(() => {
    setTimeout(() => setLoading(!loading), 550)
  }, [])

  const onSearch = e => {}

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
        {store.isSearch && (
          <div className={styles.search}>
            <div className={styles.searchPr}>
              <Search placeholder='小说名' allowClear onSearch={onSearch} />
            </div>
          </div>
        )}
        <div className={styles.view}>
          {Array.from({ length: 30 }).map((_, i) => (
            <Card
              key={i}
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
                    onClick={onDel}
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
                {arr}
              </Space>
              <div className='mt-5'>
                <h4>标签：</h4>
                <TabsMemo />
              </div>
              <Introduction txt='阿斯达大师大师大阿斯达大师大师大数据库等哈手机卡老大哈拉萨科技大好啦卡机手打数据库等哈手机卡老大哈拉萨科技大好啦卡机手打' />
            </Card>
          ))}
        </div>
      </CardSkeletons>
    </>
  )
}
