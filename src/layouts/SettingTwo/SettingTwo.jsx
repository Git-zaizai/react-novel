import { useStore } from '@/store'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import Transition from '@/components/Transition'
import { useToggle } from 'ahooks'
import CuIcon from '@/components/cuIcon'

export default () => {
  const { store, setValueStore } = useStore()

  const [isLogin, { toggle }] = useToggle(true)

  return (
    <Drawer
      title='设置'
      placement='left'
      open={store.isSettingTwo}
      onClose={() => setValueStore({ isSettingTwo: !store.isSettingTwo })}
      width='80vw'
    >
      <div className='flex-fdc h-100'>
        <Input.Password
          size='large'
          allowClear
          placeholder='秘钥'
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Transition show={isLogin}>
          {isLogin ? (
            <Button
              type='primary'
              className='mt-10'
              block
              onClick={() => toggle()}
            >
              获取秘钥
            </Button>
          ) : (
            <Button
              type='primary'
              className='mt-10'
              block
              danger
              onClick={() => toggle()}
            >
              清楚秘钥
            </Button>
          )}
        </Transition>

        <Space
          direction='vertical'
          size='middle'
          className='mt-20'
          style={{ display: 'flex' }}
        >
          <Button
            block
            type='dashed'
            icon={<CuIcon icon='down' />}
          >
            导出数据库表
          </Button>
          <Button
            block
            type='dashed'
            icon={<CuIcon icon='down' />}
          >
            导出本地数据
          </Button>
        </Space>

        <Button
          block
          type='primary'
          danger
          style={{ marginTop: 'auto' }}
          icon={<CuIcon icon='delete' />}
        >
          删除本地数据
        </Button>
      </div>
    </Drawer>
  )
}
