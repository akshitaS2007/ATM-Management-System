import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
    const [cardNumber, setCardNumber] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardNumber, pin })
            });

            const data = await response.json();

            if (data.success) {
                onLoginSuccess({ userId: data.userId, customerName: data.customerName });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Unable to connect to server.');
        }
    }

    return (
        <div className="container">
            <h1>ATM Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>PIN</label>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}

export default Login;