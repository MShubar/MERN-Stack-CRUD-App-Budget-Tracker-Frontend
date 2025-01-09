import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import { BASE_URL } from '../globals'

const CalendarPage = () => {
    const [date, setDate] = useState(new Date())

    return (
        <div className="calendar-wrapper">
          <div className="calendar-container">
          <h1>Tracking your Expenses</h1>
           <Calendar
           onChange={setDate}
           value={date}
           locale="en-US"
           />
          </div>
          </div>
    )
}

export default CalendarPage