import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'

import 'bulma'
import './styles/main.scss'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import Auth from './lib/Auth'

import Home from './components/Home'
import Calendar from './components/Calendar'

const httpLink = createHttpLink({
  uri: '/graphql/'
})

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => {
  
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/calendar" render={(props) => <Calendar props={props} client={client}/>} />
    </Switch>
  </HashRouter >
}


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
