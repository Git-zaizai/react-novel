import { FrownOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default () => {
  const navigate = useNavigate()

  const [sun, setSun] = useState(0)

  useEffect(() => {
    console.log(sun)

    setSun(sun + 1)
  }, [])

  return (
    <div className="flex-fdc-aic-juc h-100-vh">
      <FrownOutlined style={{ fontSize: '60px', color: 'var(--warning-color)' }} />
      <h2
        className="mt-20"
        style={{ color: 'var(--warning-color)' }}
      >
        404，没有找到页面
      </h2>
      <Button
        type="default"
        style={{ borderColor: 'var(--warning-color)', width: '40vw', color: 'var(--warning-color)' }}
        className="mt-20"
        onClick={() => navigate(-1)}
      >
        返回
      </Button>
      <Button
        type="default"
        style={{ width: '40vw' }}
        className="mt-20"
        onClick={() => navigate('/')}
      >
        返回首页
      </Button>
    </div>
  )
}
