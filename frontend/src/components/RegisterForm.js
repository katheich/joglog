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

  return <div className="has-text-centered">
    <form className="form form-home" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <input
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            onChange={handleChange}
          />
          {errors && <small className="help is-primary">{errors}</small>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors && <small className="help is-primary">{errors}</small>}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Confirm password"
            onChange={handleChange}
          />
          {errors && <small className="help is-primary">{errors}</small>}
        </div>
      </div>
      <button className="button is-link">
        Register
      </button>
    </form>
  </div>

}

export default LoginForm 