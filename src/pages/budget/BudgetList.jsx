import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import Budget from '../../components/Budget'
import { Link } from 'react-router-dom'

const BudgetList = ({ budgets, setBudgets }) => {
  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await axios.get(`${BASE_URL}/budgets`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBudgets(response.data) // Update the budgets state
      } catch (error) {
        console.error('Error fetching budgets:', error)
      }
    }

    fetchBudgets()
  }, [setBudgets]) // Ensure that setBudgets is not being redefined

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Budget List</h1>
        <Link to="/newbudget" className="btn btn-success">
          Create a Budget
        </Link>
      </div>
      <section className="budget-list">
        <div className="row gy-3">
          {budgets?.map((budget) => (
            <div className="col-12" key={budget._id || budget.id}>
              <Budget budget={budget} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default BudgetList
