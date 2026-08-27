import React, { useState } from 'react';

function Withdraw({ onBack, onContinue }) {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    function handleContinue(e) {
        e.preventDefault();
        setError('');

        const numericAmount = Number(amount);

        if (!amount || numericAmount <= 0) {
            setError('Withdrawal amount must be greater than zero.');
            return;
        }

        onContinue(numericAmount);
    }

    return (
        <div className="container">
            <h1>Withdraw Money</h1>
            <form onSubmit={handleContinue}>
                <div className="form-group">
                    <label>Withdrawal Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Continue</button>
            </form>

            {error && <p className="error-text">{error}</p>}

            <button className="btn btn-secondary" onClick={onBack}>Back to Dashboard</button>
        </div>
    );
}

export default Withdraw;