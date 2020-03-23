import React, { useState } from 'react'
import { AUTH_TOKEN } from '../lib/constants'


import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const initialInfo = {
  username: '',
  password: ''
}

const initialErrors = ''

const POST_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

const LoginForm = ({ props }) => {

  const [info, setInfo] = useState(initialInfo)
  const [errors, setErrors] = useState(initialErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    return
  }

  const handleChange = (e) => {
    const newInfo = { ...info, [e.target.name]: e.target.value }
    const newErrors = ''
    setInfo(newInfo)
    setErrors(newErrors)
    console.log(info)
  }

  const confirm = (data) => {
    console.log('SUCCESS', data)
    const token = data.tokenAuth.token
    setErrors(data.errors)
    localStorage.setItem(AUTH_TOKEN, token)
    props.history.push('/calendar')
  }

  return <div className="has-text-centered">
    <form className="form form-home" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          {errors && <small className="help is-primary">{errors}</small>}
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-left">
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
          {errors && <small className="help is-primary">{errors}</small>}
        </div>
      </div>
      <Mutation mutation={POST_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)}>
        {postMutation => <button onClick={postMutation} className="button is-primary is-outlined">Login</button>}
      </Mutation>
    </form>
  </div>

}

export default LoginForm 