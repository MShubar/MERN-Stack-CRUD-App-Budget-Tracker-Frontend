import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarPage = ({ transactions }) => {
  const [date, setDate] = useState(new Date())
  const [transactionData, setTransactionData] = useState([])

  useEffect(() => {
    const getRecurringTransactions = async () => {
      try {
        setTransactionData(transactions)
      } catch (error) {
        console.log('Error getting any recurring transactions:', error)
      }
    }
    getRecurringTransactions()
  }, [transactions])

  const transactionsOnDate = (date) => {
    const selectedDate = date.toISOString().split('T')[0]
    return transactionData.filter((transaction) => {
      if (transaction.recurring) {
        if (transaction.recurring === 'Weekly') {
          const transactionDate = new Date(transaction.date)
          return transactionDate.toISOString().split('T')[0] === selectedDate
        } else if (transaction.recurring === 'Monthly') {
          const transactionDate = new Date(transaction.date)
          return (
            transactionDate.getDate() === date.getDate() &&
            transactionDate.getMonth() === date.getMonth()
          )
        }
      }
      return false
    })
  }

  const tileContent = ({ date }) => {
    const thisDate = transactionsOnDate(date)
    if (thisDate.length > 0) {
      return (
        <div>
          {thisDate.map((transaction) => (
            <div key={transaction.id} style={{ fontSize: '10px' }}>
              {transaction.name} - {transaction.amount}BD
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        <h1>Tracking your Expenses</h1>
        <Calendar
          onChange={setDate}
          value={date}
          locale="en-US"
          tileContent={tileContent}
        />
        <div>
          <h3>Transactions for {date.toDateString()}</h3>
          <ul>
            {transactionsOnDate(date).map((transaction) => (
              <li key={transaction._id}>
                {transaction.name} - {transaction.amount} BD
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
