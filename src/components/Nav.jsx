import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../assets/logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap styles

const Nav = ({ isAuthenticated, onLogout, fullName }) => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <div className="navbar-logo">
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              className="navbar-brand"
              style={{ width: '100px', height: 'auto' }}
            />
          </NavLink>
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
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link btn btn-outline-success px-3 py-2 me-2"
              >
                Home
              </NavLink>
            </li>
            {!isAuthenticated && (
              <>
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
                    Budgets
                  </a>
                  <ul className="dropdown-menu bg-primary border-0 shadow-lg">
                    <li>
                      <NavLink to="/budget/new" className="dropdown-item">
                        New Budget
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/budget/list" className="dropdown-item">
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
                    Categories
                  </a>
                  <ul className="dropdown-menu bg-primary border-0 shadow-lg">
                    <li>
                      <NavLink to="/category/new" className="dropdown-item">
                        New Category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/category/list" className="dropdown-item">
                        Category List
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <span className="nav-link btn btn-outline-success px-3 py-2 me-2">
                    {fullName}
                  </span>
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
