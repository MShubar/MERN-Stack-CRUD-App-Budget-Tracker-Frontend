import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const BudgetDetails = ( { budgets }) => {
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
            <button onClick={()=> navigate(`/update/${budget._id}`)}>Update Budget</button>
            <button onClick={()=> navigate(`/delete/${budget._id}`)}>Delete Budget</button>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default BudgetDetails