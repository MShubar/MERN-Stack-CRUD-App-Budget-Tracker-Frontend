import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'
const TransactionsForm = ({ transactions, setTransactions }) => {
  let navigate = useNavigate()
  let initialState = {
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
    const token = localStorage.getItem('token') // Retrieve the token from local storage
    try {
      const response = await axios.post(
        `${BASE_URL}/transactions`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        }
      )
      //console.log(response)
      setTransactions([...transactions, response.data])
      setFormValues(initialState)
      navigate('/transactionlist')
    } catch (error) {
      console.error('Error adding transaction:', error)
      // Handle error (e.g., show a message to the user)
    }
  }
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }
  return (
    <div>
      <h1>New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Transaction name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={formValues.name}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          onChange={handleChange}
          value={formValues.amount}
        />
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          onChange={handleChange}
          value={formValues.type}
        />
        <label htmlFor="fixed">Fixed:</label>
        <input
          type="text"
          id="fixed"
          name="fixed"
          onChange={handleChange}
          value={formValues.fixed}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          value={formValues.description}
        />
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          onChange={handleChange}
          value={formValues.date}
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          onChange={handleChange}
          value={formValues.category}
        />
        <label htmlFor="priority">Priority:</label>
        <input
          type="text"
          id="priority"
          name="priority"
          onChange={handleChange}
          value={formValues.priority}
        />
        <label htmlFor="recurring">Recurring:</label>
        <input
          type="text"
          id="recurring"
          name="recurring"
          onChange={handleChange}
          value={formValues.recurring}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default TransactionsForm
