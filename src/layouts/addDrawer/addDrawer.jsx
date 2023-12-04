import { useStore } from '@/store'
import styles from './css.module.css'
import CuIcon from '@/components/cuIcon'
import { DeleteThree, Star } from '@icon-park/react'
import { Form, Input } from 'antd'
import { useState } from 'react'
import http from '@/utlis/http'

const { TextArea } = Input

export default () => {
  console.log('addDrawer')
  const { store, setValueStore, novelStore, setNovelStore } = useStore()
  const [formRef] = Form.useForm()
  const [titleRules, setTitleRules] = useState({
    validateStatus: '',
    message: '',
    hasFeedback: false
  })

  const bindtitleBlur = (e) => {
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
    console.log(formdata)
    if (!formdata.title) {
      setTitleRules({
        validateStatus: 'error',
        message: '名不能为空',
        hasFeedback: false
      })
      return
    }
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
      .catch((error) => {
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

    const url = novelStore.action === 'updata' ? 'update' : 'add'
    const response = await http
      .post(`/curd-mongo/${url}/novel`, {
        where: { title: formdata.title },
        data: formdata
      })
      .catch((err) => {
        window.$message.error('添加失败')
        return Promise.reject(err)
      })
    console.log(response)
    setNovelStore((v) => ({
      ...v,
      novelList: [...v.novelList, { _id: response.insertedId, ...formdata }]
    }))
    setValueStore({ isAddDrawer: !store.isAddDrawer })
    window.$message.success('添加成功')
  }

  const AddDrawerFooter = (
    <>
      <div className='flex-fdc-aic-juc'>
        <Button
          type='primary'
          block
          htmlType='submit'
          onClick={() => formfinish()}
        >
          {novelStore.action === 'updata' ? '修改' : '添加'}
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
      title={novelStore.action === 'updata' ? '修改 Record' : '添加 Record'}
      placement='bottom'
      open={store.isAddDrawer}
      onClose={() => setValueStore({ isAddDrawer: !store.isAddDrawer })}
      footer={AddDrawerFooter}
      height='90vh'
    >
      <Form
        layout='vertical'
        form={formRef}
        initialValues={{
          recommended: 0,
          duwan: 0
        }}
      >
        <Form.Item
          name='recordtype'
          label='记录类型：'
          rules={[
            {
              required: true,
              message: '请选择一个'
            }
          ]}
        >
          <Checkbox.Group>
            <Row>
              {Array.from({ length: 6 }).map((_, i) => (
                <Checkbox
                  key={i}
                  value={i}
                  style={{ lineHeight: '32px' }}
                >
                  {`${i * i}阿啊`}
                </Checkbox>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name='title'
          label='名：'
          hasFeedback={titleRules.hasFeedback}
          validateStatus={titleRules.validateStatus}
          help={titleRules.message}
        >
          <Input
            placeholder='名'
            allowClear
            size='large'
            onBlur={bindtitleBlur}
          />
        </Form.Item>

        <Form.Item label='章节：'>
          <Space.Compact
            size='large'
            className='w-100'
          >
            <Form.Item name='start'>
              <Input
                addonBefore='第'
                placeholder='0'
                className='text-align'
                allowClear
              />
            </Form.Item>
            <div className={styles.zj + ' flex-fdc-aic-juc'}></div>
            <Form.Item name='finish'>
              <Input
                allowClear
                addonAfter='章'
                placeholder='*'
                className='text-align'
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          name='duwan'
          label='读完：'
        >
          <Radio.Group className='flex'>
            <Radio.Button
              value={0}
              className='w-100'
            >
              <div className='flex-ai-c'>
                <CuIcon
                  icon='tag'
                  className='mr-10'
                />
                未读完
              </div>
            </Radio.Button>
            <Radio.Button
              value={1}
              className='w-100'
            >
              <div
                className='flex-ai-c'
                style={{ justifyContent: 'flex-end' }}
              >
                读完
                <CuIcon
                  icon='medal'
                  className='ml-10'
                />
              </div>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name='link'
          label='首链接：'
        >
          <Input
            placeholder='首链接'
            allowClear
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='linkback'
          label='后续链接：'
        >
          <Input
            placeholder='后续链接'
            allowClear
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='beizhu'
          label='备注：'
        >
          <TextArea
            allowClear
            placeholder='备注'
            autoSize={{ minRows: 1, maxRows: 7 }}
          />
        </Form.Item>

        <Form.Item
          name='tabs'
          label='标签：'
        >
          <Checkbox.Group>
            <Row>
              {Array.from({ length: 10 }).map((_, i) => (
                <Checkbox
                  key={i}
                  value={i}
                  style={{ lineHeight: '32px' }}
                >
                  {`${i * i}`}
                </Checkbox>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <div className={styles.addLinkForm}>
          <Form.List name='links'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    style={{ position: 'relative' }}
                    key={key}
                  >
                    <Form.Item
                      label={`新链接 - ${key} ：`}
                      {...restField}
                      name={[name, 'linkName']}
                    >
                      <Input
                        allowClear
                        addonBefore='链接名：'
                        placeholder='名'
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'linkitem']}
                    >
                      <Input
                        addonBefore='URL：'
                        placeholder='URL'
                        allowClear
                      />
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
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<CuIcon icon='add' />}
                  >
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
