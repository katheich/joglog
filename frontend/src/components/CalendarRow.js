import React from 'react'
import moment from 'moment'

import { formatTime } from '../lib/formatting'

const CalendarRow = ({ day, info, toggleModal }) => {

  const date = moment(day).format('YYYYMMDD')

  const plan = info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === date)
  const run = info.runs.find(run => moment(run.date).format('YYYYMMDD') === date)
  const race = info.races.find(race => moment(race.date).format('YYYYMMDD') === date)
  
  return (<tr 
    id={date} 
    className={date === moment().format('YYYYMMDD') ? 'is-selected' : ''} 
    onClick={e => toggleModal(e)}
    data-id={date}
  >
    <th>{moment(day).format('dddd, DD MMMM YYYY')}</th>

    <th className="plan" data-id={date}>
      {race && race.name}
      {plan && plan.description + ', ' + plan.runtype}
    </th>

    {run ? <>
      <th className="distance data-id={date}">{run.distance} {run.units.toLowerCase()}</th>
      <th className="time" data-id={date}>{formatTime(run.duration, 'hms')}</th>
      <th className="pace" data-id={date}>{formatTime(run.pace, 'ms')} min / {run.units.toLowerCase()}</th>
      <th className="hr" data-id={date}>{run.avgHr} bpm</th>
      <th className="notes" data-id={date}>{run.notes}</th>
      </> 
      : <>
      <th className="distance" data-id={date}></th>
      <th className="time" data-id={date}></th>
      <th className="pace" data-id={date}></th>
      <th className="hr" data-id={date}></th>
      <th className="notes" data-id={date}></th>
      </>}

  </tr>)
          
}


export default CalendarRow