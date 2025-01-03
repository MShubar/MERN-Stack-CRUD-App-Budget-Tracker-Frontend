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
    category: '673240f340d93c1e5f38f229',
    priority: '',
    recurring: '',
    budgetId: '6776acef792590ba48e7de14'
  }

  const [formValues, setFormValues] = useState(initialState)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/transactions/${id}`)
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
        `${BASE_URL}/transactions/${id}`,
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
          <input
            type="text"
            id="type"
            className="form-control"
            value={formValues.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fixed" className="form-label">
            Fixed
          </label>
          <input
            type="text"
            id="fixed"
            className="form-control"
            value={formValues.fixed}
            onChange={handleChange}
          />
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
          <input
            type="text"
            id="category"
            className="form-control"
            value={formValues.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <input
            type="text"
            id="priority"
            className="form-control"
            value={formValues.priority}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="recurring" className="form-label">
            Recurring
          </label>
          <input
            type="text"
            id="recurring"
            className="form-control"
            value={formValues.recurring}
            onChange={handleChange}
          />
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
  )
}

export default TransactionUpdateForm
