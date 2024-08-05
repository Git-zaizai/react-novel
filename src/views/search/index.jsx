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

const showOptions = [
  {
    icon: <CuIcon icon='medal' className='mr-10' isTransiton={false} />,
    align: 'left',
    txt: '隐藏'
  },
  {
    icon: <CuIcon icon='tag' className='ml-10' isTransiton={false} />,
    align: 'right',
    value: true,
    txt: '显示'
  }
]

let isonSearch = false

export default () => {
  console.log('search 路由页面')

  const [formRef] = Form.useForm()
  const [isCheckboxShow, { toggle }] = useToggle(true)
  const { tabs, novel, initTabs, initNovel } = useViewDataStore()
  const [searchlist, setSearchlist] = useState([])
  const [page, setPage] = useState(10)
  const [inputValue, setInput] = useState('')

  useEffect(() => {
    bindList()
  }, [novel.novelList])

  const bindList = async callback => {
    try {
      if (!novel.novelList.length) {
        await initTabs()
        await initNovel()
      }
    } finally {
      setSearchlist(novel.novelList.slice(0, 10))
      setInput('')
      !isCheckboxShow && formRef.resetFields()
      isonSearch = false
      setTimeout(() => {
        callback && callback()
      }, 3000)
    }
  }

  const onSearch = async () => {
    isonSearch = true
    const and = []
    const or = []

    if (inputValue) {
      or.push({
        title: {
          $regex: inputValue
        }
      })
      or.push({
        beizhu: {
          $regex: inputValue
        }
      })
    }

    if (formRef) {
      const formdata = formRef.getFieldsValue()
      console.log('🚀 ~ onSearch ~ formdata:', formdata)

      if (formdata.tabs) {
        formdata.tabs.forEach(item => {
          or.push({ tabs: item })
        })
      }

      if (formdata.wanjie?.value) {
        formdata.wanjie = formdata.wanjie.index
        or.push({ wanjie: formdata.wanjie })
      }

      if (formdata.isdel?.value) {
        formdata.isdel = formdata.isdel.index
        and.push({ isdel: formdata.isdel })
      } else {
        formdata.isdel = 1
        and.push({ isdel: formdata.isdel })
      }

      /* for (const key in formdata) {
        if (formdata[key] !== undefined) {
          and.push({ [key]: formdata[key] })
        } 
      } */
    }

    if (!inputValue && or.length === 0) {
      window.$message.warning('请输入搜索内容')
      return
    }

    const body = {
      $or: or,
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
        return tabs.find(fv => fv.tab === mmv)
      })
      return mv
    })
    response = fles.reverse()
    setSearchlist(response)
  }

  const onPullup = callback => {
    if (isonSearch) {
      callback({
        text: '没有更多了',
        iconShow: false,
        opacity: 1
      })
      return
    }
    if (page + 10 < novel.novelList.length - 1) {
      callback({
        opacity: 1
      })
      setSearchlist(list => {
        return list.concat(novel.novelList.slice(page, page + 10))
      })
      setPage(page + 10)
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
                <Input
                  placeholder='名'
                  variant='filled'
                  type='Primary'
                  value={inputValue}
                  onChange={e => setInput(e.target.value)}
                />
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
                      {tabs.length > 0 &&
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

                  <Form.Item name='isdel' className='mt-10'>
                    <ButtonCheckboxGroup options={showOptions} />
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
