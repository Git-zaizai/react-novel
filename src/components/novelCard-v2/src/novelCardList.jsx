import NovelCard from './novelCard'

import { useStore } from '@/store'
import { useViewDataStore } from '@/store/viewdata'

import http from '@/utlis/http'

export default ({ data }) => {
  window.logComponents('novelCardList')

  const { toggleAddDrawerShow, setNovelFormData } = useStore()
  const { deleteNovelItem, updateNovelItem } = useViewDataStore()

  const dropdownClick = useCallback(async (key, novelItem) => {
    if (key === 'update') {
      setNovelFormData({ action: key, data: novelItem })
      toggleAddDrawerShow()
    } else {
      const modalRes = await window.$modal.confirm({
        okText: '删除',
        okType: 'danger',
        maskClosable: true,
        centered: true,
        cancelText: '取消',
        title: '删除小说',
        content: `是否将 （${novelItem.title}） 删除`,
      })
      if (modalRes) {
        const response = await http
          .post('/mong/novel/update', {
            _id: novelItem._id,
            isdel: 0,
          })
          .catch(err => {
            window.$message.error('删除失败')
            return Promise.reject(err)
          })

        if (response === 1) {
          deleteNovelItem(novelItem._id)
          window.$message.success('删除成功')
        } else {
          window.$message.error('删除失败')
        }
      }
    }
  })

  const { run } = useDebounceFn(
    async novelItem => {
      const xduwan = Number(!novelItem.duwan)
      const response = await http.post('/mong/novel/update', {
        _id: novelItem['_id'],
        duwan: xduwan,
      })
      if (response) {
        novelItem.duwan = xduwan
        updateNovelItem(novelItem)
        window.$message.success('修改成功')
      } else {
        window.$message.error('失败')
      }
    },
    { wait: 500 }
  )

  const ReadoffClick = useCallback(run, [])

  const novelCardList = useMemo(() => {
    return data.map((item, index) => {
      return (
        <NovelCard
          key={item._id}
          data={item}
          index={index}
          dropdownClick={dropdownClick}
          ReadoffClick={ReadoffClick}
        />
      )
    })
  }, [data])

  return <>{novelCardList}</>
}
