require("dotenv").config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const pool = mysql.createPool(dbConfig);

pool.on("connection", function (connection) {
  console.log("Connected to the database as ID:", connection.threadId);
});

module.exports = pool;
