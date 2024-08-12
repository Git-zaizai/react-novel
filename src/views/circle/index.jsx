import styles from './circle.module.css'

import { Form, Input, Button } from 'antd'
import CuIcon from '@/components/cuIcon'
import ViewCard from '@/components/ViewCard'
import { useToggle } from 'ahooks'
import http from '@/utlis/http'
import { useViewDataStore } from '@/store/viewdata'

const { TextArea } = Input

export default () => {
  const [formRef] = Form.useForm()
  const [isloading, { toggle }] = useToggle()
  const { tabs } = useViewDataStore()

  const onFinish = async value => {
    toggle()
    try {
      if (tabs.includes(value.name)) {
        window.$message.warning(`已有 ${value.anme} ${value.type ? '记录类型' : '标签'}`)
        return
      }

      const findTabName = await http.post('/curd-mongo/find/tabs', {
        where: {
          name: value.name
        }
      })

      if (findTabName.length) {
        window.$message.warning(`已有 ${value.anme} 的申请记录`)
        return
      }

      const response = await http.post('/curd-mongo/add/tabs', {
        data: {
          type: value.type,
          name: value.name,
          txt: value.txt,
          reply: '',
          adddate: new Date()
        }
      })
      if (response?.acknowledged) {
        window.$message.success(`提交申请成功`)
        formRef.setFieldsValue({
          type: 1,
          name: '',
          txt: ''
        })
      }
    } catch (error) {
      window.$message.error('申请失败')
      console.log(error)
    } finally {
      setTimeout(() => {
        toggle()
      }, 1000)
    }
  }

  return (
    <div className={styles.view}>
      <div style={{ height: 'calc(var(--Header-height) + 20px)' }}></div>
      <ViewCard
        className={styles.circleCard}
        title={
          <div className='flex'>
            <CuIcon icon='tag' size='22' color='var(--primary-color)' className='mr-10' />
            <h4 className='wax-100 singe-line'>标签添加申请</h4>
          </div>
        }
      >
        <Form
          form={formRef}
          onFinish={onFinish}
          initialValues={{
            type: 1
          }}
        >
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
            validateTrigger='onBlur'
          >
            <Input placeholder='记录类型与标签 名' allowClear />
          </Form.Item>
          <Form.Item name='txt' validateTrigger='onBlur'>
            <TextArea allowClear placeholder='说明' autoSize={{ minRows: 2, maxRows: 7 }} />
          </Form.Item>
          <Button type='primary' htmlType='submit' className='mt-5' block loading={isloading}>
            提交
          </Button>
        </Form>
      </ViewCard>
    </div>
  )
}
