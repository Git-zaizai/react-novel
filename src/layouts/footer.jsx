import CuIcon from '@/components/cuIcon'
import { useNavigate, useLocation } from 'react-router-dom'
import { isMobile } from '@/utlis'
import { useStore } from '@/store'
import http from '@/utlis/http'
import adminRoute from '@/router/admin'
import { useMount } from 'ahooks'

export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userStore, setUserStore } = useStore()

  function getColor(path) {
    return location.pathname === path
      ? 'var(--success-color)'
      : 'var(--text-color-3)'
  }

  async function isUserAdmin() {
    if (!localStorage.getItem('token')) return

    const response = await http.get('/verifyUser').catch((err) => {
      window.$message.error(err)
    })

    if (response === 'root') {
      setUserStore({ admin: true })
    }
  }

  useMount(() => isUserAdmin())

  return (
    isMobile() && (
      <>
        <footer className='zaifooter flex'>
          <div
            className='zf-item flex-fdc-aic-juc h-100'
            onClick={() => navigate('/')}
            style={{
              color: getColor('/')
            }}
          >
            <CuIcon
              icon='hot'
              size='30'
            />
            <h4></h4>
          </div>
          <div
            className='zf-item flex-fdc-aic-juc h-100'
            onClick={() => navigate('/search')}
            style={{
              color: getColor('/search')
            }}
          >
            <CuIcon
              icon='search'
              size='30'
            />
            <h4></h4>
          </div>
          <div
            className='zf-item flex-fdc-aic-juc h-100'
            onClick={() => navigate('/circle')}
            style={{
              color: getColor('/circle')
            }}
          >
            <CuIcon
              icon='circle'
              size='30'
            />
            <h4></h4>
          </div>
          {userStore.admin &&
            adminRoute.map((v) => (
              <div
                key={v.path}
                className='zf-item flex-fdc-aic-juc h-100'
                onClick={() => navigate(v.path)}
                style={{
                  color: getColor(v.path)
                }}
              >
                <CuIcon
                  icon={v.meta.icon}
                  size='30'
                />
                <h4>{v.meta.footerText}</h4>
              </div>
            ))}
          <div
            className='zf-item flex-fdc-aic-juc h-100'
            onClick={() => navigate('/icon/Cuicons')}
            style={{
              color: getColor('/icon/Cuicons')
            }}
          >
            <CuIcon
              icon='favor'
              size='30'
            />
            <h4>icon</h4>
          </div>
          <div
            className='zf-item flex-fdc-aic-juc h-100'
            onClick={() => navigate('/test-view')}
            style={{
              color: getColor('/test-view')
            }}
          >
            <CuIcon
              icon='repair'
              size='30'
            />
            <h4>test-view</h4>
          </div>
        </footer>
      </>
    )
  )
}
