import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@icon-park/react/styles/index.css'
/**
 *     <React.StrictMode>
        <App/>
    </React.StrictMode>,http://116.204.106.221/gadgets/uploads/2023-12-06/cf11f00b081701870084084.sql
 *
 */
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

import eruda from 'eruda'
let el = document.createElement('div')
document.body.appendChild(el)
eruda.init({
  container: el
})
