import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import notification from '../assets/notification.svg'
import noNotification from '../assets/no-notification.svg'
import notificationres from "../assets/notificationres.svg"
import noNotificationres from '../assets/no-notificationres.svg'

const Nav = ({ isAuthenticated, onLogout, transactions }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isNavOpen, setIsNavOpen] = useState(false) 
  const [isMobile, setIsMobile] = useState(false);

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
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const notificationIcon = isMobile
    ? unreadCount > 0
      ? notificationres
      : noNotificationres
    : unreadCount > 0
    ? notification
    : noNotification;
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

  const handleNavLinkClick = () => {
    setIsNavOpen(false) 
  }
  const handleClick = (event) => {
    onLogout(); 
    handleNavLinkClick(event); 
  };
  return (
    <nav
      className={`navbar navbar-expand-lg ${isScrolled ? 'bg-dark bg-opacity-75' : 'bg-transparent'} fixed-top`}
    >
      <div className="container-fluid">
        <div className="navbar-logo">
          {!isAuthenticated && (
            <NavLink to="/" onClick={handleNavLinkClick}>
              <img
                src={logo}
                alt="Logo"
                className="navbar-brand"
                style={{ width: '100px', height: 'auto' }}
              />
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/dashboard" onClick={handleNavLinkClick}>
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
          aria-expanded={isNavOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen(!isNavOpen)} 
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse bg-black-mobile text-white-mobile ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                    onClick={handleNavLinkClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signin"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                    onClick={handleNavLinkClick} 
                  >
                    Signin
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signup"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                    onClick={handleNavLinkClick} 
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
                    onClick={handleNavLinkClick} 
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
                      <NavLink to="/newbudget" className="dropdown-item" onClick={handleNavLinkClick}>
                        New Budget
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/budgetlist" className="dropdown-item" onClick={handleNavLinkClick}>
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
                      <NavLink to="/transaction/new" className="dropdown-item" onClick={handleNavLinkClick}>
                        New Transaction
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/transaction/list" className="dropdown-item" onClick={handleNavLinkClick}>
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
                      <NavLink to="/newcategory" className="dropdown-item" onClick={handleNavLinkClick}>
                        New Category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/categorylist" className="dropdown-item" onClick={handleNavLinkClick}>
                        Category List
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink
                    to="/calendar"
                    className="nav-link btn btn-outline-success px-3 py-2 me-2"
                    onClick={handleNavLinkClick} 
                  >
                    Calendar
                  </NavLink>
                </li>

                <li className="nav-item dropdown d-flex justify-content-center align-items-center">
                  <a
                    className="nav-link"
                    href="#"
                    id="navbarDropdownNotifications"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={notificationIcon}
                      alt="Notification Icon"
                      className="navbar-brand"
                      style={{ width: '30px', height: '30px' }}
                    />
                    {unreadCount > 0 && (
                      <span className="badge bg-danger">{unreadCount}</span>
                    )}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end bg-primary border-0 shadow-lg">
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
                    onClick={handleClick}
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
