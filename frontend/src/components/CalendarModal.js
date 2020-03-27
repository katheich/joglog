import React, { useState, useEffect } from 'react'
import moment from 'moment'

import PlanForm from './PlanForm'
import RunForm from './RunForm'
import RaceForm from './RaceForm'

const CalendarModal = ({ toggleModal, modalDate, info }) => {

  const plan = info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === modalDate)
  const run = info.runs.find(run => moment(run.date).format('YYYYMMDD') === modalDate)
  const race = info.races.find(race => moment(race.date).format('YYYYMMDD') === modalDate)

  const [purpose, setPurpose] = useState('plan')

  useEffect(() => {
    race ? setPurpose('race') : run ? setPurpose('run') : setPurpose('plan')
  }, [])

  function handlePurpose(e) {
    e.preventDefault()
    setPurpose(e.target.dataset.id)
  }

  return ( <div className="modal is-active" id="calendar-modal">
    <div className="modal-background" onClick={e => toggleModal(e)}></div>
    <div className="modal-content">

      <div className="box">
        <div className="subtitle">{moment(modalDate).format('DD MMMM YYYY')}</div>

        <div className="tabs is-centered">
          <ul>
            <li className={purpose === 'plan' ? 'is-medium is-active' : 'is-medium'} data-id="plan" onClick={e => handlePurpose(e)}><a data-id="plan">Plan</a></li>
            <li className={purpose === 'run' ? 'is-medium is-active' : 'is-medium'} data-id="run" onClick={e => handlePurpose(e)}><a data-id="run">Run</a></li>
            <li className={purpose === 'race' ? 'is-medium is-active' : 'is-medium'} data-id="race" onClick={e => handlePurpose(e)}><a data-id="race">Race</a></li>
          </ul>
        </div>

        {purpose === 'plan' ? <PlanForm date={modalDate} toggleModal={toggleModal} plan ={plan} /> : <></>}
        {purpose === 'run' ? <RunForm date={modalDate} toggleModal={toggleModal} run={run} /> : <></>}
        {purpose === 'race' ? <RaceForm date={modalDate} toggleModal={toggleModal} race={race} /> : <></>}


      </div>
    </div>
    <button className="modal-close is-large" onClick={e => toggleModal(e)} aria-label="close"></button>
  </div>)

}

export default CalendarModal 