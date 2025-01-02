import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const TransactionDetails = ({ transactions }) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [transaction, setTransaction] = useState({})
  useEffect(() => {
    const getTransaction = () => {
      const singleTransaction = transactions.find((transaction) => {
        return transaction._id === id
      })
      setTransaction(singleTransaction)
    }
    getTransaction()
  }, [transactions])
  return (
    <div>
      {transaction ? (
        <>
          <h1>Transactions Details</h1>
          <section className="transaction-details">
            <h2>Transaction Name: {transaction.name}</h2>
            <h3>Amount: {transaction.amount} </h3>
            <h3>Type: {transaction.type}</h3>
            <h3>Fixed: {transaction.fixed}</h3>
            <h3>Description: {transaction.description}</h3>
            <h3>Date: {transaction.date}</h3>
            <h3>Category: {transaction.category}</h3>
            <h3>Priority: {transaction.priority}</h3>
            <h3>Recurring: {transaction.recurring}</h3>

            <button onClick={() => navigate(`/update/${transaction._id}`)}>
              Update Transaction
            </button>
            <button onClick={() => navigate(`/delete/${transaction._id}`)}>
              Delete Transaction
            </button>
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
export default TransactionDetails
