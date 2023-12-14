const pool = require("../db");

exports.getAllStocks = async () => {
  try {
    const query = "SELECT * FROM stocks";
    const [stocks] = await pool.query(query);
    return stocks;
  } catch (error) {
    console.error("Error occurred in getAllStocks:", error);
    throw error;
  }
};

exports.getStockById = async (stockId) => {
  try {
    const query = "SELECT * FROM stocks WHERE id = ?";
    const [stocks] = await pool.query(query, [stockId]);
    return stocks[0];
  } catch (error) {
    console.error("Error occurred in getStockById:", error);
    throw error;
  }
};
