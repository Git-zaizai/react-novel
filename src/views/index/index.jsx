import CuIcon from '@/components/cuIcon'
import { CardSkeletons } from '@/components/cardSkeleton'
import { LinkOutlined } from '@ant-design/icons'

import styles from './index.module.css'
import { Space } from 'antd'

const App = () => {
  const [loading, setLoading] = useState(true)
  const onChange = (checked) => {
    setLoading(!checked)
  }

  const arr = Array.from({ length: 5 }).map((_, i) => {
    return (
      <Button
        type='dashed'
        className={styles.cardbut}
        key={i}
        icon={<LinkOutlined />}
        onClick={() => {
          window.$message.success('复制链接')
        }}
      >
        复制 {'i =' + i}
      </Button>
    )
  })

  useEffect(() => {
    setTimeout(() => setLoading(!loading), 1000)
  }, [])

  return (
    <>
      <CardSkeletons show={loading}>
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
            <Space
              size={[14, 7]}
              wrap
            >
              {arr}
            </Space>
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
