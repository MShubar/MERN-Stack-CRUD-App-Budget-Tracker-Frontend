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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const getAllTransactions = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/transactions`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setTransactions(response.data)
        } catch (error) {
          console.error('Error fetching transactions:', error)
        }
      }
    }

    getAllTransactions()
  }, [])
  useEffect(() => {
    const getAllCategories = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/categories`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setCategories(response.data)
        } catch (error) {
          console.error('Error fetching transactions:', error)
        }
      }
    }

    getAllCategories()
  }, [])
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
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
