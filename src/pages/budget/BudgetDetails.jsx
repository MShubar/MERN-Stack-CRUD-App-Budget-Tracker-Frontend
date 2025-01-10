import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BudgetDetails = ({ budgets }) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const [budget, setBudget] = useState(null)

  useEffect(() => {
    const getBudget = () => {
      const singleBudget = budgets.find((budget) => {
        return budget._id === id
      })
      setBudget(singleBudget)
    }
    getBudget()
  }, [])

  return (
    <div>
      {budget ? (
        <>
          <h1>Budget Details</h1>
          <section className="budget-details">
            <h2>{budget.name}</h2>
            <h3>{budget.balance}</h3>
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
