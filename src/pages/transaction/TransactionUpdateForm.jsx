import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const TransactionUpdateForm = ({ transactions, setTransactions }) => {
  const { id } = useParams()
  let navigate = useNavigate()

  const initialState = {
    name: '',
    amount: '',
    type: '',
    fixed: '',
    description: '',
    date: '',
    category: '',
    priority: '',
    recurring: '',
    budgetId: ''
  }

  const [formValues, setFormValues] = useState(initialState)
  const [budgets, setBudgets] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const transaction = transactions.find((trans) => trans._id === id)
    if (transaction) {
      setFormValues(transaction)
    }
    const fetchBudgets = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/budgets`)
        setBudgets(response.data)
      } catch (error) {
        console.error('Error fetching budgets:', error)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/category`)
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchBudgets()
    fetchCategories()
  }, [id, transactions])

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/transaction/${id}`)
        setFormValues(response.data)
      } catch (error) {
        console.error('Error fetching transaction:', error)
      }
    }

    fetchTransaction()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const response = await axios.put(
        `${BASE_URL}/transaction/${id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTransactions(
        transactions.map((transaction) =>
          transaction._id === id ? response.data : transaction
        )
      )
      navigate('/transaction/list')
    } catch (error) {
      console.error('Error updating transaction:', error)
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  return (
    <>
      <div className="container">
        <h1>Update Transaction</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Transaction Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </div>
          <select
            id="budgetId"
            className="mb-3"
            onChange={handleChange}
            value={formValues.budgetId}
            required
          >
            <option value="">Select a Budget</option>
            {budgets.map((budget) => (
              <option key={budget._id} value={budget._id}>
                {budget.name}
              </option>
            ))}
          </select>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="form-control"
              value={formValues.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              id="type"
              className="form-control"
              onChange={handleChange}
              value={formValues.type}
              required
            >
              <option value="">Select a Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="fixed" className="form-label">
              Fixed
            </label>
            <select
              id="fixed"
              className="form-control"
              onChange={handleChange}
              value={formValues.fixed}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="form-control"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={formValues.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              className="form-control"
              onChange={handleChange}
              value={formValues.category}
              required
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              className="form-control"
              onChange={handleChange}
              value={formValues.priority}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="recurring" className="form-label">
              Recurring
            </label>
            <select
              id="recurring"
              className="form-control"
              onChange={handleChange}
              value={formValues.recurring}
              required
            >
              <option value="None">None</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/transaction/list')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default TransactionUpdateForm
