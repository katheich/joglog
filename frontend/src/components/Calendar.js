import React, { useEffect, useState } from 'react'
import moment from 'moment'


const Calendar = () => {

  const [dates, setDates] = useState([])


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


  return (<section className="section" id="calendar">
    <div className="container">
      {console.log(dates)}
      {console.log(moment().format('YYYYMMDD'))}

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
              <th className="plan"></th>
              <th className="distance"></th>
              <th className="time"></th>
              <th className="pace"></th>
              <th className="hr"></th>
              <th className="notes"></th>
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