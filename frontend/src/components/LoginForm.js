import React, { useState } from 'react'
import axios from 'axios'
// import Auth from '../lib/authMethods'

const initialData = {
  username: '',
  password: ''
}

const initialErrors = ''


const LoginForm = ({ props }) => {

  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState(initialErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    return
  }

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value }
    const newErrors = ''
    setData(newData)
    setErrors(newErrors)
    console.log(data)
  }

  return <section className="section">
    <div className="container">

      <h1 className="title home-form-title">
        <div className="bracket-form is-size-1 has-text-white">[</div>
        <div className="title-name has-text-white has-text-weight-bold">Login</div>
        <div className="bracket-form has-text-white is-size-1">]</div>
      </h1>
      <form className="form form-home" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Username
          </label>
          <div className="control">
            <input
              type="text"
              name="username"
              className="input"
              onChange={handleChange}
            />
            {errors && <small className="help is-primary">{errors}</small>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Password
          </label>
          <div className="control">
            <input
              type="password"
              name="password"
              className="input"
              onChange={handleChange}
            />
            {errors && <small className="help is-primary">{errors}</small>}
          </div>
        </div>
        <button className="button is-link">
          Login
        </button>
      </form>
    </div>
  </section>
}

export default LoginForm 