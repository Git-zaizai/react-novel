import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import http from '@/utlis/http'
import { useMount } from 'ahooks'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { randomHexColor } from '@/utlis/themeColor'
import { useToggle } from 'ahooks'
import dayjs from 'dayjs'

function novelFilter(list) {
  let tuijian = []
  for (const iterator of list) {
    if (iterator.tabs.includes('推荐')) {
      tuijian.push(iterator)
    }
  }

  let zuixin = list.slice(0, 5)
  return { tuijian, zuixin }
}

export default () => {
  console.log('index 路由页面')

  const { tabs, initHttp, novel, setNovelStore } = useViewDataStore()
  const [loading, { toggle: setloading }] = useToggle(true)
  useMount(() => {
    http.post('/curd-mongo/find/novel', { ops: { many: true } }).then(async resdata => {
      if (!tabs.length) {
        await initHttp()
      }
      resdata = resdata.reverse()
      resdata = resdata.map(mv => {
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

      setNovelStore({ novelList: resdata.slice(0, 10) })
      setTimeout(() => setloading(), 1000)
    })
  })

  return (
    <>
      <CardSkeletons show={loading}>
        <div className={styles.view}>
          <NovelCardList data={novel.novelList} />
        </div>
      </CardSkeletons>
    </>
  )
}
