// orderController.js

const orderModel = require('../models/orderModel');

async function getAllOrders(req, res) {
  try {
    const userId = req.params.userId;
    const orders = await orderModel.getAllOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllOrders,
};
