import React, { useState } from 'react'
import axios from 'axios'
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
    <button className="modal-close is-large" onClick={e => handleModal(e)} aria-label="close"></button>
  </div>)

}

export default HomeModal 