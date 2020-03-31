import React, { useState } from 'react'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const initialInfo = {
  username: '',
  password: '',
  passwordConfirmation: ''
}

const initialErrors = ''

const POST_MUTATION = gql`
  mutation RegisterMutation($username: String!, $password: String!, $passwordConfirmation: String!) {
    createUser (username: $username, password: $password, passwordConfirmation: $passwordConfirmation) {
      user {
        id
        username
      }
    }
  }
`


const RegisterForm = ({ handleModal }) => {

  const [info, setInfo] = useState(initialInfo)
  const [errors, setErrors] = useState(initialErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleModal(e)
  }

  const handleChange = (e) => {
    const newInfo = { ...info, [e.target.name]: e.target.value }
    const newErrors = ''
    setInfo(newInfo)
    setErrors(newErrors)
    // console.log(info)
  }

  const confirm = () => {
    console.log('SUCCESSFULLY REGISTERED')
  }

  return <div className="has-text-centered">
    {/* {console.log(errors)} */}
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
            <i className="fas fa-user"></i>
          </span>
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
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-left">
          <input
            type="password"
            name="passwordConfirmation"
            className="input"
            placeholder="Confirm password"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className={info.password === '' ? 'fas fa-exclamation' : (info.password === info.passwordConfirmation) ? 'fas fa-check' : 'fas fa-times'}></i>
          </span>
        </div>
      </div>
      <Mutation mutation={POST_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {postMutation => <button onClick={postMutation} className="button is-primary is-outlined">Register</button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
    </form>
  </div>

}

export default RegisterForm 