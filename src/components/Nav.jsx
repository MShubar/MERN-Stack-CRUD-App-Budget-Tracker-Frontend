import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

const Nav = ({ isAuthenticated, onLogout, transactions }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)

      const isMonthly =
        transaction.recurring === 'Monthly' &&
        transactionDate.getDate() === currentDay

      const isYearly =
        transaction.recurring === 'Annually' &&
        transactionDate.getDate() === currentDay &&
        transactionDate.getMonth() === currentMonth

      return isMonthly || isYearly
    })

    const newNotifications = filteredTransactions.map((transaction) => ({
      id: transaction._id,
      message: `${transaction.name} - ${transaction.amount} BD`
    }))

    setNotifications(newNotifications)
    setUnreadCount(newNotifications.length)
  }, [transactions])

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isScrolled ? 'bg-dark bg-opacity-75' : 'bg-transparent'
      } fixed-top`}
    >
      <div className="container-fluid">
        <div className="navbar-logo">
          {!isAuthenticated && (
            <NavLink to="/">
              <img
                src={logo}
                alt="Logo"
                className="navbar-brand"
                style={{ width: '100px', height: 'auto' }}
              />
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/dashboard">
              <img
                src={logo}
                alt="Logo"
                className="navbar-brand"
                style={{ width: '100px', height: 'auto' }}
              />
            </NavLink>
          )}
        </div>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signin"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                  >
                    Signin
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signup"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle btn btn-outline-success px-3 py-2 me-2"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Budgets
                  </a>
                  <ul className="dropdown-menu bg-primary border-0 shadow-lg">
                    <li>
                      <NavLink to="/newbudget" className="dropdown-item">
                        New Budget
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/budgetlist" className="dropdown-item">
                        Budget List
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle btn btn-outline-success px-3 py-2 me-2"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Transactions
                  </a>
                  <ul className="dropdown-menu bg-primary border-0 shadow-lg">
                    <li>
                      <NavLink to="/transaction/new" className="dropdown-item">
                        New Transaction
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/transaction/list" className="dropdown-item">
                        Transaction List
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle btn btn-outline-success px-3 py-2 me-2"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu bg-primary border-0 shadow-lg">
                    <li>
                      <NavLink to="/newcategory" className="dropdown-item">
                        New Category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/categorylist" className="dropdown-item">
                        Category List
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink
                    to="/calendar"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                  >
                    Calendar
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link "
                    href="#"
                    id="navbarDropdownNotifications"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {unreadCount > 0 ? (
                      <>
                        <svg
                          fill="#000000"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20,18H4l2-2V10a6,6,0,0,1,5-5.91V3a1,1,0,0,1,2,0V4.09a5.9,5.9,0,0,1,1.3.4A3.992,3.992,0,0,0,18,10v6Zm-8,4a2,2,0,0,0,2-2H10A2,2,0,0,0,12,22ZM18,4a2,2,0,1,0,2,2A2,2,0,0,0,18,4Z" />
                        </svg>
                        <span className="badge bg-danger ms-2">
                          {unreadCount}
                        </span>
                      </>
                    ) : (
                      <svg
                        fill="#000000"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z" />
                      </svg>
                    )}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end bg-primary border-0 shadow-lg"
                    aria-labelledby="navbarDropdownNotifications"
                  >
                    {notifications.length === 0 ? (
                      <li>
                        <span className="dropdown-item">
                          No new notifications
                        </span>
                      </li>
                    ) : (
                      notifications.map((notification) => (
                        <li key={notification.id}>
                          <span className="dropdown-item">
                            {notification.message}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/"
                    onClick={onLogout}
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                  >
                    Log out
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
