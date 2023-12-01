import { HoxRoot } from 'hox'
import RouterView from '@/router/index'
import { checkIsDarkMode } from '@/utlis/themeColor'
import { setRootCss } from '@/styles/cssVars'

import './styles/index.css'
import { useEffect } from 'react'

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
