import { useState, useEffect } from 'react';
import Transaction from '../../components/Transaction';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../globals';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`${BASE_URL}/transaction`, {
          headers: { Authorization: `Bearer ${token}` }, 
        });
        setTransactions(response.data); 
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch transactions.');
      }
    };

    fetchTransactions(); 
  }, []); 

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Transactions List</h1>
        <NavLink to="/transaction/new" className="btn btn-success">
          New Transaction
        </NavLink>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <section className="transaction-list">
        <div className="row gy-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div className="col-12" key={transaction._id}>
                <Transaction transaction={transaction} />
              </div>
            ))
          ) : (
            <p className="text-muted">No transactions found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default TransactionList;
