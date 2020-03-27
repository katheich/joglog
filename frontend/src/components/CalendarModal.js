import React from 'react'
import moment from 'moment'


const CalendarModal = ({ props, toggleModal, modalDate }) => {

  return ( <div className="modal is-active" id="calendar-modal">
    <div className="modal-background" onClick={e => toggleModal(e)}></div>
    <div className="modal-content">
      <div className="box">
        {moment(modalDate).format('DD MMMM YYYY')}
      </div>
    </div>
    <button className="modal-close is-large" onClick={e => toggleModal(e)} aria-label="close"></button>
  </div>)

}

export default CalendarModal 