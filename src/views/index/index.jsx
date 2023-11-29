import CuIcon from '@/components/cuIcon'
import { CardSkeletons } from '@/components/cardSkeleton'
import { LinkTwo } from '@icon-park/react'
import { randomHexColor } from '@/utlis/themeColor'
import { Space, Input } from 'antd'
import { useStore } from '@/store'

import styles from './index.module.css'

const { Search } = Input
const App = () => {
  const { store } = useStore()
  const [loading, setLoading] = useState(true)
  const onChange = checked => {
    setLoading(!checked)
  }

  const arr = Array.from({ length: 5 }).map((_, i) => {
    return (
      <Button
        type='dashed'
        className={styles.cardbut}
        key={i}
        icon={<LinkTwo theme='outline' size='15' fill={randomHexColor()} />}
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

  function Introduction(props) {
    const [isText, { toggle }] = useToggle('nowrap', 'normal')
    return (
      <div
        onClick={toggle}
        style={{ whiteSpace: isText }}
        className={styles.carppeizhu + ' singe-line mt-10'}
      >
        {props}
      </div>
    )
  }
  const onSearch = e => {}

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
          <Card
            bordered={false}
            title={
              <div className='flex'>
                <CuIcon icon='hot' size='22' />
                <h4 className={styles.cardtitle + ' singe-line'}>
                  啊实打实大萨达萨达啊撒大声地asdasd
                </h4>
              </div>
            }
            extra={<h4>第1035-205789章</h4>}
          >
            <Space size={[14, 7]} wrap>
              {arr}
            </Space>
            <Space size={[0, 5]} wrap className='mt-10'>
              <h4>标签：</h4>
              {Array.from({ length: 6 }).map((_, i) => {
                return (
                  <Tag color={randomHexColor()} key={i}>
                    {randomHexColor()}
                  </Tag>
                )
              })}
            </Space>
            {Introduction(
              '啊垦利街道哈喽蛇口街道哈拉刷卡机等哈索拉卡登记哈索拉卡接啊好理发卡合法科技吧哇哇哇哇哇哇微辣科技八点接娃嗯拉倒科技趣闻不良贷款加完班芭芭拉未打卡几把网络科技别忘了科技别忘了科技别忘了科技别忘了科技别忘了看吧'
            )}
          </Card>
        </div>
      </CardSkeletons>
    </>
  )
}
export default App
