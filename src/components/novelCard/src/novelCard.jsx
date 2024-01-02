import styles from './novelCard.module.css'

import CuIcon from '../../cuIcon'
import { LinkTwo, TagOne, Asterisk, Dvi } from '@icon-park/react'

import { randomHexColor } from '@/utlis/themeColor'
import { Space } from 'antd'
import { useToggle } from 'ahooks'
import { copyText } from '@/utlis'
import { useCallback } from 'react'
import { useViewDataStore } from '@/store/viewdata'
import { useStore } from '@/store'
import { memo } from 'react'

function Introduction({ txt }) {
  const [isText, { toggle }] = useToggle('nowrap', 'normal')
  if (!txt) {
    return
  }
  return (
    <div onClick={toggle} style={{ whiteSpace: isText }} className={styles.novelCardPeizhu + ' singe-line mt-15'}>
      <span style={{ color: 'var(--text-color-3)' }}>备注：</span>
      {txt}
    </div>
  )
}

function LinkButton({ link }) {
  if (!link.urli) {
    return
  }
  return (
    <Button
      type='dashed'
      className={styles.novelCardLinkBut}
      icon={<LinkTwo theme='outline' size='15' />}
      onClick={() => {
        copyText(link.urli, msg => window.$message.success(msg))
      }}
    >
      {link.linkName}
    </Button>
  )
}

function Chapter({ start, finish }) {
  if (!start && !finish) {
    return null
  }

  return (
    <div className='flex-ai-c mt-10'>
      <Asterisk theme='outline' size='18' fill='var(--success-color)' onClick={() => click(updateChapter)} />
      <h4 className={styles.cardExtra + ' ml-10'} onClick={() => click(updateChapter)}>
        第 {start || '???'}&ensp;-&ensp;{finish || '???'} 章
      </h4>
      <Tag color={randomHexColor()} className='ml-auto'>
        完结
      </Tag>
    </div>
  )
}

const ChapterMome = memo(Chapter)

const Dropdowns = [
  {
    key: '1',
    label: <h4 className='text-align'>修改</h4>
  },
  {
    key: '2',
    label: <h4 className='text-align'>删除</h4>
  }
]

export default props => {
  const { data, updateChapter, updateDuwan } = props
  const { store, setValueStore } = useStore()
  const { setNovelStore } = useViewDataStore()

  const click = useCallback(callback => {
    setNovelStore({ data })
    callback && callback(data)
  })

  const dropdownClick = useCallback(async ({ key }) => {
    if (key === '1') {
      setValueStore({ isAddDrawer: !store.isAddDrawer })
      setNovelStore({ action: 'updata', data })
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
          .catch(err => {
            window.$message.error('删除失败')
            return Promise.reject(err)
          })

        if (response) {
          novelStore.novelList.splice(index, 1)
          setNovelStore({ novelList: [].concat(novelStore.novelList) })
          window.$message.success('删除成功')
        }
      }
    }
  })

  return (
    <Card
      style={props.style}
      className={styles.novelCard}
      bordered={false}
      hoverable
      title={
        <div className='flex'>
          <Dropdown
            menu={{
              items: Dropdowns,
              onClick: dropdownClick
            }}
            placement='bottomLeft'
            arrow={{ pointAtCenter: true }}
          >
            <CuIcon icon='hot' size='22' color='var(--primary-color)' className='mr-10' />
          </Dropdown>
          <h4 className='wax-100 singe-line' onClick={() => copyText(data.title, msg => window.$message.success(msg))}>
            {data.title}
          </h4>
        </div>
      }
      extra={
        data.duwan === 1 ? (
          <Tag color='var(--success-color)' className='ml-auto' onClick={() => click(updateDuwan)}>
            读完
          </Tag>
        ) : (
          <div className={styles.novelCarddiwan + ' ml-auto'} onClick={() => click(updateDuwan)}></div>
        )
      }
    >
      <div className='flex-ai-c'>
        <TagOne theme='outline' size='18' fill='var(--success-color)' className='mr-5 el-transition-color' />
        标签：
        {data.tabs.map(item => (
          <Tag key={item.tab} color={item.color} className=''>
            {item.tab}
          </Tag>
        ))}
      </div>

      <ChapterMome start={data.start} finish={data.finish} />

      <h4 className='flex-ai-c mt-10'>
        <LinkTwo theme='outline' size='18' fill='var(--success-color)' className='mr-5' />
        链接：
      </h4>
      <Space size={[14, 7]} wrap className='mt-10'>
        <LinkButton link={{ linkName: '首链接', urli: data.link }} />
        <LinkButton link={{ linkName: '后续链接', urli: data.linkback }} />
        {data?.links && data.links.map((v, i) => <LinkButton link={v} key={i} />)}
      </Space>

      <Introduction txt={data.beizhu} />
    </Card>
  )
}
