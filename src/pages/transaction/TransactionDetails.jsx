import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const TransactionDetails = ({ transactions, budgets, user, categories }) => {
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
  const categoryName = transaction
    ? categories.find((category) => category._id === transaction.category)?.name
    : ''

  const budgetName = transaction
    ? budgets.find((budget) => budget._id === transaction.budgetId)?.name
    : ''
  return (
    <div className="container my-4">
      {transaction ? (
        <>
          <h1 className="text-primary mb-4">Transaction Details</h1>
          <div className="card p-4 shadow-sm border-0">
            <h2 className="text-success mb-3">
              Transaction Name: {transaction.name}
            </h2>
            <p className="mb-2">
              <strong>Transaction Budget Name:</strong> {budgetName || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Amount:</strong> {transaction.amount} BD
            </p>
            <p className="mb-2">
              <strong>Type:</strong> {transaction.type}
            </p>
            <p className="mb-2">
              <strong>Fixed:</strong> {transaction.fixed}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {transaction.description}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {transaction.date}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {categoryName || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Priority:</strong> {transaction.priority}
            </p>
            <p className="mb-2">
              <strong>Recurring:</strong> {transaction.recurring}
            </p>

            <div className="d-flex justify-content-between mt-3">
              <Link
                className="btn btn-warning btn-sm"
                to={`/transaction/update/${transaction._id}`}
              >
                Update
              </Link>
              <Link
                className="btn btn-danger btn-sm"
                to={`/transaction/delete/${transaction._id}`}
              >
                Delete
              </Link>
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-muted">Loading...</h2>
      )}
    </div>
  )
}
export default TransactionDetails
