import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BASE_URL } from './globals'
import axios from 'axios'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import BudgetList from './pages/budget/BudgetList'
import BudgetForm from './pages/budget/BudgetForm'
import BudgetDetails from './pages/budget/BudgetDetails'
import BudgetUpdateForm from './pages/budget/BudgetUpdateForm'
import BudgetDeleteConfirm from './pages/budget/BudgetDeleteConfirm'
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
import Dashboard from './pages/Dashboard'

const App = () => {
  const [budgets, setBudgets] = useState([])
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchBar, setSearchBar] = useState('')

  const location = useLocation()
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
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/transaction`, {
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
          const response = await axios.get(`${BASE_URL}/category`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setCategories(response.data)
        } catch (error) {
          console.error('Error fetching Category:', error)
        }
      }
    }
    const getAllBudgets = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/budget`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setBudgets(response.data)
        } catch (error) {
          console.error('Error fetching budget:', error)
        }
      }
    }

    getAllCategories()
    getAllBudgets()
  }, [])
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  const handleSearchBar = (event) => {
    setSearchBar(event.target.value)
  }

  const filteredBudgets = budgets.filter((budget) =>
    budget.name.toLowerCase().includes(searchBar.toLowerCase())
  )

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchBar.toLowerCase())
  )
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchBar.toLowerCase())
  )
  const routesWithSearchBar = [
    '/transaction/list',
    '/budgetlist',
    '/categorylist'
  ]
  return (
    <>
      <header>
        <div className="col-md-8">
          <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        </div>
      </header>
      <main>
        {routesWithSearchBar.includes(location.pathname) && (
          <div className="d-flex justify-content-center mt-4">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search for something..."
              value={searchBar}
              onChange={handleSearchBar}
            />
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                transactions={transactions}
                categories={categories}
                budgets={budgets}
                user={user}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          {user ? (
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  transactions={transactions}
                  categories={categories}
                  budgets={budgets}
                  user={user}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/transaction/list"
              element={
                <TransactionList
                  transactions={filteredTransactions}
                  user={user}
                />

              }
            />
          ) : null}
          {user ? (
            <Route
              path="/transaction/:id"
              element={
                <TransactionDetails
                  transactions={transactions}
                  categories={categories}
                  budgets={budgets}
                  user={user}
                />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/transaction/"
              element={
                <TransactionDetails
                  transactions={transactions}
                  categories={categories}
                  budgets={budgets}
                  user={user}
                />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/transaction/update/:id"
              element={
                <TransactionUpdateForm
                  transactions={transactions}
                  setTransactions={setTransactions}
                  user={user}
                />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/transaction/delete/:id"
              element={
                <DeleteConfirm
                  transactions={transactions}
                  setTransactions={setTransactions}
                  user={user}
                />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/transaction/new"
              element={
                <TransactionForm
                  transactions={transactions}
                  setTransactions={setTransactions}
                  user={user}
                />
              }
            />
          ) : null}
          //
          {user ? (
            <Route
              path="/categorylist"
              element={<CategoryList categories={filteredCategories} />}
            />
          ) : null}
          {user ? (
            <Route
              path="/newcategory"
              element={
                <CategoryForm
                  categories={categories}
                  setCategories={setCategories}
                />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/categorylist/:id"
              element={<CategoryDetails categories={categories} />}
            />
          ) : null}
          {user ? (
            <Route
              path="/categoryupdate/:id"
              element={
                <CategoryUpdateForm
                  categories={categories}
                  setCategories={setCategories}
                />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/categorydelete/:id"
              element={
                <DeleteConfirmCategory
                  categories={categories}
                  setCategories={setCategories}
                />
              }
            />
          ) : null}
          //
          {user ? (
            <Route
              path="/budgetlist"
              element={<BudgetList budgets={filteredBudgets} />}
            />
          ) : null}
          {user ? (
            <Route
              path="/newbudget"
              element={<BudgetForm budgets={budgets} setBudgets={setBudgets} />}
            />
          ) : null}
          {user ? (
            <Route
              path="/budgetlist/:id"
              element={<BudgetDetails budgets={budgets} />}
            />
          ) : null}
          {user ? (
            <Route
              path="/updatebudget/:id"
              element={
                <BudgetUpdateForm budgets={budgets} setBudgets={setBudgets} />
              }
            />
          ) : null}
          {user ? (
            <Route
              path="/deletebudget/:id"
              element={
                <BudgetDeleteConfirm
                  budgets={budgets}
                  setBudgets={setBudgets}
                />
              }
            />
          ) : null}
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/auth/signin"
            element={<Signin onLogin={handleLogin} setUser={setUser} />}
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App
