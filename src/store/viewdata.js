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
    if (tabs.length) return 0
    try {
      const response = await http.get('/json-get', { ph: 'tabs.json' })
      setTabs(() => response.map(mv => ({ tab: mv, color: randomHexColor() })))
      return 1
    } catch (e) {
      window.$message?.error && window.$message.error('获取类型标签失败 ：' + e)
      return Promise.reject(e)
    }
  }

  const initNovel = async isleng => {
    if (!isleng) {
      if (tabs.length > 0 && novel.novelList.length > 0) return
    }

    let data = await http.post('/curd-mongo/find/novel', { ops: { many: true }, where: { isdel: 1 } })
    if (data.length === 0) return
    /* data = data.map((item, index) => {
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
    return Promise.resolve()
  }

  function deleteNovelItem(id) {
    const findindex = novel.novelList.findIndex(fv => fv._id === id)
    if (findindex === -1) return 0
    novel.novelList.splice(findindex, 1)
    setNovelStore({ novelList: [...novel.novelList] })
    return 1
  }

  return {
    tabs,
    setTabs,
    initTabs,
    novel,
    setNovelStore,
    initNovel,
    deleteNovelItem
  }
})

export const useViewDataStore = viewdata

export const getViewDataStore = getViewData
