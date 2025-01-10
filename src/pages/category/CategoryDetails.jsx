import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const CategoryDetails = ({ categories, transactions }) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [category, setCategory] = useState(null) // initial null state
  const [categoryTransactions, setCategoryTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCategory = () => {
      const singleCategory = categories.find((category) => category._id === id)
      setCategory(singleCategory)
    }

    const getCategoryTransactions = () => {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.category.toString() === id
      )
      setCategoryTransactions(filteredTransactions)
    }

    getCategory()
    getCategoryTransactions()
    setLoading(false) // Stop loading after data is fetched
  }, [categories, transactions, id])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (!category) {
    return <p>Category not found.</p>
  }

  return (
    <div className="container">
      <h1 className="my-4">Category Details</h1>
      <section className="mb-4">
        <h2>{category.name}</h2>

        <Link
          className="btn btn-primary btn-sm mb-2"
          to={`/categoryupdate/${category._id}`}
        >
          Update
        </Link>
        <Link
          className="btn btn-primary btn-sm mb-2"
          to={`/categorydelete/${category._id}`}
        >
          Delete
        </Link>
      </section>

      <section>
        <h3>Transactions in this Category:</h3>
        {categoryTransactions.length > 0 ? (
          <div className="list-group">
            {categoryTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="list-group-item d-flex justify-content-between align-items-center mb-3 p-3"
              >
                <div>
                  <h5>Transaction ID: {transaction._id}</h5>
                  <p>
                    <strong>Amount:</strong> {transaction.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Description:</strong>{' '}
                    {transaction.description || 'N/A'}
                  </p>
                  <p>
                    <strong>Type:</strong> {transaction.type}
                  </p>
                  <p>
                    <strong>Priority:</strong> {transaction.priority}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <Link
                    className="btn btn-primary btn-sm mb-2"
                    to={`/transactions/update/${transaction._id}`}
                  >
                    Update
                  </Link>
                  <Link
                    className="btn btn-primary btn-sm mb-2"
                    to={`/transactions/delete/${transaction._id}`}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions for this category.</p>
        )}
      </section>
    </div>
  )
}

export default CategoryDetails
