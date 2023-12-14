const pool = require("../db");

exports.getStockHoldingsByUserId = async (userId) => {
  try {
    const query = `
      SELECT 
        sh.id, sh.user_id, sh.stock_id, sh.quantity, sh.average_price, 
        s.stock_symbol, s.stock_name, s.current_price 
      FROM 
        stock_holdings sh 
      JOIN 
        stocks s ON sh.stock_id = s.id 
      WHERE 
        sh.user_id = ?;
    `;
    const [stockHoldings] = await pool.query(query, [userId]);
    return stockHoldings;
  } catch (error) {
    console.error("Error in getStockHoldingsByUserId:", error);
    throw error;
  }
};
