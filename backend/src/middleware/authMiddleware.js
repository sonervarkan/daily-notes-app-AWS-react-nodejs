// backend/src/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Bearer <token>
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; 
    next();
  });
};

module.exports = authenticateToken;
