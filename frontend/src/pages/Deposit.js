import React, { useState } from 'react';

function Deposit({ user, onBack }) {
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://localhost:5001/api/deposit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.userId, amount: Number(amount) })
            });

            const data = await response.json();

            if (data.success) {
                setResult(data);
                setAmount('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Unable to connect to server.');
        }
    }

    return (
        <div className="container">
            <h1>Deposit Money</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Deposit Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Deposit</button>
            </form>

            {error && <p className="error-text">{error}</p>}

            {result && (
                <div className="result-box">
                    <p>Old Balance: ${result.oldBalance.toFixed(2)}</p>
                    <p>Deposit: ${result.deposit.toFixed(2)}</p>
                    <p>New Balance: ${result.newBalance.toFixed(2)}</p>
                    <p>Deposit successful.</p>
                </div>
            )}

            <button className="btn btn-secondary" onClick={onBack}>Back to Dashboard</button>
        </div>
    );
}

export default Deposit;