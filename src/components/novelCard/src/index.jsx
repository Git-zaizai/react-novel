import NovelCard from './novelCard'
import Chapter from './components/chapter'
import useNovelCardComp from './useNovelCardComp'
import { useCallback } from 'react'
import http from '@/utlis/http'

export default ({ data }) => {
  console.log('NovelCardList');
  /**
   * @module 修改章节
   */
  const {
    show: chapterShow,
    toggle: chapterToggle,
    toggleOnSetData,
    data: noData,
    updateNovelList
  } = useNovelCardComp()

  const updateChapter = useCallback(toggleOnSetData)

  /**
   * @module 读完
   */
  const updateDuwan = async noval => {
    const xduwan = Number(!noval.duwan)
    const response = await http.post('/mong/novel/update', {
      _id: noval._id,
      duwan: xduwan
    })
    if (response) {
      updateNovelList(({ novel }, setNovel) => {
        const findindex = novel.novelList.findIndex(fv => fv._id === noval._id)
        novel.novelList[findindex].duwan = xduwan
        setNovel(v => ({ ...v, novelList: [].concat(novel.novelList) }))
        setTimeout(() => {
          novel.novelList[findindex]
        }, 1000)
      })
    } else {
      window.$message.error('失败')
    }
  }

  const novelCardList = useMemo(() => {
    if (!Array.isArray(data) || !data.length) {
      return null
    }

    return data.map((item, index) => {
      return <NovelCard key={item._id} data={item} PropsIndex={index} updateChapter={updateChapter} updateDuwan={updateDuwan} />
    })
  }, [data])

  return (
    <>
      {novelCardList}
      {/* 展示没用上 下面的 */}
      <Chapter
        show={chapterShow}
        toggle={chapterToggle}
        start={noData.start}
        finish={noData.finish}
        change={updateNovelList}
        id={noData._id}
      />
    </>
  )
}
