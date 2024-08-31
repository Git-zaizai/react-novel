import styles from './novelCard.module.css'

import CuIcon from '../../cuIcon'
import { LinkTwo, TagOne, Asterisk } from '@icon-park/react'

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
  if (link.urli === '') {
    return
  }
  return (
    <Button
      type="dashed"
      className={styles.novelCardLinkBut}
      icon={
        <LinkTwo
          theme="outline"
          size="15"
        />
      }
      onClick={() => {
        copyText(link.urli, msg => window.$message.success(msg))
      }}
    >
      {link.linkName}
    </Button>
  )
}

function LinkButtons({ link, linkback, links }) {
  if (!link && !linkback && !links.length) {
    return
  }

  return (
    <Space
      size={[14, 7]}
      wrap
      className="mt-10"
    >
      <LinkButton link={{ linkName: '首链接', urli: link }} />
      <LinkButton link={{ linkName: '后续链接', urli: linkback }} />
      {links.map((v, i) => (
        <LinkButton
          link={v}
          key={i}
        />
      ))}
    </Space>
  )
}

function Chapter({ start, finish }) {
  if (!start && !finish) {
    return null
  }

  return (
    <div className="flex-ai-c mt-10">
      <Asterisk
        theme="outline"
        size="18"
        fill="var(--success-color)"
      />
      <h4 className={styles.cardExtra + ' ml-10'}>
        第 {start || '?'}&ensp;-&ensp;{finish || '?'} 章
      </h4>
      <Tag
        color={randomHexColor()}
        className="ml-auto"
      >
        完结
      </Tag>
    </div>
  )
}

const ChapterMome = memo(Chapter)
const LinkButtonsMemo = memo(LinkButtons)

const Dropdowns = [
  {
    key: 'update',
    label: <h4 className="text-align">修改</h4>,
  },
  {
    key: 'delete',
    label: <h4 className="text-align">删除</h4>,
  },
]

export default ({ data, index, style, ReadoffClick, dropdownClick }) => {
  const binddropdownClick = item => {
    dropdownClick && dropdownClick(item.key, data)
  }

  return (
    <Card
      style={style}
      className={styles.novelCard}
      bordered={false}
      hoverable
      title={
        <div className="flex">
          <Dropdown
            menu={{
              items: Dropdowns,
              onClick: binddropdownClick,
            }}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <CuIcon
              icon="hot"
              size="22"
              color="var(--primary-color)"
              className="mr-10"
            />
          </Dropdown>
          <h4
            className="wax-100 singe-line"
            onClick={() => copyText(data.title, msg => window.$message.success(msg))}
          >
            {data.title}
          </h4>
        </div>
      }
      extra={
        data.duwan === 1 ? (
          <div className="flex-ai-c">
            <Tag
              color="var(--success-color)"
              className="ml-auto"
              onClick={() => ReadoffClick(data)}
            >
              读完
            </Tag>
            <h5 className="ml-5">{index ?? ''}</h5>
          </div>
        ) : (
          <div className="flex-ai-c">
            <div
              className={styles.novelCarddiwan + 'ml-auto mr-5'}
              onClick={() => ReadoffClick(data)}
            >
              未读完
            </div>
            <h5 className="ml-5">{index ?? ''}</h5>
          </div>
        )
      }
    >
      <div className={`flex-ai-c flex-wrap ${styles.Tagsview}`}>
        <TagOne
          theme="outline"
          size="18"
          fill="var(--success-color)"
          className="mr-5 el-transition-color"
        />
        标签：
        {data.tabs.map(item => (
          <Tag
            key={item.tab}
            color={item.color}
          >
            {item.tab}
          </Tag>
        ))}
      </div>

      <ChapterMome
        start={data.start}
        finish={data.finish}
      />

      <h4 className="flex-ai-c mt-10">
        <LinkTwo
          theme="outline"
          size="18"
          fill="var(--success-color)"
          className="mr-5"
        />
        链接：
      </h4>
      <LinkButtonsMemo
        link={data.link}
        linkback={data.linkback}
        links={data.links}
      />

      <Introduction txt={data.beizhu} />
    </Card>
  )
}
