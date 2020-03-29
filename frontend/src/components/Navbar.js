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
const Navbar = ({props, mobile, toggleMobileView }) => {

  function handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    props.history.push('/')
  }

  if (!Auth.isAuthorized()) return <></>
  return (<div className="" id="navbar">
    {console.log(mobile)}
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="start">
        <div className="level is-mobile">

        
          <div className="level-start">
            <div className="level-item">
              <div className="title is-size-4-mobile">
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
            <div className="level-item mobile-only">
              <div className="tabs is-primary is-small is-toggle">
                <ul>
                  <li className={mobile === 'plans' ? 'is-active' : ''}>
                    <a onClick={toggleMobileView}>
                      <span className="icon is-small"><i className="fas fa-pencil-ruler" aria-hidden="true"></i></span>
                      <span>Plan</span>
                    </a>
                  </li>
                  <li className={mobile === 'runs' ? 'is-active' : ''}>
                    <a onClick={toggleMobileView}>
                      <span className="icon is-small"><i className="fas fa-running" aria-hidden="true"></i></span>
                      <span>Runs</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="level-item">
              <button className="button is-primary is-outlined" onClick={handleLogout}> 
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
    </nav>
  </div>)
}

export default withRouter(Navbar)