import React from 'react'

import pencil from '../images/pencil.png'
import sneaker from '../images/sneaker.png'
// const infoType = 'user'

const Home = () => (
  <section className="hero is-fullheight has-text-right" id="home">
    <div className="hero-title">
      <div className="container">
        <div className="button register"><figure className="image is-48x48" ><img src={pencil}/></figure><div className="label">Register</div></div>
        <div className="button login"><figure className="image is-48x48" ><img src={sneaker}/></figure><div className="label">Login</div></div>
        <div className="title">Jog Log</div>
      </div>
    </div>
    <div className="shadow"></div>
  </section>
)

export default Home