import styles from './search.module.css'

import ButtonCheckboxGroup from '@/components/buttonCheckboxGroup'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'

import { HamburgerButton } from '@icon-park/react'
import { SearchOutlined, BarsOutlined, FallOutlined } from '@ant-design/icons'
import DropdownPullup from '@/components/DropdownPullup'

import { useViewDataStore, getViewDataStore } from '@/store/viewdata'
import { useState, useEffect } from 'react'
import { Form } from 'antd'
import http from '@/utlis/http'

import { NovelCardList } from '@/components/novelCard-v2'
import DropdownPullupV2 from '@/components/DropdownPullup-v2'

const typeOptions = [
  {
    icon: (
      <CuIcon
        icon="medal"
        className="mr-10"
        isTransiton={false}
      />
    ),
    align: 'left',
    txt: '完结',
  },
  {
    icon: (
      <CuIcon
        icon="tag"
        className="ml-10"
        isTransiton={false}
      />
    ),
    align: 'right',
    txt: '连载',
  },
]

const showOptions = [
  {
    icon: (
      <CuIcon
        icon="medal"
        className="mr-10"
        isTransiton={false}
      />
    ),
    align: 'left',
    txt: '隐藏',
  },
  {
    icon: (
      <CuIcon
        icon="tag"
        className="ml-10"
        isTransiton={false}
      />
    ),
    align: 'right',
    value: true,
    txt: '显示',
  },
]

// 判断是否在搜索，在搜索中不能上拉加载
let isonSearch = false

export default () => {
  const [formRef] = Form.useForm()
  const [isCheckboxShow, { toggle }] = useToggle(true)
  const { tabs, novelData, initTabs, initNovel } = useViewDataStore()
  const [searchlist, setSearchlist] = useState(novelData.slice(0, 10))
  const [inputValue, setInput] = useState('')
  const [spinning, { toggle: toggleSpinning }] = useToggle(false)

  const bindList = async callback => {
    try {
      if (novelData.length === 0) {
        await initTabs()
        await initNovel()
      }
    } finally {
      if (searchlist.length > 10 || searchlist.length === 0) {
        setSearchlist(novelData.slice(0, 10))
      }
      setInput('')
      !isCheckboxShow && formRef.resetFields()
      isonSearch = false
      setTimeout(() => {
        callback && callback()
      }, 1000)
    }
  }

  const onSearch = async () => {
    isonSearch = true
    const and = []
    const or = []

    if (inputValue) {
      or.push({
        title: {
          $regex: inputValue,
        },
      })
      or.push({
        beizhu: {
          $regex: inputValue,
        },
      })
    }

    if (formRef) {
      const formdata = formRef.getFieldsValue()
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
      $and: and,
    }

    let response = await http
      .post('/curd-mongo/find/novel', {
        ops: { many: true },
        where: body,
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
      return
    }
    if (searchlist.length - 1 < novelData.length - 1) {
      setTimeout(() => {
        setSearchlist(list => {
          return list.concat(novelData.slice(searchlist.length - 1, searchlist.length - 1 + 10))
        })
        callback()
      }, 1000)
    } else {
      callback({
        pullupIconShow: false,
        text: '没有了...',
      })
    }
  }

  function addListAll() {
    if (searchlist.length < novelData.length) {
      toggleSpinning()
      let newlist = novelData.slice(searchlist.length, novelData.length)
      setSearchlist(searchlist.concat(newlist))
    }
  }

  useEffect(() => {
    if (spinning) {
      setTimeout(() => {
        toggleSpinning()
      }, 1000)
    }
  }, [spinning])

  useEffect(() => {
    setSearchlist(novelData.slice(0, searchlist.length))
  }, [novelData])

  return (
    <>
      <div className={`h-100-vh ${styles.searchview}`}>
        <Card
          className={`${styles.search} ${styles.searchcard}`}
          hoverable
          title={
            <>
              <div>
                <div className={`${styles.searchtitle} flex-ai-c`}>
                  <Input
                    placeholder="名"
                    variant="filled"
                    type="Primary"
                    value={inputValue}
                    onChange={e => setInput(e.target.value)}
                  />
                  <Button
                    type="text"
                    className="ml-5"
                    onClick={onSearch}
                  >
                    <SearchOutlined />
                  </Button>

                  <Button
                    type="text"
                    onClick={toggle}
                  >
                    <BarsOutlined
                      style={{
                        color: isCheckboxShow ? '' : 'var(--primary-color)',
                      }}
                    />
                  </Button>
                  <Button
                    type="text"
                    onClick={addListAll}
                  >
                    <FallOutlined />
                  </Button>
                </div>
              </div>
            </>
          }
        >
          <Transition show={isCheckboxShow}>
            {isCheckboxShow ? (
              <p></p>
            ) : (
              <>
                <Form
                  className={styles.searchFormItem}
                  form={formRef}
                >
                  <Form.Item name="tabs">
                    <Checkbox.Group>
                      {tabs.length > 0 &&
                        tabs.map(item => (
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
                    name="wanjie"
                    className="mt-10"
                  >
                    <ButtonCheckboxGroup options={typeOptions} />
                  </Form.Item>

                  <Form.Item
                    name="isdel"
                    className="mt-10"
                  >
                    <ButtonCheckboxGroup options={showOptions} />
                  </Form.Item>
                </Form>
              </>
            )}
          </Transition>
        </Card>

        <Spin
          size="large"
          delay={300}
          spinning={spinning}
        >
          <DropdownPullupV2
            onDropdown={bindList}
            onPullup={onPullup}
            InfiniteDropdown
            top="140px"
            DropdownChildren={<div style={{ height: '160px' }}></div>}
            PullupChildren={<div className={styles.footerposition}></div>}
          >
            <div className="flex-ai-c flex-wrap">
              <NovelCardList data={searchlist} />
            </div>
          </DropdownPullupV2>
        </Spin>
      </div>
    </>
  )
}
