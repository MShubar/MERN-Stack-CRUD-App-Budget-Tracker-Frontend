import { useNavigate, useParams } from "react-router"
import axios from 'axios'
import { BASE_URL } from '../../globals'

const BudgetDeleteConfirm = ({ budgets, setBudgets }) => {
    let navigate = useNavigate()
    const { id } = useParams()

    const deleteBudget = async () => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${BASE_URL}/budgets/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}` 
                  } 
            })
            let index = budgets.findIndex(
                (budget) => budget._id === id
            )
            setBudgets(budgets.toSpliced(index,1))
            navigate('/budgetlist')
        } catch(error) {
            console.log('Error deleting this budget:', error)
        }
    }
    return (
        <div>
          <h1>Are you sure you want to delete this budget?</h1>
          <button onClick={() => navigate(`/budgetlist/${id}`)}>No</button>
          <button onClick={deleteBudget}>Yes</button>
        </div>
      )
    }

export default BudgetDeleteConfirm
