const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoute");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api", userRoutes);
app.listen(port, () => {
  console.log("hihi");
});
