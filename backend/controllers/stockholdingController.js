// stockholdingController.js

const stockholdingModel = require('../models/stockholdingModel');

exports.getStockHolding = async (req, res) => {
  try {
    const userId = req.params.userId;
    const stockHoldings = await stockholdingModel.getStockHoldingsByUserId(userId);
    res.json(stockHoldings);
  } catch (error) {
    console.error("Error in getStockHolding:", error);
    res.status(500).send("Internal Server Error");
  }
};
