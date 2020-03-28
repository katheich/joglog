import React from 'react'
import moment from 'moment'

import { formatTime } from '../lib/formatting'

const CalendarRow = ({ day, info, handleModal }) => {

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
    <td data-id={date}>{moment(day).format('dddd, DD MMMM YYYY')}</td>

    <td className="schedule" data-id={date}>
      {race && <span className="race">
        <i className="fas fa-medal"></i>
        {race.name}
      </span>}
      {race && plan && <span className="space">
         / 
      </span>}
      {plan && <span className="plan">
        <i className="fas fa-pencil-ruler"></i>
        <span className={plan.skipped ? 'skipped' : ''}>{plan.description} {plan.completed ? <i className="fas fa-check is-size-7"></i> : ''}</span>
      </span>
      }
    </td>
    <td className={'title is-size-5 schedule-category' + `${plan ? ' ' + plan.runtype.toLowerCase() : ''}`}>
      <span className="info">{plan && plan.runtype}</span>
    </td>

    {run ? <>
      <td className="distance" data-id={date}>
        <i className="fas fa-route"></i>
        <span className="info">{run.distance} {run.units.toLowerCase()}</span>
      </td>
      <td className="duration" data-id={date}>
        <i className='fas fa-hourglass-half'></i>
        <span className="info">{formatTime(run.duration, 'hms')}</span>
      </td>
      <td className="pace" data-id={date}>
        <i className='fas fa-stopwatch'></i>
        <span className="info">{formatTime(run.pace, 'ms')} min / {run.units.toLowerCase()}</span>
      </td>
      <td className="hr" data-id={date}>
        <i className="fas fa-heartbeat"></i>
        <span className="info">{run.avgHr} bpm</span>
      </td>
      <td className="notes" data-id={date}>
        <i className="fas fa-clipboard"></i>
        <span className="info">{run.notes}</span>
      </td>
      <td className={'title is-size-5 run-category ' + run.runtype.toLowerCase()}>
        {run.runtype}
      </td>
      </> 
      : <>
      <td className="distance" data-id={date}></td>
      <td className="duration" data-id={date}></td>
      <td className="pace" data-id={date}></td>
      <td className="hr" data-id={date}></td>
      <td className="notes" data-id={date}></td>
      <td className="run-category"></td>
      </>}

  </tr>)
          
}


export default CalendarRow