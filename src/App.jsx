import { HoxRoot } from 'hox'
import Router from '@/router/index'
import { checkIsDarkMode } from '@/utlis/themeColor'
import { setRootCss } from '@/styles/cssVars'
import AppProvider from './layouts/AppProvider'
import { AppConfigStoreProvider } from '@/store/appConfig'

import './styles/index.css'

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  logComponents('App')
  /* useEffect(() => {
    // setRootCss(checkIsDarkMode() ? 'light' : 'dark')
    setRootCss('dark')
  }, []) */
  setRootCss('dark')

  return (
    <>
      <AppConfigStoreProvider>
        <AppProvider>
          <HoxRoot>
            <Router />
          </HoxRoot>
        </AppProvider>
      </AppConfigStoreProvider>
    </>
  )
}

export default App
