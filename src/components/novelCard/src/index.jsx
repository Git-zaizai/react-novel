import NovelCard from './novelCard'
import Chapter from './components/chapter'
import useNovelCardComp from './useNovelCardComp'
import { useCallback } from 'react'

export default ({ data }) => {
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

  const { show: duwanShow, toggle: duwanToggle } = useNovelCardComp()

  const novelCardList = useMemo(() => {
    if (!Array.isArray(data) || !data.length) {
      return null
    }
    return data.map((item) => {
      return (
        <NovelCard
          key={item._id}
          data={item}
          updateChapter={updateChapter}
        />
      )
    })
  }, [data])

  return (
    <>
      {novelCardList}
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
