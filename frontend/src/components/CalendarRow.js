import React from 'react'
import moment from 'moment'

import { formatTime } from '../lib/formatting'

const CalendarRow = ({ day, info, handleModal, mobile }) => {

  const date = moment(day).format('YYYYMMDD')

  const plan = info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === date)
  const run = info.runs.find(run => moment(run.date).format('YYYYMMDD') === date)
  const race = info.races.find(race => moment(race.date).format('YYYYMMDD') === date)
  
  return (<tr 
    id={date} 
    className={'date ' + `${moment(date).format('dd').toLowerCase()}` + `${date === moment().format('YYYYMMDD') ? ' is-today' : race ? ' is-race' : ''}`} 
    onClick={e => handleModal(e)}
    data-id={date}
  >
    <td data-id={date} className='dateformatted mobile-hidden'>{moment(day).format('dddd, D MMMM YYYY')}</td>
    <td data-id={date} className='dateformatted mobile-only'>{moment(day).format('dd D MMM')}</td>

    <td className={'schedule'  + `${mobile === 'plans' ? '' : ' mobile-hidden'}`} data-id={date}>
      {race && <span className="race" data-id={date}>
        <i className="fas fa-medal" data-id={date}></i>
        {race.name}
      </span>}
      {race && plan && <span className="space" data-id={date}>
         / 
      </span>}
      {plan && <span className="plan" data-id={date}>
        <i className="fas fa-pencil-ruler" data-id={date}></i>
        <span className={plan.skipped ? 'skipped' : ''} data-id={date}>{plan.description} {plan.completed ? <i className="fas fa-check is-size-7" data-id={date}></i> : ''}</span>
      </span>
      }
    </td>
    <td className={'title is-size-5 schedule-category mobile-hidden'} data-id={date}>
      <span className="info" data-id={date}>{plan && plan.runtype}</span>
    </td>

    {run ? <>
      <td className={'distance'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}>
        <i className="fas fa-route" data-id={date}></i>
        <span className="info" data-id={date}>{run.distance} {run.units.toLowerCase()}</span>
      </td>
      <td className={'duration'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}>
        <i className='fas fa-hourglass-half' data-id={date}></i>
        <span className="info" data-id={date}>{formatTime(run.duration, 'hms')}</span>
      </td>
      <td className={'pace'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}>
        <i className='fas fa-stopwatch' data-id={date}></i>
        <span className="info" data-id={date}>{formatTime(run.pace, 'ms')} min / {run.units.toLowerCase()}</span>
      </td>
      <td className={'hr'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}>
        <i className="fas fa-heartbeat" data-id={date}></i>
        <span className="info" data-id={date}>{run.avgHr} bpm</span>
      </td>
      <td className={'notes mobile-hidden'} data-id={date}>
        {run.notes && <div className="notes-container">
          <i className="fas fa-clipboard" data-id={date}></i>
          <div className="notes-info is-size-7" data-id={date}>{run.notes}</div>
        </div>}

      </td>
      <td className={'title is-size-5 mobile-hidden'} data-id={date}>
        {run.runtype}
      </td>
      </> 
      : <>
      <td className={'distance'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}></td>
      <td className={'duration'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}></td>
      <td className={'pace'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}></td>
      <td className={'hr'  + `${mobile === 'runs' ? '' : ' mobile-hidden'}`} data-id={date}></td>
      <td className={'notes mobile-hidden'} data-id={date}></td>
      <td className={'run-category mobile-hidden'} data-id={date}></td>
      </>}

  </tr>)
          
}


export default CalendarRow