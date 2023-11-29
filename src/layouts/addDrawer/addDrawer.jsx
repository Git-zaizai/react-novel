import Transition from '@/components/Transition'
import { useStore } from '@/store'
import { Back } from '@icon-park/react'
import { useToggle } from 'ahooks'
import styles from './css.module.css'
import CuIcon from '@/components/cuIcon'

export default () => {
  const { store, setValueStore } = useStore()
  const [isLinkShow, { toggle: isLinkShowtoggle }] = useToggle(false)

  const AddDrawerFooter = (
    <>
      <div className='flex-fdc-aic-juc'>
        <Button type='primary' className='w-100'>
          添加
        </Button>
        <Button danger type='primary' className='mt-10 w-100'>
          删除
        </Button>
      </div>
    </>
  )

  return (
    <Drawer
      title='添加 Novel'
      placement='bottom'
      open={store.isAddDrawer}
      onClose={() => setValueStore({ isAddDrawer: !store.isAddDrawer })}
      footer={AddDrawerFooter}
      height='90vh'
    >
      <Form layout='vertical'>
        <Form.Item>
          <Radio.Group defaultValue='a' className='flex'>
            <Radio value='a' className='w-100'>
              小说
            </Radio>
            <Radio value='b' className='w-100'>
              推荐
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='名：'>
          <Input placeholder='名' allowClear size='large' />
        </Form.Item>

        <Form.Item label='节：'>
          <Space.Compact size='large'>
            <Input
              addonBefore='第'
              placeholder='0'
              addonAfter='-'
              className='text-align'
              allowClear
            />
            <Input
              allowClear
              addonAfter='章'
              placeholder='*'
              className='text-align'
            />
          </Space.Compact>
        </Form.Item>

        <Form.Item label='读完：'>
          <Radio.Group defaultValue='a' className='flex'>
            <Radio.Button value='a' className='w-100'>
              小说
            </Radio.Button>
            <Radio.Button value='b' className='w-100'>
              推荐
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='首链接：'>
          <Input placeholder='首链接' allowClear size='large' />
        </Form.Item>

        <Form.Item label='后续链接：'>
          <Input placeholder='后续链接' allowClear size='large' />
        </Form.Item>

        {/*     <Form.Item
          label='新链接'
          style={{ position: 'relative' }}
        >
          <Input
            addonBefore='链接名：'
            placeholder='...'
          />
          <Input
            addonBefore='URL：&emsp;'
            placeholder='URL'
            className='mt-10'
          />
          <CloseCircleOutlined className={styles.addLinkClose} />
        </Form.Item> */}

        <Transition show={isLinkShow}>
          {isLinkShow ? (
            <Button
              className='w-100'
              type='dashed'
              icon={<CuIcon icon='add' />}
              onClick={isLinkShowtoggle}
            >
              添加链接
            </Button>
          ) : (
            <>
              <div className={styles.addLinkForm}>
                <Form.List name='users'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Form.Item
                          label='新链接'
                          {...restField}
                          name={[name, 'first']}
                          style={{ position: 'relative' }}
                        >
                          <Input
                            allowClear
                            addonBefore='链接名：'
                            placeholder='名'
                          />
                          <Input
                            addonBefore='URL：'
                            placeholder='URL'
                            className='mt-10'
                            allowClear
                          />
                          <CloseCircleOutlined
                            className={styles.addLinkClose}
                            onClick={() => remove(name)}
                          />
                        </Form.Item>
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

                <Button
                  className='w-100'
                  icon={<Back theme='outline' size='14' />}
                  onClick={isLinkShowtoggle}
                >
                  返回
                </Button>
                {/* <Card>
                  <Form.Item label='添加Link：'>
                    <Input placeholder='' />
                  </Form.Item>
                  <Form.Item label='添加Link：'>
                    <Input placeholder='' />
                  </Form.Item>
                  <Button
                    className='w-100'
                    type='dashed'
                    danger
                    icon={<SwapOutlined />}
                    onClick={isLinkShowtoggle}
                  >
                    返回
                  </Button>
                </Card> */}
              </div>
            </>
          )}
        </Transition>
      </Form>
    </Drawer>
  )
}
