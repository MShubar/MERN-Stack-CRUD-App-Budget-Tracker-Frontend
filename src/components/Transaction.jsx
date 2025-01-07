import { Link } from 'react-router-dom'
const Transaction = ({ transaction }) => {
  return (
    <Link to={`/transaction/${transaction._id}`}>
      <div className="transaction-card" key={transaction._id}>
        <h2>{transaction.name}</h2>
      </div>
    </Link>
  )
}
export default Transaction
