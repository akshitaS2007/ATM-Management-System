import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Balance from './pages/Balance';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Denomination from './pages/Denomination';
import Transactions from './pages/Transactions';

function App() {
    const [user, setUser] = useState(null);
    const [screen, setScreen] = useState('dashboard');
    const [withdrawAmount, setWithdrawAmount] = useState(0);

    function handleLoginSuccess(userData) {
        setUser(userData);
        setScreen('dashboard');
    }

    function handleLogout() {
        setUser(null);
        setScreen('dashboard');
    }

    function handleNavigate(destination) {
        setScreen(destination);
    }

    function handleWithdrawContinue(amount) {
        setWithdrawAmount(amount);
        setScreen('denomination');
    }

    if (!user) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    if (screen === 'dashboard') {
        return <Dashboard user={user} onNavigate={handleNavigate} onLogout={handleLogout} />;
    }

    if (screen === 'balance') {
        return <Balance user={user} onBack={() => setScreen('dashboard')} />;
    }

    if (screen === 'deposit') {
        return <Deposit user={user} onBack={() => setScreen('dashboard')} />;
    }

    if (screen === 'withdraw') {
        return (
            <Withdraw
                onBack={() => setScreen('dashboard')}
                onContinue={handleWithdrawContinue}
            />
        );
    }

    if (screen === 'denomination') {
        return (
            <Denomination
                user={user}
                amount={withdrawAmount}
                onBack={() => setScreen('dashboard')}
                onDone={() => setScreen('dashboard')}
            />
        );
    }

    if (screen === 'transactions') {
        return <Transactions user={user} onBack={() => setScreen('dashboard')} />;
    }

    return (
        <div>
            <p>Unknown screen: {screen}</p>
            <button onClick={() => setScreen('dashboard')}>Back to Dashboard</button>
        </div>
    );
}

export default App;