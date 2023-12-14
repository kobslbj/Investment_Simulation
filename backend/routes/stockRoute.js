const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/1.0/stocks', stockController.listAllStocks);
router.get('/1.0/stocks/:id', stockController.getStock);

module.exports = router;
