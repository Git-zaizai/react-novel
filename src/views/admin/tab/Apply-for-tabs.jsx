import styles from './tab.module.css'

import { Button } from 'antd'
import ViewCard from '@/components/ViewCard'
import CuIcon from '@/components/cuIcon'

import { useViewDataStore } from '@/store/viewdata'
import { randomHexColor } from '@/utlis/themeColor'
import http from '@/utlis/http'

export default () => {
  const [list, setList] = useState([])
  const { setTabs, tabs } = useViewDataStore()

  const init = async () => {
    const response = await http.post('/curd-mongo/find/tabs', { ops: { many: true } }).catch(e => {
      window.$message.error('获取数据失败')
      return Promise.reject(e)
    })
    setList(response)
  }

  useMount(() => {
    init()
  })

  const removeTabApply = async (id, index) => {
    const response = await http
      .post('/curd-mongo/del/tabs', {
        where: {
          _id: id,
        },
      })
      .catch(e => {
        return Promise.reject(e)
      })
    if (response.deletedCount) {
      list.splice(index, 1)
      setList([].concat(list))
    } else {
      window.$message.success('删除失败')
    }
  }

  const addTabsClick = async (item, index) => {
    try {
      let data = [...tabs, { tab: item.name, color: randomHexColor() }]
      await http.post('/json-set', { ph: 'tabs.json', data: data.map(v => v.tab) })
      setTabs(data)
      removeTabApply(item._id, index)
    } catch (error) {
      console.log(error)
      window.$message.error('操作失败')
    }
  }

  return (
    <>
      <ViewCard
        title={
          <div className="flex">
            <CuIcon
              icon="form"
              size="22"
              color="var(--primary-color)"
              className="mr-10"
            />
            <h4 className="wax-100 singe-line">申请的便签 {list.length}</h4>
          </div>
        }
      >
        {list.length > 0 ? (
          list.map((item, i) => (
            <div
              className="mt-10 mb-10 flex-ai-c"
              key={item._id}
            >
              <div className="flex-1">
                <Tag color={randomHexColor()}>{item.name}</Tag>
                说明：{item.txt}
              </div>

              <Button
                type="primary"
                ghost
                className="ml-10"
                onClick={() => addTabsClick(item, i)}
              >
                <CuIcon
                  icon="check"
                  size={16}
                />
              </Button>
              <Button
                danger
                type="primary"
                ghost
                className="ml-10"
                onClick={() => removeTabApply(item._id, i)}
              >
                <CuIcon
                  icon="delete"
                  size={16}
                />
              </Button>
            </div>
          ))
        ) : (
          <div className="flex-fdc-aic-juc w-100">
            <CuIcon
              icon="home"
              color="var(--primary-color)"
              size="24"
            />
          </div>
        )}
      </ViewCard>
    </>
  )
}
