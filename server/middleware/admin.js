const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ msg: "Forbidden" });
      if (decoded.UserInfo && decoded.UserInfo.role === "admin") {
        next();
      } else {
        return res.status(500).json({ msg: "You are not admin" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyJWT;
