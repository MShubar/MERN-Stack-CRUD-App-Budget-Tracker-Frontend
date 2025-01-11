import { Link } from 'react-router-dom'

const Transaction = ({ transaction }) => {
  return (
    <Link
      to={`/transaction/${transaction._id}`}
      className="text-decoration-none"
    >
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-primary fw-bold mb-0">
              {transaction.name}
            </h5>
            <span
              className={`badge ${
                transaction.amount < 0 ? 'bg-danger' : 'bg-success'
              } fs-6`}
            >
              {transaction.amount < 0 ? '-' : '+'}
              {Math.abs(transaction.amount).toFixed(2)} BD
            </span>
          </div>
          <p className="card-text text-muted mt-2 mb-1">
            <small>
              Date: {new Date(transaction.date).toLocaleDateString()}
            </small>
          </p>
          <p className="card-text text-secondary mb-0">
            <small>Type: {transaction.type}</small>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Transaction
