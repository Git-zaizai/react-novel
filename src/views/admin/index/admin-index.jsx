import { useLocation, useOutlet } from 'react-router-dom'

export default () => {
  const currentOutlet = useOutlet()
  return (
    <div>
      <currentOutlet />
    </div>
  )
}
