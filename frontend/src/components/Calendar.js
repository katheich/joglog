import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'


const CALENDAR_QUERY = gql`
  {
    myPlans {
      edges {
        node {
          date
          description
          runtype
        }
      }
    }
    myRuns {
      edges {
        node {
          date
          distance
          duration
          pace
          units
          runtype
          avgHr
          notes
        }
      } 
    }
    myRaces {
      edges {
        node {
          name
          date
        }
      }
    }
  }
`


const Calendar = ({ client }) => {

  const [dates, setDates] = useState([])
  const [info, setInfo] = useState([])
  const [errors, setErrors] = useState([])
  const [data, setData] = useState([])

  function lastMonth() {

    let days = []

    days.push(moment())
  
    for (let i = 1; i < 32; i++) {
      const less = moment().subtract(i, 'days')
      const more = moment().add(i, 'days')

      days.push(less)
      days.push(more)
    }
    days = days.sort((a,b) => b.format('YYYYMMDD') - a.format('YYYYMMDD'))
    setDates(days)
    
  }

  useEffect(() => {
    lastMonth()
  }, [])


  function cleanUserData(data) {
    const newInfo = {}

    newInfo.plans = data.myPlans.edges.map(plan => plan.node)
    newInfo.runs = data.myRuns.edges.map(run => run.node)
    newInfo.races = data.myRaces.edges.map(race => race.node)

    console.log(moment(newInfo.plans[0].date).format('YYYYMMDD'))

    return newInfo
  }

  useEffect(() => {

    if (data.myPlans || data.myRuns || data.myRaces) {
      setInfo(cleanUserData(data))
    }
  }, [data])


  return (<section className="section" id="calendar">
    {console.log('INFO', info)}
    {/* {console.log('DATA', data)} */}
    {console.log('ERRORS', errors)}

    <Query query={CALENDAR_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return null
        }
        if (error) {
          setErrors(error.message)
          return null
        }
        setData(data)
        return null  
        
      }}
    </Query>

    <div className="container">
      {/* {console.log(dates)} */}
      {/* {console.log(moment().format('YYYYMMDD'))} */}

      <div className="table-container">
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Plan</th>
              <th>Distance</th>
              <th>Time</th>
              <th>Pace</th>
              <th>Avg HR</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((day, i) => {
              return <tr key={i} id={moment(day).format('YYYYMMDD')} className={moment(day).format('YYYYMMDD') === moment().format('YYYYMMDD') ? 'is-selected' : ''}><
                th>{moment(day).format('dddd, DD MMMM YYYY')}</th>
              <th className="plan">
                {info.races && info.races.find(race => moment(race.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')) ? <span>{info.races.find(race => moment(race.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).description}</span> : ''}
                {info.plans && info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')) ? <span>{info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).description}, {info.plans.find(plan => moment(plan.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).runtype}</span> : ''}
              </th>
              {info.runs && info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')) 
                ? <>
                <th className="distance">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).distance}</th>
                <th className="time">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).duration}</th>
                <th className="pace">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).pace}</th>
                <th className="hr">{info.runs.find(run => moment(run.date).format('YYYYMMDD') === moment(day).format('YYYYMMDD')).avgHr}</th>
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  </section>
  )
}

export default Calendar