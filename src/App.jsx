import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from './globals'
import axios from 'axios'
import './App.css'

import Nav from './components/Nav'

import Home from './pages/transaction/Home'
import TransactionList from './pages/transaction/TransactionList'
import TransactionDetails from './pages/transaction/TransactionDetails'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
// import PetDetails from './pages/petDetails'
// import PetForm from './pages/PetForm'
// import PetUpdateForm from './pages/PetUpdateForm'
// import DeleteConfirm from './pages/DeleteConfirm'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Authentication state

  const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc0MGUwZWI1ODA0MDYyMWJlODE2MjYiLCJpYXQiOjE3MzU2NTkyMjZ9.49FeCIBDzAoTdh6ty-ChKS4MpE65G9cq4gtfRwSDG58'
  useEffect(() => {
    const getAllTransactions = async () => {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${testToken}`
        }
      })
      setTransactions(response.data)
    }
    getAllTransactions()
  }, [])
  const handleLogin = () => {
    setIsAuthenticated(true) // Simulate successful login
  }

  const handleLogout = () => {
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
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
        </Routes>
      </main>
    </>
  )
}

export default App
