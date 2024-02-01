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

  const initTabs = async () => {
    if (tabs.length) return
    try {
      const response = await http.get('/json-get', { ph: 'tabs.json' })
      setTabs(response.map(mv => ({ tab: mv, color: randomHexColor() })))
    } catch {
      window.$message && window.$message.error('获取类型标签失败')
    }
  }

  const initNovel = async () => {
    if (novel.novelList.length) return
    let data = await http.post('/curd-mongo/find/novel', { ops: { many: true } })
    /*  data = data.map((item, index) => {
      item.title = `*****${index}`
      return item
    }) */
    data = data.reverse()
    data = data.map(mv => {
      mv.tabs = mv.tabs.map(mmv => {
        const find = tabs.find(fv => fv.tab === mmv)
        if (find) return find
        return {
          tab: mmv,
          color: randomHexColor()
        }
      })
      return mv
    })
    setNovelStore({ novelList: data })
  }

  useMount(() => {
    initTabs()
    initNovel()
  })
  return {
    tabs,
    setTabs,
    initTabs,
    novel,
    setNovelStore,
    initNovel
  }
})

export const useViewDataStore = viewdata

export const getViewDataStore = getViewData
