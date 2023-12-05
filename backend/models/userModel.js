const pool = require("../db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
exports.createUser = async (username, email, password) => {
  try {
    if (!password) {
      throw new Error("Password is required for hashing.");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const results = await pool.query(query, [username, email, hashedPassword]);
    const newUser = { id: results.insertId, username: username, email: email };
    console.log("123123",newUser);
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
