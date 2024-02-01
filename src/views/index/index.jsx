import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import { useToggle } from 'ahooks'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { useState, useEffect, useRef } from 'react'
import CuIcon from '@/components/cuIcon'
import { isMobile } from '@/utlis'

function novelFilter(list) {
  const leng = isMobile() ? 5 : 8
  let tuijian = { Affix: '推荐', data: [] }
  let xiaoshuo = { Affix: '小说', data: [] }
  for (const iterator of list) {
    if (iterator.tabs.some(sv => sv.tab === '推荐')) {
      tuijian.data.push(iterator)
    }

    if (xiaoshuo.data.length < leng && iterator.tabs.some(sv => sv.tab === '小说')) {
      xiaoshuo.data.push(iterator)
    }
  }

  return [xiaoshuo, tuijian]
}

/** 首页只展示最新部分的记录 */
export default () => {
  console.log('index 路由页面')

  const { initTabs, novel, initNovel } = useViewDataStore()
  const [loading, { toggle: setloading }] = useToggle(true)
  const [list, setList] = useState([])

  useEffect(() => {
    initTabs()
      .then(initNovel)
      .then(() => {
        const filterdata = novelFilter(novel.novelList)
        setList(filterdata)
        setloading(false)
      })
  }, [novel.novelList])

  const AffixArrayRef = useRef([])
  const { run } = useDebounceFn(e => {}, {
    wait: 500
  })
  useEffect(() => {
    const view = document.querySelector('#zaiViewId')
    view.addEventListener('scroll', run)
    return () => {
      view.removeEventListener('scroll', run)
    }
  }, [])

  return (
    <>
      <CardSkeletons show={loading}>
        {list.map((item, index) => (
          <div key={index}>
            <div className={'flex-ai-c mb-5 ' + styles.Affixview} ref={val => (AffixArrayRef.current[index] = val)}>
              <h2>&ensp;{item.Affix}</h2>
              <CuIcon icon='play_forward_fill' color='var(--success-color)' className={styles.Affixicon + ' ml-10'} />
            </div>
            <div className={styles.view} key={index}>
              <NovelCardList data={item.data} />
            </div>
          </div>
        ))}
      </CardSkeletons>
    </>
  )
}
