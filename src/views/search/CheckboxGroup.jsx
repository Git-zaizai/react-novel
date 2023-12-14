import { useToggle } from 'ahooks'
import { Button, Space } from 'antd'
import CuIcon from '@/components/cuIcon'

const CheckboxButton = ({
  value = false,
  onClick,
  icon = null,
  align = 'left',
  txt
}) => {
  return (
    <Button
      type={value ? 'primary' : 'dashed'}
      onClick={onClick}
      block
    >
      {align === 'left' && icon} {txt} {align === 'right' && icon}
    </Button>
  )
}

const Wanjie = [
  {
    icon: (
      <CuIcon
        icon='medal'
        className='mr-10'
      />
    ),
    align: 'left',
    txt: '完结'
  },
  {
    icon: (
      <CuIcon
        icon='tag'
        className='ml-10'
      />
    ),
    align: 'right',
    txt: '连载'
  }
]

export const CheckboxGroupList = ({ onChange }) => {
  const wanjieValue = Wanjie.map((_, i) => ({ index: i, value: false }))
  
  const change = (val) => {
    const index = wanjieValue.findIndex((v) => v.index === val.index)
    wanjieValue[index].value = val.value
    if (condition) {
        
    }
    onChange(wanjieValue)
  }

  return (
    <>
      <Space.Compact
        size={5}
        className='w-100'
      >
        {wanjieValue.map((v, i) => {
          return (
            <CheckboxButton
              key={i}
              align={Wanjie[i].align}
              icon={Wanjie[i].icon}
              txt={Wanjie[i].txt}
              index={i}
              onChange={change}
            />
          )
        })}
      </Space.Compact>
    </>
  )
}

export default CheckboxButton
