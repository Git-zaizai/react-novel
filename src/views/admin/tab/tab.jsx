import styles from './tab.module.css'

import { Form, Input, Checkbox, Button } from 'antd'
import { randomHexColor } from '@/utlis/themeColor'
import ViewCard from '@/components/ViewCard'
import CuIcon from '@/components/cuIcon'
import Transition from '@/components/Transition'
import { useToggle, useMount } from 'ahooks'
import { useState, useEffect } from 'react'
import http from '@/utlis/http'
import { useViewDataStore } from '@/store/viewdata'

function TabCard() {
  const [isDelBut, { setLeft, setRight }] = useToggle()
  const { tabs: checkboxs, setTabs: setCheckoxs, initTabs } = useViewDataStore()
  const [removeTab, setRemoveTab] = useState([])
  const [val, setval] = useState('')

  const onChange = (checkedValues, index) => {
    checkedValues.checked = !checkedValues.checked
    checkboxs[index] = checkedValues
    if (checkedValues.checked) {
      removeTab.push(checkedValues)
      setRemoveTab(removeTab)
    } else {
      const findindex = removeTab.findIndex(fv => fv.tab === checkedValues.tab)
      removeTab.splice(findindex, 1)
      setRemoveTab(removeTab)
      setTimeout(() => console.log(removeTab), 1000)
    }
    setCheckoxs([...checkboxs])
  }

  useEffect(() => {
    initTabs()
    if (removeTab.length > 0 && !isDelBut) {
      setRight()
    } else if (removeTab.length === 0) {
      setLeft()
    }
  }, [removeTab.length])

  const addTab = async () => {
    if (!val) return
    if (checkboxs.some(sv => sv.tab === val)) {
      window.$message.warning(`${val} 已有`)
      return
    }
    let data = checkboxs.map(mv => mv.tab)
    await http
      .post('/json-set', {
        ph: 'tabs.json',
        data,
      })
      .catch(e => {
        window.$message.error('添加标签失败')
        return Promise.reject(e)
      })
    setCheckoxs([
      ...checkboxs,
      {
        tab: val,
        color: randomHexColor(),
      },
    ])
  }

  const removeTabClick = async () => {
    const modalRes = await window.$modal.confirm({
      okText: '删除',
      okType: 'danger',
      maskClosable: true,
      centered: true,
      cancelText: '取消',
      title: '删除记录类型',
      content: '是否将（删除）',
    })
    if (!modalRes) return
    const removes = checkboxs.filter(v => {
      const findIndex = removeTab.findIndex(fv => fv.tab === v.tab)
      if (findIndex === -1) {
        return v
      }
    })
    await http
      .post('/json-set', {
        ph: 'tabs.json',
        data: removes.map(mv => mv.tab),
      })
      .catch(e => {
        window.$message.error(e)
        return Promise.reject(e)
      })
    setRemoveTab([])
    setCheckoxs(removes)
  }

  return (
    <ViewCard
      className={styles.circleCard}
      title={
        <div className="flex-ai-c">
          <CuIcon
            icon="tag"
            size="22"
            color="var(--primary-color)"
            className="mr-10"
          />
          <h4 className="wax-100 singe-line">标签</h4>
        </div>
      }
    >
      {checkboxs.length ? (
        <Space
          size={[0, 8]}
          wrap
          className="mt-10"
        >
          {checkboxs.map((item, index) => (
            <Checkbox
              onChange={() => onChange(item, index)}
              checked={item.checked}
              key={item.tab}
            >
              <Tag color={item.color}>{item.tab}</Tag>
            </Checkbox>
          ))}
        </Space>
      ) : (
        <div className="flex-fdc-aic-juc w-100">
          <CuIcon
            icon="home"
            color="var(--primary-color)"
            size="24"
          />
        </div>
      )}
      <Form.Item
        className={styles.addForm + ' w-100 mb-30'}
        labelAlign="right"
      >
        <Space.Compact className="w-100">
          <Input
            placeholder="标签名"
            onChange={e => setval(e.target.value)}
          />
          <Button
            type="primary"
            icon={
              <CuIcon
                icon="add"
                size={16}
              />
            }
            onClick={addTab}
          >
            提交
          </Button>
        </Space.Compact>
      </Form.Item>

      <Transition show={isDelBut}>
        {isDelBut ? (
          <Button
            danger
            type="primary"
            block
            className="mt-10"
            onClick={removeTabClick}
          >
            <CuIcon
              icon="delete"
              size={16}
            />
          </Button>
        ) : (
          <></>
        )}
      </Transition>
    </ViewCard>
  )
}

export default () => {
  const [list, setList] = useState([])
  const { setTabs, tabs, initTabs } = useViewDataStore()

  useMount(() => {
    http.post('/curd-mongo/find/tabs', { ops: { many: true } }).then(res => {
      setList(res)
    })
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
      window.$message.success('删除成功')
    } else {
      window.$message.success('删除失败')
    }
  }

  const checkTab = async (item, index) => {
    try {
      await http.post('/json-set', { ph: 'tabs.json', data: tabs.map(mv => mv.tab) })
      setTabs([...tabs, { tab: item.name, color: randomHexColor() }])
      list.splice(index, 1)
      setList([].concat(list))
    } catch (error) {
      console.log(error)
      window.$message.error('操作失败')
    }
  }

  return (
    <>
      <div className={styles.view + ' h-100-vh'}>
        <div style={{ height: 'calc(var(--Header-height) + 20px)' }}></div>
        <TabCard />

        <ViewCard
          title={
            <div className="flex">
              <CuIcon
                icon="form"
                size="22"
                color="var(--primary-color)"
                className="mr-10"
              />
              <h4 className="wax-100 singe-line">申请的便签</h4>
            </div>
          }
        >
          {list.length ? (
            list.map((item, i) => (
              <div
                className="mt-10 mb-10 flex-ai-c"
                key={item._id}
              >
                <div className="flex-1">
                  <Tag color={randomHexColor()}>{item.name}</Tag>
                  说明：{item.txt}
                </div>
                {/* <Search
                  className='mt-10'
                  placeholder={item.reply}
                  enterButton='回复'
                /> */}

                <Button
                  danger
                  type="text"
                  className="ml-10"
                  style={{ backgroundColor: 'var(--primary-color-suppl)', color: '#fff' }}
                  onClick={() => checkTab(item, i)}
                >
                  <CuIcon
                    icon="check"
                    size={16}
                  />
                </Button>
                <Button
                  danger
                  type="text"
                  className="ml-10"
                  style={{ backgroundColor: '#fff2f0' }}
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
      </div>
    </>
  )
}
