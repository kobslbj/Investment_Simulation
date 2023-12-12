// 在 models 或 services 目錄下創建一個新的文件，例如 initializeHoldings.js
const pool = require('../db');

async function initializeRobotHoldings() {
  const robots = [1, 2]; // 假設您有兩個機器人用戶ID為 1 和 2
  const initialHoldings = {
    1: [{ stockId: 1, quantity: 10000 }, { stockId: 2, quantity: 10000 },{ stockId: 3, quantity: 10000 }, { stockId: 4, quantity: 10000 }, { stockId: 5, quantity: 10000 }],
    2: [{ stockId: 1, quantity: 10000 }, { stockId: 2, quantity: 10000 },{ stockId: 3, quantity: 10000 }, { stockId: 4, quantity: 10000 }, { stockId: 5, quantity: 10000 }]
  };

  try {
    await pool.query('START TRANSACTION');
    
    for (const robotId of robots) {
      for (const holding of initialHoldings[robotId]) {
        const { stockId, quantity } = holding;
        await pool.query(`
          INSERT INTO stock_holdings (user_id, stock_id, quantity) 
          VALUES (?, ?, ?) 
          ON DUPLICATE KEY UPDATE quantity = ?`,
          [robotId, stockId, quantity, quantity]
        );
      }
    }

    await pool.query('COMMIT');
  } catch (error) {
    console.error("Error in initializeRobotHoldings:", error.message);
    await pool.query('ROLLBACK');
    throw error;
  }
}

module.exports = {
  initializeRobotHoldings
};
