const { generateTradeForRobot } = require('./robotLogic');
const { executeTrade } = require('../models/orderModel');



function scheduleRobotTrades() {
    setInterval(async () => {
        try {
            const trade1 = await generateTradeForRobot(1);
            await executeTrade(1, trade1.stockId, trade1.orderType, trade1.priceType, trade1.quantity, trade1.price);

            const trade2 = await generateTradeForRobot(2); 
            await executeTrade(2, trade2.stockId, trade2.orderType, trade2.priceType, trade2.quantity, trade2.price);
        } catch (error) {
            console.error("Error in scheduleRobotTrades:", error.message);
        }
    }, 1000); 
}

module.exports = {
    scheduleRobotTrades
};
