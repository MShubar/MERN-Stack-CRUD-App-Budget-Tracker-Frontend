import Transaction from '../../components/Transaction'

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h1>Transactions List</h1>
      <section className="transaction-list">
        {transactions?.map((transaction) => (
          <Transaction transaction={transaction} key={transaction._id} />
        ))}
      </section>
    </div>
  )
}

export default TransactionList
