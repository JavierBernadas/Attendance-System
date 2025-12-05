//this code is updated with the abilities included ! ! !
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const auth_user = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ error: "No Authorization header" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ error: "Invalid Authorization header format" });
    }

    const token = parts[1];
    let decoded;

    try {
      decoded = jwt.verify(token, secret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status : "401",
          message : "Not authenticated",
          error: "Token has expired",
          expiredAt: error.expiredAt,
          code: "TOKEN_EXPIRED",
        });
      }
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decoded._id).select("-password"); // exclude password
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    // ✅ Attach user and token to request
    req.token = token;
    req.user = user;
    // ✅ (Optional) Attach CASL abilities to request
    const defineAbilitiesFor = require("../permissions/defineAbilities");
    // console.log( " TEST == " , user)
    req.ability = defineAbilitiesFor(user);
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({ error: "Not Unauthorized!" });
  }
};

module.exports = auth_user;
