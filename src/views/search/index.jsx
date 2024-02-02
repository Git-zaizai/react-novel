import styles from './search.module.css'

import ButtonCheckboxGroup from '@/components/buttonCheckboxGroup'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'
import NovelCardList from '@/components/novelCard'
import { HamburgerButton } from '@icon-park/react'
import { SearchOutlined } from '@ant-design/icons'

import { useViewDataStore } from '@/store/viewdata'
import { useState, useEffect } from 'react'
import { Form } from 'antd'
import http from '@/utlis/http'
import { useDebounceFn } from 'ahooks'
import { isMobile } from '@/utlis'

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
      console.log(tabs)
      mv.tabs = mv.tabs.map(mmv => {
        console.log(
          tabs.find(fv => fv.tab === mmv),
          mmv
        )
        return tabs.find(fv => fv.tab === mmv)
      })
      return mv
    })
    console.log(fles)
    response = fles
    setSearchlist(response)
  }

  const bindList = () => {
    setSearchlist(novel.novelList.slice(0, 10))
  }

  const { run } = useDebounceFn(
    val => {
      const { scrollHeight, clientHeight, scrollTop } = val.target
      const top = clientHeight + scrollTop + 400
      if (page < novel.novelList.length - 1 && top >= scrollHeight) {
        setSearchlist(arr => arr.concat(novel.novelList.slice(page, page + 20)))
        setPage(page + 20)
      }
    },
    {
      wait: 300
    }
  )
  useEffect(() => {
    const view = document.querySelector('#zaiViewId')
    view.addEventListener('scroll', run)

    if (novel.novelList.length) {
      setSearchlist(novel.novelList.slice(0, 10))
    }
    return () => {
      view.removeEventListener('scroll', run)
    }
  }, [])

  return (
    <>
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

      <div className={styles.searchScroll} style={{ height: searchlist.length ? 'auto' : '60vh' }}>
        <div style={{ width: '100vw', height: isMobile() ? '76px' : '100px' }}></div>
        {searchlist.length ? (
          <NovelCardList data={searchlist} />
        ) : (
          <div className='flex-fdc-aic-juc w-100-vw cursor-pointer'>
            <CuIcon onClick={bindList} icon='refresh' size={50} color={'var(--icon-color-disabled)'} />
          </div>
        )}
      </div>
    </>
  )
}
