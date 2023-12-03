import { HoxRoot } from 'hox'
import RouterView from '@/router/index'
import { checkIsDarkMode } from '@/utlis/themeColor'
import { setRootCss } from '@/styles/cssVars'
import { useEffect } from 'react'

import './styles/index.css'

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  useEffect(() => {
    setRootCss(checkIsDarkMode() ? 'light' : 'dark')
  }, [])
  return (
    <>
      <HoxRoot>
        <RouterView></RouterView>
      </HoxRoot>
    </>
  )
}

export default App
