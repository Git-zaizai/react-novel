import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import http from '@/utlis/http'
import { useMount, useToggle } from 'ahooks'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { randomHexColor } from '@/utlis/themeColor'
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

export default () => {
  console.log('index 路由页面')

  const { tabs, initHttp, setNovelStore } = useViewDataStore()
  const [loading, { toggle: setloading }] = useToggle(true)
  const [list, setList] = useState([])

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

      const filterdata = novelFilter(resdata)
      setList(filterdata)

      setNovelStore({ novelList: resdata })
      setTimeout(() => setloading(), 1000)
    })
  })

  const AffixArrayRef = useRef([])
  const { run } = useDebounceFn(e => {}, {
    wait: 500
  })
  useEffect(() => {
    const view = document.querySelector('#zaiViewId')
    view.addEventListener('scroll', run)
  }, [])

  return (
    <>
      <CardSkeletons show={loading}>
        {list.map((item, index) => (
          <div key={index}>
            <div className={'flex-ai-c mb-5 ' + styles.Affixview}  ref={val => (AffixArrayRef.current[index] = val)}>
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
