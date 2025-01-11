import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
      console.log('Category ID:', id)
      if (transactions && Array.isArray(transactions)) {
        const filteredTransactions = transactions.filter((transaction) => {
          console.log('Transaction Category:', transaction.category)
          return transaction.category.toString() === id
        })
        setCategoryTransactions(filteredTransactions)
      } else {
        setCategoryTransactions([])
      }
    }

    getCategory()
    getCategoryTransactions()
  }, [categories, transactions, id])

  useEffect(() => {
    if (category !== null) {
      setLoading(false)
    }
  }, [category]) // set loading to false once category is available

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
    <div className="container my-4">
      <h1 className="text-primary mb-4">Category Details</h1>

      <div className="card p-4 shadow-sm border-0 mb-4">
        <h2 className="text-success mb-3">{category.name}</h2>

        <div className="d-flex justify-content-between">
          <Link
            className="btn btn-warning btn-sm"
            to={`/categoryupdate/${category._id}`}
          >
            <i className="bi bi-pencil"></i> Update
          </Link>
          <Link
            className="btn btn-danger btn-sm"
            to={`/categorydelete/${category._id}`}
          >
            <i className="bi bi-trash"></i> Delete
          </Link>
        </div>
      </div>

      {categoryTransactions.length > 0 ? (
        <section>
          <h3 className="text-primary mb-3">
            Transactions under this Category
          </h3>
          <ul className="list-group">
            {categoryTransactions.map((transaction) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={transaction._id}
              >
                <span>{transaction.name}</span>
                <span className="badge bg-secondary">{transaction.amount}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-muted">No transactions found under this category.</p>
      )}
    </div>
  )
}

export default CategoryDetails
