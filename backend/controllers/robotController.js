const robotLogic = require("../services/robotLogic");
const robotModel = require("../models/robotModel");

exports.simulateMarketActivity = async (req, res) => {
  console.log('simulateMarketActivity called');
  try {
    const trade = await robotLogic.generateRandomTrade();
    
    const orderId = await robotModel.placeRobotOrder(
      trade.stockId,
      trade.orderType,  
      trade.priceType,
      trade.quantity,
      trade.price  
    );
    console.log(`Placing order with trade object:`, trade); // 這將輸出整個交易對象，包括價格
    res.status(200).json({ message: "Market activity simulated", orderId });
  } catch (error) {
    console.error("Error occurred in simulateMarketActivity:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};

exports.buyStock = async (req, res) => {
  try {
    const { robotUserId, stockId, quantity, price } = req.body;
    // Include priceType when calling placeOrder
    const orderId = await robotModel.placeOrder(
      robotUserId,
      stockId,
      "buy",
      "limit", // or "market", depending on your logic
      quantity,
      price
    );
    res.status(200).json({
      message: `Robot (ID: ${robotUserId}) buy order placed`,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error occurred in buyStock:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { robotUserId, stockId, quantity, price } = req.body;
    // Include priceType when calling placeOrder
    const orderId = await robotModel.placeOrder(
      robotUserId,
      stockId,
      "sell",
      "limit", // or "market", depending on your logic
      quantity,
      price
    );
    res.status(200).json({
      message: `Robot (ID: ${robotUserId}) sell order placed`,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error occurred in sellStock:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};