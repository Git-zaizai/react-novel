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

export default ({ children }) => {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { store, setValueStore, setThemeToggle, nprogressToggle } = useStore()

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
      debounce(e => {})
    )
  }, [])

  useEffect(() => {
    nprogressToggle()
  }, [location.pathname])

  const { nodeRef } =
    routes.find(route => route.path === location.pathname) ?? {}

  return (
    <>
      <Nprogress isAnimating={store.nprogress} key='Nprogress' />
      <ConfigProvider
        theme={{
          algorithm: store.theme ? theme.defaultAlgorithm : theme.darkAlgorithm
        }}
      >
        <App>
          <WinConfig />
          <Layout>
            <Layout>
              <Drawer />
              <ZaiHeader></ZaiHeader>
              <Content>
                <div className='zaiView' onScroll={e => scrollView(e)}>
                  <div style={{ height: '75px' }}></div>
                  <Transition
                    show={location.pathname}
                    appear={false}
                    timeout={200}
                    unmountOnExit={true}
                    nodeRef={nodeRef}
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
