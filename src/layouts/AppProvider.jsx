import { ConfigProvider, App, theme } from 'antd'

import { useAppStore } from '@/store/appConfig'

const drawerStyles = {
  mask: {
    backdropFilter: 'blur(10px)',
  },
}

const GlobeFn = () => {
  const { message: messageApi, notification: notificationApi, modal: modalApi } = App.useApp()
  window.$message = messageApi
  window.$notification = notificationApi
  window.$modal = modalApi
  return <></>
}

const AppProvider = memo(({ children }) => {
  window.logComponents('AppProvider')

  const { appTheme } = useAppStore()

  const CreateWindow = useMemo(() => GlobeFn, [])

  return (
    <>
      <ConfigProvider
        drawer={{
          styles: drawerStyles,
        }}
        theme={{
          token: appTheme.themeToken,
          algorithm: appTheme.theme ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <App message={{ top: 70 }}>
          <CreateWindow />
          {children}
        </App>
      </ConfigProvider>
    </>
  )
})

export default AppProvider
