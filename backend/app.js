const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require('http');
const { init } = require("./socket");  

const userRoutes = require("./routes/userRoute");
const tradeRoute = require("./routes/tradeRoute");
const stockRoutes = require('./routes/stockRoute'); 
const transactionRoutes =  require('./routes/transactionRoute'); 
const stockholdingRoute = require('./routes/stockholdingRoute');
const robotScheduler = require("./services/robotScheduler");
const  {initializeRobotHoldings}  = require('./services/initializeHoldings');
require("./services/matchListener");

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = init(server);  // 使用 init 函数初始化 io

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", tradeRoute);
app.use('/api', stockRoutes);
app.use('/api', transactionRoutes);
app.use('/api', stockholdingRoute);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('welcome', 'Welcome to the investment simulation platform!');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// 监听 HTTP 服务器而非 Express 应用
server.listen(port, async () => {
  console.log("Investment simulation platform is running on port:", port);
  await initializeRobotHoldings();
  robotScheduler.scheduleRobotTrades(); // 启动机器人交易
});

// 仅导出 app 和 server，因为 io 现在可以通过 socket.js 访问
module.exports = { app, server };
