import Budget from '../../components/Budget'
import { Link } from 'react-router'

const BudgetList =({ budgets }) => {

    return (
        <div>
            <h1>Budget List</h1>
            
            <Link to="/newbudget">Create a Budget</Link>
            
                <section className="budget-list">
                    {budgets?.map((budget) => (
                        <Budget budget={budget} key={budget.id} />
                    ))}
                </section>
                
        </div>
    )
}

export default BudgetList