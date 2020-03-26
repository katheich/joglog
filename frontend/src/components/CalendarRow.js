import React from 'react'
import moment from 'moment'

const CalendarRow = ({ day, info }) => {

  const date = moment(day).format('YYYYMMDD')

  const plan = info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === date)
  const run = info.runs.find(run => moment(run.date).format('YYYYMMDD') === date)
  const race = info.races.find(race => moment(race.date).format('YYYYMMDD') === date)

  function formatTime(decTime, format) {
    let min = Math.floor(decTime)
    const sec = Math.floor((decTime - min) * 60)

    if (format === 'hms') {

      const hrs = Math.floor(min / 60)
      min = min % 60

      return `${hrs < 10 ? '0' + hrs : hrs}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`

    } else if (format === 'ms') {
      return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`

    } else {
      return decTime
    }
  }
  
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