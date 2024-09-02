import CuIcon from '@/components/cuIcon'
import { useNavigate, useLocation } from 'react-router-dom'
import { isMobile } from '@/utlis'
import { useStore } from '@/store'
import http from '@/utlis/http'
import { adminRoute } from '@/router/admin'
import { useMount } from 'ahooks'
import { Dropdown } from 'antd'

export default () => {
  window.logComponents('Footer')

  const navigate = useNavigate()
  const location = useLocation()
  const { userStore } = useStore()

  function getColor(path) {
    return location.pathname === path ? 'var(--success-color)' : 'var(--text-color-3)'
  }

  const handleMenuClick = route => {
    let url
    if (typeof route === 'string') {
      url = route
    } else if (route.path) {
      url = route.path
    } else {
      url = route.key
    }

    if (url !== location.pathname) {
      navigate(url)
    } else {
      const scrollEl = document.querySelector('#dropdown-pullup')
      if (scrollEl && scrollEl.scrollTop > 0) {
        scrollEl.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (document.body.scrollTop > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  if (!isMobile()) {
    const items = [
      {
        key: '/',
        icon: (
          <CuIcon
            icon="hot"
            size="32"
            style={{
              color: getColor('/'),
            }}
          />
        ),
      },
      {
        key: '/search',
        icon: (
          <CuIcon
            icon="search"
            size="32"
            style={{
              color: getColor('/search'),
            }}
          />
        ),
      },
      {
        key: '/circle',
        icon: (
          <CuIcon
            icon="circle"
            size="32"
            style={{
              color: getColor('/circle'),
            }}
          />
        ),
      },
      /* {
        key: '/icon/Cuicons',
        icon: (
          <CuIcon
            icon='tag'
            size='32'
            style={{
              color: getColor('/icon/Cuicons')
            }}
          />
        )
      } */
    ]

    if (userStore.admin) {
      adminRoute.forEach(item => {
        items.push({
          key: '/admin' + item?.path ?? '',
          icon: (
            <CuIcon
              icon={item.handle.icon}
              size="32"
              style={{
                color: getColor(item.path),
              }}
            />
          ),
        })
      })
    }

    return (
      <>
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          placement="bottom"
        >
          <footer className="pc-zaifooter flex cursor-pointer">
            <CuIcon
              icon="similar"
              size="34"
              color="var(--success-color)"
            />
          </footer>
        </Dropdown>
      </>
    )
  }

  return (
    <>
      <footer className="zaifooter">
        <div
          className="zf-item flex-fdc-aic-juc h-100"
          onClick={() => handleMenuClick('/')}
          style={{
            color: getColor('/'),
          }}
        >
          <CuIcon
            icon="hot"
            size="40"
          />
          <h4></h4>
        </div>
        <div
          className="zf-item flex-fdc-aic-juc h-100"
          onClick={() => handleMenuClick('/search')}
          style={{
            color: getColor('/search'),
          }}
        >
          <CuIcon
            icon="search"
            size="40"
          />
          <h4></h4>
        </div>
        <div
          className="zf-item flex-fdc-aic-juc h-100"
          onClick={() => handleMenuClick('/circle')}
          style={{
            color: getColor('/circle'),
          }}
        >
          <CuIcon
            icon="circle"
            size="40"
          />
          <h4></h4>
        </div>
        {/*  <div
          className='zf-item flex-fdc-aic-juc h-100'
          onClick={() => navigate('/icon/Cuicons')}
          style={{
            color: getColor('/icon')
          }}
        >
          <CuIcon icon='circle' size='40' />
          <h4></h4>
        </div> */}
        {userStore.admin &&
          adminRoute.map((v, i) => (
            <div
              key={i}
              className="zf-item flex-fdc-aic-juc h-100"
              onClick={() => handleMenuClick('/admin')}
              style={{
                color: getColor(v?.path ?? '/admin'),
              }}
            >
              <CuIcon
                icon={v.handle.icon}
                size="40"
              />
              <h4>{v.handle.footerText}</h4>
            </div>
          ))}
      </footer>
    </>
  )
}
