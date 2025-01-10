import { Link } from 'react-router-dom'

const Budget = ({ budget }) => {
  return (
    <Link to={`/budgetlist/${budget._id}`}>
      <div className="budget-card">
        <h2>{budget.name}</h2>
      </div>
    </Link>
  )
}

export default Budget
