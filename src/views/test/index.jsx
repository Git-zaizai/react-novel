import Test from './test'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
export default () => {
  const { initTabs, novel, initNovel } = useViewDataStore()

  return (
    <>
      <Test>
        <NovelCardList data={novel.novelList.slice(0, 5)} />
      </Test>
    </>
  )
}
