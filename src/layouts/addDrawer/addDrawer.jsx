import { useStore } from '@/store'
import styles from './css.module.css'
import CuIcon from '@/components/cuIcon'
import { DeleteThree } from '@icon-park/react'
import { Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import http from '@/utlis/http'
import { useViewDataStore } from '@/store/viewdata'
import { isMobile } from '@/utlis'

const { TextArea } = Input

export default () => {
  let initialValues = {
    beizhu: '',
    start: '', // 开始章节
    finish: '', // 结束章节
    duwan: 0, // 是否读完
    isdel: 1, // 软删除
    wanjie: 1,
    link: '', //首链接
    linkback: '', //后续链接
    title: '',
    links: [
      /* {
        linkName: '',
        urli: ''
      } */
    ], // 链接
    tabs: [], // 标签列表
    rate: [] // 评分
  }

  const { tabs, initTabs, novel, setNovelStore } = useViewDataStore()
  const { store, setValueStore } = useStore()
  const [formRef] = Form.useForm()
  const [titleRules, setTitleRules] = useState({
    validateStatus: '',
    message: '',
    hasFeedback: false
  })

  useEffect(() => {
    if (store.isAddDrawer && tabs.length === 0) {
      initTabs().finally(() => {
        if (novel.action === 'updata') {
          formRef.setFieldsValue(novel.data)
        }
      })
    }
  }, [novel.action])

  const bindtitleBlur = e => {
    if (e.target.value === '') {
      setTitleRules({
        validateStatus: 'error',
        message: '名不能为空',
        hasFeedback: false
      })
    } else {
      setTitleRules({
        validateStatus: '',
        message: '',
        hasFeedback: true
      })
    }
  }

  const formfinish = async () => {
    const formdata = await formRef.validateFields()

    if (!formdata.title) {
      setTitleRules({
        validateStatus: 'error',
        message: '名不能为空',
        hasFeedback: false
      })
      return
    }

    if (novel.action === 'add') {
      setTitleRules({
        validateStatus: 'validating',
        message: '',
        hasFeedback: true
      })

      const verifyTitle = await http
        .post('/curd-mongo/find/novel', {
          where: {
            title: formdata.title
          },
          ops: {
            many: true
          }
        })
        .catch(error => {
          setTimeout(() => {
            setTitleRules({
              validateStatus: 'error',
              message: '验证失败，请重新尝试',
              hasFeedback: false
            })
          }, 1000)
          return Promise.reject(error)
        })

      if (verifyTitle.length) {
        setTimeout(() => {
          setTitleRules({
            validateStatus: 'error',
            message: '名，已有',
            hasFeedback: false
          })
        }, 500)
        return
      }
      setTimeout(() => {
        setTitleRules({
          validateStatus: '',
          message: '',
          hasFeedback: true
        })
      }, 500)
    }

    const url = novel.action === 'updata' ? 'update' : 'add'
    const body = novel.action === 'add' ? formdata : Object.assign(novel.data, formdata)
    body.start = Number(body.start)
    body.finish = Number(body.finish)
    const response = await http.post(`/mong/novel/${url}`, body).catch(err => {
      return Promise.reject(err)
    })

    if (response?.acknowledged) {
      if (novel.action === 'add') {
        body._id = response.insertedId
        body.tabs = body.tabs.map(mmv => tabs.find(fv => fv.tab === mmv))
      }

      setNovelStore({
        novelList: [body].concat(novel.novelList)
      })
      setValueStore({ isAddDrawer: !store.isAddDrawer })
      window.$message.success('操作成功')
    } else {
      window.$message.error('操作失败')
    }
  }

  const AddDrawerFooter = (
    <>
      <div className='flex-fdc-aic-juc'>
        <Button type='primary' block htmlType='submit' onClick={() => formfinish()}>
          {novel.action === 'updata' ? '修改' : '添加'}
        </Button>
        <Button
          danger
          type='primary'
          block
          className='mt-10'
          onClick={() => setValueStore({ isAddDrawer: !store.isAddDrawer })}
        >
          返回
        </Button>
      </div>
    </>
  )

  return (
    <Drawer
      title={novel.action === 'updata' ? '修改 Record' : '添加 Record'}
      placement={isMobile() ? 'bottom' : 'right'}
      height='90vh'
      open={store.isAddDrawer}
      onClose={() => setValueStore({ isAddDrawer: !store.isAddDrawer })}
      footer={AddDrawerFooter}
    >
      <Form layout='vertical' form={formRef} initialValues={initialValues} requiredMark={false}>
        <Form.Item
          name='title'
          label='名：'
          hasFeedback={titleRules.hasFeedback}
          validateStatus={titleRules.validateStatus}
          help={titleRules.message}
        >
          <Input placeholder='名' allowClear size='large' onBlur={bindtitleBlur} />
        </Form.Item>

        <Form.Item name='tabs' label='标签：'>
          <Checkbox.Group>
            <Row>
              {tabs.length &&
                tabs.map(item => (
                  <Checkbox key={item.tab} value={item.tab} style={{ lineHeight: '32px' }}>
                    <Tag color={item.color}>{item.tab}</Tag>
                  </Checkbox>
                ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label='章节：'>
          <Space.Compact size='large' className='w-100'>
            <Form.Item name='start'>
              <Input addonBefore='第' placeholder='0' className='text-align' allowClear />
            </Form.Item>
            <div className={styles.zj + ' flex-fdc-aic-juc'}></div>
            <Form.Item name='finish'>
              <Input allowClear addonAfter='章' placeholder='*' className='text-align' />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item name='duwan' label='读完：'>
          <Radio.Group className='flex'>
            <Radio.Button value={0} className='w-100'>
              <div className='flex-ai-c'>
                <CuIcon icon='tag' className='mr-10' />
                未读完
              </div>
            </Radio.Button>
            <Radio.Button value={1} className='w-100'>
              <div className='flex-ai-c' style={{ justifyContent: 'flex-end' }}>
                读完
                <CuIcon icon='medal' className='ml-10' />
              </div>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name='link' label='首链接：'>
          <Input placeholder='首链接' allowClear size='large' />
        </Form.Item>

        <Form.Item name='linkback' label='后续链接：'>
          <Input placeholder='后续链接' allowClear size='large' />
        </Form.Item>

        <Form.Item name='beizhu' label='备注：'>
          <TextArea allowClear placeholder='备注' autoSize={{ minRows: 1, maxRows: 7 }} />
        </Form.Item>

        <Form.Item name='wanjie' label='完结：'>
          <Radio.Group className='flex'>
            <Radio.Button value={1} className='w-100'>
              <div className='flex-ai-c'>
                <CuIcon icon='medal' className='mr-10' />
                完结
              </div>
            </Radio.Button>
            <Radio.Button value={0} className='w-100'>
              <div className='flex-ai-c' style={{ justifyContent: 'flex-end' }}>
                连载
                <CuIcon icon='tag' className='ml-10' />
              </div>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <div className={styles.addLinkForm}>
          <Form.List name='links'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div style={{ position: 'relative' }} key={key}>
                    <Form.Item label={`新链接 - ${key} - ${name}：`} {...restField} name={[name, 'linkName']}>
                      <Input allowClear addonBefore='链接名：' placeholder='名' />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'urli']}>
                      <Input addonBefore='URL：' placeholder='URL' allowClear />
                    </Form.Item>
                    <DeleteThree
                      theme='outline'
                      size='16'
                      style={{
                        color: 'var(--error-color)'
                      }}
                      className={styles.addLinkClose}
                      onClick={() => remove(name)}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button type='dashed' onClick={() => add()} block icon={<CuIcon icon='add' />}>
                    添加新链接
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </Form>
    </Drawer>
  )
}
