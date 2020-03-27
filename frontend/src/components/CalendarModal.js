import React, { useState } from 'react'
import moment from 'moment'

import PlanForm from './PlanForm'


const CalendarModal = ({ props, toggleModal, modalDate, info }) => {

  const [purpose, setPurpose] = useState('plan')

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
          </ul>
        </div>


        {purpose === 'plan' ? <PlanForm date={modalDate} toggleModal={toggleModal} /> : <></>}

      </div>
    </div>
    <button className="modal-close is-large" onClick={e => toggleModal(e)} aria-label="close"></button>
  </div>)

}

export default CalendarModal 