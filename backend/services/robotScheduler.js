const robotModel = require('./models/robotModel');
const robotLogic = require('./services/robotLogic'); // 假設您的交易邏輯在這個文件中

function scheduleRobotTrades() {
    setInterval(async () => {
        // 假設 generateTrade 為機器人產生交易數據的函數
        const trade1 = await robotLogic.generateTradeForRobot(1); // 為機器人1產生交易數據
        const trade2 = await robotLogic.generateTradeForRobot(2); // 為機器人2產生交易數據

        // 為機器人1下單
        robotModel.placeRobotOrder(1, trade1.stockId, trade1.orderType, trade1.priceType, trade1.quantity, trade1.orderPrice);

        // 為機器人2下單
        robotModel.placeRobotOrder(2, trade2.stockId, trade2.orderType, trade2.priceType, trade2.quantity, trade2.orderPrice);
    }, 5000); // 每5秒執行一次
}

module.exports = {
    scheduleRobotTrades
};
