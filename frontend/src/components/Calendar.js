import React, { useEffect, useState } from 'react'
import moment from 'moment'


const Calendar = () => {

  const [dates, setDates] = useState([])


  function lastMonth() {

    let days = []
  
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


  return (<section className="section">
    <div className="container">
      {console.log(dates)}
      <div className="title">
        Calendar
      </div>
      {dates.map((day, i) => {
        return <div key={i}>{moment(day).format('dddd, DD MMMM YYYY')}</div>
      })}
    </div>
  </section>
  )
}

export default Calendar