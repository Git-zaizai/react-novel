import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import http from '@/utlis/http'
import { useRequest } from 'ahooks'
import NovelCard, { Chapter, useNovelCardComp } from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'

export default () => {
  console.log('index 路由页面')

  const {  tabs, initHttp, novel, setNovelStore } =
    useViewDataStore()

  const { loading } = useRequest(
    () => http.post('/curd-mongo/find/novel', { ops: { many: true } }),
    {
      loadingDelay: 1000,
      onSuccess: async (resdata) => {
        if (!tabs.length) {
          await initHttp()
        }

        resdata = resdata.map((mv) => {
          mv.tabs = mv.tabs.map((mmv) => tabs.find((fv) => fv.tab === mmv))
          return mv
        })

        setNovelStore({ novelList: resdata })
      }
    }
  )

  /**
   * @module 修改章节
   */
  const {
    show: chapterShow,
    toggle: chapterToggle,
    toggleOnSetData,
    data,
    updateNovelList
  } = useNovelCardComp()

  const NovelCardList = useMemo(() => {
    return novel.novelList.map((item) => {
      return (
        <NovelCard
          key={item._id}
          data={item}
          updateChapter={toggleOnSetData}
        />
      )
    })
  }, [novel.novelList])

  return (
    <>
      <CardSkeletons show={loading}>
        <div className={styles.view}>{NovelCardList}</div>
      </CardSkeletons>
      <Chapter
        show={chapterShow}
        toggle={chapterToggle}
        start={data.start}
        finish={data.finish}
        change={updateNovelList}
        id={data._id}
      />
    </>
  )
}
