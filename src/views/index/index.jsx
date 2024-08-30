import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import { useViewDataStore, getViewDataStore } from '@/store/viewdata'
import { useState, useEffect } from 'react'
import CuIcon from '@/components/cuIcon'
import { copyText } from '@/utlis'
import DropdownPullup from '@/components/DropdownPullup'

export default () => {
  window.logComponents('index 首页')

  const { initTabs, novel, initNovel } = useViewDataStore()
  const [loading, { set: setloading }] = useToggle(true)
  const [list, setList] = useState([])

  async function onEnd(callback) {
    try {
      await initTabs()
      await initNovel()
      setList(getViewDataStore().novel.novelList)
    } finally {
      setloading(false)
      setTimeout(() => {
        callback && callback()
      }, 1000)
    }
  }

  useEffect(() => {
    if (novel.novelList.length === 0) {
      return setList([])
    }
    onEnd()
  }, [novel.novelList])

  function copylink(item) {
    let link = item.link ? item.link : item.linkback ? item.linkback : false
    if (link === false && item.links) {
      link = item.links.filter(fv => fv.urli)
      link = link.urli
    }
    copyText(link, msg => window.$message.success(msg))
  }

  return (
    <>
      <div className="h-100-vh">
        <DropdownPullup
          onEnd={onEnd}
          headerPosition={<div style={{ height: '10px' }}></div>}
        >
          <CardSkeletons show={loading}>
            <div className={styles.indexview}>
              {list.length > 0 &&
                list.map((item, index) => (
                  <div
                    className={`flex-ai-c mb-10 ${styles.itemview}`}
                    key={item._id}
                  >
                    <CuIcon
                      icon="hot"
                      size="22"
                      color="var(--primary-color)"
                      className="mr-10"
                      onClick={() => copylink(item)}
                    />
                    <div style={{ width: '85%' }}>
                      <h4
                        className="wax-100 singe-line mr-20"
                        onClick={() => copyText(item.title, msg => window.$message.success(msg))}
                      >
                        {item.title}
                      </h4>
                      {item.beizhu && <div className={styles.novelCardPeizhu}>{item.beizhu}</div>}
                    </div>
                    <h4 className="ml-auto">{index}</h4>
                  </div>
                ))}
            </div>
          </CardSkeletons>
        </DropdownPullup>
      </div>
    </>
  )
}
