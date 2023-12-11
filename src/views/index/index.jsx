import { CardSkeletons } from '@/components/cardSkeleton'
import { useStore } from '@/store'
import { useCallback, useMemo } from 'react'
import http from '@/utlis/http'
import { useRequest } from 'ahooks'
import styles from './index.module.css'

import NovelCard, { Chapter } from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { useToggle } from 'ahooks'
import { useState } from 'react'

export default () => {
  console.log('index 路由页面')
  console.log('\n')
  const { store, setValueStore, setNovelStore, novelStore } = useStore()
  const { recordtypes, tabs, initHttp } = useViewDataStore()

  const { loading } = useRequest(
    () => http.post('/curd-mongo/find/novel', { ops: { many: true } }),
    {
      loadingDelay: 1000,
      onSuccess: async resdata => {
        if (!tabs.length) {
          await initHttp()
        }

        resdata = resdata.map(mv => {
          mv.recordtype = mv.recordtype.map(v =>
            recordtypes.find(fv => fv.tab === v)
          )
          mv.tabs = mv.tabs.map(mmv => tabs.find(fv => fv.tab === mmv))
          return mv
        })

        setNovelStore({ novelList: resdata })
      }
    }
  )

  const DropdownClick = useCallback(async ({ key }) => {
    if (key === '1') {
      setValueStore({ isAddDrawer: !store.isAddDrawer })
      setNovelStore({ action: 'updata', data })
    } else {
      const modalRes = await window.$modal.confirm({
        okText: '删除',
        okType: 'danger',
        maskClosable: true,
        centered: true,
        cancelText: '取消',
        title: '删除小说',
        content: '是否将（删除）'
      })
      if (modalRes) {
        const response = await http
          .post('/react/novel/update', {
            _id: data._id,
            isdel: 0
          })
          .catch(err => {
            window.$message.error('删除失败')
            return Promise.reject(err)
          })

        if (response) {
          novelStore.novelList.splice(index, 1)
          setNovelStore({ novelList: [].concat(novelStore.novelList) })
          window.$message.success('删除成功')
        }
      }
    }
  }, [])

  /**
   * @module 修改章节
   */
  const [showChapter, { toggle: chapterShow }] = useToggle()
  let [chapterdata, setChapterData] = useState({ start: '', finish: '' })
  const updateChapter = ({ start, finish }) => {
    setChapterData({ start, finish })
    chapterShow()
  }

  const NovelCardList = useMemo(() => {
    return novelStore.novelList.map((item, i) => (
      <NovelCard
        key={item._id}
        data={item}
        DropdownClick={DropdownClick}
        updateChapter={updateChapter}
      />
    ))
  }, [novelStore.novelList])

  return (
    <>
      <CardSkeletons show={loading}>
        <div className={styles.view}>{NovelCardList}</div>
      </CardSkeletons>
      <Chapter
        show={showChapter}
        toggle={chapterShow}
        start={chapterdata.start}
        finish={chapterdata.finish}
      />
    </>
  )
}
