import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation createPlan($completed: Boolean!, $description: String!, $date: Date!, $runtype: String!, $skipped: Boolean!) {
    createPlan (completed: $completed, description: $description, date:$date, runtype: $runtype, skipped: $skipped) {
      id
      description
      date
      runtype
    }
  }
`

const EDIT_MUTATION = gql`
  mutation editPlan($id: ID!, $completed: Boolean!, $description: String!, $date: Date!, $runtype: String!, $skipped: Boolean!) {
    editPlan (id: $id, completed: $completed, description: $description, date:$date, runtype: $runtype, skipped: $skipped) {
      id
      description
      date
      runtype
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deletePlan($id: ID!) {
    deletePlan (id: $id) {
      ok
    }
  }
`

const PlanForm = ( { date, modalDate, toggleModal, plan, updateInfo }) => {

  const initialInfo = {
    description: '',
    runtype: 'UNCATEGORISED',
    completed: false,
    skipped: false,
    date: moment(modalDate).format('YYYY-MM-DD')
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
    setInfo({ ...info, [e.target.id]: !info[e.target.id] })
  }

  const confirm = (data, operation) => {
    console.log('DATA RECEIVED IN RESPONSE', data)
    toggleModal()
    updateInfo(operation, 'plans', data)
  }

  useEffect(() => {
    if (plan) {
      const oldPlan = { 
        id: parseInt(plan.id),  
        completed: plan.completed, 
        description: plan.description, 
        date: plan.date, 
        runtype: plan.runtype, 
        skipped: plan.skipped
      }
      setInfo(oldPlan)
    }
  }, [])

  useEffect(() => {
    if (date && date !== modalDate) {
      setInfo({ ...info, date: moment(date).format('YYYY-MM-DD') })
    }
  }, [date])

  return <div className="has-text-centered">
    {console.log('errors', errors)}
    {console.log('editing', info)}
    {console.log('previous data', plan)}
    <form className="form form-home" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="description"
            className="input is-primary"
            placeholder="Description"
            onChange={handleChange}
            value={info.description}
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
                <option value='' disabled="disabled">Select a run type</option>
                <option value='EASY' selected={info.runtype === 'EASY' ? 'selected' : ''}>Easy run</option>
                <option value='ENDURANCE' selected={info.runtype === 'ENDURANCE' ? 'selected' : ''}>Endurance run</option>
                <option value='INTERVALS' selected={info.runtype === 'INTERVALS' ? 'selected' : ''}>Intervals</option>
                <option value='TEMPO' selected={info.runtype === 'TEMPO' ? 'selected' : ''}>Tempo run</option>
                <option value='UNCATEGORISED' selected={info.runtype === 'UNCATEGORISED' ? 'selected' : ''}>Uncategorised run</option>
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
      {plan ? <></> : <>
      <Mutation 
        mutation={POST_MUTATION} 
        variables={{ ...info }} 
        onCompleted={data => confirm(data.createPlan, 'create')} 
        onError={err => setErrors(err.message)}
      >
        {postMutation => <button onClick={postMutation} className="button is-primary"><i className="fas fa-check"></i></button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </>}  
      {plan ? <><Mutation mutation={EDIT_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data.editPlan, 'update')} onError={err => setErrors(err.message)}>
        {editMutation => <button onClick={editMutation} className="button is-primary"><i className="fas fa-check"></i></button>}
      </Mutation>
      <Mutation mutation={DELETE_MUTATION} variables={{ id: info.id }} onCompleted={data => confirm(data, 'delete')} onError={err => setErrors(err.message)}>
        {deleteMutation => <button onClick={deleteMutation} className="button is-danger"><i className="fas fa-trash-alt"></i></button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </> : <></>}     

    </form>
  </div>

}

export default PlanForm 