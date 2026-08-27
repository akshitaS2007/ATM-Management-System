import React, { useState } from 'react';

const NOTE_VALUES = [100, 50, 20, 10, 5, 1];

function Denomination({ user, amount, onBack, onDone }) {
    const [counts, setCounts] = useState({});
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    function handleCountChange(note, value) {
        setCounts({ ...counts, [note]: value });
    }

    const total = NOTE_VALUES.reduce((sum, note) => {
        return sum + note * (Number(counts[note]) || 0);
    }, 0);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setResult(null);

        if (total !== amount) {
            setError('Selected denominations do not match withdrawal amount.');
            return;
        }

        const denominations = {};
        NOTE_VALUES.forEach((note) => {
            if (counts[note]) {
                denominations[note] = Number(counts[note]);
            }
        });

        try {
            const response = await fetch('http://localhost:5001/api/withdraw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.userId, amount, denominations })
            });

            const data = await response.json();

            if (data.success) {
                setResult(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Unable to connect to server.');
        }
    }

    return (
        <div className="container">
            <h1>Select Cash Denominations</h1>
            <p>Withdraw: ${amount.toFixed(2)}</p>

            <form onSubmit={handleSubmit}>
                {NOTE_VALUES.map((note) => (
                    <div className="form-group" key={note}>
                        <label>{note}</label>
                        <input
                            type="number"
                            min="0"
                            value={counts[note] || ''}
                            onChange={(e) => handleCountChange(note, e.target.value)}
                        />
                    </div>
                ))}

                <p>Total: ${total.toFixed(2)}</p>

                <button type="submit" className="btn">Withdraw</button>
            </form>

            {error && <p className="error-text">{error}</p>}

            {result && (
                <div className="result-box">
                    <p>Old Balance: ${result.oldBalance.toFixed(2)}</p>
                    <p>Withdrawn: ${result.withdrawn.toFixed(2)}</p>
                    <p>New Balance: ${result.newBalance.toFixed(2)}</p>
                    <p>Cash dispensed. Withdrawal successful.</p>
                    <button className="btn" onClick={onDone}>Done</button>
                </div>
            )}

            <button className="btn btn-secondary" onClick={onBack}>Back to Dashboard</button>
        </div>
    );
}

export default Denomination;