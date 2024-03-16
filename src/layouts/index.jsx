import { ConfigProvider, App, Layout, theme } from 'antd'
import { useLocation, useOutlet } from 'react-router-dom'
import { useStore } from '@/store'
import Nprogress from '@/components/Nprogress'
import ZaiHeader from './header'
import ZaiFooter from './footer'
import { debounce, isMobile } from '@/utlis'
import Transition from '@/components/Transition'
import AddDrawer from './addDrawer/addDrawer'
import SettingTwo from './SettingTwo/SettingTwo'

const { Header, Content, Footer } = Layout

const WinConfig = () => {
  const { message: messageApi, notification: notificationApi, modal: modalApi } = App.useApp()
  window.$message = messageApi
  window.$notification = notificationApi
  window.$modal = modalApi
  return <></>
}

export default () => {
  console.log('layout 布局')
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { store, setValueStore, nprogressToggle } = useStore()

  const drawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)'
    }
  }

  /******************************************************************** */
  const scrollViewFun = useCallback(() => () => {
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
  })

  /* useEffect(() => { */
  /*   document.querySelector('.zaiView').addEventListener( */
  /*     'scroll', */
  /*     debounce((e) => {}) */
  /*   ) */
  /* }, []) */

  return (
    <>
      <Nprogress isAnimating={store.nprogress} key={location.key} />
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
              <SettingTwo />
              <Content>
                <Transition
                  show={location.pathname}
                  timeout={300}
                  onEnter={() => nprogressToggle()}
                  onEntered={() => {
                    nprogressToggle()
                  }}
                >
                  {() => <div>{currentOutlet}</div>}
                </Transition>
              </Content>
              <ZaiFooter />
            </Layout>
          </Layout>
        </App>
      </ConfigProvider>
    </>
  )
}
