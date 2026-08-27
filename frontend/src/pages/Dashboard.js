import React from 'react';

function Dashboard({ user, onNavigate, onLogout }) {
    return (
        <div className="container">
            <h1>Welcome {user.customerName}</h1>
            <button className="btn" onClick={() => onNavigate('balance')}>Check Balance</button>
            <button className="btn" onClick={() => onNavigate('deposit')}>Deposit Money</button>
            <button className="btn" onClick={() => onNavigate('withdraw')}>Withdraw Money</button>
            <button className="btn" onClick={() => onNavigate('transactions')}>Transaction History</button>
            <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;