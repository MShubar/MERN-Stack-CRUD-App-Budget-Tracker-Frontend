import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const CategoryDetails = ({ categories, transactions }) => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [category, setCategory] = useState({})
  const [categoryTransactions, setCategoryTransactions] = useState([])

  useEffect(() => {
    const getCategory = () => {
      const singleCategory = categories.find((category) => {
        return category._id === id
      })
      setCategory(singleCategory)
    }

    const getCategoryTransactions = () => {
      const filteredTransactions = transactions.filter((transaction) => {
        return transaction.category.toString() === id
      })
      setCategoryTransactions(filteredTransactions)
    }

    getCategory()
    getCategoryTransactions()
  }, [categories, transactions, id])

  return (
    <div className="container">
      {category ? (
        <>
          <h1 className="my-4">Category Details</h1>
          <section className="mb-4">
            <h2>{category.name}</h2>

            <button
              className="btn btn-primary me-2"
              onClick={() => navigate(`/categoryupdate/${category._id}`)}
            >
              Update
            </button>
            <button
              className="btn btn-danger"
              onClick={() => navigate(`/categorydelete/${category._id}`)}
            >
              Delete
            </button>
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
                        <strong>Amount:</strong> $
                        {transaction.amount.toFixed(2)}
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
                      <button
                        className="btn btn-primary btn-sm mb-2"
                        onClick={() =>
                          navigate(`/transaction/update/${transaction._id}`)
                        }
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          navigate(`/transaction/delete/${transaction._id}`)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No transactions for this category.</p>
            )}
          </section>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default CategoryDetails
