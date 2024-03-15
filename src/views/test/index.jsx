import Test from './test'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'

import { RandCreateList } from './rand'

const NovelCardListMemo = memo(NovelCardList)

let page = 1
export default () => {
  const { initTabs, novel, initNovel, setNovelStore } = useViewDataStore()
  const [list, setlist] = useState([])

  useEffect(() => {
    RandCreateList().then(data => {
      setlist(data)
      setNovelStore({ novelList: data })
    })
  }, [])

  const onScrollThrottle = async fn => {
    if (page > 2) {
      setTimeout(() => fn(false), 1000)
      return
    }
    const data = await RandCreateList()
    setlist(list.concat(data))
    page++
  }

  return (
    <>
      <Test onScrollThrottle={onScrollThrottle}>
        <NovelCardListMemo data={list} />
      </Test>
    </>
  )
}
