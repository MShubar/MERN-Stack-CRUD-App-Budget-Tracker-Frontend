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
    </div>
  )
}

export default CategoryDetails
