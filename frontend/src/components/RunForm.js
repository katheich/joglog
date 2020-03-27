import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation createRun($units: String!, $date: Date!, $runtype: String!, $distance: Decimal!, $duration: Decimal!, $avgHr: Int!, $notes: String!) {
    createRun (units: $units, date: $date, runtype: $runtype, distance: $distance, duration:$duration, avgHr:$avgHr, notes:$notes) {
      id
    }
  }
`

const EDIT_MUTATION = gql`
  mutation editPlan($id: ID!, $completed: Boolean!, $description: String!, $date: Date!, $runtype: String!, $skipped: Boolean!) {
    editPlan (id: $id, completed: $completed, description: $description, date:$date, runtype: $runtype, skipped: $skipped) {
      id
      description
      date
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

const RunForm = ( { date, toggleModal, run }) => {

  const initialInfo = {
    distance: '',
    runtype: '',
    duration: '',
    avgHr: '',
    notes: '',
    units: '',
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
    if (run) {
      const oldRun = { 
        id: parseInt(run.id),  
        distance: run.distance,
        runtype: run.runtype,
        duration: run.duration,
        avgHr: run.avgHr,
        notes: run.notes,
        units: run.units
      }
      setInfo(oldRun)
    }
  }, [])

  return <div className="has-text-centered">
    {console.log('errors', errors)}
    {console.log('editing', info)}
    {console.log('previous data', run)}
    <form className="form form-home" onSubmit={handleSubmit}>

      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="distance"
            className="input is-primary"
            placeholder="Distance"
            onChange={handleChange}
            value={info.distance}
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
                name='units'>
                <option value='' selected={run ? '' : 'selected'} disabled="disabled">Select units</option>
                <option value='KM' selected={info.runtype === 'KM' ? 'selected' : ''}>kilometres</option>
                <option value='MI' selected={info.runtype === 'MI' ? 'selected' : ''}>miles</option>
              </select>
            </div>
            <span className="icon is-small is-left">
              <i className='fas fa-running'></i>
            </span>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="duration"
            className="input is-primary"
            placeholder="Duration"
            onChange={handleChange}
            value={info.duration}
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
                <option value='' selected={run ? '' : 'selected'} disabled="disabled">Select a run type</option>
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

      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="avgHr"
            className="input is-primary"
            placeholder="Average Heart Rate (bpm)"
            onChange={handleChange}
            value={info.avgHr}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-pencil-ruler"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            name="notes"
            className="input is-primary"
            placeholder="Notes"
            onChange={handleChange}
            value={info.notes}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-pencil-ruler"></i>
          </span>
        </div>
      </div>

      {run ? <></> : <><Mutation mutation={POST_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {postMutation => <button onClick={postMutation} className="button is-primary is-outlined">Create Run</button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </>}  
      {/* {plan ? <><Mutation mutation={EDIT_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {editMutation => <button onClick={editMutation} className="button is-primary is-outlined">Edit Plan</button>}
      </Mutation>
      <Mutation mutation={DELETE_MUTATION} variables={{ id: info.id }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {deleteMutation => <button onClick={deleteMutation} className="button is-danger is-outlined">Delete Plan</button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </> : <></>}      */}

    </form>
  </div>

}

export default RunForm 