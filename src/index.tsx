import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import * as serviceWorker from './utils/serviceWorker'
import Home from './pages/Home'
import './index.css'
import { config } from './utils/config'

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={config.routes.home} element={<Home />} />
      </Routes>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
