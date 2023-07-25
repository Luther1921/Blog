const JWT = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      JWT.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("user is not authorized");
        }
        req.user = decoded.user;
        next();
      });
      if (!token) {
        res.status(401);
        throw new Error("user is not authorized or invalid token");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = validateToken;
