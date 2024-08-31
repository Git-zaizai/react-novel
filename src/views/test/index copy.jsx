import Test from './test'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'

import { RandCreateList } from './rand'

const NovelCardListMemo = memo(({ data }) => {
  return (
    <div className='flex-fdc-aic-juc'>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{ height: '55px', borderBottom: '1px solid #f0f0f0 ', marginBottom: '20px', background: '#fff' }}
          >
            {item.title}
          </div>
        )
      })}
    </div>
  )
})

let page = 1
export default () => {
  const { initTabs, novel, initNovel, setNovelStore } = useViewDataStore()
  const [list, setlist] = useState([])

  useEffect(() => {
    RandCreateList(20).then(data => {
      setlist(data)
      setNovelStore({ novelList: data })
      setTimeout(() => {
        let all = document.querySelectorAll('.ant-card-body')
        all.forEach(el => {
          el.style.display = 'none'
        })
      }, 0)
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
    setTimeout(() => {
      let all = document.querySelectorAll('.ant-card-body')
      all.forEach(el => {
        el.style.display = 'none'
      })
    }, 0)
  }

  return (
    <>
      <div style={{ height: '70px' }}></div>
      <div style={{ height: 'calc(100vh - 70px - 80px)' }}>
        <Test onScrollThrottle={onScrollThrottle}>
          <NovelCardListMemo data={list} />
        </Test>
      </div>
    </>
  )
}
