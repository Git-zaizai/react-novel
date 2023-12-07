import styles from './search.module.css'

import { useToggle } from 'ahooks'
import { HamburgerButton } from '@icon-park/react'
import { Input, Card, Form } from 'antd'
import Transition from '@/components/Transition'

import CuIcon from '@/components/cuIcon'
import { CardSkeletons } from '@/components/cardSkeleton'
import { LinkTwo } from '@icon-park/react'
import { randomHexColor } from '@/utlis/themeColor'
import { Space } from 'antd'
import { useStore } from '@/store'
import { memo } from 'react'
import http from '@/utlis/http'
import { useRequest } from 'ahooks'

const { Search } = Input

function Introduction({ txt }) {
  const [isText, { toggle }] = useToggle('nowrap', 'normal')
  return (
    <div
      onClick={toggle}
      style={{ whiteSpace: isText }}
      className={styles.carppeizhu + ' singe-line mt-15'}
    >
      {txt}
    </div>
  )
}

function Tabs({ tablist }) {
  tablist = [1, 2, 3, 4, 5]
  return tablist.map((_, i) => (
    <Tag
      color={randomHexColor()}
      key={i}
      className='mt-10 mb-10'
    >
      {randomHexColor()}
    </Tag>
  ))
}

const TabsMemo = memo(Tabs)

export default () => {
  const { store } = useStore()
  const [formRef] = Form.useForm()
  const [isCheckboxShow, { toggle }] = useToggle(true)

  const onSearch = () => {}

  const { data, error, loading } = useRequest(() =>
    http.post('http://localhost:7373/getjson/', {
      ph: 'rootConfig.json'
    })
  )

  const arr = Array.from({ length: 3 }).map((_, i) => {
    return (
      <Button
        type='dashed'
        className={styles.cardbut}
        key={i}
        icon={
          <LinkTwo
            theme='outline'
            size='15'
          />
        }
        onClick={() => {
          window.$message.success('复制链接')
        }}
      >
        复制 {'i =' + i}
      </Button>
    )
  })

  const onDel = async () => {
    const modalRes = await window.$modal.confirm({
      okText: '删除',
      okType: 'danger',
      maskClosable: true,
      centered: true,
      cancelText: '取消',
      title: '删除小说',
      content: '是否将（删除）'
    })
  }
  return (
    <div>
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
            <Form>
              <Form.Item
                name='tabs'
                label='标签：'
                from={formRef}
              >
                <Checkbox.Group>
                  <Row>
                    <Col>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <Checkbox
                          key={i}
                          value={i}
                          style={{ lineHeight: '32px' }}
                        >
                          {`${i * i}`}
                        </Checkbox>
                      ))}
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
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
            </Form>
          )}
        </Transition>
      </Card>

      <div className={styles.searchScroll}>
        {Array.from({ length: 30 }).map((_, i) => (
          <Card
            key={i}
            className={[styles.cardindex, styles.cardItem]}
            bordered={false}
            hoverable
            title={
              <div className='flex'>
                <CuIcon
                  icon='hot'
                  size='22'
                  color='var(--primary-color)'
                  className='mr-10'
                  onClick={onDel}
                />
                <h4 className={styles.cardtitle + ' singe-line'}>
                  啊实打实大萨达萨达啊撒大声地asdasd
                </h4>
              </div>
            }
            extra={<h4>第1035-205789章</h4>}
          >
            <h4>链接：</h4>
            <Space
              size={[14, 7]}
              wrap
              className='mt-10'
            >
              {arr}
            </Space>
            <div className='mt-5'>
              <h4>标签：</h4>
              <TabsMemo />
            </div>
            <Introduction txt='阿斯达大师大师大阿斯达大师大师大数据库等哈手机卡老大哈拉萨科技大好啦卡机手打数据库等哈手机卡老大哈拉萨科技大好啦卡机手打' />
          </Card>
        ))}
      </div>
    </div>
  )
}
