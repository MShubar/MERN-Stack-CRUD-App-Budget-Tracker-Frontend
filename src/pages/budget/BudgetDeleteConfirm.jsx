import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const BudgetDeleteConfirm = ({
  budgets,
  setBudgets,
  transactions,
  setTransactions
}) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const deleteBudget = async () => {
    const token = localStorage.getItem('token')
    try {
      
      await axios.delete(`${BASE_URL}/budgets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

     
      const updatedBudgets = budgets.filter((budget) => budget._id !== id)
      setBudgets(updatedBudgets)

      const updatedTransactions = transactions.filter(
        (transaction) => transaction.budgetId !== id
      )
      setTransactions(updatedTransactions)

      navigate('/budgetlist')
    } catch (error) {
      console.log('Error deleting this budget:', error)
    }
  }

  return (
    <div>
      <h2>
        Are you sure you want to delete this budget?
        <br />
        <font color="red" size="5">
          <b>
            All transactions related to this budget will be deleted as well.
          </b>
        </font>
      </h2>

      <button onClick={() => navigate(`/budgetlist/${id}`)}>No</button>
      <button onClick={deleteBudget}>Yes</button>
    </div>
  )
}

export default BudgetDeleteConfirm
