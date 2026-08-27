const express = require('express');
const router = express.Router();
const { checkBalance, deposit, getTransactionHistory } = require('../controllers/accountController');

router.get('/balance', checkBalance);
router.post('/deposit', deposit);
router.get('/transactions', getTransactionHistory);

module.exports = router;