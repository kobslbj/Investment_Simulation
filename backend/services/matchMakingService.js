const pool = require("../db");

async function matchOrders() {
  try {
    // 1. 獲取所有待撮合的訂單
    let [pendingOrders] = await pool.query(
      "SELECT * FROM orders WHERE status = 'pending'"
    );

    for (let order of pendingOrders) {
      // 2. 根據訂單類型進行撮合
      if (order.price_type === "limit") {
        // 對於限價單，找到匹配的最佳訂單
        await matchLimitOrder(order);
      } else if (order.price_type === "market") {
        // 對於市價單，執行市價撮合邏輯
        await matchMarketOrder(order);
      }
    }
  } catch (error) {
    console.error("Error occurred in matchOrders:", error.message);
    throw error;
  }
}

async function updateStockPrice(stockId, newPrice) {
    const updatePriceQuery = "UPDATE stocks SET current_price = ? WHERE id = ?";
    await pool.query(updatePriceQuery, [newPrice, stockId]);
}
async function matchLimitOrder(order) {
  try {
    // 假設買單是尋找價格小於等於限價的賣單，賣單則相反
    const oppositeType = order.order_type === "buy" ? "sell" : "buy";
    const orderPriceCondition = order.order_type === "buy" ? "<=" : ">=";
    const matchQuery = `
      SELECT * FROM orders 
      WHERE stock_id = ? AND order_type = ? AND price_type = 'limit' AND status = 'pending' 
      AND order_price ${orderPriceCondition} ?
      ORDER BY order_price ${
        order.order_type === "buy" ? "ASC" : "DESC"
      }, order_date ASC
      LIMIT 1`;

    const [matchingOrders] = await pool.query(matchQuery, [
      order.stock_id,
      oppositeType,
      order.order_price,
    ]);

    if (matchingOrders.length > 0) {
        const matchingOrder = matchingOrders[0];
        // 計算撮合數量
        const matchedQuantity = Math.min(order.quantity, matchingOrder.quantity);
  
        // 更新撮合訂單的狀態和數量
        await updateOrderStatusAndQuantity(order.id, matchingOrder.id, matchedQuantity);
        await updateStockPrice(order.stock_id, matchingOrder.order_price);
      }
    } catch (error) {
      console.error("Error occurred in matchLimitOrder:", error.message);
      throw error;
    }
  }

async function matchMarketOrder(order) {
  try {
    // 市價單會尋找最佳可用價格
    const oppositeType = order.order_type === "buy" ? "sell" : "buy";
    const matchQuery = `
      SELECT * FROM orders 
      WHERE stock_id = ? AND order_type = ? AND status = 'pending'
      ORDER BY order_price ${
        order.order_type === "buy" ? "ASC" : "DESC"
      }, order_date ASC
      LIMIT 1`;

    const [matchingOrders] = await pool.query(matchQuery, [
      order.stock_id,
      oppositeType,
    ]);

    if (matchingOrders.length > 0) {
        const matchingOrder = matchingOrders[0];
        // 計算撮合數量
        const matchedQuantity = Math.min(order.quantity, matchingOrder.quantity);
  
        // 更新撮合訂單的狀態和數量
        await updateOrderStatusAndQuantity(order.id, matchingOrder.id, matchedQuantity);
        await updateStockPrice(order.stock_id, matchingOrder.order_price);
      }
    } catch (error) {
      console.error("Error occurred in matchMarketOrder:", error.message);
      throw error;
    }
  }
  async function updateOrderStatusAndQuantity(orderId, matchingOrderId, matchedQuantity) {
    const updateOrderQuery = "UPDATE orders SET quantity = quantity - ?, status = CASE WHEN quantity > 0 THEN 'partial' ELSE 'filled' END WHERE id = ?";
    await pool.query(updateOrderQuery, [matchedQuantity, orderId]);
    await pool.query(updateOrderQuery, [matchedQuantity, matchingOrderId]);
  }
module.exports = {
  matchOrders,
};
