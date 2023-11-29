import { useEffect } from 'react'
import { ConfigProvider, App, Layout, theme, Drawer } from 'antd'
import { useLocation, useOutlet } from 'react-router-dom'
import { useStore } from '@/store'
import Nprogress from '@/components/Nprogress'
import ZaiHeader from './header'
import ZaiFooter from './footer'
import { debounce } from '@/utlis'
import Transition from '@/components/Transition'
import { routes } from '@/router'
import AddDrawer from './addDrawer/addDrawer'

const { Header, Content, Footer } = Layout

const WinConfig = () => {
  const {
    message: messageApi,
    notification: notificationApi,
    modal: modalApi
  } = App.useApp()
  window.$message = messageApi
  window.$notification = notificationApi
  window.$modal = modalApi
  return <></>
}

export default () => {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { store, setValueStore, setThemeToggle, nprogressToggle } = useStore()

  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}

  const drawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)'
    }
  }

  /******************************************************************** */
  const scrollView = () => {
    const scrolltop = document.querySelector('.zaiView').scrollTop
    if (scrolltop > 100) {
      setValueStore({
        mainScroll: true
      })
    } else {
      setValueStore({
        mainScroll: false
      })
    }
  }

  useEffect(() => {
    setThemeToggle()
    setThemeToggle()
    document.querySelector('.zaiView').addEventListener(
      'scroll',
      debounce((e) => {})
    )
  }, [])

  return (
    <>
      <Nprogress
        isAnimating={store.nprogress}
        key={location.key}
      />
      <ConfigProvider
        drawer={{
          styles: drawerStyles
        }}
        theme={{
          token: store.themeToken,
          algorithm: store.theme ? theme.defaultAlgorithm : theme.darkAlgorithm
        }}
      >
        <App message={{ top: 70 }}>
          <WinConfig />
          <Layout>
            <Layout>
              <ZaiHeader />
              <AddDrawer />
              <Content>
                <div
                  className='zaiView'
                  onScroll={(e) => scrollView(e)}
                >
                  <div style={{ height: '75px' }}></div>
                  <Transition
                    show={location.pathname}
                    appear={false}
                    timeout={200}
                    unmountOnExit={true}
                    nodeRef={nodeRef}
                    onEnter={() => nprogressToggle()}
                    onEntered={() => {
                      nprogressToggle()
                    }}
                  >
                    {() => <div ref={nodeRef}>{currentOutlet}</div>}
                  </Transition>
                </div>
              </Content>
              <ZaiFooter />
            </Layout>
          </Layout>
        </App>
      </ConfigProvider>
    </>
  )
}
