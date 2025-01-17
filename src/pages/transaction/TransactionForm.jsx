import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const TransactionForm = ({
  transactions,
  setTransactions,
  budgets,
  setBudgets,
  categories,
  setCategories
}) => {
  let navigate = useNavigate()

  const initialState = {
    name: '',
    amount: '',
    type: '',
    fixed: false, 
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '', 
    priority: '',
    recurring: 'None', 
    budgetId: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('token')
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

    fetchBudgets()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setCategories(response.data) 
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    
    if (
      !formValues.name ||
      !formValues.amount ||
      !formValues.type ||
      !formValues.budgetId
    ) {
      alert('Please fill all required fields!')
      return
    }

    const token = localStorage.getItem('token')
    try {
      console.log(formValues)

      const response = await axios.post(`${BASE_URL}/transaction`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTransactions([...transactions, response.data])
      setFormValues(initialState)
      navigate('/transaction/list')
    } catch (error) {
      console.error('Error adding transaction:', error)
      alert('Something went wrong while adding the transaction.')
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  const handleCategoryChange = (event) => {
    setFormValues({
      ...formValues,
      category: event.target.value 
    })
  }

  const handleFixedChange = (event) => {
    setFormValues({ ...formValues, fixed: event.target.value === 'Yes' }) 
  }

  return (
    <>
      <div className="container mt-5">
        <h1>New Transaction</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Transaction Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleChange}
              value={formValues.name}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="budgetId" className="form-label">
              Budget:
            </label>
            <select
              id="budgetId"
              name="budgetId"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleChange}
              value={formValues.budgetId}
              required
            >
              <option value="">Select a Budget</option>
              {budgets &&
                budgets.map((budget) => (
                  <option key={budget._id} value={budget._id}>
                    {budget.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleChange}
              value={formValues.amount}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type:
            </label>
            <select
              id="type"
              name="type"
              className="form-control border border-success rounded-3 shadow-sm"
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
              Fixed:
            </label>
            <select
              id="fixed"
              name="fixed"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleFixedChange}
              value={formValues.fixed ? 'Yes' : 'No'}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleChange}
              value={formValues.description}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleChange}
              value={formValues.date}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
              id="category"
              name="category"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleCategoryChange}
              value={formValues.category}
              required
            >
              <option value="">Select a Category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              className="form-control border border-success rounded-3 shadow-sm"
              onChange={handleChange}
              value={formValues.priority}
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="recurring" className="form-label">
              Recurring:
            </label>
            <select
              id="recurring"
              name="recurring"
              className="form-control border border-success rounded-3 shadow-sm"
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setFormValues(initialState)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default TransactionForm
