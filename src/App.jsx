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

import CategoryForm from './pages/category/CategoryForm'
import CategoryDetails from './pages/category/CategoryDetails'
import CategoryList from './pages/category/CategoryList'
import CategoryUpdateForm from './pages/category/CategoryUpdateForm'
import DeleteConfirmCategory from './pages/category/DeleteConfirmCategory'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Authentication state

  // const testToken =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc0MGUwZWI1ODA0MDYyMWJlODE2MjYiLCJpYXQiOjE3MzU2NTkyMjZ9.49FeCIBDzAoTdh6ty-ChKS4MpE65G9cq4gtfRwSDG58'

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
  useEffect(() => {
    const getAllCategories = async () => {
      const token = localStorage.getItem('token') // Retrieve the token from local storage
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/categories`, {
            headers: {
              Authorization: `Bearer ${token}` // Use the stored token
            }
          })
          setCategories(response.data)
        } catch (error) {
          console.error('Error fetching transactions:', error)
          // Handle error (e.g., show a message to the user)
        }
      }
    }

    getAllCategories()
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
            path="/transaction/list"
            element={<TransactionList transactions={transactions} />}
          />
          <Route
            path="/transaction/list/:id"
            element={<TransactionDetails transactions={transactions} />}
          />
          <Route
            path="/transaction/update/:id"
            element={
              <TransactionUpdateForm
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/transaction/delete/:id"
            element={
              <DeleteConfirm
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/transaction/new"
            element={
              <TransactionForm
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          //
          <Route
            path="/category/list"
            element={<CategoryList categories={categories} />}
          />
          <Route
            path="/category/list/:id"
            element={<CategoryDetails categories={categories} />}
          />
          <Route
            path="/category/update/:id"
            element={
              <CategoryUpdateForm
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route
            path="/category/delete/:id"
            element={
              <DeleteConfirm
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route
            path="/category/new"
            element={
              <CategoryForm
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
        </Routes>
      </main>
    </>
  )
}

export default App
