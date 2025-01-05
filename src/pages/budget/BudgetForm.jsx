import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { BASE_URL } from "../../globals"

const BudgetForm = ({ budgets, setBudgets}) => {
    let navigate = useNavigate()
    let initialState = {
        name: '',
        balance: '',
        // transactions:''
    }
    const [formValues, setFormValues] = useState(initialState)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token') 
        try {
          const response = await axios.post(
            `${BASE_URL}/budgets`,
            formValues,
            {
              headers: {
                Authorization: `Bearer ${token}` 
              }
            }
          )
          setBudgets([...budgets, response.data])
          setFormValues(initialState)
          navigate('/budgetlist')
        } catch (error) {
          console.error('Error adding this budget:', error)
        }
      }

      const handleChange = (event) => {
        setFormValues({ ...formValues, [event.target.id]: event.target.value })
      }

    return(
        <div>
            <h1>Create a Budget:</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input 
            type="text" 
            id="name" 
            onChange={handleChange} 
            value={formValues.name} 
            />
            <br></br>

            <label htmlFor="balance">Balance:</label>
            <input 
            type="number" 
            id="balance" 
            onChange={handleChange} 
            value={formValues.balance} 
            />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default BudgetForm