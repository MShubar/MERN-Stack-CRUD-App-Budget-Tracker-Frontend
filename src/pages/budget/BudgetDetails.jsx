import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import { Link } from 'react-router-dom'

const BudgetDetails = ({ budgets, setBudgets }) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [budget, setBudget] = useState(null)

  useEffect(() => {
    const fetchBudget = async () => {
      console.log('Fetching budget with ID:', id) 
      const token = localStorage.getItem('token')
      console.log('Token:', token)
      if (!token) {
        console.error('No token found')
        return
      }

      try {
        const response = await axios.get(`${BASE_URL}/budgets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        setBudget(response.data)
      } catch (error) {
        console.error('Error fetching budget:', error)
      }
      
    }
    fetchBudget()
  }, [id])

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found')
        return
      }

      await axios.delete(`${BASE_URL}/budgets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setBudgets(budgets.filter((budget) => budget._id !== id))
      navigate('/budgetlist')
    } catch (error) {
      console.error('Error deleting budget:', error)
    }
  }

  return (
    <div>
      {budget ? (
        <>
          <h1>Budget Details</h1>
          <section className="budget-details">
            <h2>{budget.name}</h2>
            <p>
              Start Balance: <strong>{budget.balance} BD</strong>
            </p>
            <p>
              Current Balance:{' '}
              <strong
                style={{
                  color: budget.currentBalance < 0 ? 'red' : 'black'
                }}
              >
                {budget.currentBalance} BD
              </strong>
            </p>
            <div className="btn-group">
              <Link
                className="btn btn-primary btn-sm mb-2"
                to={`/updatebudget/${budget._id}`}
              >
                Update
              </Link>
              <Link
                className="btn btn-danger btn-sm mb-2"
                to={`/deletebudget/${budget._id}`}
              >
                Delete
              </Link>
            </div>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default BudgetDetails
