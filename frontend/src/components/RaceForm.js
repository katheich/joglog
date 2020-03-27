import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation createRace($name: String!, $date: Date!) {
    createRace (name: $name, date:$date) {
      id
      name
      date
    }
  }
`

const EDIT_MUTATION = gql`
  mutation editRace($id: ID!, $name: String!, $date: Date!) {
    editRace (id: $id, name: $name, date:$date) {
      id
      name
      date
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteRace($id: ID!) {
    deleteRace (id: $id) {
      ok
    }
  }
`

const RaceForm = ( { date, toggleModal, race }) => {

  const initialInfo = {
    description: '',
    runtype: '',
    completed: false,
    skipped: false,
    date: moment(date).format('YYYY-MM-DD')
  }
  
  const initialErrors = ''

  const [info, setInfo] = useState(initialInfo)
  const [errors, setErrors] = useState(initialErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const newInfo = { ...info, [e.target.name]: e.target.value }
    const newErrors = ''
    setInfo(newInfo)
    setErrors(newErrors)
    console.log(info)
  }

  const confirm = () => {
    toggleModal()
  }

  useEffect(() => {
    if (race) {
      const oldRace = { 
        id: parseInt(race.id),  
        name: race.name, 
        date: race.date
      }
      setInfo(oldRace)
    }
  }, [])

  return <div className="has-text-centered">
    {console.log('errors', errors)}
    {console.log('editing', info)}
    {console.log('previous data', race)}
    <form className="form form-home" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="name"
            className="input is-primary"
            placeholder="Name"
            onChange={handleChange}
            value={info.name}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-trophy"></i>
          </span>
        </div>
      </div>

      {race ? <></> : <><Mutation mutation={POST_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {postMutation => <button onClick={postMutation} className="button is-primary is-outlined">Create Race</button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </>}  
      {race ? <><Mutation mutation={EDIT_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {editMutation => <button onClick={editMutation} className="button is-primary is-outlined">Edit Race</button>}
      </Mutation>
      <Mutation mutation={DELETE_MUTATION} variables={{ id: info.id }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {deleteMutation => <button onClick={deleteMutation} className="button is-danger is-outlined">Delete Race</button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </> : <></>}     

    </form>
  </div>

}

export default RaceForm 