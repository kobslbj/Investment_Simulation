const pool = require("../db");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
exports.createUser = async (username, email, password) => {
  try {
    if (!password) {
      throw new Error("Password is required for hashing.");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";
    const results = await pool.query(query, [username, email, hashedPassword]);
    const newUser = { id: results.insertId, username: username, email: email }; 
    return newUser;
  } catch (error) {
    console.error("Error occurred in createUser:", error);
    throw error;
  }
};

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Users WHERE email = ?";
    pool.query(query, [email], (error, results) => {
      if (error) {
        console.error("Error occurred in findUserByEmail:", error.message);
        reject(error);
      } else {
        if (results && results.length > 0) {
          resolve(results[0]);
        } else {
          console.log(results);
          resolve(null);
        }
      }
    });
  });
};

exports.verifyPassword = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    console.error("Error occurred in verifyPassword:", error.message);
    throw error;
  }
};
