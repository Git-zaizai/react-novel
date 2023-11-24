import {
  ConfigProvider,
  App,
  notification,
  message,
  Layout,
  theme,
  Drawer
} from 'antd'
import { useStore } from '@/store'
import Nprogress from '@/components/Nprogress'
import ZaiHeader from './header'
import ZaiFooter from './footer'

const { Header, Content, Footer } = Layout

export default ({ children }) => {
  window.$message = message
  window.$notification = notification

  const { store, setThemeToggle, nprogressToggle } = useStore()

  return (
    <>
      <Nprogress isAnimating={store.nprogress} key='Nprogress' />
      <ConfigProvider
        theme={{
          algorithm: store.theme ? theme.defaultAlgorithm : theme.darkAlgorithm
        }}
      >
        <Layout>
          <Layout>
            <Drawer />
            <ZaiHeader></ZaiHeader>
            <Content>
              <div className='zaiView'>{children}</div>
            </Content>
            <Footer style={{ background: 'var(--body-color)' }}>
              <ZaiFooter />
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  )
}
