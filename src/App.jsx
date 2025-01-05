import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from './globals'
import axios from 'axios'
import './App.css'

import Nav from './components/Nav'

import Home from './pages/transaction/Home'
import BudgetList from './pages/budget/BudgetList'
import BudgetForm from './pages/budget/BudgetForm'
import BudgetDetails from './pages/budget/BudgetDetails'
import TransactionList from './pages/transaction/TransactionList'
import TransactionDetails from './pages/transaction/TransactionDetails'
import TransactionUpdateForm from './pages/transaction/TransactionUpdateForm'
import DeleteConfirm from './pages/transaction/DeleteConfirm'
import TransactionForm from './pages/transaction/TransactionForm'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'

const App = () => {
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Authentication state

  // const testToken =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc0MGUwZWI1ODA0MDYyMWJlODE2MjYiLCJpYXQiOjE3MzU2NTkyMjZ9.49FeCIBDzAoTdh6ty-ChKS4MpE65G9cq4gtfRwSDG58'

  useEffect(() => {
    const getAllBudgets = async () => {
      const token = localStorage.getItem('token') 
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/budgets`, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          })
          setBudgets(response.data)
        } catch (error) {
          console.error('Error fetching budgets:', error)
          
        }
      }
    }

    getAllBudgets()
  }, [])

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
          <Route path="/budgetlist" element={<BudgetList budgets={budgets}/>} />
          <Route path="/newbudget" element={<BudgetForm budgets={budgets} setBudgets={setBudgets}/>} />
          <Route path="/budgetlist/:id" element={<BudgetDetails budgets={budgets} />} />

          <Route path="/transactionlist" element={<TransactionList transactions={transactions} />}/>
          <Route path="/transactionlist/:id" element={<TransactionDetails transactions={transactions} />}/>
          <Route path="/update/:id" element={ <TransactionUpdateForm transactions={transactions} setTransactions={setTransactions} />} />
          <Route path="/delete/:id"  element={ <DeleteConfirm transactions={transactions} setTransactions={setTransactions} />} />
          <Route path="/new" element={<TransactionForm transactions={transactions} setTransactions={setTransactions}/>} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
        </Routes>
      </main>
    </>
  )
}

export default App
