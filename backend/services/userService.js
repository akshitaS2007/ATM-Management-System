const db = require('../database/db');

function findUserByCardNumber(cardNumber)
{
    const stmt = db.prepare('SELECT * FROM users WHERE card_number = ?');
    return stmt.get(cardNumber);
}

function getAccountByUserId(userId)
{
    const stmt = db.prepare('SELECT * FROM accounts WHERE user_id = ?');
    return stmt.get(userId);
}

function updateBalance(accountId, newBalance) {
    const stmt = db.prepare('UPDATE accounts SET balance = ? WHERE account_id = ?');
    stmt.run(newBalance, accountId);
}

function recordTransaction(accountId, type, amount, balanceAfter) {
    const stmt = db.prepare(
        'INSERT INTO transactions (account_id, transaction_type, amount, balance_after) VALUES (?, ?, ?, ?)'
    );
    stmt.run(accountId, type, amount, balanceAfter);
}

function getTransactionsByAccountId(accountId) {
    const stmt = db.prepare(
        'SELECT * FROM transactions WHERE account_id = ? ORDER BY transaction_date DESC'
    );
    return stmt.all(accountId);
}

function getTodaysTotalByType(accountId, type) {
    const stmt = db.prepare(`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM transactions
        WHERE account_id = ?
        AND transaction_type = ?
        AND date(transaction_date) = date('now')
    `);
    return stmt.get(accountId, type).total;
}

module.exports = {findUserByCardNumber, getAccountByUserId, updateBalance, recordTransaction, getTransactionsByAccountId, getTodaysTotalByType};