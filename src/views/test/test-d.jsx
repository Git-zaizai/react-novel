import styles from './DropdownPullup-v2.module.css'

import { waitTime } from '@/utlis'
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

import { DropdownPullupv2 } from './DropdownPullup-v2'

// 判断是否在搜索，在搜索中不能上拉加载
let isonSearch = false

function App() {
  window.logComponents('app')

  const [formRef] = Form.useForm()
  const [isCheckboxShow, { toggle }] = useToggle(true)
  const { tabs, novelData, initTabs, initNovel } = useViewDataStore()
  const [searchlist, setSearchlist] = useState(novelData.slice(0, 10))
  const [page, setPage] = useState(10)
  const [inputValue, setInput] = useState('')
  const [isOnPullup, { set: setIsOnPullup }] = useToggle(true)
  const [spinning, { toggle: toggleSpinning }] = useToggle(false)

  useEffect(() => {
    onDropdown(() => {})
  }, [novelData])

  const onDropdown = async callback => {
    try {
      if (novelData.length === 0) {
        await initTabs()
        await initNovel()
      }
    } finally {
      setSearchlist(getViewDataStore().novelData.slice(0, 10))
      setInput('')
      !isCheckboxShow && formRef.resetFields()
      isonSearch = false
      !isOnPullup && setIsOnPullup(true)
      setTimeout(() => {
        callback && callback()
      }, 1000)
    }
  }

  const onPullup = callback => {
    if (isonSearch) {
      return
    }

    console.log(page, searchlist, novelData.length, callback)

    if (page + 10 <= novelData.length) {
      setSearchlist(list => {
        console.log(list)

        return [...list, ...novelData.slice(page, page + 10)]
      })
      setPage(page + 10)
      callback()
    } else {
      /* setTimeout(() => {
        callback({
          opacity: 0,
        })
        setIsOnPullup(false)
      }, 1000) */
      callback()
    }
  }

  return (
    <>
      <div
        style={{
          height: '80px',
          border: '1px solid var(--primary-color-pressed)',
        }}
      >
        <div className="flex-ai-c w-100">
          <i
            className={`${styles.loader}`}
            style={{
              transform: `scale(var(--zai-loader-scale))`,
            }}
          />

          <Button
            onClick={() => {
              document.querySelector('#dropdown-pullup').scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            1
          </Button>
        </div>
      </div>
      <div
        style={{
          height: '1px',
          width: '100%',
          backgroundColor: '#000',
          position: 'fixed',
          zIndex: '999',
          top: '33vh',
        }}
      ></div>
      <Spin spinning={false}>
        <div
          style={{
            height: 'calc(100vh - 80px)',
          }}
        >
          <DropdownPullupv2
            onPullup={onPullup}
            onDropdown={onDropdown}
            InfiniteDropdown
            isMountDropdown
          >
            <div className="flex-ai-c flex-wrap">
              <NovelCardList data={searchlist} />
            </div>
          </DropdownPullupv2>
        </div>
      </Spin>
    </>
  )
}

export default App
