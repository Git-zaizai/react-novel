import { useMount } from 'ahooks'
import { createGlobalStore } from 'hox'
import { useState } from 'react'
import http from '@/utlis/http'
import { randomHexColor } from '@/utlis/themeColor'

const [viewdata, getViewData] = createGlobalStore(() => {
  const [tabs, setTabs] = useState([])

  const [novel, setNovel] = useState({
    action: false,
    data: {},
    novelList: []
  })

  function setNovelStore(obj) {
    setNovel(v => ({ ...v, ...obj }))
  }

  const initHttp = async () => {
    if (tabs.length) {
      return
    }
    try {
      const response = await http.get('/json-get', { ph: 'tabs.json' })
      setTabs(response.map(mv => ({ tab: mv, color: randomHexColor() })))
    } catch {
      window.$message && window.$message.error('获取类型标签失败')
    }
  }

  useMount(() => {
    initHttp()
  })
  return {
    tabs,
    setTabs,
    initHttp,
    novel,
    setNovelStore
  }
})

export const useViewDataStore = viewdata

export const getViewDataStore = getViewData
