import styles from './search.module.css'

import ButtonCheckboxGroup from '@/components/buttonCheckboxGroup'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'
import NovelCardList from '@/components/novelCard'
import { HamburgerButton } from '@icon-park/react'
import { SearchOutlined } from '@ant-design/icons'
import DropdownPullup from '@/components/DropdownPullup'

import { useViewDataStore } from '@/store/viewdata'
import { useState, useEffect } from 'react'
import { Form } from 'antd'
import http from '@/utlis/http'

const typeOptions = [
  {
    icon: <CuIcon icon='medal' className='mr-10' isTransiton={false} />,
    align: 'left',
    txt: '完结'
  },
  {
    icon: <CuIcon icon='tag' className='ml-10' isTransiton={false} />,
    align: 'right',
    txt: '连载'
  }
]

export default () => {
  console.log('search 路由页面')

  const [formRef] = Form.useForm()
  const [isCheckboxShow, { toggle }] = useToggle(true)
  const { tabs, novel } = useViewDataStore()
  const [searchlist, setSearchlist] = useState([])
  const [page, setPage] = useState(10)
  const inputRef = useRef()
  const { initTabs, initNovel } = useViewDataStore()

  const bindList = async callback => {
    try {
      if (!novel.novelList.length) {
        await initTabs()
        await initNovel()
      }
    } finally {
      setTimeout(() => {
        callback && callback()
      }, 1000)
    }
  }

  useEffect(() => {
    setSearchlist(novel.novelList.slice(0, 10))
  }, [novel.novelList])

  const onSearch = async () => {
    const and = []

    const value = inputRef.current.input.value
    if (value) {
      and.push({ title: value })
    }

    if (!isCheckboxShow && formRef) {
      const formdata = formRef.getFieldsValue()
      if (formdata.wanjie.value) {
        formdata.wanjie = formdata.wanjie.index
      }

      for (const key in formdata) {
        if (formdata[key]) {
          and.push({ [key]: formdata[key] })
        }
      }
    }

    console.log(and)
    if (!and.length) {
      return
    }
    const body = {
      $and: and
    }
    let response = await http
      .post('/curd-mongo/find/novel', {
        ops: { many: true },
        where: body
      })
      .catch(e => {
        window.$message.error('搜索不出东西')
        return Promise.reject(e)
      })

    let fles = response.map(mv => {
      mv.tabs = mv.tabs.map(mmv => {
        console.log(
          tabs.find(fv => fv.tab === mmv),
          mmv
        )
        return tabs.find(fv => fv.tab === mmv)
      })
      return mv
    })
    response = fles
    setSearchlist(response)
  }

  const onPullup = callback => {
    if (page + 10 < novel.novelList.length - 1) {
      setSearchlist(list => {
        return list.concat(novel.novelList.slice(page, page + 10))
      })
      setPage(page + 10)
      callback()
    } else {
      callback({
        text: '没有更多了',
        iconShow: false
      })
    }
  }

  return (
    <>
      <div className='h-100-vh'>
        <Card
          className={`${styles.search} ${styles.searchcard}`}
          hoverable
          title={
            <>
              <div className={styles.searchtitle + ' flex-ai-c'}>
                <Input placeholder='名' variant='filled' type='Primary' ref={inputRef} />
                <Button className='ml-5' onClick={onSearch}>
                  <SearchOutlined />
                </Button>

                {/* <Search placeholder='名' allowClear size='large' onSearch={onSearch} /> */}
                <Button type='text' className='ml-5' onClick={toggle}>
                  <HamburgerButton theme='outline' size='26' fill={isCheckboxShow ? '#333' : 'var(--primary-color)'} />
                </Button>
              </div>
            </>
          }
        >
          <Transition show={isCheckboxShow}>
            {isCheckboxShow ? (
              <p></p>
            ) : (
              <>
                <Form className={styles.searchFormItem} form={formRef}>
                  <Form.Item name='tabs'>
                    <Checkbox.Group>
                      {tabs.length &&
                        tabs.map(item => (
                          <Checkbox key={item.tab} value={item.tab} style={{ lineHeight: '32px' }}>
                            <Tag color={item.color}>{item.tab}</Tag>
                          </Checkbox>
                        ))}
                    </Checkbox.Group>
                  </Form.Item>

                  <Form.Item name='wanjie' className='mt-10'>
                    <ButtonCheckboxGroup options={typeOptions} />
                  </Form.Item>
                </Form>
              </>
            )}
          </Transition>
        </Card>
        <DropdownPullup
          onEnd={bindList}
          onPullup={onPullup}
          isMount={false}
          headerPosition={<div style={{ height: 'calc(var(--Header-height) + 20px)' }}></div>}
        >
          <div className='flex-ai-c flex-wrap'>
            <NovelCardList data={searchlist} />
          </div>
        </DropdownPullup>
      </div>
    </>
  )
}
