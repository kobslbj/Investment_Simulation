const pool = require("../db");

exports.placeRobotOrder = async (robotUserId, stockId, orderType, priceType, quantity, orderPrice) => {
  try {
    const query = "INSERT INTO orders (user_id, stock_id, order_type, price_type, quantity, order_price, order_date, status) VALUES (?, ?, ?, ?, ?, ?, NOW(), 'pending')";
    const [results] = await pool.query(query, [robotUserId, stockId, orderType, priceType, quantity, orderPrice]);
    console.log(`Placing order with user ID: ${robotUserId}, stock ID: ${stockId}, order type: ${orderType}, price type: ${priceType}, quantity: ${quantity}, price: ${orderPrice}`);
    return results.insertId;
  } catch (error) {
    console.error("Error occurred in placeRobotOrder:", error.message);
    throw error;
  }
};
