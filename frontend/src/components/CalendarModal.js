import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'

import PlanForm from './PlanForm'
import RunForm from './RunForm'
import RaceForm from './RaceForm'

const CalendarModal = ({ toggleModal, modalDate, info, updateInfo }) => {

  const [calendar, setCalendar] = useState(false)
  const [date, setDate] = useState('')

  const plan = info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === modalDate)
  const run = info.runs.find(run => moment(run.date).format('YYYYMMDD') === modalDate)
  const race = info.races.find(race => moment(race.date).format('YYYYMMDD') === modalDate)

  const [purpose, setPurpose] = useState('plan')

  useEffect(() => {
    race ? setPurpose('race') : run ? setPurpose('run') : setPurpose('plan')
    setDate(modalDate)
  }, [])

  function handlePurpose(e) {
    e.preventDefault()
    setPurpose(e.target.dataset.id)
  }

  function toggleCalendar() {
    setCalendar(!calendar)
  }

  function handleCalendar(e) {
    e.preventDefault()
    toggleCalendar()
  }

  function handleDate(newDate) {
    setDate(moment(newDate).format('YYYYMMDD'))
    toggleCalendar()
  }

  return ( <div className="modal is-active" id="calendar-modal">
    <div className="modal-background" onClick={e => toggleModal(e)}></div>
    <div className="modal-content">

      <div className="box">

        <div className="modaltitle">
          <div className="is-size-4">{moment(date).format('DD MMMM YYYY')}</div>
          <div className="button is-outlined is-small is-primary" onClick={handleCalendar}><i className="fas fa-pencil-alt"></i></div>
        </div>

        {calendar ?  <div id="calendar-pop"><Calendar
          onChange={handleDate}
          value={new Date(moment(date))}
        /></div> : ''}

        <div className="tabs is-medium is-centered">
          <ul>
            <li className={purpose === 'plan' ? 'is-active' : ''} data-id="plan" onClick={e => handlePurpose(e)}>
              <a data-id="plan">Plan</a>
            </li>
            <li className={purpose === 'run' ? 'is-active' : ''} data-id="run" onClick={e => handlePurpose(e)}>
              <a data-id="run">Run</a>
            </li>
            <li className={purpose === 'race' ? 'is-active' : ''} data-id="race" onClick={e => handlePurpose(e)}>
              <a data-id="race">Race</a>
            </li>
          </ul>
        </div>

        {purpose === 'plan' ? <PlanForm date={date} modalDate={modalDate} toggleModal={toggleModal} plan ={plan} updateInfo={updateInfo} /> : <></>}
        {purpose === 'run' ? <RunForm date={date} modalDate={modalDate} toggleModal={toggleModal} run={run} /> : <></>}
        {purpose === 'race' ? <RaceForm date={date} modalDate={modalDate} toggleModal={toggleModal} race={race} /> : <></>}

      </div>
    </div>
  </div>)

}

export default CalendarModal 