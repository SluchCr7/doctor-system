const express = require('express');
const router = express.Router();
const { getTransactions, getInvoices, createTransaction, getFinancialStats } = require('../controllers/financialController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/transactions', getTransactions);
router.get('/invoices', getInvoices);
router.post('/pay', createTransaction);
router.get('/stats', getFinancialStats);

module.exports = router;
