import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Navbar from './Navbar'
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
  const [mobile, setMobile] = useState('plans')

  function lastMonth() {
    let days = []
    days.push(moment())
    days = days.concat(addDaysAfter(moment(), 8))
    days = days.concat(addDaysBefore(moment(), 22))
    days = days.sort((a,b) => b.format('YYYYMMDD') - a.format('YYYYMMDD'))
    setDates(days)
    
  }

  function addDaysAfter(day, num) {
    const addition = []
    for (let i = 1; i < num; i++) {
      addition.push(moment(day).add(i, 'days'))
    }
    return addition
  }

  function addDaysBefore(day, num) {
    const addition = []
    for (let i = 1; i < num; i++) {
      addition.push(moment(day).subtract(i, 'days'))
    }
    return addition
  }

  function extendCalendar(direction) {
    let currentDates = [...dates]
    if (direction === 'up') {
      currentDates = currentDates.concat(addDaysAfter(currentDates[0], 15))
    }
    if (direction === 'down') {
      currentDates = currentDates.concat(addDaysBefore(currentDates[currentDates.length - 1], 15))
    }
    currentDates.sort((a,b) => b.format('YYYYMMDD') - a.format('YYYYMMDD'))
    setDates(currentDates)
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

  function toggleMobileView() {
    if (mobile === 'plans') {
      setMobile('runs')
    }
    if (mobile === 'runs') {
      setMobile('plans')
    }
  }

  return (<>
  <Navbar mobile={mobile} toggleMobileView={toggleMobileView} />
  
  <section className="section" id="calendar">
  
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

    <div className="container has-text-centered">
      <i className="arrow up" onClick={e => extendCalendar('up')}></i>
      <div className="table-container">
        <table className="table is-fullwidth is-hoverable">
          <tbody>
            {info.plans && info.runs && info.races && dates.map((day, i) => {
              return <CalendarRow key={i} day={day} info={info} handleModal={handleModal} mobile={mobile} />
            })}
            {errors && <span>{errors}</span>}
          </tbody>
        </table>
      </div>
      <i className="arrow down" onClick={e => extendCalendar('down')}></i>
    </div>


    {modal ? <CalendarModal props={props} toggleModal={toggleModal} modalDate={modalDate} info={info} /> : <></>}
  </section>
  </>)
}

export default Calendar