import { useEffect, useState } from 'react'
import moment from 'moment' // for easy date comparison

const Notifications = ({ transactions }) => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const getRecurringTransactions = () => {
      const currentDate = moment() // Current date
      const upcomingNotifications = transactions.filter((transaction) => {
        if (transaction.recurring === 'Monthly') {
          const transactionDate = moment(transaction.date) // Date of the transaction
          const monthsDifference = currentDate.diff(transactionDate, 'months') // Difference in months

          // Check if the transaction date is at least one month ago and recurring monthly
          return monthsDifference >= 1 && monthsDifference % 1 === 0 // This ensures we only show for every month
        }
        return false
      })

      setNotifications(upcomingNotifications) // Set the filtered transactions as notifications
    }

    getRecurringTransactions() // Get the notifications when the component is mounted
  }, [transactions]) // Run whenever transactions change

  return (
    <ul
      className="dropdown-menu bg-primary border-0 shadow-lg"
      aria-labelledby="navbarDropdownNotifications"
    >
      {notifications.length === 0 ? (
        <li>
          <span className="dropdown-item">No new notifications</span>
        </li>
      ) : (
        notifications.map((notification) => (
          <li key={notification._id}>
            <span className="dropdown-item">
              {`Recurring Transaction: ${notification.name} of ${notification.amount}`}
            </span>
          </li>
        ))
      )}
    </ul>
  )
}

export default Notifications
