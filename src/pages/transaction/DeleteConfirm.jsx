import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'

const DeleteConfirm = ({ transactions, setTransactions }) => {
  let navigate = useNavigate()
  const { id } = useParams()

  const deleteTransaction = async () => {
    const token = localStorage.getItem('token') // Retrieve the token from local storage
    try {
      await axios.delete(`${BASE_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      })
      let index = transactions.findIndex(
        (transaction) => transaction._id === id
      )
      setTransactions(transactions.toSpliced(index, 1))
      navigate('/transactionlist')
    } catch (error) {
      console.error('Error deleting transaction:', error)
      // Handle error (e.g., show a message to the user)
    }
  }

  return (
    <div>
      <h1>Are you sure you want to delete this transaction?</h1>
      <button onClick={() => navigate(`/transactionlist/${id}`)}>No</button>
      <button onClick={deleteTransaction}>Yes</button>
    </div>
  )
}

export default DeleteConfirm
