import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import http from '@/utlis/http'
import { useMount, useToggle } from 'ahooks'
import NovelCardList from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { randomHexColor } from '@/utlis/themeColor'
import { useState } from 'react'
import { useRef } from 'react'
import CuIcon from '@/components/cuIcon'

function novelFilter(list) {
  let tuijian = { Affix: '推荐', data: [] }
  let xiaoshuo = { Affix: '小说', data: [] }
  for (const iterator of list) {
    if (iterator.tabs.some(sv => sv.tab === '推荐')) {
      tuijian.data.push(iterator)
    }

    if (xiaoshuo.data.length < 5 && iterator.tabs.some(sv => sv.tab === '小说')) {
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
  const AffixArrayRef = useRef([])

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

  return (
    <>
      <CardSkeletons show={loading}>
        {list.map((item, index) => (
          <div className={styles.view} key={index}>
            <Affix
              ref={ref => {
                AffixArrayRef.current[index] = ref
              }}
              className='mb-5'
              offsetTop={70}
              target={() => document.querySelector('#zaiViewId')}
            >
              <div className='w-100-vw flex-jusp'>
                <h2>&ensp;{item.Affix}</h2>
                <CuIcon icon='play_forward_fill' color='var(--success-color)' className={styles.Affixicon + ' mr-20'} />
              </div>
            </Affix>

            <NovelCardList data={item.data} />
          </div>
        ))}
      </CardSkeletons>
    </>
  )
}
