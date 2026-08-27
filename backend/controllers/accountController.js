const { getAccountByUserId, updateBalance, recordTransaction, getTransactionsByAccountId, getTodaysTotalByType} = require('../services/userService');

function checkBalance(req, res) {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId is required.' });
    }

    const account = getAccountByUserId(userId);

    if (!account) {
        return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    res.json({ balance: account.balance });
}

const DAILY_DEPOSIT_LIMIT = 50000;

function deposit(req, res) {
    const { userId, amount } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId is required.' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ success: false, message: 'Deposit amount must be greater than zero.' });
    }

    const account = getAccountByUserId(userId);
    if (!account) {
        return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    const todaysDeposits = getTodaysTotalByType(account.account_id, 'Deposit');
    if (todaysDeposits + amount > DAILY_DEPOSIT_LIMIT) {
        return res.status(400).json({
            success: false,
            message: `Daily deposit limit of $${DAILY_DEPOSIT_LIMIT} exceeded.`
        });
    }

    const newBalance = account.balance + amount;

    updateBalance(account.account_id, newBalance);
    recordTransaction(account.account_id, 'Deposit', amount, newBalance);

    res.json({
        success: true,
        oldBalance: account.balance,
        deposit: amount,
        newBalance: newBalance
    });
}

function getTransactionHistory(req, res) {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId is required.' });
    }

    const account = getAccountByUserId(userId);
    if (!account) {
        return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    const transactions = getTransactionsByAccountId(account.account_id);

    res.json({ transactions });
}

module.exports = { checkBalance, deposit, getTransactionHistory};