import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import CalendarRow from './CalendarRow'
import CalendarModal from './CalendarModal'

const CALENDAR_QUERY = gql`
  {
    myPlans {
      edges {
        node {
          id
          date
          description
          runtype
          completed
          skipped
        }
      }
    }
    myRuns {
      edges {
        node {
          id
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
          id
          name
          date
        }
      }
    }
  }
`


const Calendar = (props) => {

  const [dates, setDates] = useState([])
  const [info, setInfo] = useState([])
  const [errors, setErrors] = useState([])
  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [modalDate, setModalDate] = useState('')

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

  function handleModal(e) {
    e.preventDefault()
    setModalDate(e.target.dataset.id)
    toggleModal()
  }

  function toggleModal() {
    setModal(!modal)
  }

  return (<section className="section" id="calendar">
  
    {console.log('INFO', info)}
    {console.log('DATA', data)}
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
            {info.plans && info.runs && info.races && dates.map((day, i) => {
              return <CalendarRow key={i} day={day} info={info} handleModal={handleModal} />
            })}
            {errors && <span>{errors}</span>}
          </tbody>
        </table>
      </div>
    </div>

    {modal ? <CalendarModal props={props} toggleModal={toggleModal} modalDate={modalDate} info={info} /> : <></>}
  </section>
  )
}

export default Calendar