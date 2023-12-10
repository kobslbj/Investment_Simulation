const pool = require("../db");

exports.placeOrder = async (userId, stockId, orderType, priceType, quantity, orderPrice) => {
  try {
    const query = "INSERT INTO orders (user_id, stock_id, order_type, price_type, quantity, order_price, order_date, status) VALUES (?, ?, ?, ?, ?, ?, NOW(), 'pending')";
    const [results] = await pool.query(query, [userId, stockId, orderType, priceType, quantity, orderPrice]);
    return results.insertId;
  } catch (error) {
    console.error("Error occurred in placeOrder:", error.message);
    throw error;
  }
};
