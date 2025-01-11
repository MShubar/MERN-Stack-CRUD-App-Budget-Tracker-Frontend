import Budget from '../../components/Budget'
import { Link } from 'react-router-dom'

const BudgetList = ({ budgets }) => {
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
            <div className="col-12" key={budget.id}>
              <Budget budget={budget} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default BudgetList
