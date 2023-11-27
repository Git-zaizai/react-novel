import { HoxRoot } from 'hox'
import RouterView from '@/router/index'
import Layouts from './layouts'

import './styles/index.css'

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <>
      <HoxRoot>
        <RouterView></RouterView>
      </HoxRoot>
    </>
  )
}

export default App
