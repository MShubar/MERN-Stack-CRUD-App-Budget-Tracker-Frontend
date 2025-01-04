import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from './globals'
import axios from 'axios'
import './App.css'

import Nav from './components/Nav'

import Home from './pages/transaction/Home'
import TransactionList from './pages/transaction/TransactionList'
import TransactionDetails from './pages/transaction/TransactionDetails'
import TransactionUpdateForm from './pages/transaction/TransactionUpdateForm'
import DeleteConfirm from './pages/transaction/DeleteConfirm'
import TransactionForm from './pages/transaction/TransactionForm'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Authentication state

  useEffect(() => {
    const getAllTransactions = async () => {
      const token = localStorage.getItem('token') // Retrieve the token from local storage
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/transactions`, {
            headers: {
              Authorization: `Bearer ${token}` // Use the stored token
            }
          })
          setTransactions(response.data)
        } catch (error) {
          console.error('Error fetching transactions:', error)
          // Handle error (e.g., show a message to the user)
        }
      }
    }

    getAllTransactions()
  }, [])
  const handleLogin = () => {
    setIsAuthenticated(true) // Simulate successful login
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false) // Simulate logout
  }

  return (
    <>
      <header>
        <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/transactionlist"
            element={<TransactionList transactions={transactions} />}
          />
          <Route
            path="/transactionlist/:id"
            element={<TransactionDetails transactions={transactions} />}
          />
          <Route
            path="/update/:id"
            element={
              <TransactionUpdateForm
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/delete/:id"
            element={
              <DeleteConfirm
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/new"
            element={
              <TransactionForm
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/auth/signin"
            element={<Signin onLogin={handleLogin} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
