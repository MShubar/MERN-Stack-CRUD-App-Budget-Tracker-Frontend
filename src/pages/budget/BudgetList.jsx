import Budget from '../../components/Budget'

const BudgetList =({ budgets }) => {

    return (
        <div>
            <h1>Budget List</h1>

                <section className="budget-list">
                    {budgets?.map((budget) => (
                        <Budget budget={budget} key={budget.id} />
                    ))}
                </section>
                
        </div>
    )
}

export default BudgetList