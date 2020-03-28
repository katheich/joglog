import React from 'react'
import { withRouter } from 'react-router-dom'

import Auth from '../lib/auth'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ME_QUERY = gql`
  {
    me {
      username
    }

  }        
`
const Navbar = (props) => {

  function handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    props.history.push('/')
  }

  if (!Auth.isAuthorized()) return <></>
  return (<div className="" id="navbar">
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="start">
        <div className="level">

        
          <div className="level-start">
            <div className="level-item">
              <div className="title">
                <Query query={ME_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return null
                    }
                    if (error) {
                      
                      return <span>(no username found)</span>
                    }
                    
                    return <span>{data.me.username}&apos;s</span> 
                    
                  }}
                </Query>
                <span> Jog Log</span>
              </div>
            </div>
          </div>
          <div className="level-end">
            <div className="level-item">
              <button className="button is-primary is-outlined" onClick={handleLogout}> 
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>)
}

export default withRouter(Navbar)