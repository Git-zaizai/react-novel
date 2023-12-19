import { Space } from 'antd'
import CheckboxButton from './buttonCheckbox'
import { useState, useCallback } from 'react'

export default ({ options = [], onChange }) => {
  if (!options.length) return null

  const [list, setList] = useState(
    options.map((_, i) => ({ index: i, value: false }))
  )

  const change = useCallback((val, index) => {
    const xlist = list.map((mv) => {
      mv.value = false
      return mv
    })
    xlist[index].value = !val
    setList(xlist)
    onChange && onChange(xlist[index])
  })

  return (
    <>
      <Space.Compact
        size={5}
        className='w-100'
      >
        {list.map((v, i) => {
          return (
            <CheckboxButton
              key={i}
              align={options[i].align}
              icon={options[i].icon}
              txt={options[i].txt}
              index={i}
              value={list[i].value}
              change={change}
            />
          )
        })}
      </Space.Compact>
    </>
  )
}
