const pool = require("../db");
exports.getAllTransactions = async (userId) => {
    try {
      let query = `
        SELECT t.*, o.order_type, o.user_id
        FROM transactions t
        JOIN orders o ON t.order_id = o.id
      `;
  
      const queryParams = [];
      if (userId) {
        query += ` WHERE o.user_id = ?`;
        queryParams.push(userId);
      }
  
      const [transactions] = await pool.query(query, queryParams);
      return transactions;
    } catch (error) {
      console.error("Error occurred in getAllTransactions:", error);
      throw error;
    }
  };
  