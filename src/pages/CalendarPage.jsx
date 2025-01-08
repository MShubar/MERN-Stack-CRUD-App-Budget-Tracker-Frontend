import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import { BASE_URL } from '../globals'

const CalendarPage = () => {
    const [date, setDate] = useState(new Date())

    return (
        <div>
      <h1>Track here</h1>
      <Calendar
        onChange={setDate}
        value={date}
      />
      </div>
    )
}

export default CalendarPage