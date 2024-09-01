import styles from './tab.module.css'

import { Form, Input, Checkbox, Button } from 'antd'
import ViewCard from '@/components/ViewCard'
import CuIcon from '@/components/cuIcon'
import Transition from '@/components/Transition'

import { randomHexColor } from '@/utlis/themeColor'
import http from '@/utlis/http'
import { useViewDataStore } from '@/store/viewdata'

function TabManage() {
  const { tabs, setTabs, initTabs } = useViewDataStore()

  const copyTabs = () => {
    let cloneTabs = window.structuredClone ? structuredClone(tabs) : JSON.parse(JSON.stringify(tabs))
    cloneTabs = cloneTabs.map(ct => ({ ...ct, checked: false }))
    return cloneTabs
  }

  const [checkboxs, setCheckoxs] = useState(copyTabs())
  const [isDelBut, { set: setIsDelBut }] = useToggle(checkboxs.some(sv => sv.checked))
  const [val, setval] = useState('')

  useAsyncEffect(async () => {
    if (!tabs.length) {
      await initTabs()
    }
    if (tabs.length !== checkboxs.length) {
      setCheckoxs(copyTabs())
    }
  }, [tabs])

  const onChange = (checkedValues, index) => {
    checkedValues.checked = !checkedValues.checked
    checkboxs[index] = checkedValues
    setIsDelBut(checkboxs.some(sv => sv.checked))
    setCheckoxs([...checkboxs])
  }

  const addTab = async () => {
    if (!val) {
      window.$message.warning('请输入标签')
      return
    }
    if (checkboxs.some(sv => sv.tab === val)) {
      window.$message.warning(`${val} 已有`)
      return
    }
    let data = checkboxs.map(mv => mv.tab)
    data.push(val)

    await http
      .post('/json-set', {
        ph: 'tabs.json',
        data,
      })
      .catch(e => {
        window.$message.error('添加标签失败')
        return Promise.reject(e)
      })

    setTabs([
      ...tabs,
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
    let newData = checkboxs.filter(sv => !sv.checked)
    await http
      .post('/json-set', {
        ph: 'tabs.json',
        data: newData.map(mv => mv.tab),
      })
      .catch(e => {
        window.$message.error(e)
        return Promise.reject(e)
      })
    setTabs(newData.map(mv => ({ tab: mv.tab, color: mv.color })))
    setIsDelBut(false)
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
            allowClear
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
            添加
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

export default TabManage
