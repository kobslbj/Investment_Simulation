const pool = require("../db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
exports.createUser = async (username, email, password) => {
  try {
    if (!password) {
      throw new Error("Password is required for hashing.");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = "INSERT INTO users (username, email, password, balance) VALUES (?, ?, ?, ?)";
    const initialBalance = 2000000; 
    const results = await pool.query(query, [username, email, hashedPassword, initialBalance]);

    const newUser = { id: results.insertId, username: username, email: email, balance: initialBalance };
    console.log("User Created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error occurred in createUser:", error);
    throw error;
  }
};

exports.findUserByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [results] = await pool.query(query, [email]);
    return results[0];
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
};


exports.verifyPassword = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    console.error("Error occurred in verifyPassword:", error.message);
    throw error;
  }
};

exports.getAllOrdersByUserId = async (userId) => {
  try {
    const query = "SELECT * FROM orders WHERE user_id = ?";
    const [orders] = await pool.query(query, [userId]);
    return orders;
  } catch (error) {
    console.error("Error in getAllOrdersByUserId:", error);
    throw error;
  }
};