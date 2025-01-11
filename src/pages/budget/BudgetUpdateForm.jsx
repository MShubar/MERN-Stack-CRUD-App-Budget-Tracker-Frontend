import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const BudgetUpdateForm = ({ budgets, setBudgets }) => {
  const { id } = useParams()
  let navigate = useNavigate()

  const budget = budgets.find((budget) => budget._id === id)
  if (!budget) {
    return <p>No Budget Found</p>
  }

  const [formValues, setFormValues] = useState(budget)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const response = await axios.put(
        `${BASE_URL}/budgets/${id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setBudgets(
        budgets.map((budget) => {
          if (budget._id === id) {
            return response.data
          }
          return budget
        })
      )
      navigate(`/budgetlist/${id}`)
    } catch (error) {
      console.error('Error adding this budget:', error)
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value })
  }

  return (
    <div>
      <h1>Create a Budget:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formValues.name}
        />
        <br></br>

        <label htmlFor="balance">Balance:</label>
        <input
          type="number"
          id="balance"
          onChange={handleChange}
          value={formValues.balance}
        />
        <button type="submit">Submit Update</button>
      </form>
    </div>
  )
}

export default BudgetUpdateForm
