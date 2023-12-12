import { useToggle } from 'ahooks'
import { useViewDataStore, getViewDataStore } from '@/store/viewdata'
export default () => {
  const { novel, setNovelStore } = useViewDataStore()
  const [show, { toggle }] = useToggle()

  const setData = (value) => setNovelStore({ data: value })

  const toggleOnSetData = (data) => {
    setData(data)
    toggle()
  }

  const updateNovelList = (callback) => {
    callback && callback(getViewDataStore(), setNovelStore)
  }

  return {
    show,
    toggle,
    data: novel.data,
    setData,
    updateNovelList,
    toggleOnSetData
  }
}
