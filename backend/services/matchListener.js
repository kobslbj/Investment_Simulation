// matchListener.js
const matchEmitter = require('./eventEmitter');
const { matchOrders } = require('./matchMakingService');

matchEmitter.on('newOrder', async (order) => {
  try {
    await matchOrders(); 
  } catch (error) {
    console.error("Error occurred during order matching:", error.message);
  }
});
