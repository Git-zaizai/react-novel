import styles from './index.module.css'

import { CardSkeletons } from '@/components/cardSkeleton'
import { useViewDataStore, getViewDataStore } from '@/store/viewdata'
import { useState, useEffect } from 'react'
import CuIcon from '@/components/cuIcon'
import { copyText } from '@/utlis'
import DropdownPullup from '@/components/DropdownPullup'

export default () => {
  window.logComponents('index 首页')

  const { initTabs, novelData, initNovel } = useViewDataStore()
  const [loading, { set: setloading }] = useToggle(!novelData.length)

  async function onEnd(callback) {
    try {
      if (!novelData.length) {
        await initTabs()
        await initNovel()
      }
    } finally {
      setloading(false)
      setTimeout(() => {
        callback && callback()
      }, 1000)
    }
  }

  function copylink(item) {
    let link = item.link ? item.link : item.linkback ? item.linkback : false
    if (link === false && item.links) {
      link = item.links.filter(fv => fv.urli)
      link = link.urli
    }
    if (link) {
      copyText(link, msg => window.$message.success(msg))
    } else {
      window.$message.warning('没有链接')
    }
  }

  return (
    <>
      <div className="h-100-vh">
        <DropdownPullup
          isMount={loading}
          onEnd={onEnd}
          headerPosition={<div style={{ height: '10px' }}></div>}
        >
          <CardSkeletons show={loading}>
            <div className={styles.indexview}>
              {novelData.length > 0 &&
                novelData.map((item, index) => (
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
