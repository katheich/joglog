import React, { useState } from 'react'

import pencil from '../images/pencil.png'
import sneaker from '../images/sneaker.png'
// const infoType = 'user'

import HomeModal from './HomeModal'

const Home = (props) => {

  const [modal, setModal] = useState(false)
  const [purpose, setPurpose] = useState('')

  function handleModal(e) {
    e.preventDefault
    console.log(e.target.dataset.purpose)
    setModal(!modal)
    setPurpose(e.target.dataset.purpose)
  } 

  return (<section className="hero is-fullheight has-text-right" id="home">
    <div className="hero-title">
      <div className="container">
        <div className="button" data-purpose="register" onClick={e => handleModal(e)}><figure className="image is-48x48" data-purpose="register" ><img src={pencil} data-purpose="register" /></figure><div className="label" data-purpose="register">Register</div></div>
        <div className="button" data-purpose="login" onClick={e => handleModal(e)}><figure className="image is-48x48" data-purpose="login"><img src={sneaker} data-purpose="login"/></figure><div className="label" data-purpose="login">Login</div></div>
        <div className="title">Jog Log</div>
      </div>
    </div>
    <div className="shadow"></div>
    {modal ? <HomeModal purpose={purpose} props={props} handleModal={handleModal} /> : <></>}
  </section>)
}

export default Home