import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import http from '@/utlis/http'
import { useRequest } from 'ahooks'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'

export default () => {
  console.log('index 路由页面')

  const { recordtypes, tabs, initHttp, novel, setNovelStore } = useViewDataStore()

  const { loading } = useRequest(() => http.post('/curd-mongo/find/novel', { ops: { many: true } }), {
    loadingDelay: 1000,
    onSuccess: async resdata => {
      if (!tabs.length) {
        await initHttp()
      }

      resdata = resdata.map(mv => {
        mv.recordtype = mv.recordtype.map(v => {
          const find = recordtypes.find(fv => fv.tab === v)
          if (find) return find
          return {
            tab: v,
            color: randomHexColor()
          }
        })
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
      setNovelStore({ novelList: resdata })
    }
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
