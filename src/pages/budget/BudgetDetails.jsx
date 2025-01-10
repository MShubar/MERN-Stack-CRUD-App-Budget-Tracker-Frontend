import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals' // Adjust the import based on your project structure
import { Link } from 'react-router-dom'

const BudgetDetails = ({ budgets, setBudgets }) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [budget, setBudget] = useState(null)

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/budgets/${id}`) // Fetch the specific budget by ID
        setBudget(response.data)
      } catch (error) {
        console.error('Error fetching budget:', error)
      }
    }

    fetchBudget()
  }, [id]) // Fetch budget when the component mounts or when `id` changes

  return (
    <div>
      {budget ? (
        <>
          <h1>Budget Details</h1>
          <section className="budget-details">
            <h2>{budget.name}</h2>
            Start Balance: <h3>{budget.balance}</h3>
            Current Balance: <h3>{budget.currentBalance}</h3>
            <Link
              className="btn btn-primary btn-sm mb-2"
              to={`/updatebudget/${budget._id}`}
            >
              Update
            </Link>
            <Link
              className="btn btn-primary btn-sm mb-2"
              to={`/deletebudget/${budget._id}`}
            >
              Delete
            </Link>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default BudgetDetails
