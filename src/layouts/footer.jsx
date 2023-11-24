import { useState } from 'react'
import { Tabs } from 'antd'

export default () => {
  const [tabPosition, setTabPosition] = useState('bottom')
  const changeTabPosition = e => {
    setTabPosition(e.target.value)
  }
  return (
    <>
      <div>
        <Tabs
          tabPosition={tabPosition}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1)
            return {
              label: `Tab ${id}`,
              key: id,
              children: `Content of Tab ${id}`
            }
          })}
        />
      </div>
    </>
  )
}
