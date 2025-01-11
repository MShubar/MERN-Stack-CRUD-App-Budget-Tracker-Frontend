import { useEffect } from 'react'
import Transaction from '../../components/Transaction'
import { NavLink } from 'react-router-dom'

const TransactionList = ({ transactions }) => {
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Transactions List</h1>
        <NavLink to="/transaction/new" className="btn btn-success">
          New Transaction
        </NavLink>
      </div>
      <section className="transaction-list">
        <div className="row gy-3">
          {transactions?.map((transaction) => (
            <div className="col-12" key={transaction._id}>
              <Transaction transaction={transaction} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TransactionList
