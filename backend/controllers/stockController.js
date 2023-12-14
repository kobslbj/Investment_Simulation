const stockModel = require('../models/stockModel');

exports.listAllStocks = async (req, res) => {
  try {
    const stocks = await stockModel.getAllStocks();
    res.json(stocks);
  } catch (error) {
    res.status(500).send("Server error occurred.");
  }
};

exports.getStock = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stock = await stockModel.getStockById(stockId);
    if (!stock) {
      return res.status(404).send("Stock not found.");
    }
    res.json(stock);
  } catch (error) {
    res.status(500).send("Server error occurred.");
  }
};
