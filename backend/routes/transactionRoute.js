const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.get(
  "/1.0/transactions/:userId",
  transactionController.getAllTransactions
);

module.exports = router;
