// transactionController.js

const transactionModel = require("../models/transactionModel");

exports.getAllTransactions = async (req, res) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        // 如果 userId 不存在，返回適當的錯誤響應
        return res.status(400).json({ error: "userId is required" });
      }
  
      const transactions = await transactionModel.getAllTransactions(userId);
      res.json(transactions);
    } catch (error) {
      console.error("Error in getAllTransactions controller:", error);
      if (!res) {
        // 如果 res 不存在，打印錯誤信息
        console.error("Response object is undefined");
        return; // 確保在此處返回，以避免後續的錯誤
      }
      res.status(500).send("Server error occurred");
    }
  };
  