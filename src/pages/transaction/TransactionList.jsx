import Transaction from '../../components/Transaction'
import { NavLink } from 'react-router-dom'
const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h1>Transactions List</h1>
      <NavLink className="addLink" to="/new">
        New Transaction
      </NavLink>
      <section className="transaction-list">
        {transactions?.map((transaction) => (
          <Transaction transaction={transaction} key={transaction._id} />
        ))}
      </section>
    </div>
  )
}

export default TransactionList
