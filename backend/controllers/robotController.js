const robotLogic = require('../services/robotLogic');
const robotModel = require("../models/robotModel");

exports.simulateMarketActivity = async (req, res) => {
    try {
        const trade = await robotLogic.generateRandomTrade();

        const orderId = await robotModel.placeOrder(trade.stockId, trade.orderType, trade.quantity, trade.price);

        res.status(200).json({ message: 'Market activity simulated', orderId });
    } catch (error) {
        console.error("Error occurred in simulateMarketActivity:", error.message);
        res.status(500).send({ error: "Server Error." });
    }
};

exports.buyStock = async (req, res) => {
  try {
    const { robotUserId, stockId, quantity, price } = req.body;
    const orderId = await robotModel.placeOrder(robotUserId, stockId, 'buy', quantity, price);
    res.status(200).json({ message: `Robot (ID: ${robotUserId}) buy order placed`, orderId: orderId });
  } catch (error) {
    console.error("Error occurred in buyStock:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { robotUserId, stockId, quantity, price } = req.body;
    const orderId = await robotModel.placeOrder(robotUserId, stockId, 'sell', quantity, price);
    res.status(200).json({ message: `Robot (ID: ${robotUserId}) sell order placed`, orderId: orderId });
  } catch (error) {
    console.error("Error occurred in sellStock:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};
