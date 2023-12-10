// routes/robotRoute.js

const express = require("express");
const robotController = require("../controllers/robotController");

const router = express.Router();

router.post("/1.0/robot/buy", robotController.buyStock);
router.post("/1.0/robot/sell", robotController.sellStock);

module.exports = router;
