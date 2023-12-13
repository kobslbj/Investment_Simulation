// services/orderBookService.js
const pool = require('../db');

async function getFiveLevelOrderBook(stockId) {
    const bidQuery = `
      SELECT order_price, SUM(remaining_quantity) as quantity 
      FROM orders 
      WHERE stock_id = ? AND order_type = 'buy' AND status = 'pending' 
      GROUP BY order_price 
      ORDER BY order_price DESC 
      LIMIT 5`;

    const askQuery = `
      SELECT order_price, SUM(remaining_quantity) as quantity 
      FROM orders 
      WHERE stock_id = ? AND order_type = 'sell' AND status = 'pending' 
      GROUP BY order_price 
      ORDER BY order_price ASC 
      LIMIT 5`;

    const totalBidQuery = `
      SELECT SUM(remaining_quantity) as totalQuantity 
      FROM orders 
      WHERE stock_id = ? AND order_type = 'buy' AND status = 'pending'`;

    const totalAskQuery = `
      SELECT SUM(remaining_quantity) as totalQuantity 
      FROM orders 
      WHERE stock_id = ? AND order_type = 'sell' AND status = 'pending'`;

    const [bids] = await pool.query(bidQuery, [stockId]);
    const [asks] = await pool.query(askQuery, [stockId]);
    const [[totalBids]] = await pool.query(totalBidQuery, [stockId]);
    const [[totalAsks]] = await pool.query(totalAskQuery, [stockId]);

    return { 
        bids, 
        asks, 
        totalBidQuantity: totalBids.totalQuantity || 0, 
        totalAskQuantity: totalAsks.totalQuantity || 0 
    };
}
module.exports = { getFiveLevelOrderBook };
