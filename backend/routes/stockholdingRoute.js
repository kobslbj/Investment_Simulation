
const express = require('express');
const router = express.Router();
const stockholdingController = require('../controllers/stockholdingController');

// 定義 getStockHolding 路由
router.get('/1.0/stockholdings/:userId', stockholdingController.getStockHolding);

module.exports = router;
