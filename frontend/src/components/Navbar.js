import React from 'react'
import { withRouter } from 'react-router-dom'


import Auth from '../lib/auth'

const Navbar = (props) => {

  function handleLogout(e) {
    e.preventDefault()
    Auth.logout()
    props.history.push('/')
  }

  if (!Auth.isAuthorized()) return <></>
  return (<div className="container">
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <navbar className="start">
        <div className="navbar-item">
            Hello
        </div>
      </navbar>
      <div className="navbar-end">
        <div className="navbar-item">
          <button className="button is-primary is-outlined" onClick={handleLogout}> 
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </nav>
  </div>)
}

export default withRouter(Navbar)