import styles from './search.module.css'

import ButtonCheckboxGroup from '@/components/buttonCheckboxGroup'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { HamburgerButton } from '@icon-park/react'
import { useState } from 'react'
import { Form } from 'antd'
import http from '@/utlis/http'

const { Search } = Input

const typeOptions = [
  {
    icon: (
      <CuIcon
        icon='medal'
        className='mr-10'
        isTransiton={false}
      />
    ),
    align: 'left',
    txt: '完结'
  },
  {
    icon: (
      <CuIcon
        icon='tag'
        className='ml-10'
        isTransiton={false}
      />
    ),
    align: 'right',
    txt: '连载'
  }
]

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
    let response = await http
      .post('/curd-mongo/find/novel', {
        ops: { many: true },
        where: body
      })
      .catch((e) => {
        window.$message.error('搜索不出东西')
        return Promise.reject(e)
      })
    response = response.map((mv) => {
      mv.recordtype = mv.recordtype.map((v) =>
        recordtypes.find((fv) => fv.tab === v)
      )
      mv.tabs = mv.tabs.map((mmv) => tabs.find((fv) => fv.tab === mmv))
      return mv
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

                <Form.Item
                  name='wanjie'
                  className='mt-10'
                >
                  <ButtonCheckboxGroup options={typeOptions} />
                </Form.Item>
              </Form>

              <Button
                block
                className='mt-10'
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
