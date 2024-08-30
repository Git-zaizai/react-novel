import { Layout } from 'antd'
import ZaiHeader from './header'
import ZaiFooter from './footer'
import AddDrawer from './addDrawer/addDrawer'
import SettingTwo from './SettingTwo/SettingTwo'

const { Content } = Layout

export default () => {
  logComponents('LayoutDefault')

  // const currentOutlet = useOutlet()
  // console.log('🚀 ~ currentOutlet:', currentOutlet)

  return (
    <>
      <Layout>
        <ZaiHeader />
        <AddDrawer />
        <SettingTwo />
        <Content>
          <Outlet />
          {/* {currentOutlet} */}
        </Content>
        <ZaiFooter />
      </Layout>
    </>
  )
}
