import { useEffect } from 'react'
import { ConfigProvider, App, Layout, theme, Drawer } from 'antd'
import { useLocation, useOutlet } from 'react-router-dom'
import { useStore } from '@/store'
import Nprogress from '@/components/Nprogress'
import ZaiHeader from './header'
import ZaiFooter from './footer'
import { debounce } from '@/utlis'
import Transition from '@/components/Transition'

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
      debounce((e) => {})
    )
  }, [])

  function getThemeFn(val) {
    if (val) {
      return {
        colorPrimary: '#18a058',
        colorInfo: '#18a058',
        colorSuccess: '#18a058'
      }
    }
    return {
      colorPrimary: '#63e2b7',
      colorInfo: '#63e2b7',
      colorSuccess: '#18a058'
    }
  }

  return (
    <>
      <Nprogress
        isAnimating={store.nprogress}
        key='Nprogress'
      />
      <ConfigProvider
        theme={{
          token: getThemeFn(store.theme),
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
                <div
                  className='zaiView'
                  onScroll={(e) => scrollView(e)}
                >
                  <div style={{ height: '75px' }}></div>
                  <Transition
                    show={location.pathname}
                    appear={false}
                    timeout={300}
                    unmountOnExit={true}
                    onEnter={() => {
                      nprogressToggle()
                    }}
                    onEntered={() => {
                      nprogressToggle()
                    }}
                  >
                    {() => <div>{currentOutlet}</div>}
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
