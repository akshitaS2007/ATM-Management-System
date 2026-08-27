import React, { useState, useEffect } from 'react';

function Balance({ user, onBack }) {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchBalance() {
            try {
                const response = await fetch(`http://localhost:5001/api/balance?userId=${user.userId}`);
                const data = await response.json();

                if (response.ok) {
                    setBalance(data.balance);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Unable to connect to server.');
            }
        }

        fetchBalance();
    }, [user.userId]);

    return (
        <div className="container">
            <h1>Current Balance</h1>
            {error && <p className="error-text">{error}</p>}
            {balance !== null && (
                <div className="result-box">
                    <p>${balance.toFixed(2)}</p>
                </div>
            )}
            <button className="btn btn-secondary" onClick={onBack}>Back to Dashboard</button>
        </div>
    );
}

export default Balance;