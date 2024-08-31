import { createGlobalStore } from 'hox'
import http from '@/utlis/http'
import { randomHexColor } from '@/utlis/themeColor'

const [viewdata, getViewData] = createGlobalStore(() => {
  const [tabs, setTabs] = useState([])

  // const [novelFormView, { toggle: toggleNovelFormView }] = useToggle(false)

  const [novelData, setNovelData] = useState([])

  function clearNovel() {
    setTabs([])
    setNovel({
      action: false,
      data: {},
      novelList: [],
    })
  }

  const initTabs = async () => {
    if (getViewData().tabs.length) return
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
      if (getViewData().tabs.length > 0 && getViewData().novelData.length > 0) return
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
          color: randomHexColor(),
        }
      })
      return mv
    })
    setNovelData(data)
  }

  function deleteNovelItem(id) {
    const findindex = novelData.findIndex(fv => fv._id === id)
    if (findindex === -1) return 0
    novelData.splice(findindex, 1)
    setNovelData([].concat(novelData))
    return 1
  }

  function updateNovelItem(newData) {
    const findindex = novelData.findIndex(fv => fv._id === newData._id)
    if (findindex === -1) return 0
    novelData[findindex] = newData
    setNovelData([].concat(novelData))
  }

  return {
    tabs,
    setTabs,

    novelData,
    setNovelData,

    updateNovelItem,
    deleteNovelItem,

    initTabs,
    initNovel,
    clearNovel,
  }
})

export const useViewDataStore = viewdata

export const getViewDataStore = getViewData
