import React, { useState, useEffect } from 'react';

function Transactions({ user, onBack }) {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch(`http://localhost:5001/api/transactions?userId=${user.userId}`);
                const data = await response.json();

                if (response.ok) {
                    setTransactions(data.transactions);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Unable to connect to server.');
            }
        }

        fetchTransactions();
    }, [user.userId]);

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <h1>Transaction History</h1>
            {error && <p className="error-text">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.transaction_id}>
                            <td>{new Date(t.transaction_date).toLocaleString()}</td>
                            <td>{t.transaction_type}</td>
                            <td>${t.amount.toFixed(2)}</td>
                            <td>${t.balance_after.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-secondary" onClick={onBack}>Back to Dashboard</button>
        </div>
    );
}

export default Transactions;