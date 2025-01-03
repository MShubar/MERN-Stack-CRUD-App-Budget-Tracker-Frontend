import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const TransactionForm = ({ transactions, setTransactions }) => {
  let navigate = useNavigate()
  const initialState = {
    name: '',
    amount: '',
    type: '',
    fixed: '',
    description: '',
    date: '',
    category: '673240f340d93c1e5f38f229',
    priority: '',
    recurring: '',
    budgetId: '6776acef792590ba48e7de14'
  }
  const [formValues, setFormValues] = useState(initialState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(
        `${BASE_URL}/transactions`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTransactions([...transactions, response.data])
      setFormValues(initialState)
      navigate('/transaction/list')
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  return (
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
          <input
            type="text"
            id="type"
            name="type"
            className="form-control border border-success rounded-3 shadow-sm"
            onChange={handleChange}
            value={formValues.type}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fixed" className="form-label">
            Fixed:
          </label>
          <input
            type="text"
            id="fixed"
            name="fixed"
            className="form-control border border-success rounded-3 shadow-sm"
            onChange={handleChange}
            value={formValues.fixed}
          />
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
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control border border-success rounded-3 shadow-sm"
            onChange={handleChange}
            value={formValues.category}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority:
          </label>
          <input
            type="text"
            id="priority"
            name="priority"
            className="form-control border border-success rounded-3 shadow-sm"
            onChange={handleChange}
            value={formValues.priority}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="recurring" className="form-label">
            Recurring:
          </label>
          <input
            type="text"
            id="recurring"
            name="recurring"
            className="form-control border border-success rounded-3 shadow-sm"
            onChange={handleChange}
            value={formValues.recurring}
          />
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
  )
}

export default TransactionForm
