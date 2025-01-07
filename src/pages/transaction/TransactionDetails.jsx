import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const TransactionDetails = ({ transactions, categories, budgets, user }) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  useEffect(() => {
    const getTransaction = () => {
      const singleTransaction = transactions.find((transaction) => {
        return transaction._id === id
      })
      setTransaction(singleTransaction)
    }
    getTransaction()
  }, [transactions, id])
  // Find the category name based on the category ID
  const categoryName = transaction
    ? categories.find((category) => category._id === transaction.category)?.name
    : ''

  // Find the budget name based on the budget ID
  const budgetName = transaction
    ? budgets.find((budget) => budget._id === transaction.budgetId)?.name
    : ''
  // if (!user) return null
  return (
    <div>
      {transaction ? (
        <>
          <h1>Transactions Details</h1>
          <section className="transaction-details">
            <h2>Transaction Name: {transaction.name}</h2>
            <h2>Transaction Budget Name: {budgetName || 'N/A'}</h2>
            <h3>Amount: {transaction.amount} </h3>
            <h3>Type: {transaction.type}</h3>
            <h3>Fixed: {transaction.fixed}</h3>
            <h3>Description: {transaction.description}</h3>
            <h3>Date: {transaction.date}</h3>
            <h3>Category: {categoryName || 'N/A'}</h3>
            <h3>Priority: {transaction.priority}</h3>
            <h3>Recurring: {transaction.recurring}</h3>

            <button
              onClick={() => navigate(`/transaction/update/${transaction._id}`)}
            >
              Update
            </button>
            <button
              onClick={() => navigate(`/transaction/delete/${transaction._id}`)}
            >
              Delete
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
