import { useStore } from '@/store'
import styles from './css.module.css'
import CuIcon from '@/components/cuIcon'
import { DeleteThree, Star } from '@icon-park/react'
import { Form } from 'antd'

export default () => {
  const { store, setValueStore } = useStore()
  const [formRef] = Form.useForm()

  const formfinish = () => {
    console.log(formRef.getFieldsValue())
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
          添加
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
      title='添加 Novel'
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
        <Form.Item name='recommended'>
          <Radio.Group className='flex'>
            <Radio.Button
              value={0}
              className='w-100'
            >
              <div className='flex-ai-c'>
                <Star
                  theme='outline'
                  size='16'
                  className='mr-10'
                />
                小说
              </div>
            </Radio.Button>
            <Radio.Button
              value={1}
              className='w-100'
            >
              <div
                className='flex-ai-c'
                style={{
                  justifyContent: 'flex-end'
                }}
              >
                推荐
                <Star
                  theme='outline'
                  size='16'
                  className='ml-10'
                />
              </div>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name='title'
          label='小说名：'
        >
          <Input
            placeholder='名'
            allowClear
            size='large'
          />
        </Form.Item>

        <Form.Item
          name='chapter'
          label='章节：'
        >
          <Space.Compact
            size='large'
            className='w-100'
          >
            <Input
              addonBefore='第'
              placeholder='0'
              className='text-align'
              allowClear
            />
            <div className={styles.zj}></div>
            <Input
              allowClear
              addonAfter='章'
              placeholder='*'
              className='text-align'
            />
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
              未读完
            </Radio.Button>
            <Radio.Button
              value={1}
              className='w-100'
            >
              读完
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
