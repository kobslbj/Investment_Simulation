const pool = require("../db");
const matchEmitter = require("../services/eventEmitter");

async function getUserById(userId) {
  const query = "SELECT * FROM users WHERE id = ?";
  const [users] = await pool.query(query, [userId]);
  return users.length ? users[0] : null;
}

async function getBalance(userId) {
  const query = "SELECT balance FROM users WHERE id = ?";
  const [results] = await pool.query(query, [userId]);
  return results.length ? results[0].balance : null;
}

async function getStockById(stockId) {
  const query = "SELECT * FROM stocks WHERE id = ?";
  const [stocks] = await pool.query(query, [stockId]);
  return stocks.length ? stocks[0] : null;
}

async function executeTrade(
  userId,
  stockId,
  orderType,
  priceType,
  quantity,
  orderPrice
) {
  await pool.query("START TRANSACTION");

  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("用户不存在");
    }

    const balance = await getBalance(userId);
    if (orderType === "buy" && balance < orderPrice * quantity) {
      throw new Error("帳戶餘額不足");
    }

    const stock = await getStockById(stockId);
    if (!stock) {
      throw new Error("股票不存在");
    }

    if (orderType === "sell") {
      const stockHoldingQuery =
        "SELECT quantity FROM stock_holdings WHERE user_id = ? AND stock_id = ?";
      const [holdings] = await pool.query(stockHoldingQuery, [userId, stockId]);
      const holdingQuantity = holdings.length ? holdings[0].quantity : 0;
      if (holdingQuantity < quantity) {
        throw new Error("股票數量不足");
      }

      // Subtract the stocks from the user's holdings
      const updateHoldingsQuery =
        "UPDATE stock_holdings SET quantity = GREATEST(0, quantity - ?) WHERE user_id = ? AND stock_id = ?";
      await pool.query(updateHoldingsQuery, [quantity, userId, stockId]);
    } else if (orderType === "buy") {
      const updateBalanceQuery =
        "UPDATE users SET balance = balance - ? WHERE id = ?";
      await pool.query(updateBalanceQuery, [orderPrice * quantity, userId]);

      const updateHoldingsQuery =
        "INSERT INTO stock_holdings (user_id, stock_id, quantity, average_price) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?, average_price = ?";
      await pool.query(updateHoldingsQuery, [
        userId,
        stockId,
        quantity,
        orderPrice,
        quantity,
        orderPrice,
      ]);
    }

    const insertOrderQuery =
      "INSERT INTO orders (user_id, stock_id, order_type, price_type, quantity, remaining_quantity, order_price, order_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')";
    const [orderResult] = await pool.query(insertOrderQuery, [
      userId,
      stockId,
      orderType,
      priceType,
      quantity,
      quantity,
      orderPrice,
    ]);

    matchEmitter.emit("newOrder", {
      orderId: orderResult.insertId,
      stockId,
      orderType,
      priceType,
      quantity,
      orderPrice,
    });

    await pool.query("COMMIT");

    return orderResult.insertId;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}

module.exports = {
  executeTrade,
};
