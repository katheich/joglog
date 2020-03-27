import React from 'react'
import moment from 'moment'

import formatTime from '../lib/formatting'

const CalendarRow = ({ day, info }) => {

  const date = moment(day).format('YYYYMMDD')

  const plan = info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === date)
  const run = info.runs.find(run => moment(run.date).format('YYYYMMDD') === date)
  const race = info.races.find(race => moment(race.date).format('YYYYMMDD') === date)
  
  return (<tr id={date} className={date === moment().format('YYYYMMDD') ? 'is-selected' : ''}>
    <th>{moment(day).format('dddd, DD MMMM YYYY')}</th>

    <th className="plan">
      {race && race.name}
      {plan && plan.description + ', ' + plan.runtype}
    </th>

    {run ? <>
      <th className="distance">{run.distance} {run.units.toLowerCase()}</th>
      <th className="time">{formatTime(run.duration, 'hms')}</th>
      <th className="pace">{formatTime(run.pace, 'ms')} min / {run.units.toLowerCase()}</th>
      <th className="hr">{run.avgHr} bpm</th>
      <th className="notes">{run.notes}</th>
      </> 
      : <>
      <th className="distance"></th>
      <th className="time"></th>
      <th className="pace"></th>
      <th className="hr"></th>
      <th className="notes"></th>
      </>}

  </tr>)
          
}


export default CalendarRow