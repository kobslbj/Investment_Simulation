const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const tradeRoute = require("./routes/tradeRoute");
const robotScheduler = require("./services/robotScheduler");
require("./services/matchListener");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", tradeRoute);

app.listen(port, () => {
  console.log("Investment simulation platform is running on port:", port);
  robotScheduler.scheduleRobotTrades(); // 啟動機器人交易
});
