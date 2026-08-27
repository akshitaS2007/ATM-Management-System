const { getAccountByUserId, updateBalance, recordTransaction, getTodaysTotalByType} = require('../services/userService');

const DAILY_WITHDRAWAL_LIMIT = 1000;

function withdraw(req, res) {
    const { userId, amount, denominations } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId is required.' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ success: false, message: 'Withdrawal amount must be greater than zero.' });
    }
    if (!denominations || typeof denominations !== 'object') {
        return res.status(400).json({ success: false, message: 'Denominations are required.' });
    }

    const account = getAccountByUserId(userId);
    if (!account) {
        return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    if (amount > account.balance) {
        return res.status(400).json({ success: false, message: 'Insufficient account balance.' });
    }

    const todaysWithdrawals = getTodaysTotalByType(account.account_id, 'Withdrawal');
    if (todaysWithdrawals + amount > DAILY_WITHDRAWAL_LIMIT) {
        return res.status(400).json({
            success: false,
            message: `Daily withdrawal limit of $${DAILY_WITHDRAWAL_LIMIT} exceeded.`
        });
    }

    let denominationTotal = 0;
    for (const [note, count] of Object.entries(denominations)) {
        denominationTotal += Number(note) * Number(count);
    }

    if (denominationTotal !== amount) {
        return res.status(400).json({
            success: false,
            message: 'Selected denominations do not match withdrawal amount.'
        });
    }

    const newBalance = account.balance - amount;

    updateBalance(account.account_id, newBalance);
    recordTransaction(account.account_id, 'Withdrawal', amount, newBalance);

    res.json({ success: true, oldBalance: account.balance, withdrawn: amount, newBalance: newBalance, dispensed: denominations});
}

module.exports = { withdraw };