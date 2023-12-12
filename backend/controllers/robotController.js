const tradeService = require("../models/orderModel");
const robotLogic = require("../services/robotLogic");

exports.simulateMarketActivity = async (req, res) => {
  console.log('simulateMarketActivity called');
  try {
    const trade = await robotLogic.generateRandomTrade();
    
    const orderId = await tradeService.executeTrade(
      trade.stockId,
      trade.orderType,  
      trade.priceType,
      trade.quantity,
      trade.price  
    );
    console.log(`Placing order with trade object:`, trade); 
    res.status(200).json({ message: "Market activity simulated", orderId });
  } catch (error) {
    console.error("Error occurred in simulateMarketActivity:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};

