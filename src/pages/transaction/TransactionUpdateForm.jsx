import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../globals'
const TransactionUpdateForm = ({ transactions, setTransactions }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const transaction = transactions.find((transaction) => transaction._id === id)
  if (!transaction) {
    return <p>No transaction found</p>
  }
  const [formValues, setFormValues] = useState(transaction)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token') // Retrieve the token from local storage
    try {
      const response = await axios.put(
        `${BASE_URL}/transactions/${id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        }
      )
      setTransactions(
        transactions.map((transaction) => {
          if (transaction._id === id) {
            return response.data
          }
          return transaction
        })
      )

      navigate(`/transactionlist/${id}`)
    } catch (error) {
      console.error('Error updating transaction:', error)
      // Handle error (e.g., show a message to the user)
    }
  }
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }
  return (
    <div>
      <h1>Edit: {transaction.name}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Transaction name:</label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formValues.name}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          onChange={handleChange}
          value={formValues.amount}
        />
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          onChange={handleChange}
          value={formValues.type}
        />
        <label htmlFor="fixed">Fixed:</label>
        <input
          type="text"
          id="fixed"
          onChange={handleChange}
          value={formValues.fixed}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          onChange={handleChange}
          value={formValues.description}
        />
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          onChange={handleChange}
          value={formValues.date}
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          onChange={handleChange}
          value={formValues.category}
        />
        <label htmlFor="priority">Priority:</label>
        <input
          type="text"
          id="priority"
          onChange={handleChange}
          value={formValues.priority}
        />
        <label htmlFor="recurring">Recurring:</label>
        <input
          type="text"
          id="recurring"
          onChange={handleChange}
          value={formValues.recurring}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default TransactionUpdateForm
