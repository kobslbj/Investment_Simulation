const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY;
function isValidPassword(password) {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const countTrue = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol].filter(
    Boolean
  ).length;

  return countTrue >= 3;
}

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userModel.findUserByEmail(email);
    console.log("123", existingUser);
    if (existingUser) {
      return res.status(409).send({ message: "Email is already in use." });
    }
    if (!isValidPassword(password)) {
      return res.status(400).send({
        message:
          "Password must contain at least three out of the four: lowercase letters, uppercase letters, numbers, symbols.",
      });
    }
    // 註冊用戶
    const newUser = await userModel.createUser(username, email, password);

    // 生成 JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log(SECRET_KEY);
    const responseData = {
      data: {
        access_token: token,
        access_expired: 3600,
        user: {
          id: newUser.id,
          provider: "native",
          username: newUser.username,
          email: newUser.email,
          picture: newUser.picture || "",
        },
      },
    };

    res.status(201).send(responseData);
  } catch (error) {
    if (error.message === "Email is already in use.") {
      return res.status(400).send({ message: "Email is already in use." });
    }
    console.error("Error occurred in signUp:", error.message);
    res.status(500).send({ message: "Server Error." });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { provider, email, password } = req.body;
    console.log(req.body);
    if (provider === "native") {
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(403).send({ error: "Invalid email or password." });
      }

      const isMatch = await userModel.verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(403).send({ error: "Invalid email or password." });
      }

      // 生成 JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, provider: provider },
        SECRET_KEY,
        { expiresIn: "3600s" }
      );

      const responseData = {
        data: {
          access_token: token,
          access_expired: 3600,
          user: {
            id: user.id,
            provider: "native",
            username: user.username,
            email: user.email,
            picture: user.picture || "",
          },
        },
      };

      return res.status(200).send(responseData);
    } else {
      return res.status(400).send({ error: "Invalid provider." });
    }
  } catch (error) {
    console.error("Error occurred in signIn:", error.message);
    res.status(500).send({ error: "Server Error." });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "No token provided." });
    }

    // 從 Authorization header 取得 token
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "No token provided." });
    }

    // Decode JWT token and get user ID and provider
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const provider = decoded.provider;

    if (provider === "native") {
      const user = await userModel.findUserByEmail(decoded.email);
      return res.status(200).json({
        data: {
          provider: user.provider,
          username: user.username,
          // email: user.email,
          // picture: user.picture || "",
        },
      });
    } else {
      return res.status(403).json({ error: "Invalid provider." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error." });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await userModel.getAllOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
