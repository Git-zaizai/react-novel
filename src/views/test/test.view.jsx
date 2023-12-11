import NovelCard from '@/components/novelCard'
import { useViewDataStore } from '@/store/viewdata'
import { CardSkeletons } from '@/components/cardSkeleton'
import { useCallback } from 'react'
import http from '@/utlis/http'

import styles from './index.module.css'
import { useEffect } from 'react'
import { useToggle } from 'ahooks'

export default () => {
  console.log('test 路由页面')
  console.log('\n')

  const { tabs, recordtypes, loading } = useViewDataStore()

  const DropdownClick = useCallback(async ({ key }) => {
    if (key === '1') {
      onUpdataNovel(data)
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
          .catch((err) => {
            window.$message.error('删除失败')
            return Promise.reject(err)
          })

        if (response) {
          onDelNovel(index, data)
          window.$message.success('删除成功')
        }
      }
    }
  }, [])

  const NovelCardList = new Array(5)
    .fill({
      _id: '656ff21467d6079de2c6cb7c',
      beizhu: 'blpbxqk8e4',
      start: '6',
      finish: '24',
      duwan: 0,
      id: null,
      isdel: 1,
      recordtype: [1],
      link: '8zzxwu8zsa',
      linkback: 'e1kv3gfaln',
      links: [
        {
          linkName: '1z20lg00pk',
          urli: 'nwedyfklfz'
        }
      ],
      tabs: tabs.slice(0, 5),
      addDate: '2023-12-06T04:01:24.387Z',
      update: '2023-12-06T04:01:24.387Z',
      finishtime: null,
      rate: [],
      title: 'sf8gepvy3aS对方水电费第三方'
    })
    .map((item, i) => {
      item._id = item._id + i
      return (
        <NovelCard
          key={i}
          data={item}
          DropdownClick={DropdownClick}
        />
      )
    })

  return (
    <>
      <CardSkeletons show={false}>
        <div className={styles.view}>{NovelCardList}</div>
      </CardSkeletons>
    </>
  )
}
