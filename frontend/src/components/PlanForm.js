import React, { useState } from 'react'
import moment from 'moment'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation createPlan($completed: Boolean!, $description: String!, $date: Date!, $runtype: String!, $skipped: Boolean!) {
    createPlan (completed: $completed, description: $description, date:$date, runtype: $runtype, skipped: $skipped) {
      id
      description
      date
    }
  }
`

const PlanForm = ( { date, toggleModal }) => {

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

  function handleCheck(e) {
    console.log('checked?', info[e.target.id])
    console.log('id?', e.target.id)

    setInfo({ ...info, [e.target.id]: !info[e.target.id] })

  }

  const confirm = () => {
    console.log('SUCCESSFULLY SENT PLAN')
  }

  return <div className="has-text-centered">
    {console.log(errors)}
    {console.log(info)}
    <form className="form form-home" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="description"
            className="input is-primary"
            placeholder="Description"
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-pencil-ruler"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <div className='control has-icons-left'>
            <div className='select is-primary'>
              <select
                onChange={handleChange}
                name='runtype'>
                <option value='' selected="selected" disabled="disabled">Select a run type</option>
                <option value='EASY'>Easy run</option>
                <option value='ENDURANCE'>Endurance run</option>
                <option value='INTERVALS'>Intervals</option>
                <option value='TEMPO'>Tempo run</option>
                <option value='UNCATEGORISED'>Uncategorised run</option>
              </select>
            </div>
            <span className="icon is-small is-left">
              <i className='fas fa-running'></i>
            </span>
          </div>
        </div>
      </div>

      <div className="checkboxes">
        <div className="field">
          <input className="is-checkradio is-primary is-rtl" id="completed" type="checkbox" name="completed" checked={info.completed} onChange={handleCheck} />
          <label htmlFor="completed">Completed</label>
        </div>

        <div className="field">
          <input className="is-checkradio is-primary is-rtl" id="skipped" type="checkbox" name="skipped" checked={info.skipped} onChange={handleCheck} />
          <label htmlFor="skipped">Skipped</label>
        </div>
      </div>

      
      
      <Mutation mutation={POST_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {postMutation => <button onClick={postMutation} className="button is-primary is-outlined">Submit Plan</button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
    </form>
  </div>

}

export default PlanForm 