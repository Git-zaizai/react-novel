import { useMount } from 'ahooks'
import { createGlobalStore } from 'hox'
import { useState } from 'react'
import http from '@/utlis/http'
import { randomHexColor } from '@/utlis/themeColor'

const [viewdata, getViewData] = createGlobalStore(() => {
  const [recordtypes, setRecordtype] = useState([])
  const [tabs, setTabs] = useState([])

  const [novel, setNovel] = useState({
    action: false,
    data: {},
    novelList: []
  })

  function setNovelStore(obj) {
    setNovel((v) => ({ ...v, ...obj }))
  }

  const initHttp = async () => {
    if (tabs.length || recordtypes.length) {
      return
    }
    try {
      const response = await Promise.all([
        http.get('/json-get', { ph: 'Recordtype.json' }),
        http.get('/json-get', { ph: 'tabs.json' })
      ])
      const tabsdata = response.map((mv) =>
        mv.map((mmv) => ({
          tab: mmv,
          color: randomHexColor()
        }))
      )
      setRecordtype(tabsdata[0])
      setTabs(tabsdata[1])
    } catch {
      window.$message && window.$message.error('获取类型标签失败')
    }
  }

  useMount(() => {
    initHttp()
  })
  return {
    recordtypes,
    setRecordtype,
    tabs,
    setTabs,
    initHttp,
    novel,
    setNovelStore
  }
})

export const useViewDataStore = viewdata

export const getViewDataStore = getViewData
