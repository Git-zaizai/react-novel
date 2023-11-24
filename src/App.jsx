import './App.css'
import { HoxRoot } from 'hox'

import Router from './router/index'
import TabBar from '@/layouts/tabBar/tabBar'
import Card from '@/components/Card/Card'

import Layouts from './layouts'



/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <>
      <HoxRoot>
        <Layouts></Layouts>
      </HoxRoot>
    </>
  )
}

export default App
