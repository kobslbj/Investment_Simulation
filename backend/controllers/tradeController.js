const tradeModel = require("../models/tradeModel");

exports.executeTrade = async (req, res) => {
  try {
    const { userId, stockId, orderType, quantity, price } = req.body;
    const orderId = await tradeModel.placeOrder(userId, stockId, orderType, quantity, price);
    res.status(200).json({ message: `Order ${orderType} placed`, orderId: orderId });
  } catch (error) {
    console.error("Error occurred in executeTrade:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};
