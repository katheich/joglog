import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'

import Home from './components/Home'

const App = () => {
  
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </HashRouter >
}









ReactDOM.render(
  <App />,
  document.getElementById('root')
)
