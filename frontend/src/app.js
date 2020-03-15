import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'

import 'bulma'
import './styles/main.scss'

import Home from './components/Home'
import Calendar from './components/Calendar'

const App = () => {
  
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/calendar" component={Calendar} />
    </Switch>
  </HashRouter >
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
