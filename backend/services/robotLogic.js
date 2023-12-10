const pool = require("../db"); 


async function selectRandomStock() {
    try {
        const query = "SELECT * FROM stocks ORDER BY RAND() LIMIT 1";
        const [rows] = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.error("Error in selectRandomStock:", error.message);
        throw error;
    }
}

async function generateRandomTrade() {
    try {
        const selectedStock = await selectRandomStock();
        if (!selectedStock) {
            throw new Error('No stock selected');
        }

        const orderType = Math.random() > 0.5 ? 'buy' : 'sell';
        const currentPrice = selectedStock.current_price;
        const priceFluctuation = currentPrice * 0.05; // 5% 的價格波動
        const randomPriceChange = Math.random() * priceFluctuation * 2 - priceFluctuation;
        const transactionPrice = currentPrice + randomPriceChange;
        const transactionVolume = Math.floor(Math.random() * 100) + 1; 

        return {
            stockId: selectedStock.id,
            orderType,
            price: transactionPrice,
            quantity: transactionVolume
        };
    } catch (error) {
        console.error("Error in generateRandomTrade:", error.message);
        throw error;
    }
}

async function getStockPriceHistory(stockId) {
    try {
        const query = "SELECT transaction_price FROM transactions WHERE stock_id = ? ORDER BY transaction_date DESC LIMIT 10";
        const [rows] = await pool.query(query, [stockId]);
        return rows.map(row => row.transaction_price);
    } catch (error) {
        console.error("Error in getStockPriceHistory:", error.message);
        throw error;
    }
}

async function generateTrendTrade() {
    try {
        const selectedStock = await selectRandomStock();
        if (!selectedStock) {
            throw new Error('No stock selected');
        }

        const history = await getStockPriceHistory(selectedStock.id);
        if (history.length < 10) {
            throw new Error('Not enough data for trend analysis');
        }

        // 簡化的趨勢決策：計算價格平均值並決定買賣
        const averagePrice = history.reduce((acc, price) => acc + price, 0) / history.length;
        const currentPrice = selectedStock.current_price;
        const orderType = currentPrice > averagePrice ? 'sell' : 'buy';
        const priceFluctuation = currentPrice * 0.05;
        const transactionPrice = orderType === 'buy'
            ? currentPrice - priceFluctuation // 買入價格低於當前價格
            : currentPrice + priceFluctuation; // 賣出價格高於當前價格
        const transactionVolume = Math.floor(Math.random() * 100) + 1;

        return {
            stockId: selectedStock.id,
            orderType,
            price: transactionPrice,
            quantity: transactionVolume
        };
    } catch (error) {
        console.error("Error in generateTrendTrade:", error.message);
        throw error;
    }
}
async function generateTradeForRobot(robotId) {
    try {
        // 根據機器人ID選擇不同的交易策略
        // 例如：robotId 1 使用隨機交易，robotId 2 使用趨勢交易
        if (robotId === 1) {
            return await generateRandomTrade();
        } else if (robotId === 2) {
            return await generateTrendTrade();
        } else {
            // 默認策略或錯誤處理
            throw new Error('Invalid robot ID');
        }
    } catch (error) {
        console.error("Error in generateTradeForRobot:", error.message);
        throw error;
    }
}

module.exports = {
    generateRandomTrade,
    generateTrendTrade,
    generateTradeForRobot
};