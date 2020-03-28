import React from 'react'
// import Auth from '../lib/authMethods'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const HomeModal = ({ props, purpose, handleModal }) => {

  return ( <div className="modal is-active">
    <div className="modal-background" onClick={e => handleModal(e)}></div>
    <div className="modal-content">
      <div className="box">
        {purpose === 'login' ? <LoginForm purpose={purpose} props={props} /> : <></>}
        {purpose === 'register' ? <RegisterForm purpose={purpose} /> : <></>}
      </div>
    </div>
  </div>)

}

export default HomeModal 