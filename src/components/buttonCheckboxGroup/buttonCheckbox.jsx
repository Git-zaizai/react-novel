import { Button } from 'antd'

export default ({
  value = false,
  change,
  icon = null,
  align = '',
  txt,
  index
}) => {
  let style = {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    lineHeight: '1.6'
  }
  let view = txt
  if (align === 'left') {
    style.justifyContent = 'flex-start'
    view = (
      <>
        {icon}
        {txt}
      </>
    )
  }

  if (align === 'right') {
    style.justifyContent = 'flex-end'
    view = (
      <>
        {txt}
        {icon}
      </>
    )
  }

  return (
    <Button
      type={value ? 'primary' : 'default'}
      onClick={() => change(value, index)}
      block
    >
      <div style={style}>{view}</div>
    </Button>
  )
}
