import styles from './search.module.css'

import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { HamburgerButton } from '@icon-park/react'
import { useState } from 'react'
import { Form } from 'antd'
import http from '@/utlis/http'

const { Search } = Input

export default () => {
  console.log('index 路由页面')

  const [formRef] = Form.useForm()
  const [isCheckboxShow, { toggle }] = useToggle(true)
  const { recordtypes, tabs } = useViewDataStore()
  const [searchlist, setSearchlist] = useState([])

  const onSearch = async (value) => {
    const formdata = formRef.getFieldsValue()
    console.log(formdata)
    const and = []

    if (value) {
      and.push({ title: value })
    }

    for (const key in formdata) {
      if (formdata[key]) {
        and.push({ [key]: formdata[key] })
      }
    }

    const body = {
      $and: and
    }
    const response = await http
      .post('/curd-mongo/find/novel', {
        ops: { many: true },
        where: body
      })
      .catch((e) => {
        window.$message.error('搜索不出东西')
        return Promise.reject(e)
      })
    setSearchlist(response)
  }

  return (
    <>
      <div style={{ height: 100 }}></div>
      <Card
        className={`${styles.search} ${styles.searchcard}`}
        hoverable
        title={
          <Search
            placeholder='名'
            allowClear
            enterButton
            size='large'
            onSearch={onSearch}
          />
        }
      >
        <Transition show={isCheckboxShow}>
          {isCheckboxShow ? (
            <Button
              block
              type='text'
              icon={
                <HamburgerButton
                  theme='outline'
                  size='12'
                  fill='#333'
                />
              }
              onClick={toggle}
            />
          ) : (
            <>
              <Form
                className={styles.searchFormItem}
                form={formRef}
              >
                <Form.Item
                  name='recordtype'
                  label='所有标签'
                  style={{
                    padding: 0
                  }}
                >
                  <Checkbox.Group>
                    {recordtypes.length &&
                      recordtypes.map((item) => (
                        <Checkbox
                          key={item.tab}
                          value={item.tab}
                          style={{ lineHeight: '32px' }}
                        >
                          <Tag color={item.color}>{item.tab}</Tag>
                        </Checkbox>
                      ))}
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item name='tabs'>
                  <Checkbox.Group>
                    {tabs.length &&
                      tabs.map((item) => (
                        <Checkbox
                          key={item.tab}
                          value={item.tab}
                          style={{ lineHeight: '32px' }}
                        >
                          <Tag color={item.color}>{item.tab}</Tag>
                        </Checkbox>
                      ))}
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item name='wanjie'>
                  <Radio.Group className='flex'>
                    <Radio.Button
                      value={1}
                      className='w-100'
                    >
                      <div className='flex-ai-c'>
                        <CuIcon
                          icon='medal'
                          className='mr-10'
                        />
                        完结
                      </div>
                    </Radio.Button>
                    <Radio.Button
                      value={0}
                      className='w-100'
                    >
                      <div
                        className='flex-ai-c'
                        style={{ justifyContent: 'flex-end' }}
                      >
                        连载
                        <CuIcon
                          icon='tag'
                          className='ml-10'
                        />
                      </div>
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>

              <Button
                block
                type='text'
                icon={
                  <HamburgerButton
                    theme='outline'
                    size='12'
                    fill='#333'
                  />
                }
                onClick={toggle}
              />
            </>
          )}
        </Transition>
      </Card>

      <div className={styles.searchScroll}>
        <NovelCardList data={searchlist} />
      </div>
    </>
  )
}
