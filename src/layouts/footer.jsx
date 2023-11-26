import CuIcon from '@/components/cuIcon'
import { useNavigate, useLocation } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  function getColor(path) {
    return location.pathname === path
      ? 'var(--success-color)'
      : 'var(--text-color-3)'
  }

  return (
    <>
      <footer className='zaifooter flex'>
        <dir
          className='zf-item flex-fdc-aic-juc'
          onClick={() => navigate('/')}
          style={{
            color: getColor('/')
          }}
        >
          <CuIcon icon='hot' size='30' />
          <h4>首页</h4>
        </dir>
        <dir
          className='zf-item flex-fdc-aic-juc'
          onClick={() => navigate('/icon/Cuicons')}
          style={{
            color: getColor('/icon/Cuicons')
          }}
        >
          <CuIcon icon='favor' size='30' />
          <h4>icon</h4>
        </dir>
      </footer>
    </>
  )
}
