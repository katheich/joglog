import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { formatTime, deformatTime } from '../lib/formatting'

const POST_MUTATION = gql`
  mutation createRun($units: String!, $date: Date!, $runtype: String!, $distance: Decimal!, $duration: Decimal!, $avgHr: Int!, $notes: String!) {
    createRun (units: $units, date: $date, runtype: $runtype, distance: $distance, duration:$duration, avgHr:$avgHr, notes:$notes) {
      id
    }
  }
`

const EDIT_MUTATION = gql`
mutation editRun($id: ID!, $units: String!, $date: Date!, $runtype: String!, $distance: Decimal!, $duration: Decimal!, $avgHr: Int!, $notes: String!) {
  editRun (id: $id, units: $units, date: $date, runtype: $runtype, distance: $distance, duration:$duration, avgHr:$avgHr, notes:$notes) {
    id
  }
}
`

const DELETE_MUTATION = gql`
  mutation deleteRun($id: ID!) {
    deleteRun (id: $id) {
      ok
    }
  }
`

const RunForm = ( { date, modalDate, toggleModal, run }) => {

  const initialInfo = {
    distance: '',
    runtype: '',
    duration: '',
    avgHr: '',
    notes: '',
    units: '',
    date: moment(modalDate).format('YYYY-MM-DD')
  }
  
  const initialErrors = ''

  const [info, setInfo] = useState(initialInfo)
  const [errors, setErrors] = useState(initialErrors)
  const [duration, setDuration] = useState({ hours: '', minutes: '', seconds: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {

    if (e.target.name === 'hours' || e.target.name === 'minutes' || e.target.name === 'seconds') {
      const newDuration = { ...duration, [e.target.name]: e.target.value }
      setDuration(newDuration)
      const decDuration = deformatTime(newDuration.hours, newDuration.minutes, newDuration.seconds)
      setInfo({ ...info, duration: decDuration })

    } else {
      const newInfo = { ...info, [e.target.name]: e.target.value }
      setInfo(newInfo)
      
    }
    const newErrors = ''
    setErrors(newErrors)
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
        units: run.units,
        date: run.date
      }

      const formattedDuration = formatTime(run.duration, 'hms')
      setDuration({ hours: formattedDuration.slice(0, 2), minutes: formattedDuration.slice(3, 5), seconds: formattedDuration.slice(6, 8) })
      setInfo(oldRun)
    }
  }, [])


  useEffect(() => {
    if (date && date !== modalDate) {
      setInfo({ ...info, date: moment(date).format('YYYY-MM-DD') })
    }
  }, [date])

  return <div className="has-text-centered">
    {/* {console.log('errors', errors)} */}
    {console.log('editing', info)}
    {/* {console.log('previous data', run)} */}
    {console.log('duration', duration)}
    <form className="form form-home" onSubmit={handleSubmit}>
      <div className="distancefields">
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
              <i className="fas fa-route"></i>
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
                  <option value='KM' selected={!run || info.runtype === 'KM' ? 'selected' : ''}>km</option>
                  <option value='MI' selected={info.runtype === 'MI' ? 'selected' : ''}>mi</option>
                </select>
              </div>
              <span className="icon is-small is-left">
                <i className='fas fa-ruler-combined'></i>
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="durationfields">
        <div className="field">
          <div className="control has-icons-left">
            <input
              type="text"
              name="hours"
              className="input is-primary"
              placeholder="Total duration: hours"
              onChange={handleChange}
              value={duration.hours}
            />
            <span className="icon is-small is-left">
              <i className='fas fa-stopwatch'></i>
            </span>
          </div>
    
        </div>

        <div className="field">
          <div className="control">
            <input
              type="text"
              name="minutes"
              className="input is-primary"
              placeholder="minutes"
              onChange={handleChange}
              value={duration.minutes}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              type="text"
              name="seconds"
              className="input is-primary"
              placeholder="seconds"
              onChange={handleChange}
              value={duration.seconds}
            />
          </div>
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
            <i className="fas fa-heartbeat"></i>
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
            <i className="fas fa-clipboard"></i>
          </span>
        </div>
      </div>

      {run ? <></> : <><Mutation mutation={POST_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {postMutation => <button onClick={postMutation} className="button is-primary"><i className="fas fa-check"></i></button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </>}  
      {run ? <><Mutation mutation={EDIT_MUTATION} variables={{ ...info }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {editMutation => <button onClick={editMutation} className="button is-primary"><i className="fas fa-check"></i></button>}
      </Mutation>
      <Mutation mutation={DELETE_MUTATION} variables={{ id: info.id }} onCompleted={data => confirm(data)} onError={err => setErrors(err.message)}>
        {deleteMutation => <button onClick={deleteMutation} className="button is-danger"><i className="fas fa-trash-alt"></i></button>}
      </Mutation>
      {errors && <small className="help is-danger">{errors}</small>}
      </> : <></>}     

    </form>
  </div>

}

export default RunForm 