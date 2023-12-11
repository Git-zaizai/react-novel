import styles from './index.module.css'

import CuIcon from '../../cuIcon'
import { LinkTwo, TagOne, Asterisk } from '@icon-park/react'
import Chapter from './components/chapter'

import { randomHexColor } from '@/utlis/themeColor'
import { Space } from 'antd'
import { useToggle } from 'ahooks'
import { copyText } from '@/utlis'
import { useState } from 'react'
import { useCallback } from 'react'

function Introduction({ txt }) {
  const [isText, { toggle }] = useToggle('nowrap', 'normal')
  if (!txt) {
    return
  }
  return (
    <div
      onClick={toggle}
      style={{ whiteSpace: isText }}
      className={styles.novelCardPeizhu + ' singe-line mt-15'}
    >
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
  const { data, DropdownClick, updateChapter } = props

  return (
    <Card
      className={styles.novelCard}
      bordered={false}
      hoverable
      title={
        <div className='flex'>
          <Dropdown
            menu={{ items: Dropdowns, onClick: DropdownClick }}
            placement='bottomLeft'
            arrow={{ pointAtCenter: true }}
          >
            <CuIcon
              icon='hot'
              size='22'
              color='var(--primary-color)'
              className='mr-10'
            />
          </Dropdown>
          <h4
            className='wax-100 singe-line'
            onClick={() =>
              copyText(data.title, msg => window.$message.success(msg))
            }
          >
            {data.title}
          </h4>
        </div>
      }
      extra={
        data.duwan === 1 && (
          <Tag color='var(--success-color)' className='ml-auto'>
            {data.duwan ? '读完' : '未读完'}
          </Tag>
        )
      }
    >
      <div className='flex-ai-c'>
        <TagOne
          theme='outline'
          size='18'
          fill='var(--success-color)'
          className='mr-5 el-transition-color'
        />
        类型：
        {data.recordtype.map(item => (
          <Tag key={item.tab} color={item.color} className='mt-10 mb-10'>
            {item.tab}
          </Tag>
        ))}
      </div>

      <div className='flex-ai-c mt-10'>
        <Asterisk
          theme='outline'
          size='18'
          fill='var(--success-color)'
          onClick={() => updateChapter && updateChapter(data)}
        />
        <h4
          className={styles.cardExtra + ' ml-10'}
          onClick={() => updateChapter && updateChapter(data)}
        >
          第 {data.start || '???'}&ensp;-&ensp;{data.finish || '???'} 章
        </h4>
        <Tag color={randomHexColor()} className='ml-auto'>
          完结
        </Tag>
      </div>

      <div className='mt-5'>
        <TagOne
          theme='outline'
          size='18'
          fill='var(--success-color)'
          className='mr-5 el-transition-color'
        />
        标签：
        {data.tabs.map(item => (
          <Tag key={item.tab} color={item.color} className='mt-10 mb-10'>
            {item.tab}
          </Tag>
        ))}
      </div>

      <h4 className='flex-ai-c mb-10'>
        <LinkTwo
          theme='outline'
          size='18'
          fill='var(--success-color)'
          className='mr-5'
        />
        链接：
      </h4>
      <Space size={[14, 7]} wrap>
        <LinkButton link={{ linkName: '首链接', urli: data.link }} />
        <LinkButton link={{ linkName: '后续链接', urli: data.linkback }} />
        {data?.links &&
          data.links.map((v, i) => <LinkButton link={v} key={i} />)}
      </Space>

      <Introduction txt={data.beizhu} />
    </Card>
  )
}
