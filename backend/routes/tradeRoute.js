const express = require('express');
const tradeController = require('../controllers/tradeController');

const router = express.Router();

router.post('/1.0/trade/execute', tradeController.executeTrade);

module.exports = router;
