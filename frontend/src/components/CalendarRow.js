import React from 'react'
import moment from 'moment'

const CalendarRow = ({ day, info }) => (

  
  <tr id={moment(day).format('YYYYMMDD')} className={moment(day).format('YYYYMMDD') === moment().format('YYYYMMDD') ? 'is-selected' : ''}>
    <th>{moment(day).format('dddd, DD MMMM YYYY')}</th>

    <th className="plan">
      {info.races && info.races.find(race => moment(race.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')) ? <span>{info.races.find(race => moment(race.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).name}</span> : ''}
      {info.plans && info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')) ? <span>{info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).description}, {info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).runtype}</span> : ''}
    </th>

    {info.runs && info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')) 
      ? <>
      <th className="distance">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).distance} {info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).units.toLowerCase()}</th>
      <th className="time">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).duration} min</th>
      <th className="pace">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).pace} min / {info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).units.toLowerCase()}</th>
      <th className="hr">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).avgHr} bpm</th>
      <th className="notes">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).notes}</th>
      </> 
      : <>
      <th className="distance"></th>
      <th className="time"></th>
      <th className="pace"></th>
      <th className="hr"></th>
      <th className="notes"></th>
      </>}

  </tr>
          
)


export default CalendarRow